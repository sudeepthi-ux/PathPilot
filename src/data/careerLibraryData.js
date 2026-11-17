export const careerLibraryCategories = [
  { id: "design", name: "Design & Creativity", icon: "Palette", count: 4, desc: "Craft visual experiences, physical products, apps, and spaces." },
  { id: "technology", name: "Technology", icon: "Cpu", count: 3, desc: "Build software, intelligent algorithms, and computer systems." },
  { id: "robotics", name: "Robotics & Intelligent Systems", icon: "Bot", count: 10, desc: "Design autonomous robots, mechatronic machines, drones, and intelligent physical systems." },
  { id: "engineering", name: "Engineering", icon: "Wrench", count: 7, desc: "Design and build mechanical, electrical, electronics, civil, aerospace, biomedical, and chemical systems." },
  { id: "emerging-tech", name: "Emerging Technology", icon: "Sparkles", count: 5, desc: "Pioneer quantum computing, IoT networks, spatial AR/VR, cloud architecture, and decentralized systems." },
  { id: "science", name: "Science & Research", icon: "Atom", count: 7, desc: "Investigate astrophysics, genetics, neuroscience, materials, chemistry, and biology." },
  { id: "business", name: "Business & Management", icon: "Briefcase", count: 3, desc: "Lead teams, guide product & innovation strategy, and launch ventures." },
  { id: "finance", name: "Finance", icon: "TrendingUp", count: 2, desc: "Analyze markets, model economic trends, and guide strategic decisions." },
  { id: "healthcare", name: "Healthcare", icon: "HeartPulse", count: 2, desc: "Care for patients, advance clinical tools, and improve wellbeing." },
  { id: "psychology", name: "Psychology", icon: "Brain", count: 2, desc: "Understand human behavior, cognition, mental health, and research." },
  { id: "education", name: "Education", icon: "GraduationCap", count: 1, desc: "Teach, design learning experiences, and democratize knowledge." },
  { id: "media", name: "Media & Communication", icon: "MessageSquare", count: 1, desc: "Tell stories, report news, write copy, and create digital media." },
  { id: "marketing", name: "Marketing", icon: "Target", count: 1, desc: "Connect audiences with products, run campaigns, and build brands." },
  { id: "architecture", name: "Architecture & Construction", icon: "Building", count: 1, desc: "Design buildings, urban spaces, and sustainable physical structures." },
  { id: "law", name: "Law", icon: "Scale", count: 1, desc: "Advocate for justice, interpret regulations, and advise organizations." },
  { id: "government", name: "Government Services", icon: "Landmark", count: 1, desc: "Shape public policy, diplomacy, civil service, and civic systems." },
  { id: "hospitality", name: "Hospitality & Tourism", icon: "Utensils", count: 1, desc: "Curate travel, culinary arts, cultural events, and guest experiences." },
  { id: "impact", name: "Social Impact & Environment", icon: "Globe", count: 1, desc: "Tackle climate change, champion conservation, and support communities." }
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
  },

  // 16. Robotics & Intelligent Systems
  {
    id: "robotics-engineer",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "Robotics Engineer",
    tagline: "Design, build, and test intelligent machines that move in the real world",
    overview: "Robotics engineers bring mechanical bodies, electronic sensors, actuators, and smart control logic together so machines can safely navigate workshops, hospitals, farms, warehouses, and even other planets.",
    whatTheyDo: "They prototype robotic arms and mobile rovers, select motors and sensors, test physical prototypes, and refine motion control so robots perform useful tasks reliably.",
    dailyResponsibilities: [
      "Design robotic joints, grippers, and mobile chassis mechanisms in 3D CAD",
      "Connect ultrasonic, depth camera, or force sensors with motors and power boards",
      "Test robot movement accuracy and safety limits on physical lab testbeds",
      "Debug mechanical friction, wiring harnesses, and control loops alongside hardware teams"
    ],
    education: "Degrees or diplomas in Robotics, Mechanical Engineering, Mechatronics, Electrical Engineering, or hands-on robotics club portfolios.",
    technicalSkills: ["Robot Kinematics", "Sensors & Actuators", "3D CAD Prototyping", "Control Systems", "ROS 2 Fundamentals"],
    softSkills: ["Spatial Reasoning", "Patient Troubleshooting", "Cross-Team Collaboration", "Safety Mindset"],
    tools: ["SolidWorks / Fusion 360", "ROS 2", "Gazebo Simulator", "Arduino / STM32", "Multimeter & Oscilloscope"],
    growthOpportunities: "High global demand across medical surgical bots, warehouse logistics, agricultural automation, space rovers, and humanoid robotics labs.",
    learningResources: [
      "Modern Robotics Specialization by Northwestern University (Coursera / Free video lectures)",
      "ROS 2 Official Humble/Jazzy Beginner Tutorials",
      "James Bruton & Kevin Lynch Robotics Engineering channels (YouTube)"
    ],
    beginnerProject: "Build a tabletop line-following or obstacle-avoiding 2-wheel rover using an ultrasonic sensor, DC motors, and a simple servo gripper.",
    howToGetStarted: [
      "Sketch a 3-joint articulated robotic arm on paper and trace how each motor rotates the gripper to pick up a cup.",
      "Use Tinkercad Circuits (free in browser) to wire an ultrasonic distance sensor to two servo motors virtually.",
      "Join a local robotics club, maker space, or simulate a mobile robot inside Webots or Gazebo free tutorials."
    ],
    relatedCareers: ["mechatronics-engineer", "automation-engineer", "drone-systems-engineer"]
  },
  {
    id: "automation-engineer",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "Automation Engineer",
    tagline: "Automate real-world factories, solar grids, and smart infrastructure",
    overview: "Automation engineers turn repetitive, hazardous, or ultra-precise physical processes into reliable automated systems using industrial controllers, sensors, and electromechanical equipment.",
    whatTheyDo: "They wire control panels, configure Programmable Logic Controllers (PLCs), tune conveyor speeds, and monitor real-time safety sensors in manufacturing, clean energy, and logistics facilities.",
    dailyResponsibilities: [
      "Design electrical schematics and pneumatic/hydraulic control diagrams for machinery",
      "Configure industrial sensors, optical scanners, and safety light curtains",
      "Commission automated packaging, water treatment, or solar tracking equipment",
      "Inspect uptime telemetry and troubleshoot physical valve or motor faults"
    ],
    education: "Automation Engineering, Electrical/Mechanical Engineering, Industrial Technology, or PLC certification programs.",
    technicalSkills: ["PLC Ladder Logic", "SCADA & HMI Panels", "Industrial Sensors", "Pneumatics & Hydraulics", "Process Control"],
    softSkills: ["Systems Reliability Thinking", "Field Calmness", "Clear Documentation", "Safety Compliance"],
    tools: ["Siemens TIA Portal", "Allen-Bradley Studio 5000", "AutoCAD Electrical", "Ignition SCADA", "PLC Simulator"],
    growthOpportunities: "Critical across electric vehicle gigafactories, semiconductor fabs, food processing, smart warehouses, and water/energy utilities.",
    learningResources: [
      "RealPars Plain-English PLC & Automation Guides (YouTube / Free articles)",
      "AutomationDirect Free Video Library",
      "Inductive University Free Ignition SCADA Training"
    ],
    beginnerProject: "Design a ladder-logic state machine in a free PLC simulator that automatically fills, caps, and counts bottles on a conveyor belt with an emergency stop.",
    howToGetStarted: [
      "Watch a 15-minute beginner walkthrough on how a traffic light or elevator works using relay/ladder logic.",
      "Open a free online PLC ladder simulator (like PLC Fiddle) and wire a start button, sensor input, and conveyor motor.",
      "Visit a local manufacturing workshop or virtual factory tour to map 5 sensors used on a real production line."
    ],
    relatedCareers: ["industrial-robotics-specialist", "mechatronics-engineer", "electrical-engineer"]
  },
  {
    id: "mechatronics-engineer",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "Mechatronics Engineer",
    tagline: "Unite mechanical design, electronics, and smart control in physical devices",
    overview: "Mechatronics engineers work at the sweet spot where gears, circuits, and control systems meet—creating smart prosthetics, electric camera gimbals, medical pumps, and intelligent consumer hardware without sitting in pure web code.",
    whatTheyDo: "They co-design 3D-printed housings, solder custom sensor boards, tune PID motor stabilization, and integrate mechanical hardware with reliable embedded control.",
    dailyResponsibilities: [
      "Model brackets, gearboxes, and enclosures in 3D CAD for rapid fabrication",
      "Select stepper motors, encoders, batteries, and power regulators for tight spaces",
      "Tune PID closed-loop feedback so mechanical actuators move smoothly without jitter",
      "Run stress, thermal, and endurance tests on physical benchtop prototypes"
    ],
    education: "Mechatronics Engineering, Mechanical or Electrical Engineering, or maker hardware portfolios.",
    technicalSkills: ["3D CAD & 3D Printing", "PCB Circuit Design", "PID Motor Control", "Actuators & Gearboxes", "Benchtop Testing"],
    softSkills: ["Hands-on Craftsmanship", "Iterative Testing", "Interdisciplinary Fluency", "Visual-Spatial Thinking"],
    tools: ["Fusion 360", "KiCad", "MATLAB / Simulink", "3D Printer / Laser Cutter", "Saleae Logic Analyzer"],
    growthOpportunities: "High demand in surgical device startups, consumer electronics (cameras, appliances, EVs), precision agriculture, and robotics hardware firms.",
    learningResources: [
      "Jeremy Fielding Mechatronics & Motor Projects (YouTube)",
      "KiCad Official Getting Started Guide (Free)",
      "Brian Douglas Control Systems & PID Lectures (Free)"
    ],
    beginnerProject: "Design and prototype a self-leveling 1-axis camera gimbal using an IMU tilt sensor, micro-servo, and custom cardboard or 3D-printed bracket.",
    howToGetStarted: [
      "Download Fusion 360 (free for students) or Onshape and model a simple interlocking hinge bracket.",
      "Take apart an old broken printer or toy RC car safely to identify its gears, DC motors, and optical limit switches.",
      "Draw a block diagram showing how a sensor feeds position updates into a controller to move a motor."
    ],
    relatedCareers: ["robotics-engineer", "electronics-engineer", "mechanical-engineer"]
  },
  {
    id: "autonomous-systems-engineer",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "Autonomous Systems Engineer",
    tagline: "Help self-driving vehicles, rovers, and ships perceive and navigate safely",
    overview: "Autonomous systems engineers build the perception, localization, and motion-planning stacks that let vehicles and field robots understand unpredictable environments and navigate safely without remote pilots.",
    whatTheyDo: "They fuse radar, LiDAR, camera, and GPS measurements, estimate obstacles and trajectories, and validate autonomous navigation in realistic 3D physics simulators and closed test tracks.",
    dailyResponsibilities: [
      "Calibrate LiDAR, stereo camera, and IMU sensors on test vehicles or field rovers",
      "Develop Simultaneous Localization and Mapping (SLAM) and path-planning pipelines",
      "Evaluate edge-case scenarios in rain, night, or crowded environments using simulation",
      "Verify strict fail-safe braking and redundant safety maneuvers"
    ],
    education: "Robotics, Computer Engineering, Aerospace, or Applied Mathematics with perception/controls coursework.",
    technicalSkills: ["Sensor Fusion (Kalman Filters)", "SLAM & Localization", "Path Planning", "LiDAR & Computer Vision", "Simulation Testing"],
    softSkills: ["Safety-First Rigor", "Statistical Reasoning", "Edge-Case Anticipation", "Systems Integration"],
    tools: ["ROS 2", "C++ / Python", "CARLA / Isaac Sim", "OpenCV", "Foxglove Studio"],
    growthOpportunities: "Rapidly expanding in autonomous delivery rovers, mining/farming machinery, maritime vessels, aerospace docking, and mobility startups.",
    learningResources: [
      "Cyrill Stachniss Photogrammetry & SLAM Lectures (YouTube / Free)",
      "Underactuated Robotics by Russ Tedrake (MIT OpenCourseWare)",
      "CARLA Autonomous Driving Simulator Docs"
    ],
    beginnerProject: "Program a simulated mobile robot in a maze to build a 2D map from virtual laser-scan readings and plan the shortest collision-free route.",
    howToGetStarted: [
      "Explore how sonar or LiDAR measures distance by bouncing light or sound waves off surrounding walls.",
      "Trace a grid map of your room on graph paper and design rules for a vacuum robot to cover every tile without hitting chairs.",
      "Try a free browser A* pathfinding visualizer to watch how shortest-path planners navigate around moving obstacles."
    ],
    relatedCareers: ["robotics-engineer", "ai-robotics-specialist", "drone-systems-engineer"]
  },
  {
    id: "embedded-systems-engineer",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "Embedded Systems Engineer",
    tagline: "Build the compact computer brains inside robots, satellites, and medical gear",
    overview: "Embedded systems engineers write ultra-reliable hardware-level firmware and design microcontroller architectures that power everything from pacemakers and smartwatches to Mars rover wheels.",
    whatTheyDo: "They interface directly with memory registers, communication buses, timers, and real-time operating systems so hardware responds within microseconds while sipping minimal battery power.",
    dailyResponsibilities: [
      "Bring up new custom circuit boards using oscilloscopes and logic analyzers",
      "Write deterministic firmware in C/Rust for microcontrollers and Real-Time OS (RTOS)",
      "Implement hardware communication protocols such as I2C, SPI, UART, and CAN bus",
      "Optimize battery sleep modes and hardware interrupts for mission-critical uptime"
    ],
    education: "Computer Engineering, Electrical Engineering, Electronics, or embedded hardware project portfolios.",
    technicalSkills: ["Microcontrollers (ESP32 / STM32)", "C / Embedded Rust", "Real-Time OS (FreeRTOS)", "Hardware Protocols (SPI / I2C / CAN)", "Debugging with Oscilloscopes"],
    softSkills: ["Low-Level Curiosity", "Precision Debugging", "Patience Reading Datasheets", "Hardware Empathy"],
    tools: ["PlatformIO", "STM32CubeIDE", "KiCad", "Oscilloscope / Logic Analyzer", "JTAG Debugger"],
    growthOpportunities: "Backbone roles in consumer wearables, EV battery management systems, robotics actuators, aerospace avionics, and smart energy devices.",
    learningResources: [
      "Miro Samek Modern Embedded Systems Programming Course (Free YouTube)",
      "Random Nerd Tutorials (Free ESP32 & Arduino practical guides)",
      "Wokwi Free Online Microcontroller Simulator"
    ],
    beginnerProject: "Build a virtual temperature-controlled fan and alert buzzer on Wokwi simulator that reads a digital sensor via I2C and logs status.",
    howToGetStarted: [
      "Open Wokwi.com (free browser simulator) and blink an LED with a push-button interrupt using an ESP32.",
      "Learn how binary inputs (HIGH/LOW voltage) and PWM signals control servo angles or LED brightness.",
      "Read a 2-page component datasheet for an ultrasonic or temperature sensor to see how engineers wire pins."
    ],
    relatedCareers: ["electronics-engineer", "iot-systems-engineer", "mechatronics-engineer"]
  },
  {
    id: "ai-robotics-specialist",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "AI & Robotics Specialist",
    tagline: "Give physical robots vision, adaptability, and dexterous learning",
    overview: "AI & Robotics specialists apply computer vision, imitation learning, and reinforcement learning so robots can pick up unfamiliar objects, fold clothes, or collaborate naturally around humans instead of only repeating rigid pre-programmed paths.",
    whatTheyDo: "They collect robot demonstration datasets, train vision-action models in 3D physics sandboxes, and deploy quantized inference safely onto onboard edge processors.",
    dailyResponsibilities: [
      "Train object detection and 6D grasp-pose estimation models from depth cameras",
      "Simulate thousands of virtual robot arm trials in parallel using GPU physics engines",
      "Fine-tune imitation learning policies from teleoperated human demonstrations",
      "Benchmark real-world grasping reliability on cluttered tabletop scenes"
    ],
    education: "Robotics, Artificial Intelligence, Computer Science, or Mechatronics with ML projects.",
    technicalSkills: ["Robot Vision & 3D Perception", "Reinforcement & Imitation Learning", "Physics Simulation", "Edge AI Deployment", "ROS 2 Integration"],
    softSkills: ["Experimental Hypothesis Testing", "Cross-Domain Synthesis", "Analytical Skepticism", "Adaptability"],
    tools: ["PyTorch", "NVIDIA Isaac Sim / MuJoCo", "ROS 2", "OpenCV", "Jetson Orin"],
    growthOpportunities: "At the forefront of humanoid robotics, warehouse piece-picking, lab automation, and assistive eldercare machines.",
    learningResources: [
      "LeRobot Open-Source Embodied AI Tutorials (Hugging Face)",
      "MuJoCo Free Physics Simulation Playground",
      "DeepMind & Stanford Embodied AI Lecture Notes"
    ],
    beginnerProject: "Use a webcam and a free browser pose/object detector to count recycling items vs. paper and trigger a virtual sorting bin indicator.",
    howToGetStarted: [
      "Explore Google Teachable Machine (no-code) to train a camera model that recognizes 3 everyday objects in real time.",
      "Learn why rigid factory robots fail when an object moves 2 inches left, and how depth cameras solve this.",
      "Browse Hugging Face LeRobot videos to see how modern low-cost arms learn tasks from 50 human demonstrations."
    ],
    relatedCareers: ["ai-engineer", "autonomous-systems-engineer", "robotics-research-scientist"]
  },
  {
    id: "drone-systems-engineer",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "Drone Systems Engineer",
    tagline: "Engineer autonomous aerial robots for mapping, rescue, and clean delivery",
    overview: "Drone systems engineers design unmanned aerial vehicles (UAVs), balancing lightweight aerodynamics, battery energy budgets, flight-controller stabilization, and specialized payloads for wildfire detection, search-and-rescue, farming, and bridge inspections.",
    whatTheyDo: "They select propellers and carbon airframes, tune flight controllers like PX4 or ArduPilot, plan automated waypoint missions, and run tethered wind-and-range flight tests.",
    dailyResponsibilities: [
      "Calculate thrust-to-weight ratios, battery endurance, and center-of-gravity balance",
      "Configure flight controllers (PX4 / ArduPilot), telemetry radios, and GPS failsafes",
      "Integrate thermal cameras, agricultural multispectral sensors, or delivery winches",
      "Conduct pre-flight checklists, log analysis, and autonomous waypoint flight trials"
    ],
    education: "Aerospace Engineering, Robotics, Electrical/Mechanical Engineering, and aviation safety certification.",
    technicalSkills: ["Flight Dynamics & Propellers", "PX4 / ArduPilot Controllers", "RF Telemetry & GPS", "Carbon Airframe Design", "Autonomous Waypoint Planning"],
    softSkills: ["Safety Discipline", "Quick Field Diagnostics", "Weather & Risk Awareness", "Systems Trade-off Thinking"],
    tools: ["QGroundControl", "PX4 Autopilot", "eCalc Thrust Calculator", "SolidWorks / CAD", "Gazebo / jMAVSim"],
    growthOpportunities: "Growing roles in emergency disaster mapping, offshore wind-turbine inspection, reforestation seeding drones, and aerial logistics.",
    learningResources: [
      "PX4 Autopilot User Guide & Free Gazebo Flight Simulator",
      "Joshua Bardwell Plain-English Drone & Flight Controller Tutorials",
      "FAA TRUST Free Recreational Drone Safety Course"
    ],
    beginnerProject: "Simulate an autonomous search-and-rescue lawnmower flight grid over a park in QGroundControl & PX4 simulator with low-battery return-to-home rules.",
    howToGetStarted: [
      "Learn how quadcopters steer by spinning two propellers clockwise and two counter-clockwise.",
      "Download QGroundControl (free) and map a mock solar-farm inspection flight path over a satellite map.",
      "Use a free online thrust calculator to see how heavier batteries both increase energy capacity and require bigger motors."
    ],
    relatedCareers: ["aerospace-engineer", "autonomous-systems-engineer", "robotics-engineer"]
  },
  {
    id: "human-robot-interaction-designer",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "Human-Robot Interaction Designer",
    tagline: "Make collaborative, medical, and social robots natural and safe for people",
    overview: "Human-Robot Interaction (HRI) designers shape how everyday people understand, trust, and collaborate with physical robots—designing expressive lights, sound cues, ergonomics, voice prompts, and safe physical motion paths.",
    whatTheyDo: "They observe how hospital nurses, factory teammates, children, or older adults react to moving machines, prototype robot behaviors, and prevent confusion or discomfort.",
    dailyResponsibilities: [
      "Design intuitive light, sound, screen, and motion cues that signal what a robot will do next",
      "Conduct usability and comfort studies with volunteers interacting alongside physical robots",
      "Partner with mechanical and controls engineers on safe speed zones and ergonomic reach",
      "Craft onboarding guides and voice interactions for home, classroom, or clinic robots"
    ],
    education: "Human-Computer Interaction, Industrial Design, Cognitive Psychology, Design, or Robotics.",
    technicalSkills: ["HRI Prototyping", "Ergonomics & Safety Cues", "User Observation Studies", "Multimodal Feedback Design", "Wizard-of-Oz Testing"],
    softSkills: ["Deep Human Empathy", "Social Observation", "Ethical Sensitivity", "Bridge-Building Between Design & Engineering"],
    tools: ["Figma", "Wizard-of-Oz Remote Consoles", "Unity / Spatial Prototyping", "Motion Capture / Video Tagging", "Miro"],
    growthOpportunities: "Sought after by healthcare companion startups, warehouse collaborative robot ('cobot') makers, hospitality robots, and autonomous vehicle UX teams.",
    learningResources: [
      "HRI Book ('Human-Robot Interaction: An Introduction' by Bartneck et al. — Free PDF)",
      "MIT Media Lab Personal Robots Group talks",
      "Nielsen Norman Group UX Research Fundamentals"
    ],
    beginnerProject: "Design a storyboard and color-light signaling guide for a campus library book-delivery robot so students always know when it is waiting, turning, or passing.",
    howToGetStarted: [
      "Watch a video of a sidewalk delivery robot or warehouse arm and list 3 moments where bystanders looked confused about its next move.",
      "Design a simple 4-state light/chirp language (Idle, Moving, Asking Help, Complete) using Figma or paper cards.",
      "Test your robot interaction rules using 'Wizard-of-Oz' roleplay with a friend carrying a box through a hallway."
    ],
    relatedCareers: ["product-designer", "user-researcher", "industrial-designer"]
  },
  {
    id: "industrial-robotics-specialist",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "Industrial Robotics Specialist",
    tagline: "Commission and orchestrate precision robotic arms on modern factory lines",
    overview: "Industrial robotics specialists deploy multi-axis robotic arms, custom end-of-arm vacuum or pinch grippers, and automated safety cells that weld EV battery packs, assemble solar panels, and lift heavy loads safely.",
    whatTheyDo: "They lay out robotic workcells in 3D, teach arm waypoints with handheld teach pendants, design custom grippers, and validate cycle times and worker safety barriers.",
    dailyResponsibilities: [
      "Simulate multi-arm workcells in 3D to check reach limits and avoid collisions",
      "Select or customize end-of-arm tooling (vacuum cups, parallel jaws, vision grippers)",
      "Program and calibrate 6-axis industrial arms using teach pendants or offline tools",
      "Perform risk assessments, safety-zone fencing checks, and preventive maintenance"
    ],
    education: "Robotics Technology, Mechatronics, Industrial/Manufacturing Engineering, or OEM certifications (FANUC, KUKA, ABB).",
    technicalSkills: ["6-Axis Workcell Layout", "End-of-Arm Tooling Design", "Offline Robot Simulation", "Teach Pendant Operation", "Machine Safety Standards"],
    softSkills: ["Practical Problem Solving", "Production Floor Awareness", "Systematic Checklists", "Reliability Focus"],
    tools: ["RoboDK", "ABB RobotStudio", "FANUC ROBOGUIDE", "SolidWorks", "Vision Inspection Sensors"],
    growthOpportunities: "High demand across EV manufacturing, aerospace composite layup, pharmaceutical cleanrooms, and automated logistics centers.",
    learningResources: [
      "RoboDK Free Educational Simulation Tutorials",
      "ABB RobotStudio Free Trial & Pick-and-Place Guides",
      "Universal Robots Academy (Free interactive online modules)"
    ],
    beginnerProject: "Complete the free Universal Robots Academy online modules and simulate a pick-and-place palletizing routine in RoboDK.",
    howToGetStarted: [
      "Enroll in Universal Robots Academy (100% free interactive browser training on collaborative robotic arms).",
      "Notice 5 everyday objects around you (water bottle, phone box, mug) and sketch what kind of gripper fingers could hold each safely.",
      "Explore pick-and-place cycle time basics: why smoothing sharp robot arm corners cuts wear and speeds up production."
    ],
    relatedCareers: ["automation-engineer", "mechatronics-engineer", "mechanical-engineer"]
  },
  {
    id: "robotics-research-scientist",
    categoryId: "robotics",
    categoryName: "Robotics & Intelligent Systems",
    title: "Robotics Research Scientist",
    tagline: "Invent next-generation soft robots, legged walkers, and bio-inspired machines",
    overview: "Robotics research scientists push the frontier of what machines can physically be—creating compliant origami/silicone soft robots for delicate surgery, agile quadrupeds for disaster rubble, and coordinated drone/ant-like swarms.",
    whatTheyDo: "They formulate mathematical hypotheses, fabricate novel compliant materials or bio-inspired joints, run controlled lab benchmarks, and publish breakthroughs for medicine, space, and industry.",
    dailyResponsibilities: [
      "Fabricate soft pneumatic actuators, tendon mechanisms, or bio-inspired legs",
      "Design controlled benchtop experiments to measure force, speed, and resilience",
      "Synthesize findings into academic papers, patents, and open-source benchmarks",
      "Mentor undergraduate researchers and collaborate across biology, AI, and materials labs"
    ],
    education: "Robotics, Mechanical/Electrical Engineering, Physics, or Applied Math (often pursuing M.S./Ph.D. research tracks).",
    technicalSkills: ["Bio-Inspired & Soft Robotics", "Experimental Benchmarking", "Nonlinear Dynamics", "Rapid Composite Fabrication", "Technical Paper Writing"],
    softSkills: ["Deep Scientific Curiosity", "Perseverance After Failed Prototypes", "Critical Reasoning", "Mentorship"],
    tools: ["MATLAB / Python", "MuJoCo / PyBullet", "Silicone Casting & 3D Printing", "Vicon Motion Capture", "LaTeX"],
    growthOpportunities: "Leads to frontier R&D labs (Boston Dynamics, deep-tech spinouts, space agencies, surgical robotics pioneers) or university faculty labs.",
    learningResources: [
      "Soft Robotics Toolkit by Harvard Biodesign Lab (Open-source free guides)",
      "IEEE Spectrum Robotics News & Video Archives",
      "MIT / ETH Zurich Legged & Soft Robotics Lab seminars"
    ],
    beginnerProject: "Follow the free Harvard Soft Robotics Toolkit origami/paper actuator tutorial to build a flexible pneumatic or cable-driven finger.",
    howToGetStarted: [
      "Browse the Soft Robotics Toolkit (softroboticstoolkit.com) to see how silicone, paper, and air pressure create muscle-like motion.",
      "Watch animals move (octopuses, goats, birds) and sketch one biological trick robots have not mastered yet.",
      "Try building a 1-finger cardboard mechanical hand pulled by string tendons and rubber bands."
    ],
    relatedCareers: ["robotics-engineer", "ai-robotics-specialist", "materials-scientist"]
  },

  // 17. Engineering (Core Domains)
  {
    id: "mechanical-engineer",
    categoryId: "engineering",
    categoryName: "Engineering",
    title: "Mechanical Engineer",
    tagline: "Design physical machines, thermal systems, vehicles, and durable products",
    overview: "Mechanical engineers turn physics into tangible hardware—creating everything from wind turbine gearboxes and electric bike frames to quiet cooling fans, medical pumps, and spacecraft structures.",
    whatTheyDo: "They model 3D parts in CAD, simulate stress and heat transfer, choose aluminum, steel, or polymer materials, and work with machinists to prototype and test physical hardware.",
    dailyResponsibilities: [
      "Create parametric 3D assemblies and manufacturing tolerance drawings in CAD",
      "Run Finite Element Analysis (FEA) to test strength, vibration, and thermal safety",
      "Select bearings, seals, fasteners, and manufacturing methods (CNC, injection molding, 3D printing)",
      "Conduct physical tear-downs, drop tests, and load validation in hardware labs"
    ],
    education: "B.S./B.E. in Mechanical Engineering or Applied Physics/Engineering Technology.",
    technicalSkills: ["3D CAD Modeling", "Mechanics & Strength of Materials", "Thermodynamics & Fluid Flow", "DFM (Design for Manufacturing)", "Tolerance & Fit Analysis"],
    softSkills: ["Spatial Intuition", "Practical Material Sense", "Root-Cause Rigor", "Collaboration with Machinists"],
    tools: ["SolidWorks / Onshape", "ANSYS / SimScale", "3D Printers & CNC", "Digital Calipers", "Excel / MATLAB"],
    growthOpportunities: "Versatile foundation leading into robotics, automotive/EVs, clean energy, aerospace, consumer hardware, or R&D leadership.",
    learningResources: [
      "Onshape Free Student CAD & Learning Center",
      "The Efficient Engineer Clear Mechanics Videos (YouTube)",
      "MIT OpenCourseWare Design & Manufacturing"
    ],
    beginnerProject: "Design a snap-fit phone stand or custom desk cable organizer in free Onshape CAD that prints cleanly without support waste.",
    howToGetStarted: [
      "Sign up for a free Onshape or Fusion 360 account and finish the first 3D sketching & extrusion tutorial.",
      "Take a pair of scissors or a bike brake and identify the simple machines (levers, pivots, springs) inside.",
      "Learn why rounded fillets at sharp inside corners make plastic and metal brackets dramatically stronger."
    ],
    relatedCareers: ["mechatronics-engineer", "aerospace-engineer", "industrial-designer"]
  },
  {
    id: "electrical-engineer",
    categoryId: "engineering",
    categoryName: "Engineering",
    title: "Electrical Engineer",
    tagline: "Power clean energy grids, electric vehicles, and high-efficiency motor systems",
    overview: "Electrical engineers harness electricity, electromagnetism, and power electronics to build solar/wind microgrids, fast EV chargers, electric motors, and resilient city power networks.",
    whatTheyDo: "They design power distribution circuits, calculate transformer and battery sizing, test electromagnetic interference, and protect electrical grids from surges or outages.",
    dailyResponsibilities: [
      "Design AC/DC power conversion schematics, motor drives, and battery packs",
      "Model electrical load flows, short-circuit protection, and renewable grid integration",
      "Test prototypes with high-precision multimeters, thermal cameras, and power analyzers",
      "Ensure electrical hardware meets strict safety, insulation, and efficiency codes"
    ],
    education: "B.S./B.E. in Electrical Engineering, Power Systems, or Renewable Energy Engineering.",
    technicalSkills: ["Circuit & Power Analysis", "Motor Drives & Inverters", "Battery Management Systems", "Grid & Microgrid Modeling", "Electrical Safety Standards"],
    softSkills: ["Safety Discipline", "Quantitative Precision", "Calm Field Troubleshooting", "Clear Schematic Documentation"],
    tools: ["LTspice", "MATLAB / Simulink", "AutoCAD Electrical", "Oscilloscope & Multimeter", "ETAP / OpenDSS"],
    growthOpportunities: "Massive hiring wave driven by grid modernization, solar/battery storage, EV powertrains, data center cooling/power, and aerospace electrification.",
    learningResources: [
      "Falstad Free Browser Circuit Simulator",
      "All About Circuits Free Online Textbook",
      "NREL Microgrid & Clean Power Education Portal"
    ],
    beginnerProject: "Simulate a bridge rectifier and voltage regulator circuit in Falstad browser simulator to turn noisy AC power into steady 5V DC.",
    howToGetStarted: [
      "Open falstad.com/circuit (free interactive simulator) and watch current flow through resistors, capacitors, and diodes.",
      "Check the charger brick of your laptop to read its input/output Volts and Amps and calculate total Watts.",
      "Learn how regenerative braking on electric scooters and cars turns wheel motion back into battery charge."
    ],
    relatedCareers: ["electronics-engineer", "clean-energy-analyst", "automation-engineer"]
  },
  {
    id: "electronics-engineer",
    categoryId: "engineering",
    categoryName: "Engineering",
    title: "Electronics Engineer",
    tagline: "Craft custom circuit boards, sensors, and tiny silicon hardware",
    overview: "Electronics engineers design the printed circuit boards (PCBs), analog amplifiers, radio antennas, and microchip blocks inside smartphones, hearing aids, satellites, and robots.",
    whatTheyDo: "They select transistors, op-amps, and microchips from datasheets, lay out multi-layer copper traces on PCBs, and bring up physical boards at the soldering workbench.",
    dailyResponsibilities: [
      "Draw circuit schematics and design multi-layer Printed Circuit Boards (PCBs)",
      "Design clean sensor-conditioning and low-noise analog signal circuits",
      "Solder surface-mount components and inspect waveforms on an oscilloscope",
      "Verify wireless RF signals, thermal limits, and electromagnetic compliance"
    ],
    education: "Electronics & Communication Engineering, Electrical Engineering, or hardware maker portfolios.",
    technicalSkills: ["Analog & Digital Circuit Design", "PCB Layout & Routing", "Sensor Signal Conditioning", "Soldering & Bench Testing", "Datasheet Analysis"],
    softSkills: ["Microscopic Attention to Detail", "Methodical Debugging", "Patience", "Curiosity About How Hardware Works"],
    tools: ["KiCad", "Altium Designer", "LTspice", "Oscilloscope", "Hot-Air Rework & Soldering Station"],
    growthOpportunities: "Essential in robotics sensors, semiconductor startups, medical wearables, audio gear, consumer electronics, and satellite communications.",
    learningResources: [
      "EEVblog Beginner Electronics & Oscilloscope Videos (Free)",
      "Phil's Lab KiCad PCB Design Tutorials (YouTube)",
      "Tinkercad Circuits Free Electronics Sandbox"
    ],
    beginnerProject: "Lay out a clean 2-layer USB-powered night-light PCB with a light sensor and potentiometer dimmer in free KiCad software.",
    howToGetStarted: [
      "Open Tinkercad Circuits (free) and wire a photoresistor that dims an LED when room light drops.",
      "Download KiCad (free, open-source) and trace how schematics turn into green copper PCB layouts.",
      "Learn Ohm's Law and see how resistors protect tiny LEDs from burning out."
    ],
    relatedCareers: ["embedded-systems-engineer", "mechatronics-engineer", "electrical-engineer"]
  },
  {
    id: "civil-engineer",
    categoryId: "engineering",
    categoryName: "Engineering",
    title: "Civil & Infrastructure Engineer",
    tagline: "Design resilient bridges, clean transit systems, and climate-ready cities",
    overview: "Civil engineers plan and engineer the foundational physical infrastructure societies depend on—safe bridges, clean drinking-water networks, flood barriers, metro rail lines, and sustainable foundations.",
    whatTheyDo: "They calculate structural loads, analyze soil stability and stormwater drainage, design concrete/steel reinforcement, and inspect real construction sites for safety and longevity.",
    dailyResponsibilities: [
      "Analyze structural forces on bridges, retaining walls, and building frames",
      "Design stormwater drainage, permeable streets, and clean-water piping systems",
      "Review geotechnical soil reports and construction site quality tests",
      "Collaborate with urban planners, environmental scientists, and contractors"
    ],
    education: "B.S./B.E. in Civil Engineering, Structural Engineering, or Environmental Infrastructure.",
    technicalSkills: ["Structural Load Analysis", "Civil CAD & BIM", "Hydrology & Drainage", "Concrete & Steel Design", "Geotechnical Basics"],
    softSkills: ["Public Safety Responsibility", "Civic Teamwork", "Long-Term Planning", "Field Communication"],
    tools: ["AutoCAD Civil 3D", "Revit", "SAP2000 / STAAD.Pro", "QGIS", "HEC-RAS Flood Modeling"],
    growthOpportunities: "Sustained demand globally for climate-resilient coastlines, high-speed rail, earthquake retrofitting, green cities, and water infrastructure.",
    learningResources: [
      "Practical Engineering with Grady Hillhouse (Free plain-English videos)",
      "MIT OpenCourseWare Mechanics & Structures",
      "Autodesk Student Free Civil 3D Learning Hub"
    ],
    beginnerProject: "Design and load-test a lightweight popsicle-stick or spaghetti truss bridge, measuring how many kilograms triangular bracing supports compared to squares.",
    howToGetStarted: [
      "Watch Practical Engineering videos on why triangles make bridges strong and how underground water mains work.",
      "Walk across a nearby pedestrian bridge and sketch where compression (pushing) and tension (pulling) act.",
      "Try a free online bridge-builder physics simulator to test truss vs. arch designs under heavy truck loads."
    ],
    relatedCareers: ["sustainable-architect", "environmental-scientist", "mechanical-engineer"]
  },
  {
    id: "aerospace-engineer",
    categoryId: "engineering",
    categoryName: "Engineering",
    title: "Aerospace & Spacecraft Engineer",
    tagline: "Design efficient aircraft, reusable rockets, and Earth-observing satellites",
    overview: "Aerospace engineers solve extreme physics challenges in thin air and vacuum—shaping quiet electric aircraft wings, satellite attitude thrusters, thermal shields, and lightweight spacecraft structures.",
    whatTheyDo: "They run aerodynamic airflow simulations, model orbital trajectories, test composite carbon materials, and validate guidance hardware for aviation and space exploration.",
    dailyResponsibilities: [
      "Model wing, fuselage, or rocket nozzle aerodynamics with Computational Fluid Dynamics",
      "Calculate propulsion thrust, structural weight budgets, and thermal protection",
      "Simulate orbital paths, satellite attitude control, and re-entry stability",
      "Run wind-tunnel, vibration, and thermal-vacuum tests on flight hardware"
    ],
    education: "B.S./B.E. in Aerospace Engineering, Mechanical Engineering, or Physics.",
    technicalSkills: ["Aerodynamics & Propulsion", "Orbital Mechanics", "Lightweight Structures", "Flight Stability & Control", "CFD Simulation"],
    softSkills: ["Extreme Safety Discipline", "Systems Mass-Budget Thinking", "Calm Precision", "Team Coordination"],
    tools: ["ANSYS Fluent / OpenFOAM", "MATLAB / Simulink", "SolidWorks / CATIA", "GMAT Orbital Simulator", "XFLR5 Airfoil Tool"],
    growthOpportunities: "Exciting careers in commercial Earth-observation satellites, sustainable electric/hydrogen aviation, reusable launch systems, and space habitats.",
    learningResources: [
      "NASA Glenn Beginner's Guide to Aeronautics (Free)",
      "OpenRocket Free Model Rocket Design Simulator",
      "MIT OpenCourseWare Aerospace Flight Engineering"
    ],
    beginnerProject: "Design and simulate a 2-stage model rocket in free OpenRocket software, optimizing fin stability and parachute altitude.",
    howToGetStarted: [
      "Download OpenRocket (free) or test airfoil shapes in NASA's free FoilSim online applet to watch lift vs. drag change.",
      "Fold 3 paper airplane designs (dart, glider, stubby) and track how wing surface area changes flight time.",
      "Explore NASA's Eyes on the Solar System to see real orbital mechanics and CubeSat trajectories live."
    ],
    relatedCareers: ["drone-systems-engineer", "astrophysicist", "mechanical-engineer"]
  },
  {
    id: "biomedical-engineer",
    categoryId: "engineering",
    categoryName: "Engineering",
    title: "Biomedical & Bionics Engineer",
    tagline: "Engineer bionic prosthetics, wearable health sensors, and life-saving devices",
    overview: "Biomedical engineers blend engineering with human biology to create prosthetic limbs that respond to muscle signals, portable ultrasound scanners, insulin pumps, and scaffolds for regenerating tissue.",
    whatTheyDo: "They prototype medical hardware with biocompatible materials, measure bioelectric signals like ECG/EMG, run clinical safety tests, and partner directly with doctors and patients.",
    dailyResponsibilities: [
      "Design ergonomic medical instruments, wearable patches, or bionic prosthetic joints",
      "Process human biosignals (heartbeat ECG, muscle EMG, oxygen SpO2) cleanly",
      "Verify sterilization, biocompatibility, and FDA/ISO medical safety standards",
      "Shadow clinicians and patients to uncover unmet bedside device needs"
    ],
    education: "Biomedical Engineering, Mechanical/Electrical Engineering with Biology minors, or Medical Device Technology.",
    technicalSkills: ["Biosignal Acquisition (EMG / ECG)", "Biocompatible Materials", "Medical Device CAD Prototyping", "Clinical Safety Testing", "Physiology Integration"],
    softSkills: ["Patient Compassion", "Strict Ethical & Safety Care", "Doctor-Engineer Translation", "Detail Orientation"],
    tools: ["SolidWorks / CAD", "MATLAB / Python", "Arduino + MyoWare EMG Sensors", "LabVIEW", "3D Bioprinters / SLA Printers"],
    growthOpportunities: "Fast growth across assistive bionics, wearable diagnostics, minimally invasive surgical robotics, and accessible point-of-care medical tools.",
    learningResources: [
      "e-NABLE Open-Source 3D-Printed Prosthetics Community",
      "Backyard Brains Free Neuroscience & EMG Guides",
      "Johns Hopkins Center for Bioengineering Innovation Talks"
    ],
    beginnerProject: "Research open-source e-NABLE mechanical prosthetic hand designs and map how wrist flexion pulls tendon cables to close the fingers.",
    howToGetStarted: [
      "Explore enablingthefuture.org (e-NABLE) to inspect open-source mechanical hand files built by students worldwide.",
      "Sketch a wearable fall-detection bracelet for grandparents and list what 3 sensors and alerts it needs.",
      "Read how pulse oximeters shine red and infrared light through a fingertip to measure blood oxygen safely."
    ],
    relatedCareers: ["biomedical-scientist", "human-robot-interaction-designer", "mechatronics-engineer"]
  },
  {
    id: "chemical-engineer",
    categoryId: "engineering",
    categoryName: "Engineering",
    title: "Chemical & Process Engineer",
    tagline: "Scale up clean fuels, next-gen batteries, and eco-friendly materials",
    overview: "Chemical engineers transform laboratory chemistry into safe, large-scale processes—producing solid-state EV battery cells, green hydrogen, biodegradable plastics, carbon-capture membranes, and accessible medicines.",
    whatTheyDo: "They model heat and chemical reaction rates, size reactors and filtration columns, replace toxic solvents with green chemistry, and optimize plant energy efficiency.",
    dailyResponsibilities: [
      "Scale laboratory reactions into safe pilot-scale manufacturing reactors",
      "Optimize catalysis, filtration, water recycling, and heat recovery loops",
      "Select corrosion-resistant piping, valves, and safety pressure-relief systems",
      "Monitor product purity, yield, and environmental emissions across batches"
    ],
    education: "B.S./B.E. in Chemical Engineering, Process Engineering, or Materials Chemistry.",
    technicalSkills: ["Reaction & Process Modeling", "Thermodynamics & Heat Transfer", "Green Chemistry Scaling", "Separation & Filtration Systems", "Process Safety Analysis"],
    softSkills: ["Big-Picture Systems Thinking", "Safety Stewardship", "Quantitative Rigor", "Lab-to-Factory Teamwork"],
    tools: ["Aspen Plus / DWSIM (Free)", "MATLAB / Python", "Process Flow Diagrams (PFD)", "Mass & Energy Balance Sheets", "Spectroscopy Analyzers"],
    growthOpportunities: "Vital across green hydrogen, battery recycling, sustainable bioplastics, clean water desalination, and biopharmaceutical manufacturing.",
    learningResources: [
      "LearnChemE by University of Colorado Boulder (Free YouTube & simulations)",
      "DWSIM Free Open-Source Chemical Process Simulator",
      "ACS Green Chemistry Institute Student Resources"
    ],
    beginnerProject: "Create a mass-and-energy balance flowsheet for filtering and desalinating ocean water vs. recycling greywater for campus irrigation.",
    howToGetStarted: [
      "Visit LearnChemE.com to explore visual interactive simulations of heat exchangers and distillation.",
      "Track the inputs, heat used, and waste outputs of brewing coffee or making compost as a real chemical process.",
      "Compare biodegradable mycelium or seaweed packaging with petroleum plastic in lifecycle energy terms."
    ],
    relatedCareers: ["materials-scientist", "biotechnologist", "clean-energy-analyst"]
  },

  // 18. Emerging Technology
  {
    id: "quantum-computing-engineer",
    categoryId: "emerging-tech",
    categoryName: "Emerging Technology",
    title: "Quantum Computing Scientist & Engineer",
    tagline: "Harness quantum mechanics to model molecules, materials, and breakthroughs",
    overview: "Quantum computing engineers build algorithms, error-correction schemes, and cryogenically cooled hardware using qubits—tackle problems in drug discovery, fertilizer chemistry, and post-quantum security that classical supercomputers cannot.",
    whatTheyDo: "They construct quantum gate circuits, test noisy intermediate-scale quantum processors over cloud labs, tune microwave control pulses, and study real chemistry or optimization use cases.",
    dailyResponsibilities: [
      "Design and simulate quantum circuits using superposition and entanglement gates",
      "Benchmark quantum error mitigation techniques on cloud superconducting or trapped-ion chips",
      "Partner with chemists and materials scientists to map molecular simulations onto qubits",
      "Document algorithm speedup boundaries honestly against classical supercomputers"
    ],
    education: "Physics, Computer Science, Applied Mathematics, or Electrical Engineering with quantum electives.",
    technicalSkills: ["Quantum Gates & Circuits", "Linear Algebra & Qubit Math", "Qiskit / Cirq Frameworks", "Quantum Error Mitigation", "Microwave / Cryogenic Hardware Basics"],
    softSkills: ["Abstract Conceptual Comfort", "Scientific Honesty", "Cross-Discipline Curiosity", "Persistence"],
    tools: ["IBM Qiskit", "Google Cirq", "Quirk Browser Simulator", "Python / NumPy", "PennyLane"],
    growthOpportunities: "Emerging R&D roles at quantum hardware pioneers, national labs, pharmaceutical molecular simulation teams, and cryptography organizations.",
    learningResources: [
      "IBM Quantum Learning (Free interactive Qiskit courses)",
      "Quirk Free Drag-and-Drop Quantum Circuit Simulator",
      "Qubit by Qubit / Andy Matuschak & Michael Nielsen 'Quantum Country' (Free essay)"
    ],
    beginnerProject: "Build a quantum random number generator and entangled Bell-state pair in Quirk's free drag-and-drop browser simulator.",
    howToGetStarted: [
      "Read 'Quantum Computing for the Very Curious' (quantum.country — free interactive memory essays).",
      "Open Quirk (algassert.com/quirk) and drop a Hadamard gate + CNOT gate to watch two qubits become entangled.",
      "Learn why quantum computers excel specifically at chemistry simulation and factoring rather than replacing your laptop."
    ],
    relatedCareers: ["astrophysicist", "ai-engineer", "materials-scientist"]
  },
  {
    id: "iot-systems-engineer",
    categoryId: "emerging-tech",
    categoryName: "Emerging Technology",
    title: "Internet of Things (IoT) Systems Engineer",
    tagline: "Connect smart environmental sensors across cities, farms, and clean buildings",
    overview: "IoT Systems Engineers weave low-power physical sensors, wireless networks (LoRaWAN, BLE, Wi-Fi), and edge dashboards together so soil moisture monitors, smart classrooms, and wildlife collars report live insights for years on tiny batteries.",
    whatTheyDo: "They choose wireless protocols, mount rugged weatherproof sensor nodes, build secure MQTT data pipelines, and turn raw readings into clear alerts for farmers, city engineers, and families.",
    dailyResponsibilities: [
      "Pair physical sensors (soil moisture, air quality, water leak) with low-power radios",
      "Design secure telemetry pipelines using MQTT, LoRaWAN, and edge gateways",
      "Verify outdoor battery life, weatherproofing, and zero-touch device security updates",
      "Build simple anomaly alerts when temperatures, leaks, or power usage spike"
    ],
    education: "Computer/Electrical Engineering, IoT Systems, IT Infrastructure, or maker sensor projects.",
    technicalSkills: ["Edge Microcontrollers", "Wireless Networks (LoRaWAN / BLE / MQTT)", "Sensor Calibration", "Low-Power Battery Design", "Device Security"],
    softSkills: ["Practical Systems Thinking", "Field Reliability", "Plain-English Dashboards", "Security Mindfulness"],
    tools: ["ESP32 / Raspberry Pi", "MQTT / Node-RED", "LoRaWAN Gateways", "Grafana / InfluxDB", "Wokwi Simulator"],
    growthOpportunities: "Widely applied in precision water-saving agriculture, wildfire early-warning meshes, smart buildings, logistics cold-chain monitoring, and home health.",
    learningResources: [
      "Node-RED Free Low-Code IoT Flow Tutorials",
      "The Things Network Free LoRaWAN Academy",
      "Random Nerd Tutorials Free Weather-Station Builds"
    ],
    beginnerProject: "Prototype a virtual classroom air-quality monitor in Wokwi + Node-RED that triggers an open-window alert when simulated CO2 rises.",
    howToGetStarted: [
      "Draw how a soil moisture sensor in a farm field sends a 10-byte message miles away using LoRa radio instead of power-hungry 5G.",
      "Try Node-RED (free visual flow editor) to wire a mock temperature feed into a clean gauge and threshold warning.",
      "List 3 everyday community problems (bus arrival timing, flood-prone underpasses, campus energy leaks) sensors could solve."
    ],
    relatedCareers: ["embedded-systems-engineer", "cloud-architect", "environmental-scientist"]
  },
  {
    id: "ar-vr-developer",
    categoryId: "emerging-tech",
    categoryName: "Emerging Technology",
    title: "Spatial Computing & AR/VR Developer",
    tagline: "Build interactive 3D worlds for surgery training, design, and learning",
    overview: "Spatial Computing and AR/VR developers create immersive augmented overlays and virtual 3D environments where medical students practice surgery safely, architects walk clients through solar-lit rooms, and remote learners inspect molecules in mid-air.",
    whatTheyDo: "They sculpt 3D scenes, implement natural hand-tracking and spatial audio, keep frame rates smooth so users stay comfortable, and test real ergonomics inside headsets and phones.",
    dailyResponsibilities: [
      "Assemble interactive 3D scenes, lighting, physics, and spatial UI panels",
      "Implement natural hand-pinch, controller, or eye-gaze interactions",
      "Profile graphics rendering so frame rates stay buttery smooth without motion discomfort",
      "Collaborate with 3D artists, sound designers, and educators on spatial storytelling"
    ],
    education: "Computer Science, Interactive Media, Game/3D Design, Architecture, or Unity/Unreal portfolios.",
    technicalSkills: ["3D Engines (Unity / Unreal)", "Spatial UI & Ergonomics", "Shader & Lighting Basics", "Hand / Head Tracking (OpenXR)", "3D Performance Tuning"],
    softSkills: ["Spatial Empathy", "User Comfort First", "Visual Storytelling", "Iterative Prototyping"],
    tools: ["Unity / Unreal Engine", "Blender (Free 3D)", "WebXR / Three.js", "OpenXR SDK", "Figma Spatial Grids"],
    growthOpportunities: "Expanding across surgical training simulators, architectural visualization, museum exhibitions, industrial maintenance AR overlays, and interactive learning.",
    learningResources: [
      "Unity Learn Free VR & AR Development Pathways",
      "Blender Guru Donut & Beginner 3D Tutorials (Free)",
      "WebXR Immersive Web Emulator Tutorials"
    ],
    beginnerProject: "Model a simple solar system or campus pavilion in free Blender or WebXR that visitors can orbit and inspect with clickable labels.",
    howToGetStarted: [
      "Download Blender (100% free) or open a free Three.js web demo to learn 3D X/Y/Z axes, cameras, and lighting.",
      "Try AR placement in a free mobile museum or furniture app and note what made floating labels easy vs. hard to read.",
      "Sketch a 3D science classroom lesson—what physical object would be safer or clearer to explore in AR/VR?"
    ],
    relatedCareers: ["creative-technologist", "product-designer", "industrial-designer"]
  },
  {
    id: "cloud-architect",
    categoryId: "emerging-tech",
    categoryName: "Emerging Technology",
    title: "Cloud Infrastructure & Distributed Systems Architect",
    tagline: "Keep global apps fast, resilient, and green across cloud data centers",
    overview: "Cloud architects design the invisible distributed server backbones, automated deployments, and resilient databases that allow hospitals, universities, climate models, and mobile apps to serve millions reliably without crashing.",
    whatTheyDo: "They blueprint multi-region architectures, automate infrastructure templates, balance compute costs and energy footprint, and drill failure recovery plans.",
    dailyResponsibilities: [
      "Design fault-tolerant cloud topologies across compute clusters, storage, and CDNs",
      "Automate infrastructure deployments as reproducible configuration blueprints",
      "Configure observability dashboards, automated scaling, and zero-downtime backups",
      "Audit cloud carbon footprint, right-sizing workloads to run in cleaner energy regions"
    ],
    education: "Computer Science, Information Systems, DevOps certifications (AWS/GCP/Azure), or sysadmin experience.",
    technicalSkills: ["Cloud Architecture (AWS / GCP)", "Containers & Kubernetes", "Infrastructure as Code (Terraform)", "Observability & Monitoring", "Reliability & Disaster Recovery"],
    softSkills: ["Calm Under Outages", "Cost & Trade-off Judgment", "Clear Diagramming", "Cross-Team Enablement"],
    tools: ["Terraform", "Docker & Kubernetes", "AWS / Google Cloud", "Prometheus & Grafana", "GitHub Actions"],
    growthOpportunities: "High leadership compensation path into Principal Infrastructure Architect, Site Reliability Lead, Platform Engineering Director, or FinOps Lead.",
    learningResources: [
      "Docker & Kubernetes Official Free Playgrounds",
      "AWS Cloud Practitioner & Google Cloud Skills Boost Free Labs",
      "Excalidraw System Architecture Practice Templates"
    ],
    beginnerProject: "Draw a fault-tolerant architecture diagram showing how a student exam portal handles 10,000 students submitting at once without losing data.",
    howToGetStarted: [
      "Think about what happens behind the scenes when 5,000 classmates log into the campus registration portal at 8:00 AM.",
      "Draw how a Load Balancer spreads traffic across 3 backup servers instead of 1 overloaded machine.",
      "Run a tiny 1-page website inside a free Docker container locally to experience reproducible packaging."
    ],
    relatedCareers: ["software-engineer", "cybersecurity-analyst", "iot-systems-engineer"]
  },
  {
    id: "blockchain-developer",
    categoryId: "emerging-tech",
    categoryName: "Emerging Technology",
    title: "Decentralized Systems & Cryptography Engineer",
    tagline: "Build verifiable, tamper-proof digital credentials and trustless infrastructure",
    overview: "Decentralized systems and cryptography engineers apply zero-knowledge proofs and distributed ledgers to verify university diplomas, trace ethical fair-trade supply chains, preserve privacy, and secure open financial rails.",
    whatTheyDo: "They design cryptographic verification rules, write formally audited smart contracts, build privacy-preserving zero-knowledge proofs, and eliminate single-point security vulnerabilities.",
    dailyResponsibilities: [
      "Design tamper-resistant smart contracts and verifiable credential schemas",
      "Write exhaustive edge-case tests and formal security audits before deployment",
      "Implement zero-knowledge proofs so users can prove eligibility without revealing private data",
      "Collaborate with security auditors and legal counsel on user-safe key recovery"
    ],
    education: "Computer Science, Cryptography/Mathematics, Software Security, or open-source security portfolios.",
    technicalSkills: ["Applied Cryptography & Hashing", "Zero-Knowledge Basics", "Smart Contract Auditing", "Distributed Consensus", "Adversarial Security Testing"],
    softSkills: ["Adversarial Skepticism", "Precision Thinking", "Open-Source Rigor", "Ethical Responsibility"],
    tools: ["Foundry / Hardhat", "Solidity / Rust", "Circom ZK Playground", "OpenZeppelin Audits", "Git"],
    growthOpportunities: "Applied in verifiable digital identity, open scientific data provenance, cross-border remittances, and privacy-preserving authentication.",
    learningResources: [
      "Cyfrin Updraft Free Smart Contract & Security Curriculum",
      "Anders Brownworth Free Visual Blockchain & Hash Demo",
      "MIT OpenCourseWare Blockchain & Money Lectures"
    ],
    beginnerProject: "Experiment with Anders Brownworth's free browser hash visualizer to see how changing a single letter alters cryptographic fingerprints.",
    howToGetStarted: [
      "Open tools like andersbrownworth.com/blockchain/hash to watch SHA-256 cryptographic hashing work interactively.",
      "Design a university transcript verification concept where an employer confirms your graduation without seeing private grades.",
      "Read why formal security testing matters infinitely more when code cannot be hot-patched casually."
    ],
    relatedCareers: ["cybersecurity-analyst", "cloud-architect", "tech-policy-counsel"]
  },

  // 19. Science & Research (Expanded Domains)
  {
    id: "astrophysicist",
    categoryId: "science",
    categoryName: "Science & Research",
    title: "Astrophysicist & Space Scientist",
    tagline: "Decode starlight, exoplanets, gravitational waves, and cosmic origins",
    overview: "Astrophysicists analyze light, radio signals, and gravitational ripples from space telescopes and ground observatories to discover habitable exoplanets, map dark matter, and understand how stars and galaxies evolve.",
    whatTheyDo: "They process telescope spectra, run physics simulations of stellar collisions, propose observation windows on global observatories, and share discoveries about our universe.",
    dailyResponsibilities: [
      "Analyze telescope brightness curves to spot distant exoplanets crossing stars",
      "Clean instrument noise from optical, infrared, or radio astronomy datasets",
      "Run gravitational or plasma simulations to test astrophysical theories",
      "Write observing proposals and collaborate across international observatory consortia"
    ],
    education: "Physics, Astrophysics, Astronomy, or Planetary Science (often advancing to M.S./Ph.D. research).",
    technicalSkills: ["Astronomical Spectroscopy", "Orbital & Stellar Physics", "Statistical Signal Analysis", "Telescope Data Calibration", "Scientific Computing"],
    softSkills: ["Infinite Cosmic Curiosity", "Patient Analytical Rigor", "Clear Science Storytelling", "Global Collaboration"],
    tools: ["Astropy / Python", "DS9 FITS Image Viewer", "Stellarium (Free)", "TOPCAT Star Catalogs", "NASA Exoplanet Archive"],
    growthOpportunities: "Paths at space agencies (NASA/ESA/ISRO), observatories, satellite imaging startups, orbital debris tracking, and data-intensive physics institutes.",
    learningResources: [
      "Zooniverse 'Planet Hunters TESS' (Find real exoplanets in NASA telescope data!)",
      "Stellarium Free Open-Source Planetarium",
      "Crash Course Astronomy by Phil Plait (Free series)"
    ],
    beginnerProject: "Log into Zooniverse Planet Hunters TESS and inspect real NASA star-brightness graphs to help astronomers flag potential exoplanet transits.",
    howToGetStarted: [
      "Join Planet Hunters TESS on Zooniverse.org right now—citizen students regularly help discover real exoplanets.",
      "Download Stellarium (free) to map tonight's visible planets, star colors (hot blue vs. cool red), and ISS passes.",
      "Learn how Doppler wobbles and tiny brightness dips reveal planets light-years away."
    ],
    relatedCareers: ["aerospace-engineer", "quantum-computing-engineer", "computational-biologist"]
  },
  {
    id: "biotechnologist",
    categoryId: "science",
    categoryName: "Science & Research",
    title: "Biotechnology Research Specialist",
    tagline: "Engineer living cells to brew sustainable materials, foods, and medicines",
    overview: "Biotechnologists harness benign microbes, enzymes, and cellular pathways like microscopic factories—producing insulin, biodegradable spider-silk textiles, plant-saving biofertilizers, and plastic-eating enzymes.",
    whatTheyDo: "They culture cell strains safely in sterile biosafety cabinets, optimize fermentation nutrients, assay protein yields, and partner with engineers to scale biological discoveries sustainably.",
    dailyResponsibilities: [
      "Maintain sterile microbial or cell cultures and record growth-curve assays",
      "Optimize temperature, pH, and nutrient mixes inside benchtop bioreactors",
      "Purify and test target enzymes, antibodies, or sustainable biopolymers",
      "Follow strict biosafety documentation and lab reproducibility protocols"
    ],
    education: "Biotechnology, Molecular Biology, Biochemistry, Biochemical Engineering, or Bio-manufacturing degrees.",
    technicalSkills: ["Sterile Cell Culturing", "Fermentation Bioprocessing", "Protein & Enzyme Assays", "Spectrophotometry", "Biosafety Lab Protocols"],
    softSkills: ["Sterile Lab Discipline", "Experimental Patience", "Ecological Ethics", "Team Precision"],
    tools: ["Micropipettes & Centrifuges", "Benchtop Bioreactors", "ELISA & Plate Readers", "Benchling Lab Notebook", "BioRender"],
    growthOpportunities: "Transforming pharmaceuticals, alternative sustainable packaging, cultivated proteins, precision fermentation, and agricultural biologics.",
    learningResources: [
      "iGEM Synthetic Biology Competition Project Archives (Free inspiration)",
      "LabXchange Free Virtual Pipetting & Biotech Lab Simulations (Harvard)",
      "Khan Academy & MITx Intro Biology Resources"
    ],
    beginnerProject: "Complete Harvard's free LabXchange virtual lab on micropipetting and yeast fermentation without stepping into a physical lab.",
    howToGetStarted: [
      "Create a free account on LabXchange.org and try interactive browser simulations of gel electrophoresis and sterile culture.",
      "Browse past iGEM student team wikis to see creative climate and medical problems students tackled with engineered microbes.",
      "Notice 3 everyday products (laundry detergent enzymes, insulin, bio-plastics) already powered by biotechnology."
    ],
    relatedCareers: ["geneticist", "biomedical-scientist", "chemical-engineer"]
  },
  {
    id: "geneticist",
    categoryId: "science",
    categoryName: "Science & Research",
    title: "Genetics & Genomics Scientist",
    tagline: "Read and repair the genetic code behind human health and biodiversity",
    overview: "Geneticists study DNA inheritance, gene expression, and CRISPR repair tools to diagnose rare hereditary conditions earlier, protect endangered species' diversity, and breed drought-tolerant food crops.",
    whatTheyDo: "They design PCR primers and CRISPR guide sequences, inspect genome variation tracks, interpret hereditary risk markers, and uphold strict bioethical safeguards.",
    dailyResponsibilities: [
      "Design PCR, sequencing, or CRISPR-Cas guide RNA laboratory protocols",
      "Inspect genomic variant calls to distinguish harmless traits from disease mutations",
      "Collaborate with genetic counselors, doctors, or agricultural breeders on findings",
      "Maintain strict ethical consent and biological privacy stewardship"
    ],
    education: "Genetics, Genomics, Molecular Biology, Bioinformatics, or Genetic Counseling graduate tracks.",
    technicalSkills: ["DNA Sequencing & PCR", "CRISPR-Cas Gene Design", "Genome Browser Analysis", "Inheritance & Pedigree Modeling", "Bioethics Compliance"],
    softSkills: ["Ethical Integrity", "Careful Analytical Focus", "Empathetic Patient Translation", "Scientific Rigor"],
    tools: ["Benchling (Free Student Version)", "NCBI BLAST & GenBank", "IGV Genome Viewer", "Thermal Cyclers", "R / Bioconductor"],
    growthOpportunities: "High impact across precision oncology, rare-disease diagnosis, clinical genetic counseling, conservation genetics, and climate-resilient crops.",
    learningResources: [
      "Learn.Genetics by University of Utah (Free visual genetics labs)",
      "NCBI & Benchling Free DNA Sequence Explorers",
      "Cold Spring Harbor DNA Learning Center Animations"
    ],
    beginnerProject: "Use NCBI's free online BLAST tool to compare a mysterious DNA sequence segment against species across the tree of life.",
    howToGetStarted: [
      "Visit Learn.Genetics (learn.genetics.utah.edu) and run their interactive virtual DNA extraction and PCR simulations.",
      "Try a free student Benchling account to view how a real circular plasmid DNA map looks.",
      "Read a plain-English summary of how sickle-cell CRISPR therapy helps edit a single faulty genetic instruction."
    ],
    relatedCareers: ["computational-biologist", "biotechnologist", "biomedical-scientist"]
  },
  {
    id: "environmental-scientist",
    categoryId: "science",
    categoryName: "Science & Research",
    title: "Environmental & Earth Systems Scientist",
    tagline: "Restore ecosystems, protect watersheds, and guide climate resilience",
    overview: "Environmental scientists spend time outdoors in rivers, forests, wetlands, and labs—measuring soil health, tracking biodiversity recovery, testing groundwater purity, and advising cities on flood and wildfire resilience.",
    whatTheyDo: "They gather field water and soil samples, map habitats with satellite GIS imagery, assess industrial cleanup sites, and translate ecological findings into community action.",
    dailyResponsibilities: [
      "Conduct field surveys testing stream quality, soil nutrients, air particulates, and species counts",
      "Analyze satellite deforestation, drought, and urban heat-island maps in GIS",
      "Model watershed runoff and wetland restoration plans for local towns",
      "Write accessible environmental impact findings for parks, schools, and policymakers"
    ],
    education: "Environmental Science, Ecology, Earth Sciences, Hydrology, or Conservation Biology.",
    technicalSkills: ["Field Soil & Water Sampling", "GIS & Satellite Mapping", "Ecological Biodiversity Surveying", "Environmental Impact Audits", "Watershed Modeling"],
    softSkills: ["Love for Fieldwork", "Observation Patience", "Community Diplomacy", "Stewardship"],
    tools: ["QGIS (Free GIS)", "Google Earth Engine", "iNaturalist Citizen Science", "Hanna Water Quality Meters", "Excel / R"],
    growthOpportunities: "Roles across national parks, watershed conservation districts, renewable project siting, urban forestry, ESG environmental audits, and climate research.",
    learningResources: [
      "iNaturalist & Globe Observer Citizen Science Apps (Free)",
      "QGIS Official Free Beginner Mapping Tutorials",
      "NASA Earth Observatory Interactive Articles"
    ],
    beginnerProject: "Use iNaturalist or QGIS to map 15 native vs. invasive plants or heat-absorbing paved zones across your campus or neighborhood.",
    howToGetStarted: [
      "Download iNaturalist (free) and log 10 local plants, insects, or birds to contribute real biodiversity observations.",
      "Look up your hometown on NASA Earth Observatory or Google Earth time-lapse to spot how green space changed over 20 years.",
      "Learn how riparian tree buffers alongside creeks stop topsoil erosion and cool stream water naturally."
    ],
    relatedCareers: ["clean-energy-analyst", "civil-engineer", "sustainable-architect"]
  },
  {
    id: "neuroscientist",
    categoryId: "science",
    categoryName: "Science & Research",
    title: "Cognitive & Brain-Computer Interface Neuroscientist",
    tagline: "Explore memory, perception, and neural signals that reconnect movement",
    overview: "Neuroscientists study how billions of neurons create memory, emotion, attention, and movement—driving breakthroughs in Alzheimer's prevention, mental health therapies, and non-invasive brain-computer interfaces that restore speech or prosthetic control.",
    whatTheyDo: "They record electrical EEG or MRI brain activity during cognitive tasks, design behavioral memory experiments, test neural-decoding patterns, and work with neurologists and biomedical engineers.",
    dailyResponsibilities: [
      "Design behavioral reaction, memory, or visual perception experiments for volunteers",
      "Clean and analyze EEG brainwave or functional MRI imaging datasets",
      "Study neural plasticity, sleep consolidation, or assistive brain-interface decoding",
      "Present findings clearly to clinicians, educators, and assistive technology builders"
    ],
    education: "Neuroscience, Cognitive Science, Psychology, Biology, or Biomedical Engineering.",
    technicalSkills: ["EEG / Neural Signal Recording", "Experimental Cognitive Design", "Brain Imaging Concepts", "Statistical Hypothesis Testing", "Ethics in Human Research"],
    softSkills: ["Deep Curiosity About Consciousness", "Methodical Experimental Control", "Empathy for Patients", "Scientific Writing"],
    tools: ["MNE-Python / EEGLAB", "PsychoPy Experiment Builder", "Allen Brain Atlas (Free)", "R / JASP Statistics", "Muse / OpenBCI Headsets"],
    growthOpportunities: "Expanding in clinical neurology research, assistive neurotechnology, neuro-rehabilitation clinics, human-factors ergonomics, and pharmaceutical R&D.",
    learningResources: [
      "Neuroscience Online by UTHealth (Free open digital textbook)",
      "Allen Brain Map Interactive 3D Explorer (Free)",
      "Backyard Brains DIY Neurophysiology Videos"
    ],
    beginnerProject: "Design a 3-minute reaction-time or Stroop color-word attention experiment in free PsychoPy and compare distracted vs. quiet test scores with friends.",
    howToGetStarted: [
      "Explore the free 3D Allen Brain Atlas (brain-map.org) to locate the hippocampus (memory) and motor cortex (movement).",
      "Try a classic online Stroop test to experience firsthand how conflicting visual words slow brain processing speed.",
      "Watch a short video on how silent motor-cortex signals help paralyzed users control a cursor or robotic gripper."
    ],
    relatedCareers: ["biomedical-engineer", "clinical-psychologist", "user-researcher"]
  },
  {
    id: "materials-scientist",
    categoryId: "science",
    categoryName: "Science & Research",
    title: "Materials Science & Nanotechnology Researcher",
    tagline: "Invent stronger composites, longer-lasting batteries, and greener coatings",
    overview: "Materials scientists engineer matter atom by atom—creating solid-state EV batteries that charge in minutes without catching fire, ultra-light aerospace carbon composites, self-healing concrete, and compostable plant films.",
    whatTheyDo: "They formulate new alloys, ceramics, or polymer blends, inspect microscopic crystal grain structures, pull samples to the breaking point, and measure heat, light, and electrical conductivity.",
    dailyResponsibilities: [
      "Synthesize experimental battery electrolytes, bio-polymers, or carbon composites",
      "Inspect microscopic structure with scanning electron microscopes and X-ray diffraction",
      "Test material tensile strength, flexibility, heat tolerance, and corrosion resistance",
      "Replace scarce or toxic mined elements with abundant, recyclable alternatives"
    ],
    education: "Materials Science & Engineering, Chemistry, Physics, or Mechanical/Chemical Engineering.",
    technicalSkills: ["Polymer & Composite Formulation", "Microscopy & Characterization", "Mechanical & Thermal Testing", "Battery / Solar Materials", "Structure-Property Analysis"],
    softSkills: ["Tactile Curiosity", "Methodical Experimentation", "Cross-Discipline Curiosity", "Sustainability Mindset"],
    tools: ["Materials Project Open Database", "ImageJ Microscope Analyzer", "Stress-Strain Testers", "Differential Scanning Calorimetry", "Python / OriginLab"],
    growthOpportunities: "Crucial to solid-state batteries, next-gen perovskite solar cells, lightweight wind blades, sustainable semiconductors, and space habitats.",
    learningResources: [
      "Materials Project (materialsproject.org — Free open crystal & battery database)",
      "MIT OpenCourseWare Introduction to Solid State Chemistry",
      "Ainissa Ramirez & Real Engineering Materials Videos (YouTube)"
    ],
    beginnerProject: "Explore Materials Project online and design a fair home stress-test comparing tensile bending strength across 4 everyday recycling plastics (PET, HDPE, PP, cardboard).",
    howToGetStarted: [
      "Look at the recycling triangle numbers (1–7) on kitchen containers and research why #2 HDPE milk jugs flex while #6 snaps cleanly.",
      "Watch how crystal grain boundaries turn brittle iron into ultra-tough spring steel through heat treatment.",
      "Browse materialsproject.org to see scientists screening thousands of battery materials computationally."
    ],
    relatedCareers: ["chemical-engineer", "mechanical-engineer", "robotics-research-scientist"]
  },

  // 20. Psychology, Economics, Industrial Design & Innovation Strategy
  {
    id: "clinical-psychologist",
    categoryId: "psychology",
    categoryName: "Psychology",
    title: "Counseling & Behavioral Psychologist",
    tagline: "Support mental resilience, emotional wellbeing, and healthy behavioral change",
    overview: "Counseling and behavioral psychologists help students, families, athletes, and communities navigate stress, anxiety, life transitions, and burnout—combining evidence-based therapies with deep human warmth.",
    whatTheyDo: "They listen without judgment, conduct evidence-based assessments, guide cognitive and behavioral coping tools, and design school or workplace wellbeing workshops.",
    dailyResponsibilities: [
      "Conduct compassionate one-on-one counseling sessions and intake reflections",
      "Teach evidence-based stress regulation, cognitive reframing, and habit-building skills",
      "Facilitate peer-support circles and mental wellbeing workshops for campuses",
      "Maintain strict client confidentiality and collaborate with educators or physicians"
    ],
    education: "Psychology, Counseling, Behavioral Science, followed by accredited clinical/counseling graduate training & licensure.",
    technicalSkills: ["Evidence-Based CBT / ACT Frameworks", "Psychological Assessment", "Crisis De-escalation", "Ethics & Confidentiality", "Behavioral Habit Design"],
    softSkills: ["Non-Judgmental Listening", "Emotional Regulation", "Warm Empathy", "Patience & Trustworthiness"],
    tools: ["Validated Assessment Scales (GAD-7)", "Journaling & CBT Worksheets", "Secure Telehealth Platforms", "Habit Trackers"],
    growthOpportunities: "Growing demand in university counseling centers, hospital behavioral health teams, sports psychology, digital mental-health startups, and private practice.",
    learningResources: [
      "APA Psychology Topics Hub (Free research summaries)",
      "Yale 'The Science of Well-Being' by Dr. Laurie Santos (Free to audit)",
      "Active Minds Campus Peer Wellbeing Guides"
    ],
    beginnerProject: "Audit Yale's free 'Science of Well-Being' lectures and track a 14-day sleep, gratitude, and focus habit reflection journal.",
    howToGetStarted: [
      "Watch the first module of Yale's Science of Well-Being (free online) to learn why human intuition often mispredicts happiness.",
      "Practice reflective active listening for 5 minutes with a friend—summarizing what they felt before giving any advice.",
      "Explore different psychology tracks (Counseling, Educational, Sports, Industrial-Organizational) to see what setting fits you."
    ],
    relatedCareers: ["user-researcher", "learning-experience-designer", "neuroscientist"]
  },
  {
    id: "economist",
    categoryId: "finance",
    categoryName: "Finance",
    title: "Applied Economist & Market Strategist",
    tagline: "Understand incentives, pricing, climate economics, and public prosperity",
    overview: "Applied economists investigate why housing gets expensive, how green carbon incentives shift industries, what helps small businesses hire, and how nations and startups make sustainable resource choices.",
    whatTheyDo: "They analyze labor, inflation, and trade data, design A/B incentive experiments, forecast regional trends, and advise clean-energy startups, governments, or policy institutes.",
    dailyResponsibilities: [
      "Collect macroeconomic, wage, housing, and pricing datasets cleanly",
      "Build econometric models distinguishing real cause-and-effect from coincidence",
      "Evaluate the real-world tradeoffs of rebates, carbon credits, or pricing policies",
      "Write clear, jargon-free policy briefs with visual charts for decision makers"
    ],
    education: "Economics, Quantitative Social Science, Public Policy, Mathematics, or Finance.",
    technicalSkills: ["Econometrics & Causal Analysis", "Supply-Demand Modeling", "Data Storytelling", "Survey & Policy Evaluation", "Spreadsheet & R Forecasting"],
    softSkills: ["Critical Reasoning", "Bias Awareness", "Clear Writing for Non-Economists", "Intellectual Honesty"],
    tools: ["FRED Economic Data (Free)", "Our World in Data", "R / Excel / Python", "Stata", "Datawrapper Charts"],
    growthOpportunities: "Paths at central banks, clean-energy think tanks, marketplace pricing teams, development NGOs, and municipal strategy departments.",
    learningResources: [
      "CORE Econ (core-econ.org — 100% Free modern interactive textbook)",
      "Our World in Data Interactive Global Charts (Free)",
      "Planet Money & Freakonomics Podcasts"
    ],
    beginnerProject: "Use Our World in Data and FRED to compare solar electricity cost drops vs. coal adoption across 3 countries over 15 years in a 1-page visual brief.",
    howToGetStarted: [
      "Read Chapter 1 of CORE Econ (free online) to see how economics connects inequality, climate, and innovation.",
      "Explore fred.stlouisfed.org or ourworldindata.org and ask 1 curious question about youth wages, rent, or renewable energy.",
      "Notice an everyday incentive (student transit passes, surge rideshare pricing, deposit bottle returns) and analyze who changes behavior."
    ],
    relatedCareers: ["financial-analyst", "policy-analyst", "clean-energy-analyst"]
  },
  {
    id: "industrial-designer",
    categoryId: "design",
    categoryName: "Design & Creativity",
    title: "Industrial & Physical Product Designer",
    tagline: "Sculpt tactile, ergonomic everyday objects—from bikes to assistive hardware",
    overview: "Industrial designers shape the physical objects we hold, wear, sit in, and rely on—sketching ergonomic headphones, recyclable water bottles, assistive kitchen grips, medical devices, and sleek robotic shells.",
    whatTheyDo: "They observe how hands grip real objects, sketch rapid concepts, sculpt foam and clay mockups, model sleek surfaces in 3D CAD, and choose tactile, repairable materials.",
    dailyResponsibilities: [
      "Sketch 20+ rapid concept forms on paper and iPad to explore ergonomics and style",
      "Carve foam, cardboard, or 3D-printed mockups to test real hand feel",
      "Create surfacing models and CMF specs (Color, Material, Finish) for engineers",
      "Design products for easy repair, disassembly, and zero-waste packaging"
    ],
    education: "Industrial Design, Product Design, Mechanical Design, or strong physical prototyping portfolio.",
    technicalSkills: ["Form Sketching & Ergonomics", "3D Surface Modeling (Rhino / Fusion)", "Foam & Cardboard Mockups", "Color, Material & Finish (CMF)", "Design for Repairability"],
    softSkills: ["Tactile Aesthetic Eye", "Observational Empathy", "Openness to Critique", "Hands-On Craft"],
    tools: ["Rhino 3D / Fusion 360", "KeyShot Rendering", "Procreate / Sketchbook", "Foam Core & Clay", "3D Printers"],
    growthOpportunities: "Works at hardware startups, medical device studios, furniture & footwear brands, robotics chassis teams, and consumer tech companies.",
    learningResources: [
      "ID Sketching Free Perspective & Marker Tutorials (YouTube)",
      "Render Weekly & Yanko Design Physical Product Breakdowns",
      "The Design of Everyday Things by Don Norman"
    ],
    beginnerProject: "Pick an everyday kitchen peeler or backpack buckle that feels awkward and sculpt a more comfortable cardboard/clay grip prototype.",
    howToGetStarted: [
      "Hold 3 pens or water bottles with your eyes closed and notice which grip curves, weight balance, and texture feel best.",
      "Practice sketching simple cylinders, cubes, and rounded shampoo bottles in 3D perspective for 15 minutes.",
      "Build a quick corrugated cardboard mockup of a laptop riser or desk organizer using only scissors and tape."
    ],
    relatedCareers: ["product-designer", "human-robot-interaction-designer", "mechanical-engineer"]
  },
  {
    id: "research-innovation-strategist",
    categoryId: "business",
    categoryName: "Business & Management",
    title: "Research & Innovation Strategist",
    tagline: "Turn lab breakthroughs and human insights into real-world ventures",
    overview: "Research & innovation strategists bridge labs, design studios, and market teams—helping hospitals, universities, climate startups, and tech companies figure out which bold research ideas deserve funding and how to bring them to real users responsibly.",
    whatTheyDo: "They interview scientists and customers, scan emerging patent and tech horizons, run low-risk pilot experiments, and craft ethical commercialization roadmaps.",
    dailyResponsibilities: [
      "Interview researchers, clinicians, and customers to match new discoveries with real pain points",
      "Map competitive trends across robotics, biotech, clean tech, and regulation",
      "Design small pilot tests and innovation workshops that prove value cheaply",
      "Prepare clear strategic recommendations for founders, R&D leads, and boards"
    ],
    education: "Business Strategy, Design Strategy, Science/Engineering Management, or interdisciplinary degrees.",
    technicalSkills: ["Horizon & Trend Scanning", "Design Thinking Facilitation", "Pilot Experiment Design", "R&D Portfolio Prioritization", "Executive Storytelling"],
    softSkills: ["Connecting Disconnected Dots", "Translator Across Scientists & Business", "Executive Clarity", "Curiosity"],
    tools: ["Notion / Miro", "Pitch Decks & Briefs", "Patent & Scholar Search", "Airtable", "Figma FigJam"],
    growthOpportunities: "High-agency roles in corporate R&D labs, university technology-transfer offices, climate/deep-tech venture studios, and innovation consultancies.",
    learningResources: [
      "IDEO U Design Thinking & Strategy Guides",
      "Strategyzer Business Model Canvas & Value Proposition Guides (Free PDFs)",
      "MIT Technology Review Free Breakthrough Lists"
    ],
    beginnerProject: "Pick one recent university invention (like algae bio-leather or solid-state batteries) and fill out a 1-page Strategyzer Value Proposition Canvas showing who needs it first.",
    howToGetStarted: [
      "Read Strategyzer's free 1-page Value Proposition Canvas guide to learn how good innovations map directly to customer pains.",
      "Browse MIT Technology Review's 10 Breakthrough Technologies and pick 1 you think is overhyped vs. 1 that is undervalued.",
      "Draft a 5-slide innovation pitch showing how a local campus service could run a 2-week low-cost experiment."
    ],
    relatedCareers: ["product-manager", "startup-founder", "user-researcher"]
  }
];
