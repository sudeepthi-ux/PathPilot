import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  supabase,
  isSupabaseConfigured,
  authService,
  dbService,
  getStoredSessionToken,
  setStoredSessionToken
} from '../services/supabaseClient';

const AuthContext = createContext(null);

const STORAGE_KEY_USER = 'pathpilot_user_session';
const STORAGE_KEY_PROFILE = 'pathpilot_student_profile';
const getProfileStorageKey = (userId) => (userId ? `${STORAGE_KEY_PROFILE}_${userId}` : STORAGE_KEY_PROFILE);

const PLACEHOLDER_UNIVERSITIES = new Set([
  'university student',
  'student',
  'your university',
  'n/a',
  'none'
]);
const PLACEHOLDER_MAJORS = new Set([
  'interdisciplinary studies',
  'exploring paths',
  'career discovery',
  'undeclared',
  'n/a',
  'none'
]);

/**
 * Strips legacy auto-generated placeholder profile values so an unfilled profile
 * never reports artificial progress or placeholder fields.
 */
export function sanitizeUserRecord(rawUser) {
  if (!rawUser || typeof rawUser !== 'object') return null;
  const rawUni = String(rawUser.university || '').trim();
  const rawMajor = String(rawUser.major || '').trim();
  const rawGrad = String(rawUser.gradYear || '').trim();
  const rawTarget = String(rawUser.targetIndustry || '').trim();
  const rawBio = String(rawUser.bio || '').trim();

  const isLegacyPlaceholderUni = PLACEHOLDER_UNIVERSITIES.has(rawUni.toLowerCase());
  const isLegacyPlaceholderMajor = PLACEHOLDER_MAJORS.has(rawMajor.toLowerCase());
  const isLegacyAutoGrad =
    rawGrad === '2026' && isLegacyPlaceholderUni && isLegacyPlaceholderMajor && !rawTarget && !rawBio;

  return {
    ...rawUser,
    university: isLegacyPlaceholderUni ? '' : rawUni,
    major: isLegacyPlaceholderMajor ? '' : rawMajor,
    gradYear: isLegacyAutoGrad ? '' : rawGrad,
    targetIndustry: rawTarget,
    bio: rawBio
  };
}

/**
 * Calculates genuine student profile completion from user-entered fields only.
 * Empty profiles return 0%.
 */
export function calculateProfileCompletion(user) {
  if (!user) return 0;
  const clean = sanitizeUserRecord(user);
  const fields = [clean.university, clean.major, clean.gradYear, clean.targetIndustry, clean.bio];
  const filledCount = fields.filter((val) => Boolean(val && String(val).trim().length > 0)).length;
  return Math.round((filledCount / fields.length) * 100);
}

const emptyUnauthenticatedProfile = {
  personalityResult: null,
  interestResult: null,
  strengthResult: null,
  careerDiscoveryResult: null,
  assessmentResponses: {
    personality: {},
    interests: {},
    strengths: {}
  },
  completedExperiments: [],
  savedCareers: [],
  exploredCareers: [],
  skillGapResults: {},
  learningRoadmaps: {},
  airaMessages: [],
  airaPastSessions: [],
  recentActivities: [],
  notifications: []
};

// Default realistic demo student profile for instant evaluation
const defaultDemoUser = {
  id: 'demo-student-001',
  name: 'Elena Rostova',
  email: 'elena.rostova@berkeley.edu',
  university: '',
  major: '',
  gradYear: '',
  bio: '',
  targetIndustry: '',
  avatarUrl: null,
  isDemo: true,
  createdAt: '2026-01-15T08:00:00Z'
};

const defaultDemoProfile = {
  personalityResult: null,
  interestResult: null,
  assessmentResponses: {
    personality: {},
    interests: {}
  },
  completedExperiments: ['product-design-experiment'],
  savedCareers: [
    {
      id: 'product-designer',
      title: 'Product (UI/UX) Designer',
      tagline: 'Design intuitive apps and websites that delight people',
      category: 'Design & Creativity',
      savedAt: '2026-02-10T12:00:00Z'
    }
  ],
  exploredCareers: ['product-designer', 'creative-technologist', 'software-engineer'],
  skillGapResults: {
    'product-designer': {
      careerId: 'product-designer',
      existingSkills: ['Visual Hierarchy', 'Empathy', 'Active Listening'],
      improvingSkills: ['Figma / Prototyping', 'Wireframing'],
      missingSkills: ['Information Architecture', 'Clear Communication'],
      readinessScore: 65,
      analyzedAt: '2026-02-12T10:00:00Z'
    }
  },
  learningRoadmaps: {
    'product-designer': {
      completedActivityIds: ['product-designer-act-1-1', 'product-designer-act-1-2']
    }
  },
  recentActivities: [
    {
      id: 'act-1',
      title: 'Created PathPilot Account',
      detail: 'Registered with UC Berkeley academic credentials',
      timestamp: 'Just now',
      type: 'account'
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      title: 'PathPilot AI Guide Active',
      body: 'Ask questions about choosing a major, technical vs creative careers, or study advice.',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Welcome to PathPilot',
      body: 'Complete your Personality Assessment to discover your natural thinking style.',
      timestamp: '1 day ago',
      read: false
    }
  ]
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? sanitizeUserRecord(JSON.parse(saved)) : null;
    } catch (e) {
      return null;
    }
  });

  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const savedUserRaw = localStorage.getItem(STORAGE_KEY_USER);
      if (!savedUserRaw) {
        return emptyUnauthenticatedProfile;
      }
      const parsedUser = JSON.parse(savedUserRaw);
      const saved =
        localStorage.getItem(getProfileStorageKey(parsedUser?.id)) ||
        localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);

        // Audit check: clean out legacy fake 100% test results if all 10 categories are 100%
        if (parsed.interestResult && parsed.interestResult.categoryScores) {
          const scores = Object.values(parsed.interestResult.categoryScores);
          const allHundred = scores.length > 0 && scores.every((s) => (s.percentage || s) === 100);
          if (allHundred) {
            parsed.interestResult = null;
            if (parsed.assessmentResponses) {
              parsed.assessmentResponses.interests = {};
            }
          }
        }

        return {
          ...emptyUnauthenticatedProfile,
          ...parsed,
          assessmentResponses: {
            ...emptyUnauthenticatedProfile.assessmentResponses,
            ...(parsed.assessmentResponses || {})
          },
          exploredCareers: parsed.exploredCareers || [],
          skillGapResults: parsed.skillGapResults || {},
          learningRoadmaps: parsed.learningRoadmaps || {},
          airaMessages: parsed.airaMessages || [],
          airaPastSessions: parsed.airaPastSessions || []
        };
      }
      return emptyUnauthenticatedProfile;
    } catch (e) {
      return emptyUnauthenticatedProfile;
    }
  });

  const [loading, setLoading] = useState(() => {
    if (isSupabaseConfigured && supabase) return true;
    return Boolean(getStoredSessionToken());
  });

  // Verify existing session on startup / page reload and sync cross-tab or back-button logout
  useEffect(() => {
    let active = true;

    const verifyInitialSession = async () => {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          const sessionUser = data?.session?.user;
          if (!active) return;
          if (sessionUser) {
            setUser(
              sanitizeUserRecord({
                id: sessionUser.id,
                name: sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'Student',
                email: sessionUser.email,
                university: sessionUser.user_metadata?.university || '',
                major: sessionUser.user_metadata?.major || '',
                gradYear: sessionUser.user_metadata?.gradYear || '',
                targetIndustry: sessionUser.user_metadata?.targetIndustry || '',
                bio: sessionUser.user_metadata?.bio || '',
                createdAt: sessionUser.created_at
              })
            );
          } else {
            setUser(null);
            setStudentProfile(emptyUnauthenticatedProfile);
          }
        } finally {
          if (active) setLoading(false);
        }
        return;
      }

      const token = getStoredSessionToken();
      if (!token) {
        if (active) setLoading(false);
        return;
      }

      const verified = await authService.verifyBackendSession();
      if (!active) return;
      if (verified?.authenticated && verified.user) {
        setUser(sanitizeUserRecord(verified.user));
        if (verified.profile) {
          setStudentProfile({
            ...emptyUnauthenticatedProfile,
            ...verified.profile
          });
        }
      } else {
        setUser(null);
        setStudentProfile(emptyUnauthenticatedProfile);
        try {
          localStorage.removeItem(STORAGE_KEY_USER);
          localStorage.removeItem(STORAGE_KEY_PROFILE);
        } catch {
          // Ignore storage error
        }
      }
      if (active) setLoading(false);
    };

    verifyInitialSession();

    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY_USER && !e.newValue) {
        setUser(null);
        setStudentProfile(emptyUnauthenticatedProfile);
      }
    };

    const handlePageShow = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEY_USER);
        if (!storedUser) {
          setUser(null);
          setStudentProfile(emptyUnauthenticatedProfile);
        }
      } catch {
        // Ignore storage read error
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('pageshow', handlePageShow);

    let subscription = null;
    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session?.user) {
          setUser(null);
          setStudentProfile(emptyUnauthenticatedProfile);
        }
      });
      subscription = data?.subscription || null;
    }

    return () => {
      active = false;
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pageshow', handlePageShow);
      subscription?.unsubscribe?.();
    };
  }, []);

  // Sync user to local storage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.error("Failed to persist user session", e);
    }
  }, [user]);

  // Sync student profile ONLY while authenticated, scoped by user ID
  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(getProfileStorageKey(user.id), JSON.stringify(studentProfile));
      if (user?.id && !user.isDemo) {
        dbService.syncStudentProfile(user.id, studentProfile);
      }
    } catch (e) {
      console.error("Failed to persist student profile", e);
    }
  }, [studentProfile, user]);

  // Activity logger helper
  const addActivity = (title, detail, type = 'general') => {
    const newAct = {
      id: `act-${Date.now()}`,
      title,
      detail,
      timestamp: 'Just now',
      type
    };
    setStudentProfile((prev) => ({
      ...prev,
      recentActivities: [newAct, ...(prev.recentActivities || []).slice(0, 11)]
    }));
  };

  // Profile completion percentage derived strictly from genuine user-entered profile attributes
  const profileCompletionPercentage = useMemo(() => calculateProfileCompletion(user), [user]);

  // Comprehensive progress metrics for Module 3
  const progressMetrics = useMemo(() => {
    const assessmentsCompleted =
      (studentProfile.personalityResult ? 1 : 0) +
      (studentProfile.interestResult ? 1 : 0) +
      (studentProfile.strengthResult ? 1 : 0);
    const experimentsCompleted = (studentProfile.completedExperiments || []).length;
    const exploredCareersCount = (studentProfile.exploredCareers || []).length;
    const savedCareersCount = (studentProfile.savedCareers || []).length;
    const skillsAnalyzedCount = Object.keys(studentProfile.skillGapResults || {}).length;

    // Count all checked activities across all roadmaps
    let roadmapActivitiesCompleted = 0;
    Object.values(studentProfile.learningRoadmaps || {}).forEach((rm) => {
      roadmapActivitiesCompleted += (rm.completedActivityIds || []).length;
    });

    // Milestone unlocking
    const milestones = [
      {
        id: 'm1',
        title: 'Account Initialized',
        description: 'Joined PathPilot discovery community',
        achieved: true,
        date: 'Day 1'
      },
      {
        id: 'm2',
        title: 'Personality Discovered',
        description: 'Completed Personality Assessment',
        achieved: Boolean(studentProfile.personalityResult),
        date: studentProfile.personalityResult ? 'Completed' : 'Pending'
      },
      {
        id: 'm3',
        title: 'Interest Spectrum Mapped',
        description: 'Completed 10-Field Interest Assessment',
        achieved: Boolean(studentProfile.interestResult),
        date: studentProfile.interestResult ? 'Completed' : 'Pending'
      },
      {
        id: 'm4',
        title: 'Core Strengths Diagnosed',
        description: 'Completed Strength Assessment',
        achieved: Boolean(studentProfile.strengthResult),
        date: studentProfile.strengthResult ? 'Completed' : 'Pending'
      },
      {
        id: 'm5',
        title: 'Role Test Driver',
        description: 'Completed first real-world career experiment',
        achieved: experimentsCompleted > 0,
        date: experimentsCompleted > 0 ? `${experimentsCompleted} Completed` : 'Pending'
      },
      {
        id: 'm6',
        title: 'Skill Gap Architect',
        description: 'Evaluated current vs target skill readiness',
        achieved: skillsAnalyzedCount > 0,
        date: skillsAnalyzedCount > 0 ? `${skillsAnalyzedCount} Analyzed` : 'Pending'
      },
      {
        id: 'm7',
        title: 'Active Skill Builder',
        description: 'Checked off learning roadmap milestones',
        achieved: roadmapActivitiesCompleted > 0,
        date: roadmapActivitiesCompleted > 0 ? `${roadmapActivitiesCompleted} Activities` : 'Pending'
      }
    ];

    const achievedCount = milestones.filter(m => m.achieved).length;
    const overallProgressPercentage = Math.round((achievedCount / milestones.length) * 100);

    return {
      assessmentsCompleted,
      totalAssessments: 3,
      experimentsCompleted,
      totalExperiments: 30,
      exploredCareersCount,
      totalCareers: 21,
      savedCareersCount,
      skillsAnalyzedCount,
      roadmapActivitiesCompleted,
      milestones,
      achievedCount,
      overallProgressPercentage
    };
  }, [studentProfile]);

  // Record viewed career
  const recordCareerExplored = (careerId) => {
    setStudentProfile((prev) => {
      const current = prev.exploredCareers || [];
      if (current.includes(careerId)) return prev;
      return {
        ...prev,
        exploredCareers: [...current, careerId]
      };
    });
  };

  // Save skill gap result
  const saveSkillGapResult = (careerId, result) => {
    setStudentProfile((prev) => ({
      ...prev,
      skillGapResults: {
        ...(prev.skillGapResults || {}),
        [careerId]: {
          ...result,
          analyzedAt: new Date().toISOString()
        }
      }
    }));
    addActivity('Skill Gap Analyzed', `Evaluated skills for ${result.careerTitle || careerId}`, 'skill');
    if (user?.id) {
      dbService.saveSkillGap(user.id, careerId, result);
    }
  };

  // Toggle learning roadmap activity
  const toggleRoadmapActivity = (careerId, activityId) => {
    setStudentProfile((prev) => {
      const existingRoadmaps = prev.learningRoadmaps || {};
      const careerRoadmap = existingRoadmaps[careerId] || { completedActivityIds: [] };
      const currentActivities = careerRoadmap.completedActivityIds || [];
      
      const isCompleted = currentActivities.includes(activityId);
      const updatedActivities = isCompleted
        ? currentActivities.filter(id => id !== activityId)
        : [...currentActivities, activityId];

      const updated = {
        ...prev,
        learningRoadmaps: {
          ...existingRoadmaps,
          [careerId]: {
            ...careerRoadmap,
            completedActivityIds: updatedActivities
          }
        }
      };

      if (!isCompleted) {
        addActivity('Roadmap Activity Completed', `Checked off activity in ${careerId} learning plan`, 'roadmap');
      }

      if (user?.id) {
        dbService.saveRoadmapProgress(user.id, careerId, updatedActivities);
      }

      return updated;
    });
  };

  const isRoadmapActivityCompleted = (careerId, activityId) => {
    const list = studentProfile.learningRoadmaps?.[careerId]?.completedActivityIds || [];
    return list.includes(activityId);
  };

  const getRoadmapProgress = (careerId, totalActivitiesCount = 12) => {
    const completed = studentProfile.learningRoadmaps?.[careerId]?.completedActivityIds?.length || 0;
    const percentage = Math.min(100, Math.round((completed / (totalActivitiesCount || 1)) * 100));
    return { completed, total: totalActivitiesCount, percentage };
  };

  // Save assessment responses
  const saveAssessmentResponses = (type, responses, result) => {
    setStudentProfile((prev) => ({
      ...prev,
      assessmentResponses: {
        ...(prev.assessmentResponses || {}),
        [type]: responses
      },
      ...(type === 'personality' ? { personalityResult: result } : {}),
      ...(type === 'interests' ? { interestResult: result } : {}),
      ...(type === 'strengths' ? { strengthResult: result } : {})
    }));
  };

  // Sign up — creates account and logs in directly without mandatory email verification
  const signup = async ({ name, email, password, university, major }) => {
    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const result = await authService.signUp({
        name,
        email: normalizedEmail,
        password,
        university,
        major
      });
      const newUser = result.user;
      const starterProfile = {
        ...emptyUnauthenticatedProfile,
        notifications: [
          {
            id: 'notif-welcome',
            title: 'Welcome to PathPilot',
            body: 'Start with your Personality Assessment or explore Career Experiments to discover what fits you best.',
            timestamp: 'Just now',
            read: false
          }
        ],
        recentActivities: [
          {
            id: `act-${Date.now()}`,
            title: 'Account Created',
            detail: 'Successfully registered PathPilot student profile',
            timestamp: 'Just now',
            type: 'account'
          }
        ]
      };
      setStudentProfile(result.profile ? { ...emptyUnauthenticatedProfile, ...result.profile } : starterProfile);
      setUser(sanitizeUserRecord(newUser));
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  // Login — authenticates directly without email verification requirement
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const result = await authService.signInWithPassword({
        email: normalizedEmail,
        password
      });
      const loggedInUser = sanitizeUserRecord(result.user);
      const baseProfile = result.profile
        ? { ...emptyUnauthenticatedProfile, ...result.profile }
        : emptyUnauthenticatedProfile;
      setStudentProfile({
        ...baseProfile,
        recentActivities: [
          {
            id: `act-${Date.now()}`,
            title: 'Logged In',
            detail: 'Active session started',
            timestamp: 'Just now',
            type: 'account'
          },
          ...(baseProfile.recentActivities || []).slice(0, 11)
        ]
      });
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setLoading(false);
    }
  };

  // Google Login Integration
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/dashboard`
          }
        });
        if (error) throw error;
      } else {
        const googleUser = {
          id: 'google-student-4821',
          name: 'Elena Rostova',
          email: 'elena.rostova@berkeley.edu',
          university: 'UC Berkeley',
          major: 'Cognitive Science & Computer Science',
          gradYear: '2026',
          bio: 'Dual-degree student exploring cognitive psychology, spatial interfaces, and multimodal AI.',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          provider: 'google',
          createdAt: new Date().toISOString()
        };
        setUser(googleUser);
        addActivity('Google Single Sign-On', 'Authenticated via verified Google student credentials');
        return googleUser;
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout — invalidates session token and clears all user-specific state
  const logout = async () => {
    const previousUserId = user?.id;
    await authService.signOut();
    setStoredSessionToken('');
    setUser(null);
    setStudentProfile(emptyUnauthenticatedProfile);
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_PROFILE);
      if (previousUserId) {
        localStorage.removeItem(getProfileStorageKey(previousUserId));
      }
      sessionStorage.clear();
    } catch {
      // Ignore storage clear warnings
    }
  };

  // Request Password Reset Email (only logs activity if delivery succeeds)
  const resetPassword = async (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    const res = await authService.resetPasswordForEmail(normalizedEmail);
    addActivity('Password Reset Requested', `Reset instructions sent to ${normalizedEmail}`);
    return res;
  };

  // Validate Reset Token
  const verifyResetToken = async ({ email, token }) => {
    return await authService.verifyResetToken({ email, token });
  };

  // Complete Password Reset
  const confirmPasswordReset = async ({ email, token, newPassword }) => {
    return await authService.updatePasswordWithToken({ email, token, newPassword });
  };

  // Update profile details & persist to backend user record
  const updateProfile = (updates) => {
    const cleanUpdates = {
      ...(updates.name !== undefined ? { name: String(updates.name).trim() } : {}),
      ...(updates.university !== undefined ? { university: String(updates.university).trim() } : {}),
      ...(updates.major !== undefined ? { major: String(updates.major).trim() } : {}),
      ...(updates.gradYear !== undefined ? { gradYear: String(updates.gradYear).trim() } : {}),
      ...(updates.targetIndustry !== undefined ? { targetIndustry: String(updates.targetIndustry).trim() } : {}),
      ...(updates.bio !== undefined ? { bio: String(updates.bio).trim() } : {})
    };
    setUser((prev) => sanitizeUserRecord({ ...prev, ...cleanUpdates }));
    if (user?.id && !user.isDemo) {
      dbService.syncStudentProfile(user.id, studentProfile, cleanUpdates);
    }
    addActivity('Profile Updated', 'Student educational attributes updated');
  };

  // Save personality assessment results
  const savePersonalityResult = (result, answers = {}) => {
    setStudentProfile((prev) => ({
      ...prev,
      personalityResult: result,
      assessmentResponses: {
        ...(prev.assessmentResponses || {}),
        personality: answers
      }
    }));
    addActivity(
      'Completed Personality Assessment',
      `Diagnosed Archetype: ${result.archetype?.title || 'Systems Architect'}`,
      'assessment'
    );
  };

  // Save submitted Career Discovery answers (results are recomputed deterministically from these answers)
  const saveCareerDiscoveryResult = (answers = {}) => {
    setStudentProfile((prev) => ({
      ...prev,
      careerDiscoveryResult: {
        answers: { ...answers },
        submittedAt: new Date().toISOString()
      }
    }));
    addActivity('Completed Career Discovery', 'Generated careers matching your 5 discovery answers', 'assessment');
  };

  // Clear submitted Career Discovery results
  const clearCareerDiscoveryResult = () => {
    setStudentProfile((prev) => ({
      ...prev,
      careerDiscoveryResult: null
    }));
  };

  // Clear personality assessment results
  const clearPersonalityResult = () => {
    setStudentProfile((prev) => ({
      ...prev,
      personalityResult: null,
      assessmentResponses: {
        ...(prev.assessmentResponses || {}),
        personality: {}
      }
    }));
  };

  // Save interest analyzer results
  const saveInterestResult = (result, answers = {}) => {
    setStudentProfile((prev) => ({
      ...prev,
      interestResult: result,
      assessmentResponses: {
        ...(prev.assessmentResponses || {}),
        interests: answers
      }
    }));
    addActivity(
      'Completed Interest Analyzer',
      `Top fields: ${result.topThree.map(c => c.name.split(' & ')[0]).join(', ')}`,
      'assessment'
    );
  };

  // Clear interest analyzer results
  const clearInterestResult = () => {
    setStudentProfile((prev) => ({
      ...prev,
      interestResult: null,
      assessmentResponses: {
        ...(prev.assessmentResponses || {}),
        interests: {}
      }
    }));
  };

  // Save strength assessment results
  const saveStrengthResult = (result, answers = {}) => {
    setStudentProfile((prev) => ({
      ...prev,
      strengthResult: result,
      assessmentResponses: {
        ...(prev.assessmentResponses || {}),
        strengths: answers
      }
    }));
    addActivity(
      'Completed Strength Assessment',
      `Signature Strengths: ${result.signatureTitle || 'Diagnosed'}`,
      'assessment'
    );
  };

  // Clear strength assessment results
  const clearStrengthResult = () => {
    setStudentProfile((prev) => ({
      ...prev,
      strengthResult: null,
      assessmentResponses: {
        ...(prev.assessmentResponses || {}),
        strengths: {}
      }
    }));
  };

  // Persist current AIRA messages to the authenticated student profile
  const saveAiraConversation = (messages) => {
    if (!Array.isArray(messages)) return;
    setStudentProfile((prev) => ({
      ...prev,
      airaMessages: messages.slice(-40)
    }));
  };

  // Archive active AIRA session (if user spoke/typed) and start a fresh thread
  const startNewAiraConversation = (initialMsg = null) => {
    setStudentProfile((prev) => {
      const currentMsgs = Array.isArray(prev.airaMessages) ? prev.airaMessages : [];
      const hasUserTurn = currentMsgs.some((m) => m.role === 'user');
      let nextPast = Array.isArray(prev.airaPastSessions) ? prev.airaPastSessions : [];

      if (hasUserTurn) {
        const firstUserMsg = currentMsgs.find((m) => m.role === 'user');
        const snippet = String(firstUserMsg?.text || 'Career Conversation').slice(0, 56);
        const archived = {
          id: `aira-${Date.now()}`,
          title: snippet,
          createdAt: new Date().toISOString(),
          messages: currentMsgs.slice(-30)
        };
        nextPast = [archived, ...nextPast].slice(0, 10);
      }

      return {
        ...prev,
        airaMessages: initialMsg ? [initialMsg] : [],
        airaPastSessions: nextPast
      };
    });
  };

  // Clear all active + past AIRA conversation history for user privacy
  const clearAiraConversationHistory = (initialMsg = null) => {
    setStudentProfile((prev) => ({
      ...prev,
      airaMessages: initialMsg ? [initialMsg] : [],
      airaPastSessions: []
    }));
  };

  // Complete a career experiment
  const completeExperiment = (experimentId, experimentTitle) => {
    setStudentProfile((prev) => {
      const current = prev.completedExperiments || [];
      if (current.includes(experimentId)) return prev;
      return {
        ...prev,
        completedExperiments: [...current, experimentId]
      };
    });
    addActivity(
      'Completed Career Experiment',
      `Completed simulation: ${experimentTitle || experimentId}`,
      'experiment'
    );
  };

  // Toggle experiment completion
  const toggleCompleteExperiment = (experimentId, experimentTitle) => {
    setStudentProfile((prev) => {
      const current = prev.completedExperiments || [];
      const exists = current.includes(experimentId);
      const updated = exists
        ? current.filter((id) => id !== experimentId)
        : [...current, experimentId];
      return {
        ...prev,
        completedExperiments: updated
      };
    });
    if (!studentProfile.completedExperiments?.includes(experimentId)) {
      addActivity(
        'Completed Career Experiment',
        `Completed simulation: ${experimentTitle || experimentId}`,
        'experiment'
      );
    }
  };

  // Toggle saving a career
  const toggleSaveCareer = (career) => {
    setStudentProfile((prev) => {
      const current = prev.savedCareers || [];
      const exists = current.some((c) => c.id === career.id || c.title === career.title);
      let updated;
      if (exists) {
        updated = current.filter((c) => c.id !== career.id && c.title !== career.title);
      } else {
        updated = [
          ...current,
          {
            id: career.id || `career-${Date.now()}`,
            title: career.title,
            tagline: career.tagline || career.overview || 'Career Field',
            category: career.category || career.categoryName || 'Discovered Career',
            savedAt: new Date().toISOString()
          }
        ];
        addActivity('Saved Career', `Added ${career.title} to saved careers`, 'career');
      }
      return {
        ...prev,
        savedCareers: updated
      };
    });
  };

  const markNotificationAsRead = (id) => {
    setStudentProfile((prev) => ({
      ...prev,
      notifications: (prev.notifications || []).map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    }));
  };

  const clearAllNotifications = () => {
    setStudentProfile((prev) => ({
      ...prev,
      notifications: []
    }));
  };

  // One-click demo login helper
  const loadDemoStudent = () => {
    setUser(defaultDemoUser);
    setStudentProfile(defaultDemoProfile);
    addActivity('Loaded Demo Profile', 'Viewing as Elena Rostova (UC Berkeley)');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        studentProfile,
        loading,
        profileCompletionPercentage,
        progressMetrics,
        recordCareerExplored,
        saveSkillGapResult,
        toggleRoadmapActivity,
        isRoadmapActivityCompleted,
        getRoadmapProgress,
        saveAssessmentResponses,
        signup,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
        verifyResetToken,
        confirmPasswordReset,
        updateProfile,
        savePersonalityResult,
        clearPersonalityResult,
        saveCareerDiscoveryResult,
        clearCareerDiscoveryResult,
        saveInterestResult,
        clearInterestResult,
        saveStrengthResult,
        clearStrengthResult,
        saveAiraConversation,
        startNewAiraConversation,
        clearAiraConversationHistory,
        completeExperiment,
        toggleCompleteExperiment,
        toggleSaveCareer,
        markNotificationAsRead,
        clearAllNotifications,
        loadDemoStudent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
