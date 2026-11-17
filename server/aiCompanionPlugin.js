import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function loadServerEnv() {
  const envVars = {};
  for (const envFile of ['.env', '.env.local']) {
    const filePath = path.join(ROOT_DIR, envFile);
    if (!fs.existsSync(filePath)) continue;
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;
        const eqIdx = line.indexOf('=');
        if (eqIdx === -1) continue;
        const key = line.slice(0, eqIdx).trim();
        let val = line.slice(eqIdx + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (key) envVars[key] = val;
      }
    } catch {
      // Ignore parse warnings
    }
  }
  return { ...envVars, ...process.env };
}

function getGeminiApiKey() {
  const env = loadServerEnv();
  const key = env.GEMINI_API_KEY || '';
  if (
    !key ||
    key.includes('your-gemini-api-key') ||
    key.includes('your-api-key') ||
    key.includes('placeholder')
  ) {
    return null;
  }
  return key.trim();
}

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string' && req.body.length > 0) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.reject(new Error('Invalid JSON request body'));
    }
  }
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function sanitizeForSpeech(text = '') {
  return String(text)
    .replace(/[*_`#>]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatStudentContextSummary(ctx = {}) {
  const parts = [];
  if (ctx.name) parts.push(`Name: ${ctx.name}`);
  if (ctx.university) parts.push(`University: ${ctx.university}`);
  if (ctx.major) parts.push(`Major: ${ctx.major}`);
  if (ctx.targetIndustry) parts.push(`Target focus: ${ctx.targetIndustry}`);
  if (ctx.personalityArchetype) parts.push(`Personality style: ${ctx.personalityArchetype}`);
  if (Array.isArray(ctx.strengths) && ctx.strengths.length > 0) {
    parts.push(`Strengths: ${ctx.strengths.join(', ')}`);
  }
  if (Array.isArray(ctx.topInterests) && ctx.topInterests.length > 0) {
    parts.push(
      `Measured Interests: ${ctx.topInterests
        .map((i) => `${i.name} (${i.percentage}%)`)
        .join(', ')}`
    );
  }
  if (ctx.careerDiscoveryResult) {
    const cdr = ctx.careerDiscoveryResult;
    const topMatches = (cdr.matches || [])
      .slice(0, 3)
      .map((m) => `${m.career?.title || m.careerId} (${m.score}%)`)
      .join(', ');
    parts.push(`Career Discovery Matches: ${topMatches || 'computed'}`);
  }
  if (Array.isArray(ctx.completedExperimentTitles) && ctx.completedExperimentTitles.length > 0) {
    parts.push(`Completed experiments: ${ctx.completedExperimentTitles.join('; ')}`);
  }
  if (Array.isArray(ctx.discoveredSkills) && ctx.discoveredSkills.length > 0) {
    parts.push(`Discovered skills: ${ctx.discoveredSkills.join(', ')}`);
  }
  if (Array.isArray(ctx.savedCareers) && ctx.savedCareers.length > 0) {
    parts.push(`Saved careers: ${ctx.savedCareers.join(', ')}`);
  }
  if (Array.isArray(ctx.skillGapSummaries) && ctx.skillGapSummaries.length > 0) {
    parts.push(
      `Skill Gap Analyses: ${ctx.skillGapSummaries
        .map((s) => `${s.careerTitle} (${s.readinessScore ?? 'evaluated'}% ready, gaps: ${(s.missingSkills || []).join(', ') || 'none'})`)
        .join('; ')}`
    );
  }
  if (Array.isArray(ctx.roadmapSummaries) && ctx.roadmapSummaries.length > 0) {
    parts.push(
      `Learning Roadmaps: ${ctx.roadmapSummaries
        .map((r) => `${r.careerTitle} (${r.completedSteps} activities done)`)
        .join('; ')}`
    );
  }
  return parts.length > 0 ? parts.join('\n') : 'No assessments, experiments, or saved careers recorded yet.';
}

const TELUGU_SCRIPT_RE = /[\u0C00-\u0C7F]/;

const TANGLISH_MARKERS = [
  /\bnaku\b/i,
  /\bnaaku\b/i,
  /\bnenu\b/i,
  /\bna\s+(?:strengths?|career|interest|doubt|future|branch)\b/i,
  /\bnaa\b/i,
  /\benti\b/i,
  /\bem\s*chey/i,
  /\bchepp/i,
  /\bardham\b/i,
  /\bavvatledu\b/i,
  /\bavuthundi\b/i,
  /\bvellali\b/i,
  /\banukuntunna\b/i,
  /\bishtam\b/i,
  /\bante\s+(?:interest|ishtam)/i,
  /\bbhayam\b/i,
  /\btarvata\b/i,
  /\bkoncham\b/i,
  /\bkasta\b/i,
  /\bkani\b/i,
  /\bundi\b/i,
  /\bledu\b/i,
  /\bradhu\b/i,
  /\bradu\b/i,
  /\bbagunt/i,
  /\bela\b/i,
  /\bendi\b/i,
  /\bteliyatledu\b/i,
  /\bippudu\b/i,
  /\bnerchuk/i,
  /\bmanchi\b/i,
  /\bavunu\b/i,
  /\bcheskoval/i
];

/**
 * Determines reply language strictly from user's message & explicit language mode:
 * 'telugu' (తెలుగు script), 'tanglish' (mixed Telugu-English), or 'english'.
 */
export function detectMessageLanguage(message = '', preferredLanguage = 'auto', conversationHistory = []) {
  const clean = String(message || '').trim();
  if (TELUGU_SCRIPT_RE.test(clean)) return 'telugu';
  if (TANGLISH_MARKERS.some((re) => re.test(clean))) return 'tanglish';

  // Explicit mode chosen in UI controls
  if (preferredLanguage === 'te-IN') {
    // Unless user wrote a clear multi-word English sentence intentionally
    const englishWordCount = clean.split(/\s+/).filter((w) => /^[a-zA-Z]{2,}$/.test(w)).length;
    if (englishWordCount < 4) return 'telugu';
  }
  if (preferredLanguage === 'tanglish') {
    const wordCount = clean.split(/\s+/).filter(Boolean).length;
    if (wordCount <= 3) return 'tanglish';
  }

  // Carry over language only on very short ambiguous acknowledgements ("yes", "ok", "hmm", "tell more")
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    const prevAssistant = [...conversationHistory].reverse().find((m) => m.role === 'assistant');
    if (prevAssistant?.text && TELUGU_SCRIPT_RE.test(prevAssistant.text)) return 'telugu';
    if (prevAssistant?.text && TANGLISH_MARKERS.some((re) => re.test(prevAssistant.text))) return 'tanglish';
  }

  return 'english';
}

const DISLIKE_CODING_RE =
  /\b(don'?t\s+like\s+coding|dislike\s+coding|hate\s+coding|no\s+coding|without\s+coding|not\s+coding|not\s+interested\s+in\s+coding|hate\s+programming|dislike\s+programming|don'?t\s+want\s+to\s+code|avoid\s+coding|coding\s+(?:nachadu|radhu|radu|odu|bore|oddu))\b/i;

const DISLIKE_MATH_RE =
  /\b(don'?t\s+like\s+math|dislike\s+math|hate\s+math|math\s+(?:nachadu|radhu|radu|bhayam|fear))\b/i;

const INTEREST_PATTERNS = [
  { key: 'robotics', re: /\b(robotics?|robots?|mechatronics|automation|embedded\s*systems?|drones?|autonomous\s*systems?)\b/i },
  { key: 'mechanical_eng', re: /\b(mechanical|cad|solidworks|machines?|automotive|thermodynamics)\b/i },
  { key: 'electrical_ece', re: /\b(electrical|electronics|circuits?|chips?|vlsi|semiconductors?|microcontroller|sensors?)\b/i },
  { key: 'aerospace', re: /\b(aerospace|aviation|aircraft|space|rocket|satellite|aerodynamics)\b/i },
  { key: 'civil_eng', re: /\b(civil|infrastructure|bridges?|structures?|construction|structural)\b/i },
  { key: 'quantum_tech', re: /\b(quantum|qubits?|quantum\s*computing)\b/i },
  { key: 'iot', re: /\b(iot|internet\s*of\s*things|connected\s*devices|smart\s*home)\b/i },
  { key: 'ar_vr', re: /\b(ar|vr|augmented\s*reality|virtual\s*reality|spatial\s*computing|metaverse)\b/i },
  { key: 'cloud_infra', re: /\b(cloud|aws|azure|gcp|devops|kubernetes|docker|distributed\s*systems)\b/i },
  { key: 'blockchain', re: /\b(blockchain|web3|crypto|smart\s*contracts?|ethereum|solidity)\b/i },
  { key: 'science_research', re: /\b(astrophysics|space\s*science|genetics|dna|neuroscience|brain\s*science|materials?\s*science|physics|chemistry)\b/i },
  { key: 'psychology', re: /\b(psychology|human\s*behavior|behaviour|mental\s*health|therapy|counseling|cognition)\b/i },
  { key: 'economics_finance', re: /\b(economics|finance|economist|markets|financial\s*model|macroeconomics|valuation)\b/i },
  { key: 'industrial_design', re: /\b(industrial\s*design|physical\s*product\s*design|ergonomics|hardware\s*design)\b/i },
  { key: 'design', re: /\b(design|designing|ui|ux|figma|visual|sketch|creative|art|graphic|drawing|interface|wireframe|layouts?)\b/i },
  { key: 'coding', re: /\b(coding|code|programming|software|developer|web\s*dev|python|javascript|java|frontend|backend|full[- ]?stack|algorithms?)\b/i },
  { key: 'ai_data', re: /\b(ai|artificial\s*intelligence|machine\s*learning|data|analytics|data\s*science|statistics|models|deep\s*learning|python\s*data)\b/i },
  { key: 'business_pm', re: /\b(business|startup|founder|entrepreneur|product\s*manag|pm\b|mba|marketing|strategy|leadership|management)\b/i },
  { key: 'biotech_health', re: /\b(bio|biology|biotech|health|healthcare|medicine|medical|doctor|pharma|clinical)\b/i },
  { key: 'cybersecurity', re: /\b(cyber|security|ethical\s*hacking|infosec|network\s*security|privacy)\b/i },
  { key: 'climate', re: /\b(climate|energy|clean\s*energy|sustainable|sustainability|environment|green)\b/i }
];

const CAREER_RECOMMENDATIONS_BY_INTEREST = {
  robotics: ['robotics-engineer', 'mechatronics-engineer', 'automation-engineer', 'autonomous-systems-engineer', 'drone-systems-engineer'],
  mechanical_eng: ['mechanical-engineer', 'robotics-engineer', 'industrial-designer'],
  electrical_ece: ['electronics-engineer', 'electrical-engineer', 'embedded-systems-engineer'],
  aerospace: ['aerospace-engineer', 'drone-systems-engineer', 'autonomous-systems-engineer'],
  civil_eng: ['civil-engineer', 'sustainable-architect'],
  quantum_tech: ['quantum-computing-engineer', 'ai-engineer'],
  iot: ['iot-systems-engineer', 'embedded-systems-engineer', 'robotics-engineer'],
  ar_vr: ['ar-vr-developer', 'creative-technologist', 'product-designer'],
  cloud_infra: ['cloud-architect', 'software-engineer', 'cybersecurity-analyst'],
  blockchain: ['blockchain-developer', 'software-engineer'],
  science_research: ['astrophysicist', 'neuroscientist', 'geneticist', 'materials-scientist', 'biotechnologist'],
  psychology: ['clinical-psychologist', 'user-researcher'],
  economics_finance: ['economist', 'financial-analyst'],
  industrial_design: ['industrial-designer', 'product-designer'],
  design: ['product-designer', 'creative-technologist', 'graphic-designer', 'industrial-designer'],
  coding: ['software-engineer', 'ai-engineer', 'cloud-architect'],
  ai_data: ['ai-engineer', 'computational-biologist', 'ai-robotics-specialist'],
  business_pm: ['product-manager', 'startup-founder', 'digital-marketing-specialist', 'research-innovation-strategist'],
  biotech_health: ['biotechnologist', 'biomedical-engineer', 'digital-health-specialist', 'computational-biologist'],
  cybersecurity: ['cybersecurity-analyst', 'cloud-architect'],
  climate: ['clean-energy-analyst', 'environmental-scientist', 'sustainable-architect']
};

/**
 * Extracts student preferences, mentioned fields, doubts, and prior assistant texts
 * from the live conversation history & PathPilot profile so AIRA never repeats herself
 * and accurately remembers earlier user details.
 */
export function extractConversationMemory(conversationHistory = [], studentContext = {}) {
  const mentionedInterests = new Set();
  let lastMentionedInterest = null;
  const studentStatements = [];
  const previousAssistantTexts = new Set();
  let dislikesCoding = false;
  let dislikesMath = false;

  for (const turn of conversationHistory || []) {
    if (!turn || !turn.text) continue;
    if (turn.role === 'user') {
      studentStatements.push(turn.text);
      if (DISLIKE_CODING_RE.test(turn.text)) {
        dislikesCoding = true;
      }
      if (DISLIKE_MATH_RE.test(turn.text)) {
        dislikesMath = true;
      }
      for (const pat of INTEREST_PATTERNS) {
        if (pat.re.test(turn.text)) {
          // If student explicitly dislikes coding, never add coding to positive interests
          if (pat.key === 'coding' && (dislikesCoding || DISLIKE_CODING_RE.test(turn.text))) {
            continue;
          }
          mentionedInterests.add(pat.key);
          lastMentionedInterest = pat.key;
        }
      }
    } else if (turn.role === 'assistant') {
      previousAssistantTexts.add(turn.text.trim());
    }
  }

  // If student ever disliked coding, purge coding from positive interests
  if (dislikesCoding) {
    mentionedInterests.delete('coding');
    if (lastMentionedInterest === 'coding') {
      lastMentionedInterest = null;
    }
  }

  // Merge real PathPilot interest assessment if available
  const topInterest = studentContext?.topInterests?.[0] || null;
  if (topInterest?.id === 'design') mentionedInterests.add('design');
  if (topInterest?.id === 'technology' && !dislikesCoding) mentionedInterests.add('coding');
  if (topInterest?.id === 'healthcare' || topInterest?.id === 'science') mentionedInterests.add('biotech_health');
  if (topInterest?.id === 'business' || topInterest?.id === 'finance') mentionedInterests.add('business_pm');
  if (topInterest?.id === 'psychology') mentionedInterests.add('psychology');

  const recentAssistant = [...(conversationHistory || [])]
    .reverse()
    .find((m) => m.role === 'assistant')?.text || '';

  return {
    mentionedInterests: [...mentionedInterests],
    lastMentionedInterest,
    studentStatements,
    previousAssistantTexts,
    dislikesCoding,
    dislikesMath,
    recentAssistant: recentAssistant.toLowerCase(),
    turnCount: studentStatements.length
  };
}

/**
 * Picks a response variant not already spoken earlier in the session to guarantee variety.
 */
function pickFreshResponse(candidates, previousAssistantTexts) {
  for (const cand of candidates) {
    if (!previousAssistantTexts.has(cand.text.trim())) {
      return cand;
    }
  }
  return candidates[candidates.length - 1];
}

function formatName(ctx) {
  const first = ctx?.name ? String(ctx.name).trim().split(' ')[0] : '';
  return first;
}

async function callServerGemini({
  apiKey,
  message,
  conversationHistory,
  studentContext,
  starterAction,
  preferredLanguage,
  detectedLang,
  memory
}) {
  const contextText = formatStudentContextSummary(studentContext);
  const recentTurns = (conversationHistory || [])
    .slice(-10)
    .map((m) => `${m.role === 'user' ? 'Student' : 'AIRA'}: ${m.text}`)
    .join('\n');

  const systemPrompt = `You are AIRA, PathPilot's warm, intelligent, genuine female AI career mentor and friend.

CRITICAL CONVERSATION RULES:
- Your name is AIRA and your persona is warm, approachable, supportive, sharp, and honest.
- Understand the EXACT meaning and intent behind the student's message—never give generic motivational clichés or repeat earlier replies.
- STRICTLY RESPECT LIKES AND DISLIKES:
  * If the student states they dislike, hate, or want to avoid coding/programming (e.g., "I don't like coding, but I love robotics"), NEVER say "Since you like coding" and NEVER recommend pure software engineering or web/app coding roles!
  * Instead, enthusiastically validate their love for robotics and explain the tangible physical & hardware avenues: mechanical CAD design, electronics & sensors, mechatronics, and industrial automation. Ask: "What attracts you most about building robots?"
  * If they dislike math, suggest fields where heavy calculus is not required (UI/UX design, frontend, product management, biology).
- Use conversation memory: Student previously expressed interests in [${memory.mentionedInterests.join(', ') || 'none'}], dislikes coding: ${memory.dislikesCoding ? 'YES' : 'No'}. Reference what they told you naturally.
- Use ONLY verified facts from VERIFIED PATHPILOT DATA below. NEVER invent scores or strengths that aren't listed.
- Match the student's language naturally:
  * Detected language for this message: "${detectedLang}" (mode hint: "${preferredLanguage}").
  * If "english": respond strictly in natural, conversational English.
  * If "telugu": respond in warm conversational Telugu script (తెలుగు), AND also provide "spokenTextFallback" in clean phonetic Romanized Telugu so voices without native Telugu TTS can pronounce it naturally!
  * If "tanglish": respond in natural Telugu-English mix written cleanly in Romanized Telugu + English (e.g., "Naku design ante chala ishtam ani cheppav kada...") matching student style.
- Adapt response length to the question (1–2 crisp sentences for short conversational remarks; 2–4 thoughtful sentences when explaining comparisons or roadmaps).

VERIFIED PATHPILOT DATA:
${contextText}

${starterAction ? `ACTIVE QUICK TOPIC: ${starterAction}` : ''}

VALID CAREER IDs:
product-designer, creative-technologist, graphic-designer, software-engineer, ai-engineer, cybersecurity-analyst, product-manager, startup-founder, financial-analyst, computational-biologist, digital-health-specialist, user-researcher, learning-experience-designer, content-strategist, digital-marketing-specialist, sustainable-architect, tech-policy-counsel, biomedical-scientist, policy-analyst, experience-curator, clean-energy-analyst, robotics-engineer, automation-engineer, mechatronics-engineer, autonomous-systems-engineer, embedded-systems-engineer, ai-robotics-specialist, drone-systems-engineer, human-robot-interaction-designer, industrial-robotics-specialist, robotics-research-scientist, mechanical-engineer, electrical-engineer, electronics-engineer, civil-engineer, aerospace-engineer, biomedical-engineer, chemical-engineer, quantum-computing-engineer, iot-systems-engineer, ar-vr-developer, cloud-architect, blockchain-developer, astrophysicist, biotechnologist, geneticist, environmental-scientist, neuroscientist, materials-scientist, clinical-psychologist, economist, industrial-designer, research-innovation-strategist

Return strict JSON:
{
  "text": "AIRA's reply for display & speech.",
  "spokenTextFallback": "If text uses Telugu script, clear phonetic Latin script version for non-Telugu browser TTS; otherwise null.",
  "emotion": "warm | encouraging | curious | clarifying | thoughtful | serious | happy | empathetic",
  "recommendedCareerIds": ["0-to-2-career-ids"],
  "followUps": ["2-or-3-relevant-next-student-prompts"]
}`;

  const userPrompt = recentTurns
    ? `Recent dialogue:\n${recentTurns}\n\nStudent now says: "${message}"`
    : `Student says: "${message}"`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.72
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API status ${response.status}`);
  }

  const json = await response.json();
  const raw = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error('Empty Gemini response');

  const parsed = JSON.parse(raw);
  const text = String(parsed.text || '').trim();
  return {
    text,
    spokenText: sanitizeForSpeech(text),
    spokenTextFallback: parsed.spokenTextFallback ? sanitizeForSpeech(parsed.spokenTextFallback) : null,
    emotion: parsed.emotion || 'warm',
    language: detectedLang,
    recommendedCareerIds: Array.isArray(parsed.recommendedCareerIds)
      ? parsed.recommendedCareerIds.slice(0, 2)
      : [],
    followUps: Array.isArray(parsed.followUps) ? parsed.followUps.slice(0, 3) : [],
    isLiveApi: true,
    provider: 'gemini-live'
  };
}

/**
 * Intelligent, multi-turn context-aware bilingual (English / Telugu / Tanglish) mentor engine.
 * Replaces repetitive boilerplate with genuine intent matching, memory retention,
 * verified PathPilot profile integration, and anti-repeat selection.
 */
export function buildMentorFallback({
  message = '',
  conversationHistory = [],
  studentContext = {},
  starterAction = null,
  preferredLanguage = 'auto'
}) {
  const q = String(message || '').trim();
  const lower = q.toLowerCase();
  const lang = detectMessageLanguage(q, preferredLanguage, conversationHistory);
  const memory = extractConversationMemory(conversationHistory, studentContext);
  const prevTexts = memory.previousAssistantTexts;

  const firstName = formatName(studentContext);
  const nameTag = firstName ? `, ${firstName}` : '';

  const hasPersonality = Boolean(studentContext?.personalityArchetype);
  const hasInterests = Array.isArray(studentContext?.topInterests) && studentContext.topInterests.length > 0;
  const topInterest = hasInterests ? studentContext.topInterests[0] : null;
  const secondInterest = hasInterests && studentContext.topInterests[1] ? studentContext.topInterests[1] : null;
  const discoveredSkills = studentContext?.discoveredSkills || [];
  const savedCareers = studentContext?.savedCareers || [];
  const skillGaps = studentContext?.skillGapSummaries || [];
  const roadmaps = studentContext?.roadmapSummaries || [];
  const completedCount = (studentContext?.completedExperiments || []).length;

  // Compute best career IDs from active interest memory
  const activeInterestKey = memory.lastMentionedInterest || (memory.mentionedInterests[0] || null);
  const memoryCareerIds = activeInterestKey
    ? (CAREER_RECOMMENDATIONS_BY_INTEREST[activeInterestKey] || []).slice(0, 2)
    : [];

  // ── 0. Quick Conversation Starters ──────────────────────────────────────────
  if (starterAction === 'explore_careers') {
    if (memory.mentionedInterests.includes('design')) {
      return {
        text: `Since design has been on your mind${nameTag}, roles like Product (UI/UX) Designer and Creative Technologist fit well because you shape how people experience products visually and interactively. Would you enjoy sketching app interfaces more, or mixing visuals with light frontend code?`,
        emotion: 'encouraging',
        language: lang,
        recommendedCareerIds: ['product-designer', 'creative-technologist'],
        followUps: ['Sketching app flows & UI', 'Mixing visuals with code', 'What skills does UI/UX need?']
      };
    }
    if (hasInterests && topInterest) {
      const pair = secondInterest
        ? `${topInterest.name} (${topInterest.percentage}%) and ${secondInterest.name} (${secondInterest.percentage}%)`
        : `${topInterest.name} (${topInterest.percentage}%)`;
      const ids = memoryCareerIds.length ? memoryCareerIds : ['product-designer', 'software-engineer'];
      return {
        text: `Your Interest Analyzer points to ${pair}${nameTag}. Instead of guessing blindly, notice what gives you energy between building things hands-on vs. figuring out human needs—which of those feels more like you?`,
        emotion: 'encouraging',
        language: lang,
        recommendedCareerIds: ids,
        followUps: ['Building things hands-on', 'Understanding human behavior', 'Which career fits that mix?']
      };
    }
    return {
      text: `Let's narrow it down simply without any guesswork${nameTag}. When you lose track of time on a college project or hobby, what are you usually doing—coding, designing visuals, analyzing data, or organizing people?`,
      emotion: 'curious',
      language: lang,
      recommendedCareerIds: [],
      followUps: ['Naku coding ante interest undi', 'Nenu design field ki vellali anukuntunna', 'I enjoy solving data puzzles']
    };
  }

  if (starterAction === 'discover_strengths' || /\b(strengths?|talents?|good at|weakness)\b/i.test(lower) || /\bna\s+strengths?\b/i.test(lower) || /బలాలు|నాకు ఏమి వచ్చు/.test(q)) {
    // Combine verified assessment + discovered skills + conversation clues honestly
    if (hasPersonality || discoveredSkills.length > 0) {
      const parts = [];
      if (hasPersonality) {
        const sList = (studentContext.strengths || []).slice(0, 3).join(', ');
        parts.push(`your Personality Assessment shows a "${studentContext.personalityArchetype}" thinking style${sList ? ` (${sList})` : ''}`);
      }
      if (discoveredSkills.length > 0) {
        parts.push(`your completed lab simulations built practical skills in ${discoveredSkills.slice(0, 3).join(', ')}`);
      }
      const evidence = parts.join(', and ');

      if (lang === 'telugu') {
        return {
          text: `మీ ప్రొఫైల్ ప్రకారం${firstName ? ` ${firstName}` : ''}, ${hasPersonality ? `"${studentContext.personalityArchetype}"` : ''} ఆలోచనా శైలి${discoveredSkills.length ? ` మరియు ${discoveredSkills.slice(0, 2).join(', ')} నైపుణ్యాలు` : ''} స్పష్టంగా కనిపిస్తున్నాయి. ఇటీవల కాలేజీ ప్రాజెక్ట్‌లో మీరు ఏ పనిని చాలా సులభంగా పూర్తి చేశారు?`,
          spokenTextFallback: `Mee profile prakaram${nameTag}, ${evidence} clear ga kanipistunnayi. Recent college project lo meeru eh work ni chala easy ga finish chesaru?`,
          emotion: 'encouraging',
          language: 'telugu',
          recommendedCareerIds: memoryCareerIds,
          followUps: ['నాకు సూట్ అయ్యే కెరీర్లు ఏంటి?', 'తర్వాత ఏ స్కిల్ నేర్చుకోవాలి?', 'Tell me in English too']
        };
      }

      if (lang === 'tanglish') {
        return {
          text: `Chudu${nameTag}, mee real PathPilot record prakaram ${evidence}. Ante nuvvu problems ni clear ga structure chesi solve cheyyadam lo strong ga unnav. Ee strengths ni base cheskoni eh role explore cheyyali anukuntunnav?`,
          emotion: 'encouraging',
          language: 'tanglish',
          recommendedCareerIds: memoryCareerIds,
          followUps: ['Naku suit ayye careers cheppu', 'Ippudu next step em cheyali?', 'What skill gap should I check?']
        };
      }

      return {
        text: `Based on your real PathPilot progress${nameTag}, ${evidence}. That combination means you bring real structure and follow-through to unfamiliar problems. Would you like to see which careers put those exact strengths to work daily?`,
        emotion: 'encouraging',
        language: 'english',
        recommendedCareerIds: memoryCareerIds,
        followUps: ['Yes, show matching careers', 'Which skill gap should I work on?', 'Give me a practical next step']
      };
    }

    // No assessment completed yet — use what student shared in conversation honestly, never invent
    const sharedHint = memory.mentionedInterests.length > 0
      ? memory.mentionedInterests.map((k) => k.replace('_', ' ')).join(' & ')
      : null;

    if (lang === 'telugu') {
      return {
        text: `మీరు ఇంకా PathPilot లో Personality Assessment పూర్తి చేయలేదు కాబట్టి నేను నకిలీ స్కోర్లు చెప్పను. ${sharedHint ? `కానీ మీరు ${sharedHint} పట్ల ఆసక్తి చూపారు.` : ''} కాలేజీ గ్రూప్ ప్రాజెక్ట్‌లో మీ ఫ్రెండ్స్ ఎక్కువగా ఏ పని కోసం మీపై ఆధారపడతారు—ఐడియాలు ఇవ్వడమా, డిజైన్ చేయడమా, లేక లాజిక్/కోడింగ్ సమస్యలు పరిష్కరించడమా?`,
        spokenTextFallback: `Meeru inka Personality Assessment complete cheyyaledu kabatti nenu fake scores cheppanu. College group project lo mee friends ekkuvaga eh work kosam mee meeda depend avutaru — ideas ivvadama, design cheyadama, leka coding logic problems solve cheyadama?`,
        emotion: 'clarifying',
        language: 'telugu',
        recommendedCareerIds: [],
        followUps: ['నేను లాజిక్ మరియు టెక్నికల్ పనులు చేస్తాను', 'నేను క్రియేటివ్ మరియు డిజైన్ పనులు చేస్తాను', 'నేను టీమ్‌ని ఆర్గనైజ్ చేస్తాను']
      };
    }

    if (lang === 'tanglish') {
      return {
        text: `Honest ga cheppalante${nameTag}, PathPilot lo inka nee Personality or Strengths assessment record avvaledu${sharedHint ? ` — kani ippati varaku nuvvu ${sharedHint} gurinchi share chesav` : ''}. Oka chinna clue ivvu: college group project lo friends neeku naturally eh work istharu—team organize cheyadama, creative visuals cheyadama, leda tough logic debug cheyadama?`,
        emotion: 'clarifying',
        language: 'tanglish',
        recommendedCareerIds: memoryCareerIds,
        followUps: ['Nenu coding/logic side handle chestanu', 'Nenu design & visuals chustanu', 'Nenu team plans organize chestanu']
      };
    }

    return {
      text: `You haven't taken the PathPilot Personality Assessment yet${nameTag}, so I won't guess or invent fake scores${sharedHint ? `—though I noticed your curiosity around ${sharedHint}` : ''}. Think about your last college group project: did classmates naturally turn to you to plan the work, make things look clear, or figure out tough technical bugs?`,
      emotion: 'clarifying',
      language: 'english',
      recommendedCareerIds: memoryCareerIds,
      followUps: ['I handle technical bugs & logic', 'I focus on visuals and clarity', 'I organize the team and plan']
    };
  }

  // ── 1. Casual Greetings / Openers ───────────────────────────────────────────
  if (/^(hi|hey|hello|hii+|namaste|good morning|good evening|good afternoon|ela unnav|how are you)[!?. ]*$/i.test(q)) {
    if (lang === 'telugu') {
      return {
        text: `హాయ్${firstName ? ` ${firstName}` : ''}! నేను చాలా బాగున్నాను, మీరు ఎలా ఉన్నారు? ఈ రోజు మనం మీ కెరీర్, బ్రాంచ్ లేదా స్కిల్స్ గురించి ఏ విషయంపై మాట్లాడుకుందాం?`,
        spokenTextFallback: `Hi${nameTag}! Nenu chala bagunnanu, meeru ela unnaru? Ee roju manam mee career, branch leda skills gurinchi eh vishayam meeda matladukundam?`,
        emotion: 'warm',
        language: 'telugu',
        recommendedCareerIds: [],
        followUps: ['నాకు ఏ కెరీర్ సెట్ అవుతుందో తెలియడం లేదు', 'నాకు కోడింగ్ అంటే ఆసక్తి ఉంది', 'తర్వాత ఏమి చేయాలో చెప్పు']
      };
    }
    if (lang === 'tanglish') {
      return {
        text: `Hey${nameTag}! Nenu bagunnanu, nuvvu ela unnav? Cheppu—ee roju college studies, coding, design, leda future career clarity gurinchi edaina discuss cheddama?`,
        emotion: 'warm',
        language: 'tanglish',
        recommendedCareerIds: [],
        followUps: ['Naku coding ante interest undi', 'Nenu design field ki vellali anukuntunna', 'Ippudu next em cheyali?']
      };
    }
    return pickFreshResponse(
      [
        {
          text: `Hey${nameTag}! Good to talk with you. What's on your mind today—trying to pick a direction, weighing two fields, or figuring out what skill to learn first?`,
          emotion: 'warm',
          language: 'english',
          recommendedCareerIds: [],
          followUps: ['I do not know which career to choose', 'Tell me about Software vs UI/UX Design', 'What should I do next?']
        },
        {
          text: `Hi${nameTag}! I'm doing great. Tell me what's happening with your classes or career thoughts right now so we can break it down together.`,
          emotion: 'warm',
          language: 'english',
          recommendedCareerIds: [],
          followUps: ['I enjoy designing', 'I want to start coding from scratch', 'Help me compare two majors']
        }
      ],
      prevTexts
    );
  }

  // ── 1b. Dislike Coding + Love Robotics / Hardware (CRITICAL REQUIREMENT #4) ──
  const expressesRobotics =
    /\b(robotics?|robots?|mechatronics|automation|embedded\s*systems?|drones?|hardware\s*robot)\b/i.test(lower) ||
    /రోబోటిక్స్/.test(q);
  const expressesDislikeCoding =
    memory.dislikesCoding || DISLIKE_CODING_RE.test(lower) || /కోడింగ్ ఇష్టం లేదు/.test(q);

  if (expressesRobotics && expressesDislikeCoding) {
    if (lang === 'telugu') {
      return {
        text: `అది చాలా ఆసక్తికరమైన ఆలోచన${firstName ? ` ${firstName}` : ''}! రోబోటిక్స్ అంటే కేవలం సాఫ్ట్‌వేర్ కోడింగ్ మాత్రమే కాదు—మెకానికల్ డిజైన్ (బాడీ మరియు లింక్స్ తయారు చేయడం), ఎలక్ట్రానిక్స్ & సెన్సార్ సర్క్యూట్లు, మెకాట్రానిక్స్ మరియు ఇండస్ట్రియల్ ఆటోమేషన్ వంటి అనేక రంగాలు ఉన్నాయి. రోబోట్‌లను తయారు చేయడంలో మిమ్మల్ని ఏ అంశం ఎక్కువగా ఆకర్షిస్తోంది?`,
        spokenTextFallback: `Adi chala interesting point${nameTag}! Robotics ante kevalam software coding matrame kaadu—mechanical design, electronics & sensors, mechatronics mariyu industrial automation lanti chala options unnayi. Robots build cheyadam lo meeku eh part ekkuva ishtam?`,
        emotion: 'encouraging',
        language: 'telugu',
        recommendedCareerIds: ['robotics-engineer', 'mechatronics-engineer'],
        followUps: ['మెకానికల్ మరియు హార్డ్‌వేర్ డిజైన్ ఇష్టం', 'సెన్సార్లు మరియు ఎలక్ట్రానిక్స్ ఇష్టం', 'మెకాట్రానిక్స్ ఇంజనీర్ ఎలా కావాలి?']
      };
    }
    if (lang === 'tanglish') {
      return {
        text: `That's interesting${nameTag}! Robotics has several areas beyond software development, including mechanical design, electronics, mechatronics and industrial automation. What attracts you most about building robots?`,
        emotion: 'encouraging',
        language: 'tanglish',
        recommendedCareerIds: ['robotics-engineer', 'mechatronics-engineer'],
        followUps: ['Mechanical hardware & CAD design', 'Sensors, circuits & electronics', 'Tell me more about Mechatronics']
      };
    }
    return {
      text: `That's interesting${nameTag}! Robotics has several areas beyond software development, including mechanical design, electronics, mechatronics and industrial automation. What attracts you most about building robots?`,
      emotion: 'encouraging',
      language: 'english',
      recommendedCareerIds: ['robotics-engineer', 'mechatronics-engineer'],
      followUps: ['Mechanical hardware & CAD design', 'Sensors, circuits & electronics', 'Tell me more about Mechatronics']
    };
  }

  // ── 1c. General Passion for Robotics & Intelligent Systems ──────────────────
  if (expressesRobotics && !expressesDislikeCoding) {
    if (lang === 'telugu') {
      return {
        text: `రోబోటిక్స్ రంగం అద్భుతమైన భవిష్యత్ ఉన్న ఫీల్డ్${firstName ? ` ${firstName}` : ''}! ఇందులో మెకానికల్ డిజైన్, ఎలక్ట్రానిక్స్, సెన్సార్లు మరియు ఆటోమేషన్ కలిసి ఉంటాయి. రోబోటిక్స్ ఇంజనీర్, మెకాట్రానిక్స్ ఇంజనీర్, లేదా ఆటోమేషన్ ఇంజనీర్ రోల్స్ మీకు చక్కగా సరిపోతాయి. రోబోట్ల ఫిజికల్ బాడీ తయారు చేయడం ఇష్టమా, లేక వాటి ఇంటెలిజెంట్ కంట్రోల్ వైపు ఆసక్తి ఉందా?`,
        spokenTextFallback: `Robotics field chala exciting field${nameTag}! Deentlo mechanical design, electronics, sensors mariyu automation kalisi untayi. Robotics Engineer leda Mechatronics Engineer roles meeku baga suit avtayi. Physical robot hardware build cheyadam ishtama leda intelligent control side ah?`,
        emotion: 'encouraging',
        language: 'telugu',
        recommendedCareerIds: ['robotics-engineer', 'mechatronics-engineer'],
        followUps: ['ఫిజికల్ హార్డ్‌వేర్ మరియు మెకానికల్ డిజైన్', 'ఇంటెలిజెంట్ కంట్రోల్ మరియు సెన్సార్లు', 'మెకాట్రానిక్స్ కెరీర్ వివరాలు']
      };
    }
    return {
      text: `Robotics and intelligent systems are incredible to explore${nameTag}! They bridge mechanical engineering, sensor electronics, mechatronics, and autonomous control. Are you more drawn to the physical mechanical hardware, sensor circuits, or intelligent autonomous programming?`,
      emotion: 'curious',
      language: lang === 'tanglish' ? 'tanglish' : 'english',
      recommendedCareerIds: ['robotics-engineer', 'mechatronics-engineer'],
      followUps: ['Physical mechanical hardware', 'Sensors, circuits & electronics', 'Autonomous systems & intelligence']
    };
  }

  // ── 1d. Dislike Coding in General (Direct to Non-Coding Paths) ───────────────
  if (expressesDislikeCoding && !expressesRobotics && !memory.mentionedInterests.includes('design')) {
    return {
      text: `That is completely fine${nameTag}—you do not have to code to build an extraordinary career! High-impact, high-growth paths without heavy coding include Product (UI/UX) Design, Product Management, Industrial Design, Behavioral Psychology, and Biotechnology. Which of those sound most intriguing to you?`,
      emotion: 'encouraging',
      language: lang,
      recommendedCareerIds: ['product-designer', 'product-manager'],
      followUps: ['Product (UI/UX) Design', 'Product Management & Strategy', 'What other non-coding fields exist?']
    };
  }

  // ── 2. Expressing Interest in DESIGN / UI-UX / CREATIVE VISUALS ─────────────
  if (
    (/\b(design|designing|ui|ux|figma|graphic|visual)\b/i.test(lower) || /డిజైన్/.test(q)) &&
    !/\b(vs|or|compare|coding|software)\b/i.test(lower)
  ) {
    if (lang === 'telugu') {
      return {
        text: `డిజైన్ పట్ల మీకు ఆసక్తి ఉండటం చాలా మంచి విషయం${firstName ? ` ${firstName}` : ''}! డిజైన్ రంగంలో UI/UX Product Designer (యాప్స్ ఎలా ఉపయోగించాలో డిజైన్ చేయడం) మరియు Brand & Visual Designer వంటి మంచి కెరీర్లు ఉన్నాయి. మీకు మొబైల్ యాప్స్ ఇంటర్‌ఫేస్‌లు డిజైన్ చేయడం ఇష్టమా, లేక బ్రాండింగ్ మరియు విజువల్స్ చేయడమా?`,
        spokenTextFallback: `Design patla meeku aasakti undadam chala manchi vishayam${nameTag}! Design rangam lo UI/UX Product Designer mariyu Brand Visual Designer vanti manchi career options unnayi. Meeku mobile apps interfaces design cheyadam ishtama leda branding visuals cheyadama?`,
        emotion: 'encouraging',
        language: 'telugu',
        recommendedCareerIds: ['product-designer', 'graphic-designer'],
        followUps: ['యాప్ ఇంటర్‌ఫేస్ UI/UX డిజైన్ ఇష్టం', 'డిజైన్ ఎలా మొదలుపెట్టాలి?', 'కోడింగ్ లేకుండా డిజైన్ జాబ్ వస్తుందా?']
      };
    }

    if (lang === 'tanglish') {
      return {
        text: `Design field select cheskovali anukovadam super clarity${nameTag}! Deentlo mainly Product (UI/UX) Design—ante apps and websites easy ga use cheyyadam design cheyadam—mariyu Visual/Brand Design untayi. Figma free tool tho okka 3-screen college app redesign start cheste neeku field ela untundo immediate ga ardham avutundi. Neeku apps layout side interest unda leda posters/branding side ah?`,
        emotion: 'encouraging',
        language: 'tanglish',
        recommendedCareerIds: ['product-designer', 'graphic-designer'],
        followUps: ['Apps & UI/UX layout side interest undi', 'Coding lekunda design job vastunda?', 'Next step em cheyali?']
      };
    }

    return pickFreshResponse(
      [
        {
          text: `Knowing you enjoy designing gives us a clear anchor${nameTag}! In tech and creative industries, that naturally points toward Product (UI/UX) Design—making apps intuitive—or Creative Technology if you like bringing visuals to life with light code. Do you prefer sketching app flows and layouts, or crafting visual branding?`,
          emotion: 'encouraging',
          language: 'english',
          recommendedCareerIds: ['product-designer', 'creative-technologist'],
          followUps: ['App flows and UI/UX interfaces', 'Visual branding and graphics', 'Which career suits my design interest best?']
        },
        {
          text: `That's a strong creative direction to build on${nameTag}. Product Designers spend their week interviewing users, testing wireframes in Figma, and refining screens until things feel effortless. Have you tried designing any small screens in Figma yet, or would you like to try a quick PathPilot UX experiment first?`,
          emotion: 'warm',
          language: 'english',
          recommendedCareerIds: ['product-designer', 'user-researcher'],
          followUps: ['How do I start with Figma?', 'What if I want to combine design and coding?', 'What should I do next?']
        }
      ],
      prevTexts
    );
  }

  // ── 3. Expressing Interest in CODING / SOFTWARE ─────────────────────────────
  if (
    (/\b(coding|programming|software|developer|python|javascript|web\s*dev|app\s*dev)\b/i.test(lower) || /కోడింగ్|సాఫ్ట్‌వేర్/.test(q)) &&
    !expressesDislikeCoding &&
    !memory.dislikesCoding &&
    !/\b(ece|design vs|math|bhayam|scared|weak)\b/i.test(lower)
  ) {
    if (lang === 'telugu') {
      return {
        text: `కోడింగ్ అంటే ఆసక్తి ఉండటం గొప్ప ప్లస్ పాయింట్${firstName ? ` ${firstName}` : ''}! దీని ద్వారా మీరు Full-Stack Software Engineer, AI & Machine Learning Specialist, లేదా Cybersecurity Analyst వంటి రంగాల్లోకి వెళ్లవచ్చు. మీకు వెబ్/మొబైల్ యాప్స్ తయారు చేయడం ఇష్టమా, లేక డేటా మరియు AI మోడల్స్‌పై పని చేయాలని ఉందా?`,
        spokenTextFallback: `Coding ante aasakti undadam goppa plus point${nameTag}! Deeni dwara meeru Full-Stack Software Engineer, AI & Machine Learning Specialist, leda Cybersecurity Analyst lanti roles lo ki vellavachu. Meeku web mobile apps build cheyadam ishtama leda AI & data meeda work cheyalani unda?`,
        emotion: 'encouraging',
        language: 'telugu',
        recommendedCareerIds: ['software-engineer', 'ai-engineer'],
        followUps: ['వెబ్ మరియు యాప్స్ తయారు చేయడం ఇష్టం', 'AI మరియు డేటా సైన్స్ గురించి చెప్పు', 'మొదట ఏ లాంగ్వేజ్ నేర్చుకోవాలి?']
      };
    }

    if (lang === 'tanglish') {
      return {
        text: `Naku coding ante interest undi anadam chala manchi foundation${nameTag}! Coding lo neeku main ga three strong directions untayi: Full-Stack Apps build cheyadam, AI & Data side velladam, leda Cybersecurity lo work cheyadam. Nuvvu screens/websites run cheste immediate result chudadam enjoy chestava, leda backend logic & AI data interesting anipistunda?`,
        emotion: 'encouraging',
        language: 'tanglish',
        recommendedCareerIds: ['software-engineer', 'ai-engineer'],
        followUps: ['Web/mobile apps build cheyadam nachutundi', 'AI & data models side cheppu', 'First eh language nerchukovali?']
      };
    }

    return pickFreshResponse(
      [
        {
          text: `Having genuine curiosity for coding opens several very different paths${nameTag}: Full-Stack Engineering (building products end to end), AI/ML Engineering, or Cybersecurity. What feels most satisfying when you code—seeing a visual website/app come alive, or solving tricky backend logic and data problems?`,
          emotion: 'encouraging',
          language: 'english',
          recommendedCareerIds: ['software-engineer', 'ai-engineer'],
          followUps: ['Seeing visual apps come alive', 'Solving backend logic and AI problems', 'What should I build first?']
        },
        {
          text: `Since you already enjoy coding${nameTag}, the fastest way to narrow down a specialization is building one tiny personal project this weekend rather than watching endless tutorials. Want to compare Web/App Development vs. AI/Data so you know where to start?`,
          emotion: 'warm',
          language: 'english',
          recommendedCareerIds: ['software-engineer', 'ai-engineer'],
          followUps: ['Compare Web Dev vs AI/Data', 'Python or JavaScript first?', 'What should I do next?']
        }
      ],
      prevTexts
    );
  }

  // ── 4. Career Indecision / "Which career should I choose / suits me?" ───────
  if (
    /\b(don'?t know|not sure|confused|which career|what career|fit me|suits? me|choose.*career|career option)\b/i.test(lower) ||
    /\b(teliyatledu|confuse|eh career|ye career|which branch)\b/i.test(lower) ||
    /తెలియడం లేదు|ఏ కెరీర్|కన్ఫ్యూజన్/.test(q)
  ) {
    // CRITICAL PERSONALIZATION: Remember prior interests mentioned by the student!
    if (memory.mentionedInterests.includes('design') && memory.mentionedInterests.includes('coding')) {
      return {
        text:
          lang === 'tanglish'
            ? `Indake nuvvu design mariyu coding renditlo interest undi ani share chesav kada${nameTag}! Alanti students ki UI/UX Product Engineering, Creative Technologist, leda Frontend Engineer roles perfect ga suit avtayi. Renditlo neeku ekkuva time visual design lo spend cheyalani unda leda code lo na?`
            : `Remember earlier you shared that you enjoy both designing and coding${nameTag}? That narrows things down immediately—Creative Technologist and Product Designer/Frontend Engineer blend visual craft directly with interactive code. Which side feels like the one you'd happily spend 70% of your week on?`,
        emotion: 'encouraging',
        language: lang === 'telugu' ? 'tanglish' : lang,
        recommendedCareerIds: ['creative-technologist', 'product-designer'],
        followUps: ['70% Design & UI/UX', '70% Coding & Building', 'Show me how Creative Technologist works']
      };
    }

    if (memory.lastMentionedInterest) {
      const k = memory.lastMentionedInterest;
      const labelMap = {
        robotics: 'robotics and intelligent autonomous systems',
        mechanical_eng: 'mechanical and machine design',
        electrical_ece: 'electronics and circuit engineering',
        aerospace: 'aerospace, drones, and flight systems',
        civil_eng: 'civil and structural engineering',
        quantum_tech: 'quantum computing and advanced physics',
        iot: 'smart devices and the Internet of Things',
        ar_vr: 'spatial computing, AR and VR',
        cloud_infra: 'cloud architecture and DevOps',
        blockchain: 'decentralized tech and blockchain',
        science_research: 'scientific research and laboratory discovery',
        psychology: 'human behavior and cognitive psychology',
        economics_finance: 'economics and financial analysis',
        industrial_design: 'industrial and physical product design',
        design: 'designing and creative problem solving',
        coding: 'coding and building software',
        ai_data: 'AI and data patterns',
        business_pm: 'business, leadership, and product strategy',
        biotech_health: 'healthcare and biology',
        cybersecurity: 'cybersecurity and digital defense',
        climate: 'sustainability and clean energy'
      };
      const label = labelMap[k] || k;
      const ids = CAREER_RECOMMENDATIONS_BY_INTEREST[k] || ['product-designer', 'software-engineer'];

      if (lang === 'telugu') {
        return {
          text: `మీరు ఇప్పటికే ${label} పట్ల ఆసక్తి ఉందని చెప్పారు కదా${firstName ? ` ${firstName}` : ''}, అదే మనకు మొదటి క్లూ! ఆ ఆసక్తికి సరిపోయే కార్డులను కింద జతచేశాను. వీటిలో మీరు మనుషులతో కలిసి పనిచేయాలనుకుంటున్నారా, లేక ఎక్కువ సమయం డిజైన్/టెక్నాలజీపై స్వతంత్రంగా పనిచేయాలా?`,
          spokenTextFallback: `Meeru ippatike ${label} patla aasakti undani chepparu kada${nameTag}, ade manaku first clue! Kindha unna career options lo meeru ekkuvaga people tho work cheyalani unda leda deep focus tho build cheyadama?`,
          emotion: 'encouraging',
          language: 'telugu',
          recommendedCareerIds: ids.slice(0, 2),
          followUps: ['ప్రతిరోజూ ఈ పని ఎలా ఉంటుందో చెప్పు', 'తర్వాత నేను ఏమి చేయాలి?', 'నాకు ఇంకో ఆప్షన్ చూపించు']
        };
      }

      if (lang === 'tanglish') {
        return {
          text: `Nuvvu mundhe ${label} nachutundi ani cheppav kada${nameTag}—so manam zero nundi start cheyyakkarledu! Kindha match ayye career cards pettanu chudu. Daily work lo neeku people/team coordination ekkuva kavala, leda focused ga build/create cheyyadam nachutunda?`,
          emotion: 'encouraging',
          language: 'tanglish',
          recommendedCareerIds: ids.slice(0, 2),
          followUps: ['Ee careers lo daily work ela untundi?', 'Ippudu next em cheyali?', 'Inka vere options cheppu']
        };
      }

      return {
        text: `Since you already shared that you enjoy ${label}${nameTag}, you aren't starting from zero at all! Those instincts map directly to the roles below. Between working closely with users/teammates every day versus spending deep focus time building things yourself, which rhythm fits you better?`,
        emotion: 'encouraging',
        language: 'english',
        recommendedCareerIds: ids.slice(0, 2),
        followUps: ['Explain day-to-day work in these', 'What skills should I build for them?', 'What should I do next?']
      };
    }

    // Truly undecided — ask calm, sharp narrowing questions (different by language)
    if (lang === 'telugu') {
      return {
        text: `ఏ కెరీర్ ఎంచుకోవాలో తెలియకపోవడం సహజమే${firstName ? ` ${firstName}` : ''}—ఒకేసారి 20 ఆప్షన్లు చూడటం వల్ల కన్ఫ్యూజన్ వస్తుంది. చిన్నగా మొదలుపెడదాం: మీకు విజువల్ డిజైన్/కళలు ఇష్టమా, కోడింగ్/టెక్నాలజీ సమస్యలు పరిష్కరించడమా, లేక వ్యక్తులతో మాట్లాడి బిజినెస్/హెల్త్ రంగాల్లో సహాయం చేయడమా?`,
        spokenTextFallback: `Eh career enchukovalo teliyakapovadam sahajame${nameTag}. Chinnaga modalu pedadam: meeku visual design ishtama, coding & technology problems solve cheyadama, leda people & business fields lo work cheyadama?`,
        emotion: 'serious',
        language: 'telugu',
        recommendedCareerIds: [],
        followUps: ['నాకు టెక్నాలజీ మరియు కోడింగ్ ఇష్టం', 'నాకు డిజైన్ మరియు క్రియేటివిటీ ఇష్టం', 'నా బలాలు ఏమిటో ఎలా తెలుసుకోవాలి?']
      };
    }

    if (lang === 'tanglish') {
      return {
        text: `Tension padaku${nameTag}—okka sari anni options chusthe evarikaina confuse avutundi. Simple ga three buckets lo chuddam: 1) Apps/coding & tech problems, 2) Visual design & creativity, 3) Business/people leda health/science. Ee mooditlo neeku first edhi koncham interesting ga anipistundi?`,
        emotion: 'clarifying',
        language: 'tanglish',
        recommendedCareerIds: [],
        followUps: ['Tech & coding side koncham interesting', 'Design & creativity nachutundi', 'Business leda people roles cheppu']
      };
    }

    return pickFreshResponse(
      [
        {
          text: `It makes total sense to feel stuck when every job title sounds unfamiliar${nameTag}. Instead of picking a whole 10-year career today, let's narrow it to one lane: do you feel more drawn to building software/logic, designing visual experiences, analyzing data, or working with people and business strategy?`,
          emotion: 'clarifying',
          language: 'english',
          recommendedCareerIds: [],
          followUps: ['I enjoy designing and visual things', 'I like coding and building logic', 'I prefer people, business, or strategy']
        },
        {
          text: `Let's take the pressure off choosing a final title right now${nameTag}. Think about three college tasks: organizing a messy team project, fixing a broken program, or redesigning ugly slides so everyone understands them. Which one sounds least like a chore to you?`,
          emotion: 'curious',
          language: 'english',
          recommendedCareerIds: [],
          followUps: ['Fixing logic or code', 'Redesigning visuals clearly', 'Organizing people and plans']
        }
      ],
      prevTexts
    );
  }

  // ── 5. Math / Coding Fear & Honest Reassurance ──────────────────────────────
  if (/\b(math|calculus|scared|weak|afraid|fear)\b/i.test(lower) || /\b(bhayam|kashtam|tough|radhu|radu)\b/i.test(lower)) {
    if (lang === 'telugu') {
      return {
        text: `చాలా మంది విద్యార్థులకు ఈ సందేహం ఉంటుంది${firstName ? ` ${firstName}` : ''}! UI/UX డిజైన్, ఫ్రంట్-ఎండ్ డెవలప్‌మెంట్ లేదా ప్రాడక్ట్ మేనేజ్‌మెంట్ వంటి జాబ్స్‌లో భారీ క్యాలిక్యులస్ అవసరం లేదు—స్పష్టంగా ఆలోచించడం మరియు సమస్యను చిన్న భాగాలుగా విడదీయడం ముఖ్యం. మీరు విజువల్ డిజైన్ వైపు వెళ్లాలనుకుంటున్నారా లేక బిగినర్ వెబ్ కోడింగ్ ప్రయత్నించాలా?`,
        spokenTextFallback: `Chala mandi students ki ee doubt untundi${nameTag}! UI/UX design, frontend development, leda product management roles lo heavy calculus avasaram ledu—clear ga step by step alochinchadam mukhyam. Meeru design side vellalani unda leda beginner web coding try chestara?`,
        emotion: 'encouraging',
        language: 'telugu',
        recommendedCareerIds: ['product-designer', 'software-engineer'],
        followUps: ['డిజైన్ వైపు వెళ్లడం ఎలా?', 'సులభమైన వెబ్ కోడింగ్ ఎలా నేర్చుకోవాలి?', 'తర్వాత ఏమి చేయాలి?']
      };
    }
    if (lang === 'tanglish') {
      return {
        text: `Chaala mandi students ki exact ga ee bhayam untundi${nameTag}, kani practical reality cheptanu: UI/UX Design, Frontend Web Apps, mariyu Product roles lo heavy calculus vadaru—step-by-step logical thinking matrame kavali! AI research matrame math-heavy untundi. Nuvvu visual web apps start chestava leda no-code/UX design chuddam antava?`,
        emotion: 'encouraging',
        language: 'tanglish',
        recommendedCareerIds: ['product-designer', 'software-engineer'],
        followUps: ['Visual web apps try chestanu', 'UX Design lo coding avasaram leda?', 'Beginner roadmap cheppu']
      };
    }
    return {
      text: `You'd be surprised how little advanced calculus is used in everyday software, frontend engineering, or UI/UX product roles${nameTag}. Most real-world tech work is about breaking user problems into clean logical steps—only specialized AI/research tracks get math-heavy. Would you feel more comfortable starting with visual UI engineering or product design?`,
      emotion: 'encouraging',
      language: 'english',
      recommendedCareerIds: ['product-designer', 'software-engineer'],
      followUps: ['Visual UI engineering', 'Product design without heavy code', 'What skills should I learn first?']
    };
  }

  // ── 6. Branch Comparison: CSE vs ECE ────────────────────────────────────────
  if (/\b(cse|ece|branch)\b/i.test(lower)) {
    if (lang === 'telugu') {
      return {
        text: `CSE మరియు ECE మధ్య తేడా స్పష్టంగా చూడండి${firstName ? ` ${firstName}` : ''}: CSE పూర్తిగా సాఫ్ట్‌వేర్ యాప్స్, అల్గారిథమ్స్ మరియు AI పై ఉంటుంది. ECE హార్డ్‌వేర్ సర్క్యూట్లు, చిప్స్ మరియు ఎంబెడెడ్ సిస్టమ్స్ పై ఉంటుంది (కానీ మీరు సైడ్ లో కోడింగ్ నేర్చుకొని సాఫ్ట్‌వేర్ జాబ్స్ కి కూడా వెళ్లవచ్చు). మీకు స్వచ్ఛమైన కోడింగ్ ఇష్టమా లేక హార్డ్‌వేర్ + కోడింగ్ కలయిక ఇష్టమా?`,
        spokenTextFallback: `CSE mariyu ECE madhya difference clear ga chudandi${nameTag}: CSE complete ga software apps, algorithms, and AI meeda untundi. ECE hardware circuits, chips, and embedded systems meeda untundi. Meeku pure coding ishtama leda hardware plus coding combination ishtama?`,
        emotion: 'thoughtful',
        language: 'telugu',
        recommendedCareerIds: ['software-engineer', 'creative-technologist'],
        followUps: ['నాకు పూర్తిగా సాఫ్ట్‌వేర్ కోడింగ్ ఇష్టం', 'హార్డ్‌వేర్ మరియు కోడింగ్ రెండూ ఇష్టం', 'తర్వాత జాబ్ అవకాశాలు ఎలా ఉంటాయి?']
      };
    }
    if (lang === 'tanglish') {
      return {
        text: `Chudu${nameTag}, CSE lo day-to-day focus software apps, web/cloud, and AI coding meeda untundi. ECE lo circuits, VLSI, embedded chips + koncham programming untayi (ece teesukoni kuda IT/software jobs ki vellachu kani additional coding practice kavali). Neeku core electronics nachutaya leda purely software side vellalani unda?`,
        emotion: 'thoughtful',
        language: 'tanglish',
        recommendedCareerIds: ['software-engineer', 'creative-technologist'],
        followUps: ['Pure software side vellalani undi', 'Electronics + coding mix chestanu', 'CSE without strong math kastama?']
      };
    }
    return {
      text: `Think of CSE vs. ECE in terms of daily projects${nameTag}: CSE focuses directly on software architecture, apps, and AI systems, while ECE covers circuits, embedded hardware, and signal processing (though many ECE students still enter software by practicing coding alongside hardware). Do you prefer pure software building, or connecting physical hardware with code?`,
      emotion: 'thoughtful',
      language: 'english',
      recommendedCareerIds: ['software-engineer', 'creative-technologist'],
      followUps: ['Pure software and apps', 'Connecting hardware sensors with code', 'What skills should an ECE student learn for software?']
    };
  }

  // ── 7. What should I do next? / Action Plan (Personalized to context & history!) ──
  if (
    /\b(what should i (do|practice|learn|study|try) next|practice next|learn next|what next|next step|how do i start|how to start|get started|action plan|roadmap|start learning)\b/i.test(lower) ||
    /\b(em\s*cheyali|ippudu|tarvata|ela\s*start|start\s*chey)\b/i.test(lower) ||
    /తర్వాత ఏమి|ఎలా మొదలుపెట్టాలి/.test(q)
  ) {
    const contextTarget = savedCareers[0] || memory.lastMentionedInterest || topInterest?.name || null;
    const contextTargetLabel =
      contextTarget === 'design'
        ? 'UI/UX & Product Design'
        : contextTarget === 'robotics'
        ? 'Robotics & Mechatronics'
        : contextTarget === 'coding'
        ? 'Software & App Development'
        : contextTarget === 'ai_data'
        ? 'AI & Data Analytics'
        : contextTarget === 'hardware_ece'
        ? 'Embedded Systems & Electronics'
        : contextTarget;

    const latestGap = skillGaps[0];

    if (lang === 'telugu') {
      const targetStr = contextTargetLabel ? `${contextTargetLabel} వైపు` : 'మీ ఆసక్తి ఉన్న రంగం వైపు';
      return {
        text: `ఈ వారం చేయడానికి ఒక చిన్న ప్రాక్టికల్ ప్లాన్ చెప్తాను${firstName ? ` ${firstName}` : ''}: మొదటిది, ${targetStr} PathPilot లో ఒక 5 నిమిషాల కెరీర్ ఎక్స్‌పెరిమెంట్ చేసి చూడండి. రెండవది, ${latestGap ? `${latestGap.careerTitle} కోసం గుర్తించిన స్కిల్స్ (${(latestGap.missingSkills || []).slice(0, 2).join(', ')})` : 'ఆ రోల్‌కు కావలసిన స్కిల్ గ్యాప్'} చూసి ఒక చిన్న వీకెండ్ ప్రాజెక్ట్ మొదలుపెట్టండి. ఈ రెండింటిలో ఏది ముందు చేయాలనుకుంటున్నారు?`,
        spokenTextFallback: `Ee week cheyadaniki oka chinna practical plan cheptanu${nameTag}: First, ${contextTargetLabel || 'mee target field'} lo PathPilot career experiment try cheyandi. Second, daniki kavalsina skill gap check chesi oka weekend mini project start cheyandi. Eh step mundu start cheddam?`,
        emotion: 'encouraging',
        language: 'telugu',
        recommendedCareerIds: memoryCareerIds,
        followUps: ['వీకెండ్ మినీ ప్రాజెక్ట్ ఐడియా చెప్పు', 'స్కిల్ గ్యాప్ ఎలా చూడాలి?', 'ఇంకేమైనా ఎక్స్‌పెరిమెంట్ సజెస్ట్ చెయ్యి']
      };
    }

    if (lang === 'tanglish') {
      return {
        text: `Simple 2-step action plan follow avvu${nameTag}: ${contextTargetLabel ? `Nuvvu share chesina ${contextTargetLabel} kosam` : 'Mee real strengths confirm cheskovadaniki'} first PathPilot lo Career Experiment oka 4 minutes try cheyyi${latestGap ? `, tarvata ${latestGap.careerTitle} lo missing skills (${(latestGap.missingSkills || []).slice(0, 2).join(', ') || 'core basics'}) meeda weekend chinna project start cheyyi` : ' — tarvata Skill Gap check chesi aa role ki kavalsina top skill meeda 2-day mini project build cheyyi'}. Nenu neeku weekend project idea suggest cheyyana?`,
        emotion: 'encouraging',
        language: 'tanglish',
        recommendedCareerIds: memoryCareerIds,
        followUps: ['Avunu, weekend project idea cheppu', 'First eh tool/language nerchukovali?', 'Compare two roles in this area']
      };
    }

    if (contextTargetLabel || latestGap || roadmaps.length > 0) {
      const gapNote = latestGap?.missingSkills?.length
        ? `—starting with ${latestGap.missingSkills.slice(0, 2).join(' and ')} from your ${latestGap.careerTitle} skill gap`
        : '';
      return {
        text: `Here's a concrete next move around ${contextTargetLabel || latestGap?.careerTitle || 'your focus'}${nameTag}: run a 4-minute interactive experiment in PathPilot's Career Exploration Lab first, then build one tiny weekend portfolio piece${gapNote} instead of taking long passive courses. Want a quick weekend project idea tailored to that role?`,
        emotion: 'encouraging',
        language: 'english',
        recommendedCareerIds: memoryCareerIds,
        followUps: ['Yes, give me a weekend project idea', 'What skills are most urgent first?', 'Compare roles in this path']
      };
    }

    return {
      text: `Keep your next step very light${nameTag}: since your profile doesn't have assessments or saved careers yet, pick one 5-minute clue—either answer our Interest Analyzer questions or jump straight into a 4-minute hands-on simulation in Experiments. Which feels more fun today: quick questions or trying a real mini-task?`,
      emotion: 'curious',
      language: 'english',
      recommendedCareerIds: [],
      followUps: ['Trying a mini-task sounds better', 'Ask me quick questions right now', 'Show me the 3 easiest beginner paths']
    };
  }

  // ── 8. Context-Sensitive Short Follow-Ups ("Tell me more", "Weekend project", "First one", "Avunu") ──
  if (
    /^(yes|yeah|sure|ok|avunu|sare|tell me more|explain|more|first one|second one|project|weekend project|give me.*idea|how|why)[?!. ]*$/i.test(lower) ||
    /\b(weekend project|mini[- ]?project|beginner project)\b/i.test(lower)
  ) {
    if (memory.mentionedInterests.includes('design') || memory.recentAssistant.includes('design') || memory.recentAssistant.includes('figma')) {
      return {
        text:
          lang === 'tanglish'
            ? `Super! Ee weekend oka clean 3-screen project Figma lo chesi chudu: nee college canteen/hostel mess menu app ni easy ga redesign cheyyi. First paper lo rough boxes draw chesi, tarvata Figma free templates tho clean buttons & spacing pettu—adhe nee first real UX case study avutundi!`
            : `Here's a great beginner UX weekend project${nameTag}: pick the messiest campus website or bus-schedule app you use and sketch a cleaner 3-screen redesign in Figma. Document why you moved two buttons—that alone becomes your very first portfolio case study. Want me to walk through how to structure that case study?`,
        emotion: 'encouraging',
        language: lang === 'telugu' ? 'tanglish' : lang,
        recommendedCareerIds: ['product-designer'],
        followUps: ['How do I structure a UX case study?', 'Do I also need coding for UI/UX?', 'What tools besides Figma matter?']
      };
    }

    if (memory.mentionedInterests.includes('coding') || memory.recentAssistant.includes('python') || memory.recentAssistant.includes('coding') || memory.recentAssistant.includes('software')) {
      return {
        text:
          lang === 'tanglish'
            ? `Ee weekend Python leda JavaScript lo okka practical student tool build cheyyi—for example, nee monthly hostel expenses tracker or attendance percentage calculator. Chinna working app build cheste theory tutorials kante 10x ekkuva confidence vastundi. Web version JavaScript lo chestava leda Python lo start chestava?`
            : `Try building one tiny tool you'd genuinely use this week${nameTag}—like a campus attendance calculator or semester GPA planner in JavaScript or Python. Getting one working tool live on GitHub builds way more confidence than 15 hours of tutorials. Which feels closer right now: a web tool in JavaScript or a script in Python?`,
        emotion: 'encouraging',
        language: lang === 'telugu' ? 'tanglish' : lang,
        recommendedCareerIds: ['software-engineer', 'creative-technologist'],
        followUps: ['JavaScript web tool', 'Python script & data basics', 'What skills should come next?']
      };
    }
  }

  // ── 9. Specific Field Queries (AI/Data, Cyber, Biotech/Health, Business/PM, Climate, UX Research) ──
  if (/\b(ai|data|machine learning|analytics|ml)\b/i.test(lower) || /డేటా|ఆర్టిఫిషియల్/.test(q)) {
    if (lang === 'telugu') {
      return {
        text: `AI మరియు డేటా సైన్స్‌లో పని చేయాలంటే ముందు Python బేసిక్స్ మరియు క్లీన్ డేటా విశ్లేషణ నేర్చుకోవాలి${firstName ? ` ${firstName}` : ''}. ఈ రంగంలో మీరు AI యాప్స్ తయారు చేసే AI Engineer కావాలనుకుంటున్నారా, లేక డేటా చూసి బిజినెస్ నిర్ణయాలు తీసుకునే Analyst వైపు వెళ్తారా?`,
        spokenTextFallback: `AI mariyu Data Science lo work cheyalante mundu Python basics mariyu clean data analysis nerchukovali${nameTag}. Meeru AI apps build chese AI Engineer kavalani unda leda data tho business decisions teeskune Analyst role nachutunda?`,
        emotion: 'curious',
        language: 'telugu',
        recommendedCareerIds: ['ai-engineer', 'financial-analyst'],
        followUps: ['AI యాప్స్ తయారు చేయడం ఇష్టం', 'డేటా అనలిస్ట్ గురించి చెప్పు', 'దీనికి ఎంత మ్యాథ్స్ కావాలి?']
      };
    }
    return {
      text:
        lang === 'tanglish'
          ? `AI & Data side vellalante Python + real messy datasets clean cheyyadam chala key${nameTag}. Nuvvu LLM/AI features apps lo integrate chese AI Engineer work chestava, leda company trends analyze chese Analyst side interest unda?`
          : `Working in AI and Data splits cleanly into two paths${nameTag}: AI Engineers build intelligent apps and model pipelines, while Analysts uncover patterns from real datasets to guide product or financial decisions. Which side appeals to you more?`,
      emotion: 'curious',
      language: lang === 'tanglish' ? 'tanglish' : 'english',
      recommendedCareerIds: ['ai-engineer', 'financial-analyst'],
      followUps: ['Building AI-powered apps', 'Analyzing business data & trends', 'How much math is really needed?']
    };
  }

  if (/\b(cyber|security|hack|infosec)\b/i.test(lower)) {
    return {
      text: `Cybersecurity suits curious problem solvers who like thinking like a detective${nameTag}—spotting weak spots in apps, networks, and cloud setups before attackers do. Have you tried Linux basics or networking yet, or are you exploring cybersecurity from scratch?`,
      emotion: 'serious',
      language: 'english',
      recommendedCareerIds: ['cybersecurity-analyst', 'software-engineer'],
      followUps: ['Exploring from scratch', 'Comparing Cybersecurity vs Software Engineering', 'What skills should I learn first?']
    };
  }

  if (/\b(bio|health|med|pharma|clinic)\b/i.test(lower)) {
    return {
      text:
        lang === 'tanglish'
          ? `Healthcare ippudu hospitals varake limit kaadu${nameTag}—Digital Health Apps, Bioinformatics (DNA data + coding), mariyu Biomedical Research lo chaala modern opportunities unnayi. Neeku pure lab research nachutunda leda health technology side vellalani unda?`
          : `Modern healthcare spans way beyond clinics${nameTag}—from Digital Health product design for patients to Computational Biology decoding genetic data with code. Are you more interested in wet-lab biology or combining health with technology?`,
      emotion: 'warm',
      language: lang === 'tanglish' ? 'tanglish' : 'english',
      recommendedCareerIds: ['digital-health-specialist', 'computational-biologist'],
      followUps: ['Health technology & digital apps', 'Computational biology / lab science', 'What should I do next?']
    };
  }

  if (/\b(business|startup|product manager|pm|marketing|finance|entrepreneur|mba)\b/i.test(lower)) {
    return {
      text:
        lang === 'tanglish'
          ? `Business mariyu strategy side ante Product Manager or Startup roles chala exciting untayi${nameTag}. Product Manager users em kavalo ardham cheskoni designers & engineers tho product build cheyistaru. Neeku user strategy + teamwork lo work cheyadam baguntunda?`
          : `If you enjoy understanding people, spotting broken experiences, and rallying teams around a vision, Associate Product Manager or Startup Founder roles fit naturally${nameTag}. Have you led any campus club or side project, or are you curious how students break into Product roles?`,
      emotion: 'encouraging',
      language: lang === 'tanglish' ? 'tanglish' : 'english',
      recommendedCareerIds: ['product-manager', 'startup-founder'],
      followUps: ['How do students get into Product Management?', 'Compare Product Manager vs Software Engineer', 'What should I do next?']
    };
  }

  // ── 10. Context-Aware Conversational Reflection Fallback (never identical boilerplate) ──
  if (lang === 'telugu') {
    return {
      text: `మీరు అడిగిన "${q.slice(0, 48)}" విషయం చాలా ముఖ్యమైనది${firstName ? ` ${firstName}` : ''}. దీనికి సరిగ్గా సమాధానం ఇవ్వడానికి నాకు ఒక్క చిన్న క్లారిటీ ఇవ్వండి: మీరు ప్రస్తుతం ఏ డిగ్రీ లేదా బ్రాంచ్ చదువుతున్నారు, మరియు టెక్, డిజైన్, బిజినెస్‌లో ఏది ఎక్కువగా ఆకట్టుకుంటోంది?`,
      spokenTextFallback: `Meeru adigina vishayam chala important${nameTag}. Deeniki correct ga guide cheyadaniki oka chinna clarity ivvandi: meeru ippatiki eh degree leda branch chaduvutunnaru, mariyu tech, design, business lo edhi ekkuva interesting anipistondi?`,
      emotion: 'clarifying',
      language: 'telugu',
      recommendedCareerIds: memoryCareerIds,
      followUps: ['నేను టెక్/కోడింగ్ వైపు వెళ్లాలనుకుంటున్నా', 'నాకు డిజైన్ ఫీల్డ్ ఇష్టం', 'నా బలాలు ఏమిటి?']
    };
  }

  if (lang === 'tanglish') {
    return pickFreshResponse(
      [
        {
          text: `Interesting point${nameTag}—naku correct ga suggest cheyadaniki oka chinna detail cheppu: currently nuvvu eh year/branch lo unnav, mariyu coding, design, leda management lo edhi try cheste baguntundi anipistondi?`,
          emotion: 'clarifying',
          language: 'tanglish',
          recommendedCareerIds: memoryCareerIds,
          followUps: ['Naku coding ante interest undi', 'Nenu design field ki vellali anukuntunna', 'Ippudu next em cheyali?']
        },
        {
          text: `Ardham ayindi${nameTag}. Manam direct ga practical option chuddam—neeku laptop meeda hands-on build/design chese roles nachutaya leda team & clients tho communicate ayye roles baguntaya?`,
          emotion: 'curious',
          language: 'tanglish',
          recommendedCareerIds: memoryCareerIds,
          followUps: ['Laptop lo build & design roles', 'Team & communication roles', 'Na strengths enti?']
        }
      ],
      prevTexts
    );
  }

  return pickFreshResponse(
    [
      {
        text: `Let's unpack that together${nameTag}${memory.lastMentionedInterest ? ` alongside your interest in ${memory.lastMentionedInterest.replace('_', ' ')}` : ''}. Tell me a tiny bit more about what you're studying right now and what kind of daily work sounds energizing rather than draining to you?`,
        emotion: 'curious',
        language: 'english',
        recommendedCareerIds: memoryCareerIds,
        followUps: ['Hands-on coding & technical work', 'Creative design & visual problem solving', 'Strategy, business, or helping people']
      },
      {
        text: `To give you advice that actually fits your situation rather than generic tips${nameTag}, what's the biggest constraint or question on your mind right now—skills you need, job clarity, or deciding between two fields?`,
        emotion: 'thoughtful',
        language: 'english',
        recommendedCareerIds: memoryCareerIds,
        followUps: ['Deciding between two fields', 'Which skills matter most right now', 'What should I do next?']
      }
    ],
    prevTexts
  );
}

export function aiCompanionPlugin() {
  return {
    name: 'pathpilot-aira-companion-plugin',
    configureServer(server) {
      attachCompanionMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachCompanionMiddleware(server.middlewares);
    }
  };
}

function attachCompanionMiddleware(middlewares) {
  middlewares.use(async (req, res, next) => {
    const reqUrl = (req.url || '').split('?')[0];
    if (!reqUrl.startsWith('/api/companion/')) {
      next();
      return;
    }

    if (reqUrl === '/api/companion/status' && req.method === 'GET') {
      const hasLiveGemini = Boolean(getGeminiApiKey());
      sendJson(res, 200, {
        connected: true,
        companionName: 'AIRA',
        hasLiveGemini,
        provider: hasLiveGemini ? 'gemini-live' : 'aira-mentor-engine',
        supportedLanguages: ['auto', 'en-IN', 'te-IN', 'tanglish']
      });
      return;
    }

    if (reqUrl === '/api/companion/chat' && req.method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const message = String(body.message || '').trim();
        const conversationHistory = Array.isArray(body.conversationHistory)
          ? body.conversationHistory
          : [];
        const studentContext = body.studentContext || {};
        const starterAction = body.starterAction || null;
        const preferredLanguage = body.preferredLanguage || 'auto';

        if (!message && !starterAction) {
          sendJson(res, 400, { error: 'Please share a question or pick a topic to talk with AIRA.' });
          return;
        }

        const detectedLang = detectMessageLanguage(message, preferredLanguage, conversationHistory);
        const memory = extractConversationMemory(conversationHistory, studentContext);

        const apiKey = getGeminiApiKey();
        if (apiKey) {
          try {
            const live = await callServerGemini({
              apiKey,
              message,
              conversationHistory,
              studentContext,
              starterAction,
              preferredLanguage,
              detectedLang,
              memory
            });
            sendJson(res, 200, live);
            return;
          } catch (err) {
            console.warn('[PathPilot AIRA] Gemini API fallback:', err.message);
          }
        }

        const reply = buildMentorFallback({
          message,
          conversationHistory,
          studentContext,
          starterAction,
          preferredLanguage
        });
        sendJson(res, 200, {
          text: reply.text,
          spokenText: sanitizeForSpeech(reply.text),
          spokenTextFallback: reply.spokenTextFallback ? sanitizeForSpeech(reply.spokenTextFallback) : null,
          emotion: reply.emotion || 'warm',
          language: reply.language || detectedLang,
          recommendedCareerIds: reply.recommendedCareerIds || [],
          followUps: reply.followUps || [],
          isLiveApi: false,
          provider: 'aira-mentor-engine'
        });
      } catch (err) {
        sendJson(res, 500, { error: err.message || 'Unable to process AIRA mentor turn right now.' });
      }
      return;
    }

    sendJson(res, 404, { error: 'Companion endpoint not found.' });
  });
}
