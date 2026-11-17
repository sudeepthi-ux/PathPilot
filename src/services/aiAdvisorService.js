import { allCareers } from '../data/careerLibraryData.js';
import { careerExperiments } from '../data/careerExperimentsData.js';

export const CORE_STUDENT_QUESTIONS = [
  'I am confused about choosing between CSE and ECE.',
  'Which career suits my interests?',
  'Naku coding ante interest undi, kani next em cheyali?',
  'Nenu design field ki vellali anukuntunna.',
  'What are my strengths and what should I do next?'
];

/**
 * Extracts verified, non-fabricated student context from PathPilot state:
 * personality assessment, interest scores, completed experiments, discovered skills,
 * saved/explored careers, skill gap analyses, and learning roadmap progress.
 */
export function buildStudentContext(user, studentProfile) {
  const personality = studentProfile?.personalityResult;
  const interests = studentProfile?.interestResult;
  const strengthRes = studentProfile?.strengthResult;
  const completedIds = Array.isArray(studentProfile?.completedExperiments)
    ? studentProfile.completedExperiments
    : [];

  const completedExperimentDetails = completedIds.map((expId) => {
    const found = careerExperiments.find((e) => e.id === expId);
    return found
      ? { id: found.id, title: found.title, roleName: found.roleName, skills: found.skillsGained || [] }
      : { id: expId, title: expId, roleName: '', skills: [] };
  });

  const discoveredSkills = Array.from(
    new Set(completedExperimentDetails.flatMap((exp) => exp.skills || []))
  );

  const savedCareers = Array.isArray(studentProfile?.savedCareers)
    ? studentProfile.savedCareers
        .map((c) => {
          if (typeof c === 'string') {
            const found = allCareers.find((item) => item.id === c);
            return found ? found.title : c;
          }
          return c?.title || c?.id;
        })
        .filter(Boolean)
    : [];

  const exploredCareers = Array.isArray(studentProfile?.exploredCareers)
    ? studentProfile.exploredCareers.map((id) => {
        const c = allCareers.find((item) => item.id === id);
        return c ? c.title : id;
      })
    : [];

  const skillGapSummaries =
    Array.isArray(studentProfile?.skillGapSummaries) && studentProfile.skillGapSummaries.length > 0
      ? studentProfile.skillGapSummaries.map((record) => ({
          careerId: record?.careerId || '',
          careerTitle: record?.careerTitle || record?.careerId || '',
          readinessScore: record?.readinessScore ?? null,
          existingSkills: Array.isArray(record?.existingSkills) ? record.existingSkills.slice(0, 5) : [],
          missingSkills: Array.isArray(record?.missingSkills) ? record.missingSkills.slice(0, 5) : []
        }))
      : Object.entries(studentProfile?.skillGapResults || {}).map(([careerId, record]) => {
          const careerObj = allCareers.find((c) => c.id === careerId);
          return {
            careerId,
            careerTitle: record?.careerTitle || careerObj?.title || careerId,
            readinessScore: record?.readinessScore ?? null,
            existingSkills: Array.isArray(record?.existingSkills) ? record.existingSkills.slice(0, 5) : [],
            missingSkills: Array.isArray(record?.missingSkills) ? record.missingSkills.slice(0, 5) : []
          };
        });

  const roadmapSummaries =
    Array.isArray(studentProfile?.roadmapSummaries) && studentProfile.roadmapSummaries.length > 0
      ? studentProfile.roadmapSummaries
      : Object.entries(studentProfile?.learningRoadmaps || {}).map(([careerId, roadmap]) => {
          const careerObj = allCareers.find((c) => c.id === careerId);
          return {
            careerId,
            careerTitle: careerObj?.title || careerId,
            completedSteps: Array.isArray(roadmap?.completedActivityIds)
              ? roadmap.completedActivityIds.length
              : 0
          };
        });

  return {
    name: user?.name || '',
    university: user?.university || '',
    major: user?.major || '',
    targetIndustry: user?.targetIndustry || '',
    personalityArchetype:
      personality?.archetype?.title || personality?.profileTitle || personality?.title || null,
    strengthSignature: strengthRes?.signatureTitle || null,
    strengths: Array.from(
      new Set([
        ...(Array.isArray(strengthRes?.topStrengths) ? strengthRes.topStrengths : []),
        ...(Array.isArray(personality?.archetype?.strengths)
          ? personality.archetype.strengths
          : Array.isArray(personality?.strengths)
          ? personality.strengths
          : [])
      ])
    ),
    topInterests: Array.isArray(interests?.topThree)
      ? interests.topThree.map((item) => ({
          id: item.id,
          name: item.name,
          percentage: item.percentage
        }))
      : Array.isArray(interests?.topTracks)
      ? interests.topTracks.map((item) =>
          typeof item === 'string'
            ? { id: item.toLowerCase(), name: item, percentage: null }
            : item
        )
      : [],
    completedExperiments: completedIds,
    completedExperimentTitles: completedExperimentDetails.map((e) => e.title),
    careerDiscoveryResult: studentProfile?.careerDiscoveryResult || null,
    discoveredSkills,
    savedCareers,
    exploredCareers,
    skillGapSummaries,
    roadmapSummaries
  };
}

/**
 * Generates AIRA's warm, natural opening greeting grounded strictly in real profile state.
 */
export function buildPersonalizedGreeting(user, studentProfile) {
  const firstName = user?.name ? user.name.split(' ')[0] : '';
  const greetingPrefix = firstName ? `Hey ${firstName}!` : 'Hey there!';
  const archetype = studentProfile?.personalityResult?.archetype?.title;
  const topInterest = studentProfile?.interestResult?.topThree?.[0];
  const saved = studentProfile?.savedCareers?.[0]?.title;
  const discoveryMatches = studentProfile?.careerDiscoveryResult?.matches || [];
  const topDiscovery = discoveryMatches[0];

  if (topDiscovery && archetype) {
    const careerTitle = topDiscovery.career?.title || topDiscovery.careerId;
    return `${greetingPrefix} I'm AIRA, your personal career companion. Based on your Career Discovery submission, ${careerTitle} emerged as your top match (${topDiscovery.score}%), paired with your "${archetype}" thinking style. What career questions or doubts would you like to explore today?`;
  }

  if (topDiscovery) {
    const careerTitle = topDiscovery.career?.title || topDiscovery.careerId;
    return `${greetingPrefix} I'm AIRA, your career companion. I noticed your Career Discovery assessment matched you strongly with ${careerTitle} (${topDiscovery.score}%). What would you like to explore about that or any other paths today?`;
  }

  if (archetype && topInterest) {
    return `${greetingPrefix} I'm AIRA, your career companion. Looking at your real PathPilot results, your strongest interest is ${topInterest.name} (${topInterest.percentage}%) with a "${archetype}" style. What career question is on your mind today—you can talk to me in English or Telugu.`;
  }

  if (topInterest) {
    return `${greetingPrefix} I'm AIRA. Your Interest Analyzer highlights ${topInterest.name} (${topInterest.percentage}%)${saved ? `, and you've saved ${saved}` : ''}. What would you like to explore or clarify right now? You can speak in English, Telugu, or mix both.`;
  }

  if (archetype) {
    return `${greetingPrefix} I'm AIRA, your career mentor. Your Personality Assessment points to "${archetype}". Tell me what's feeling uncertain right now about your major, skills, or next steps—English or Telugu both work naturally.`;
  }

  return `${greetingPrefix} I'm AIRA, your PathPilot career companion. Tell me honestly where you feel stuck—picking a career, comparing college branches, or figuring out your strengths. Speak or type in English, Telugu, or mixed Telugu-English!`;
}

export async function getCompanionStatus() {
  try {
    const response = await fetch('/api/companion/status');
    if (!response.ok) return { connected: false, provider: 'offline' };
    return await response.json();
  } catch {
    return { connected: false, provider: 'offline' };
  }
}

export async function askCareerCompanion({
  message,
  conversationHistory = [],
  studentContext = {},
  starterAction = null,
  preferredLanguage = 'auto'
}) {
  const response = await fetch('/api/companion/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: (message || '').trim(),
      conversationHistory: conversationHistory.slice(-12).map((m) => ({
        role: m.role,
        text: m.text
      })),
      studentContext,
      starterAction,
      preferredLanguage
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'AIRA companion service is temporarily unavailable.');
  }

  const recommendedCareers = (data.recommendedCareerIds || [])
    .map((id) => allCareers.find((c) => c.id === id))
    .filter(Boolean);

  return {
    text: data.text,
    spokenText: data.spokenText || data.text,
    spokenTextFallback: data.spokenTextFallback || null,
    emotion: data.emotion || 'warm',
    language: data.language || 'english',
    recommendedCareers,
    followUps: Array.isArray(data.followUps) ? data.followUps : [],
    isLiveApi: Boolean(data.isLiveApi),
    provider: data.provider || 'aira-mentor-engine'
  };
}

export async function askCareerGuide(userMessage, conversationHistory = [], studentContext = {}) {
  return await askCareerCompanion({
    message: userMessage,
    conversationHistory,
    studentContext
  });
}
