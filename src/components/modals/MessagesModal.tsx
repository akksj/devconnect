import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import { useAppStore } from '../../store/useAppStore';
import { Send, Code, Terminal, Bot } from 'lucide-react';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDevId?: string | null;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  isOpen,
  onClose,
  defaultDevId
}) => {
  const { 
    currentUser, 
    developers, 
    messages, 
    sendMessage 
  } = useAppStore();

  const otherDevelopers = developers.filter((d) => d.id !== currentUser.id);
  const [selectedDevId, setSelectedDevId] = useState<string>(
    defaultDevId || otherDevelopers[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultDevId) {
      setSelectedDevId(defaultDevId);
    }
  }, [defaultDevId]);

  const activeDev = developers.find((d) => d.id === selectedDevId) || otherDevelopers[0];

  // Conversation messages between currentUser and selectedDev
  const conversation = messages.filter(
    (m) =>
      (m.senderId === currentUser.id && m.recipientId === activeDev?.id) ||
      (m.senderId === activeDev?.id && m.recipientId === currentUser.id)
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.length, selectedDevId]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !activeDev) return;

    const sentText = inputText;
    sendMessage(activeDev.id, sentText);
    setInputText('');

    // Simulate realistic AI/peer response after 1.5 seconds
    setTimeout(() => {
      const peerReplies = [
        `Thanks for sharing! Checking out the repo now. Looks very solid.`,
        `That architecture decision makes total sense. Have you benchmarked latency under load?`,
        `Awesome! Let's schedule a 15-min sync later this week to chat through the details.`,
        `Great point! I was just discussing this exact design with our team yesterday.`
      ];
      const randomReply = peerReplies[Math.floor(Math.random() * peerReplies.length)];
      sendMessage(currentUser.id, randomReply);
    }, 1500);
  };

  const insertCodeSnippet = () => {
    setInputText(
      (prev) =>
        prev +
        `\n\`\`\`ts\n// Architectural benchmark\nconst latency = await measureP99();\nconsole.log({ latency });\n\`\`\``
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Direct Messages"
      subtitle="Chat with verified software engineers and collaborate"
      maxWidth="3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[480px]">
        {/* Left: Developer Threads */}
        <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pr-0 md:pr-4 overflow-y-auto space-y-1.5 max-h-36 md:max-h-full">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 block mb-2">
            Conversations
          </span>
          {otherDevelopers.map((dev) => {
            const isSelected = dev.id === activeDev?.id;
            return (
              <button
                key={dev.id}
                onClick={() => setSelectedDevId(dev.id)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'hover:bg-slate-100 dark:hover:bg-[#1B263B] text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={dev.avatar}
                    alt={dev.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-white/20"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#151E2E]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold truncate">{dev.name}</p>
                  <p className={`text-[11px] truncate ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {dev.headline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Active Chat View */}
        <div className="md:col-span-8 flex flex-col justify-between h-[340px] md:h-full">
          {activeDev ? (
            <>
              {/* Header */}
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={activeDev.avatar}
                    alt={activeDev.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {activeDev.name}
                    </h4>
                    <p className="text-[10px] text-emerald-500 font-medium">Active now</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
                  {activeDev.experienceLevel}
                </span>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-2">
                {conversation.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-4">
                    <p className="text-xs">No prior messages with {activeDev.name}.</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Start the conversation by saying hello or sharing a project link!
                    </p>
                  </div>
                ) : (
                  conversation.map((msg) => {
                    const isMe = msg.senderId === currentUser.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                            isMe
                              ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                              : 'bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 rounded-bl-none'
                          }`}
                        >
                          {msg.text.includes('```') ? (
                            <pre className="font-mono text-[11px] p-2 bg-black/40 rounded-lg overflow-x-auto my-1">
                              {msg.text.replace(/```/g, '')}
                            </pre>
                          ) : (
                            msg.text
                          )}
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 px-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={insertCodeSnippet}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-400 transition-colors"
                  >
                    <Terminal className="w-3 h-3" /> Code snippet
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Message ${activeDev.name}...`}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">
              Select a developer to message
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
