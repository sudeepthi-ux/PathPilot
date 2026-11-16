// Career Exploration Lab: 10 Categories with 32+ Interactive Simulation Experiments

export const experimentCategories = [
  {
    id: "creative-thinking",
    name: "Creative Thinking",
    icon: "Lightbulb",
    tagline: "Lateral thinking, original concepts & transforming flaws into features"
  },
  {
    id: "technology-coding",
    name: "Technology & Coding",
    icon: "Cpu",
    tagline: "Software architecture, AI systems, cloud scalability & cybersecurity"
  },
  {
    id: "business-entrepreneurship",
    name: "Business & Entrepreneurship",
    icon: "Briefcase",
    tagline: "Idea validation, product roadmaps, capital allocation & startup growth"
  },
  {
    id: "science-research",
    name: "Science & Research",
    icon: "Atom",
    tagline: "Biomedical inquiry, genetic analysis, laboratory testing & climate audits"
  },
  {
    id: "psychology-human-behaviour",
    name: "Psychology & Human Behaviour",
    icon: "Brain",
    tagline: "User motivation, behavioral nudges, emotional friction & group dynamics"
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    icon: "Palette",
    tagline: "Information architecture, design systems, visual craft & accessibility"
  },
  {
    id: "problem-solving",
    name: "Real-World Problem Solving",
    icon: "Compass",
    tagline: "Operations bottlenecks, circular resource loops & supply chain agility"
  },
  {
    id: "communication-leadership",
    name: "Communication & Leadership",
    icon: "MessageSquare",
    tagline: "Crisis communications, public policy debates & science storytelling"
  },
  {
    id: "data-analytics",
    name: "Data & Analytics",
    icon: "TrendingUp",
    tagline: "Predictive signals, spatial heatmaps & financial stress-testing"
  },
  {
    id: "social-impact",
    name: "Social Impact",
    icon: "Globe",
    tagline: "Clean energy transitions, food redistribution & civil rights equity"
  }
];

export const careerExperiments = [
  // ==========================================
  // CATEGORY 1: CREATIVE THINKING
  // ==========================================
  {
    id: "creative-redesign-challenge",
    categoryId: "creative-thinking",
    categoryName: "Creative Thinking",
    careerId: "creative-technologist",
    title: "Creative Technologist: The Invisible Transit Pass",
    roleName: "Creative Technologist",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Re-imagine a slow plastic campus transit pass into an invisible, tap-free student experience",
    objective: "Practice lateral thinking by stripping away physical hardware constraints and designing an ambient interaction.",
    instructions: "Evaluate user frustrations at the turnstile, brainstorm beyond traditional screens, and craft a frictionless sensory experience.",
    expectedOutcome: "Understand how creative technologists blend physical sensors, mobile hardware, and human habits to create invisible software.",
    overview: "Every morning, 3,000 students bottleneck at the campus subway turnstile. Students dig frantically through backpacks for lost plastic cards, dropping coffees and missing class. You are asked to re-invent the entrance experience.",
    skillsGained: ["Lateral Thinking", "Ambient Computing", "Sensory Interaction", "Rapid Prototyping"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Challenge the Baseline Assumption",
        context: "The administration suggests buying 20 faster barcode scanners so students can scan their phone screens instead of plastic.",
        question: "What is the core flaw with adding phone barcode scanners?",
        options: [
          {
            id: "a",
            title: "It still forces students to pull out a phone, unlock it, and aim at a glass scanner",
            explanation: "True creative thinkers look beyond the tool to the underlying human friction.",
            feedbackType: "success",
            feedback: "Spot on! Shifting from plastic to a phone screen still requires conscious physical effort. On a freezing morning with gloves, it is just as slow."
          },
          {
            id: "b",
            title: "Barcode scanners look too modern for historic campus brick gates",
            explanation: "Aesthetics matter, but human throughput and accessibility are the root problems.",
            feedbackType: "partial",
            feedback: "Visuals are important, but students care first and foremost about getting to class on time."
          },
          {
            id: "c",
            title: "Barcodes cannot be read in daylight",
            explanation: "Modern scanners read screens easily; the bottleneck is human coordination.",
            feedbackType: "warning",
            feedback: "The scanners work fine technically, but students still have to stop walking to align their phones."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Prototype an Invisible Interaction",
        context: "You want students to walk through the gates at a normal walking stride without breaking stride.",
        question: "What ambient technology pattern provides secure, hands-free authentication?",
        options: [
          {
            id: "a",
            title: "Ultra-Wideband (UWB) beacon sensing: Gates open automatically when the student's authenticated phone is in their pocket",
            explanation: "Ultra-Wideband allows precise spatial ranging, validating credentials as the student approaches within 1 meter.",
            feedbackType: "success",
            feedback: "Brilliant! The gate senses approaching students, verifies their active token via Bluetooth/UWB, and glides open without a single touch!"
          },
          {
            id: "b",
            title: "Facial recognition cameras scanning everyone in crowd lines",
            explanation: "Facial recognition in public spaces introduces severe privacy concerns and struggles in poor lighting.",
            feedbackType: "warning",
            feedback: "Students immediately protested surveillance concerns, and hats or masks caused high false-rejection rates."
          },
          {
            id: "c",
            title: "Fingerprint scanner pads mounted on turnstiles",
            explanation: "Fingerprint pads create physical hygiene concerns and still force every student to stop walking.",
            feedbackType: "partial",
            feedback: "Lines backed up worse on rainy mornings as damp fingers failed to register."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Provide Subtle Sensory Reassurance",
        context: "Because the gates open automatically without tapping, students sometimes feel anxious whether their ride actually counted or if an alarm will buzz.",
        question: "How do you give students instant peace of mind?",
        options: [
          {
            id: "a",
            title: "A gentle pleasant haptic vibration on their phone paired with a warm soft green floor glow",
            explanation: "Multi-sensory ambient feedback confirms success without demanding visual focus.",
            feedbackType: "success",
            feedback: "Perfection! Students feel a soft pulse in their pocket and see a welcoming green rim light as they step through. Throughput surged by 400%!"
          },
          {
            id: "b",
            title: "A loud automated speaker shouting 'STUDENT AUTHORIZED: WELCOME ELENA'",
            explanation: "Loud public audio creates embarrassment and sensory chaos in crowded stations.",
            feedbackType: "warning",
            feedback: "Students found the public announcement mortifying and headphones drowned it out anyway."
          }
        ]
      }
    ],
    takeaway: "You just practiced ambient product innovation: questioning default assumptions, replacing physical friction with proximity sensing, and crafting calm sensory feedback."
  },
  {
    id: "creative-metaphor-challenge",
    categoryId: "creative-thinking",
    categoryName: "Creative Thinking",
    careerId: "graphic-designer",
    title: "Brand Designer: The Technical Metaphor",
    roleName: "Brand & Visual Designer",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Translate zero-knowledge cryptography into a visual brand metaphor anyone understands",
    objective: "Master visual communication by bridging complex abstract technology with intuitive everyday metaphors.",
    instructions: "Evaluate user mental models, reject intimidating jargon, and design an iconic visual system.",
    expectedOutcome: "Understand how brand designers create visual identity systems that build user trust in cutting-edge products.",
    overview: "A student team built a private study app using zero-knowledge encryption so even server admins cannot read student diaries or exam answers. The engineering team wants to show mathematical equations on the landing page, but prospective users are confused.",
    skillsGained: ["Visual Metaphor Design", "Mental Model Mapping", "Visual Hierarchy", "Design Storytelling"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Diagnose the Communication Gap",
        context: "The original website features an image of a padlock over lines of green binary code matrix text.",
        question: "Why does this visual fail to communicate privacy to ordinary college students?",
        options: [
          {
            id: "a",
            title: "It looks like an intimidating hacker movie and fails to explain what actually happens to their notes",
            explanation: "Generic cyber imagery triggers fear and confusion rather than trust.",
            feedbackType: "success",
            feedback: "Exactly right! Testing revealed students thought the app was a virus scanner or an advanced cybersecurity tool for computer science majors only."
          },
          {
            id: "b",
            title: "Green is not a trending color in modern web design",
            explanation: "Color trends are superficial; the deeper problem is an unhelpful mental model.",
            feedbackType: "partial",
            feedback: "Color is part of it, but changing green to purple still leaves the meaning unclear."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Craft the Everyday Metaphor",
        context: "You need a physical metaphor that explains: 'You can deposit your thoughts into a private safety deposit box, and only your key can open it.'",
        question: "Which visual concept makes the concept instantly clear?",
        options: [
          {
            id: "a",
            title: "An opaque sealed envelope that only turns transparent when unlocked with the user's personal touch",
            explanation: "Physical mail envelopes are universally understood symbols of private, unread personal correspondence.",
            feedbackType: "success",
            feedback: "Brilliant visual intuition! When users see a sealed postal envelope that only renders clear in their hands, they instantly grasp that nobody in transit can peek inside."
          },
          {
            id: "b",
            title: "A 3D diagram of public-private elliptic curve keys multiplying numbers",
            explanation: "Accurate math diagrams alienate non-technical students.",
            feedbackType: "warning",
            feedback: "Students glazed over within 2 seconds. You don't need to explain the engine to teach someone how to drive."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Land the Clean Headline",
        context: "The engineers propose: 'End-to-End Zero Knowledge Cryptographic Handshake Protocol.'",
        question: "How do you translate this into student-friendly headline copy?",
        options: [
          {
            id: "a",
            title: "'Your private thoughts stay yours. Not even our servers can read them.'",
            explanation: "Direct, plainspoken, and establishes complete emotional transparency.",
            feedbackType: "success",
            feedback: "Heroic copy! Sign-up conversions doubled because students immediately understood the promise and felt safe."
          },
          {
            id: "b",
            title: "'Military-Grade 256-Bit Fortress Security System'",
            explanation: "Buzzwords like 'military grade' sound like generic corporate marketing spin.",
            feedbackType: "partial",
            feedback: "Students found it overly dramatic for a personal study notes app."
          }
        ]
      }
    ],
    takeaway: "You practiced real brand design: translating complex math into relatable visual metaphors, eliminating cyber clichés, and speaking with clarity."
  },
  {
    id: "creative-pitch-challenge",
    categoryId: "creative-thinking",
    categoryName: "Creative Thinking",
    careerId: "entrepreneur",
    title: "Product Strategist: Turning a Flaw into a Feature",
    roleName: "Product Strategist",
    timeEstimate: "4 mins",
    difficulty: "Intermediate",
    tagline: "Reframe a digital limitation into an irresistible focus benefit for distracted students",
    objective: "Learn product positioning and reframing by turning an apparent technical limitation into a core selling point.",
    instructions: "Analyze student distraction, evaluate feature trade-offs, and craft a distinct brand proposition.",
    expectedOutcome: "Learn how iconic products (like reMarkable or Basecamp) turn constraints into beloved differentiators.",
    overview: "Your team is building a digital writing app for students. Competitors have endless plugins, fonts, colors, AI auto-completers, and chat notifications. Your app has zero plugins, one font, black and white text, and no internet access while writing.",
    skillsGained: ["Product Positioning", "Value Proposition Reframing", "Strategic Focus", "Customer Psychology"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Identify the Hidden Pain of Modern Tools",
        context: "An investor asks: 'How can you compete with tools that have 1,000 features when you only have 3?'",
        question: "What is the strategic insight behind radical simplicity?",
        options: [
          {
            id: "a",
            title: "Students are exhausted by feature overload; constant tool options distract them from actual writing",
            explanation: "Excessive configuration leads to decision fatigue and procrastination.",
            feedbackType: "success",
            feedback: "Spot on! Research shows students spend 40% of their writing time tweaking fonts, organizing tags, and playing with settings rather than drafting essays."
          },
          {
            id: "b",
            title: "We didn't have enough time to code the other features",
            explanation: "Never apologize for deliberate product minimalism.",
            feedbackType: "warning",
            feedback: "Investors lost confidence because you framed simplicity as an accident rather than an intentional strength."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Choose the Positioning Stance",
        context: "How do you position the app in the student market against giant competitors?",
        question: "What brand tagline turns the limitation into an irresistible advantage?",
        options: [
          {
            id: "a",
            title: "'The distraction-free sanctuary. No notifications. No formatting rabbit holes. Just your words.'",
            explanation: "Positions the lack of features as an intentional sanctuary for deep focus.",
            feedbackType: "success",
            feedback: "Incredible positioning! Students who struggle with ADHD and deadline panic immediately recognized this as the antidote to overwhelming workspaces."
          },
          {
            id: "b",
            title: "'A cheaper, stripped-down alternative to big writing software.'",
            explanation: "Positioning on price and inferiority devalues your craft.",
            feedbackType: "warning",
            feedback: "Positioning as a 'cheaper downgrade' made students perceive the product as obsolete."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Design the Core Focus Ritual",
        context: "To reinforce the product philosophy, you want to design one signature interactive ritual inside the app.",
        question: "What signature interaction celebrates deep focus?",
        options: [
          {
            id: "a",
            title: "Full-Screen Zen Mode: When you start typing, all interface bars fade to pure warm white, leaving only your sentences",
            explanation: "Atmospheric, serene interaction that honors the user's concentration.",
            feedbackType: "success",
            feedback: "Pure elegance! Students described writing in the app as 'taking a deep breath after being in a loud cafeteria.'"
          },
          {
            id: "b",
            title: "A loud alarm that buzzes if you stop typing for 30 seconds",
            explanation: "High stress and punitive mechanics destroy creative flow.",
            feedbackType: "warning",
            feedback: "Students reported high anxiety and closed the app in frustration."
          }
        ]
      }
    ],
    takeaway: "You practiced strategic product positioning: embracing constraints, identifying user fatigue, and designing focus rituals that make simplicity a superpower."
  },

  // ==========================================
  // CATEGORY 2: TECHNOLOGY & CODING
  // ==========================================
  {
    id: "software-engineering-experiment",
    categoryId: "technology-coding",
    categoryName: "Technology & Coding",
    careerId: "software-engineer",
    title: "Software Engineer: The Course Registration Crash",
    roleName: "Software Engineer",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Diagnose why a high-traffic student enrollment app is freezing and fix the bottleneck",
    objective: "Learn systems debugging, database caching, and load resilience under high concurrent traffic.",
    instructions: "Inspect server telemetry, identify quadratic disk reads, and implement in-memory caching.",
    expectedOutcome: "Understand how backend software engineers keep high-scale digital platforms fast and reliable.",
    overview: "It is 8:00 AM on course enrollment morning. 5,000 students hit the 'Register for Classes' button simultaneously. The server starts timing out with Error 504. The engineering team is scrambling. You are the on-call engineer.",
    skillsGained: ["Root-Cause Analysis", "Database Optimization", "Server Caching", "Systems Thinking"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Diagnose the Bottleneck",
        context: "The site is spinning. Some teammates want to restart the machines, but you know you need to find the root bottleneck first.",
        question: "Where do you look first to locate the failure?",
        options: [
          {
            id: "a",
            title: "Inspect server telemetry to see if CPU, memory, or database queries are saturated",
            explanation: "Observability and metrics reveal the exact bottleneck instead of guessing.",
            feedbackType: "success",
            feedback: "Spot on! Your server dashboard reveals that CPU is at only 15%, but the database is overwhelmed: one single query is running 5,000 times a second!"
          },
          {
            id: "b",
            title: "Restart all the servers simultaneously",
            explanation: "Restarting without fixing the underlying bug causes the exact same crash 10 seconds later.",
            feedbackType: "warning",
            feedback: "The servers restarted, but the moment 5,000 students refreshed their browsers, they immediately crashed again."
          },
          {
            id: "c",
            title: "Blame the student internet connections",
            explanation: "A 504 Gateway Timeout is a server-side failure, not a user connection problem.",
            feedbackType: "warning",
            feedback: "The students are fine — your database is the one gasping for air."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Fix the Database Bottleneck",
        context: "You discovered the culprit: Every time a student searches for 'Biology 101', the server recalculates the available seats by scanning 50,000 student enrollment records from disk.",
        question: "What is the fastest and most elegant engineering fix?",
        options: [
          {
            id: "a",
            title: "Add in-memory caching (Redis) so seat counts are read from fast RAM for 15 seconds",
            explanation: "Caching stores frequent results in super-fast RAM, dropping database load by up to 99%.",
            feedbackType: "success",
            feedback: "Boom! Instead of scanning 50,000 database rows on every click, the server returns the cached number in 2 milliseconds. Server response times drop from 12 seconds to 15 milliseconds!"
          },
          {
            id: "b",
            title: "Pay $5,000 to double the size of the database server immediately",
            explanation: "Throwing expensive hardware at unoptimized code is costly and quickly hits another ceiling.",
            feedbackType: "partial",
            feedback: "The bigger server bought you 2 minutes of relief, but quickly bogged down under the quadratic disk reads."
          },
          {
            id: "c",
            title: "Limit students to 1 search every 10 minutes",
            explanation: "Artificially degrading the user experience to hide bad code frustrates users.",
            feedbackType: "warning",
            feedback: "Students are furious and venting on social media because their classes are filling up."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Prevent Future Failures",
        context: "The crash is resolved and all students registered smoothly. Now, how do you ensure this never happens again next semester?",
        question: "What engineering practice should you implement?",
        options: [
          {
            id: "a",
            title: "Write automated load tests simulating 10,000 concurrent users before every semester",
            explanation: "Stress-testing your systems before traffic arrives guarantees resilience.",
            feedbackType: "success",
            feedback: "Outstanding engineering maturity! Automated load tests will catch slow queries weeks in advance during normal development."
          },
          {
            id: "b",
            title: "Set an alarm for 7:55 AM next semester and hope for the best",
            explanation: "Hope is not an engineering strategy.",
            feedbackType: "warning",
            feedback: "You'll be waking up in cold sweats every semester morning."
          }
        ]
      }
    ],
    takeaway: "You just solved a classic distributed systems problem: diagnosing root causes with telemetry, implementing smart in-memory caching, and building automated load resilience. This is the heart of backend engineering."
  },
  {
    id: "ai-engineer-experiment",
    categoryId: "technology-coding",
    categoryName: "Technology & Coding",
    careerId: "ai-engineer",
    title: "AI Specialist: The Campus Study Buddy Bot",
    roleName: "AI & Machine Learning Specialist",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Ground a student AI assistant in verified course notes so it never hallucinates fake exam dates",
    objective: "Master applied AI engineering: grounding language models with RAG and enforcing academic citations.",
    instructions: "Evaluate model hallucinations, attach verified lecture knowledge, and optimize response latency.",
    expectedOutcome: "Understand how modern AI engineers build reliable, grounded conversational tools students can trust.",
    overview: "You are tasked with building an AI study helper for 4,000 chemistry and history students. In early testing, the bot fabricated a fake exam date and made up a non-existent scientific equation. Your job is to make it reliable, accurate, and fast.",
    skillsGained: ["Grounding & Retrieval (RAG)", "Hallucination Prevention", "Model Evaluation", "Ethical AI Design"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Ground the Model in Verified Knowledge",
        context: "The bot is hallucinating incorrect lecture information when answering student questions.",
        question: "How do you ensure the model only provides verified course facts?",
        options: [
          {
            id: "a",
            title: "Connect a Retrieval-Augmented Generation (RAG) pipeline to the verified professor lecture slides and textbook",
            explanation: "Grounding the AI in specific, trusted documents ensures responses cite real curriculum facts.",
            feedbackType: "success",
            feedback: "Phenomenal! Now, whenever a student asks a question, the system searches the verified lecture slides first and passes the exact snippet to the AI as context."
          },
          {
            id: "b",
            title: "Train a giant new language model from scratch on all unfiltered internet text",
            explanation: "Training from scratch is extremely expensive ($100k+) and amplifies unverified internet errors.",
            feedbackType: "warning",
            feedback: "It took 3 months and $80,000, yet the model still makes up fake history dates from random blog posts."
          },
          {
            id: "c",
            title: "Simply ask the AI in the prompt: 'Please never lie or make things up'",
            explanation: "Polite prompt requests without document grounding cannot prevent probabilistic hallucinations.",
            feedbackType: "partial",
            feedback: "The bot was polite, but still invented a nonexistent chemistry formula with high confidence."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Add Guardrails & Citation Badges",
        context: "The AI now retrieves correct lecture slides, but students want to verify where each answer comes from before taking an exam.",
        question: "What interface guardrail should you build?",
        options: [
          {
            id: "a",
            title: "Require the AI to cite the exact slide number and page reference for every statement, with a fallback 'I don't know' when unsure",
            explanation: "Strict citation requirements and honest uncertainty thresholds eliminate dangerous exam misinformation.",
            feedbackType: "success",
            feedback: "Flawless! Students can tap on 'Slide 14, Lecture 3' to see the original slide. Student trust rose to 98%."
          },
          {
            id: "b",
            title: "Let the AI guess whenever it doesn't find an answer in the slides",
            explanation: "Guessing on academic coursework causes students to fail exams.",
            feedbackType: "warning",
            feedback: "A student memorized a fabricated historical treaty name that the bot guessed, costing them marks on their midterm."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Balance Latency and Student Experience",
        context: "Students say waiting 12 seconds for an answer on their phones is too slow during quick study breaks.",
        question: "How do you reduce the response time from 12 seconds to under 1 second?",
        options: [
          {
            id: "a",
            title: "Switch to a lightweight, optimized model (like Gemini Flash) and stream response tokens as they generate",
            explanation: "Compact models and token streaming deliver instant feedback while maintaining high accuracy.",
            feedbackType: "success",
            feedback: "Perfection! The first words appear on the student's phone in 250 milliseconds, making the study buddy feel instantaneous and fluid!"
          },
          {
            id: "b",
            title: "Delete half the course notes to make the files smaller",
            explanation: "Removing knowledge cripples the bot's ability to help with exams.",
            feedbackType: "warning",
            feedback: "The bot was fast, but couldn't answer questions on the second half of the semester."
          }
        ]
      }
    ],
    takeaway: "You practiced modern applied AI engineering: grounding models in verified documents with RAG, enforcing citations and guardrails, and optimizing latency for real human learners."
  },
  {
    id: "cybersecurity-defense-experiment",
    categoryId: "technology-coding",
    categoryName: "Technology & Coding",
    careerId: "cybersecurity-analyst",
    title: "Cybersecurity Analyst: The Credential Phish Defense",
    roleName: "Cybersecurity Analyst",
    timeEstimate: "5 mins",
    difficulty: "Beginner Friendly",
    tagline: "Spot a spear-phishing attack targeting campus club leaders and harden student authentication",
    objective: "Learn threat detection, defense-in-depth principles, and two-factor credential protection.",
    instructions: "Analyze suspicious email headers, identify spoofed domains, and implement modern FIDO2 protections.",
    expectedOutcome: "Understand how cybersecurity analysts defend critical student data from real-world attacks.",
    overview: "Over 40 campus student organizations received an urgent email: 'URGENT: Your university budget is suspended. Re-verify your student credentials within 2 hours.' The email leads to a login screen that looks identical to the official portal. You are the security analyst on duty.",
    skillsGained: ["Threat Detection", "Domain Verification", "Multi-Factor Authentication", "Incident Response"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Inspect the Suspicious Link",
        context: "You examine the raw headers of the email before taking action.",
        question: "Which indicator confirms this is a deceptive phishing link?",
        options: [
          {
            id: "a",
            title: "The URL is 'portal.berkeley-verify.net' instead of the authentic university domain 'auth.berkeley.edu'",
            explanation: "Lookalike domains are the number one sign of credential harvesting phishing pages.",
            feedbackType: "success",
            feedback: "Spot on! The attacker registered a deceptive third-party domain to trick busy students into typing passwords."
          },
          {
            id: "b",
            title: "The email was sent on a Friday afternoon",
            explanation: "Timing is suspicious, but domain verification provides concrete technical proof.",
            feedbackType: "partial",
            feedback: "Friday emails are common for attacks, but checking the cryptographic domain signature gives undeniable evidence."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Neutralize the Active Attack",
        context: "12 students already typed their passwords into the attacker's page.",
        question: "What is your immediate containment response?",
        options: [
          {
            id: "a",
            title: "Force-terminate active sessions for the 12 compromised accounts, trigger password resets, and block the fake domain on campus firewalls",
            explanation: "Immediate credential invalidation prevents unauthorized account takeovers.",
            feedbackType: "success",
            feedback: "Flawless incident response! The compromised sessions were severed in under 3 minutes before the attacker could access financial disbursement systems."
          },
          {
            id: "b",
            title: "Send a polite email to the attacker asking them to delete the stolen passwords",
            explanation: "Cybercriminals will not comply with polite requests.",
            feedbackType: "warning",
            feedback: "The attacker laughed and attempted to drain student club budgets."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Implement Phishing-Resistant 2FA",
        context: "Traditional SMS text codes can be intercepted. How do you permanently protect all student accounts?",
        question: "What authentication mechanism is mathematically immune to phishing sites?",
        options: [
          {
            id: "a",
            title: "Passkeys / FIDO2 security keys that cryptographically bind credentials to the real URL",
            explanation: "FIDO2 / WebAuthn validates the exact browser domain, preventing credentials from being submitted to fake sites.",
            feedbackType: "success",
            feedback: "Gold standard security! Even if a student clicks a fake link, the browser refuses to send the passkey to the wrong domain."
          },
          {
            id: "b",
            title: "Require passwords to be 40 characters long with 5 special symbols",
            explanation: "Excessive password complexity leads users to write them on sticky notes, lowering actual security.",
            feedbackType: "warning",
            feedback: "Students wrote passwords on sticky notes, and phishing sites still captured them effortlessly."
          }
        ]
      }
    ],
    takeaway: "You practiced real threat analysis: identifying spoofed domains, executing swift containment, and implementing modern phishing-resistant passkeys."
  },

  // ==========================================
  // CATEGORY 3: BUSINESS & ENTREPRENEURSHIP
  // ==========================================
  {
    id: "campus-coffee-startup-experiment",
    categoryId: "business-entrepreneurship",
    categoryName: "Business & Entrepreneurship",
    careerId: "entrepreneur",
    title: "Startup Founder: The Campus Morning Rush Cart",
    roleName: "Entrepreneur & Startup Founder",
    timeEstimate: "5 mins",
    difficulty: "Beginner Friendly",
    tagline: "Validate a high-speed morning coffee pop-up for students with real unit economics",
    objective: "Learn lean startup validation: customer interviews, unit economics, and rapid hypothesis testing.",
    instructions: "Interview morning commuters, calculate gross margins per cup, and launch a lean prototype.",
    expectedOutcome: "Understand how entrepreneurs validate demand and unit economics before investing significant capital.",
    overview: "Between 8:40 AM and 9:00 AM, 1,500 students exit the campus transit station and rush to lectures. The nearest coffee shop has a 20-minute line, causing students to be late. You want to launch an ultra-fast, pre-ordered cold brew pop-up cart.",
    skillsGained: ["Customer Validation", "Unit Economics", "Lean Prototyping", "Risk Mitigation"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Test Customer Willingness to Pay",
        context: "Before spending $8,000 on an espresso machine and permits, you want to test if students will actually buy from your cart.",
        question: "How do you test real demand with zero financial risk?",
        options: [
          {
            id: "a",
            title: "Set up a folding table with a cooler of 30 bottled cold brews and a mobile QR code payments poster for 3 mornings",
            explanation: "Selling real products in the wild proves actual purchasing behavior faster than hypothetical surveys.",
            feedbackType: "success",
            feedback: "Phenomenal lean validation! All 30 bottles sold out in 11 minutes. You proved students will gladly tap and pay $4 for zero-wait coffee."
          },
          {
            id: "b",
            title: "Write a 40-page theoretical business plan with projected revenue for the next 5 years",
            explanation: "Spreadsheet predictions without real customer purchases are purely imaginary.",
            feedbackType: "warning",
            feedback: "You spent 3 weeks formatting financial graphs, but still don't know if a single student wants your coffee."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Calculate Your Unit Economics",
        context: "Each cup sells for $4.50. High-quality roasted beans, compostable cup/lid, and organic milk cost $1.10. Campus cart permit and ice cost $0.60 per cup.",
        question: "What is your gross profit per cup, and is it a sustainable margin?",
        options: [
          {
            id: "a",
            title: "$2.80 gross profit per cup (62% margin) — Strong unit economics for a food/beverage venture",
            explanation: "Healthy margins allow you to pay student baristas fairly and absorb seasonal dips.",
            feedbackType: "success",
            feedback: "Spot on! Selling 150 cups an hour during the morning rush generates $420 in hourly gross margin, easily covering student staff wages."
          },
          {
            id: "b",
            title: "$0.50 profit per cup — Sell at cost to be cheap",
            explanation: "Razor-thin margins leave zero room for unexpected costs like permit fees or spilled milk.",
            feedbackType: "warning",
            feedback: "One rainy morning wiped out your entire week's savings because margins were too thin."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Solve the Pick-Up Bottleneck",
        context: "Students say: 'Even a 3-minute wait makes me late for organic chemistry.' How do you guarantee sub-30-second turnaround?",
        question: "What operational model delivers instantaneous morning handoffs?",
        options: [
          {
            id: "a",
            title: "Pre-order on mobile: Students order on the train, and their personalized cup is sitting in an iced pickup cubby waiting for grab-and-go",
            explanation: "Decoupling payment from pickup eliminates queue wait times completely.",
            feedbackType: "success",
            feedback: "Flawless operational design! Students grab their named cup in 4 seconds. Daily volume surged to 280 cups every morning!"
          },
          {
            id: "b",
            title: "Accepting cash only and making change by hand",
            explanation: "Cash handling creates severe delays and accounting errors.",
            feedbackType: "warning",
            feedback: "Lines backed up 20 people deep, and students abandoned orders."
          }
        ]
      }
    ],
    takeaway: "You practiced core entrepreneurship: rapid demand testing, healthy unit economics modeling, and removing queue friction to scale a thriving venture."
  },
  {
    id: "product-prioritization-experiment",
    categoryId: "business-entrepreneurship",
    categoryName: "Business & Entrepreneurship",
    careerId: "product-manager",
    title: "Product Manager: The Feature Roadmap Standoff",
    roleName: "Associate Product Manager",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Decide which 2 features to build out of 10 student requests with only 3 weeks before launch",
    objective: "Master feature prioritization frameworks (RICE), stakeholder alignment, and delivery scope control.",
    instructions: "Evaluate competing demands from students, professors, and engineers, and pick the highest-impact roadmap.",
    expectedOutcome: "Understand how product managers balance reach, impact, and engineering effort to ship great products.",
    overview: "You are the product manager for PathPilot's student mobile app. With 3 weeks until the fall semester, your engineering team only has capacity for 2 features. The university wants grade syncing, professors want attendance check-ins, and students want dark mode and roommate matching.",
    skillsGained: ["RICE Prioritization", "Stakeholder Trade-offs", "Scope Management", "Data-Driven Decisions"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Apply the RICE Framework",
        context: "You need an objective framework to score features by Reach, Impact, Confidence, and Effort.",
        question: "Which feature has the highest RICE score for launch week?",
        options: [
          {
            id: "a",
            title: "'Today's Next Class Widget' (High Reach: 100% of students daily, Low Effort: 1 week to build)",
            explanation: "High-reach, low-effort features deliver immediate daily utility to all users.",
            feedbackType: "success",
            feedback: "Spot on! The widget will be used by 10,000 students 4 times a day, building massive daily retention."
          },
          {
            id: "b",
            title: "'Campus VR Campus Tour' (Low Reach: 2% of users, Huge Effort: 6 months)",
            explanation: "Flashy novelty features consume all resources while helping very few active students.",
            feedbackType: "warning",
            feedback: "The VR tour took weeks, but only 14 students ever opened it on their phones."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Handle Conflicting Stakeholder Pressure",
        context: "An influential dean demands that you build an intricate professor attendance tracking button instead.",
        question: "How does an effective product manager respond?",
        options: [
          {
            id: "a",
            title: "Show user data demonstrating that fast class navigation solves 90% of first-week tardiness, and schedule attendance for Phase 2",
            explanation: "Data-backed trade-offs help leaders see the shared student benefit without hostility.",
            feedbackType: "success",
            feedback: "Masterful diplomacy! The dean agreed that getting students to class on time is prerequisite to tracking attendance."
          },
          {
            id: "b",
            title: "Quietly promise everyone everything and force engineers to work 90-hour weeks",
            explanation: "Overpromising causes team burnout, buggy code, and missed deadlines.",
            feedbackType: "warning",
            feedback: "Two senior engineers quit in exhaustion, and the app missed the launch date entirely."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Define the Launch Success Metric",
        context: "The features are built. How do you measure whether this launch was genuinely successful?",
        question: "What metric truly reflects product health?",
        options: [
          {
            id: "a",
            title: "Day-7 Daily Active Retention: Did students continue opening the widget after the first week?",
            explanation: "Retention proves genuine utility, whereas downloads only measure marketing buzz.",
            feedbackType: "success",
            feedback: "Flawless metric selection! 88% of students continued using the widget daily throughout the semester."
          },
          {
            id: "b",
            title: "Total number of app downloads on day one",
            explanation: "Downloads are a vanity metric if users delete the app the next day.",
            feedbackType: "partial",
            feedback: "Downloads looked great on day one, but gave no insight into whether students actually found it helpful."
          }
        ]
      }
    ],
    takeaway: "You practiced modern product management: scoring roadmaps with RICE, defending user priorities with data, and tracking long-term retention over vanity downloads."
  },

  // ==========================================
  // CATEGORY 4: SCIENCE & RESEARCH
  // ==========================================
  {
    id: "biomedical-research-experiment",
    categoryId: "science-research",
    categoryName: "Science & Research",
    careerId: "biomedical-scientist",
    title: "Biomedical Scientist: The Soil Antibiotic Screen",
    roleName: "Biomedical Research Scientist",
    timeEstimate: "5 mins",
    difficulty: "Beginner Friendly",
    tagline: "Isolate beneficial microbes from campus soil and test inhibition against resistant bacteria",
    objective: "Master scientific method design: hypothesis formulation, positive/negative controls, and zone-of-inhibition assay.",
    instructions: "Collect environmental soil samples, perform serial dilutions on agar, and measure antibacterial clearance.",
    expectedOutcome: "Understand how biomedical researchers discover novel therapeutics and isolate microbial compounds.",
    overview: "With global antibiotic resistance rising, researchers are hunting for novel soil actinomycetes producing natural antimicrobial compounds. In your campus lab, you collect damp soil beneath oak trees to screen against a safe model bacterial culture.",
    skillsGained: ["Experimental Design", "Controls & Variables", "Aseptic Technique", "Empirical Analysis"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Set Up Scientific Controls",
        context: "You plate your soil microbial extract on an agar plate inoculated with safe model bacteria.",
        question: "Why must you include both a positive control and a negative control on the plate?",
        options: [
          {
            id: "a",
            title: "To prove that bacteria can grow normally (negative control) and verify that our antibiotic test assay is functioning (positive control)",
            explanation: "Controls validate that experimental outcomes are caused by the variable, not random contamination.",
            feedbackType: "success",
            feedback: "Essential scientific rigor! Without controls, you couldn't tell if an empty plate meant you found a miracle antibiotic or if the bacteria simply failed to grow."
          },
          {
            id: "b",
            title: "To fill up empty space on the circular petri dish",
            explanation: "Controls are fundamental scientific validation, not aesthetic filler.",
            feedbackType: "warning",
            feedback: "Your paper was rejected for review because the experiment lacked rigorous control baselines."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Interpret the Zone of Inhibition",
        context: "After 48 hours of incubation at 37°C, you observe a clear circular halo around Soil Isolate #4 where no bacteria grew.",
        question: "What does this clear circular zone indicate?",
        options: [
          {
            id: "a",
            title: "Soil Isolate #4 is secreting a diffusible antimicrobial compound that inhibits bacterial cell wall synthesis",
            explanation: "A clear halo (zone of inhibition) shows active secretion of bacterial-inhibiting metabolites.",
            feedbackType: "success",
            feedback: "Bingo! You measured a 14mm clear zone. Isolate #4 is actively producing a compound that stops bacterial growth."
          },
          {
            id: "b",
            title: "The agar dried out in a perfect circle by accident",
            explanation: "Chemical diffusion creates concentric halos around active antibiotic-producing colonies.",
            feedbackType: "warning",
            feedback: "Physical drying does not create circular zones of clearance centered exactly on colonies."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Characterize the Active Molecule",
        context: "Now that you confirmed bioactivity, what is your next scientific step to identify the compound?",
        question: "Which analytical chemistry method separates and identifies the chemical structure?",
        options: [
          {
            id: "a",
            title: "Liquid Chromatography-Mass Spectrometry (LC-MS) to separate molecular fractions and identify molecular weight",
            explanation: "LC-MS separates complex chemical mixtures and measures molecular fingerprints.",
            feedbackType: "success",
            feedback: "Precision scientific workflow! LC-MS isolated a novel peptide with an exact mass fingerprint matching a rare class of lipopeptides!"
          },
          {
            id: "b",
            title: "Taste the petri dish to see if it tastes bitter",
            explanation: "Never ingest or expose laboratory specimens under any circumstances.",
            feedbackType: "warning",
            feedback: "Severe laboratory safety violation! Always use analytical instrumentation."
          }
        ]
      }
    ],
    takeaway: "You practiced authentic biomedical research: rigorous control design, interpreting zones of inhibition, and using analytical mass spectrometry to discover active drug leads."
  },
  {
    id: "computational-biology-experiment",
    categoryId: "science-research",
    categoryName: "Science & Research",
    careerId: "computational-biologist",
    title: "Computational Biologist: The Rare Mutation Hunt",
    roleName: "Computational Biologist",
    timeEstimate: "4 mins",
    difficulty: "Intermediate",
    tagline: "Parse 50,000 messy DNA sequencing reads to pinpoint a single nucleotide genetic variation",
    objective: "Learn bioinformatic sequence alignment, quality score filtering, and variant effect prediction.",
    instructions: "Filter noisy sequencing reads, align against the reference genome, and identify pathogenic mutations.",
    expectedOutcome: "Understand how computational biologists combine algorithms, genomics, and medicine to decode diseases.",
    overview: "A pediatric clinic has a child suffering from a mysterious metabolic enzyme deficiency. Whole-exome sequencing produced 2 gigabytes of raw DNA reads. The clinical team needs you to find the causative single nucleotide variant (SNV).",
    skillsGained: ["Genomic Data Analysis", "Quality Filtering", "Variant Calling", "Biological Algorithms"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Filter Low-Quality Sequencing Noise",
        context: "Raw sequencing files contain millions of short 150-base-pair reads. Some reads have low Phred quality scores.",
        question: "Why must you filter reads with Phred scores below Q30?",
        options: [
          {
            id: "a",
            title: "A Q30 score represents 99.9% base call accuracy; keeping noisy reads creates thousands of false mutations",
            explanation: "High quality thresholds ensure you don't chase sequencer optical errors.",
            feedbackType: "success",
            feedback: "Crucial bioinformatic practice! Filtering out low-quality reads eliminated 12,000 false sequencer glitches."
          },
          {
            id: "b",
            title: "To make the file small enough to open in Microsoft Word",
            explanation: "Genomic big data is processed via command-line pipelines and cloud clusters, not word processors.",
            feedbackType: "warning",
            feedback: "Word crashed instantly trying to open 2 gigabytes of genomic string data."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Align Against the Human Reference Genome",
        context: "You align the filtered reads against the GRCh38 human reference genome using Burrows-Wheeler Aligner (BWA).",
        question: "What signal indicates a real heterozygous point mutation?",
        options: [
          {
            id: "a",
            title: "Approximately 50% of overlapping reads show a Cytosine (C) and 50% show an Adenine (A) at chromosome 7, position 117,232,180",
            explanation: "A true heterozygous mutation is represented evenly across independent reads.",
            feedbackType: "success",
            feedback: "Exact genetic pinpoint! You found a C-to-A transversion in the CFTR chloride channel gene!"
          },
          {
            id: "b",
            title: "A single read has a letter Z in it",
            explanation: "DNA only consists of A, C, G, and T bases.",
            feedbackType: "warning",
            feedback: "There is no 'Z' in DNA; that was an unmapped character error."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Predict the Protein Structural Impact",
        context: "The C-to-A mutation changes codon 508 from Phenylalanine to a stop codon (nonsense mutation).",
        question: "What is the physiological consequence of this stop codon?",
        options: [
          {
            id: "a",
            title: "The ribosome stops translation prematurely, producing a truncated, non-functional enzyme",
            explanation: "Nonsense mutations truncate protein chains, causing complete loss of biochemical activity.",
            feedbackType: "success",
            feedback: "Clinical breakthrough! You identified the exact molecular cause of the enzyme deficiency, allowing doctors to begin targeted enzyme replacement therapy!"
          },
          {
            id: "b",
            title: "The protein becomes supercharged and works 10x faster",
            explanation: "Premature truncation almost always destroys enzymatic folding.",
            feedbackType: "warning",
            feedback: "A truncated protein cannot fold properly and is quickly degraded by cellular lysosomes."
          }
        ]
      }
    ],
    takeaway: "You practiced real computational biology: quality filtering Phred scores, aligning reads with BWA, and interpreting nonsense mutations to save patient lives."
  },

  // ==========================================
  // CATEGORY 5: PSYCHOLOGY & HUMAN BEHAVIOUR
  // ==========================================
  {
    id: "ux-research-experiment",
    categoryId: "psychology-human-behaviour",
    categoryName: "Psychology & Human Behaviour",
    careerId: "user-researcher",
    title: "Behavioral UX Researcher: The Student Drop-Off Mystery",
    roleName: "UX Researcher & Behavioral Scientist",
    timeEstimate: "3 mins",
    difficulty: "Beginner Friendly",
    tagline: "Uncover why students sign up for tutoring but leave before booking their first session",
    objective: "Practice qualitative interviewing, behavioral funnel diagnosis, and reducing emotional friction.",
    instructions: "Inspect onboarding drop-offs, conduct empathetic interviews, and design low-stakes micro-commitments.",
    expectedOutcome: "Understand how behavioral researchers use psychology to make digital products kinder and more effective.",
    overview: "A student peer-tutoring app had 1,200 signups in September, but only 35 students ever booked their first session. The team thought students didn't want tutoring, but you suspect there is hidden psychological friction.",
    skillsGained: ["Qualitative Interviewing", "Behavioral Friction Reduction", "Empathy", "User Psychology"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Map the Behavioral Funnel",
        context: "Where do students drop off? You check the app analytics screen-by-screen.",
        question: "What screen causes 80% of students to close the app?",
        options: [
          {
            id: "a",
            title: "Analyze where in the 5-step onboarding flow students exit",
            explanation: "Funnel analysis pinpoints the exact moment of hesitation.",
            feedbackType: "success",
            feedback: "You find the exact bottleneck: 80% exit on Screen 3, where the app asks: 'Please enter your phone number and credit card to lock in a 1-hour session.'"
          },
          {
            id: "b",
            title: "Redesign the app logo to look more exciting",
            explanation: "Logos rarely solve behavioral friction.",
            feedbackType: "warning",
            feedback: "The new logo looks cute, but students still abandon the app at the exact same screen."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Diagnose the Psychological Hesitation",
        context: "You sit down with 3 students who abandoned the screen and ask open-ended questions about what they felt.",
        question: "What did the students reveal?",
        options: [
          {
            id: "a",
            title: "Fear of awkwardness: Committing to 60 minutes with a stranger feels intimidating",
            explanation: "Listening deeply reveals emotional friction that numbers alone cannot show.",
            feedbackType: "success",
            feedback: "Exact insight! Students said: 'What if the tutor is mean or I feel dumb? Committing 60 minutes feels scary before knowing if we click.'"
          },
          {
            id: "b",
            title: "Students decided they are too smart to need tutoring",
            explanation: "Never assume students don't need help when friction is the culprit.",
            feedbackType: "warning",
            feedback: "The students desperately wanted help with calculus, but the high commitment barrier scared them away."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Test a Low-Friction Solution",
        context: "How do you lower the emotional and behavioral stakes for a first-time student?",
        question: "What feature change should you recommend?",
        options: [
          {
            id: "a",
            title: "Offer a free 5-minute video 'Say Hello' intro with no credit card required",
            explanation: "Micro-commitments eliminate fear of the unknown.",
            feedbackType: "success",
            feedback: "Phenomenal! First-session bookings skyrocketed by 340%. Once students said hello for 2 minutes, 90% happily booked full sessions!"
          },
          {
            id: "b",
            title: "Send 5 automated push notification reminders every hour",
            explanation: "Nagging users increases uninstalls.",
            feedbackType: "warning",
            feedback: "Students muted app notifications or deleted the app entirely."
          }
        ]
      }
    ],
    takeaway: "You practiced behavioral research: using analytics to find drop-offs, conducting empathetic interviews to uncover emotional fears, and designing low-friction nudges that solve real human hesitation."
  },
  {
    id: "behavioral-nudge-experiment",
    categoryId: "psychology-human-behaviour",
    categoryName: "Psychology & Human Behaviour",
    careerId: "user-researcher",
    title: "Behavioral Scientist: The Late-Night Cramming Intervention",
    roleName: "Cognitive & Behavioral Scientist",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Design environmental choice architecture that helps students stop cramming at 3 AM",
    objective: "Apply behavioral nudges, default effects, and habit cue-routine-reward loops to improve student wellbeing.",
    instructions: "Evaluate decision fatigue, design defaults that nudge healthy sleep, and test habit reinforcement.",
    expectedOutcome: "Understand how behavioral scientists nudge positive human decisions without forcing or restricting freedom.",
    overview: "Over 70% of first-year students report severe sleep deprivation during midterms week due to panic-cramming until 4 AM. Campus counseling services wants an intervention that actually shifts student bedtime habits rather than lecturing them with brochures.",
    skillsGained: ["Choice Architecture", "Default Effects", "Habit Loop Design", "Cognitive Nudging"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Understand Cognitive Depletion",
        context: "Why do informative leaflets ('Sleep 8 hours for better grades!') fail to change student behavior at night?",
        question: "What psychological state causes students to stay up past 2 AM despite knowing they should sleep?",
        options: [
          {
            id: "a",
            title: "Hyperbolic discounting & bedtime procrastination: Immediate anxiety feels urgent, while tomorrow's tiredness feels far away",
            explanation: "Human brains heavily discount future costs in favor of present emotional relief.",
            feedbackType: "success",
            feedback: "Spot on! In late hours, tired brains suffer decision fatigue and struggle with impulse control, falling into endless scrolling or frantic re-reading."
          },
          {
            id: "b",
            title: "Students simply cannot read leaflets",
            explanation: "Information alone rarely changes deeply ingrained human habits.",
            feedbackType: "warning",
            feedback: "Students read the flyers, but when 1 AM hits, panic overrides rational memory."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Implement Choice Architecture (Nudge)",
        context: "You partner with the campus library to modify the physical study environment at 11:30 PM.",
        question: "Which gentle environmental nudge triggers natural bedtime wind-down?",
        options: [
          {
            id: "a",
            title: "Gradually dim harsh overhead fluorescent lighting to warm amber tones and play soft acoustic music at 11:30 PM",
            explanation: "Warm lighting stimulates natural melatonin production and signals to the body that the day is concluding.",
            feedbackType: "success",
            feedback: "Brilliant environmental nudge! 64% of students naturally packed their backpacks and walked back to dorms without any guards or announcements!"
          },
          {
            id: "b",
            title: "Shut off the power completely with zero warning at midnight",
            explanation: "Abrupt cutoffs provoke anger and drive students to relocate to unsafe unlit stairwells.",
            feedbackType: "warning",
            feedback: "Students grew hostile, panicked about unsaved essays, and moved to hallway floors."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Build Spaced Study Rituals",
        context: "How do you help students replace the all-nighter panic with steady daytime study habits?",
        question: "What digital study tool feature reinforces the 'Spaced Repetition' effect?",
        options: [
          {
            id: "a",
            title: "A micro-session scheduler that automatically breaks exam prep into daily 25-minute study bites scheduled between daytime classes",
            explanation: "Pre-committing small daytime slots eliminates the cognitive dread of weekend cramming.",
            feedbackType: "success",
            feedback: "Outstanding outcome! Students retained 40% more course concepts and average student sleep increased by 1.8 hours per night!"
          },
          {
            id: "b",
            title: "A leaderboard showing who studied the most continuous hours without sleeping",
            explanation: "Toxic leaderboards glorify unhealthy exhaustion and encourage dangerous cramming.",
            feedbackType: "warning",
            feedback: "Students competed to stay awake for 48 hours, resulting in hospital visits."
          }
        ]
      }
    ],
    takeaway: "You practiced behavioral economics: recognizing hyperbolic discounting, implementing warm circadian lighting nudges, and structuring daytime micro-commitments."
  },

  // ==========================================
  // CATEGORY 6: UI/UX DESIGN
  // ==========================================
  {
    id: "product-design-experiment",
    categoryId: "ui-ux-design",
    categoryName: "UI/UX Design",
    careerId: "product-designer",
    title: "Product Designer: The Confusing Student Portal",
    roleName: "Product (UI/UX) Designer",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Simplify a cluttered campus app so students can find their schedules in 3 seconds",
    objective: "Apply user empathy, progressive disclosure, and clear micro-copy to declutter complex interfaces.",
    instructions: "Interview users, eliminate unnecessary links, and design an effortless mobile home view.",
    expectedOutcome: "Understand how product designers at companies like Apple and Figma turn confusing tools into clean experiences.",
    overview: "You are hired as a junior product designer by a university. The student portal has an 82% confusion rate: students are showing up to the wrong classrooms on day one because the home screen is an unreadable wall of 24 tiny blue links. Your mission is to redesign the experience.",
    skillsGained: ["User Empathy", "Information Architecture", "Progressive Disclosure", "Micro-copy Craft"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Understand the User Frustration",
        context: "The university provost wants you to start sketching screens right away. But as a human-centered designer, you know that designing without listening is dangerous.",
        question: "How do you uncover the real friction students are experiencing?",
        options: [
          {
            id: "a",
            title: "Interview 5 diverse students and watch them try to find their schedule",
            explanation: "Usability research shows watching just 5 real users uncovers 85% of core usability issues.",
            feedbackType: "success",
            feedback: "You sat with 5 students. In under 2 minutes, every single one squinted and clicked the wrong link 3 times. You discovered they only care about 2 things on mobile: today's class schedule and their student ID barcode."
          },
          {
            id: "b",
            title: "Send out a 50-question email survey to all 15,000 students",
            explanation: "Surveys tell you what people claim they do, but observational testing shows you what they actually struggle with.",
            feedbackType: "partial",
            feedback: "Only 1% of students opened the survey, and their responses were vague ('make it look better'). You still don't know the exact screen where they get lost."
          },
          {
            id: "c",
            title: "Trust your own intuition and pick colors that look modern",
            explanation: "Designing only for yourself leads to building things that others find confusing.",
            feedbackType: "warning",
            feedback: "You picked pretty colors, but students still can't find their room numbers. Good design is about how it works, not just how it looks."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Choose the Layout Pattern",
        context: "Your research proved students need immediate access to: 1) Today's Next Class, 2) Campus Map, and 3) Student ID. Everything else (billing, transcripts) is accessed rarely.",
        question: "How should you structure the mobile home screen?",
        options: [
          {
            id: "a",
            title: "Progressive Disclosure: Big 'Next Class' card at the top, essential tabs below",
            explanation: "Progressive disclosure shows what is critical right now, keeping secondary options one clean tap away.",
            feedbackType: "success",
            feedback: "Perfect! By displaying the next class in a clear, high-contrast card with room number and time, students get their answer in 1 second without scrolling."
          },
          {
            id: "b",
            title: "Keep all 24 links on screen so nothing is hidden",
            explanation: "Cognitive overload happens when users face too many competing choices at once (Hick's Law).",
            feedbackType: "warning",
            feedback: "Students feel overwhelmed. Eye-tracking tests show their eyes dart around chaotically without knowing where to tap."
          },
          {
            id: "c",
            title: "Hide all 24 items inside a hamburger menu icon",
            explanation: "Out of sight is out of mind. Hiding primary daily tools creates unnecessary clicks.",
            feedbackType: "partial",
            feedback: "The screen looks clean, but students now have to tap the menu 5 times a day just to see if their class is in Room 204 or 302."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Micro-copy & Polish",
        context: "The university registrar wants the schedule button to say 'Institutional Academic Enrolled Coursework'. You want everyday students to understand it effortlessly.",
        question: "What button label will ensure zero confusion?",
        options: [
          {
            id: "a",
            title: "'My Classes & Schedule'",
            explanation: "Clear, conversational, and instantly understood by every first-year student.",
            feedbackType: "success",
            feedback: "Brilliant! Testing shows 100% of students immediately understand this button. Class arrival confusion dropped by 92%."
          },
          {
            id: "b",
            title: "'Academic Telemetry Hub'",
            explanation: "Overly complicated wording creates anxiety and hesitation.",
            feedbackType: "warning",
            feedback: "Students paused and wondered if this was where their grades or tuition were stored."
          },
          {
            id: "c",
            title: "Just an unlabeled calendar icon",
            explanation: "Icons without labels force users to guess their meaning.",
            feedbackType: "partial",
            feedback: "Some students thought it was a campus social events calendar, not their personal class list."
          }
        ]
      }
    ],
    takeaway: "You just practiced real product design: listening to users, eliminating clutter with progressive disclosure, and writing clear micro-copy. These are the exact skills design leads at Apple, Figma, and Notion use every day."
  },
  {
    id: "accessible-design-experiment",
    categoryId: "ui-ux-design",
    categoryName: "UI/UX Design",
    careerId: "product-designer",
    title: "Design Systems Lead: The High-Contrast Accessibility Audit",
    roleName: "Accessibility & Design Systems Specialist",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Audit color contrasts, touch targets, and screen reader labels so all students can read grades",
    objective: "Master WCAG 2.1 accessibility guidelines, color contrast ratios, and touch target standards.",
    instructions: "Evaluate low-contrast gray text, resize tap targets, and ensure screen readers announce status changes.",
    expectedOutcome: "Understand how top designers ensure digital experiences work seamlessly for people with disabilities.",
    overview: "A university grading app uses light gray text on white backgrounds and tiny 16-pixel icons. Students with visual impairments, color blindness, and low-vision displays are failing to see overdue assignment notices.",
    skillsGained: ["WCAG 2.1 Standards", "Color Contrast Ratios", "Screen Reader Semantics", "Inclusive Design"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Fix Low-Contrast Text Legibility",
        context: "Due dates are printed in #A0A0A0 light gray on a #FFFFFF white background. The contrast ratio is 2.3:1.",
        question: "What is the WCAG AA minimum contrast ratio required for readable body text?",
        options: [
          {
            id: "a",
            title: "4.5:1 contrast ratio: Darken the text to deep charcoal (#2D312E) for effortless readability",
            explanation: "WCAG AA requires at least 4.5:1 contrast for normal text to be legible under varied lighting.",
            feedbackType: "success",
            feedback: "Immediate clarity! Changing to 4.5:1 contrast allows students reading outdoors in sunlight or with low vision to read dates clearly."
          },
          {
            id: "b",
            title: "Leave it light gray because it looks more minimalist",
            explanation: "Aesthetics must never sacrifice basic human legibility.",
            feedbackType: "warning",
            feedback: "Students missed homework deadlines because they literally could not read the faint dates."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Enlarge Mobile Tap Targets",
        context: "The checkbox to mark an assignment 'Completed' is 16x16 pixels. Students keep missing it and tapping the wrong link.",
        question: "What is the standard minimum touch target size for mobile screens?",
        options: [
          {
            id: "a",
            title: "44x44 points (Apple Human Interface Guidelines) with generous padding around the icon",
            explanation: "A 44x44pt bounding box accommodates adult thumbs and prevents mis-taps.",
            feedbackType: "success",
            feedback: "Flawless mobile craft! Tapping the checkbox is now effortless even with one hand while walking."
          },
          {
            id: "b",
            title: "Make it 10x10 pixels to save screen room",
            explanation: "Tiny touch targets lead to extreme frustration and accidental clicks.",
            feedbackType: "warning",
            feedback: "Students accidentally clicked 'Delete' instead of 'Complete' repeatedly."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Support Non-Visual Screen Readers",
        context: "A blind student uses Apple VoiceOver to check their grade. The app icon says only 'Button'.",
        question: "How should you write the accessibility label (aria-label)?",
        options: [
          {
            id: "a",
            title: "'View Chemistry Midterm Grade, Current Score 92 out of 100'",
            explanation: "Descriptive labels give non-sighted users full context without guesswork.",
            feedbackType: "success",
            feedback: "Inclusive excellence! The student can navigate and check all grades independently with total dignity."
          },
          {
            id: "b",
            title: "'Icon_graphic_3_final.png'",
            explanation: "Filename labels are completely incomprehensible to screen reader users.",
            feedbackType: "warning",
            feedback: "The screen reader read out noisy computer filenames, leaving the student lost."
          }
        ]
      }
    ],
    takeaway: "You practiced inclusive accessibility: auditing 4.5:1 contrast ratios, enforcing 44pt touch targets, and writing meaningful screen reader semantics."
  },

  // ==========================================
  // CATEGORY 7: REAL-WORLD PROBLEM SOLVING
  // ==========================================
  {
    id: "circular-economy-experiment",
    categoryId: "problem-solving",
    categoryName: "Real-World Problem Solving",
    careerId: "climate-energy-analyst",
    title: "Operations Architect: The Dorm Move-Out Waste Crisis",
    roleName: "Operations & Systems Architect",
    timeEstimate: "5 mins",
    difficulty: "Beginner Friendly",
    tagline: "Divert 15 tons of discarded dorm furniture from local landfills into an affordable student marketplace",
    objective: "Master circular economy design, logistical bottleneck resolution, and reverse logistics.",
    instructions: "Audit the end-of-year trash volume, design drop-off collection hubs, and launch a student reuse exchange.",
    expectedOutcome: "Understand how operations analysts build sustainable closed-loop supply chains.",
    overview: "Every May during campus move-out week, graduating seniors abandon 15 tons of functioning mini-fridges, desk lamps, storage bins, and textbooks on the street, which the university pays $35,000 to haul directly to the city landfill. You are tasked with turning this waste into a circular student resource.",
    skillsGained: ["Circular Economy Design", "Reverse Logistics", "Systems Mapping", "Community Engagement"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Diagnose Why Items Get Abandoned",
        context: "You survey leaving seniors about why they dump working $120 mini-fridges on the curb.",
        question: "What is the primary operational friction driving abandonment?",
        options: [
          {
            id: "a",
            title: "Time and logistics: Seniors leave by flight within 4 hours of their last exam and have no truck or storage unit to haul heavy items",
            explanation: "Recognizing physical logistics friction allows you to design a convenient collection system.",
            feedbackType: "success",
            feedback: "Exact root cause! Students aren't malicious; they simply have a strict 24-hour checkout deadline and no vehicle to transport heavy appliances."
          },
          {
            id: "b",
            title: "Seniors hate mini-fridges and enjoy creating garbage",
            explanation: "Never assume bad intent when systemic friction is the clear cause.",
            feedbackType: "warning",
            feedback: "Assuming students want waste leads to unhelpful campus guilt campaigns that change zero behavior."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Design the Reverse-Logistics Dropoff",
        context: "How do you make donating working appliances as easy as walking to the trash dumpster?",
        question: "What collection infrastructure captures 90% of reusable goods?",
        options: [
          {
            id: "a",
            title: "Set up designated 'Re-Use Stations' on the ground floor of every dormitory lobby with volunteer move-out carts",
            explanation: "Placing drop-offs directly on the path of departure eliminates transportation friction.",
            feedbackType: "success",
            feedback: "Brilliant operational placement! Over 450 mini-fridges, 300 microwaves, and 800 desk lamps were cleanly collected in 4 days!"
          },
          {
            id: "b",
            title: "Ask students to drive to a warehouse 15 miles off campus",
            explanation: "Students without cars will not haul heavy fridges 15 miles off campus during finals.",
            feedbackType: "warning",
            feedback: "Only 2 students donated, and dumpsters overflowed just as badly as before."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Close the Loop for Incoming Students",
        context: "You have 1,500 working appliances safely stored in the campus gymnasium over the summer. How do you distribute them in August?",
        question: "What distribution model benefits low-income first-year students and funds next year's program?",
        options: [
          {
            id: "a",
            title: "Host a 'Welcome Yard Sale' on freshman move-in day: Offer inspected fridges for $20 (or free with financial aid vouchers)",
            explanation: "Affordable resale keeps items out of landfills while saving incoming families hundreds of dollars.",
            feedbackType: "success",
            feedback: "Complete circular triumph! Landfill waste dropped by 88%, first-year students saved $62,000, and resale proceeds funded 8 student sustainability scholarships!"
          },
          {
            id: "b",
            title: "Throw all the items in the ocean",
            explanation: "Catastrophic environmental violation.",
            feedbackType: "warning",
            feedback: "Immediate regulatory disaster and public outrage."
          }
        ]
      }
    ],
    takeaway: "You practiced circular systems engineering: diagnosing logistical drop-off friction, implementing reverse-supply collection, and creating an equitable reuse marketplace."
  },

  // ==========================================
  // CATEGORY 8: COMMUNICATION & LEADERSHIP
  // ==========================================
  {
    id: "crisis-communications-experiment",
    categoryId: "communication-leadership",
    categoryName: "Communication & Leadership",
    careerId: "content-strategist",
    title: "Communications Director: The Midnight Server Glitch",
    roleName: "Public Relations & Communications Director",
    timeEstimate: "5 mins",
    difficulty: "Beginner Friendly",
    tagline: "Draft a transparent, calming public briefing when a server glitch accidentally drops 2,000 class schedules",
    objective: "Master crisis communications, radical empathy, accountability framing, and de-escalating panic.",
    instructions: "Assess student anxiety, avoid defensive corporate jargon, and communicate clear restorative steps.",
    expectedOutcome: "Understand how communications directors protect institutional trust during high-stakes emergencies.",
    overview: "At 11:00 PM, an automated database migration accidentally reset the class enrollment rosters for 2,000 seniors 48 hours before graduation. Rumors are spreading uncontrollably on Reddit and TikTok that seniors won't graduate. You are the university communications director.",
    skillsGained: ["Crisis Communications", "Radical Transparency", "Public De-escalation", "Empathetic Messaging"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Avoid the Corporate Defensive Trap",
        context: "The university IT department asks you to send a statement saying: 'Occasional routine systemic anomalies are standard industry protocol.'",
        question: "Why would this defensive statement trigger a public relations catastrophe?",
        options: [
          {
            id: "a",
            title: "It minimizes student anxiety, sounds cold and robotic, and avoids taking responsibility for a terrifying glitch",
            explanation: "Defensive language provokes anger; empathetic accountability restores trust.",
            feedbackType: "success",
            feedback: "Spot on! When students are afraid their college graduation is in jeopardy, technical jargon sounds like an insult."
          },
          {
            id: "b",
            title: "It contains words that are too long for college students",
            explanation: "Students understand technical words; they reject cold institutional evasion.",
            feedbackType: "partial",
            feedback: "Vocabulary isn't the problem — emotional tone and lack of empathy are."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Structure the Emergency Announcement",
        context: "You draft an emergency message to all students and parents across email, SMS, and campus social channels.",
        question: "What 3 elements must be in the first 2 sentences?",
        options: [
          {
            id: "a",
            title: "1) Direct admission of what happened, 2) Total reassurance that graduation dates are 100% safe, and 3) A clear timetable for the backup restoration",
            explanation: "Calm crises by answering: What happened? Am I safe? When will it be fixed?",
            feedbackType: "success",
            feedback: "Flawless communication leadership! Opening with 'Every senior will graduate on time. All enrollment databases are backed up and are currently being restored' stopped campus panic in its tracks."
          },
          {
            id: "b",
            title: "A 5-page history of the university's proud technology legacy since 1968",
            explanation: "Self-congratulatory history during a crisis infuriates distressed users.",
            feedbackType: "warning",
            feedback: "Students reacted with outrage at the tone-deaf self-promotion."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Provide Live Status Visibility",
        context: "The restoration takes 4 hours. How do you prevent rumors from reigniting while engineers work?",
        question: "What transparency mechanism maintains student confidence?",
        options: [
          {
            id: "a",
            title: "A real-time public status page updated every 30 minutes with a dedicated student helpline for anxious seniors",
            explanation: "Continuous, transparent updates eliminate the information vacuum where rumors fester.",
            feedbackType: "success",
            feedback: "Exemplary crisis management! By 3:00 AM, all databases were restored. The student body president publicly praised the university's honesty and swift communication."
          },
          {
            id: "b",
            title: "Turn off comments on social media and go to sleep",
            explanation: "Silencing comments signals guilt and amplifies paranoia.",
            feedbackType: "warning",
            feedback: "National news picked up the story because the university appeared to be covering up the failure."
          }
        ]
      }
    ],
    takeaway: "You practiced high-stakes crisis leadership: taking immediate responsibility, eliminating panic with clear reassurances, and maintaining total transparency."
  },

  // ==========================================
  // CATEGORY 9: DATA & ANALYTICS
  // ==========================================
  {
    id: "predictive-analytics-experiment",
    categoryId: "data-analytics",
    categoryName: "Data & Analytics",
    careerId: "financial-analyst",
    title: "Data Scientist: The Student Dropout Warning Signal",
    roleName: "Data Scientist / Predictive Modeler",
    timeEstimate: "5 mins",
    difficulty: "Beginner Friendly",
    tagline: "Build a proactive predictive model that detects early signs of academic struggle before students fail",
    objective: "Learn predictive modeling, feature engineering, and ethical algorithmic threshold calibration.",
    instructions: "Identify early indicators of student struggle, train a regression classifier, and prevent false positives.",
    expectedOutcome: "Understand how data scientists use machine learning for proactive social and educational good.",
    overview: "Every year, 12% of first-year college students drop out. Traditional universities only notice when a student fails final exams in December — when it is already too late to intervene. You are building an early predictive alert model to connect struggling students with free tutoring in October.",
    skillsGained: ["Feature Engineering", "Precision vs. Recall", "Ethical Machine Learning", "Actionable Analytics"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Select Meaningful Early Predictive Features",
        context: "You have 50 variables in the campus database. Which behavioral signals indicate academic struggle in the first 4 weeks?",
        question: "What is the most predictive early indicator?",
        options: [
          {
            id: "a",
            title: "A sudden drop in weekly homework submissions and logging into the online portal after week 3",
            explanation: "Behavioral disengagement precedes academic failure by 4 to 6 weeks.",
            feedbackType: "success",
            feedback: "Spot on! Data analysis proves that missing 2 early homework assignments is a 4x stronger predictor of dropouts than high school test scores."
          },
          {
            id: "b",
            title: "The student's ZIP code and high school prestige",
            explanation: "Using demographic variables introduces severe socioeconomic bias into predictive models.",
            feedbackType: "warning",
            feedback: "Biased algorithm! The model penalized low-income students unfairly without looking at their actual class engagement."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Balance Precision and Recall",
        context: "The university only has 20 academic peer mentors. Setting the sensitivity threshold too high triggers 1,000 alerts (false positives); setting it too low misses students in real trouble (false negatives).",
        question: "How do you calibrate the model threshold?",
        options: [
          {
            id: "a",
            title: "Calibrate for high recall (catch 95% of struggling students) and prioritize interventions by risk severity rank",
            explanation: "In student support, missing a struggling student is far worse than accidentally checking in on someone who is okay.",
            feedbackType: "success",
            feedback: "Human-centered data science! You prioritize the top 150 highest-risk students for personalized peer check-ins."
          },
          {
            id: "b",
            title: "Set the threshold so the model only alerts after a student gets an F on a major exam",
            explanation: "Waiting for an F defeats the entire purpose of proactive early warning.",
            feedbackType: "warning",
            feedback: "By the time the model alerted, the midterm was over and students had already withdrawn from university."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Design an Empowering, Non-Stigmatizing Outreach",
        context: "When the model identifies a student at risk, how should the notification be delivered?",
        question: "What outreach message encourages students to accept support?",
        options: [
          {
            id: "a",
            title: "'Hey Elena! A friendly peer tutor has an open coffee chat slot this Tuesday to review tricky calculus concepts together. Grab a spot here!'",
            explanation: "Warm, supportive invitations encourage help-seeking behavior without stigma.",
            feedbackType: "success",
            feedback: "Huge triumph! 78% of invited students attended tutoring, and first-year retention improved by 32% across the university!"
          },
          {
            id: "b",
            title: "'WARNING: OUR ARTIFICIAL INTELLIGENCE PREDICTS YOU ARE FAILING. REPORT TO COUNSELING IMMEDIATELY.'",
            explanation: "Threatening automated alerts trigger intense shame and defensiveness.",
            feedbackType: "warning",
            feedback: "Students felt terrified, defensive, and avoided academic advisors."
          }
        ]
      }
    ],
    takeaway: "You practiced ethical data science: selecting behavioral features over biased demographics, optimizing recall to save at-risk students, and delivering compassionate human interventions."
  },

  // ==========================================
  // CATEGORY 10: SOCIAL IMPACT
  // ==========================================
  {
    id: "clean-energy-experiment",
    categoryId: "social-impact",
    categoryName: "Social Impact",
    careerId: "climate-energy-analyst",
    title: "Clean Energy Analyst: The Net-Zero Campus Plan",
    roleName: "Climate & Clean Energy Analyst",
    timeEstimate: "3 mins",
    difficulty: "Beginner Friendly",
    tagline: "Allocate a sustainability budget to cut carbon emissions by 40%",
    objective: "Master carbon accounting, resource allocation, and renewable energy capital modeling.",
    instructions: "Audit building energy telemetry, balance insulation efficiency with solar generation, and engage the campus community.",
    expectedOutcome: "Understand how climate analysts design measurable, data-driven transition plans for net-zero emissions.",
    overview: "Your university received a $1,000,000 clean energy grant. The student council wants 100% solar, but the engineering department says heating and insulation are where the real energy waste hides. You have to model the optimal green investments.",
    skillsGained: ["Environmental Modeling", "Capital Allocation", "Resource Efficiency", "Data-Driven Climate Action"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Audit Campus Energy Waste",
        context: "Before spending the grant, you gather utility telemetry from all 30 campus buildings.",
        question: "What does the data reveal as the largest single energy consumer?",
        options: [
          {
            id: "a",
            title: "Analyze hourly electricity and natural gas consumption across seasons",
            explanation: "Analyzing seasonal energy profiles uncovers where the biggest carbon emissions live.",
            feedbackType: "success",
            feedback: "Insightful! The data shows that heating and air conditioning (HVAC) in drafty 1970s dormitories consume 58% of all campus energy, while computer labs use only 6%."
          },
          {
            id: "b",
            title: "Assume student phone chargers are the main source of power drain",
            explanation: "Small consumer devices use negligible power compared to industrial heating and cooling.",
            feedbackType: "warning",
            feedback: "All phone chargers combined make up less than 0.2% of the university's electric bill."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Allocate the $1M Clean Energy Budget",
        context: "You have $1,000,000. How do you balance clean energy generation with energy efficiency?",
        question: "Which investment package achieves the largest permanent carbon reduction?",
        options: [
          {
            id: "a",
            title: "Balanced Approach: $400k for smart heat pumps & window insulation + $600k for rooftop solar panels",
            explanation: "Reducing energy waste first makes renewable generation 2x more effective per dollar.",
            feedbackType: "success",
            feedback: "Brilliant! Insulation cuts heating waste by 25%, and the rooftop solar generates 30% of the remaining electricity, achieving a 44% overall carbon cut!"
          },
          {
            id: "b",
            title: "Spend 100% on a single massive wind turbine that may lack wind on calm days",
            explanation: "Relying on a single unoptimized generation source without grid storage leads to intermittency.",
            feedbackType: "partial",
            feedback: "The turbine looks impressive, but the old buildings continue bleeding wasted heat every winter night."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Sustain Community Conservation Habits",
        context: "The solar panels and building insulation are installed. How do you keep students and campus teams actively engaged in maintaining low carbon habits for years to come?",
        question: "What community initiative creates lasting conservation behavior?",
        options: [
          {
            id: "a",
            title: "Install live campus energy dashboards in the library showing daily solar power generated and carbon saved",
            explanation: "Visible, transparent metrics create positive social proof and collective pride.",
            feedbackType: "success",
            feedback: "Outstanding! Seeing real-time solar generation motivated student clubs and dorms to turn off dormant lab gear, shaving off an extra 8% in baseline waste!"
          },
          {
            id: "b",
            title: "Post punitive signs warning that students who leave lights on will face campus fines",
            explanation: "Punitive measures build resentment rather than shared environmental culture.",
            feedbackType: "warning",
            feedback: "Students felt policed rather than inspired, and baseline energy use barely shifted."
          }
        ]
      }
    ],
    takeaway: "You just performed real clean energy modeling: auditing energy telemetry, pairing efficiency with renewable generation, and motivating community habits to achieve permanent net-zero impact."
  },
  {
    id: "community-impact-experiment",
    categoryId: "social-impact",
    categoryName: "Social Impact",
    careerId: "public-policy-analyst",
    title: "Civic Technologist: The Campus Food Rescue Pipeline",
    roleName: "Civic Technologist & Community Coordinator",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Build an automated real-time alert connecting dining hall food surplus with hungry college students",
    objective: "Design civic technology, reduce campus food insecurity, and automate community redistribution.",
    instructions: "Map dining hall leftover schedules, build an anonymous notification channel, and measure rescued meals.",
    expectedOutcome: "Understand how civic technologists build software that tackles poverty, hunger, and urban equity.",
    overview: "Every evening at 9:00 PM, university dining halls throw away 40 trays of prepared hot food. Meanwhile, 30% of commuter students experience food insecurity and skip dinner due to high grocery costs. You are asked to build a dignified, fast food-rescue pipeline.",
    skillsGained: ["Civic Tech Architecture", "Privacy & Dignity Design", "Logistical Automation", "Community Equity"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Overcome the Social Stigma of Aid",
        context: "The university originally set up an in-person line where students had to show financial aid cards to get leftover food. Nobody showed up.",
        question: "Why did students avoid the in-person leftover line?",
        options: [
          {
            id: "a",
            title: "Stigma and shame: Standing in a public line branded as 'needy' in front of peers feels humiliating",
            explanation: "Social dignity is prerequisite to effective community support systems.",
            feedbackType: "success",
            feedback: "Deep human empathy! Students said they would rather be hungry than stand in a public line where classmates could see them."
          },
          {
            id: "b",
            title: "Students aren't hungry after 9 PM",
            explanation: "Food insecurity data proves students desperately needed hot meals.",
            feedbackType: "warning",
            feedback: "Surveys confirmed 400 students went to bed hungry every night on campus."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Build an Anonymous Real-Time Broadcast",
        context: "How do you notify students of fresh surplus food while protecting complete personal privacy?",
        question: "What technical architecture ensures instant, anonymous pickup?",
        options: [
          {
            id: "a",
            title: "An open Telegram/SMS bot that announces: '15 meals available at North Dining Room, no signup required, bring your container'",
            explanation: "Open access with zero registration removes barriers and preserves complete privacy.",
            feedbackType: "success",
            feedback: "Phenomenal adoption! Over 1,200 students subscribed. When dining staff tap 'Send Alert', all 40 trays of food are gratefully claimed in 12 minutes with zero awkwardness!"
          },
          {
            id: "b",
            title: "Require students to fill out an 8-page income verification form before seeing where food is located",
            explanation: "Excessive bureaucratic barriers spoil fresh food before it can be rescued.",
            feedbackType: "warning",
            feedback: "The paperwork was so slow that food spoiled before anyone was approved to eat it."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Measure the Impact for Permanent University Funding",
        context: "To fund reusable compostable containers and dedicated student coordinators, you need to present results to the board of trustees.",
        question: "What impact metrics prove the program's vital institutional value?",
        options: [
          {
            id: "a",
            title: "Rescued 14,000 meals in one semester, saved 6 tons of food waste from landfills, and 94% of users reported reduced food stress",
            explanation: "Combining environmental tonnage saved with tangible student wellbeing secures sustainable funding.",
            feedbackType: "success",
            feedback: "The board of trustees was so moved by the dual environmental and human impact that they approved permanent annual funding of $60,000!"
          },
          {
            id: "b",
            title: "A single selfie of the dining hall staff smiling",
            explanation: "Anecdotes without quantitative scale fail to win institutional funding.",
            feedbackType: "partial",
            feedback: "The photo was sweet, but trustees needed hard data to approve permanent budget lines."
          }
        ]
      }
    ],
    takeaway: "You practiced civic technology: designing for human dignity, automating real-time redistribution, and presenting data that turns student grassroots projects into funded institutions."
  },

  // 11. Growth Marketer (Business & Entrepreneurship 3)
  {
    id: "growth-marketer-experiment",
    categoryId: "business-entrepreneurship",
    categoryName: "Business & Entrepreneurship",
    careerId: "growth-marketer",
    title: "Growth Marketer: The Zero-Budget Campus Launch",
    roleName: "Growth & Community Marketer",
    timeEstimate: "5 mins",
    difficulty: "Intermediate",
    tagline: "Grow a student marketplace from 20 to 1,000 active users through organic community loops",
    objective: "Master organic growth loops, viral mechanics, referral incentives, and retention tracking without paid ads.",
    instructions: "Evaluate campus distribution channels, design a double-sided referral incentive, and track K-factor virality.",
    expectedOutcome: "Understand how growth marketers build authentic, self-sustaining community loops for new products.",
    overview: "You built a peer-to-peer textbook rental app with 20 early beta users. You have zero advertising budget. How do you scale to 1,000 active campus users before midterms start?",
    skillsGained: ["Viral Loops", "Referral Mechanics", "Community Building", "Funnel Optimization"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Identify the Highest-Trust Distribution Channel",
        context: "Where do students actively look for affordable course materials?",
        question: "Which organic channel converts students at the highest rate?",
        options: [
          {
            id: "a",
            title: "Partner with Course Assistants & Discord study groups right after syllabus week",
            explanation: "Targeted outreach at the exact moment of high student need converts 5x better than general spam.",
            feedbackType: "success",
            feedback: "Brilliant timing! Right after professors assign expensive textbooks, your app offered an instant, affordable alternative."
          },
          {
            id: "b",
            title: "Spam random campus bulletin boards with 500 paper flyers",
            explanation: "Physical flyers get torn down within hours and convert less than 0.5%.",
            feedbackType: "warning",
            feedback: "Rain destroyed the paper flyers, yielding only 2 signups for 4 hours of effort."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Build a Double-Sided Referral Loop",
        context: "You want current users to naturally invite their classmates.",
        question: "What referral incentive creates sustainable word-of-mouth without high cash burns?",
        options: [
          {
            id: "a",
            title: "Give both the inviter and invitee 1 free 48-hour rental credit when the friend books their first book",
            explanation: "Double-sided incentives reward both parties and tie value directly to core product usage.",
            feedbackType: "success",
            feedback: "Exponential growth loop! Each active student invited an average of 2.4 classmates, achieving viral K-factor > 1.0."
          },
          {
            id: "b",
            title: "Promise a $100 cash raffle to one lucky student at the end of the semester",
            explanation: "Distant lotteries have near-zero immediate motivational pull for busy students.",
            feedbackType: "warning",
            feedback: "Nobody believed they would win the raffle, and referral rates flatlined."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Measure Retention vs. Churn",
        context: "You reached 1,000 signups. How do you verify whether this is sustainable growth?",
        question: "What metric reveals true marketplace health?",
        options: [
          {
            id: "a",
            title: "Repeat transaction rate: Did students who rented in week 2 return to rent again in week 6?",
            explanation: "Repeat transactions prove genuine customer satisfaction and long-term product-market fit.",
            feedbackType: "success",
            feedback: "Heroic growth milestone! 72% of students returned for their second course, proving true marketplace liquidity!"
          },
          {
            id: "b",
            title: "Total number of Instagram likes on your launch post",
            explanation: "Social media likes do not pay for server bills or prove active product usage.",
            feedbackType: "partial",
            feedback: "Likes looked great, but failed to show whether anyone was actually exchanging books."
          }
        ]
      }
    ],
    takeaway: "You practiced modern growth marketing: leveraging high-trust channels, engineering double-sided referral loops, and prioritizing repeat retention over vanity metrics."
  },

  // 12. Environmental Research Scientist (Science & Research 3)
  {
    id: "environmental-science-experiment",
    categoryId: "science-research",
    categoryName: "Science & Research",
    careerId: "climate-energy-analyst",
    title: "Environmental Scientist: The Urban Heat Island Audit",
    roleName: "Environmental Research Scientist",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Map satellite thermal imagery across city neighborhoods to discover where tree canopies create the biggest cooling impact",
    objective: "Master GIS thermal mapping, environmental equity analysis, and microclimate mitigation modeling.",
    instructions: "Analyze infrared thermal data, identify asphalt heat traps, and model neighborhood cooling with canopy planting.",
    expectedOutcome: "Understand how environmental scientists use satellite remote sensing to combat climate change and health inequities.",
    overview: "During a record-breaking July heatwave, infrared satellite telemetry shows the downtown university district is 14°F hotter than suburban hills 3 miles away. Heat-related medical visits are spiking. You are the environmental scientist on the municipal climate task force.",
    skillsGained: ["Thermal Satellite Remote Sensing", "GIS Mapping", "Climate Resilience", "Urban Ecology"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Identify the Physical Heat Traps",
        context: "You examine Landsat 9 thermal infrared data overlaying the city grid.",
        question: "What physical land surface creates the highest localized thermal radiation?",
        options: [
          {
            id: "a",
            title: "Unshaded black asphalt parking lots and dark tar roofs absorbing solar radiation without vegetation",
            explanation: "Impervious dark surfaces have low albedo, storing massive heat during the day and re-radiating it at night.",
            feedbackType: "success",
            feedback: "Exact diagnosis! Surface temperatures on parking lots hit a blistering 132°F, while nearby tree-lined quads stayed at 84°F."
          },
          {
            id: "b",
            title: "Air conditioning units exhausting warm air outdoors",
            explanation: "AC exhaust adds slight local heat, but solar absorption by dark asphalt is 20x larger.",
            feedbackType: "partial",
            feedback: "AC heat contributes, but dark impervious ground surfaces are the primary thermal sink."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Model Tree Canopy Evapotranspiration",
        context: "The city council has funding to plant 500 native shade trees. Where should they be planted for maximum cooling?",
        question: "Which planting strategy delivers the largest public health protection?",
        options: [
          {
            id: "a",
            title: "Target low-income bus transit corridors and student walking routes that currently have less than 5% canopy cover",
            explanation: "Focusing canopy where pedestrian exposure and heat-related vulnerability are highest saves lives.",
            feedbackType: "success",
            feedback: "Optimal environmental justice! Shading active bus stops and sidewalks dropped ambient pedestrian heat by 9°F!"
          },
          {
            id: "b",
            title: "Plant all 500 trees in an existing forest outside town",
            explanation: "Adding trees to an already dense forest creates zero urban cooling relief for suffering residents.",
            feedbackType: "warning",
            feedback: "The forest grew denser, but urban streets remained dangerously hot heat traps."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Combine High-Albedo Surfaces with Nature",
        context: "Trees take 5 years to mature. What immediate reflective surface intervention can you implement this summer?",
        question: "What surface treatment drops roof temperatures immediately?",
        options: [
          {
            id: "a",
            title: "Coat dark commercial roofs with high-albedo reflective white sealants ('Cool Roofs')",
            explanation: "Cool roofs reflect up to 85% of solar rays, instantly cutting building cooling loads by 20%.",
            feedbackType: "success",
            feedback: "Immediate cooling impact! Indoor classroom temperatures dropped by 8°F and municipal power spikes decreased by 15%."
          },
          {
            id: "b",
            title: "Paint the sidewalks bright neon red",
            explanation: "Dark or bright red pigments still absorb significant infrared radiation and glare.",
            feedbackType: "warning",
            feedback: "The red color caused intense eye glare and failed to reflect heat."
          }
        ]
      }
    ],
    takeaway: "You practiced real environmental science: analyzing satellite thermal imagery, prioritizing canopy equity in vulnerable corridors, and pairing cool-roof materials with urban forestry."
  },

  // 13. Organizational Psychologist (Psychology 3)
  {
    id: "organizational-psychology-experiment",
    categoryId: "psychology-human-behaviour",
    categoryName: "Psychology & Human Behaviour",
    careerId: "user-researcher",
    title: "Organizational Psychologist: The Stalled Engineering Team",
    roleName: "Organizational Psychologist",
    timeEstimate: "5 mins",
    difficulty: "Intermediate",
    tagline: "De-escalate defensive communication in a student engineering team and restore psychological safety",
    objective: "Master psychological safety, constructive feedback loops, and resolving team conflict.",
    instructions: "Diagnose defensive communication patterns, establish safe feedback norms, and align goals.",
    expectedOutcome: "Understand how organizational psychologists build high-performing, emotionally safe collaborative teams.",
    overview: "A student robotics team designing an autonomous mars rover is on the verge of breaking up 3 weeks before the national competition. Teammates are giving each other the silent treatment, hiding buggy code out of fear of criticism, and missing meetings.",
    skillsGained: ["Psychological Safety", "Conflict Resolution", "Interpersonal Dynamics", "Active Mediation"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Identify the Root Team Pathology",
        context: "You sit in on a team meeting. Whenever someone mentions a motor failure, the lead engineer shouts: 'Whose fault was that?' Everyone looks down in silence.",
        question: "What fundamental dynamic is missing on this team?",
        options: [
          {
            id: "a",
            title: "Psychological Safety: Team members fear that admitting mistakes will lead to blame, humiliation, or exclusion",
            explanation: "As Amy Edmondson's research shows, psychological safety is the #1 predictor of team effectiveness.",
            feedbackType: "success",
            feedback: "Exact diagnosis! Because failure was punished, teammates hid motor defects instead of asking for help, leading to catastrophic test crashes."
          },
          {
            id: "b",
            title: "The team needs more free pizza at meetings",
            explanation: "Perks cannot fix toxic communication or fear of vulnerability.",
            feedbackType: "warning",
            feedback: "The pizza arrived, but the team ate in tense, hostile silence."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Re-frame Failure into Shared Learning",
        context: "How do you help the team shift from finger-pointing to collaborative problem solving?",
        question: "What structured debriefing practice resets team norms?",
        options: [
          {
            id: "a",
            title: "Implement 'Blameless Post-Mortems': Focus entirely on what failed in the mechanical system rather than who made the mistake",
            explanation: "Blameless analysis encourages transparency and rapid root-cause discovery.",
            feedbackType: "success",
            feedback: "Tremendous cultural shift! The junior engineer felt safe to admit a loose wiring harness, and 3 teammates jumped in to help solder a fix in 20 minutes."
          },
          {
            id: "b",
            title: "Create a 'Hall of Shame' poster listing who caused the most errors",
            explanation: "Public shaming completely destroys trust and drives talented people away.",
            feedbackType: "warning",
            feedback: "Two key engineers quit the team immediately."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Cement Trust Before Competition",
        context: "The rover is functioning again. How do you ensure the team stays resilient under intense competition pressure?",
        question: "What team habit maintains psychological resilience?",
        options: [
          {
            id: "a",
            title: "Open every standup with a 2-minute 'Red-Yellow-Green' personal capacity check-in so teammates can ask for backup without judgment",
            explanation: "Explicitly checking in on teammate workload and stress prevents burnout and preserves solidarity.",
            feedbackType: "success",
            feedback: "Triumphant teamwork! The team placed 2nd nationwide, and judges commended them as the most collaborative, cohesive squad in the arena!"
          },
          {
            id: "b",
            title: "Ban all conversations except technical code reviews",
            explanation: "Suppressing emotional connection prevents genuine team bonding.",
            feedbackType: "warning",
            feedback: "The team felt cold and detached, and miscommunication resurfaced."
          }
        ]
      }
    ],
    takeaway: "You practiced organizational psychology: establishing psychological safety, instituting blameless post-mortems, and building high-trust team communication."
  },

  // 14. Interaction Designer (UI/UX Design 3)
  {
    id: "onboarding-flow-experiment",
    categoryId: "ui-ux-design",
    categoryName: "UI/UX Design",
    careerId: "product-designer",
    title: "Interaction Designer: The 2-Tap Onboarding Miracle",
    roleName: "Product (UI/UX) Designer",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Redesign an exhaustive 9-step student onboarding questionnaire into an effortless 2-tap flow",
    objective: "Master interaction design: cognitive load reduction, deferred commitment, and progressive profiling.",
    instructions: "Audit high-friction form fields, defer non-essential questions, and celebrate immediate user progress.",
    expectedOutcome: "Understand how interaction designers optimize conversion funnels and eliminate signup fatigue.",
    overview: "A student study group matching app has a disastrous 24% completion rate during signup. New users are hit with 9 back-to-back screens asking for GPA, high school history, 3 essay questions, and notification permissions before they even see a single study group.",
    skillsGained: ["Interaction Design", "Cognitive Load Theory", "Progressive Profiling", "Frictionless Onboarding"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Eliminate Pre-Mature Demands",
        context: "Why are 76% of students abandoning the app on the very first screen?",
        question: "What principle of interaction design is being violated?",
        options: [
          {
            id: "a",
            title: "Demanding high effort before providing any value: Students haven't seen whether the app is useful yet",
            explanation: "Value must precede extraction. Give users a taste of utility before asking for personal data.",
            feedbackType: "success",
            feedback: "Exact diagnosis! Students said: 'Why should I spend 10 minutes typing my academic history before I even know if anyone on my campus uses this?'"
          },
          {
            id: "b",
            title: "The button color should be yellow instead of green",
            explanation: "Button colors cannot compensate for 9 screens of tedious data entry.",
            feedbackType: "partial",
            feedback: "Yellow buttons didn't help; students still refused to write 3 essays just to view groups."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Implement Progressive Profiling",
        context: "You only need 2 pieces of info to show relevant groups: Campus and Major. Everything else can be gathered later.",
        question: "How do you restructure the first-time user experience?",
        options: [
          {
            id: "a",
            title: "Let students tap their campus & major in 5 seconds, immediately show them active study groups, and prompt for profile details later when they request to join",
            explanation: "Progressive profiling defers secondary questions until the user has strong intent to interact.",
            feedbackType: "success",
            feedback: "Monumental conversion lift! Signup completion jumped from 24% to 89%! Students immediately saw 12 classmates studying their exact calculus class."
          },
          {
            id: "b",
            title: "Keep all 9 screens but make the progress bar look like a dancing character",
            explanation: "Playful graphics do not reduce cognitive friction.",
            feedbackType: "warning",
            feedback: "The animation was cute, but students still left after screen 3."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Celebrate Immediate Success",
        context: "The student picks 'Computer Science' and lands on the dashboard.",
        question: "What UI state encourages them to join their first group immediately?",
        options: [
          {
            id: "a",
            title: "Display a clean, pre-filtered card: '3 classmates in CS 61A are studying at the library right now' with a 1-tap 'Join Study Group' button",
            explanation: "Immediate social relevance and clear calls-to-action turn new users into active members.",
            feedbackType: "success",
            feedback: "Flawless interaction design! Over 80% of new signups joined a study group on their first day, cementing app retention!"
          },
          {
            id: "b",
            title: "An empty blank white screen with text saying 'No data found, please search manual database'",
            explanation: "Empty states with no guidance confuse and lose users.",
            feedbackType: "warning",
            feedback: "Students stared at the blank screen, felt confused, and closed the app."
          }
        ]
      }
    ],
    takeaway: "You practiced top-tier interaction design: value-first onboarding, progressive profiling, and designing high-relevance zero-state dashboards."
  },

  // 15. Operations & Logistics Analyst (Problem Solving 2)
  {
    id: "operations-logistics-experiment",
    categoryId: "problem-solving",
    categoryName: "Real-World Problem Solving",
    careerId: "financial-analyst",
    title: "Logistics Analyst: The Critical Robotics Shipment Delay",
    roleName: "Supply Chain & Operations Analyst",
    timeEstimate: "5 mins",
    difficulty: "Intermediate",
    tagline: "Reroute critical microcontrollers for a student engineering contest after an international shipping corridor is blocked",
    objective: "Master supply chain resilience, contingency routing, and inventory buffer management under severe time constraints.",
    instructions: "Assess supply bottlenecks, evaluate air freight vs local fabrication trade-offs, and maintain build schedules.",
    expectedOutcome: "Understand how supply chain analysts protect production lines from global trade disruptions.",
    overview: "Your university robotics team is scheduled to compete in the national robotics finals in 10 days. The custom motor controllers shipped from overseas are stuck in customs due to an unannounced shipping port strike. Without them, the robot cannot drive.",
    skillsGained: ["Supply Chain Resilience", "Risk Mitigation", "Contingency Routing", "Trade-Off Analysis"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Quantify the Timeline Threat",
        context: "Customs authorities say the port strike might last anywhere from 3 days to 4 weeks.",
        question: "What is your primary operational decision principle?",
        options: [
          {
            id: "a",
            title: "Do not wait for uncertain recovery: Immediately activate contingency sourcing because waiting 4 days without backup guarantees disqualification",
            explanation: "In supply chain management, time is the only non-recoverable resource.",
            feedbackType: "success",
            feedback: "Decisive leadership! Waiting for the strike to resolve would have left zero time for testing."
          },
          {
            id: "b",
            title: "Keep refreshing the shipping tracking number every 10 minutes and hope customs clears it tonight",
            explanation: "Passive hope is not an operational strategy.",
            feedbackType: "warning",
            feedback: "Three days passed with zero movement, and you lost half your remaining competition window."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Evaluate Contingency Sourcing Options",
        context: "You have $1,200 in remaining club emergency reserves.",
        question: "Which contingency path delivers working boards with the highest certainty?",
        options: [
          {
            id: "a",
            title: "Send open-source Gerber circuit board files to a domestic quick-turn PCB fabricator for 48-hour air delivery at $450",
            explanation: "Domestic quick-turn manufacturing provides guaranteed delivery windows and avoids customs.",
            feedbackType: "success",
            feedback: "Brilliant contingency execution! The fresh boards arrived on campus in 48 hours, leaving 6 full days for assembly and calibration."
          },
          {
            id: "b",
            title: "Order a completely untested random board from an unverified overseas seller on social media",
            explanation: "Unverified vendors carry high risks of counterfeit or non-functional electronics.",
            feedbackType: "warning",
            feedback: "The board arrived with wrong pin voltages and burned out your motors on first boot."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Implement Supply Redundancy for Next Year",
        context: "The robot was saved and competed successfully. How do you ensure supply chain resilience for next season?",
        question: "What procurement policy permanently prevents single-point-of-failure bottlenecks?",
        options: [
          {
            id: "a",
            title: "Multi-sourcing: Always design circuits using standard, widely available commercial components sourced from at least two independent suppliers",
            explanation: "Multi-sourcing and avoiding proprietary single-source components guarantees supply stability.",
            feedbackType: "success",
            feedback: "Exceptional operations maturity! Next season's build finished 3 weeks ahead of schedule with zero supply disruptions."
          },
          {
            id: "b",
            title: "Never build robots again",
            explanation: "Defeatism avoids learning from operational crises.",
            feedbackType: "warning",
            feedback: "The engineering club folded due to lack of ambition."
          }
        ]
      }
    ],
    takeaway: "You practiced real supply chain operations: taking proactive contingency actions, deploying domestic rapid fabrication, and designing multi-source component redundancy."
  },

  // 16. Industrial Engineer (Problem Solving 3)
  {
    id: "queueing-theory-experiment",
    categoryId: "problem-solving",
    categoryName: "Real-World Problem Solving",
    careerId: "software-engineer",
    title: "Industrial Engineer: The Cafeteria Lunch Rush Bottleneck",
    roleName: "Industrial & Systems Engineer",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Re-engineer campus dining checkout stations to eliminate 25-minute lunchtime queue bottlenecks",
    objective: "Master queueing theory (Little's Law), process flow re-engineering, and throughput balancing.",
    instructions: "Map arrival rates, identify service time variance, and decouple food preparation from payment.",
    expectedOutcome: "Understand how industrial and systems engineers eliminate waiting lines in airports, hospitals, and factories.",
    overview: "Every day at 12:15 PM, 800 students descend on the campus dining hall between class blocks. Lines stretch out the door with 25-minute wait times. Students are skipping lunch or arriving late to afternoon labs. You are tasked with cutting wait times to under 5 minutes.",
    skillsGained: ["Queueing Theory", "Throughput Optimization", "Process Mapping", "Bottleneck Elimination"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Locate the Primary Process Constraint",
        context: "You observe the cafeteria workflow with a stopwatch.",
        question: "Where is the true bottleneck slowing down the line?",
        options: [
          {
            id: "a",
            title: "The cashiers: While food prep takes 45 seconds, the single payment register takes 90 seconds per student to swipe meal cards",
            explanation: "In any assembly line, overall throughput is governed by the slowest sequential step (Theory of Constraints).",
            feedbackType: "success",
            feedback: "Spot on! The payment register was the bottleneck. Food was ready, but students were trapped waiting for the cashier."
          },
          {
            id: "b",
            title: "Students are chewing their food too slowly",
            explanation: "Dining seating is a separate system from the food acquisition checkout line.",
            feedbackType: "warning",
            feedback: "Chewing speed has zero impact on the checkout register queue."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Decouple Payment from Queue Entry",
        context: "How do you eliminate the cashier bottleneck during the 40-minute lunch rush?",
        question: "Which operational configuration maximizes student throughput?",
        options: [
          {
            id: "a",
            title: "Install 4 self-service mobile barcode scanners at the entrance: Students tap their campus ID upon walking in, turning checkout into a frictionless open buffet flow",
            explanation: "Moving payment to the entrance in parallel eliminates sequential checkout lines.",
            feedbackType: "success",
            feedback: "Spectacular process transformation! Average queue time plummeted from 25 minutes down to 3.5 minutes! Students ate comfortably and made it to 1:00 PM labs on time."
          },
          {
            id: "b",
            title: "Hire 10 more cooks to make food faster",
            explanation: "Adding cooks to an already waiting food station only piles up more cold food behind the slow register.",
            feedbackType: "warning",
            feedback: "Food piled up on the counter, but the payment line remained just as long."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Smooth Peak Arrival Demand",
        context: "Even with fast scanning, having 800 people arrive at the exact same second causes a mini-surge.",
        question: "How can you nudge arrival times without forcing students?",
        options: [
          {
            id: "a",
            title: "Display a live cafeteria occupancy graph on the student app: 'Dining hall is busy right now (12:15 PM) — arrives at 12:35 PM have 0 wait'",
            explanation: "Transparent real-time occupancy data allows flexible students to self-select less crowded time windows.",
            feedbackType: "success",
            feedback: "Flawless demand smoothing! 25% of students voluntarily shifted their lunch 15 minutes, permanently stabilizing throughput across the entire lunch hour."
          },
          {
            id: "b",
            title: "Lock the doors and turn away anyone who arrives after 12:20 PM",
            explanation: "Arbitrary lockouts cause student outrage and foster severe campus dissatisfaction.",
            feedbackType: "warning",
            feedback: "Students staged protests outside the dining hall."
          }
        ]
      }
    ],
    takeaway: "You practiced industrial systems engineering: identifying the governing bottleneck, parallelizing sequential processes, and using real-time information to smooth peak demand."
  },

  // 17. Public Policy Analyst (Communication & Leadership 2)
  {
    id: "public-policy-experiment",
    categoryId: "communication-leadership",
    categoryName: "Communication & Leadership",
    careerId: "public-policy-analyst",
    title: "Public Policy Analyst: The Mental Health Budget Hearing",
    roleName: "Public Policy & Civic Analyst",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Facilitate an open budget hearing between athletics and counseling to reach a fair student funding compromise",
    objective: "Master stakeholder diplomacy, fiscal equity analysis, policy compromise, and public testimony facilitation.",
    instructions: "Evaluate competing funding claims, analyze student mental health data, and draft a balanced allocation policy.",
    expectedOutcome: "Understand how policy analysts navigate contested public budgets to benefit entire communities.",
    overview: "Your university has a $500,000 discretionary student fee surplus. The athletics department wants to resurface the sports arena floor; student counseling services has a 4-week waiting list for licensed therapist appointments. You are the student policy advisor drafting the final allocation proposal.",
    skillsGained: ["Policy Analysis", "Stakeholder Compromise", "Fiscal Impact Modeling", "Civic Facilitation"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Analyze Empirical Community Need",
        context: "Both groups argue their cause is the top priority for campus wellness.",
        question: "How do you evaluate where student welfare is most urgently compromised?",
        options: [
          {
            id: "a",
            title: "Analyze student health data: The 4-week counselor waitlist coincides with a 38% rise in student mental health crises, while the athletic floor passed safety inspections last month",
            explanation: "Grounding policy in documented health and safety data provides objective moral and fiscal clarity.",
            feedbackType: "success",
            feedback: "Undeniable evidence! Data proves mental health access is an acute, life-critical vulnerability, whereas the floor resurfacing is non-urgent cosmetic maintenance."
          },
          {
            id: "b",
            title: "Award 100% of the money to whichever group has the loudest chants at the rally",
            explanation: "Policy should be guided by empirical community welfare, not volume of noise.",
            feedbackType: "warning",
            feedback: "Deciding by volume created deep community division and neglected silent, struggling students."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Craft a Strategic Policy Compromise",
        context: "Total antagonism will cause the university board to veto the entire budget. You need a solution that honors both athletic wellness and crisis counseling.",
        question: "What balanced policy compromise wins unanimous student senate approval?",
        options: [
          {
            id: "a",
            title: "Allocate $380,000 to hire 3 full-time embedded counselors (cutting wait times to 48 hours) and $120,000 to repair critical athletic safety equipment and intramural fields",
            explanation: "Proportional, targeted allocations address urgent crises while keeping secondary stakeholders invested in the community.",
            feedbackType: "success",
            feedback: "Masterful policy leadership! Both the athletic director and counseling staff endorsed the proposal, noting that healthy student minds and bodies go hand in hand."
          },
          {
            id: "b",
            title: "Burn the $500,000 in front of the student union",
            explanation: "Destruction of public resources is catastrophic and illegal.",
            feedbackType: "warning",
            feedback: "Immediate arrest and university expulsion."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Establish Ongoing Policy Accountability",
        context: "The budget passes. How do you ensure the money is spent effectively over the next academic year?",
        question: "What oversight clause guarantees transparency?",
        options: [
          {
            id: "a",
            title: "Require semi-annual public reporting on counselor appointment wait times and student satisfaction metrics published openly to all students",
            explanation: "Transparent public reporting ensures institutional promises translate into measurable real-world outcomes.",
            feedbackType: "success",
            feedback: "Exemplary governance! Within 6 months, counseling wait times dropped from 28 days to 3.2 days, and campus wellness ratings reached historic highs!"
          },
          {
            id: "b",
            title: "Tell everyone to trust that everything will work out perfectly without checking",
            explanation: "Accountability requires ongoing measurement and public transparency.",
            feedbackType: "warning",
            feedback: "Funds were quietly diverted to administrative salaries because nobody tracked outcomes."
          }
        ]
      }
    ],
    takeaway: "You practiced civic policy leadership: evaluating empirical community needs, engineering win-win stakeholder compromises, and enforcing public accountability metrics."
  },

  // 18. Science Communicator (Communication & Leadership 3)
  {
    id: "science-communicator-experiment",
    categoryId: "communication-leadership",
    categoryName: "Communication & Leadership",
    careerId: "content-strategist",
    title: "Science Communicator: Translating Quantum Computing to 60 Seconds",
    roleName: "Science Journalist & Content Strategist",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Translate a dense 40-page physics whitepaper into an engaging 60-second video that high schoolers love",
    objective: "Master science journalism, conceptual simplification, narrative pacing, and eliminating jargon.",
    instructions: "Identify the core scientific insight, strip away dense academic equations, and write an exciting visual script.",
    expectedOutcome: "Understand how science writers, journalists, and educators make complex scientific discoveries inspiring to the public.",
    overview: "A university physics laboratory achieved a major breakthrough in quantum superposition. The lead professor wrote a 40-page paper packed with complex math symbols that ordinary people cannot read. You are hired as a science communicator to create a 60-second viral explainer video.",
    skillsGained: ["Science Journalism", "Jargon Elimination", "Conceptual Framing", "Video Scripting"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Find the 'So What?' Human Hook",
        context: "The professor wants to start the video with: 'Hamiltonian matrix operators in Hilbert space exhibit unitary evolution.'",
        question: "How do you open the video to hook everyday viewers?",
        options: [
          {
            id: "a",
            title: "'Imagine a computer that could test every combination of a maze at the exact same moment. Today, our lab just built it.'",
            explanation: "A vivid mental picture and high-stakes promise capture human curiosity instantly.",
            feedbackType: "success",
            feedback: "Hook masterclass! The first 3 seconds grabbed viewers immediately, driving a 94% video completion rate!"
          },
          {
            id: "b",
            title: "'Hello, today I will read you equation 14B from physics journal volume 402.'",
            explanation: "Reading academic citations causes 99% of viewers to swipe away instantly.",
            feedbackType: "warning",
            feedback: "98% of viewers closed the video in the first 2 seconds."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Create the Core Visual Analogy",
        context: "How do you explain the difference between a classical bit (0 or 1) and a quantum qubit (superposition)?",
        question: "What physical analogy explains superposition simply without misleading viewers?",
        options: [
          {
            id: "a",
            title: "A spinning coin: While flat on a table it's either heads or tails (classical bit), but while spinning in the air, it's a blur of both at once (quantum qubit)",
            explanation: "The spinning coin analogy is scientifically sound, tactile, and instantly visual.",
            feedbackType: "success",
            feedback: "Visual brilliance! Even middle school students commented: 'I finally understand what a qubit is!' The professor was astonished at the clarity."
          },
          {
            id: "b",
            title: "Show a mathematical proof with Greek letters written on a chalkboard",
            explanation: "Chalkboard proofs confuse rather than clarify.",
            feedbackType: "warning",
            feedback: "Viewers felt alienated and commented that the subject felt too difficult."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Connect to Real Human Impact",
        context: "Why does this physics breakthrough matter to ordinary people's lives?",
        question: "What practical application makes the discovery meaningful?",
        options: [
          {
            id: "a",
            title: "Explain that this computing power allows scientists to simulate molecular reactions in hours instead of centuries, accelerating cures for Alzheimer's and discovering new clean battery materials",
            explanation: "Grounding abstract science in real medicine and clean energy inspires collective human hope.",
            feedbackType: "success",
            feedback: "Viral educational success! The video gained 450,000 views, high school teachers across the country used it in class, and the university received 2 new research grants!"
          },
          {
            id: "b",
            title: "Say that it has no practical use and is purely for theoretical physics ego",
            explanation: "Cynicism discourages the public from valuing scientific research.",
            feedbackType: "warning",
            feedback: "Viewers questioned why public money was being spent on research."
          }
        ]
      }
    ],
    takeaway: "You practiced science storytelling: hooking curiosity with vivid imagery, explaining superposition with the spinning coin analogy, and showing how physics accelerates medical cures."
  },

  // 19. Spatial Analyst (Data & Analytics 2)
  {
    id: "spatial-analytics-experiment",
    categoryId: "data-analytics",
    categoryName: "Data & Analytics",
    careerId: "financial-analyst",
    title: "Spatial Analyst: The Campus Library Seat Heatmap",
    roleName: "Business Intelligence & Spatial Analyst",
    timeEstimate: "4 mins",
    difficulty: "Beginner Friendly",
    tagline: "Parse anonymous campus Wi-Fi density to build a real-time quiet desk availability heatmap",
    objective: "Master spatial data parsing, privacy-preserving aggregation, and building intuitive real-time dashboards.",
    instructions: "Filter raw network telemetry, aggregate anonymous access point densities, and visualize building heatmaps.",
    expectedOutcome: "Understand how spatial data analysts transform raw network pings into valuable public services.",
    overview: "During finals week, 12,000 students wander fruitlessly through 4 campus libraries looking for empty quiet study desks, wasting 30 minutes walking between floors. You are tasked with analyzing anonymous Wi-Fi router pings to build a live desk availability heatmap.",
    skillsGained: ["Spatial Data Aggregation", "Privacy-Preserving Telemetry", "Heatmap Visualization", "Data Pipelines"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Enforce Strict Privacy Protection",
        context: "Raw network logs contain MAC addresses that could theoretically track an individual student's movements.",
        question: "How do you protect student privacy while gathering crowd density data?",
        options: [
          {
            id: "a",
            title: "One-way cryptographic salting & aggregation: Strip all MAC addresses immediately, and only count total anonymous device pings per access point zone in 10-minute buckets",
            explanation: "Aggregating counts at the access-point level prevents tracking any individual while providing perfect density metrics.",
            feedbackType: "success",
            feedback: "Gold standard data privacy! The student privacy board gave unanimous approval because zero personal identifiable information is ever stored."
          },
          {
            id: "b",
            title: "Publish every student's full name and exact desk location on a public website",
            explanation: "Catastrophic privacy violation endangering student safety.",
            feedbackType: "warning",
            feedback: "Severe disciplinary review and immediate shutdown for privacy violations."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Calibrate Signal to Desk Ratios",
        context: "You notice an access point in the library café has 200 connected devices, but only 40 seats. Why?",
        question: "What variable causes devices to outnumber physical humans?",
        options: [
          {
            id: "a",
            title: "Device multiplicity: Each student carries an average of 2.2 connected devices (laptop, phone, smartwatch, tablet)",
            explanation: "Accounting for multi-device ownership is essential for accurate spatial occupancy estimation.",
            feedbackType: "success",
            feedback: "Brilliant statistical calibration! Dividing total connected devices by the calibrated 2.1 ratio yielded 96% accuracy on real physical chair occupancy!"
          },
          {
            id: "b",
            title: "Ghosts are using the Wi-Fi",
            explanation: "Data analysts look for technical calibration variables rather than supernatural excuses.",
            feedbackType: "warning",
            feedback: "Supernatural hypotheses do not improve predictive accuracy."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Design the Student Glanceable Dashboard",
        context: "Students need to check seat availability in 2 seconds from their phones between classes.",
        question: "What visual presentation makes space discovery effortless?",
        options: [
          {
            id: "a",
            title: "A simple color-coded architectural floorplan: Green (Plenty of seats), Amber (Filling up), Red (Full), with floor-by-floor filters",
            explanation: "Intuitive traffic light color coding provides instant glanceable cognition.",
            feedbackType: "success",
            feedback: "Huge campus success! Wandering search times dropped from 30 minutes to 45 seconds. Over 10,000 students checked the heatmap daily during finals week!"
          },
          {
            id: "b",
            title: "A raw CSV spreadsheet of raw IEEE 802.11 signal strength decibel values",
            explanation: "Raw engineering data is completely unusable for everyday students.",
            feedbackType: "warning",
            feedback: "Students had no idea what to do with raw radio signal decibel values."
          }
        ]
      }
    ],
    takeaway: "You practiced real business intelligence: privacy-preserving data aggregation, calibrating device-to-human ratios, and building glanceable spatial dashboards."
  },

  // 20. Financial Modeling Analyst (Data & Analytics 3)
  {
    id: "financial-modeling-experiment",
    categoryId: "data-analytics",
    categoryName: "Data & Analytics",
    careerId: "financial-analyst",
    title: "Financial Analyst: The Student Venture Runway Stress-Test",
    roleName: "Financial Analyst",
    timeEstimate: "5 mins",
    difficulty: "Intermediate",
    tagline: "Build a dynamic cash-flow stress test for a student startup to ensure they survive seasonal summer revenue dips",
    objective: "Master cash runway modeling, scenario stress-testing, burn rate calculation, and working capital preservation.",
    instructions: "Audit monthly burn rate, model a 60% summer revenue drop, and build cash buffer contingencies.",
    expectedOutcome: "Understand how financial analysts protect companies from insolvency and manage capital responsibly.",
    overview: "A student-founded campus laundry delivery startup raised $45,000 from an alumni pitch contest. They currently make $8,000/month during the school year with $6,000/month in operating expenses. But summer is coming: for 3 months, 80% of campus leaves. The founders want to know if they will run out of cash.",
    skillsGained: ["Financial Modeling", "Cash Runway Analysis", "Burn Rate Calculation", "Stress-Testing"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Calculate the Current Monthly Burn Rate",
        context: "During summer (June, July, August), revenue will plummet from $8,000 to only $1,500/month. Fixed expenses (van lease, storage, software) are $4,500/month.",
        question: "What is their monthly net burn rate during the summer months?",
        options: [
          {
            id: "a",
            title: "$3,000 net burn per month ($4,500 expenses - $1,500 revenue)",
            explanation: "Net burn represents the actual cash draining from the bank account each month.",
            feedbackType: "success",
            feedback: "Accurate financial baseline! Over 3 summer months, the venture will drain $9,000 of their remaining cash reserves."
          },
          {
            id: "b",
            title: "They are making $50,000 profit every week",
            explanation: "Failing to account for fixed overhead leads directly to business bankruptcy.",
            feedbackType: "warning",
            feedback: "Ignoring fixed costs resulted in negative cash and missed payroll."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Stress-Test for Delayed Fall Re-opening",
        context: "What happens if fall semester enrollment is delayed by 1 month, pushing resumption of normal revenue to October?",
        question: "With $30,000 left in the bank, what is their total runway buffer?",
        options: [
          {
            id: "a",
            title: "10 months of total runway: They easily survive the 3 summer months plus an extra delay month with $18,000 in safety reserves remaining",
            explanation: "Calculating runway ($30,000 / $3,000 = 10 months) confirms they have a healthy liquidity cushion.",
            feedbackType: "success",
            feedback: "Outstanding risk analysis! The founders felt immense relief seeing that their cash cushion comfortably covers seasonal downturns."
          },
          {
            id: "b",
            title: "They will go bankrupt by next Monday",
            explanation: "Panic without math leads to bad, frantic decisions.",
            feedbackType: "warning",
            feedback: "Panic led the team to sell equity cheaply out of unnecessary fear."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Strategic Capital Recommendation",
        context: "The founders want to spend $20,000 on a giant billboard right before summer starts.",
        question: "What is your fiduciary advice as their financial analyst?",
        options: [
          {
            id: "a",
            title: "Pause the billboard: Spending $20,000 right as students leave burns 66% of their safety cash on empty streets. Save the marketing budget for August move-in week",
            explanation: "Capital timing is everything: deploy marketing spend when target customers are present and ready to purchase.",
            feedbackType: "success",
            feedback: "Heroic financial stewardship! By saving the cash for August, their move-in campaign captured 600 new recurring subscribers, doubling revenue to $16,000/month!"
          },
          {
            id: "b",
            title: "Spend all $30,000 on luxury company sports cars",
            explanation: "Reckless capital destruction guaranteed to end in insolvency.",
            feedbackType: "warning",
            feedback: "The company ran out of money in June and had to shut down."
          }
        ]
      }
    ],
    takeaway: "You practiced real financial modeling: calculating monthly net burn rate, stress-testing cash runways through seasonal dips, and guiding strategic marketing capital deployment."
  },

  // 21. Sustainable Architect (Social Impact 3)
  {
    id: "sustainable-architect-experiment",
    categoryId: "social-impact",
    categoryName: "Social Impact",
    careerId: "sustainable-architect",
    title: "Sustainable Architect: The Zero-Energy Study Pavilion",
    roleName: "Sustainable Architect",
    timeEstimate: "5 mins",
    difficulty: "Beginner Friendly",
    tagline: "Design a passive-cooling student study pavilion that stays 15°F cooler using zero electricity for AC",
    objective: "Master passive solar design, natural cross-ventilation, thermal mass materials, and daylighting geometry.",
    instructions: "Align building orientation to prevailing summer breezes, integrate thermal earth mass, and optimize solar overhangs.",
    expectedOutcome: "Understand how sustainable architects design buildings that harmonize with nature and eliminate carbon emissions.",
    overview: "The university wants an open-air student study pavilion in the center of campus. Summer temperatures reach 95°F. The university cannot afford to run high-powered commercial air conditioning outdoors. You are tasked with designing an architectural structure that naturally cools itself.",
    skillsGained: ["Passive Solar Design", "Thermal Mass Engineering", "Natural Ventilation", "Embodied Carbon Reduction"],
    stages: [
      {
        stageNumber: 1,
        title: "Step 1: Harness Natural Cross-Ventilation (The Stack Effect)",
        context: "Warm air naturally rises, while cool air stays near the ground.",
        question: "What architectural roof geometry creates continuous natural airflow without electric fans?",
        options: [
          {
            id: "a",
            title: "A pitched clerestory roof with high open louvers: Warm air exhausts out the top, drawing continuous cool breezes in from low shaded garden openings",
            explanation: "The thermal chimney (stack effect) drives natural, self-powered airflow through thermal buoyancy.",
            feedbackType: "success",
            feedback: "Spectacular architectural physics! Hot air rises and exhausts out the top, creating a continuous 3 mph refreshing breeze across student desks!"
          },
          {
            id: "b",
            title: "A completely sealed glass greenhouse cube",
            explanation: "Sealed glass traps solar heat, turning the pavilion into an unbearable 120°F oven.",
            feedbackType: "warning",
            feedback: "The glass cube became boiling hot within 10 minutes of sunrise."
          }
        ]
      },
      {
        stageNumber: 2,
        title: "Step 2: Choose Low-Carbon Thermal Mass",
        context: "What floor and wall materials naturally absorb daytime heat and release it safely after sunset?",
        question: "Which material provides high thermal cooling with low embodied carbon?",
        options: [
          {
            id: "a",
            title: "Rammed earth & locally quarried limestone floors shaded by deciduous vine trellises",
            explanation: "Rammed earth has immense thermal mass, absorbing heat during peak afternoon hours and maintaining a cool surface.",
            feedbackType: "success",
            feedback: "Exceptional material craft! The rammed earth walls stayed cool to the touch all afternoon, keeping desk temperatures at a comfortable 78°F!"
          },
          {
            id: "b",
            title: "Black corrugated steel sheet metal",
            explanation: "Sheet metal has low thermal mass and conducts intense heat straight onto students.",
            feedbackType: "warning",
            feedback: "The metal radiated intense heat, making it impossible to sit nearby."
          }
        ]
      },
      {
        stageNumber: 3,
        title: "Step 3: Calculate Solar Roof Overhangs",
        context: "Summer sun is high in the sky (70° angle); winter sun is low (30° angle). How do you block summer heat while letting winter light in?",
        question: "What roof overhang design balances summer shading with winter warmth?",
        options: [
          {
            id: "a",
            title: "Deep south-facing louvers tuned to 70°: Completely blocks intense summer sun, but allows low warm winter rays to flood deep into the pavilion",
            explanation: "Passive solar geometry blocks overhead summer heat while naturally heating the building in winter.",
            feedbackType: "success",
            feedback: "Architectural masterpiece! The pavilion uses zero kilowatt-hours of electricity for cooling, won the American Institute of Architects student design award, and became the most popular study oasis on campus!"
          },
          {
            id: "b",
            title: "No roof at all",
            explanation: "Zero roof provides zero sun protection and leaves students exposed to rain.",
            feedbackType: "warning",
            feedback: "Students couldn't see their laptop screens due to blinding direct sun."
          }
        ]
      }
    ],
    takeaway: "You practiced sustainable architecture: harnessing natural thermal buoyancy, using low-carbon rammed earth mass, and engineering passive solar overhangs."
  }
];

/**
 * Filter experiments by category
 */
export const getExperimentsByCategory = (categoryId) => {
  if (!categoryId || categoryId === 'all') return careerExperiments;
  return careerExperiments.filter((exp) => exp.categoryId === categoryId);
};

/**
 * Recommend top experiments based on student profile (personality archetype & interest results)
 */
export const getRecommendedExperiments = (studentProfile = {}) => {
  const completed = studentProfile.completedExperiments || [];
  const uncompleted = careerExperiments.filter((exp) => !completed.includes(exp.id));

  // Determine user's top interest domain if available
  const topInterestId = studentProfile.interestResult?.topThree?.[0]?.id;

  // Domain to experiment category mapping
  const mapping = {
    technology: ['technology-coding', 'data-analytics'],
    design: ['ui-ux-design', 'creative-thinking'],
    business: ['business-entrepreneurship', 'communication-leadership'],
    science: ['science-research', 'social-impact'],
    healthcare: ['science-research', 'psychology-human-behaviour'],
    psychology: ['psychology-human-behaviour', 'ui-ux-design'],
    finance: ['data-analytics', 'business-entrepreneurship'],
    communication: ['communication-leadership', 'creative-thinking'],
    education: ['psychology-human-behaviour', 'communication-leadership'],
    impact: ['social-impact', 'problem-solving']
  };

  const targetCategories = topInterestId && mapping[topInterestId]
    ? mapping[topInterestId]
    : ['ui-ux-design', 'technology-coding', 'social-impact'];

  const matched = uncompleted.filter((exp) => targetCategories.includes(exp.categoryId));
  
  if (matched.length >= 3) {
    return matched.slice(0, 3);
  }

  // Fallback to top uncompleted
  return uncompleted.slice(0, 3);
};
