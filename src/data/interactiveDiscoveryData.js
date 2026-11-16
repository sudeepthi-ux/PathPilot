// 5-Question Interactive Discovery Data & Dynamic Recommendation Engine

export const discoveryQuestions = [
  // 1. Favourite Subjects and Interests
  {
    id: 'subject',
    step: 1,
    category: 'Subjects & Curiosity',
    question: 'What subjects or topics spark your curiosity most?',
    hint: 'Pick the area you naturally enjoy reading about, watching videos on, or exploring in class.',
    options: [
      {
        id: 'tech',
        label: 'Technology & Coding',
        desc: 'Software apps, AI tools, websites, and how digital gadgets work under the hood.'
      },
      {
        id: 'design',
        label: 'Visual Arts & Design',
        desc: 'Graphic layouts, app interfaces, photography, typography, and beautiful visuals.'
      },
      {
        id: 'business',
        label: 'Business & Startups',
        desc: 'Entrepreneurship, marketing, launching products, and how companies grow.'
      },
      {
        id: 'science',
        label: 'Science & Discovery',
        desc: 'Biology, physics, chemistry, space, and investigating how the universe works.'
      },
      {
        id: 'health',
        label: 'Healthcare & Medicine',
        desc: 'Human health, anatomy, clinical care, wellness, and medical technology.'
      },
      {
        id: 'psychology',
        label: 'Psychology & Human Behavior',
        desc: 'Understanding why people make decisions, human emotions, and mental habits.'
      },
      {
        id: 'media',
        label: 'Writing, Media & Culture',
        desc: 'Storytelling, journalism, video production, podcasts, and public communication.'
      }
    ]
  },

  // 2. Activities the Student Enjoys
  {
    id: 'activity',
    step: 2,
    category: 'Daily Activities',
    question: 'What kind of activities do you genuinely enjoy doing?',
    hint: 'Think about what you lose track of time doing when you have a free afternoon.',
    options: [
      {
        id: 'build',
        label: 'Building & Creating Things',
        desc: 'Coding apps, designing graphics, editing videos, or crafting physical prototypes.'
      },
      {
        id: 'solve',
        label: 'Investigating & Solving Puzzles',
        desc: 'Debugging tricky errors, analyzing data patterns, and finding the root cause of problems.'
      },
      {
        id: 'organize',
        label: 'Planning & Coordinating Projects',
        desc: 'Setting up timelines, organizing team work, and making sure big projects finish smoothly.'
      },
      {
        id: 'help',
        label: 'Helping & Mentoring Others',
        desc: 'Explaining difficult concepts to classmates, tutoring, listening, and offering support.'
      },
      {
        id: 'write',
        label: 'Writing & Communicating Ideas',
        desc: 'Writing clear articles, crafting presentations, and explaining ideas to an audience.'
      },
      {
        id: 'explore',
        label: 'Exploring Nature & Sustainability',
        desc: 'Working on eco-friendly projects, clean energy, and protecting the local environment.'
      }
    ]
  },

  // 3. Preferred Working Style
  {
    id: 'style',
    step: 3,
    category: 'Working Style',
    question: 'In what kind of environment or rhythm do you get the most done?',
    hint: 'Choose the daily working style where you feel most energized and productive.',
    options: [
      {
        id: 'quiet',
        label: 'Quiet, Focused Independence',
        desc: 'Deep focus on solo projects in a calm environment with minimal interruptions.'
      },
      {
        id: 'collaborative',
        label: 'Collaborative Team Energy',
        desc: 'Bouncing ideas off teammates, lively brainstorms, and group problem-solving.'
      },
      {
        id: 'flexible',
        label: 'Flexible Hybrid Balance',
        desc: 'A comfortable mix of independent heads-down work and collaborative check-ins.'
      },
      {
        id: 'fast',
        label: 'Fast-Paced & Experimental',
        desc: 'Testing ideas quickly, learning through trial and error, and adapting on the fly.'
      },
      {
        id: 'structured',
        label: 'Structured & Methodical',
        desc: 'Clear goals, organized checklists, and steady, predictable progress without surprises.'
      },
      {
        id: 'craft',
        label: 'Dedicated Craftsmanship',
        desc: 'Taking the time to polish details until a piece of work looks and feels exceptional.'
      }
    ]
  },

  // 4. Personal Motivations and Curiosity
  {
    id: 'motivation',
    step: 4,
    category: 'Core Motivation',
    question: 'What makes a project feel truly worthwhile and exciting to you?',
    hint: 'What gives you that genuine sense of accomplishment when you finish something?',
    options: [
      {
        id: 'create_new',
        label: 'Creating Something Original',
        desc: 'Bringing a brand-new idea, invention, or design to life that didn’t exist before.'
      },
      {
        id: 'help_people',
        label: 'Helping Real People',
        desc: 'Knowing that my work makes someone’s daily life noticeably easier, healthier, or better.'
      },
      {
        id: 'mastery',
        label: 'Mastering a Respected Craft',
        desc: 'Becoming exceptionally skilled at what I do and being known for reliable quality.'
      },
      {
        id: 'learning',
        label: 'Continuous Discovery & Curiosity',
        desc: 'Always learning new things, reading, and exploring ideas outside my comfort zone.'
      },
      {
        id: 'impact',
        label: 'Making a Positive Societal Impact',
        desc: 'Working on causes that protect the environment, advance fairness, and support society.'
      },
      {
        id: 'growth',
        label: 'Growth, Leadership & Independence',
        desc: 'Building valuable skills that give me high career freedom and leadership opportunities.'
      }
    ]
  },

  // 5. Preferred Future Career Direction
  {
    id: 'direction',
    step: 5,
    category: 'Future Direction',
    question: 'Looking ahead, what type of field sounds most exciting to pursue?',
    hint: 'Where would you love to see yourself applying your skills in a few years?',
    options: [
      {
        id: 'software',
        label: 'Software, Coding & AI Systems',
        desc: 'Building intelligent web apps, mobile tools, algorithms, or secure networks.'
      },
      {
        id: 'ux_design',
        label: 'Design, Interfaces & Experiences',
        desc: 'Designing clean apps, interactive prototypes, user experiences, and visual branding.'
      },
      {
        id: 'product_mgmt',
        label: 'Product Leadership & Startups',
        desc: 'Leading product roadmaps, launching new ventures, and coordinating creative teams.'
      },
      {
        id: 'bio_health',
        label: 'Healthcare, Wellness & Bio-Tech',
        desc: 'Advancing medicine, patient wellness, biological research, or digital health tools.'
      },
      {
        id: 'analytics',
        label: 'Data, Finance & Strategy',
        desc: 'Uncovering trends in numbers, economic modeling, market analytics, and strategy.'
      },
      {
        id: 'sustainability',
        label: 'Environment, Clean Energy & Architecture',
        desc: 'Designing sustainable buildings, combating climate change, and green innovation.'
      },
      {
        id: 'media_culture',
        label: 'Storytelling, Education & Advocacy',
        desc: 'Writing impactful media, designing courses, public policy, or civil rights.'
      }
    ]
  }
];

// Profile scoring mappings across PathPilot’s 21 authentic careers
const careerProfiles = [
  {
    id: 'product-designer',
    title: 'Product (UI/UX) Designer',
    categoryName: 'Design & Creativity',
    tagline: 'Design intuitive apps and websites that delight people',
    subjects: ['design', 'psychology', 'tech'],
    activities: ['build', 'help', 'solve'],
    styles: ['craft', 'collaborative', 'flexible'],
    motivations: ['create_new', 'help_people', 'mastery'],
    directions: ['ux_design', 'software'],
    baseReason: 'You love visual design and want to build things people enjoy using every day. As a Product Designer, you combine empathy and clean aesthetics to craft intuitive apps and websites.'
  },
  {
    id: 'software-engineer',
    title: 'Full-Stack Software Engineer',
    categoryName: 'Technology',
    tagline: 'Build web applications and scalable digital tools',
    subjects: ['tech', 'science'],
    activities: ['build', 'solve'],
    styles: ['quiet', 'flexible', 'structured'],
    motivations: ['create_new', 'mastery', 'growth'],
    directions: ['software'],
    baseReason: 'Your natural curiosity in technology and building makes software engineering a prime path. You turn logic and ideas into functional web apps, tools, and digital platforms.'
  },
  {
    id: 'ai-engineer',
    title: 'AI & Machine Learning Specialist',
    categoryName: 'Technology',
    tagline: 'Train intelligent systems to solve complex challenges',
    subjects: ['tech', 'science'],
    activities: ['solve', 'build'],
    styles: ['quiet', 'fast', 'structured'],
    motivations: ['learning', 'create_new', 'mastery'],
    directions: ['software', 'analytics'],
    baseReason: 'Ideal for your love of problem-solving and modern tech. You get to teach algorithms to recognize patterns, assist humans, and solve big challenges with data.'
  },
  {
    id: 'creative-technologist',
    title: 'Creative Technologist',
    categoryName: 'Design & Creativity',
    tagline: 'Combine interactive code with visual art and spatial design',
    subjects: ['design', 'tech'],
    activities: ['build', 'explore'],
    styles: ['fast', 'craft', 'flexible'],
    motivations: ['create_new', 'learning'],
    directions: ['ux_design', 'software'],
    baseReason: 'Sits right at the intersection of creative design and code. You build experimental web prototypes, generative graphics, and interactive digital exhibits.'
  },
  {
    id: 'graphic-designer',
    title: 'Brand & Visual Designer',
    categoryName: 'Design & Creativity',
    tagline: 'Shape visual identities, typography, and memorable brands',
    subjects: ['design', 'media'],
    activities: ['build', 'write'],
    styles: ['craft', 'quiet', 'flexible'],
    motivations: ['create_new', 'mastery'],
    directions: ['ux_design', 'media_culture'],
    baseReason: 'Matches your appreciation for aesthetics and craftsmanship. You create brand identities, typography systems, and visual stories that leave a lasting impression.'
  },
  {
    id: 'product-manager',
    title: 'Associate Product Manager',
    categoryName: 'Business & Management',
    tagline: 'Guide the vision and execution of modern digital products',
    subjects: ['business', 'tech', 'psychology'],
    activities: ['organize', 'solve', 'help'],
    styles: ['collaborative', 'flexible', 'fast'],
    motivations: ['growth', 'create_new', 'help_people'],
    directions: ['product_mgmt', 'software'],
    baseReason: 'Connects technology with team leadership. You listen to users, decide what features to build next, and bring designers and engineers together to ship great products.'
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur & Startup Founder',
    categoryName: 'Business & Management',
    tagline: 'Turn early concepts into impactful new ventures',
    subjects: ['business', 'tech', 'design'],
    activities: ['build', 'organize'],
    styles: ['fast', 'collaborative', 'flexible'],
    motivations: ['growth', 'create_new', 'impact'],
    directions: ['product_mgmt', 'software'],
    baseReason: 'Perfect for someone with high initiative who wants to build something original. You validate business ideas, assemble passionate teams, and launch new ventures.'
  },
  {
    id: 'user-researcher',
    title: 'UX Researcher & Behavioral Scientist',
    categoryName: 'Psychology',
    tagline: 'Study human behavior to make digital tools simpler and kinder',
    subjects: ['psychology', 'design', 'health'],
    activities: ['help', 'solve', 'write'],
    styles: ['collaborative', 'flexible', 'quiet'],
    motivations: ['help_people', 'learning'],
    directions: ['ux_design', 'media_culture'],
    baseReason: 'Draws on your curiosity about people and empathy. You interview real users, test prototypes, and uncover insights that make technology friendlier for everyone.'
  },
  {
    id: 'computational-biologist',
    title: 'Computational Biologist',
    categoryName: 'Science & Research',
    tagline: 'Decode genetics and living systems using software and data',
    subjects: ['science', 'tech', 'health'],
    activities: ['solve', 'build'],
    styles: ['quiet', 'structured', 'craft'],
    motivations: ['learning', 'impact', 'mastery'],
    directions: ['bio_health', 'software'],
    baseReason: 'Bridges science and computing. You use algorithms and data to understand DNA, disease patterns, and living organisms to advance life-saving scientific cures.'
  },
  {
    id: 'digital-health-innovator',
    title: 'Digital Health Innovator',
    categoryName: 'Healthcare',
    tagline: 'Use technology to make patient care accessible and friendly',
    subjects: ['health', 'tech', 'psychology'],
    activities: ['help', 'build', 'organize'],
    styles: ['collaborative', 'flexible'],
    motivations: ['help_people', 'impact'],
    directions: ['bio_health', 'ux_design'],
    baseReason: 'Combines your desire to help people with modern tools. You design telehealth apps, patient monitoring systems, and digital wellness tools that improve healthcare access.'
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    categoryName: 'Finance',
    tagline: 'Analyze market data, model trends, and guide smart investments',
    subjects: ['business', 'tech', 'science'],
    activities: ['solve', 'organize'],
    styles: ['structured', 'quiet'],
    motivations: ['growth', 'mastery'],
    directions: ['analytics', 'product_mgmt'],
    baseReason: 'Plays to your analytical curiosity. You build economic models, analyze financial trends, and help companies and investors make sound financial choices.'
  },
  {
    id: 'climate-energy-analyst',
    title: 'Climate & Clean Energy Analyst',
    categoryName: 'Social Impact & Environment',
    tagline: 'Accelerate the transition to renewable power and sustainability',
    subjects: ['science', 'tech', 'business'],
    activities: ['explore', 'solve'],
    styles: ['structured', 'flexible'],
    motivations: ['impact', 'learning'],
    directions: ['sustainability', 'analytics'],
    baseReason: 'Aligns with your care for the environment and analytical thinking. You evaluate solar and wind projects, track emissions data, and help communities transition to clean power.'
  },
  {
    id: 'sustainable-architect',
    title: 'Sustainable Architect',
    categoryName: 'Architecture & Construction',
    tagline: 'Design eco-friendly buildings and harmonious physical spaces',
    subjects: ['design', 'science'],
    activities: ['build', 'explore'],
    styles: ['craft', 'collaborative'],
    motivations: ['impact', 'create_new'],
    directions: ['sustainability', 'ux_design'],
    baseReason: 'Combines structural creativity with sustainability. You design modern, energy-efficient buildings and public spaces that harmonize with nature.'
  },
  {
    id: 'content-strategist',
    title: 'Content & Narrative Strategist',
    categoryName: 'Media & Communication',
    tagline: 'Tell engaging stories that connect people with meaningful ideas',
    subjects: ['media', 'psychology', 'design'],
    activities: ['write', 'help'],
    styles: ['quiet', 'collaborative', 'flexible'],
    motivations: ['create_new', 'help_people'],
    directions: ['media_culture', 'ux_design'],
    baseReason: 'Leverages your love for storytelling and clear communication. You write compelling narratives, organize digital content, and help organizations share their message.'
  },
  {
    id: 'learning-designer',
    title: 'Learning Experience Designer',
    categoryName: 'Education',
    tagline: 'Make complex topics intuitive and exciting for students to learn',
    subjects: ['psychology', 'design', 'tech'],
    activities: ['help', 'write', 'build'],
    styles: ['collaborative', 'craft'],
    motivations: ['help_people', 'learning'],
    directions: ['media_culture', 'ux_design'],
    baseReason: 'Draws on your passion for teaching and creative presentation. You create engaging courses, interactive tutorials, and learning tools that help people master skills.'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    categoryName: 'Technology',
    tagline: 'Protect critical data, systems, and user privacy from threats',
    subjects: ['tech', 'science'],
    activities: ['solve', 'organize'],
    styles: ['structured', 'quiet'],
    motivations: ['mastery', 'impact'],
    directions: ['software', 'analytics'],
    baseReason: 'Ideal for those who enjoy detective-style problem solving. You safeguard systems, spot security vulnerabilities, and defend user privacy in the digital age.'
  },
  {
    id: 'growth-marketer',
    title: 'Growth & Community Marketer',
    categoryName: 'Marketing',
    tagline: 'Grow passionate communities and introduce people to great products',
    subjects: ['business', 'media', 'psychology'],
    activities: ['write', 'organize'],
    styles: ['fast', 'collaborative'],
    motivations: ['growth', 'create_new'],
    directions: ['product_mgmt', 'media_culture'],
    baseReason: 'Combines creative storytelling with data-driven experiments. You introduce exciting products to students and build lively, engaged user communities.'
  },
  {
    id: 'biomedical-scientist',
    title: 'Biomedical Research Scientist',
    categoryName: 'Science & Research',
    tagline: 'Conduct laboratory research to discover novel treatments',
    subjects: ['science', 'health'],
    activities: ['solve', 'help'],
    styles: ['structured', 'craft', 'quiet'],
    motivations: ['learning', 'help_people', 'impact'],
    directions: ['bio_health', 'analytics'],
    baseReason: 'Deeply honors scientific curiosity. You design laboratory experiments, analyze molecular pathways, and help discover new treatments for human health.'
  },
  {
    id: 'public-policy-analyst',
    title: 'Public Policy & Civic Analyst',
    categoryName: 'Government Services',
    tagline: 'Analyze civic issues and shape policies that benefit communities',
    subjects: ['psychology', 'media', 'business'],
    activities: ['write', 'solve', 'help'],
    styles: ['structured', 'collaborative'],
    motivations: ['impact', 'help_people'],
    directions: ['media_culture', 'analytics'],
    baseReason: 'Driven by social impact and clear analysis. You research community challenges, evaluate laws, and write recommendations that make civic systems fairer.'
  },
  {
    id: 'tech-attorney',
    title: 'Technology & Civil Rights Attorney',
    categoryName: 'Law',
    tagline: 'Protect digital privacy, ethical AI, and fair technology rules',
    subjects: ['tech', 'psychology', 'media'],
    activities: ['solve', 'write'],
    styles: ['structured', 'quiet'],
    motivations: ['impact', 'mastery'],
    directions: ['media_culture', 'software'],
    baseReason: 'Brings together logic, writing, and justice. You advocate for fair technology policies, protect digital privacy rights, and ensure ethical technological growth.'
  },
  {
    id: 'sustainable-travel-curator',
    title: 'Sustainable Travel & Experience Curator',
    categoryName: 'Hospitality & Tourism',
    tagline: 'Curate meaningful, culturally respectful travel experiences',
    subjects: ['media', 'business', 'science'],
    activities: ['organize', 'explore'],
    styles: ['collaborative', 'flexible'],
    motivations: ['impact', 'create_new'],
    directions: ['sustainability', 'media_culture'],
    baseReason: 'For those who love culture, exploration, and hospitality. You design memorable travel journeys that support local artisans and preserve natural ecosystems.'
  }
];

/**
 * Calculates top 2–3 career matches based on the student's 5 answers.
 * Dynamically adjusts match percentage and writes a personalized explanation.
 */
export const getCareerMatches = (answers = {}) => {
  const {
    subject = 'tech',
    activity = 'build',
    style = 'flexible',
    motivation = 'create_new',
    direction = 'software'
  } = answers;

  // Score each career
  const scored = careerProfiles.map((career) => {
    let score = 50; // Base score

    // Subject alignment (+15 if primary, +8 if secondary)
    if (career.subjects[0] === subject) score += 16;
    else if (career.subjects.includes(subject)) score += 9;

    // Activity alignment (+14)
    if (career.activities[0] === activity) score += 14;
    else if (career.activities.includes(activity)) score += 8;

    // Direction alignment (+16)
    if (career.directions[0] === direction) score += 16;
    else if (career.directions.includes(direction)) score += 8;

    // Motivation alignment (+10)
    if (career.motivations.includes(motivation)) score += 10;

    // Working style alignment (+8)
    if (career.styles.includes(style)) score += 8;

    // Clamp score between 78% and 98%
    const matchPercentage = Math.min(98, Math.max(76, score));

    return {
      ...career,
      matchPercentage
    };
  });

  // Sort descending
  scored.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Return top 3 matches
  const topMatches = scored.slice(0, 3).map((match, idx) => {
    // Generate tailored, personal 2-sentence explanation
    let personalizedReason = match.baseReason;

    // Add extra relevance touchpoint if exact subject or direction matches
    if (idx === 0 && match.directions.includes(direction)) {
      personalizedReason = `Your ambition for ${discoveryQuestions[4].options.find(o => o.id === direction)?.label || 'this field'} and interest in ${discoveryQuestions[0].options.find(o => o.id === subject)?.label || 'this subject'} makes this an exceptional fit. ${match.baseReason}`;
    }

    return {
      id: match.id,
      title: match.title,
      categoryName: match.categoryName,
      tagline: match.tagline,
      matchPercentage: `${match.matchPercentage}%`,
      why: personalizedReason,
      exploreUrl: `/explore?q=${encodeURIComponent(match.title)}`
    };
  });

  return topMatches;
};
