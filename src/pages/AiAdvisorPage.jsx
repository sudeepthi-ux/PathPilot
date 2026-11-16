import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { CompanionAvatar } from '../components/companion/CompanionAvatar';
import { VoiceControls } from '../components/companion/VoiceControls';
import { ConversationTranscript } from '../components/companion/ConversationTranscript';
import { JourneySoFarPanel } from '../components/companion/JourneySoFarPanel';
import { QuickStarterCards } from '../components/companion/QuickStarterCards';
import {
  askCareerCompanion,
  buildPersonalizedGreeting,
  buildStudentContext,
  getCompanionStatus
} from '../services/aiAdvisorService';
import {
  DEFAULT_CLOSED_VISEME,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  ensureFemaleVoicesReady,
  getAvailableFemaleVoices,
  getActiveFemaleVoiceInfo,
  pickConsistentFemaleVoice,
  setPreferredFemaleVoice,
  startVoiceListening,
  finishVoiceListening,
  stopListening,
  speakWithLipSync,
  stopSpeaking,
  cleanupVoiceSession
} from '../services/voiceService';

const STORAGE_KEY_CONVERSATION = 'pathpilot_aira_conversation';

export const AiAdvisorPage = () => {
  const {
    user,
    studentProfile,
    saveAiraConversation,
    startNewAiraConversation,
    clearAiraConversationHistory
  } = useAuth();
  const userStorageKey = user?.id ? `${STORAGE_KEY_CONVERSATION}_${user.id}` : STORAGE_KEY_CONVERSATION;
  const studentContext = useMemo(
    () => buildStudentContext(user, studentProfile),
    [user, studentProfile]
  );

  const initialMessage = useMemo(
    () => ({
      role: 'assistant',
      text: buildPersonalizedGreeting(user, studentProfile),
      emotion: 'warm',
      recommendedCareers: [],
      followUps: [
        'I am confused about choosing between CSE and ECE.',
        'AIRA, naku coding ante interest undi kani math koncham bhayam, em cheyali?'
      ]
    }),
    [user?.id, studentProfile?.personalityResult, studentProfile?.interestResult, studentProfile?.strengthResult]
  );

  const [messages, setMessages] = useState(() => {
    if (Array.isArray(studentProfile?.airaMessages) && studentProfile.airaMessages.length > 0) {
      return studentProfile.airaMessages;
    }
    try {
      const saved = sessionStorage.getItem(userStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore storage read error
    }
    return [initialMessage];
  });

  // Restore persisted user-specific AIRA history when profile finishes hydrating
  useEffect(() => {
    const hasActiveUserTurn = messages.some((m) => m.role === 'user');
    if (
      !hasActiveUserTurn &&
      Array.isArray(studentProfile?.airaMessages) &&
      studentProfile.airaMessages.length > 1
    ) {
      setMessages(studentProfile.airaMessages);
    }
  }, [user?.id, studentProfile?.airaMessages]);

  const [companionState, setCompanionState] = useState('idle'); // 'idle' | 'listening' | 'processing' | 'thinking' | 'speaking' | 'error'
  const [emotion, setEmotion] = useState('warm');
  const [viseme, setViseme] = useState({ ...DEFAULT_CLOSED_VISEME });
  const [micLevel, setMicLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speechLang, setSpeechLang] = useState('auto');
  const [femaleVoices, setFemaleVoices] = useState([]);
  const [activeVoiceURI, setActiveVoiceURI] = useState('');
  const [voiceInfo, setVoiceInfo] = useState(() => getActiveFemaleVoiceInfo());
  const [interimTranscript, setInterimTranscript] = useState('');
  const [typedInput, setTypedInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');
  const [errorBanner, setErrorBanner] = useState('');
  const [backendStatus, setBackendStatus] = useState({ connected: true, provider: 'aira-mentor-engine' });

  const textInputRef = useRef(null);
  const isMountedRef = useRef(true);
  const voiceSupported = isSpeechRecognitionSupported();

  // Persist user-scoped conversation transcript in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(userStorageKey, JSON.stringify(messages));
    } catch {
      // Ignore storage write error
    }
  }, [messages, userStorageKey]);

  // Hydrate female TTS voices, check backend status, and release mic/audio on unmount
  useEffect(() => {
    isMountedRef.current = true;

    getCompanionStatus().then((status) => {
      if (isMountedRef.current) setBackendStatus(status);
    });

    const refreshFemaleVoices = async () => {
      const voices = await ensureFemaleVoicesReady(700);
      if (!isMountedRef.current) return;
      setFemaleVoices(voices);
      const locked = pickConsistentFemaleVoice();
      if (locked) {
        setActiveVoiceURI(locked.voiceURI);
      }
      setVoiceInfo(getActiveFemaleVoiceInfo());
    };

    refreshFemaleVoices();
    const synth = isSpeechSynthesisSupported() ? window.speechSynthesis : null;
    synth?.addEventListener?.('voiceschanged', refreshFemaleVoices);

    return () => {
      isMountedRef.current = false;
      synth?.removeEventListener?.('voiceschanged', refreshFemaleVoices);
      cleanupVoiceSession();
    };
  }, []);

  const speakTextWithFemaleVoice = useCallback(
    async (spokenText, fallbackSpokenText = '') => {
      if (!spokenText || isMuted) return false;
      const started = await speakWithLipSync(spokenText, {
        fallbackSpokenText,
        muted: false,
        onVoiceSelected: (voice) => {
          if (!isMountedRef.current) return;
          setActiveVoiceURI(voice.voiceURI);
          setVoiceInfo(getActiveFemaleVoiceInfo());
        },
        onStart: () => {
          if (isMountedRef.current) setCompanionState('speaking');
        },
        onViseme: (nextViseme) => {
          if (isMountedRef.current) setViseme(nextViseme);
        },
        onEnd: () => {
          if (isMountedRef.current) {
            setViseme({ ...DEFAULT_CLOSED_VISEME });
            setCompanionState('idle');
          }
        },
        onError: (_code, msg) => {
          if (isMountedRef.current) {
            setVoiceNotice(msg);
            setViseme({ ...DEFAULT_CLOSED_VISEME });
            setCompanionState('idle');
          }
        }
      });

      if (isMountedRef.current && started) {
        setCompanionState('speaking');
      }
      return started;
    },
    [isMuted]
  );

  // Send a spoken or typed message to AIRA's server mentor engine and speak reply aloud
  const sendToCompanion = useCallback(
    async ({ messageText, starterAction = null, speakReply = true }) => {
      const cleanText = String(messageText || '').trim();
      if (!cleanText && !starterAction) return;
      if (companionState === 'thinking') return;

      stopListening();
      stopSpeaking(setViseme);
      setErrorBanner('');
      setVoiceNotice('');
      setInterimTranscript('');

      const updatedHistory = [...messages, { role: 'user', text: cleanText }];
      setMessages(updatedHistory);
      setTypedInput('');
      setCompanionState('thinking');

      try {
        const reply = await askCareerCompanion({
          message: cleanText,
          conversationHistory: updatedHistory,
          studentContext,
          starterAction,
          preferredLanguage: speechLang
        });

        if (!isMountedRef.current) return;

        const assistantEntry = {
          role: 'assistant',
          text: reply.text,
          spokenText: reply.spokenText || reply.text,
          spokenTextFallback: reply.spokenTextFallback || '',
          language: reply.language || speechLang,
          emotion: reply.emotion || 'warm',
          recommendedCareers: reply.recommendedCareers || [],
          followUps: reply.followUps || [],
          isLiveApi: reply.isLiveApi
        };

        const nextMessages = [...updatedHistory, assistantEntry];
        setMessages(nextMessages);
        saveAiraConversation(nextMessages);
        setEmotion(reply.emotion || 'warm');

        if (speakReply && !isMuted) {
          const started = await speakTextWithFemaleVoice(
            assistantEntry.spokenText,
            assistantEntry.spokenTextFallback
          );
          if (isMountedRef.current && !started) {
            setCompanionState('idle');
          }
        } else {
          setCompanionState('idle');
        }
      } catch (err) {
        if (!isMountedRef.current) return;
        setErrorBanner(err.message || 'Unable to reach AIRA mentor right now.');
        setCompanionState('error');
      }
    },
    [companionState, messages, studentContext, speechLang, isMuted, speakTextWithFemaleVoice]
  );

  const handleToggleListen = async () => {
    setErrorBanner('');
    setVoiceNotice('');

    if (companionState === 'listening') {
      finishVoiceListening();
      return;
    }

    // Interrupt AIRA cleanly if user taps the mic while she is speaking
    if (companionState === 'speaking') {
      stopSpeaking(setViseme);
    }

    if (!voiceSupported) {
      setVoiceNotice(
        'Voice input is unavailable in this browser (Chrome or Edge recommended). Type below to talk with AIRA!'
      );
      textInputRef.current?.focus();
      return;
    }

    setInterimTranscript('');
    setCompanionState('listening');

    await startVoiceListening({
      lang: speechLang,
      onStart: () => {
        if (isMountedRef.current) setCompanionState('listening');
      },
      onAudioLevel: (lvl) => {
        if (isMountedRef.current) setMicLevel(lvl);
      },
      onInterimResult: (transcript) => {
        if (isMountedRef.current) setInterimTranscript(transcript);
      },
      onProcessing: (capturedText) => {
        if (!isMountedRef.current) return;
        if (capturedText) setInterimTranscript(capturedText);
        setCompanionState('processing');
      },
      onFinalResult: (finalSpeech) => {
        if (!isMountedRef.current) return;
        sendToCompanion({ messageText: finalSpeech, speakReply: true });
      },
      onError: (code, friendlyMsg) => {
        if (!isMountedRef.current) return;
        setVoiceNotice(friendlyMsg);
        setInterimTranscript('');
        setMicLevel(0);
        const isHardMicError = code === 'not-allowed' || code === 'audio-capture' || code === 'start-failed';
        setCompanionState(isHardMicError ? 'error' : 'idle');
      },
      onEnd: () => {
        if (!isMountedRef.current) return;
        setMicLevel(0);
        setCompanionState((prev) => (prev === 'listening' ? 'idle' : prev));
      }
    });
  };

  const latestAssistantMessage = useMemo(
    () => [...messages].reverse().find((m) => m.role === 'assistant') || initialMessage,
    [messages, initialMessage]
  );

  const handleReplayVoice = useCallback(async () => {
    const spokenTarget = latestAssistantMessage?.spokenText || latestAssistantMessage?.text;
    const fallbackTarget = latestAssistantMessage?.spokenTextFallback || '';
    if (!spokenTarget || isMuted || companionState === 'thinking' || companionState === 'processing') return;

    stopListening();
    setVoiceNotice('');
    setEmotion(latestAssistantMessage?.emotion || 'warm');
    await speakTextWithFemaleVoice(spokenTarget, fallbackTarget);
  }, [latestAssistantMessage, isMuted, companionState, speakTextWithFemaleVoice]);

  const handleStopSpeaking = () => {
    stopSpeaking(setViseme);
    setCompanionState('idle');
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next && companionState === 'speaking') {
        stopSpeaking(setViseme);
        setCompanionState('idle');
      }
      return next;
    });
  };

  const handleChangeFemaleVoice = (voiceURI) => {
    setPreferredFemaleVoice(voiceURI);
    setActiveVoiceURI(voiceURI);
    setVoiceInfo(getActiveFemaleVoiceInfo());
  };

  const handleResetConversation = () => {
    cleanupVoiceSession(setViseme);
    setCompanionState('idle');
    setEmotion('warm');
    setInterimTranscript('');
    setTypedInput('');
    setErrorBanner('');
    setVoiceNotice('');
    startNewAiraConversation(initialMessage);
    setMessages([initialMessage]);
    try {
      sessionStorage.removeItem(userStorageKey);
    } catch {
      // Ignore storage error
    }
  };

  const handleLoadPastSession = (session) => {
    if (!session || !Array.isArray(session.messages) || session.messages.length === 0) return;
    cleanupVoiceSession(setViseme);
    setCompanionState('idle');
    setMessages(session.messages);
    saveAiraConversation(session.messages);
  };

  const handleClearAllHistory = () => {
    cleanupVoiceSession(setViseme);
    setCompanionState('idle');
    setEmotion('warm');
    setInterimTranscript('');
    setTypedInput('');
    setErrorBanner('');
    setVoiceNotice('');
    clearAiraConversationHistory(initialMessage);
    setMessages([initialMessage]);
    setShowHistory(false);
    try {
      sessionStorage.removeItem(userStorageKey);
    } catch {
      // Ignore storage error
    }
  };

  const handleQuickStarter = (starter) => {
    sendToCompanion({
      messageText: starter.prompt,
      starterAction: starter.id,
      speakReply: true
    });
  };

  return (
    <div className="pt-24 pb-20 bg-ivory-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Top Studio Header & Active Mode Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-ivory-200 gap-3">
          <div className="flex items-center gap-4">
            <Link
              to="/careers"
              className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-charcoal-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Career Library</span>
            </Link>
            <span className="text-ivory-300">|</span>
            <h1 className="text-sm sm:text-base font-bold text-charcoal-900 tracking-tight">
              AIRA • Female AI Career Companion
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            {backendStatus.hasLiveGemini ? (
              <span className="px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-forest-600 animate-pulse" />
                Live Gemini Companion
              </span>
            ) : (
              <span
                className="px-3 py-1 rounded-full bg-card border border-ivory-200 text-charcoal-600 text-xs font-medium flex items-center gap-1.5"
                title="Running on AIRA's PathPilot server mentor engine. Set GEMINI_API_KEY in .env to enable live Gemini streaming."
              >
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                AIRA Mentor Engine (EN / తెలుగు / Tanglish)
              </span>
            )}
          </div>
        </div>

        {/* Main Companion Stage + Personalized Student Context Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Primary AIRA Column (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Large Animated Semi-Realistic 3D Female Avatar Stage */}
            <CompanionAvatar
              state={companionState}
              emotion={emotion}
              viseme={viseme}
              micLevel={micLevel}
              isMuted={isMuted}
              voiceInfo={voiceInfo}
              onSpeakReply={handleReplayVoice}
            />

            {/* Voice Controls & Text Fallback Bar */}
            <div className="bg-card rounded-3xl p-5 border border-ivory-200 shadow-sm space-y-4">
              <VoiceControls
                companionState={companionState}
                micLevel={micLevel}
                interimTranscript={interimTranscript}
                isMuted={isMuted}
                voiceSupported={voiceSupported}
                voiceNotice={voiceNotice}
                speechLang={speechLang}
                femaleVoices={femaleVoices}
                activeVoiceURI={activeVoiceURI}
                activeVoiceName={voiceInfo.name}
                onChangeSpeechLang={(nextLang) => {
                  if (companionState === 'listening') stopListening();
                  setSpeechLang(nextLang);
                }}
                onChangeFemaleVoice={handleChangeFemaleVoice}
                onToggleListen={handleToggleListen}
                onReplayVoice={handleReplayVoice}
                onStopSpeaking={handleStopSpeaking}
                onToggleMute={handleToggleMute}
                onResetConversation={handleResetConversation}
              />

              {errorBanner && (
                <div
                  role="alert"
                  className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorBanner}</span>
                </div>
              )}

              {/* Conversational Text Fallback Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendToCompanion({ messageText: typedInput, speakReply: true });
                }}
                className="pt-3 border-t border-ivory-200/80 flex items-center gap-2.5"
              >
                <input
                  ref={textInputRef}
                  type="text"
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  placeholder="Prefer typing? Ask AIRA in English, తెలుగు, or Tanglish..."
                  disabled={companionState === 'thinking' || companionState === 'processing'}
                  aria-label="Type your message to AIRA"
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs sm:text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest-600/30 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!typedInput.trim() || companionState === 'thinking' || companionState === 'processing'}
                  icon={Send}
                  iconPosition="right"
                >
                  Ask AIRA
                </Button>
              </form>
            </div>

            {/* Minimal Live Dialogue Caption & Expandable History */}
            <ConversationTranscript
              messages={messages}
              pastSessions={studentProfile?.airaPastSessions || []}
              interimTranscript={interimTranscript}
              companionState={companionState}
              isHistoryOpen={showHistory}
              onToggleHistory={() => setShowHistory((prev) => !prev)}
              onStartNewConversation={handleResetConversation}
              onLoadPastSession={handleLoadPastSession}
              onClearAllHistory={handleClearAllHistory}
              onSelectFollowUp={(question) =>
                sendToCompanion({ messageText: question, speakReply: true })
              }
            />
          </div>

          {/* Right Column: Verified Student Context Panel (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <JourneySoFarPanel user={user} studentProfile={studentProfile} />
          </div>
        </div>

        {/* Quick Conversation Starters */}
        <QuickStarterCards
          onSelectStarter={handleQuickStarter}
          disabled={companionState === 'thinking'}
        />
      </div>
    </div>
  );
};
