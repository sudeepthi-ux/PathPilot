import { allCareers } from './careerLibraryData.js';

/**
 * Generates a structured 4-stage learning roadmap for any career in PathPilot.
 * Uses the career's specific technical skills, soft skills, tools, beginner projects,
 * and learning resources to generate highly relevant, beginner-friendly activities.
 */
export const generateRoadmapForCareer = (careerId, skillGapData = null) => {
  const career = allCareers.find((c) => c.id === careerId) || allCareers[0];

  const primaryTool = career.tools?.[0] || 'Modern Industry Tools';
  const secondaryTool = career.tools?.[1] || 'Standard Software';
  const primaryTechSkill = career.technicalSkills?.[0] || 'Foundational Technical Craft';
  const secondaryTechSkill = career.technicalSkills?.[1] || 'Core Methods';
  const primarySoftSkill = career.softSkills?.[0] || 'Active Communication';
  const freeResource1 = career.learningResources?.[0] || 'Official Community Starter Tutorials';
  const freeResource2 = career.learningResources?.[1] || 'Open Curated Video Lectures';
  const beginnerProject = career.beginnerProject || 'Build a small hands-on portfolio prototype.';

  // If student did a skill gap analysis, highlight missing skills
  const missingSkills = skillGapData?.missingSkills || [];
  const improvingSkills = skillGapData?.improvingSkills || [];

  return {
    careerId: career.id,
    careerTitle: career.title,
    categoryName: career.categoryName,
    tagline: career.tagline,
    overview: career.overview,
    stages: [
      {
        id: 'stage-1',
        stageNumber: 1,
        title: 'Stage 1: Getting Started (Foundations & Setup)',
        description: 'Understand the big picture, set up your essential free tools, and learn foundational vocabulary without pressure.',
        milestone: 'Domain Fundamentals & Tool Setup',
        estimatedTime: '1–2 weeks',
        activities: [
          {
            id: `${career.id}-act-1-1`,
            title: `Install & configure ${primaryTool}`,
            description: `Set up a free account and explore the basic interface of ${primaryTool}. Familiarize yourself with keyboard shortcuts and workspace navigation.`,
            type: 'tool',
            resource: freeResource1,
            completed: false
          },
          {
            id: `${career.id}-act-1-2`,
            title: `Learn the core principles of ${career.categoryName}`,
            description: `Study how professionals approach ${career.title.toLowerCase()} problems using first-principles thinking.`,
            type: 'concept',
            resource: freeResource2,
            completed: false
          },
          {
            id: `${career.id}-act-1-3`,
            title: `Complete a 30-minute introductory walkthrough`,
            description: `Follow a step-by-step beginner tutorial that guides you through your very first small outcome in ${primaryTool}.`,
            type: 'exercise',
            resource: 'Free Community Tutorials',
            completed: false
          }
        ]
      },
      {
        id: 'stage-2',
        stageNumber: 2,
        title: 'Stage 2: Building Skills (Core Craft & Practice)',
        description: 'Practice the specific technical and human abilities that define successful work in this profession.',
        milestone: 'Core Technical Competencies',
        estimatedTime: '2–4 weeks',
        activities: [
          {
            id: `${career.id}-act-2-1`,
            title: `Master ${primaryTechSkill}`,
            description: `Practice the essential techniques of ${primaryTechSkill} through targeted weekly exercises.`,
            type: 'skill',
            resource: 'Interactive Practice Exercises',
            completed: false
          },
          {
            id: `${career.id}-act-2-2`,
            title: `Deepen competency in ${secondaryTechSkill}`,
            description: `Apply ${secondaryTechSkill} alongside ${secondaryTool} to understand how real teams structure their workflows.`,
            type: 'skill',
            resource: freeResource2,
            completed: false
          },
          {
            id: `${career.id}-act-2-3`,
            title: `Cultivate ${primarySoftSkill} in team discussions`,
            description: `Practice articulating your ideas clearly, taking constructive critique, and asking clarifying questions without hesitation.`,
            type: 'soft-skill',
            resource: 'Student Study Group or Club Project',
            completed: false
          }
        ]
      },
      {
        id: 'stage-3',
        stageNumber: 3,
        title: 'Stage 3: Practical Projects (Hands-on Application)',
        description: 'Apply everything you have learned to build a tangible project that solves a genuine student or community problem.',
        milestone: 'Independent Portfolio Prototype',
        estimatedTime: '2–3 weeks',
        activities: [
          {
            id: `${career.id}-act-3-1`,
            title: 'Define your project scope & target audience',
            description: `Write a 1-page project brief outlining the problem you are solving, who it helps, and your proposed approach.`,
            type: 'planning',
            resource: 'PathPilot Project Planning Canvas',
            completed: false
          },
          {
            id: `${career.id}-act-3-2`,
            title: `Build your beginner prototype: "${beginnerProject.slice(0, 75)}..."`,
            description: beginnerProject,
            type: 'project',
            resource: 'Independent Hands-on Build',
            completed: false
          },
          {
            id: `${career.id}-act-3-3`,
            title: 'Test your prototype with 2 peers',
            description: 'Have two classmates try your prototype without giving them instructions. Note where they stumble and gather honest feedback.',
            type: 'testing',
            resource: 'Peer Usability Walkthrough',
            completed: false
          }
        ]
      },
      {
        id: 'stage-4',
        stageNumber: 4,
        title: 'Stage 4: Career Preparation (Showcase & Community)',
        description: 'Document your learning journey, create a clean showcase piece, and connect with working practitioners.',
        milestone: 'Public Portfolio Piece & Career Readiness',
        estimatedTime: '1–2 weeks',
        activities: [
          {
            id: `${career.id}-act-4-1`,
            title: 'Write a concise 2-page project case study',
            description: 'Explain the problem you solved, the trade-offs you made, the tools you used, and what you would improve next time.',
            type: 'portfolio',
            resource: 'Notion, GitHub, or PDF Case Study',
            completed: false
          },
          {
            id: `${career.id}-act-4-2`,
            title: `Explore entry pathways & relevant internships in ${career.categoryName}`,
            description: `Research organizations, student fellowships, or entry-level roles that hire ${career.title} practitioners.`,
            type: 'networking',
            resource: 'PathPilot Career Profile Guides',
            completed: false
          },
          {
            id: `${career.id}-act-4-3`,
            title: 'Conduct one 15-minute informational conversation',
            description: 'Reach out to an alumnus or working professional in this field. Ask about their daily routine and what advice they have for beginners.',
            type: 'mentorship',
            resource: 'Alumni Network or LinkedIn Outreach',
            completed: false
          }
        ]
      }
    ]
  };
};
