import { useState } from 'react';
import { Trash2, Sun, Moon } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { InputContainer } from './InputContainer';
import { useTheme } from './ThemeProvider';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface CenterStageProps {
  temperature: number;
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  showRightPanel: boolean;
  setShowRightPanel: (value: boolean) => void;
  messages: Message[];
  onClearChat: () => void;
}

export function CenterStage({
  temperature,
  selectedModel,
  setSelectedModel,
  showRightPanel,
  setShowRightPanel,
  messages,
  onClearChat
}: CenterStageProps) {
  const [message, setMessage] = useState('');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex-1 flex flex-col bg-[#222222]">
      {/* Top Header */}
      <div className="flex items-center justify-end gap-2 px-8 py-4">
        <button
          onClick={toggleTheme}
          className="p-2.5 text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all rounded-lg"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Moon className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
        <button
          onClick={onClearChat}
          className="p-2.5 text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors rounded-lg"
          title="Clear chat"
        >
          <Trash2 className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Chat Timeline */}
      <div
        className="flex-1 overflow-y-auto px-8 py-6"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        <style>{`
          .flex-1.overflow-y-auto::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={index} type={msg.type} content={msg.content} />
          ))}
        </div>
      </div>

      {/* Input Container */}
      <div className="px-8 pb-8">
        <InputContainer
          temperature={temperature}
          message={message}
          setMessage={setMessage}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          showRightPanel={showRightPanel}
          setShowRightPanel={setShowRightPanel}
        />
      </div>
    </div>
  );
}
