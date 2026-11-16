import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Sparkles,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Trash2,
  History
} from 'lucide-react';

/**
 * Displays AIRA's active dialogue caption right beneath controls plus
 * an expandable conversation history transcript & past sessions drawer.
 */
export const ConversationTranscript = ({
  messages = [],
  pastSessions = [],
  interimTranscript = '',
  companionState = 'idle',
  isHistoryOpen = false,
  onToggleHistory,
  onStartNewConversation,
  onLoadPastSession,
  onClearAllHistory,
  onSelectFollowUp
}) => {
  const latestUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  const latestAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant');

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-3xl p-5 sm:p-6 border border-ivory-200 shadow-sm space-y-4">
        {/* Live Spoken / Typed Student Bubble */}
        {(interimTranscript || latestUserMsg) && (
          <div className="flex items-center justify-end gap-2">
            <div className="px-3.5 py-2 rounded-2xl bg-ivory-50 border border-ivory-200 text-xs text-charcoal-700 max-w-md">
              <span className="font-semibold text-charcoal-900 mr-1">You:</span>
              <span className={interimTranscript ? 'italic text-forest-800' : ''}>
                {interimTranscript || latestUserMsg?.text}
              </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-inverse text-on-inverse flex items-center justify-center shrink-0">
              <User className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* AIRA's Active Response */}
        {companionState === 'thinking' || companionState === 'processing' ? (
          <div className="flex items-start gap-3 animate-fadeIn">
            <div className="w-7 h-7 rounded-full bg-accent text-on-accent flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-accent-soft" />
            </div>
            <div className="py-2 flex items-center gap-2 text-xs text-charcoal-600">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-700 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-forest-700 animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-forest-700 animate-bounce delay-200" />
              <span className="ml-1 font-medium text-charcoal-500">
                {companionState === 'processing'
                  ? 'Processing your speech...'
                  : 'AIRA is thinking carefully...'}
              </span>
            </div>
          </div>
        ) : (
          latestAssistantMsg && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest-50 border border-forest-200/80 text-[10px] font-bold uppercase tracking-wider text-forest-800">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>AIRA</span>
                </span>
              </div>

              <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-normal">
                {latestAssistantMsg.text}
              </p>

              {/* Recommended Career Chips */}
              {Array.isArray(latestAssistantMsg.recommendedCareers) &&
                latestAssistantMsg.recommendedCareers.length > 0 && (
                  <div className="pt-2 border-t border-ivory-200/70 flex flex-wrap gap-2">
                    {latestAssistantMsg.recommendedCareers.map((career) => (
                      <Link
                        key={career.id}
                        to={`/careers/${career.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200/80 text-xs font-semibold text-forest-900 hover:bg-forest-100 transition-colors"
                      >
                        <span>Explore: {career.title}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}

              {/* Contextual Conversational Follow-Ups */}
              {Array.isArray(latestAssistantMsg.followUps) &&
                latestAssistantMsg.followUps.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {latestAssistantMsg.followUps.map((followUp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onSelectFollowUp(followUp)}
                        className="px-3 py-1.5 rounded-full bg-ivory-50 hover:bg-forest-50 border border-ivory-200 hover:border-forest-300 text-xs text-charcoal-700 font-medium transition-all inline-flex items-center gap-1"
                      >
                        <span>{followUp}</span>
                        <ArrowRight className="w-3 h-3 text-charcoal-400" />
                      </button>
                    ))}
                  </div>
                )}
            </div>
          )
        )}

        {/* Small Collapsible History Toggle & Session Controls */}
        {(messages.length > 1 || pastSessions.length > 0) && (
          <div className="pt-2 border-t border-ivory-200/70 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={onToggleHistory}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-charcoal-500 hover:text-charcoal-900 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>
                {isHistoryOpen
                  ? 'Hide conversation history'
                  : `Conversation history (${messages.length} turns${pastSessions.length ? ` • ${pastSessions.length} saved` : ''})`}
              </span>
              {isHistoryOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            <div className="flex items-center gap-2">
              {onStartNewConversation && messages.length > 1 && (
                <button
                  type="button"
                  onClick={onStartNewConversation}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ivory-50 hover:bg-muted border border-ivory-200 text-[11px] font-semibold text-charcoal-700 transition-colors"
                >
                  <PlusCircle className="w-3 h-3 text-forest-700" />
                  <span>New Conversation</span>
                </button>
              )}

              {onClearAllHistory && (messages.length > 1 || pastSessions.length > 0) && (
                <button
                  type="button"
                  onClick={onClearAllHistory}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ivory-50 hover:bg-red-50 border border-ivory-200 hover:border-red-200 text-[11px] font-medium text-charcoal-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear History</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expandable Compact History & Past Sessions Drawer */}
      {isHistoryOpen && (messages.length > 1 || pastSessions.length > 0) && (
        <div className="bg-card rounded-3xl p-5 border border-ivory-200 shadow-subtle space-y-4 max-h-80 overflow-y-auto animate-fadeIn">
          {messages.length > 1 && (
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
                Current Conversation with AIRA
              </span>
              <div className="space-y-2.5">
                {messages.map((msg, idx) => {
                  const isAira = msg.role === 'assistant';
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isAira
                          ? 'bg-ivory-50 border border-ivory-200 text-charcoal-800'
                          : 'bg-accent text-on-accent ml-8'
                      }`}
                    >
                      <span className="font-bold mr-1.5">
                        {isAira ? 'AIRA:' : 'You:'}
                      </span>
                      <span>{msg.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {pastSessions.length > 0 && (
            <div className="pt-3 border-t border-ivory-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 flex items-center gap-1">
                <History className="w-3 h-3 text-forest-700" />
                <span>Previous Saved Conversations</span>
              </span>
              <div className="space-y-1.5">
                {pastSessions.map((sess) => (
                  <button
                    key={sess.id}
                    type="button"
                    onClick={() => onLoadPastSession?.(sess)}
                    className="w-full text-left p-2.5 rounded-2xl bg-ivory-50 hover:bg-forest-50 border border-ivory-200 hover:border-forest-200 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-charcoal-800 truncate">
                        {sess.title}
                      </p>
                      <p className="text-[10px] text-charcoal-500">
                        {(sess.messages || []).length} messages
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-forest-800 shrink-0">
                      Load →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
