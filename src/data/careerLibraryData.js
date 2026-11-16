export const careerLibraryCategories = [
  { id: "design", name: "Design & Creativity", icon: "Palette", count: 4, desc: "Craft visual experiences, apps, products, and physical spaces." },
  { id: "technology", name: "Technology", icon: "Cpu", count: 4, desc: "Build software, intelligent algorithms, and computer systems." },
  { id: "business", name: "Business & Management", icon: "Briefcase", count: 3, desc: "Lead teams, guide product strategy, and launch ventures." },
  { id: "finance", name: "Finance", icon: "TrendingUp", count: 3, desc: "Analyze markets, allocate capital, and manage economic assets." },
  { id: "healthcare", name: "Healthcare", icon: "HeartPulse", count: 3, desc: "Care for patients, advance clinical tools, and improve wellbeing." },
  { id: "psychology", name: "Psychology", icon: "Brain", count: 3, desc: "Understand human behavior, cognition, mental health, and research." },
  { id: "education", name: "Education", icon: "GraduationCap", count: 3, desc: "Teach, design learning experiences, and democratize knowledge." },
  { id: "media", name: "Media & Communication", icon: "MessageSquare", count: 3, desc: "Tell stories, report news, write copy, and create digital media." },
  { id: "marketing", name: "Marketing", icon: "Target", count: 3, desc: "Connect audiences with products, run campaigns, and build brands." },
  { id: "architecture", name: "Architecture & Construction", icon: "Building", count: 3, desc: "Design buildings, urban spaces, and sustainable physical structures." },
  { id: "law", name: "Law", icon: "Scale", count: 3, desc: "Advocate for justice, interpret regulations, and advise organizations." },
  { id: "science", name: "Science & Research", icon: "Atom", count: 3, desc: "Investigate the natural universe, chemistry, physics, and biology." },
  { id: "government", name: "Government Services", icon: "Landmark", count: 3, desc: "Shape public policy, diplomacy, civil service, and civic systems." },
  { id: "hospitality", name: "Hospitality & Tourism", icon: "Utensils", count: 3, desc: "Curate travel, culinary arts, cultural events, and guest experiences." },
  { id: "impact", name: "Social Impact & Environment", icon: "Globe", count: 3, desc: "Tackle climate change, champion conservation, and support communities." }
];

export const allCareers = [
  // 1. Design & Creativity
  {
    id: "product-designer",
    categoryId: "design",
    categoryName: "Design & Creativity",
    title: "Product (UI/UX) Designer",
    tagline: "Design intuitive apps and websites that delight people",
    overview: "Product designers figure out how digital tools should look, feel, and function so everyday people can use them effortlessly.",
    whatTheyDo: "They talk to users, sketch ideas, create wireframes, test prototypes, and design polished visual interfaces using typography and color.",
    dailyResponsibilities: [
      "Interview users to uncover what is confusing or frustrating in an app",
      "Create wireframes and interactive prototypes in tools like Figma",
      "Collaborate closely with software engineers to bring designs to life",
      "Test new design ideas with students and collect feedback"
    ],
    education: "Degrees in Design, Human-Computer Interaction, Psychology, or self-taught with a strong portfolio.",
    technicalSkills: ["Figma / Prototyping", "Information Architecture", "Wireframing", "Visual Hierarchy"],
    softSkills: ["Empathy", "Active Listening", "Clear Communication", "Attention to Detail"],
    tools: ["Figma", "FigJam", "Notion", "Adobe Illustrator"],
    growthOpportunities: "High demand across startups, studios, and tech companies. Paths into Senior Designer, Lead UX Researcher, or Head of Design.",
    learningResources: [
      "Figma Community Tutorials (Free beginner guides)",
      "'The Design of Everyday Things' by Don Norman",
      "Refactoring UI by Adam Wathan & Steve Schoger"
    ],
    beginnerProject: "Redesign the home screen of an app you use every day (like your campus portal or a music app) to make it 2x simpler.",
    howToGetStarted: [
        "Download Figma (completely free for students) and complete their 30-minute interactive 'Figma for Beginners' walkthrough.",
        "Pick 1 screen from an app you find confusing (like your student course portal) and sketch a simpler 3-button layout on paper.",
        "Show your sketch to a classmate, ask them where they would tap first, and notice what was immediately obvious to them."
    ],
    relatedCareers: ["creative-technologist", "user-researcher", "graphic-designer"]
  },
  {
    id: "creative-technologist",
    categoryId: "design",
    categoryName: "Design & Creativity",
    title: "Creative Technologist",
    tagline: "Combine interactive code with visual art and spatial design",
    overview: "Creative technologists sit between design studios and engineering labs, using code as a creative medium for interactive experiences, 3D graphics, and digital exhibits.",
    whatTheyDo: "They build experimental web prototypes, generative animations, spatial interactive installations, and digital art tools.",
    dailyResponsibilities: [
      "Prototype interactive animations using modern web technologies",
      "Experiment with creative AI, shaders, and 3D web engines like Three.js",
      "Help design teams discover what is technically possible",
      "Build tactile micro-interactions that make software feel alive"
    ],
    education: "Computer Science with an art minor, Media Arts, Interactive Design, or independent self-directed building.",
    technicalSkills: ["JavaScript & Web Basics", "Three.js / 3D Graphics", "CSS Animation", "Creative Tool APIs"],
    softSkills: ["Experimental Mindset", "Visual Taste", "Curiosity", "Inventiveness"],
    tools: ["VS Code", "Three.js", "Blender", "Figma", "TouchDesigner"],
    growthOpportunities: "High interest in creative agencies, gaming studios, spatial technology hardware companies, and experimental labs.",
    learningResources: [
      "The Book of Shaders (Free visual graphics guide)",
      "Three.js Journey by Bruno Simon",
      "Creative Coding on Khan Academy (Free)"
    ],
    beginnerProject: "Build a single-page interactive website where clicking or moving the mouse creates playful generative patterns or audio effects.",
    howToGetStarted: [
        "Complete the free interactive HTML and JavaScript tracks on freeCodeCamp to get comfortable with browser basics.",
        "Explore creative coding examples on OpenProcessing or Bruno Simon's free Three.js tutorials to see how code makes art move.",
        "Build a small, playful interactive webpage (like a color-changing canvas or sound button) and host it on GitHub Pages."
    ],
    relatedCareers: ["product-designer", "frontend-engineer", "game-designer"]
  },
  {
    id: "graphic-designer",
    categoryId: "design",
    categoryName: "Design & Creativity",
    title: "Brand & Visual Designer",
    tagline: "Build visual identities, typography, and brand stories",
    overview: "Brand designers give organizations their visual voice through logos, color palettes, editorial layouts, and packaging.",
    whatTheyDo: "They distill an organization's core purpose into visual identity systems, typography guidelines, and digital brand assets.",
    dailyResponsibilities: [
      "Design logos, brand guidelines, and distinctive typographic styles",
      "Create visual assets for product launches, websites, and posters",
      "Ensure visual consistency across all customer touchpoints",
      "Present design concepts and rationale to teammates and clients"
    ],
    education: "Graphic Design, Fine Arts, Visual Communication, or strong self-directed portfolio.",
    technicalSkills: ["Typography", "Color Theory", "Vector Illustration", "Editorial Layout"],
    softSkills: ["Storytelling", "Receptiveness to Feedback", "Creativity", "Patience"],
    tools: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign"],
    growthOpportunities: "Paths into Art Director, Creative Director, Brand Strategist, or running an independent boutique design studio.",
    learningResources: [
      "'Thinking with Type' by Ellen Lupton",
      "Logo Design Love by David Airey",
      "Behance and Dribbble curated design showcases"
    ],
    beginnerProject: "Create a complete visual brand identity (logo, color palette, 2 posters, and Instagram post) for a fictional sustainable coffee brand.",
    howToGetStarted: [
        "Study typography hierarchy, contrast, and color theory through Ellen Lupton's open guides and Canva Design School.",
        "Create a mock visual identity (a logo, 2-color palette, and font pairing) for a local coffee shop or fictional club.",
        "Assemble a clean 3-piece portfolio on Behance or a simple Notion page showcasing your before-and-after work."
    ],
    relatedCareers: ["product-designer", "creative-technologist", "content-strategist"]
  },

  // 2. Technology
  {
    id: "software-engineer",
    categoryId: "technology",
    categoryName: "Technology",
    title: "Full-Stack Software Engineer",
    tagline: "Build the web apps, systems, and platforms people use daily",
    overview: "Software engineers write code that powers everything from online education platforms to messaging apps and planetary logistics.",
    whatTheyDo: "They break big problems down into clean, reusable logic, write code for both user screens and server databases, and fix bugs to keep apps fast.",
    dailyResponsibilities: [
      "Write clean, readable code in languages like JavaScript, TypeScript, or Python",
      "Design database schemas and build fast APIs that connect servers to screens",
      "Collaborate with designers to make sure interfaces feel snappy and responsive",
      "Review peers' code and test software to ensure reliability"
    ],
    education: "Computer Science, Software Engineering, Bootcamps, or self-taught with open-source GitHub projects.",
    technicalSkills: ["JavaScript / TypeScript", "React / Web Frameworks", "Databases & APIs", "Git Version Control"],
    softSkills: ["Logical Thinking", "Problem Solving", "Patience", "Team Collaboration"],
    tools: ["VS Code", "GitHub", "Terminal", "Postman", "Vercel"],
    growthOpportunities: "Paths into Senior Engineer, Tech Lead, Engineering Manager, or Chief Technology Officer (CTO).",
    learningResources: [
      "freeCodeCamp (Free complete web curriculum)",
      "CS50: Introduction to Computer Science by Harvard (Free online)",
      "The Odin Project (Free project-based web development)"
    ],
    beginnerProject: "Build a personal portfolio website with a working interactive tool (like a student task manager or study timer) and host it on GitHub Pages.",
    howToGetStarted: [
        "Start with CS50x by Harvard (free online) or freeCodeCamp's JavaScript Algorithms and Data Structures curriculum.",
        "Build a tiny web app that solves a personal student problem, like a study timer, flashcard tool, or campus club directory.",
        "Create a free GitHub account, commit your code with clear comments, and deploy your site live to the web using Vercel."
    ],
    relatedCareers: ["ai-engineer", "cybersecurity-analyst", "product-designer"]
  },
  {
    id: "ai-engineer",
    categoryId: "technology",
    categoryName: "Technology",
    title: "AI & Machine Learning Specialist",
    tagline: "Teach algorithms to understand text, vision, and real-world patterns",
    overview: "AI engineers build systems that can analyze data, generate language, classify images, and make intelligent predictions to help humans solve complex problems.",
    whatTheyDo: "They prepare data, select suitable machine learning models, train and evaluate neural networks, and deploy AI assistants into applications.",
    dailyResponsibilities: [
      "Train, fine-tune, and evaluate machine learning models on domain datasets",
      "Integrate AI models and APIs into user-friendly apps",
      "Measure accuracy, test for biases, and ensure safe model responses",
      "Optimize inference speed so answers return in milliseconds"
    ],
    education: "Computer Science, Data Science, Mathematics, or Electrical Engineering.",
    technicalSkills: ["Python", "PyTorch / TensorFlow", "Data Preprocessing", "API Integration", "Basic Linear Algebra"],
    softSkills: ["Empirical Curiosity", "Analytical Rigor", "Ethics Awareness", "Scientific Method"],
    tools: ["Jupyter Notebooks", "Python", "Hugging Face", "Google Colab", "GitHub"],
    growthOpportunities: "Extremely high demand across every sector. Paths into Machine Learning Researcher, AI Architect, or Applied Scientist.",
    learningResources: [
      "Fast.ai: Practical Deep Learning for Coders (Free)",
      "DeepLearning.AI: AI for Everyone by Andrew Ng",
      "Google Machine Learning Crash Course (Free)"
    ],
    beginnerProject: "Build a Python notebook using a free pre-trained model to classify student notes into subjects or summarize long lecture transcripts.",
    howToGetStarted: [
        "Learn foundational Python syntax and data libraries (NumPy, Pandas) using free tutorials on Kaggle or Google Colab.",
        "Experiment with pre-trained models on Hugging Face to classify text sentiment or summarize news articles.",
        "Build a simple browser study buddy that uses an open API to answer questions about your own uploaded lecture notes."
    ],
    relatedCareers: ["software-engineer", "data-scientist", "computational-biologist"]
  },
  {
    id: "cybersecurity-analyst",
    categoryId: "technology",
    categoryName: "Technology",
    title: "Cybersecurity Analyst",
    tagline: "Protect critical digital systems, privacy, and sensitive data",
    overview: "Cybersecurity analysts defend computer networks, patient records, and cloud servers against unauthorized access and digital threats.",
    whatTheyDo: "They monitor network traffic, identify vulnerabilities in code, simulate defensive audits, and implement secure encryption protocols.",
    dailyResponsibilities: [
      "Monitor security alerts and investigate suspicious network activities",
      "Audit software configurations to find and fix security gaps before attackers do",
      "Help teams implement multi-factor authentication and data encryption",
      "Create disaster recovery and incident response playbooks"
    ],
    education: "Computer Science, Cybersecurity, Information Systems, or security certifications like CompTIA Security+.",
    technicalSkills: ["Network Fundamentals", "Linux Command Line", "Vulnerability Scanning", "Cryptography Basics"],
    softSkills: ["Vigilance", "Investigation Instinct", "Ethical Integrity", "Calm Under Pressure"],
    tools: ["Wireshark", "Linux", "Kali tools", "Nmap", "Security Telemetry Dashboards"],
    growthOpportunities: "High job security in banking, government, healthcare, and enterprise software. Paths into Security Architect or CISO.",
    learningResources: [
      "OverTheWire (Free Linux and security wargames for beginners)",
      "TryHackMe (Hands-on beginner cybersecurity rooms)",
      "Professor Messer CompTIA Security+ video course (Free on YouTube)"
    ],
    beginnerProject: "Set up a virtual Linux machine and run a local network vulnerability scan on a test server to understand how open ports work.",
    howToGetStarted: [
        "Learn computer networking fundamentals (IP addresses, DNS, ports, TCP/UDP) through free YouTube guides like NetworkChuck.",
        "Play the first 10 beginner Linux command line challenges on OverTheWire Bandit to feel comfortable with the terminal.",
        "Complete hands-on beginner security rooms on TryHackMe to understand how defensive security and firewalls protect data."
    ],
    relatedCareers: ["software-engineer", "ai-engineer", "policy-analyst"]
  },

  // 3. Business & Management
  {
    id: "product-manager",
    categoryId: "business",
    categoryName: "Business & Management",
    title: "Associate Product Manager",
    tagline: "Guide a product from early idea to successful launch",
    overview: "Product managers act as the hub between designers, engineers, and users. They decide what features to build next and why.",
    whatTheyDo: "They interview users, define product roadmaps, prioritize team tasks, and measure whether new features actually solve real student problems.",
    dailyResponsibilities: [
      "Talk to users to understand what problems they are experiencing",
      "Write simple, clear product requirements for engineers and designers",
      "Prioritize what the team should build this month vs next quarter",
      "Track product metrics to see if users find the new features helpful"
    ],
    education: "Business, Computer Science, Economics, Psychology, or any major combined with strong leadership experience.",
    technicalSkills: ["Product Roadmapping", "User Interviewing", "Metric Tracking", "Basic Tech Fluency"],
    softSkills: ["Cross-Team Leadership", "Prioritization", "Clarity in Writing", "Empathy"],
    tools: ["Notion", "Linear", "Figma", "Google Docs", "Mixpanel"],
    growthOpportunities: "Fast path to senior leadership. Paths into Senior PM, Director of Product, Chief Product Officer, or Startup Founder.",
    learningResources: [
      "'Inspired: How to Create Tech Products Customers Love' by Marty Cagan",
      "Lenny's Newsletter & Podcast (Curated product insights)",
      "'Cracking the PM Interview' by Gayle Laakmann McDowell"
    ],
    beginnerProject: "Write a 2-page Product Spec for a feature you wish Spotify or Duolingo had, detailing who it's for, how it works, and how you would measure success.",
    howToGetStarted: [
        "Pick a mobile app you use every day and write down the top 3 friction points or missing features you experience.",
        "Write a 1-page Product Spec describing one proposed feature, who it benefits, and how you would measure its success.",
        "Volunteer to coordinate a campus hackathon team or student club initiative to practice prioritization and roadmapping."
    ],
    relatedCareers: ["product-designer", "management-consultant", "software-engineer"]
  },
  {
    id: "startup-founder",
    categoryId: "business",
    categoryName: "Business & Management",
    title: "Entrepreneur & Startup Founder",
    tagline: "Turn an original vision into a thriving organization",
    overview: "Founders spot an overlooked problem in the world, build a solution, assemble a passionate team, and create a sustainable business from scratch.",
    whatTheyDo: "They talk to early customers, build early prototypes, recruit teammates, raise funding or bootstrap revenue, and adapt quickly.",
    dailyResponsibilities: [
      "Speak directly with early customers to discover their biggest unsolved headaches",
      "Iterate on the core product prototype alongside teammates",
      "Handle everything from legal formation to customer support in the early days",
      "Communicate an inspiring vision to investors, partners, and early hires"
    ],
    education: "Any educational background. High curiosity, resilience, and willingness to learn through failure matter most.",
    technicalSkills: ["Prototyping", "Basic Financial Modeling", "Pitch Deck Craft", "Sales Basics"],
    softSkills: ["Resilience", "High Agency", "Resourcefulness", "Persuasion", "Vision"],
    tools: ["Notion", "Stripe", "Figma", "Pitch", "Google Sheets"],
    growthOpportunities: "Limitless upside. Paths into serial entrepreneurship, venture capital investing, or scaling into global enterprise leadership.",
    learningResources: [
      "Y Combinator Startup School (Completely free video library)",
      "'The Lean Startup' by Eric Ries",
      "'Zero to One' by Peter Thiel"
    ],
    beginnerProject: "Identify a frustration on your campus (e.g. textbook sharing, roommate matching) and build a simple landing page to test if 30 students will sign up.",
    howToGetStarted: [
        "Make a list of 10 genuine daily frustrations you or your friends face on campus, in student housing, or while studying.",
        "Build a quick 1-page landing page on Carrd or Notion describing a solution to see if 20 students will sign up for an early waitlist.",
        "Watch the free Y Combinator Startup School video library on how to talk to users and iterate on early prototypes."
    ],
    relatedCareers: ["product-manager", "marketing-specialist", "management-consultant"]
  },

  // 4. Finance
  {
    id: "financial-analyst",
    categoryId: "finance",
    categoryName: "Finance",
    title: "Financial Analyst",
    tagline: "Analyze data to help organizations make smart capital investments",
    overview: "Financial analysts evaluate economic trends, company financial statements, and business performance to guide smart investment decisions.",
    whatTheyDo: "They build financial models in spreadsheets, forecast revenues, evaluate company valuations, and prepare investment recommendations.",
    dailyResponsibilities: [
      "Examine balance sheets and cash flow statements of companies",
      "Build dynamic spreadsheet models to forecast future revenue scenarios",
      "Research industry trends, competitor market share, and interest rate shifts",
      "Present investment summaries and risk evaluations to managers"
    ],
    education: "Finance, Economics, Mathematics, Accounting, or Business Administration.",
    technicalSkills: ["Financial Modeling", "Excel / Google Sheets Mastery", "Accounting Fundamentals", "Data Interpretation"],
    softSkills: ["Attention to Detail", "Quantitative Reasoning", "Integrity", "Presentation Clarity"],
    tools: ["Microsoft Excel", "Financial Databases", "Tableau", "PowerPoint"],
    growthOpportunities: "Paths into Senior Analyst, Portfolio Manager, Venture Capital Associate, or Chief Financial Officer (CFO).",
    learningResources: [
      "Corporate Finance Institute (Free foundational tutorials)",
      "'A Random Walk Down Wall Street' by Burton Malkiel",
      "Khan Academy: Finance and Capital Markets (Free)"
    ],
    beginnerProject: "Pick two publicly traded companies you love (like Apple and Nike) and build a simple 3-year revenue comparison sheet using their public annual reports.",
    howToGetStarted: [
        "Master essential spreadsheet functions (VLOOKUP, XLOOKUP, INDEX/MATCH, and Pivot Tables) in Excel or Google Sheets.",
        "Download the free annual 10-K financial reports of two companies you admire (like Apple and Nike) and compare revenue growth.",
        "Take the free introductory finance and capital markets courses on Khan Academy or Corporate Finance Institute."
    ],
    relatedCareers: ["product-manager", "management-consultant", "data-scientist"]
  },

  // 5. Healthcare
  {
    id: "computational-biologist",
    categoryId: "healthcare",
    categoryName: "Healthcare",
    title: "Computational Biologist",
    tagline: "Use computer science and data to decode genetics and cure diseases",
    overview: "Computational biologists combine biological intuition with software tools to analyze DNA sequences, protein structures, and clinical therapies.",
    whatTheyDo: "They write algorithms that process massive genomic datasets to help pharmaceutical scientists develop life-saving medicines.",
    dailyResponsibilities: [
      "Process and clean next-generation DNA sequencing data with Python and R",
      "Identify genetic markers associated with rare diseases or cancer",
      "Collaborate with laboratory scientists conducting wet-lab experiments",
      "Visualize molecular folding patterns and biological pathways"
    ],
    education: "Bioinformatics, Molecular Biology with a CS minor, or Computer Science with bio coursework.",
    technicalSkills: ["Python / R", "Bioinformatics Databases (NCBI, PDB)", "Statistics", "Genomics Fundamentals"],
    softSkills: ["Patience", "Scientific Integrity", "Curiosity", "Interdisciplinary Translation"],
    tools: ["Python", "Bioconductor", "RStudio", "PyMOL", "GitHub"],
    growthOpportunities: "Surging demand in precision medicine, agricultural genetics, synthetic biology, and biopharma research labs.",
    learningResources: [
      "Rosalind (Free platform for learning bioinformatics through problem-solving)",
      "Khan Academy: Biology and Genetics (Free)",
      "Coursera: Genomic Data Science Specialization"
    ],
    beginnerProject: "Complete the first 5 beginner bioinformatics challenges on Rosalind.info using Python to parse DNA strings into RNA and proteins.",
    howToGetStarted: [
        "Learn Python basics with a focus on text and string manipulation to understand how DNA strings are processed digitally.",
        "Solve the first 5 interactive bioinformatics problem challenges on Rosalind.info.",
        "Explore 3D protein structures and molecular folding using the free online RCSB Protein Data Bank viewer."
    ],
    relatedCareers: ["ai-engineer", "software-engineer", "biomedical-scientist"]
  },
  {
    id: "digital-health-specialist",
    categoryId: "healthcare",
    categoryName: "Healthcare",
    title: "Digital Health Innovator",
    tagline: "Improve patient wellness through smart software and telehealth",
    overview: "Digital health specialists design and deploy software, wearables, and remote monitoring tools that make healthcare friendlier and more accessible.",
    whatTheyDo: "They bridge medical staff, engineers, and patients to implement digital health platforms, wearable tracking, and remote care programs.",
    dailyResponsibilities: [
      "Evaluate how patients interact with health apps, symptom checkers, and wearables",
      "Collaborate with doctors and nurses to ensure digital tools fit hospital workflows",
      "Ensure patient data privacy conforms with healthcare privacy regulations",
      "Analyze patient outcomes to verify that digital tools actually improve recovery"
    ],
    education: "Health Informatics, Public Health, Nursing / Pre-Med with tech focus, or Health Administration.",
    technicalSkills: ["Health Informatics Basics", "Data Privacy Rules (HIPAA)", "User Journey Mapping", "Telehealth Platforms"],
    softSkills: ["Deep Empathy", "Patience with Non-Tech Users", "Compassion", "Communication"],
    tools: ["Electronic Health Record Systems", "Notion", "Figma", "Data Dashboards"],
    growthOpportunities: "Rapid growth as hospitals, insurance providers, and startups digitize care. Paths into Director of Health Informatics or Clinical Product Lead.",
    learningResources: [
      "Stanford Medicine Digital Health Podcasts & Open Lectures",
      "'The Digital Doctor' by Robert Wachter",
      "Coursera: Foundations of Digital Health"
    ],
    beginnerProject: "Design a simple paper or digital prototype for a mobile app that helps college students track sleep patterns and reminds them gently to take medications.",
    howToGetStarted: [
        "Read introductory articles on electronic health records (EHR) and basic healthcare privacy guidelines (like HIPAA).",
        "Map out the patient experience for booking a clinic appointment, noting where elderly or stressed patients get confused.",
        "Design a simple 3-screen wireframe for a medication reminder app that uses large, clear typography and gentle reminders."
    ],
    relatedCareers: ["product-designer", "computational-biologist", "public-health-educator"]
  },

  // 6. Psychology
  {
    id: "user-researcher",
    categoryId: "psychology",
    categoryName: "Psychology",
    title: "UX Researcher & Behavioral Scientist",
    tagline: "Study human decision-making and psychology to build kinder products",
    overview: "Behavioral researchers study how humans think, perceive, form habits, and make choices, helping design teams create respectful, humane tools.",
    whatTheyDo: "They conduct user interviews, run usability lab studies, analyze behavioral survey data, and translate psychological insights into product changes.",
    dailyResponsibilities: [
      "Conduct 1-on-1 qualitative interviews with users from diverse backgrounds",
      "Observe how people use prototypes and identify moments of confusion",
      "Synthesize interview recordings into clear psychological insights and themes",
      "Advocate for user mental health and privacy inside product teams"
    ],
    education: "Psychology, Cognitive Science, Sociology, Human Factors, or Anthropology.",
    technicalSkills: ["Qualitative Interviewing", "Survey Design", "Usability Testing", "Affinity Mapping"],
    softSkills: ["Deep Empathy", "Active Listening", "Objectivity", "Storytelling with Data"],
    tools: ["Miro", "Figma", "Dovetail", "Otter.ai", "Google Forms"],
    growthOpportunities: "High demand in technology, game development, public policy think tanks, and educational design. Paths into Principal Researcher or VP of Insights.",
    learningResources: [
      "'Thinking, Fast and Slow' by Daniel Kahneman",
      "'Just Enough Research' by Erika Hall",
      "Nielsen Norman Group (Free UX research articles and videos)"
    ],
    beginnerProject: "Interview 3 classmates about what frustrates them about their university schedule planner. Record notes and write a 1-page summary of the top 3 friction points.",
    howToGetStarted: [
        "Read the free Nielsen Norman Group articles on conducting user interviews without asking leading questions.",
        "Conduct 3 informal 15-minute interviews with friends about what makes studying or homework stressful for them.",
        "Group their quotes into common themes on a digital whiteboard to discover the core psychological friction points."
    ],
    relatedCareers: ["product-designer", "product-manager", "counselor"]
  },

  // 7. Education
  {
    id: "learning-experience-designer",
    categoryId: "education",
    categoryName: "Education",
    title: "Learning Experience Designer",
    tagline: "Create engaging courses, simulations, and educational tools",
    overview: "Learning designers use cognitive psychology and multimedia to make learning complex subjects fun, memorable, and accessible to anyone.",
    whatTheyDo: "They break difficult topics into bite-sized modules, design interactive quizzes and hands-on projects, and build digital courses.",
    dailyResponsibilities: [
      "Collaborate with subject experts to structure intuitive learning pathways",
      "Write scripts and design interactive exercises, simulations, and visuals",
      "Analyze student completion rates to discover where learners get stuck",
      "Apply game mechanics and positive feedback loops to encourage learners"
    ],
    education: "Education, Cognitive Science, Instructional Design, or Subject Degree with passion for teaching.",
    technicalSkills: ["Curriculum Architecture", "Interactive Storyboarding", "LMS Platforms", "Assessment Design"],
    softSkills: ["Clarity of Explanation", "Empathy for Beginners", "Patience", "Creativity"],
    tools: ["Canva", "LMS platforms (Canvas, Moodle)", "Figma", "Notion", "Loom"],
    growthOpportunities: "Surging demand in ed-tech companies, university online programs, and corporate learning academies. Paths into Head of Learning or Chief Curriculum Officer.",
    learningResources: [
      "'Make It Stick: The Science of Successful Learning' by Peter Brown",
      "Khan Academy case studies on student mastery learning",
      "Coursera: Instructional Design Foundations"
    ],
    beginnerProject: "Create a 3-part interactive mini-lesson explaining a topic you love (like how cameras work or basic guitar chords) with diagrams and a fun 3-question quiz.",
    howToGetStarted: [
        "Pick a concept you understand well (like a game rule, math trick, or guitar chord) and break it down into 3 simple steps.",
        "Create a 5-minute interactive lesson with 1 visual diagram and 2 practice questions to check for understanding.",
        "Share the mini-lesson with a friend who is new to the topic and see if they can explain it back to you effortlessly."
    ],
    relatedCareers: ["user-researcher", "content-strategist", "high-school-educator"]
  },

  // 8. Media & Communication
  {
    id: "content-strategist",
    categoryId: "media",
    categoryName: "Media & Communication",
    title: "Content & Narrative Strategist",
    tagline: "Translate complex ideas into clear, compelling stories",
    overview: "Content strategists craft the words, essays, videos, and narrative architectures that guide users through products and educate the public.",
    whatTheyDo: "They write clear micro-copy for apps, author in-depth educational guides, produce video essays, and define an organization's voice.",
    dailyResponsibilities: [
      "Write concise, welcoming text for buttons, onboarding screens, and error messages",
      "Research and draft informative long-form articles that explain new concepts",
      "Ensure the organization speaks in an approachable, warm, and helpful tone",
      "Collaborate with visual designers to pair words seamlessly with imagery"
    ],
    education: "English, Journalism, Communications, Creative Writing, or Media Studies.",
    technicalSkills: ["UX Writing", "Editorial Copywriting", "SEO Fundamentals", "Content Architecture"],
    softSkills: ["Linguistic Precision", "Curiosity", "Empathy", "Story Arc Crafting"],
    tools: ["Notion", "Google Docs", "Figma", "Substack", "Grammarly"],
    growthOpportunities: "Positions available across tech companies, newsrooms, non-profits, and creative agencies. Paths into Head of Content or Creative Director.",
    learningResources: [
      "'On Writing Well' by William Zinsser",
      "'Microcopy: The Complete Guide' by Kinneret Yifrah",
      "Nieman Storyboard (Narrative journalism studies)"
    ],
    beginnerProject: "Rewrite an overly confusing college policy letter or complicated software privacy notice into 3 clean, friendly paragraphs that an 8th grader could easily grasp.",
    howToGetStarted: [
        "Find a confusing campus policy notice or software error message and rewrite it in 3 warm, crystal-clear sentences.",
        "Read 'On Writing Well' by William Zinsser to learn how to strip out clutter and write with human warmth.",
        "Start a personal digital notebook or Substack exploring topics you love, focusing on clarity over academic jargon."
    ],
    relatedCareers: ["graphic-designer", "product-designer", "investigative-journalist"]
  },

  // 9. Marketing
  {
    id: "digital-marketing-specialist",
    categoryId: "marketing",
    categoryName: "Marketing",
    title: "Growth & Community Marketer",
    tagline: "Help audiences discover products and build loyal communities",
    overview: "Marketers connect products with the exact people who need them, building genuine relationships through storytelling, events, and social channels.",
    whatTheyDo: "They run digital campaigns, manage creative social channels, collaborate with community ambassadors, and analyze what content resonates.",
    dailyResponsibilities: [
      "Create creative social media content, newsletters, and video shorts",
      "Host virtual Q&A sessions and build relationships with community members",
      "Analyze web traffic data to see which stories brought the most engaged visitors",
      "Brainstorm creative partnerships with campus clubs and student creators"
    ],
    education: "Marketing, Communications, Business, Public Relations, or digital creator experience.",
    technicalSkills: ["Content Analytics", "Social Media Craft", "Email Campaign Tools", "Basic Graphic Design"],
    softSkills: ["Social Intuition", "High Energy", "Creativity", "Data Curiosity"],
    tools: ["Canva", "CapCut", "Mailchimp", "Google Analytics", "Instagram / TikTok Creator Studio"],
    growthOpportunities: "High demand across startups, creator brands, and consumer apps. Paths into Head of Growth, Community Director, or VP of Marketing.",
    learningResources: [
      "HubSpot Academy (Free certified marketing courses)",
      "'Contagious: Why Things Catch On' by Jonah Berger",
      "Seth Godin's Marketing Blog and Books"
    ],
    beginnerProject: "Create a short 3-part social media carousel or video series promoting a student club or campus charity drive, and track how many people engaged.",
    howToGetStarted: [
        "Complete HubSpot Academy's free Social Media or Inbound Marketing certification course.",
        "Design a short 3-slide visual carousel sharing a helpful student tip and share it on a student community channel.",
        "Analyze the engagement metrics (views, shares, saves) to understand what hook made people stop scrolling."
    ],
    relatedCareers: ["content-strategist", "product-manager", "graphic-designer"]
  },

  // 10. Architecture & Construction
  {
    id: "sustainable-architect",
    categoryId: "architecture",
    categoryName: "Architecture & Construction",
    title: "Sustainable Architect",
    tagline: "Design energy-efficient buildings that harmonize with nature",
    overview: "Architects design physical structures that are safe, functional, and aesthetically inspiring, focusing increasingly on eco-friendly, zero-emission materials.",
    whatTheyDo: "They sketch spatial floorplans, build 3D virtual models, select low-carbon building materials, and supervise construction progress.",
    dailyResponsibilities: [
      "Create architectural drawings and 3D spatial models in CAD software",
      "Incorporate natural lighting, passive solar heating, and green roof gardens",
      "Collaborate with civil engineers, city planners, and contractors",
      "Ensure building designs meet safety codes, accessibility standards, and budget"
    ],
    education: "Bachelor or Master of Architecture (B.Arch or M.Arch) + state licensure.",
    technicalSkills: ["Architectural CAD", "3D Modeling (Revit, Rhino)", "Spatial Planning", "Building Science Basics"],
    softSkills: ["Visual Imagination", "Patience with Long Timelines", "Spatial Reasoning", "Client Communication"],
    tools: ["Autodesk Revit", "Rhino 3D", "SketchUp", "AutoCAD", "Physical Model Kits"],
    growthOpportunities: "Strong ongoing demand as cities modernize for climate resilience. Paths into Lead Architect, Urban Planner, or founding an architectural firm.",
    learningResources: [
      "'A Pattern Language' by Christopher Alexander",
      "'Architecture: Form, Space, and Order' by Francis D.K. Ching",
      "ArchDaily (Global architectural showcase)"
    ],
    beginnerProject: "Sketch a floor plan and build a simple 3D model in free SketchUp of a tiny eco-cabin that utilizes natural sunlight and rainwater collection.",
    howToGetStarted: [
        "Download the free web version of SketchUp and practice creating 3D geometric shapes and spatial room layouts.",
        "Study passive solar architecture principles to see how window placement and natural airflow cool buildings without power.",
        "Draw a floor plan for a 200-square-foot eco-cabin that utilizes natural sunlight, insulation, and roof rainwater collection."
    ],
    relatedCareers: ["clean-energy-analyst", "product-designer", "urban-planner"]
  },

  // 11. Law
  {
    id: "tech-policy-counsel",
    categoryId: "law",
    categoryName: "Law",
    title: "Technology & Civil Rights Attorney",
    tagline: "Protect individual privacy, consumer rights, and digital freedom",
    overview: "Technology lawyers interpret regulations around artificial intelligence, digital privacy, intellectual property, and civil liberties in the modern world.",
    whatTheyDo: "They analyze legislation, advise organizations on ethical legal compliance, draft user agreements, and advocate for human rights in digital spaces.",
    dailyResponsibilities: [
      "Review new data privacy laws and determine how software must adapt",
      "Advise engineering teams on intellectual property and open-source licenses",
      "Draft clear, ethical privacy policies and terms that protect user agency",
      "Research legal precedents regarding algorithmic accountability and fair use"
    ],
    education: "Undergraduate degree in any field (Philosophy, History, CS, or Poli Sci) + Juris Doctor (J.D.) law degree.",
    technicalSkills: ["Legal Research & Writing", "Statutory Interpretation", "Contract Drafting", "Tech Regulation Literacy"],
    softSkills: ["Analytical Precision", "Ethical Courage", "Persuasive Argumentation", "Careful Reading"],
    tools: ["Westlaw", "LexisNexis", "Google Docs", "Legal Case Databases"],
    growthOpportunities: "High prestige and demand in technology companies, civil rights non-profits (like EFF, ACLU), and public regulatory bodies. Paths into General Counsel or Federal Judge.",
    learningResources: [
      "Electronic Frontier Foundation (EFF.org legal updates)",
      "'The Future of the Professions' by Richard Susskind",
      "Oyez.org (Free audio recordings of landmark Supreme Court cases)"
    ],
    beginnerProject: "Read a major social media platform's Terms of Service and write a 1-page summary evaluating whether its data ownership terms are fair to creators.",
    howToGetStarted: [
        "Read the privacy policy of an app you use every day and write a 1-page plain English summary of what data it gathers.",
        "Follow civil liberties and tech law updates on the Electronic Frontier Foundation (EFF.org) and Center for Democracy & Tech.",
        "Participate in a collegiate debate club, student government, or model UN to practice structured argumentation and advocacy."
    ],
    relatedCareers: ["policy-analyst", "cybersecurity-analyst", "user-researcher"]
  },

  // 12. Science & Research
  {
    id: "biomedical-scientist",
    categoryId: "science",
    categoryName: "Science & Research",
    title: "Biomedical Research Scientist",
    tagline: "Conduct laboratory experiments to discover disease cures",
    overview: "Biomedical scientists conduct hands-on laboratory research to understand how cells, bacteria, and viruses interact with human medicine.",
    whatTheyDo: "They design controlled experiments, culture cell lines, test chemical compounds under microscopes, and publish scientific papers.",
    dailyResponsibilities: [
      "Prepare biological samples and run controlled laboratory assays",
      "Operate specialized instruments like electron microscopes and centrifuges",
      "Record meticulous scientific notes and statistically analyze experimental results",
      "Write peer-reviewed research papers and present discoveries at symposiums"
    ],
    education: "Biochemistry, Molecular Biology, Pharmacology, or Biomedical Sciences (B.S., M.S., or Ph.D.).",
    technicalSkills: ["Laboratory Assays (PCR, Gel Electrophoresis)", "Microscopy", "Experimental Design", "Data Graphing"],
    softSkills: ["Intellectual Honesty", "Patience with Failure", "Deep Curiosity", "Meticulous Record-Keeping"],
    tools: ["Laboratory Equipment", "GraphPad Prism", "Benchling", "Lab Notebooks"],
    growthOpportunities: "High purpose in biotechnology startups, pharmaceutical research hubs, and national health institutes. Paths into Principal Investigator (PI) or VP of Research.",
    learningResources: [
      "NIH PubMed Central (Free biomedical research papers)",
      "Khan Academy: Biology and Chemistry (Free)",
      "iBiology (Free video lectures by Nobel laureate scientists)"
    ],
    beginnerProject: "Find a recent scientific article about CRISPR gene editing on ScienceNews.org and write a 300-word explanation that your parents or friends could understand.",
    howToGetStarted: [
        "Read weekly breakthrough summaries on ScienceNews.org or Nature News to see what scientific questions researchers are exploring.",
        "Inquire about shadowing an undergraduate research lab in biology or biochemistry to observe good laboratory practice.",
        "Write a 1-page summary of a recent medical discovery explaining how the treatment works at a cellular level."
    ],
    relatedCareers: ["computational-biologist", "sustainable-architect", "digital-health-specialist"]
  },

  // 13. Government Services
  {
    id: "policy-analyst",
    categoryId: "government",
    categoryName: "Government Services",
    title: "Public Policy & Civic Analyst",
    tagline: "Research social issues and design legislation to help communities",
    overview: "Policy analysts research societal challenges like housing affordability, public transit, and clean water, designing policies that governments can implement.",
    whatTheyDo: "They gather community demographic data, evaluate existing programs, interview civic leaders, and write actionable policy recommendations.",
    dailyResponsibilities: [
      "Analyze municipal demographic and economic data to identify community needs",
      "Evaluate whether public programs achieved their intended social benefits",
      "Write concise policy briefs for mayors, governors, and community leaders",
      "Facilitate town hall meetings and listen to resident concerns"
    ],
    education: "Public Policy, Political Science, Economics, Sociology, or Urban Affairs.",
    technicalSkills: ["Policy Evaluation", "Demographic Analysis", "Qualitative Surveying", "Legislative Research"],
    softSkills: ["Diplomacy", "Empathy for Diverse Communities", "Objective Reasoning", "Clarity in Prose"],
    tools: ["Census Bureau Data Tools", "Excel", "R / Python", "Google Docs"],
    growthOpportunities: "Lifelong meaningful career in city government, international bodies (UN, World Bank), think tanks, and philanthropic foundations. Paths into Policy Director or City Manager.",
    learningResources: [
      "Harvard Kennedy School Policy Review (Open articles)",
      "Brookings Institution research briefs (Free)",
      "GovEx: Civic Data for Beginners"
    ],
    beginnerProject: "Research your hometown's public transit or recycling program. Write a 1-page policy memo suggesting 2 realistic, low-cost improvements.",
    howToGetStarted: [
        "Visit your city's public transparency portal and download their latest annual municipal budget or housing report.",
        "Identify a local community issue (such as bike lanes, park access, or recycling) and gather basic resident demographic data.",
        "Draft a 2-page policy memo outlining the challenge, two viable solutions, and your recommended course of action."
    ],
    relatedCareers: ["tech-policy-counsel", "clean-energy-analyst", "user-researcher"]
  },

  // 14. Hospitality & Tourism
  {
    id: "experience-curator",
    categoryId: "hospitality",
    categoryName: "Hospitality & Tourism",
    title: "Sustainable Travel & Experience Curator",
    tagline: "Create memorable cultural journeys and eco-friendly hospitality",
    overview: "Travel and hospitality curators design immersive travel experiences, eco-resorts, and cultural events that respect local communities and the environment.",
    whatTheyDo: "They partner with local artisans, chefs, and nature guides to build unique travel itineraries that support local economies.",
    dailyResponsibilities: [
      "Research local cultural traditions, culinary heritage, and nature reserves",
      "Design personalized travel itineraries with a focus on low carbon footprint",
      "Manage customer communications to ensure travelers feel welcomed and safe",
      "Negotiate fair trade partnerships with local family-owned lodges and guides"
    ],
    education: "Hospitality Management, Tourism, Business, Cultural Studies, or practical hospitality experience.",
    technicalSkills: ["Itinerary Planning", "Vendor Negotiation", "Event Coordination", "Customer Care Systems"],
    softSkills: ["Warmth & Hospitality", "Cultural Sensitivity", "Problem-Solving Under Travel Delays", "Storytelling"],
    tools: ["Booking platforms", "Notion", "Canva", "Google Maps", "Customer Relationship Tools"],
    growthOpportunities: "Positions in boutique eco-travel companies, luxury hotels, cultural tourism boards, or running an independent boutique travel agency.",
    learningResources: [
      "Global Sustainable Tourism Council guidelines (Free online)",
      "'Setting the Table' by Danny Meyer",
      "National Geographic Travel journalism"
    ],
    beginnerProject: "Design a 3-day 'Hidden Gems' weekend walking itinerary for your home city or campus town that costs under $50 and highlights independent small businesses.",
    howToGetStarted: [
        "Design a 48-hour weekend walking itinerary for someone visiting your hometown or campus city for the very first time.",
        "Highlight locally owned family businesses, cultural spots, public transit directions, and realistic budget breakdowns.",
        "Share the guide with a friend, ask them to test one of the recommendations, and refine the itinerary based on their feedback."
    ],
    relatedCareers: ["digital-marketing-specialist", "content-strategist", "product-designer"]
  },

  // 15. Social Impact & Environment
  {
    id: "clean-energy-analyst",
    categoryId: "impact",
    categoryName: "Social Impact & Environment",
    title: "Climate & Clean Energy Analyst",
    tagline: "Accelerate the transition to solar, wind, and sustainable power",
    overview: "Clean energy analysts use environmental data and economics to help schools, cities, and businesses switch to renewable power and cut carbon emissions.",
    whatTheyDo: "They model solar rooftop output, evaluate battery storage viability, and calculate how much carbon and money organizations will save by going green.",
    dailyResponsibilities: [
      "Analyze solar irradiance and wind data for proposed clean energy sites",
      "Calculate greenhouse gas reductions achieved by renewable energy projects",
      "Help schools and community centers apply for clean energy grant funding",
      "Present environmental impact reports to community boards and leaders"
    ],
    education: "Environmental Science, Energy Systems, Mechanical/Electrical Engineering, or Economics.",
    technicalSkills: ["Clean Energy Modeling", "Carbon Accounting", "Spreadsheet Scenarios", "Geographic Mapping Basics"],
    softSkills: ["Mission-Driven Dedication", "Analytical Mindset", "Communication with Non-Scientists", "Optimism"],
    tools: ["Excel", "GIS Mapping", "Solar Modeling Tools (SAM)", "Tableau"],
    growthOpportunities: "Explosive growth as every organization commits to net-zero goals. Paths into Director of Sustainability, Renewable Project Developer, or Energy Consultant.",
    learningResources: [
      "Project Drawdown (Comprehensive free climate solution guides)",
      "National Renewable Energy Laboratory (NREL.gov open resources)",
      "'Speed & Scale' by John Doerr"
    ],
    beginnerProject: "Use Project Drawdown's free online climate solutions list to calculate your campus or household's estimated carbon footprint and propose 3 highest-impact changes.",
    howToGetStarted: [
        "Explore Project Drawdown's free online climate solutions list to understand the 10 highest-impact carbon reduction areas.",
        "Use Google Project Sunroof to look up the estimated solar energy generation potential of your own roof or school buildings.",
        "Build a spreadsheet calculating how much energy and money a building saves by replacing 100 old bulbs with efficient LEDs."
    ],
    relatedCareers: ["sustainable-architect", "policy-analyst", "computational-biologist"]
  }
];
