import { allCareers } from '../data/careerLibraryData.js';

/**
 * Intelligent, Transparent Recommendation Engine
 * Connects student's Cognitive Archetype, 10-Field Interest Scores,
 * Strength Assessment, and Completed Career Experiments to generate
 * genuine, calculated recommendations without exposing API keys in client code.
 */
export const generateCareerRecommendations = async ({
  personalityResult,
  interestResult,
  strengthResult = null,
  completedExperiments = [],
  userPreferences = {}
}) => {
  return calculateRuleBasedRecommendations({
    personalityResult,
    interestResult,
    strengthResult,
    completedExperiments,
    userPreferences
  });
};

/**
 * Deterministic Rule-Based Scoring Engine
 * Computes scores (60% - 98%) based on real student data
 */
export const calculateRuleBasedRecommendations = ({
  personalityResult,
  interestResult,
  strengthResult = null,
  completedExperiments = [],
  userPreferences = {}
}) => {
  const scoresMap = {};
  const topStrengthPillar = strengthResult?.rankedPillars?.[0]?.id || null;
  const strengthMatchesPillar = {
    analytical: ['technology', 'robotics', 'engineering', 'emerging-tech', 'science', 'finance'],
    creative: ['design', 'robotics', 'media', 'architecture', 'emerging-tech'],
    communication: ['psychology', 'education', 'healthcare', 'media', 'marketing', 'law'],
    execution: ['business', 'engineering', 'robotics', 'finance', 'government']
  };

  const PURE_CODING_IDS = new Set([
    'software-engineer',
    'cloud-architect',
    'blockchain-developer',
    'cybersecurity-analyst',
    'ai-engineer'
  ]);
  const HARDWARE_AND_ROBOTICS_IDS = new Set([
    'robotics-engineer',
    'mechatronics-engineer',
    'automation-engineer',
    'drone-systems-engineer',
    'industrial-robotics-specialist',
    'human-robot-interaction-designer',
    'mechanical-engineer',
    'electrical-engineer',
    'electronics-engineer',
    'industrial-designer'
  ]);

  const techScorePct = interestResult?.categoryScores?.technology?.percentage;
  const dislikesCoding =
    Boolean(userPreferences?.dislikesCoding) ||
    (typeof techScorePct === 'number' && techScorePct < 45);

  // Default baseline scores for each career in the library
  allCareers.forEach((career) => {
    let score = 68;
    let matchingStrengths = [];
    let matchingInterests = [];

    // 1. Evaluate against Cognitive Archetype if assessment completed
    if (personalityResult && personalityResult.archetype) {
      const topDim = personalityResult.topDimension; // 'systems', 'ambiguity', 'empathy', 'grit'
      
      if (topDim === 'systems' && ['technology', 'robotics', 'engineering', 'emerging-tech', 'finance', 'architecture', 'science'].includes(career.categoryId)) {
        score += 11;
        matchingStrengths.push("Systems & Logical Thinking");
      } else if (topDim === 'ambiguity' && ['design', 'robotics', 'emerging-tech', 'technology', 'media', 'marketing'].includes(career.categoryId)) {
        score += 11;
        matchingStrengths.push("Creativity & Frontier Innovation");
      } else if (topDim === 'empathy' && ['psychology', 'healthcare', 'education', 'government', 'impact'].includes(career.categoryId) || career.id === 'human-robot-interaction-designer') {
        score += 11;
        matchingStrengths.push("Human Empathy & Collaboration");
      } else if (topDim === 'grit' && ['engineering', 'robotics', 'law', 'science', 'finance', 'architecture'].includes(career.categoryId)) {
        score += 11;
        matchingStrengths.push("Attention to Detail & Execution");
      } else {
        score += 4;
      }
    }

    // 2. Evaluate against Strength Assessment if completed
    if (topStrengthPillar && strengthMatchesPillar[topStrengthPillar]?.includes(career.categoryId)) {
      score += 8;
      if (strengthResult?.topStrengths?.[0]) {
        matchingStrengths.push(strengthResult.topStrengths[0]);
      }
    }
    if (strengthResult?.recommendedCareers?.some((rc) => rc.id === career.id)) {
      score += 4;
    }

    // 3. Evaluate against Interest Analyzer if completed
    if (interestResult && interestResult.categoryScores) {
      const scores = interestResult.categoryScores;
      if (career.categoryId === 'technology' && scores.technology) {
        score += Math.round((scores.technology.percentage / 100) * 14);
        matchingInterests.push("High Curiosity in Technology");
      }
      if (['robotics', 'engineering'].includes(career.categoryId) && (scores.technology || scores.science)) {
        const combined = Math.round((((scores.science?.percentage || 50) * 0.55) + ((scores.technology?.percentage || 50) * 0.45)) / 100 * 14);
        score += combined;
        matchingInterests.push("Physical Engineering & Intelligent Machines");
      }
      if (career.categoryId === 'emerging-tech' && (scores.technology || scores.science)) {
        const combined = Math.round((((scores.technology?.percentage || 50) + (scores.science?.percentage || 50)) / 200) * 13);
        score += combined;
        matchingInterests.push("Frontier & Emerging Technology");
      }
      if (career.categoryId === 'design' && scores.design) {
        score += Math.round((scores.design.percentage / 100) * 14);
        matchingInterests.push("Visual Arts & Physical/UX Design");
      }
      if (career.categoryId === 'science' && scores.science) {
        score += Math.round((scores.science.percentage / 100) * 14);
        matchingInterests.push("Scientific Investigation & Discovery");
      }
      if (career.categoryId === 'business' && scores.business) {
        score += Math.round((scores.business.percentage / 100) * 14);
        matchingInterests.push("Business & Leadership");
      }
      if (career.categoryId === 'finance' && scores.finance) {
        score += Math.round((scores.finance.percentage / 100) * 14);
        matchingInterests.push("Economics & Financial Modeling");
      }
      if (career.categoryId === 'healthcare' && scores.healthcare) {
        score += Math.round((scores.healthcare.percentage / 100) * 14);
        matchingInterests.push("Healthcare & Medicine");
      }
      if (career.categoryId === 'impact' && scores.impact) {
        score += Math.round((scores.impact.percentage / 100) * 14);
        matchingInterests.push("Sustainability & Social Good");
      }
      if (career.categoryId === 'psychology' && scores.psychology) {
        score += Math.round((scores.psychology.percentage / 100) * 14);
        matchingInterests.push("Human Behavior & Psychology");
      }
      if (['media', 'marketing'].includes(career.categoryId) && scores.communication) {
        score += Math.round((scores.communication.percentage / 100) * 14);
        matchingInterests.push("Storytelling & Media Strategy");
      }
      if (career.categoryId === 'education' && scores.education) {
        score += Math.round((scores.education.percentage / 100) * 14);
        matchingInterests.push("Teaching & Learning Design");
      }
    }

    // Account for coding dislike / preference toward hardware or non-coding careers
    if (dislikesCoding) {
      if (PURE_CODING_IDS.has(career.id)) {
        score -= 18;
      } else if (HARDWARE_AND_ROBOTICS_IDS.has(career.id)) {
        score += 4;
      }
    }

    // 4. Boost for completed career experiments
    const safeExperiments = Array.isArray(completedExperiments) ? completedExperiments : [];
    const relatedExperimentDone = safeExperiments.some((exp) => {
      const expId = typeof exp === 'string' ? exp : exp?.id || '';
      return expId.includes(career.id) || expId.includes(career.categoryId);
    });
    if (relatedExperimentDone) {
      score += 4;
      matchingStrengths.push("Demonstrated Hands-on Practical Aptitude");
    }

    // Normalize between 62% and 97% (never artificial 100%)
    const finalMatch = Math.min(97, Math.max(62, Math.round(score)));

    scoresMap[career.id] = {
      ...career,
      matchPercentage: `${finalMatch}%`,
      rawScore: finalMatch,
      matchingStrengths: matchingStrengths.length > 0 ? matchingStrengths : ["Logical Thinking", "Curiosity"],
      matchingInterests: matchingInterests.length > 0 ? matchingInterests : ["Problem Solving", "Continuous Learning"],
      whySuitsYou: generateWhySuitsYou(career, personalityResult, interestResult, strengthResult),
      nextStep: career.beginnerProject || "Explore a beginner online course or build an introductory portfolio piece.",
      alternativeOptions: (career.relatedCareers || []).slice(0, 2).map(id => {
        const found = allCareers.find(c => c.id === id);
        return found ? found.title : id;
      })
    };
  });

  // Sort descending by calculated match score
  return Object.values(scoresMap).sort((a, b) => b.rawScore - a.rawScore);
};

function generateWhySuitsYou(career, personalityResult, interestResult, strengthResult) {
  const archetypeTitle = personalityResult?.archetype?.title;
  const topInterestName = interestResult?.topThree?.[0]?.name;
  const signatureStrength = strengthResult?.signatureTitle;

  if (archetypeTitle && topInterestName && signatureStrength) {
    return `Combines your '${archetypeTitle}' style, ${signatureStrength} strengths, and peak interest in ${topInterestName} with the daily craft of a ${career.title}.`;
  } else if (archetypeTitle && topInterestName) {
    return `Your natural thinking style as '${archetypeTitle}' pairs seamlessly with your curiosity in ${topInterestName}. This career allows you to work autonomously on meaningful problems without repetitive bureaucracy.`;
  } else if (signatureStrength) {
    return `Directly leverages your '${signatureStrength}' capability signature in real-world ${career.categoryName.toLowerCase()} challenges.`;
  } else if (archetypeTitle) {
    return `As '${archetypeTitle}', you thrive when using first-principles reasoning and creative problem-solving. This field offers high autonomy and rewarding challenges.`;
  } else if (topInterestName) {
    return `Your demonstrated interest in ${topInterestName} aligns directly with the core day-to-day challenges of this profession.`;
  }
  return `This career provides an excellent balance of practical problem solving, creative agency, and long-term learning growth.`;
}
