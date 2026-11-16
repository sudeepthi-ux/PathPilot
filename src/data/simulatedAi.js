export const sampleAiPrompts = [
  {
    id: "econ-ds",
    title: "Economics + Data Science",
    prompt: "I'm majoring in Economics and Data Science, but I don't want traditional Wall Street banking. What high-impact alternatives exist?",
    category: "Cross-Discipline Career Synthesis",
    analysis: {
      roleSuggestion: "Algorithmic Market Mechanism Designer & Climate Carbon Modeler",
      matchScore: "97% Trajectory Fit",
      marketDemand: "Extreme Shortage (+38% YoY)",
      compensationRange: "$135,000 - $185,000 base + equity",
      keyInsights: [
        "Modern energy markets & grid auctions require mechanism design (game theory) combined with real-time time-series modeling.",
        "Traditional investment banks are experiencing talent saturation, whereas Clean Grid VPP software and decentralized logistics are aggressively hiring.",
        "Your unique edge: You understand both behavioral incentive structures (Econ) and high-throughput data pipelines (Data Science)."
      ],
      roadmapMilestones: [
        { term: "Semester 1", task: "Build an auction simulation notebook modeling peak electricity dynamic pricing with Python SimPy." },
        { term: "Semester 2", task: "Contribute to open-source DER (Distributed Energy Resource) dispatch tools." },
        { term: "Semester 3", task: "Target internships at Grid Software platforms (e.g. Leap, Form Energy, Voltus)." }
      ]
    }
  },
  {
    id: "bio-design",
    title: "Biology + Visual Interaction",
    prompt: "I love cellular biology and visual art. Is there a career combining wet-lab understanding with cutting-edge digital product design?",
    category: "Bio-Computational UI Vanguard",
    analysis: {
      roleSuggestion: "Scientific Visualization & Bio-Software Experience Designer",
      matchScore: "96% Trajectory Fit",
      marketDemand: "High Niche Demand (+29% YoY)",
      compensationRange: "$120,000 - $165,000 base",
      keyInsights: [
        "Therapeutics companies lose thousands of research hours due to clunky bioinformatics software that only terminal wizards can navigate.",
        "There is an acute shortage of designers who comprehend genomic coordinate systems, protein fold representations (PDB), and RNA spatial arrays.",
        "Bridging this gap places you in the top 1% of specialized biotech UX designers."
      ],
      roadmapMilestones: [
        { term: "Semester 1", task: "Redesign the user experience of an open-source genome browser (e.g., IGV or UCSC Genome Browser)." },
        { term: "Semester 2", task: "Learn WebGL and Three.js for 3D macromolecular rendering directly in modern browsers." },
        { term: "Semester 3", task: "Portfolio defense with synthetic biology and clinical lab design leaders." }
      ]
    }
  },
  {
    id: "ai-vs-cloud",
    title: "AI Systems vs Cloud Infra",
    prompt: "Compare AI Systems Architect vs Cloud Infrastructure Engineer for the 2026-2030 job market. Which offers higher leverage?",
    category: "5-Year Strategic Horizon Analysis",
    analysis: {
      roleSuggestion: "Specialized AI Inference Infrastructure Architect",
      matchScore: "95% Trajectory Fit",
      marketDemand: "Highest Tier (+44% YoY)",
      compensationRange: "$160,000 - $275,000 total comp",
      keyInsights: [
        "Traditional generic cloud engineering is facing moderate automation from generative infrastructure-as-code agents.",
        "Conversely, heterogeneous accelerator clusters (GPUs, TPUs, custom ASICs) with ultra-low latency interconnects (InfiniBand/RoCE) have unprecedented demand.",
        "The highest leverage student profile: Cloud fundamentals (K8s, distributed storage) combined with CUDA kernel optimization."
      ],
      roadmapMilestones: [
        { term: "Semester 1", task: "Deep dive into distributed PyTorch: FSDP, tensor parallelism, and vLLM architecture." },
        { term: "Semester 2", task: "Deploy an open-weights model on a self-hosted clustered Kubernetes node with Prometheus telemetry." },
        { term: "Semester 3", task: "Benchmark inference cost-per-million-tokens trade-offs under quantization (AWQ vs GPTQ)." }
      ]
    }
  },
  {
    id: "robotics-portfolio",
    title: "Robotics Internship Readiness",
    prompt: "What 3 portfolio projects should a sophomore student build to stand out for autonomous robotics internships?",
    category: "Portfolio Engineering Blueprint",
    analysis: {
      roleSuggestion: "Autonomous Perception & Navigation Engineer",
      matchScore: "99% Actionable Clarity",
      marketDemand: "Rapidly Expanding (+34% YoY)",
      compensationRange: "$48 - $72 / hour internship comp ($140k+ FT)",
      keyInsights: [
        "Generic coursework projects (like line-following Arduino bots) are instantly discarded by top perception hiring managers.",
        "Hiring managers look for real-world telemetry noise, sensor calibration challenges, and real-time computation budgets.",
        "Code quality, CI/CD, and reproducible Docker environments count as much as the algorithm itself."
      ],
      roadmapMilestones: [
        { term: "Project 1", task: "Visual-Inertial Odometry pipeline with ROS2 and synthetic Gazebo environment." },
        { term: "Project 2", task: "Point cloud object detection & tracking utilizing sensor fusion with camera & simulated LiDAR." },
        { term: "Project 3", task: "Edge-deployed obstacle avoidance running at 30+ FPS on an embedded Jetson board." }
      ]
    }
  }
];

export const discoveryClusters = [
  {
    id: "curiosity",
    label: "Core Curiosity",
    options: [
      { id: "ai", label: "Artificial Intelligence & Models", icon: "Brain" },
      { id: "bio", label: "Biology & Human Health", icon: "HeartPulse" },
      { id: "climate", label: "Climate & Planetary Systems", icon: "Globe" },
      { id: "design", label: "Visual Design & Psychology", icon: "Palette" },
      { id: "quant", label: "Markets & Mathematical Rigor", icon: "TrendingUp" },
      { id: "robotics", label: "Hardware & Physical Autonomy", icon: "Cpu" }
    ]
  },
  {
    id: "workstyle",
    label: "Workstyle Dynamics",
    options: [
      { id: "deep-focus", label: "Deep Solo Research & Building", icon: "Focus" },
      { id: "collaborative", label: "Cross-Discipline Orchestration", icon: "Users" },
      { id: "rapid-prototype", label: "High-Velocity Experimentation", icon: "Zap" },
      { id: "high-precision", label: "Zero-Error Mission Critical", icon: "Target" }
    ]
  },
  {
    id: "impactTarget",
    label: "Impact Horizon",
    options: [
      { id: "frontier-tech", label: "Frontier Sci-Tech Discovery", icon: "Sparkles" },
      { id: "societal-good", label: "Human Wellbeing & Sustainability", icon: "HeartHandshake" },
      { id: "enterprise-scale", label: "Global Scale & Efficiency", icon: "Building2" },
      { id: "founder-path", label: "Venture Creation & Autonomy", icon: "Rocket" }
    ]
  }
];
