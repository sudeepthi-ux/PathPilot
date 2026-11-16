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
    analytical: ['technology', 'science', 'finance'],
    creative: ['design', 'media', 'architecture'],
    communication: ['psychology', 'education', 'healthcare', 'media'],
    execution: ['business', 'finance', 'government']
  };

  // Default baseline scores for each career in the library
  allCareers.forEach((career) => {
    let score = 68;
    let matchingStrengths = [];
    let matchingInterests = [];

    // 1. Evaluate against Cognitive Archetype if assessment completed
    if (personalityResult && personalityResult.archetype) {
      const topDim = personalityResult.topDimension; // 'systems', 'ambiguity', 'empathy', 'grit'
      
      if (topDim === 'systems' && ['technology', 'finance', 'architecture', 'science'].includes(career.categoryId)) {
        score += 11;
        matchingStrengths.push("Systems & Logical Thinking");
      } else if (topDim === 'ambiguity' && ['design', 'technology', 'media', 'marketing'].includes(career.categoryId)) {
        score += 11;
        matchingStrengths.push("Creativity & Frontier Innovation");
      } else if (topDim === 'empathy' && ['psychology', 'healthcare', 'education', 'government'].includes(career.categoryId)) {
        score += 11;
        matchingStrengths.push("Human Empathy & Collaboration");
      } else if (topDim === 'grit' && ['law', 'science', 'finance', 'architecture'].includes(career.categoryId)) {
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
      // Match category directly or related
      if (career.categoryId === 'technology' && scores.technology) {
        const boost = Math.round((scores.technology.percentage / 100) * 14);
        score += boost;
        matchingInterests.push("High Curiosity in Technology");
      }
      if (career.categoryId === 'design' && scores.design) {
        const boost = Math.round((scores.design.percentage / 100) * 14);
        score += boost;
        matchingInterests.push("Visual Arts & User Experience");
      }
      if (career.categoryId === 'business' && scores.business) {
        const boost = Math.round((scores.business.percentage / 100) * 14);
        score += boost;
        matchingInterests.push("Business & Leadership");
      }
      if (career.categoryId === 'healthcare' && scores.healthcare) {
        const boost = Math.round((scores.healthcare.percentage / 100) * 14);
        score += boost;
        matchingInterests.push("Healthcare & Medicine");
      }
      if (career.categoryId === 'impact' && scores.impact) {
        const boost = Math.round((scores.impact.percentage / 100) * 14);
        score += boost;
        matchingInterests.push("Sustainability & Social Good");
      }
      if (career.categoryId === 'psychology' && scores.psychology) {
        const boost = Math.round((scores.psychology.percentage / 100) * 14);
        score += boost;
        matchingInterests.push("Human Behavior & Psychology");
      }
    }

    // 4. Boost for completed career experiments
    const relatedExperimentDone = completedExperiments.some(expId => expId.includes(career.id) || expId.includes(career.categoryId));
    if (relatedExperimentDone) {
      score += 4;
      matchingStrengths.push("Demonstrated Hands-on Practical Aptitude");
    }

    // Normalize between 70% and 97% (never artificial 100%)
    const finalMatch = Math.min(97, Math.max(70, Math.round(score)));

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
