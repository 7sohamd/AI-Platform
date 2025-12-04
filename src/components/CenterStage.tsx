import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { InputContainer } from './InputContainer';

interface CenterStageProps {
  temperature: number;
  selectedModel: string;
  setSelectedModel: (value: string) => void;
}

export function CenterStage({ temperature, selectedModel, setSelectedModel }: CenterStageProps) {
  const [message, setMessage] = useState('');

  const messages = [
    {
      type: 'user' as const,
      content: 'Can you show me how to implement a debounce function in TypeScript?'
    },
    {
      type: 'ai' as const,
      content: 'I\'d be happy to help you implement a debounce function in TypeScript. Here\'s a clean, type-safe implementation:\n\n```typescript\nfunction debounce<T extends (...args: any[]) => any>(\n  func: T,\n  wait: number\n): (...args: Parameters<T>) => void {\n  let timeout: NodeJS.Timeout | null = null;\n  \n  return function executedFunction(...args: Parameters<T>) {\n    const later = () => {\n      timeout = null;\n      func(...args);\n    };\n    \n    if (timeout) clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}\n```\n\nThis implementation uses TypeScript generics to maintain type safety for the debounced function\'s parameters and return type.'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#222222]">
      {/* Top Header */}
      <div className="flex items-center justify-end px-8 py-4">
        <button className="p-2.5 text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors rounded-lg">
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
        />
      </div>
    </div>
  );
}
