import { useState } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { CenterStage } from './components/CenterStage';
import { RightPanel } from './components/RightPanel';

export default function App() {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful coding assistant...');
  const [selectedModel, setSelectedModel] = useState('GPT-4');
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [messages, setMessages] = useState([
    {
      type: 'user' as const,
      content: 'Can you show me how to implement a debounce function in TypeScript?'
    },
    {
      type: 'ai' as const,
      content: 'I\'d be happy to help you implement a debounce function in TypeScript. Here\'s a clean, type-safe implementation:\n\n```typescript\nfunction debounce<T extends (...args: any[]) => any>(\n  func: T,\n  wait: number\n): (...args: Parameters<T>) => void {\n  let timeout: NodeJS.Timeout | null = null;\n  \n  return function executedFunction(...args: Parameters<T>) {\n    const later = () => {\n      timeout = null;\n      func(...args);\n    };\n    \n    if (timeout) clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}\n```\n\nThis implementation uses TypeScript generics to maintain type safety for the debounced function\'s parameters and return type.'
    }
  ]);

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          font-family: 'Onest', sans-serif;
        }
      `}</style>

      <div className="flex h-screen bg-[#222222] overflow-hidden">
        {/* Left Sidebar - Fixed 260px */}
        <LeftSidebar />

        {/* Center Stage - Fluid */}
        <CenterStage
          temperature={temperature}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          showRightPanel={showRightPanel}
          setShowRightPanel={setShowRightPanel}
          messages={messages}
          onClearChat={clearChat}
        />

        {/* Right Panel - Fixed 320px, conditionally rendered */}
        {showRightPanel && (
          <RightPanel
            temperature={temperature}
            setTemperature={setTemperature}
            maxTokens={maxTokens}
            setMaxTokens={setMaxTokens}
            systemPrompt={systemPrompt}
            setSystemPrompt={setSystemPrompt}
            onClose={() => setShowRightPanel(false)}
          />
        )}
      </div>
    </>
  );
}
