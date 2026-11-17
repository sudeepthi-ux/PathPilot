export const inspirationalQuotes = [
  {
    id: 1,
    quote: "Your future is not something you find. It's something you create, one discovery at a time.",
    author: "PathPilot Student Philosophy",
    category: "Self-Discovery"
  },
  {
    id: 2,
    quote: "Your future begins with understanding yourself.",
    author: "PathPilot Core Manifesto",
    category: "Clarity"
  },
  {
    id: 2,
    quote: "Every discovery brings you closer to your purpose.",
    author: "PathPilot Discovery Ethos",
    category: "Exploration"
  },
  {
    id: 3,
    quote: "Small steps today. Extraordinary possibilities tomorrow.",
    author: "Principles of Compounding Trajectory",
    category: "Momentum"
  },
  {
    id: 4,
    quote: "Where your talents and the needs of the world cross, there lies your vocation.",
    author: "Aristotle",
    category: "Conviction"
  },
  {
    id: 5,
    quote: "The best way to predict your future is to invent it.",
    author: "Alan Kay",
    category: "Agency"
  },
  {
    id: 6,
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    category: "Craftsmanship"
  },
  {
    id: 7,
    quote: "Do not go where the path may lead; go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    category: "Pioneering"
  },
  {
    id: 8,
    quote: "Conviction comes from evidence, not reassurance. Build the evidence first.",
    author: "PathPilot Career Research",
    category: "Rigor"
  }
];

export const getRandomQuote = () => {
  const index = Math.floor(Math.random() * inspirationalQuotes.length);
  return inspirationalQuotes[index];
};
