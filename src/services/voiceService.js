/**
 * AIRA 2.0 Bilingual Female Voice, Speech Capture & Timed Phoneme Lip-Sync Service
 *
 * Key upgrades:
 * - Synchronous speech recognition start on user tap (enables continuous capture + auto-silence commit)
 * - finishListening() commits buffered interim/final speech rather than aborting/dropping it
 * - Strict male-voice exclusion & consistent female voice identity for English & Telugu
 * - Phonetic spoken fallback if OS lacks a native Telugu (te-IN) female voice
 * - Timed phoneme/viseme + punctuation-pause timeline synced to utterance word boundaries
 */

export const DEFAULT_CLOSED_VISEME = {
  openness: 0,
  width: 0,
  roundness: 0,
  shape: 'closed',
  gestureBeat: 0
};

// Male voice names explicitly excluded so AIRA never falls back to a male voice
const MALE_VOICE_RE =
  /\b(david|mark|ravi|george|james|richard|daniel|alex|fred|guy|christopher|eric|andrew|brian|steffan|roger|jacob|liam|prabhat|madhur|mohan|sundar|rishi|thomas|oliver|william|benjamin|henry|ryan|aaron|nathan|arthur|male|man)\b/i;

// Ordered female voice preference (natural & youthful first, built-in female fallback last)
const FEMALE_VOICE_RANKERS = [
  { test: (v) => /neerja/i.test(v.name) && /natural|online/i.test(v.name), score: 100 },
  { test: (v) => /aria/i.test(v.name) && /natural|online/i.test(v.name), score: 96 },
  { test: (v) => /jenny|ava|sonia|libby|michelle|emma|clara/i.test(v.name) && /natural|online/i.test(v.name), score: 94 },
  { test: (v) => /google uk english female/i.test(v.name), score: 90 },
  { test: (v) => /google us english/i.test(v.name), score: 88 },
  { test: (v) => /neerja/i.test(v.name), score: 85 },
  { test: (v) => /shruti/i.test(v.name) && /natural|online/i.test(v.name), score: 84 },
  { test: (v) => /heera|veena/i.test(v.name), score: 80 },
  { test: (v) => /samantha|ava|karen|moira|tessa|serena|victoria/i.test(v.name), score: 78 },
  { test: (v) => /hazel|susan|catherine|katie|libby/i.test(v.name), score: 74 },
  { test: (v) => /zira/i.test(v.name), score: 70 },
  { test: (v) => /shruti/i.test(v.name), score: 66 },
  { test: (v) => /google\s+.*(telugu|తెలుగు)/i.test(v.name) && !MALE_VOICE_RE.test(v.name), score: 65 },
  { test: (v) => /female|woman|natural/i.test(v.name), score: 60 }
];

let activeRecognition = null;
let activeAudioCleanup = null;
let activeSilenceTimer = null;
let activeCommitFn = null;
let activeSpeechTimer = null;
let activeUtteranceId = 0;
let lockedFemaleVoiceURI = null;

export function isSpeechRecognitionSupported() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function isSpeechSynthesisSupported() {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

/**
 * Filters browser speechSynthesis voices strictly to verified female voices
 * supporting English or Telugu/Indian English.
 */
export function getAvailableFemaleVoices() {
  if (!isSpeechSynthesisSupported()) return [];
  const allVoices = window.speechSynthesis.getVoices() || [];

  const scored = [];
  for (const voice of allVoices) {
    const lang = (voice.lang || '').toLowerCase();
    if (!lang.startsWith('en') && !lang.startsWith('te')) continue;
    if (MALE_VOICE_RE.test(voice.name)) continue;

    let bestScore = 0;
    for (const rule of FEMALE_VOICE_RANKERS) {
      if (rule.test(voice)) {
        bestScore = Math.max(bestScore, rule.score);
      }
    }

    if (bestScore > 0) {
      scored.push({ voice, score: bestScore });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((item) => item.voice);
}

export function ensureFemaleVoicesReady(timeoutMs = 600) {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) {
      resolve([]);
      return;
    }

    const immediate = getAvailableFemaleVoices();
    if (immediate.length > 0 || (window.speechSynthesis.getVoices() || []).length > 0) {
      resolve(immediate);
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.speechSynthesis.removeEventListener?.('voiceschanged', onChanged);
      resolve(getAvailableFemaleVoices());
    };

    const onChanged = () => finish();
    window.speechSynthesis.addEventListener?.('voiceschanged', onChanged);
    setTimeout(finish, timeoutMs);
  });
}

/**
 * Picks and locks one consistent female voice for English / Telugu.
 */
export function pickConsistentFemaleVoice({ preferTeluguVoice = false } = {}) {
  const femaleVoices = getAvailableFemaleVoices();
  if (femaleVoices.length === 0) return null;

  if (preferTeluguVoice) {
    const teFemale = femaleVoices.find((v) => v.lang.toLowerCase().startsWith('te'));
    if (teFemale) return teFemale;
    return null; // Caller knows no native female Telugu voice exists and can use phonetic fallback cleanly
  }

  if (lockedFemaleVoiceURI) {
    const lockedMatch = femaleVoices.find((v) => v.voiceURI === lockedFemaleVoiceURI);
    if (lockedMatch) return lockedMatch;
  }

  const chosen = femaleVoices[0];
  lockedFemaleVoiceURI = chosen.voiceURI;
  return chosen;
}

export function setPreferredFemaleVoice(voiceURI) {
  lockedFemaleVoiceURI = voiceURI || null;
}

export function getActiveFemaleVoiceInfo() {
  const femaleVoices = getAvailableFemaleVoices();
  const voice = pickConsistentFemaleVoice({ preferTeluguVoice: false });
  const hasTeluguFemale = femaleVoices.some((v) => v.lang.toLowerCase().startsWith('te'));
  if (!voice) {
    return {
      available: false,
      hasTeluguFemale: false,
      name: 'No female TTS voice detected in this browser',
      lang: 'en-IN',
      isNatural: false
    };
  }
  return {
    available: true,
    hasTeluguFemale,
    voiceURI: voice.voiceURI,
    name: voice.name,
    lang: voice.lang,
    isNatural: /natural|online|google/i.test(voice.name)
  };
}

/**
 * Stops any ongoing AIRA speech immediately and resets her mouth viseme.
 */
export function stopSpeaking(onViseme) {
  activeUtteranceId += 1;
  if (activeSpeechTimer) {
    clearInterval(activeSpeechTimer);
    activeSpeechTimer = null;
  }
  if (isSpeechSynthesisSupported()) {
    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // Ignore cancel error
    }
  }
  if (typeof onViseme === 'function') {
    onViseme({ ...DEFAULT_CLOSED_VISEME });
  }
}

/**
 * Gracefully finishes the active listening session and commits captured speech.
 */
export function finishVoiceListening() {
  if (activeSilenceTimer) {
    clearTimeout(activeSilenceTimer);
    activeSilenceTimer = null;
  }
  if (typeof activeCommitFn === 'function') {
    activeCommitFn();
    return;
  }
  if (activeRecognition) {
    try {
      activeRecognition.stop();
    } catch {
      cancelListening();
    }
  }
}

/**
 * Aborts any ongoing SpeechRecognition immediately without submitting transcript.
 */
export function cancelListening() {
  if (activeSilenceTimer) {
    clearTimeout(activeSilenceTimer);
    activeSilenceTimer = null;
  }
  activeCommitFn = null;
  if (activeRecognition) {
    try {
      activeRecognition.abort();
    } catch {
      try {
        activeRecognition.stop();
      } catch {
        // Ignore stop error
      }
    }
    activeRecognition = null;
  }
  if (typeof activeAudioCleanup === 'function') {
    activeAudioCleanup();
    activeAudioCleanup = null;
  }
}

// Backward-compatible alias that commits rather than abruptly discarding unless explicit cancel
export function stopListening() {
  cancelListening();
}

export function cleanupVoiceSession(onViseme) {
  cancelListening();
  stopSpeaking(onViseme);
}

/**
 * Maps a Latin or Telugu word into a primary viseme frame.
 */
export function wordToViseme(word = '') {
  const raw = String(word || '').trim();
  if (!raw) return { ...DEFAULT_CLOSED_VISEME };

  // Handle Telugu Unicode vowels / consonants roughly for viseme shape
  if (/[\u0C00-\u0C7F]/.test(raw)) {
    if (/[పఫబభమ]/.test(raw[0])) {
      return { openness: 0.08, width: -0.04, roundness: 0.1, shape: 'closed', gestureBeat: 0.45 };
    }
    if (/[ఒఓఔఉఊ]/.test(raw)) {
      return { openness: 0.66, width: -0.24, roundness: 0.84, shape: 'round', gestureBeat: 0.72 };
    }
    if (/[ఇఈఎఏఐ]/.test(raw)) {
      return { openness: 0.5, width: 0.34, roundness: 0.04, shape: 'wide', gestureBeat: 0.65 };
    }
    return { openness: 0.78, width: 0.14, roundness: 0.12, shape: 'open', gestureBeat: 0.7 };
  }

  const lower = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!lower) return { openness: 0.18, width: 0.04, roundness: 0, shape: 'slight', gestureBeat: 0.15 };

  const emphasis = lower.length >= 6 ? 0.84 : lower.length >= 4 ? 0.58 : 0.34;
  if (/^[mbp]/.test(lower) && lower.length <= 2) {
    return { openness: 0.04, width: -0.05, roundness: 0.1, shape: 'closed', gestureBeat: emphasis * 0.4 };
  }
  if (/^(f|v|th)/.test(lower)) {
    return { openness: 0.24, width: 0.12, roundness: 0.04, shape: 'dental', gestureBeat: emphasis * 0.6 };
  }
  if (/[o0uw]/.test(lower)) {
    return { openness: 0.68, width: -0.25, roundness: 0.86, shape: 'round', gestureBeat: emphasis };
  }
  if (/[ei]/.test(lower)) {
    return { openness: 0.52, width: 0.34, roundness: 0.04, shape: 'wide', gestureBeat: emphasis * 0.82 };
  }
  if (/a/.test(lower)) {
    return { openness: 0.85, width: 0.15, roundness: 0.1, shape: 'open', gestureBeat: emphasis };
  }
  return { openness: 0.44, width: 0.1, roundness: 0.1, shape: 'slight', gestureBeat: emphasis * 0.65 };
}

/**
 * Builds phoneme-by-phoneme viseme frames for an individual word.
 */
export function buildWordSyllableVisemes(word = '') {
  const raw = String(word || '').trim();
  if (/[\u0C00-\u0C7F]/.test(raw)) {
    const base = wordToViseme(raw);
    return [
      { ...base, openness: Number((base.openness * 0.55).toFixed(2)) },
      base,
      { ...base, openness: Number((base.openness * 0.72).toFixed(2)) }
    ];
  }

  const clean = raw.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return [{ ...DEFAULT_CLOSED_VISEME }];

  const frames = [];
  const emphasis = clean.length >= 6 ? 0.88 : clean.length >= 4 ? 0.62 : 0.36;

  if (/^[mbp]/.test(clean)) {
    frames.push({ openness: 0.04, width: -0.05, roundness: 0.08, shape: 'closed', gestureBeat: emphasis * 0.3 });
  } else if (/^(f|v|th|s|z)/.test(clean)) {
    frames.push({ openness: 0.24, width: 0.12, roundness: 0.04, shape: 'dental', gestureBeat: emphasis * 0.42 });
  }

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (ch === 'a') {
      frames.push({ openness: 0.86, width: 0.15, roundness: 0.1, shape: 'open', gestureBeat: emphasis });
      frames.push({ openness: 0.68, width: 0.12, roundness: 0.1, shape: 'open', gestureBeat: Number((emphasis * 0.85).toFixed(2)) });
    } else if (ch === 'e' || ch === 'i' || ch === 'y') {
      frames.push({ openness: 0.5, width: 0.35, roundness: 0.04, shape: 'wide', gestureBeat: emphasis * 0.82 });
      frames.push({ openness: 0.38, width: 0.28, roundness: 0.04, shape: 'wide', gestureBeat: Number((emphasis * 0.7).toFixed(2)) });
    } else if (ch === 'o' || ch === 'u' || ch === 'w') {
      frames.push({ openness: 0.7, width: -0.25, roundness: 0.88, shape: 'round', gestureBeat: emphasis });
      frames.push({ openness: 0.54, width: -0.2, roundness: 0.76, shape: 'round', gestureBeat: Number((emphasis * 0.8).toFixed(2)) });
    } else if ((ch === 'm' || ch === 'b' || ch === 'p') && frames.length > 0 && i < clean.length - 1) {
      frames.push({ openness: 0.06, width: -0.04, roundness: 0.1, shape: 'closed', gestureBeat: emphasis * 0.35 });
    }
  }

  if (frames.length === 0) frames.push(wordToViseme(clean));
  return frames;
}

/**
 * Builds a complete, punctuation-aware timed speech viseme timeline for an utterance.
 * Returns { frames, wordStartFrames, estimatedTotalMs }.
 */
export function buildTimedSpeechTimeline(text = '', tickMs = 45) {
  const tokens = String(text || '').trim().split(/\s+/).filter(Boolean);
  const frames = [];
  const wordStartFrames = [];

  for (const token of tokens) {
    wordStartFrames.push(frames.length);
    const hasCommaPause = /[,;:—]$/.test(token);
    const hasSentencePause = /[.?!]$/.test(token);
    const wordFrames = buildWordSyllableVisemes(token);

    for (const wf of wordFrames) {
      frames.push(wf);
    }

    if (hasSentencePause) {
      for (let k = 0; k < 5; k++) frames.push({ ...DEFAULT_CLOSED_VISEME });
    } else if (hasCommaPause) {
      for (let k = 0; k < 3; k++) frames.push({ ...DEFAULT_CLOSED_VISEME });
    } else {
      // Gentle natural vowel decay between words so mouth isn't stuck open
      const last = wordFrames[wordFrames.length - 1] || DEFAULT_CLOSED_VISEME;
      frames.push({
        ...last,
        openness: Number((last.openness * 0.35).toFixed(2)),
        gestureBeat: Number(((last.gestureBeat || 0) * 0.6).toFixed(2))
      });
    }
  }

  if (frames.length === 0) frames.push({ ...DEFAULT_CLOSED_VISEME });
  const estimatedTotalMs = Math.max(1200, Math.round(frames.length * tickMs));
  return {
    frames,
    wordStartFrames,
    wordEvents: wordStartFrames,
    estimatedTotalMs,
    totalMs: estimatedTotalMs
  };
}

/**
 * Speaks AIRA's reply aloud using a locked, consistent female voice while syncing
 * mouth shapes to word boundaries and timed syllable/punctuation pauses.
 */
export async function speakWithLipSync(
  text,
  { fallbackSpokenText = null, muted = false, onStart, onViseme, onEnd, onError, onVoiceSelected } = {}
) {
  cancelListening();
  stopSpeaking(onViseme);

  const cleanText = String(text || '')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText || muted) {
    if (typeof onEnd === 'function') onEnd();
    return false;
  }

  if (!isSpeechSynthesisSupported()) {
    if (typeof onViseme === 'function') onViseme({ ...DEFAULT_CLOSED_VISEME });
    if (typeof onError === 'function') {
      onError(
        'tts-unsupported',
        'Voice playback is unavailable in this browser. Read AIRA’s response below or connect ElevenLabs / Azure Neural TTS.'
      );
    }
    if (typeof onEnd === 'function') onEnd();
    return false;
  }

  const utteranceId = activeUtteranceId;
  await ensureFemaleVoicesReady(600);
  if (utteranceId !== activeUtteranceId) return false;

  const hasTeluguScript = /[\u0C00-\u0C7F]/.test(cleanText);
  let speechPayload = cleanText;
  let chosenVoice = null;

  if (hasTeluguScript) {
    const teluguFemale = pickConsistentFemaleVoice({ preferTeluguVoice: true });
    if (teluguFemale) {
      chosenVoice = teluguFemale;
    } else if (fallbackSpokenText) {
      // Browser lacks native Telugu female voice: speak phonetic Telugu using AIRA's Indian-English female voice
      chosenVoice = pickConsistentFemaleVoice({ preferTeluguVoice: false });
      speechPayload = String(fallbackSpokenText)
        .replace(/[*_`#>]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    }
  } else {
    chosenVoice = pickConsistentFemaleVoice({ preferTeluguVoice: false });
  }

  if (!chosenVoice) {
    if (typeof onViseme === 'function') onViseme({ ...DEFAULT_CLOSED_VISEME });
    if (typeof onError === 'function') {
      onError(
        'female-voice-missing',
        'No verified female voice is available in this browser (male OS fallback blocked). Use Microsoft Edge or Chrome for natural female voices, or configure ElevenLabs / Azure Neural TTS.'
      );
    }
    if (typeof onEnd === 'function') onEnd();
    return false;
  }

  if (typeof onVoiceSelected === 'function') {
    onVoiceSelected(chosenVoice);
  }

  const utterance = new window.SpeechSynthesisUtterance(speechPayload);
  utterance.voice = chosenVoice;
  utterance.lang = chosenVoice.lang || 'en-IN';
  utterance.rate = 0.99;
  utterance.pitch = /natural|online/i.test(chosenVoice.name) ? 1.03 : 1.08;

  const TICK_MS = 45;
  const timeline = buildTimedSpeechTimeline(speechPayload, TICK_MS);
  const words = speechPayload.split(/\s+/);
  let frameCursor = 0;
  let lastBoundaryTime = Date.now();
  let boundarySupported = false;
  let startedObserved = false;
  let finished = false;
  let startWatchdog = null;

  const completeSpeech = () => {
    if (finished || utteranceId !== activeUtteranceId) return;
    finished = true;
    if (startWatchdog) {
      clearTimeout(startWatchdog);
      startWatchdog = null;
    }
    if (activeSpeechTimer) {
      clearInterval(activeSpeechTimer);
      activeSpeechTimer = null;
    }
    if (typeof onViseme === 'function') {
      onViseme({ ...DEFAULT_CLOSED_VISEME });
    }
    if (typeof onEnd === 'function') onEnd();
  };

  const beginAnimationCadence = (fallbackMode = false) => {
    if (activeSpeechTimer || finished || utteranceId !== activeUtteranceId) return;
    const fallbackStart = Date.now();
    const totalFrames = timeline.frames.length;
    const estDuration = Math.min(12000, Math.max(1800, words.length * 360));
    const stepStrideMs = Math.max(45, Math.round(estDuration / Math.max(1, totalFrames)));
    let elapsedTicks = 0;

    activeSpeechTimer = setInterval(() => {
      if (utteranceId !== activeUtteranceId || finished) {
        clearInterval(activeSpeechTimer);
        activeSpeechTimer = null;
        return;
      }

      if (startedObserved && !window.speechSynthesis.speaking && Date.now() - lastBoundaryTime > 420) {
        completeSpeech();
        return;
      }

      if (fallbackMode && !startedObserved && Date.now() - fallbackStart > estDuration) {
        completeSpeech();
        return;
      }

      elapsedTicks += 1;
      const msSinceBoundary = Date.now() - lastBoundaryTime;

      let frame;
      if (boundarySupported && msSinceBoundary < 300) {
        frame = timeline.frames[Math.min(frameCursor, totalFrames - 1)] || DEFAULT_CLOSED_VISEME;
        if (frameCursor < totalFrames - 1) frameCursor += 1;
      } else {
        const estimatedIdx = Math.min(
          totalFrames - 1,
          Math.floor(((Date.now() - fallbackStart) / Math.max(45, stepStrideMs)))
        );
        frame = timeline.frames[estimatedIdx] || DEFAULT_CLOSED_VISEME;
      }

      if (typeof onViseme === 'function') {
        onViseme({ ...frame });
      }
    }, TICK_MS);
  };

  utterance.onstart = () => {
    if (utteranceId !== activeUtteranceId || finished) return;
    startedObserved = true;
    if (startWatchdog) {
      clearTimeout(startWatchdog);
      startWatchdog = null;
    }
    lastBoundaryTime = Date.now();
    if (typeof onStart === 'function') onStart();
    beginAnimationCadence(false);
  };

  startWatchdog = setTimeout(() => {
    if (!startedObserved && !finished && utteranceId === activeUtteranceId) {
      if (typeof onStart === 'function') onStart();
      beginAnimationCadence(true);
    }
  }, 400);

  // Sync viseme timeline cursor to real browser word boundary timestamps
  utterance.onboundary = (event) => {
    if (utteranceId !== activeUtteranceId) return;
    if (event.name === 'word') {
      boundarySupported = true;
      lastBoundaryTime = Date.now();
      const charIdx = event.charIndex || 0;
      const precedingWords = speechPayload.slice(0, charIdx).trim().split(/\s+/).filter(Boolean).length;
      const alignedFrame = timeline.wordStartFrames[Math.min(precedingWords, timeline.wordStartFrames.length - 1)] || 0;
      frameCursor = alignedFrame;
      if (typeof onViseme === 'function') {
        onViseme({ ...(timeline.frames[alignedFrame] || DEFAULT_CLOSED_VISEME) });
      }
    }
  };

  utterance.onend = completeSpeech;
  utterance.onerror = () => completeSpeech();

  try {
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    completeSpeech();
    return false;
  }
}

/**
 * Starts real-time speech capture:
 * - Starts SpeechRecognition immediately on user gesture (never delayed behind getUserMedia)
 * - Uses continuous mode + 1850ms silence auto-commit so complete sentences aren't clipped
 * - Commits captured interim text if recognition ends before browser marks isFinal
 * - Safely interrupts ongoing AIRA voice playback immediately
 */
export function startVoiceListening({
  lang = 'en-IN',
  onStart,
  onProcessing,
  onAudioLevel,
  onInterimResult,
  onFinalResult,
  onError,
  onEnd
} = {}) {
  stopSpeaking();
  cancelListening();

  if (!isSpeechRecognitionSupported()) {
    const message =
      'Speech recognition is unavailable in this browser (use Google Chrome or Microsoft Edge). You can type your message below.';
    if (typeof onError === 'function') onError('stt-unsupported', message);
    if (typeof onEnd === 'function') onEnd();
    return null;
  }

  const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognitionCtor();
  recognition.lang = lang === 'tanglish' || lang === 'auto' ? 'en-IN' : lang || 'en-IN';
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.maxAlternatives = 1;
  activeRecognition = recognition;

  let finalTranscript = '';
  let latestInterim = '';
  let committed = false;
  let audioStream = null;
  let audioCtx = null;
  let levelInterval = null;

  const releaseMicResources = () => {
    if (activeSilenceTimer) {
      clearTimeout(activeSilenceTimer);
      activeSilenceTimer = null;
    }
    if (levelInterval) {
      clearInterval(levelInterval);
      levelInterval = null;
    }
    if (audioStream) {
      audioStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // Ignore track stop errors
        }
      });
      audioStream = null;
    }
    if (audioCtx && audioCtx.state !== 'closed') {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
    if (typeof onAudioLevel === 'function') onAudioLevel(0);
  };

  activeAudioCleanup = releaseMicResources;

  const commitCapturedSpeech = () => {
    if (committed) return;
    committed = true;
    activeCommitFn = null;
    if (activeSilenceTimer) {
      clearTimeout(activeSilenceTimer);
      activeSilenceTimer = null;
    }

    const combined = `${finalTranscript} ${latestInterim}`.trim().replace(/\s+/g, ' ');
    try {
      recognition.stop();
    } catch {
      // Ignore stop error
    }
    releaseMicResources();
    if (activeRecognition === recognition) {
      activeRecognition = null;
    }

    if (combined) {
      if (typeof onProcessing === 'function') onProcessing(combined);
      if (typeof onFinalResult === 'function') onFinalResult(combined);
    } else {
      if (typeof onError === 'function') {
        onError('no-speech', "I didn't hear anything clearly. Tap the microphone and speak close to your mic, or type below.");
      }
    }
    if (typeof onEnd === 'function') onEnd();
  };

  activeCommitFn = commitCapturedSpeech;

  recognition.onstart = () => {
    if (typeof onStart === 'function') onStart();

    // Start non-blocking Web Audio RMS meter after recognition has initialized cleanly
    if (navigator.mediaDevices?.getUserMedia && (window.AudioContext || window.webkitAudioContext)) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          if (activeRecognition !== recognition || committed) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          audioStream = stream;
          const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
          audioCtx = new AudioContextCtor();
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          levelInterval = setInterval(() => {
            if (activeRecognition !== recognition || committed) return;
            analyser.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
            const normalized = Math.min(1, avg / 75);
            if (typeof onAudioLevel === 'function') onAudioLevel(normalized);
          }, 60);
        })
        .catch(() => {
          // Audio level visualization is optional; do not fail speech recognition
        });
    }
  };

  recognition.onresult = (event) => {
    let interimChunk = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const piece = event.results[i][0]?.transcript || '';
      if (event.results[i].isFinal) {
        finalTranscript += piece + ' ';
      } else {
        interimChunk += piece;
      }
    }
    latestInterim = interimChunk;

    const liveText = `${finalTranscript} ${latestInterim}`.trim().replace(/\s+/g, ' ');
    if (liveText && typeof onInterimResult === 'function') {
      onInterimResult(liveText);
    }

    // Reset auto-commit silence timer after real speech words are heard
    if (liveText) {
      if (activeSilenceTimer) clearTimeout(activeSilenceTimer);
      const wordCount = liveText.split(/\s+/).length;
      const delayMs = finalTranscript.trim() ? 1300 : wordCount >= 3 ? 1900 : 2500;
      activeSilenceTimer = setTimeout(() => {
        if (activeRecognition === recognition && !committed) {
          commitCapturedSpeech();
        }
      }, delayMs);
    }
  };

  recognition.onerror = (event) => {
    if (event.error === 'aborted') {
      releaseMicResources();
      activeCommitFn = null;
      if (activeRecognition === recognition) activeRecognition = null;
      return;
    }

    // If browser already captured speech right before a no-speech/network end, commit it instead of failing!
    const rescued = `${finalTranscript} ${latestInterim}`.trim();
    if (rescued && !committed) {
      commitCapturedSpeech();
      return;
    }

    committed = true;
    activeCommitFn = null;
    releaseMicResources();
    if (activeRecognition === recognition) activeRecognition = null;

    let msg = 'Could not record your voice cleanly. Please try again or type your message below.';
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      msg =
        'Microphone permission is blocked. Click the lock/camera icon in your browser address bar, set Microphone to Allow, and try again.';
    } else if (event.error === 'audio-capture') {
      msg = 'No working microphone was detected on this device. Connect a mic or type your question below.';
    } else if (event.error === 'no-speech') {
      msg = "I didn't catch clear speech. Tap the mic and speak clearly, or type below.";
    } else if (event.error === 'network') {
      msg = 'Browser speech recognition requires an active internet connection. You can type below anytime!';
    }
    if (typeof onError === 'function') onError(event.error, msg);
    if (typeof onEnd === 'function') onEnd();
  };

  recognition.onend = () => {
    if (!committed) {
      commitCapturedSpeech();
    }
  };

  try {
    // Synchronous start right inside click gesture
    recognition.start();
    return recognition;
  } catch (err) {
    committed = true;
    activeCommitFn = null;
    releaseMicResources();
    if (activeRecognition === recognition) activeRecognition = null;
    if (typeof onError === 'function') {
      onError('start-failed', err.message || 'Unable to start microphone recording.');
    }
    if (typeof onEnd === 'function') onEnd();
    return null;
  }
}
