import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid Supabase credentials are configured
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  typeof supabaseUrl === 'string' &&
  typeof supabaseAnonKey === 'string' &&
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon')
);

// Initialize real Supabase client if keys are present
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const STORAGE_KEY_SESSION_TOKEN = 'pathpilot_session_token';

export function getStoredSessionToken() {
  try {
    return localStorage.getItem(STORAGE_KEY_SESSION_TOKEN) || '';
  } catch {
    return '';
  }
}

export function setStoredSessionToken(token) {
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEY_SESSION_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEY_SESSION_TOKEN);
    }
  } catch {
    // Ignore storage warning
  }
}

/**
 * Internal helper to invoke server-side authentication endpoints.
 */
async function postAuthApi(path, body, token = '') {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`/api/auth${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const err = new Error(data.error || 'Authentication request failed.');
    err.code = data.code || 'AUTH_ERROR';
    err.status = response.status;
    if (data.retryAfterSeconds !== undefined) {
      err.retryAfterSeconds = data.retryAfterSeconds;
    }
    throw err;
  }

  return data;
}

/**
 * Authentication & Backend Operations Wrapper
 * Handles both real Supabase authentication/database operations when configured,
 * and server-side password authentication + reset token endpoints.
 */
export const authService = {
  isConfigured: isSupabaseConfigured,

  async signUp({ email, password, name, university, major }) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, university, major }
        }
      });
      if (error) throw error;
      return {
        user: {
          id: data.user?.id || `user-${Date.now()}`,
          name,
          email,
          university: university || '',
          major: major || '',
          gradYear: '',
          targetIndustry: '',
          bio: '',
          createdAt: data.user?.created_at || new Date().toISOString()
        }
      };
    }
    const res = await postAuthApi('/register', { name, email, password, university, major });
    if (res?.sessionToken) {
      setStoredSessionToken(res.sessionToken);
    }
    return res;
  },

  async signInWithPassword({ email, password }) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return {
        user: {
          id: data.user.id,
          name: data.user.user_metadata?.full_name || email.split('@')[0],
          email: data.user.email,
          university: data.user.user_metadata?.university || '',
          major: data.user.user_metadata?.major || '',
          gradYear: data.user.user_metadata?.gradYear || '',
          targetIndustry: data.user.user_metadata?.targetIndustry || '',
          bio: data.user.user_metadata?.bio || '',
          createdAt: data.user.created_at
        }
      };
    }
    const res = await postAuthApi('/login', { email, password });
    if (res?.sessionToken) {
      setStoredSessionToken(res.sessionToken);
    }
    return res;
  },

  async verifyBackendSession() {
    if (isSupabaseConfigured) return null;
    const token = getStoredSessionToken();
    if (!token) return null;
    try {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        setStoredSessionToken('');
        return null;
      }
      return await response.json();
    } catch {
      return null;
    }
  },

  async signInWithOAuth(provider = 'google') {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) throw error;
      return data;
    }
    return null;
  },

  async signOut() {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } else {
      const token = getStoredSessionToken();
      if (token) {
        await postAuthApi('/logout', { sessionToken: token }, token).catch(() => {});
      }
    }
    setStoredSessionToken('');
  },

  async resetPasswordForEmail(email) {
    const redirectUrl = `${window.location.origin}/reset-password`;
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });
      if (error) throw error;
      return { success: true, data };
    }
    return await postAuthApi('/forgot-password', { email, origin: window.location.origin });
  },

  async verifyResetToken({ email, token }) {
    return await postAuthApi('/verify-reset-token', { email, token });
  },

  async updatePasswordWithToken({ email, token, newPassword }) {
    if (isSupabaseConfigured && supabase && !token) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      await supabase.auth.signOut();
      return { success: true, data };
    }
    return await postAuthApi('/reset-password', { email, token, newPassword });
  }
};

/**
 * Database & Profile Synchronization Service
 * Handles data persistence for:
 * - Student accounts & profiles
 * - Assessment responses & results (Personality & Interests)
 * - Career experiments & saved careers
 * - Skill gap results & Learning roadmaps
 * - Explored careers & progress tracking
 */
export const dbService = {
  isConfigured: isSupabaseConfigured,

  // Sync entire student profile state to backend
  async syncStudentProfile(userId, profileData, userUpdates = null) {
    if (isSupabaseConfigured && supabase && userId) {
      try {
        const { error } = await supabase
          .from('student_profiles')
          .upsert({
            user_id: userId,
            personality_result: profileData.personalityResult,
            interest_result: profileData.interestResult,
            completed_experiments: profileData.completedExperiments,
            saved_careers: profileData.savedCareers,
            explored_careers: profileData.exploredCareers,
            skill_gap_results: profileData.skillGapResults,
            learning_roadmaps: profileData.learningRoadmaps,
            recent_activities: profileData.recentActivities,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });

        if (error) {
          console.warn('Supabase profile sync notice (table may need schema migration):', error.message);
        }
      } catch (err) {
        console.warn('Supabase sync skipped, continuing with local persistence:', err);
      }
      return;
    }

    const token = getStoredSessionToken();
    if (!token || !userId) return;
    try {
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          profile: profileData,
          ...(userUpdates ? { userUpdates } : {})
        })
      });
    } catch {
      // Non-blocking sync
    }
  },

  // Save specific skill gap result
  async saveSkillGap(userId, careerId, skillGapRecord) {
    if (isSupabaseConfigured && supabase && userId) {
      try {
        await supabase
          .from('skill_gap_analyses')
          .upsert({
            user_id: userId,
            career_id: careerId,
            existing_skills: skillGapRecord.existingSkills,
            missing_skills: skillGapRecord.missingSkills,
            improving_skills: skillGapRecord.improvingSkills,
            readiness_score: skillGapRecord.readinessScore,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,career_id' });
      } catch (err) {
        console.warn('Supabase skill gap sync notice:', err);
      }
    }
  },

  // Save learning roadmap activity progress
  async saveRoadmapProgress(userId, careerId, completedActivityIds) {
    if (isSupabaseConfigured && supabase && userId) {
      try {
        await supabase
          .from('learning_roadmaps')
          .upsert({
            user_id: userId,
            career_id: careerId,
            completed_activities: completedActivityIds,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,career_id' });
      } catch (err) {
        console.warn('Supabase roadmap progress sync notice:', err);
      }
    }
  }
};
