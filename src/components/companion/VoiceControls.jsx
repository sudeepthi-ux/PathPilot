import React from 'react';
import { Mic, MicOff, Square, Volume2, VolumeX, RotateCcw, Play, Languages } from 'lucide-react';

const SPEECH_LANGUAGES = [
  { code: 'auto', label: 'Auto (EN / తెలుగు)' },
  { code: 'en-IN', label: 'English' },
  { code: 'te-IN', label: 'తెలుగు' },
  { code: 'tanglish', label: 'Tanglish' }
];

/**
 * AIRA Voice Control Deck with Microphone (also supports interrupting mid-speech),
 * Replay, Stop Speaking, Mute/Unmute, End Conversation, Female Voice & Language controls.
 */
export const VoiceControls = ({
  companionState = 'idle', // 'idle' | 'listening' | 'processing' | 'thinking' | 'speaking' | 'error'
  micLevel = 0,
  interimTranscript = '',
  isMuted = false,
  voiceSupported = true,
  voiceNotice = '',
  speechLang = 'auto',
  femaleVoices = [],
  activeVoiceURI = '',
  activeVoiceName = '',
  onChangeSpeechLang,
  onChangeFemaleVoice,
  onToggleListen,
  onReplayVoice,
  onStopSpeaking,
  onToggleMute,
  onResetConversation
}) => {
  const isListening = companionState === 'listening';
  const isProcessing = companionState === 'processing';
  const isSpeaking = companionState === 'speaking';
  const isThinking = companionState === 'thinking';
  const isError = companionState === 'error';
  const isBusy = isThinking || isProcessing;

  const equalizerHeights = [0.35, 0.65, 0.9, 1, 0.85, 0.6, 0.4].map((mult, idx) => {
    if (isListening) return Math.max(20, Math.round((0.24 + micLevel * mult) * 100));
    if (isSpeaking) return 32 + ((idx * 19) % 58);
    return 18;
  });

  return (
    <div className="space-y-4">
      {/* Main Studio Control Row: Mute, Replay, Primary Mic, Stop, End Conversation */}
      <div className="flex items-center justify-center gap-3 sm:gap-3.5">
        {/* Mute / Unmute */}
        <button
          type="button"
          onClick={onToggleMute}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
            isMuted
              ? 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
              : 'bg-card border-ivory-200 text-charcoal-700 hover:border-charcoal-300 hover:bg-ivory-50'
          }`}
          title={isMuted ? 'Unmute AIRA voice' : 'Mute AIRA voice'}
          aria-label={isMuted ? 'Unmute AIRA voice' : 'Mute AIRA voice'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Replay AIRA's Current Message */}
        <button
          type="button"
          onClick={onReplayVoice}
          disabled={isBusy || isListening || isMuted}
          className="w-11 h-11 rounded-full bg-card border border-ivory-200 text-forest-800 hover:border-forest-300 hover:bg-forest-50 flex items-center justify-center transition-all disabled:opacity-40"
          title={isMuted ? 'Unmute to hear AIRA replay response' : 'Replay AIRA voice'}
          aria-label="Replay AIRA voice"
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </button>

        {/* Primary Microphone Button (Commits speech when listening; Interrupts AIRA when speaking) */}
        <div className="relative flex items-center justify-center">
          {isListening && (
            <span
              className="absolute inset-0 rounded-full bg-forest-600/25 animate-ping"
              aria-hidden="true"
            />
          )}
          <button
            type="button"
            onClick={onToggleListen}
            disabled={isBusy}
            aria-label={
              isListening
                ? 'Finish speaking and send to AIRA'
                : isSpeaking
                ? 'Interrupt AIRA and speak'
                : 'Speak to AIRA'
            }
            title={
              isListening
                ? 'Done speaking — tap to send to AIRA'
                : isSpeaking
                ? 'Tap to interrupt AIRA and speak'
                : 'Tap to speak with AIRA'
            }
            className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-elevated transition-all active:scale-95 disabled:opacity-50 ${
              isListening
                ? 'bg-danger hover:bg-danger-hover text-white'
                : isError
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-accent hover:bg-accent-hover text-on-accent'
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
        </div>

        {/* Stop Speaking */}
        <button
          type="button"
          onClick={onStopSpeaking}
          disabled={!isSpeaking}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
            isSpeaking
              ? 'bg-forest-50 border-forest-300 text-forest-800 hover:bg-forest-100'
              : 'bg-card border-ivory-200 text-charcoal-300 opacity-60 cursor-not-allowed'
          }`}
          title="Stop AIRA speaking"
          aria-label="Stop AIRA speaking"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>

        {/* End & Reset Conversation */}
        <button
          type="button"
          onClick={onResetConversation}
          className="w-11 h-11 rounded-full bg-card border border-ivory-200 text-charcoal-600 hover:text-charcoal-900 hover:border-charcoal-300 hover:bg-ivory-50 flex items-center justify-center transition-all"
          title="End conversation"
          aria-label="End conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Live Equalizer, Captured Speech Preview + Status Text */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        {(isListening || isSpeaking) && (
          <div className="flex items-end justify-center gap-1 h-4" aria-hidden="true">
            {equalizerHeights.map((pct, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-100 ${
                  isListening ? 'bg-forest-600' : 'bg-accent/75 animate-pulse'
                }`}
                style={{ height: `${pct}%` }}
              />
            ))}
          </div>
        )}

        {(isListening || isProcessing) && interimTranscript && (
          <div
            aria-live="polite"
            className="px-3.5 py-1.5 rounded-2xl bg-forest-50 border border-forest-200 text-xs font-medium text-forest-900 max-w-xl"
          >
            <span className="font-bold mr-1.5 text-forest-700">Heard:</span>
            <span>“{interimTranscript}”</span>
          </div>
        )}

        <p className={`text-xs font-medium ${isError ? 'text-red-700' : 'text-charcoal-600'}`}>
          {isListening
            ? 'Listening... speak naturally in English, తెలుగు, or Tanglish. Pause briefly or tap mic when done.'
            : isProcessing
            ? 'Capturing your speech and preparing AIRA’s response...'
            : isThinking
            ? 'AIRA is understanding your question and PathPilot progress...'
            : isSpeaking
            ? 'AIRA is speaking — tap Stop or Microphone anytime to interrupt.'
            : isError
            ? 'Microphone capture issue — see the notice below or type to AIRA.'
            : voiceSupported
            ? 'Tap the microphone to talk with AIRA, replay her voice, or type below.'
            : 'Click replay to hear AIRA, or type your message below.'}
        </p>

        {voiceNotice && (
          <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl max-w-xl">
            {voiceNotice}
          </p>
        )}
      </div>

      {/* Speech Language Mode & Female Voice Selector Row */}
      <div className="pt-2 border-t border-ivory-200/70 flex flex-wrap items-center justify-between gap-2.5 text-[11px]">
        <div className="flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-forest-700" />
          <span className="text-charcoal-500 font-medium">Speech:</span>
          <div className="flex items-center gap-1">
            {SPEECH_LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => onChangeSpeechLang?.(item.code)}
                className={`px-2.5 py-0.5 rounded-full border font-medium transition-colors ${
                  speechLang === item.code
                    ? 'bg-accent text-on-accent border-accent'
                    : 'bg-ivory-50 text-charcoal-600 border-ivory-200 hover:border-charcoal-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-charcoal-500">
          <span className="font-medium">AIRA Female Voice:</span>
          {femaleVoices.length > 0 ? (
            <select
              value={activeVoiceURI}
              onChange={(e) => onChangeFemaleVoice?.(e.target.value)}
              aria-label="Select AIRA female voice"
              className="px-2.5 py-1 rounded-full bg-ivory-50 border border-ivory-200 text-[11px] font-medium text-charcoal-800 focus:outline-none focus:ring-1 focus:ring-forest-700 max-w-[200px] truncate"
            >
              {femaleVoices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          ) : (
            <span className="text-amber-700 font-medium">
              {activeVoiceName || 'Browser female voice unavailable'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
