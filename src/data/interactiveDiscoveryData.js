import { allCareers } from './careerLibraryData.js';

// 5-Question Interactive Discovery Data & Dynamic Recommendation Engine

export const discoveryQuestions = [
  // 1. Favourite Subjects and Interests
  {
    id: 'subject',
    step: 1,
    category: 'Subjects & Curiosity',
    question: 'What subjects or topics spark your curiosity most?',
    hint: 'Pick the area you naturally enjoy reading about, tinkering with, or exploring outside homework.',
    options: [
      {
        id: 'tech',
        label: 'Software, Coding & Computing',
        desc: 'Apps, websites, cloud software, cybersecurity, and how digital code powers programs.'
      },
      {
        id: 'robotics_eng',
        label: 'Robotics, Machines & Physical Engineering',
        desc: 'Robots, drones, electronics, gears, circuits, and how real-world physical machines move.'
      },
      {
        id: 'design',
        label: 'Visual Arts, Product & Spatial Design',
        desc: 'App interfaces, physical industrial objects, typography, architecture, and creative visuals.'
      },
      {
        id: 'science',
        label: 'Science, Space & Research',
        desc: 'Astrophysics, genetics, chemistry, neuroscience, materials, and how nature works.'
      },
      {
        id: 'business',
        label: 'Business, Economics & Startups',
        desc: 'Entrepreneurship, innovation strategy, finance, marketing, and how organizations grow.'
      },
      {
        id: 'health',
        label: 'Healthcare, Bionics & Wellbeing',
        desc: 'Human health, medical devices, clinical care, biotech, and patient wellbeing.'
      },
      {
        id: 'psychology',
        label: 'Psychology & Human Behavior',
        desc: 'Understanding how people think, interact with technology, learn, and make decisions.'
      },
      {
        id: 'media',
        label: 'Writing, Storytelling & Public Policy',
        desc: 'Journalism, education, civic policy, law, travel culture, and clear communication.'
      }
    ]
  },

  // 2. Activities the Student Enjoys
  {
    id: 'activity',
    step: 2,
    category: 'Daily Activities',
    question: 'What kind of activities do you genuinely enjoy doing?',
    hint: 'Think about what absorbs your focus—including whether you prefer hands-on hardware, people, ideas, or pure coding.',
    options: [
      {
        id: 'build',
        label: 'Writing Code & Building Software Apps',
        desc: 'Programming interactive apps, AI models, digital games, or cloud platforms on a computer.'
      },
      {
        id: 'hardware_hands_on',
        label: 'Hands-On Hardware, Machines & Prototypes (Less Pure Coding)',
        desc: 'Wiring sensors, sculpting 3D mechanical parts, testing drones/robots, or lab fabrication without living in pure software code.'
      },
      {
        id: 'solve',
        label: 'Investigating Mysteries & Analyzing Data',
        desc: 'Designing experiments, decoding scientific puzzles, auditing systems, and finding root causes.'
      },
      {
        id: 'organize',
        label: 'Leading Projects, Strategy & Teams',
        desc: 'Coordinating roadmaps, making financial or product trade-offs, and guiding group momentum.'
      },
      {
        id: 'help',
        label: 'Helping, Teaching & Designing for People',
        desc: 'Listening to users, mentoring learners, supporting patients, and making tools kinder for humans.'
      },
      {
        id: 'write',
        label: 'Writing, Storytelling & Creative Media',
        desc: 'Crafting clear articles, brand visuals, policy briefs, or educational experiences.'
      },
      {
        id: 'explore',
        label: 'Fieldwork, Sustainability & Outdoors',
        desc: 'Restoring ecosystems, studying clean energy, eco-architecture, or cultural field research.'
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
        label: 'Quiet, Focused Deep Work',
        desc: 'Uninterrupted concentration in a calm workspace or research lab.'
      },
      {
        id: 'collaborative',
        label: 'Collaborative Team Energy',
        desc: 'Co-designing alongside engineers, doctors, scientists, or creative teammates.'
      },
      {
        id: 'flexible',
        label: 'Flexible Hybrid Balance',
        desc: 'A healthy mix of independent solo building and collaborative check-ins.'
      },
      {
        id: 'fast',
        label: 'Fast-Paced Prototyping & Field Testing',
        desc: 'Iterating quickly, testing live prototypes, and learning through real trials.'
      },
      {
        id: 'structured',
        label: 'Structured, Safety-Minded & Methodical',
        desc: 'Clear measurements, rigorous testing checklists, and reliable precision.'
      },
      {
        id: 'craft',
        label: 'Hands-On Craftsmanship & Precision',
        desc: 'Refining mechanical joints, visuals, or lab techniques until every detail feels right.'
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
        label: 'Inventing & Building Something Tangible',
        desc: 'Seeing a robot, device, product, or original design actually work in real life.'
      },
      {
        id: 'help_people',
        label: 'Helping Real People Directly',
        desc: 'Improving patients’ care, workers’ safety, students’ learning, or human wellbeing.'
      },
      {
        id: 'mastery',
        label: 'Mastering a Technical or Creative Craft',
        desc: 'Becoming deeply skilled in hardware, engineering, design, or analytical rigor.'
      },
      {
        id: 'learning',
        label: 'Discovering Unknowns & Frontier Knowledge',
        desc: 'Investigating space, human cognition, quantum mechanics, genetics, or robotics R&D.'
      },
      {
        id: 'impact',
        label: 'Advancing Sustainability, Justice & Safety',
        desc: 'Solving climate energy challenges, fair policy, ethical AI, or ecosystem protection.'
      },
      {
        id: 'growth',
        label: 'Leading Ventures & High Career Autonomy',
        desc: 'Guiding product strategy, launching innovations, and steering organizational growth.'
      }
    ]
  },

  // 5. Preferred Future Career Direction (including coding vs. hardware distinction)
  {
    id: 'direction',
    step: 5,
    category: 'Future Direction',
    question: 'Looking ahead, what direction fits your goals—and your feelings about coding?',
    hint: 'Choose both the field you want to explore and how much day-to-day software coding you want in your career.',
    options: [
      {
        id: 'robotics_hardware',
        label: 'Robotics, Mechatronics & Physical Machines (Hardware Over Pure Coding)',
        desc: 'Designing robots, drones, automation systems, electronics, or mechanical machines—even if I dislike sitting in pure software code.'
      },
      {
        id: 'software',
        label: 'Software Engineering, AI & Digital Infrastructure',
        desc: 'Building full-stack software apps, cloud systems, cybersecurity defenses, or AI software models.'
      },
      {
        id: 'ux_design',
        label: 'Digital Interfaces, Physical Industrial Design & HRI',
        desc: 'Crafting app experiences, ergonomic hardware objects, AR/VR worlds, or human-friendly robot interactions.'
      },
      {
        id: 'deep_science',
        label: 'Space, Quantum, Genetics & Frontier R&D',
        desc: 'Pioneering astrophysics, neuroscience, biotechnology, advanced materials, or quantum research labs.'
      },
      {
        id: 'product_mgmt',
        label: 'Product Leadership, Startups & Innovation Strategy',
        desc: 'Translating big breakthroughs into real businesses, product roadmaps, and teams.'
      },
      {
        id: 'bio_health',
        label: 'Healthcare, Bionics & Clinical Wellbeing',
        desc: 'Advancing biomedical devices, prosthetics, patient care tools, counseling, or genomics.'
      },
      {
        id: 'analytics',
        label: 'Economics, Finance & Strategic Modeling',
        desc: 'Analyzing economic trends, market strategy, investments, and large-scale resource policies.'
      },
      {
        id: 'sustainability',
        label: 'Clean Energy, Environment & Resilient Infrastructure',
        desc: 'Engineering solar grids, green buildings, bridges, water systems, and climate restoration.'
      },
      {
        id: 'media_culture',
        label: 'Education, Law, Media & Civic Policy',
        desc: 'Shaping courses, public policy, digital rights law, creative media, or sustainable travel.'
      }
    ]
  }
];

/**
 * Alignment & Dislike Profile rules for every career in allCareers.
 * codingLevel ensures that students who prefer physical hardware/machines, people, design, or science
 * over pure software programming are NOT pushed into pure software developer roles.
 */
const careerScoringProfiles = {
  // Robotics & Intelligent Systems (10)
  'robotics-engineer': {
    subjects: ['robotics_eng', 'science', 'tech'],
    activities: ['hardware_hands_on', 'build', 'solve'],
    styles: ['craft', 'fast', 'collaborative', 'flexible'],
    motivations: ['create_new', 'mastery', 'learning'],
    directions: ['robotics_hardware', 'deep_science', 'software'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Unites physical mechanisms, sensors, motors, and smart control systems so machines navigate the real world—making hands-on prototyping central rather than pure screen coding.'
  },
  'automation-engineer': {
    subjects: ['robotics_eng', 'business', 'science'],
    activities: ['hardware_hands_on', 'solve', 'organize'],
    styles: ['structured', 'craft', 'collaborative'],
    motivations: ['mastery', 'create_new', 'impact'],
    directions: ['robotics_hardware', 'sustainability'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Focuses on industrial sensors, conveyor hardware, clean-energy plant controls, and reliable PLC systems—using visual logic and electrical controls instead of traditional app development.'
  },
  'mechatronics-engineer': {
    subjects: ['robotics_eng', 'design', 'science'],
    activities: ['hardware_hands_on', 'solve'],
    styles: ['craft', 'flexible', 'fast'],
    motivations: ['create_new', 'mastery'],
    directions: ['robotics_hardware', 'ux_design'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Blends 3D mechanical CAD, motors, and circuit prototyping directly at the workbench—an ideal career if you love robotics hardware and tangible machines over pure software coding.'
  },
  'autonomous-systems-engineer': {
    subjects: ['robotics_eng', 'tech', 'science'],
    activities: ['build', 'solve', 'hardware_hands_on'],
    styles: ['structured', 'fast', 'quiet'],
    motivations: ['create_new', 'learning', 'mastery'],
    directions: ['robotics_hardware', 'software', 'deep_science'],
    codingLevel: 'hybrid',
    baseReason: 'Pairs sensors like LiDAR and cameras with onboard navigation planning so rovers, drones, and self-driving vehicles perceive obstacles safely.'
  },
  'embedded-systems-engineer': {
    subjects: ['robotics_eng', 'tech', 'health'],
    activities: ['hardware_hands_on', 'build', 'solve'],
    styles: ['quiet', 'structured', 'craft'],
    motivations: ['mastery', 'create_new'],
    directions: ['robotics_hardware', 'software'],
    codingLevel: 'hybrid',
    baseReason: 'Works right next to circuit boards and microcontrollers using hardware oscilloscopes and compact device firmware inside satellites, wearables, and robots.'
  },
  'ai-robotics-specialist': {
    subjects: ['robotics_eng', 'tech', 'science'],
    activities: ['build', 'solve'],
    styles: ['fast', 'quiet', 'collaborative'],
    motivations: ['learning', 'create_new'],
    directions: ['robotics_hardware', 'software', 'deep_science'],
    codingLevel: 'hybrid',
    baseReason: 'Teaches physical robots how to see objects and grasp unfamiliar shapes through 3D vision and embodied simulation.'
  },
  'drone-systems-engineer': {
    subjects: ['robotics_eng', 'science', 'design'],
    activities: ['hardware_hands_on', 'explore', 'solve'],
    styles: ['fast', 'structured', 'craft'],
    motivations: ['create_new', 'impact', 'mastery'],
    directions: ['robotics_hardware', 'sustainability'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Combines lightweight airframes, propellers, telemetry tuning, and outdoor flight missions for rescue, mapping, and environmental work.'
  },
  'human-robot-interaction-designer': {
    subjects: ['psychology', 'design', 'robotics_eng'],
    activities: ['help', 'hardware_hands_on', 'write'],
    styles: ['collaborative', 'craft', 'flexible'],
    motivations: ['help_people', 'create_new', 'impact'],
    directions: ['robotics_hardware', 'ux_design', 'bio_health'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Shapes how humans safely understand, trust, and work alongside physical robots—a standout non-coding path into robotics driven by design and psychology.'
  },
  'industrial-robotics-specialist': {
    subjects: ['robotics_eng', 'business'],
    activities: ['hardware_hands_on', 'organize', 'solve'],
    styles: ['structured', 'craft', 'collaborative'],
    motivations: ['mastery', 'create_new'],
    directions: ['robotics_hardware'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Commission and customize 6-axis factory arms, grippers, and safe workcells using 3D offline simulation and teach pendants rather than web programming.'
  },
  'robotics-research-scientist': {
    subjects: ['robotics_eng', 'science', 'health'],
    activities: ['solve', 'hardware_hands_on'],
    styles: ['quiet', 'craft', 'fast'],
    motivations: ['learning', 'create_new', 'mastery'],
    directions: ['deep_science', 'robotics_hardware'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Invents bio-inspired soft robots, flexible grippers, and new mechanical locomotion concepts inside R&D laboratories.'
  },

  // Engineering (7)
  'mechanical-engineer': {
    subjects: ['robotics_eng', 'design', 'science'],
    activities: ['hardware_hands_on', 'solve'],
    styles: ['craft', 'structured', 'collaborative'],
    motivations: ['create_new', 'mastery'],
    directions: ['robotics_hardware', 'sustainability'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Centers on physical mechanisms, 3D CAD, materials strength, and real-world machine prototyping without software coding requirements.'
  },
  'electrical-engineer': {
    subjects: ['robotics_eng', 'science'],
    activities: ['hardware_hands_on', 'solve'],
    styles: ['structured', 'quiet', 'collaborative'],
    motivations: ['impact', 'mastery', 'create_new'],
    directions: ['robotics_hardware', 'sustainability'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Engineers high-efficiency EV powertrains, solar microgrids, and electric motors grounded in physics and hardware testing.'
  },
  'electronics-engineer': {
    subjects: ['robotics_eng', 'tech', 'science'],
    activities: ['hardware_hands_on', 'solve'],
    styles: ['craft', 'quiet', 'structured'],
    motivations: ['mastery', 'create_new'],
    directions: ['robotics_hardware'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Focuses on designing custom circuit boards, tactile sensors, and analog hardware at the workbench.'
  },
  'civil-engineer': {
    subjects: ['robotics_eng', 'design', 'science'],
    activities: ['explore', 'hardware_hands_on', 'organize'],
    styles: ['structured', 'collaborative'],
    motivations: ['impact', 'help_people', 'mastery'],
    directions: ['sustainability', 'robotics_hardware'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Turns structural math and site engineering into safe bridges, flood resilience, and sustainable civic infrastructure.'
  },
  'aerospace-engineer': {
    subjects: ['robotics_eng', 'science'],
    activities: ['hardware_hands_on', 'solve'],
    styles: ['structured', 'craft', 'collaborative'],
    motivations: ['learning', 'create_new', 'mastery'],
    directions: ['robotics_hardware', 'deep_science'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Designs spacecraft, CubeSats, aerodynamic wings, and propulsion hardware for aviation and space exploration.'
  },
  'biomedical-engineer': {
    subjects: ['health', 'robotics_eng', 'science'],
    activities: ['hardware_hands_on', 'help', 'solve'],
    styles: ['collaborative', 'craft', 'structured'],
    motivations: ['help_people', 'create_new', 'impact'],
    directions: ['bio_health', 'robotics_hardware'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Combines medical physiology with physical hardware to build bionic prosthetics and bedside clinical instruments.'
  },
  'chemical-engineer': {
    subjects: ['science', 'robotics_eng'],
    activities: ['solve', 'explore', 'hardware_hands_on'],
    styles: ['structured', 'quiet'],
    motivations: ['impact', 'mastery', 'learning'],
    directions: ['sustainability', 'deep_science'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Scales laboratory chemistry into clean hydrogen, battery materials, and eco-friendly manufacturing.'
  },

  // Emerging Technology (5)
  'quantum-computing-engineer': {
    subjects: ['science', 'tech'],
    activities: ['solve', 'build'],
    styles: ['quiet', 'structured'],
    motivations: ['learning', 'mastery'],
    directions: ['deep_science', 'software'],
    codingLevel: 'hybrid',
    baseReason: 'Applies physics and linear mathematics to model molecular chemistry and quantum algorithms beyond classical chips.'
  },
  'iot-systems-engineer': {
    subjects: ['robotics_eng', 'tech', 'science'],
    activities: ['hardware_hands_on', 'build', 'explore'],
    styles: ['fast', 'flexible', 'craft'],
    motivations: ['create_new', 'impact'],
    directions: ['robotics_hardware', 'sustainability', 'software'],
    codingLevel: 'hybrid',
    baseReason: 'Connects ultra-low-power field sensors on farms, rivers, and buildings into live environmental alert meshes.'
  },
  'ar-vr-developer': {
    subjects: ['design', 'tech'],
    activities: ['build', 'hardware_hands_on'],
    styles: ['craft', 'fast', 'collaborative'],
    motivations: ['create_new', 'mastery'],
    directions: ['ux_design', 'software'],
    codingLevel: 'pure-software',
    baseReason: 'Builds interactive 3D spatial environments for surgical simulations, design walkthroughs, and creative media.'
  },
  'cloud-architect': {
    subjects: ['tech'],
    activities: ['organize', 'build', 'solve'],
    styles: ['structured', 'flexible'],
    motivations: ['mastery', 'growth'],
    directions: ['software'],
    codingLevel: 'pure-software',
    baseReason: 'Architects resilient, low-emission cloud data center infrastructure that keeps essential applications online.'
  },
  'blockchain-developer': {
    subjects: ['tech', 'business'],
    activities: ['build', 'solve'],
    styles: ['quiet', 'structured'],
    motivations: ['mastery', 'create_new'],
    directions: ['software'],
    codingLevel: 'pure-software',
    baseReason: 'Uses applied cryptography to create tamper-proof digital credentials and privacy-preserving verification tools.'
  },

  // Existing Core 21 Careers & New Domain Additions
  'product-designer': {
    subjects: ['design', 'psychology', 'tech'],
    activities: ['help', 'write', 'build'],
    styles: ['craft', 'collaborative', 'flexible'],
    motivations: ['create_new', 'help_people', 'mastery'],
    directions: ['ux_design'],
    codingLevel: 'non-coding',
    baseReason: 'Focuses on empathy, sketching, wireframing, and visual craftsmanship—allowing you to shape tech products without writing backend software.'
  },
  'creative-technologist': {
    subjects: ['design', 'tech'],
    activities: ['build', 'hardware_hands_on'],
    styles: ['fast', 'craft', 'flexible'],
    motivations: ['create_new', 'learning'],
    directions: ['ux_design', 'software'],
    codingLevel: 'hybrid',
    baseReason: 'Sits right at the intersection of interactive art, 3D exhibits, and creative experimentation.'
  },
  'graphic-designer': {
    subjects: ['design', 'media'],
    activities: ['write', 'build'],
    styles: ['craft', 'quiet', 'flexible'],
    motivations: ['create_new', 'mastery'],
    directions: ['ux_design', 'media_culture'],
    codingLevel: 'non-coding',
    baseReason: 'Honors visual aesthetics, typography, and brand storytelling with pure artistic craft rather than programming.'
  },
  'industrial-designer': {
    subjects: ['design', 'robotics_eng'],
    activities: ['hardware_hands_on', 'help'],
    styles: ['craft', 'collaborative', 'flexible'],
    motivations: ['create_new', 'mastery', 'help_people'],
    directions: ['ux_design', 'robotics_hardware'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Sculpts real-world ergonomic objects, bike frames, wearable casings, and robot shells using sketches, clay, and CAD—zero coding required.'
  },
  'software-engineer': {
    subjects: ['tech'],
    activities: ['build', 'solve'],
    styles: ['quiet', 'flexible', 'structured'],
    motivations: ['create_new', 'mastery', 'growth'],
    directions: ['software'],
    codingLevel: 'pure-software',
    baseReason: 'Turns algorithmic logic and programming into full-stack web apps, tools, and scalable digital platforms.'
  },
  'ai-engineer': {
    subjects: ['tech', 'science'],
    activities: ['build', 'solve'],
    styles: ['quiet', 'fast', 'structured'],
    motivations: ['learning', 'create_new', 'mastery'],
    directions: ['software', 'deep_science'],
    codingLevel: 'pure-software',
    baseReason: 'Teaches machine learning models to detect patterns and solve challenging digital reasoning problems.'
  },
  'cybersecurity-analyst': {
    subjects: ['tech'],
    activities: ['solve', 'organize'],
    styles: ['structured', 'quiet'],
    motivations: ['mastery', 'impact'],
    directions: ['software', 'analytics'],
    codingLevel: 'pure-software',
    baseReason: 'Protects digital networks, defends user privacy, and investigates software threats systematically.'
  },
  'product-manager': {
    subjects: ['business', 'tech', 'psychology'],
    activities: ['organize', 'help', 'solve'],
    styles: ['collaborative', 'flexible', 'fast'],
    motivations: ['growth', 'create_new', 'help_people'],
    directions: ['product_mgmt'],
    codingLevel: 'non-coding',
    baseReason: 'Guides product vision, listens to real users, and leads multidisciplinary design and engineering teams.'
  },
  'startup-founder': {
    subjects: ['business', 'robotics_eng', 'design'],
    activities: ['organize', 'hardware_hands_on', 'build'],
    styles: ['fast', 'collaborative', 'flexible'],
    motivations: ['growth', 'create_new', 'impact'],
    directions: ['product_mgmt', 'robotics_hardware'],
    codingLevel: 'non-coding',
    baseReason: 'Empowers you to validate an idea, rally builders, and turn a bold vision into an independent venture.'
  },
  'research-innovation-strategist': {
    subjects: ['business', 'science', 'robotics_eng'],
    activities: ['organize', 'solve', 'write'],
    styles: ['collaborative', 'flexible', 'fast'],
    motivations: ['growth', 'learning', 'create_new'],
    directions: ['product_mgmt', 'deep_science'],
    codingLevel: 'non-coding',
    baseReason: 'Connects lab discoveries in robotics, climate, and biotech with human pain points and practical venture strategy.'
  },
  'financial-analyst': {
    subjects: ['business'],
    activities: ['solve', 'organize'],
    styles: ['structured', 'quiet'],
    motivations: ['growth', 'mastery'],
    directions: ['analytics', 'product_mgmt'],
    codingLevel: 'non-coding',
    baseReason: 'Uses structured market modeling and strategic analysis to help organizations allocate capital wisely.'
  },
  'economist': {
    subjects: ['business', 'media', 'psychology'],
    activities: ['solve', 'write'],
    styles: ['quiet', 'structured'],
    motivations: ['impact', 'learning', 'mastery'],
    directions: ['analytics', 'media_culture'],
    codingLevel: 'non-coding',
    baseReason: 'Studies real-world incentives, wages, pricing, and clean-energy economics to advise policy and industry.'
  },
  'computational-biologist': {
    subjects: ['science', 'health', 'tech'],
    activities: ['solve', 'build'],
    styles: ['quiet', 'structured', 'craft'],
    motivations: ['learning', 'impact', 'mastery'],
    directions: ['bio_health', 'deep_science'],
    codingLevel: 'hybrid',
    baseReason: 'Bridges biology and data science to decode DNA and accelerate life-saving medical discoveries.'
  },
  'digital-health-specialist': {
    subjects: ['health', 'psychology', 'design'],
    activities: ['help', 'organize'],
    styles: ['collaborative', 'flexible'],
    motivations: ['help_people', 'impact'],
    directions: ['bio_health', 'ux_design'],
    codingLevel: 'non-coding',
    baseReason: 'Uses friendly telehealth, wellness programs, and human-centered care workflows to make healthcare easier to reach.'
  },
  'user-researcher': {
    subjects: ['psychology', 'design', 'health'],
    activities: ['help', 'solve', 'write'],
    styles: ['collaborative', 'flexible', 'quiet'],
    motivations: ['help_people', 'learning'],
    directions: ['ux_design', 'media_culture'],
    codingLevel: 'non-coding',
    baseReason: 'Applies behavioral psychology and empathetic listening to discover what real humans actually need from tools.'
  },
  'clinical-psychologist': {
    subjects: ['psychology', 'health'],
    activities: ['help', 'solve'],
    styles: ['quiet', 'collaborative', 'structured'],
    motivations: ['help_people', 'learning'],
    directions: ['bio_health', 'media_culture'],
    codingLevel: 'non-coding',
    baseReason: 'Supports emotional resilience and mental health through evidence-based counseling and deep human connection.'
  },
  'learning-experience-designer': {
    subjects: ['psychology', 'design', 'media'],
    activities: ['help', 'write'],
    styles: ['collaborative', 'craft', 'flexible'],
    motivations: ['help_people', 'learning'],
    directions: ['media_culture', 'ux_design'],
    codingLevel: 'non-coding',
    baseReason: 'Turns confusing ideas into intuitive workshops, visual guides, and joyful learning journeys.'
  },
  'content-strategist': {
    subjects: ['media', 'psychology', 'design'],
    activities: ['write', 'help'],
    styles: ['quiet', 'collaborative', 'flexible'],
    motivations: ['create_new', 'help_people'],
    directions: ['media_culture', 'ux_design'],
    codingLevel: 'non-coding',
    baseReason: 'Elevates clear storytelling, editorial voice, and meaningful public communication.'
  },
  'digital-marketing-specialist': {
    subjects: ['business', 'media', 'psychology'],
    activities: ['write', 'organize'],
    styles: ['fast', 'collaborative'],
    motivations: ['growth', 'create_new'],
    directions: ['product_mgmt', 'media_culture'],
    codingLevel: 'non-coding',
    baseReason: 'Combines creative storytelling with audience insights to build lively communities around new ideas.'
  },
  'sustainable-architect': {
    subjects: ['design', 'science', 'robotics_eng'],
    activities: ['hardware_hands_on', 'explore'],
    styles: ['craft', 'collaborative'],
    motivations: ['impact', 'create_new'],
    directions: ['sustainability', 'ux_design'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Shapes daylight-filled, low-carbon buildings and harmonious civic spaces physically.'
  },
  'tech-policy-counsel': {
    subjects: ['media', 'psychology', 'tech'],
    activities: ['write', 'solve'],
    styles: ['structured', 'quiet'],
    motivations: ['impact', 'mastery'],
    directions: ['media_culture'],
    codingLevel: 'non-coding',
    baseReason: 'Protects digital privacy, AI ethics, and civil rights through legal reasoning and advocacy rather than programming.'
  },
  'biomedical-scientist': {
    subjects: ['science', 'health'],
    activities: ['solve', 'help'],
    styles: ['structured', 'craft', 'quiet'],
    motivations: ['learning', 'help_people', 'impact'],
    directions: ['bio_health', 'deep_science'],
    codingLevel: 'non-coding',
    baseReason: 'Investigates cellular mechanisms in laboratory research to pioneer safer, more effective medicines.'
  },
  'astrophysicist': {
    subjects: ['science'],
    activities: ['solve'],
    styles: ['quiet', 'structured'],
    motivations: ['learning', 'mastery'],
    directions: ['deep_science'],
    codingLevel: 'non-coding',
    baseReason: 'Decodes starlight, exoplanet transits, and gravitational ripples to uncover how galaxies and universes form.'
  },
  'biotechnologist': {
    subjects: ['science', 'health'],
    activities: ['hardware_hands_on', 'solve', 'explore'],
    styles: ['structured', 'craft'],
    motivations: ['impact', 'create_new', 'learning'],
    directions: ['deep_science', 'bio_health', 'sustainability'],
    codingLevel: 'non-coding',
    baseReason: 'Harnesses living microbes and enzymes in bioreactors to brew medicines and sustainable biodegradable materials.'
  },
  'geneticist': {
    subjects: ['science', 'health'],
    activities: ['solve', 'help'],
    styles: ['structured', 'quiet'],
    motivations: ['learning', 'help_people', 'impact'],
    directions: ['deep_science', 'bio_health'],
    codingLevel: 'non-coding',
    baseReason: 'Studies DNA inheritance and CRISPR gene repair to prevent rare diseases and build climate-resilient crops.'
  },
  'environmental-scientist': {
    subjects: ['science'],
    activities: ['explore', 'solve'],
    styles: ['flexible', 'collaborative'],
    motivations: ['impact', 'learning'],
    directions: ['sustainability', 'deep_science'],
    codingLevel: 'non-coding',
    baseReason: 'Combines outdoor ecological fieldwork with watershed and biodiversity conservation.'
  },
  'neuroscientist': {
    subjects: ['science', 'psychology', 'health'],
    activities: ['solve', 'help'],
    styles: ['quiet', 'structured', 'collaborative'],
    motivations: ['learning', 'help_people'],
    directions: ['deep_science', 'bio_health'],
    codingLevel: 'non-coding',
    baseReason: 'Explores memory, neural signals, and brain-computer interfaces to understand cognition and restore movement.'
  },
  'materials-scientist': {
    subjects: ['science', 'robotics_eng'],
    activities: ['hardware_hands_on', 'solve'],
    styles: ['craft', 'structured', 'quiet'],
    motivations: ['create_new', 'learning', 'impact'],
    directions: ['deep_science', 'robotics_hardware', 'sustainability'],
    codingLevel: 'low-code-hardware',
    baseReason: 'Engineers solid-state batteries, ultra-light composites, and biodegradable films through physical material testing.'
  },
  'policy-analyst': {
    subjects: ['media', 'psychology', 'business'],
    activities: ['write', 'solve', 'help'],
    styles: ['structured', 'collaborative'],
    motivations: ['impact', 'help_people'],
    directions: ['media_culture', 'analytics'],
    codingLevel: 'non-coding',
    baseReason: 'Evaluates community laws and civic evidence to shape fairer public policies.'
  },
  'experience-curator': {
    subjects: ['media', 'business'],
    activities: ['organize', 'explore'],
    styles: ['collaborative', 'flexible'],
    motivations: ['impact', 'create_new'],
    directions: ['sustainability', 'media_culture'],
    codingLevel: 'non-coding',
    baseReason: 'Curates respectful cultural journeys and community hospitality rooted in local artisans and nature.'
  },
  'clean-energy-analyst': {
    subjects: ['science', 'business'],
    activities: ['explore', 'solve'],
    styles: ['structured', 'flexible'],
    motivations: ['impact', 'learning'],
    directions: ['sustainability', 'analytics'],
    codingLevel: 'non-coding',
    baseReason: 'Models solar, wind, and energy storage savings so communities can transition smoothly to clean power.'
  }
};

/**
 * Helper to look up readable option label from discoveryQuestions
 */
const getOptionLabel = (questionId, optionId) => {
  const q = discoveryQuestions.find((item) => item.id === questionId);
  return q?.options.find((opt) => opt.id === optionId)?.label || '';
};

/**
 * Evaluates all 5 answers together and computes top career recommendations,
 * explicitly weighing both interests AND coding/non-coding dislikes.
 */
export const getCareerMatches = (answers = {}) => {
  const {
    subject,
    activity,
    style,
    motivation,
    direction,
    codingPreference
  } = answers;

  if (!subject || !activity || !style || !motivation || !direction) {
    return [];
  }

  // Detect preference for physical hardware / people / research over pure software coding
  const wantsPureSoftware =
    codingPreference !== 'dislike_coding' &&
    (direction === 'software' || (subject === 'tech' && activity === 'build'));

  const prefersHardwareOverPureCoding =
    codingPreference === 'dislike_coding' ||
    activity === 'hardware_hands_on' ||
    direction === 'robotics_hardware' ||
    (subject === 'robotics_eng' && direction !== 'software');

  const avoidsPureCodingGenerally =
    codingPreference === 'dislike_coding' ||
    (!wantsPureSoftware && subject !== 'tech');

  const scored = allCareers.map((career) => {
    const profile = careerScoringProfiles[career.id] || {
      subjects: [],
      activities: [],
      styles: [],
      motivations: [],
      directions: [],
      codingLevel: 'non-coding',
      baseReason: career.overview
    };

    let score = 46; // Base compatibility score

    // 1. Academic / Subject alignment (+18 primary, +10 secondary)
    if (profile.subjects[0] === subject) score += 18;
    else if (profile.subjects.includes(subject)) score += 10;

    // 2. Daily Activity & Hands-On Energy alignment (+16 primary, +9 secondary)
    if (profile.activities[0] === activity) score += 16;
    else if (profile.activities.includes(activity)) score += 9;

    // 3. Future Direction alignment (+18 primary, +10 secondary)
    if (profile.directions[0] === direction) score += 18;
    else if (profile.directions.includes(direction)) score += 10;

    // 4. Motivation alignment (+10)
    if (profile.motivations[0] === motivation) score += 10;
    else if (profile.motivations.includes(motivation)) score += 7;

    // 5. Working Style alignment (+8)
    if (profile.styles.includes(style)) score += 8;

    // 6. Dislike / Coding-vs-Hardware Precision Weighting
    if (prefersHardwareOverPureCoding) {
      if (profile.codingLevel === 'pure-software') {
        score -= 48; // Prevent pure software roles from overriding hardware/robotics choices
      } else if (profile.codingLevel === 'low-code-hardware') {
        score += 6; // Elevate hands-on robotics, mechatronics, automation & physical engineering
      } else if (profile.codingLevel === 'hybrid' && activity === 'hardware_hands_on' && direction === 'robotics_hardware') {
        score -= 6; // Prefer mechanical/mechatronics/robotics over firmware/ML-heavy robotics when less coding is desired
      }
    } else if (avoidsPureCodingGenerally && profile.codingLevel === 'pure-software') {
      score -= 35; // Penalize software coding roles when user picked design, health, psych, science, business, or media
    }

    // Extra boost when coding + robotics explicitly combine
    if (subject === 'robotics_eng' && (activity === 'build' || direction === 'software')) {
      if (profile.codingLevel === 'hybrid' && career.categoryId === 'robotics') {
        score += 12;
      }
    }

    const rawScore = Math.round(score);
    const matchPercentage = Math.min(97, Math.max(62, Math.round(35 + (rawScore / 126) * 62)));

    return {
      career,
      profile,
      rawScore,
      matchPercentage
    };
  });

  // Sort descending by true unclamped rawScore first so distinct high matches never tie prematurely
  scored.sort((a, b) => b.rawScore - a.rawScore || b.matchPercentage - a.matchPercentage);

  const subjectLabel = getOptionLabel('subject', subject);
  const activityLabel = getOptionLabel('activity', activity);
  const motivationLabel = getOptionLabel('motivation', motivation);
  const directionLabel = getOptionLabel('direction', direction);

  // Return top 4 diverse, rich recommendations
  return scored.slice(0, 4).map(({ career, profile, rawScore, matchPercentage }, index) => {
    let why;
    if (index === 0) {
      why = `Your strong interest in "${subjectLabel}" combined with "${activityLabel}" and your goal of "${directionLabel}" makes ${career.title} your top alignment. ${profile.baseReason}`;
    } else if (prefersHardwareOverPureCoding && profile.codingLevel === 'low-code-hardware') {
      why = `Aligned with your motivation for "${motivationLabel}" and hands-on focus without requiring pure software coding. ${profile.baseReason}`;
    } else {
      why = `Matches your interest in "${subjectLabel}" and motivation for "${motivationLabel}". ${profile.baseReason}`;
    }

    return {
      id: career.id,
      title: career.title,
      categoryId: career.categoryId,
      categoryName: career.categoryName,
      tagline: career.tagline,
      overview: career.overview,
      matchPercentage: `${matchPercentage}%`,
      rawScore,
      why,
      technicalSkills: career.technicalSkills || [],
      softSkills: career.softSkills || [],
      learningPath: career.howToGetStarted || [],
      beginnerProject: career.beginnerProject || '',
      exploreUrl: `/careers/${career.id}`,
      roadmapUrl: `/roadmap?career=${career.id}`
    };
  });
};
