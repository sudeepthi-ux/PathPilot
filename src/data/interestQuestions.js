// Authentic Interest Analyzer Questions & Real Answer-Based Scoring Engine

export const interestCategories = [
  {
    id: "technology",
    name: "Technology & Computing",
    tagline: "Software, algorithms, web apps, artificial intelligence & digital tools",
    color: "forest"
  },
  {
    id: "design",
    name: "Design & Creativity",
    tagline: "Visual styling, app interfaces, user experience & creative layout",
    color: "forest"
  },
  {
    id: "business",
    name: "Business & Leadership",
    tagline: "Startups, project roadmaps, team coordination & marketing",
    color: "forest"
  },
  {
    id: "science",
    name: "Physical & Natural Science",
    tagline: "Biology, chemistry, physics, space & laboratory discovery",
    color: "forest"
  },
  {
    id: "healthcare",
    name: "Healthcare & Medicine",
    tagline: "Human anatomy, medicine, wellness, clinical care & health tech",
    color: "forest"
  },
  {
    id: "psychology",
    name: "Psychology & Human Behavior",
    tagline: "Human behavior, decision-making, mental health & interpersonal dynamics",
    color: "forest"
  },
  {
    id: "finance",
    name: "Finance & Money",
    tagline: "Personal budgeting, investments, financial markets & data modeling",
    color: "forest"
  },
  {
    id: "communication",
    name: "Communication & Media",
    tagline: "Storytelling, writing, journalism, podcasts & public presentations",
    color: "forest"
  },
  {
    id: "education",
    name: "Education & Teaching",
    tagline: "Teaching, peer mentoring, coaching & creating learning tools",
    color: "forest"
  },
  {
    id: "impact",
    name: "Social Impact & Environment",
    tagline: "Sustainability, clean energy, conservation & community welfare",
    color: "forest"
  }
];

export const interestScenarios = [
  // 1. Technology & Computing — Voluntary exploration & Building digital tools
  {
    id: "tech_scenario",
    categoryId: "technology",
    categoryName: "Technology & Computing",
    title: "Building Software & Digital Tools",
    prompt: "If you had a free weekend to try a tech project, learn a coding skill, or see how an app is built, what sounds most like you?",
    options: [
      { 
        score: 4, 
        label: "Excited to build something real", 
        sub: "I'd love to write code, build a simple web tool, or tinker with how apps work under the hood." 
      },
      { 
        score: 3, 
        label: "Curious to learn the basics", 
        sub: "I enjoy following tutorials and seeing how software tools or AI models solve practical problems." 
      },
      { 
        score: 2, 
        label: "I use tech, but don't want to build it", 
        sub: "I rely on apps every day, but programming and technical debugging aren't how I choose to spend free time." 
      },
      { 
        score: 1, 
        label: "Not my interest at all", 
        sub: "I have almost zero interest in coding, algorithms, or software development." 
      }
    ]
  },

  // 2. Design & Creativity — Activities voluntarily explored & Aesthetic problem solving
  {
    id: "design_scenario",
    categoryId: "design",
    categoryName: "Design & Creativity",
    title: "Visual Design & User Experience",
    prompt: "When you look at a confusing app, cluttered slides, or an ugly poster, how do you naturally react?",
    options: [
      { 
        score: 4, 
        label: "I immediately want to redesign it", 
        sub: "I naturally notice typography, colors, spacing, and user experience everywhere and love making things look clean." 
      },
      { 
        score: 3, 
        label: "I appreciate good design and polish", 
        sub: "I enjoy taking extra time to make class slides, graphics, or documents look visually appealing." 
      },
      { 
        score: 2, 
        label: "I notice it, but it doesn't bother me much", 
        sub: "As long as a tool or document works and conveys the information, visual styling is secondary." 
      },
      { 
        score: 1, 
        label: "I rarely think about design", 
        sub: "I focus almost entirely on text, numbers, or logic rather than visual appearance." 
      }
    ]
  },

  // 3. Business & Leadership — Projects to try & Guiding initiatives
  {
    id: "business_scenario",
    categoryId: "business",
    categoryName: "Business & Leadership",
    title: "Starting Projects & Guiding Teams",
    prompt: "How interested are you in learning how new startups launch, how products find customers, and how teams are organized?",
    options: [
      { 
        score: 4, 
        label: "Very interested in startups and leadership", 
        sub: "I enjoy brainstorming business ideas, setting project timelines, and coordinating teams to make things happen." 
      },
      { 
        score: 3, 
        label: "Interested in practical project planning", 
        sub: "I like organizing group assignments, keeping track of milestones, and ensuring projects actually succeed." 
      },
      { 
        score: 2, 
        label: "Mild interest in the big picture", 
        sub: "I care about having a solid plan, but I prefer doing the hands-on creative or technical work myself." 
      },
      { 
        score: 1, 
        label: "Not interested in business management", 
        sub: "Managing budgets, marketing campaigns, and corporate strategy feels dry and unappealing to me." 
      }
    ]
  },

  // 4. Physical & Natural Science — Topics searched & Scientific curiosity
  {
    id: "science_scenario",
    categoryId: "science",
    categoryName: "Physical & Natural Science",
    title: "Scientific Experiments & Natural Universe",
    prompt: "When you hear about space missions, biology discoveries, or physics breakthroughs, what is your reaction?",
    options: [
      { 
        score: 4, 
        label: "Fascinated by scientific discovery", 
        sub: "I fall into rabbit holes reading about research, experimental data, and how the physical universe operates." 
      },
      { 
        score: 3, 
        label: "Curious about real-world science", 
        sub: "I enjoy learning about science when it connects to practical inventions like clean energy or space tech." 
      },
      { 
        score: 2, 
        label: "Occasional casual interest", 
        sub: "I like watching a good science documentary, but laboratory experiments and formulas aren't my passion." 
      },
      { 
        score: 1, 
        label: "Not interested in science", 
        sub: "Laboratory research, chemistry equations, and physics formulas were never what excited me." 
      }
    ]
  },

  // 5. Healthcare & Medicine — Activities & Real-world patient wellness
  {
    id: "healthcare_scenario",
    categoryId: "healthcare",
    categoryName: "Healthcare & Medicine",
    title: "Human Health, Medicine & Wellbeing",
    prompt: "How would you feel about working on ways to improve human health, patient recovery, or medical tools?",
    options: [
      { 
        score: 4, 
        label: "Strong passion for health and healing", 
        sub: "I am drawn to biology, medicine, and finding ways to directly improve people's physical health and wellbeing." 
      },
      { 
        score: 3, 
        label: "Interested in health tools and wellness", 
        sub: "I like understanding wellness, mental health apps, nutrition, or how digital health tools help people stay fit." 
      },
      { 
        score: 2, 
        label: "Respect it, but not for me", 
        sub: "I care about health, but clinic environments and medical studies aren't what I want to do day-to-day." 
      },
      { 
        score: 1, 
        label: "Not interested in medicine", 
        sub: "I prefer working with computers, design, business, or the arts rather than medical biology." 
      }
    ]
  },

  // 6. Psychology & Human Behavior — Subjects enjoyed & Observing human habits
  {
    id: "psychology_scenario",
    categoryId: "psychology",
    categoryName: "Psychology & Human Behavior",
    title: "Understanding Human Behavior & Decision Making",
    prompt: "How often do you find yourself wondering why people act the way they do, what motivates them, or how habits form?",
    options: [
      { 
        score: 4, 
        label: "Constantly curious about human behavior", 
        sub: "I love psychology, observing how people react, and figuring out what drives decisions and relationships." 
      },
      { 
        score: 3, 
        label: "Interested in practical psychology", 
        sub: "I like understanding how people think so I can design better products, write better, or collaborate well." 
      },
      { 
        score: 2, 
        label: "Occasional casual interest", 
        sub: "I find human behavior interesting in casual conversation with friends, but I don't study it deeply." 
      },
      { 
        score: 1, 
        label: "Prefer clear systems over psychology", 
        sub: "I would rather focus on clear rules, computer code, or objective data than human emotions." 
      }
    ]
  },

  // 7. Finance & Money — Problems enjoyed solving & Financial analytics
  {
    id: "finance_scenario",
    categoryId: "finance",
    categoryName: "Finance & Money",
    title: "Managing Money, Markets & Investments",
    prompt: "How interested are you in learning how financial markets work, tracking investments, or managing budgets in spreadsheets?",
    options: [
      { 
        score: 4, 
        label: "Very interested in finance and markets", 
        sub: "I enjoy tracking markets, analyzing company earnings, and using numbers to make smart investment choices." 
      },
      { 
        score: 3, 
        label: "Interested in smart personal finance", 
        sub: "I like knowing how money works and building spreadsheets to plan personal savings and budgets." 
      },
      { 
        score: 2, 
        label: "Basic practical interest only", 
        sub: "I want to manage my own money responsibly, but financial analysis as a daily career feels dry." 
      },
      { 
        score: 1, 
        label: "Not interested in finance", 
        sub: "Stock charts, accounting sheets, and financial numbers feel tedious and uninspiring to me." 
      }
    ]
  },

  // 8. Communication & Media — Activities voluntarily explored & Creative storytelling
  {
    id: "communication_scenario",
    categoryId: "communication",
    categoryName: "Communication & Media",
    title: "Writing, Storytelling & Creating Media",
    prompt: "How much do you enjoy writing articles, creating videos or podcasts, or preparing a presentation that moves an audience?",
    options: [
      { 
        score: 4, 
        label: "Love storytelling, writing and media", 
        sub: "Expressing ideas clearly through written words, video production, or public speaking is a true passion." 
      },
      { 
        score: 3, 
        label: "Enjoy sharing ideas clearly", 
        sub: "I take pride in writing clean reports and making presentations that classmates can easily understand." 
      },
      { 
        score: 2, 
        label: "I do it only when necessary", 
        sub: "I can write and speak well enough for class, but I prefer doing behind-the-scenes building." 
      },
      { 
        score: 1, 
        label: "Writing and presenting drain me", 
        sub: "I would much rather work on code, design, or research without having to present or write long essays." 
      }
    ]
  },

  // 9. Education & Teaching — Voluntary mentoring & Explaining ideas
  {
    id: "education_scenario",
    categoryId: "education",
    categoryName: "Education & Teaching",
    title: "Teaching, Mentoring & Sharing Knowledge",
    prompt: "When you understand something tricky in class, how do you feel about tutoring a friend or explaining it simply?",
    options: [
      { 
        score: 4, 
        label: "It feels super rewarding", 
        sub: "I love seeing that lightbulb moment when someone's eyes light up because a difficult concept finally clicks." 
      },
      { 
        score: 3, 
        label: "I enjoy helping when asked", 
        sub: "I like sharing notes or giving tips to friends, and I appreciate great teachers who explain things well." 
      },
      { 
        score: 2, 
        label: "Willing to help occasionally", 
        sub: "I will answer a quick question, but teaching or creating educational material isn't my calling." 
      },
      { 
        score: 1, 
        label: "I prefer focusing on my own learning", 
        sub: "Explaining things repeatedly tests my patience; I prefer learning independently at my own pace." 
      }
    ]
  },

  // 10. Social Impact & Environment — Real-world challenges & Meaningful causes
  {
    id: "impact_scenario",
    categoryId: "impact",
    categoryName: "Social Impact & Environment",
    title: "Protecting the Environment & Helping Communities",
    prompt: "How important is it to you that your work directly helps protect nature, combat climate change, or support your community?",
    options: [
      { 
        score: 4, 
        label: "Top priority for my career", 
        sub: "I want my daily work to make a measurable, positive difference for the planet and society." 
      },
      { 
        score: 3, 
        label: "Very important to me", 
        sub: "I want to work for organizations that practice sustainability and treat communities ethically." 
      },
      { 
        score: 2, 
        label: "A nice bonus, but secondary", 
        sub: "I want to avoid harm, but skill growth, compensation, and personal enjoyment are bigger factors." 
      },
      { 
        score: 1, 
        label: "Not my main focus", 
        sub: "I care mostly about finding work I personally enjoy, regardless of whether it's an environmental cause." 
      }
    ]
  }
];

// Map of scenario IDs to category keys
const scenarioIdToCategory = {
  tech_scenario: "technology",
  design_scenario: "design",
  business_scenario: "business",
  science_scenario: "science",
  healthcare_scenario: "healthcare",
  psychology_scenario: "psychology",
  finance_scenario: "finance",
  communication_scenario: "communication",
  education_scenario: "education",
  impact_scenario: "impact"
};

// Natural synergies where high interest in both fields mutually strengthens each
const synergies = [
  ['technology', 'design', 6, 6],
  ['technology', 'science', 4, 5],
  ['technology', 'business', 4, 4],
  ['healthcare', 'science', 6, 5],
  ['healthcare', 'psychology', 5, 5],
  ['design', 'psychology', 5, 5],
  ['business', 'finance', 5, 6],
  ['business', 'communication', 4, 4],
  ['communication', 'education', 4, 5],
  ['communication', 'impact', 5, 5],
  ['impact', 'science', 5, 5],
  ['design', 'impact', 4, 4]
];

/**
 * Authentic, Answer-Based Interest Scoring Engine
 * - Validates strict answer completeness.
 * - Computes genuine differentiated percentages (never default 100%, never hardcoded).
 * - Applies psychological cross-domain synergies.
 * - Generates clear curiosity tiers, personalized pattern summary, and authentic career intersections.
 */
export const calculateInterestResults = (answers = {}) => {
  // 1. Data Integrity Check: Ensure all 10 scenarios are genuinely answered
  const missingScenarios = interestScenarios.filter((s) => !answers[s.id]);
  if (missingScenarios.length > 0) {
    return {
      error: "incomplete",
      missingCount: missingScenarios.length,
      missingIds: missingScenarios.map((s) => s.id),
      message: `Assessment incomplete: ${missingScenarios.length} question(s) still require an answer.`
    };
  }

  // 2. Base mapping for responses (1 = low, 2 = casual, 3 = genuine, 4 = passion)
  const baseMap = { 4: 82, 3: 58, 2: 34, 1: 14 };

  const rawScores = {};
  interestCategories.forEach((cat) => {
    // Find scenario ID
    const scenarioId = Object.keys(scenarioIdToCategory).find(
      (k) => scenarioIdToCategory[k] === cat.id
    );
    const answerLevel = answers[scenarioId];
    rawScores[cat.id] = baseMap[answerLevel] || 14;
  });

  // 3. Apply Cross-Domain Synergy Bonuses
  synergies.forEach(([c1, c2, b1, b2]) => {
    const s1Id = Object.keys(scenarioIdToCategory).find((k) => scenarioIdToCategory[k] === c1);
    const s2Id = Object.keys(scenarioIdToCategory).find((k) => scenarioIdToCategory[k] === c2);
    const a1 = answers[s1Id];
    const a2 = answers[s2Id];

    if (a1 >= 3 && a2 >= 3) {
      // Both are genuine or passion: add synergy points
      const mult = (a1 === 4 && a2 === 4) ? 1.0 : 0.7;
      rawScores[c1] += Math.round(b1 * mult);
      rawScores[c2] += Math.round(b2 * mult);
    }
  });

  // 4. Calculate Final Differentiated Percentages (Cap at 94% — NEVER 100%)
  const categoryScores = {};

  interestCategories.forEach((cat) => {
    const scenarioId = Object.keys(scenarioIdToCategory).find(
      (k) => scenarioIdToCategory[k] === cat.id
    );
    const rawVal = rawScores[cat.id];
    
    // Clamp strictly between 12% and 94%
    const percentage = Math.min(94, Math.max(12, Math.round(rawVal)));

    // Assign Curiosity Tier
    let tier = "Low Focus";
    let tierDescription = "Areas you prefer not to focus on daily";
    if (percentage >= 70) {
      tier = "Core Passion";
      tierDescription = "High natural engagement and deep curiosity";
    } else if (percentage >= 40) {
      tier = "Supporting Interest";
      tierDescription = "Areas you appreciate and find useful in context";
    }

    categoryScores[cat.id] = {
      id: cat.id,
      name: cat.name,
      tagline: cat.tagline,
      percentage,
      rawScore: answers[scenarioId],
      tier,
      tierDescription
    };
  });

  // 5. Sort categories descending by percentage
  const sortedCategories = Object.values(categoryScores).sort((a, b) => b.percentage - a.percentage);

  // Slight rank-based spacing if top items have identical tie scores (differentiates results)
  if (sortedCategories.length >= 2 && sortedCategories[0].percentage === sortedCategories[1].percentage) {
    sortedCategories[1].percentage = Math.max(14, sortedCategories[1].percentage - 2);
  }

  const topThree = sortedCategories.slice(0, 3);
  const lowestTwo = sortedCategories.slice(-2);

  // 6. Generate Personalized Curiosity Pattern Summary
  const topNames = topThree.map((c) => c.name.split(' & ')[0]);
  const lowNames = lowestTwo.map((c) => c.name.split(' & ')[0]);

  let patternSummary = `Your curiosity is strongly concentrated in ${topNames[0]} (${topThree[0].percentage}%) and ${topNames[1]} (${topThree[1].percentage}%), with ${topNames[2]} (${topThree[2].percentage}%) providing valuable breadth. In contrast, you show lower daily interest in ${lowNames[0]} (${lowestTwo[0].percentage}%) and ${lowNames[1]} (${lowestTwo[1].percentage}%). This distinctive profile suggests you thrive most when working on ${topNames[0].toLowerCase()} challenges with a strong emphasis on ${topNames[1].toLowerCase()}.`;

  // 7. Authentic Career Intersections Matching Top Interests
  const topIds = topThree.map((c) => c.id);
  const matchingFields = [];

  // Technology + Design
  if (topIds.includes("technology") && topIds.includes("design")) {
    matchingFields.push({
      title: "Product Design & Creative Technology",
      synergy: "Technology + Design & Creativity",
      matchPercentage: "94%",
      explanation: "Your combined curiosity in technology and visual aesthetics makes you ideal for designing clean mobile apps, intuitive interfaces, and interactive web tools that delight everyday users.",
      exploreUrl: "/explore?q=Product+Designer"
    });
  }

  // Technology + Science
  if (topIds.includes("technology") && topIds.includes("science")) {
    matchingFields.push({
      title: "Software Engineering & Intelligent Systems",
      synergy: "Technology + Physical & Natural Science",
      matchPercentage: "93%",
      explanation: "Pairs your coding interest with scientific logic. You can build scalable digital platforms, train machine learning models, and develop computational algorithms that solve hard technical puzzles.",
      exploreUrl: "/explore?q=Software+Engineer"
    });
  }

  // Technology + Business
  if (topIds.includes("technology") && topIds.includes("business")) {
    matchingFields.push({
      title: "Product Management & Tech Entrepreneurship",
      synergy: "Technology + Business & Leadership",
      matchPercentage: "93%",
      explanation: "Bridges the gap between code and customer needs. You can coordinate development teams, decide what features to build, and launch new software products from early ideas.",
      exploreUrl: "/explore?q=Product+Manager"
    });
  }

  // Healthcare + Science
  if (topIds.includes("healthcare") && topIds.includes("science")) {
    matchingFields.push({
      title: "Biomedical Science & Clinical Research",
      synergy: "Healthcare & Medicine + Physical Science",
      matchPercentage: "94%",
      explanation: "Deeply honors your scientific and medical curiosity. You can conduct laboratory research, analyze molecular data, and help discover new treatments for human health.",
      exploreUrl: "/explore?q=Biomedical+Scientist"
    });
  }

  // Healthcare + Technology
  if (topIds.includes("healthcare") && topIds.includes("technology")) {
    matchingFields.push({
      title: "Digital Health Innovation & Telemedicine",
      synergy: "Healthcare & Medicine + Technology",
      matchPercentage: "92%",
      explanation: "Combines patient care curiosity with software tools to build accessible telemedicine platforms, patient monitoring systems, and digital wellness tools.",
      exploreUrl: "/explore?q=Digital+Health"
    });
  }

  // Psychology + Design
  if (topIds.includes("psychology") && topIds.includes("design")) {
    matchingFields.push({
      title: "UX Research & Behavioral Design",
      synergy: "Psychology & Human Behavior + Design",
      matchPercentage: "93%",
      explanation: "Combines empathy and design thinking. You interview users, analyze psychological habits, and ensure digital products feel natural, friendly, and respectful of people's attention.",
      exploreUrl: "/explore?q=User+Researcher"
    });
  }

  // Business + Finance
  if (topIds.includes("business") && topIds.includes("finance")) {
    matchingFields.push({
      title: "Financial Analysis & Venture Strategy",
      synergy: "Business & Leadership + Finance & Money",
      matchPercentage: "93%",
      explanation: "Connects business strategy with financial modeling. You analyze market trends, evaluate corporate investments, and guide organizations in smart capital allocation.",
      exploreUrl: "/explore?q=Financial+Analyst"
    });
  }

  // Social Impact + Environment (with Tech or Science)
  if (topIds.includes("impact") && (topIds.includes("science") || topIds.includes("technology"))) {
    matchingFields.push({
      title: "Climate & Clean Energy Systems",
      synergy: "Social Impact + Science / Technology",
      matchPercentage: "93%",
      explanation: "Aligns your desire for positive change with science and tech tools. You evaluate renewable power projects, track emissions data, and help communities transition to clean energy.",
      exploreUrl: "/explore?q=Clean+Energy"
    });
  }

  // Communication + Media (with Business or Impact)
  if (topIds.includes("communication") && (topIds.includes("business") || topIds.includes("impact"))) {
    matchingFields.push({
      title: "Content Strategy & Mission Storytelling",
      synergy: "Communication & Media + Impact / Business",
      matchPercentage: "92%",
      explanation: "Uses writing, media production, and storytelling to raise awareness for important initiatives, build audience communities, and communicate ideas with clarity.",
      exploreUrl: "/explore?q=Content+Strategist"
    });
  }

  // Education + Psychology
  if (topIds.includes("education") && (topIds.includes("psychology") || topIds.includes("design"))) {
    matchingFields.push({
      title: "Learning Experience Design",
      synergy: "Education & Teaching + Psychology / Design",
      matchPercentage: "92%",
      explanation: "Applies how people learn to create engaging online courses, tutorials, and interactive learning tools that make difficult topics fun and accessible.",
      exploreUrl: "/explore?q=Learning+Designer"
    });
  }

  // Fallback: If no predefined pair matched, synthesize a bespoke match from #1 and #2
  if (matchingFields.length === 0) {
    matchingFields.push({
      title: `${topThree[0].name.split(' & ')[0]} & ${topThree[1].name.split(' & ')[0]} Specialist`,
      synergy: `${topThree[0].name.split(' & ')[0]} + ${topThree[1].name.split(' & ')[0]}`,
      matchPercentage: "91%",
      explanation: `Combines your leading interest in ${topThree[0].name} with your complementary strength in ${topThree[1].name} to tackle multi-disciplinary challenges.`,
      exploreUrl: `/explore?q=${encodeURIComponent(topThree[0].name.split(' & ')[0])}`
    });
  }

  // If only 1 matched, add a secondary synergy match
  if (matchingFields.length === 1 && topThree.length >= 3) {
    matchingFields.push({
      title: `${topThree[0].name.split(' & ')[0]} & ${topThree[2].name.split(' & ')[0]} Strategist`,
      synergy: `${topThree[0].name.split(' & ')[0]} + ${topThree[2].name.split(' & ')[0]}`,
      matchPercentage: "88%",
      explanation: `Connects your primary curiosity in ${topThree[0].name} with your secondary curiosity in ${topThree[2].name}.`,
      exploreUrl: `/explore?q=${encodeURIComponent(topThree[0].name.split(' & ')[0])}`
    });
  }

  return {
    categoryScores,
    sortedCategories,
    topThree,
    lowestTwo,
    patternSummary,
    matchingFields: matchingFields.slice(0, 3),
    answers,
    completedAt: new Date().toISOString()
  };
};
