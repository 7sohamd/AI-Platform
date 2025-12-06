import { useState, useEffect } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { CenterStage } from './components/CenterStage';
import { RightPanel } from './components/RightPanel';

export default function App() {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful coding assistant...');
  const [selectedModel, setSelectedModel] = useState('GPT-4');
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);

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

  // Add Escape key listener to close right panel
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showRightPanel) {
        setShowRightPanel(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showRightPanel]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          font-family: 'Onest', sans-serif;
        }

        /* Backdrop for mobile sidebar */
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 40;
          transition: opacity 300ms;
        }

        /* Single responsive sidebar */
        .sidebar-container {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          z-index: 50;
          transition: transform 300ms ease-in-out;
          transform: translateX(-100%);
        }

        /* Desktop: Always visible, not fixed */
        @media (min-width: 768px) {
          .sidebar-backdrop {
            display: none;
          }
          .sidebar-container {
            position: relative;
            transform: translateX(0) !important;
          }
        }

        /* Mobile: Show when toggled */
        .sidebar-container.show {
          transform: translateX(0);
        }

        /* Hide hamburger menu on desktop */
        @media (min-width: 768px) {
          .hamburger-menu {
            display: none;
          }
        }

        /* Right panel: Overlay on mobile, normal position on desktop */
        .right-panel-container {
          position: fixed;
          right: 0;
          top: 0;
          height: 100vh;
          z-index: 60;
          transition: transform 300ms ease-in-out;
          transform: translateX(100%);
        }

        .right-panel-container.show {
          transform: translateX(0);
        }

        /* Desktop: Normal position, not fixed */
        @media (min-width: 768px) {
          .right-panel-container {
            position: relative;
            transform: translateX(0) !important;
          }
        }

        /* Right panel backdrop for mobile */
        .right-panel-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 55;
          transition: opacity 300ms;
        }

        @media (min-width: 768px) {
          .right-panel-backdrop {
            display: none;
          }
        }
      `}</style>

      <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.5s ease' }}>
        {/* Backdrop - only visible when sidebar is open on mobile */}
        {showLeftSidebar && (
          <div
            className="sidebar-backdrop"
            onClick={() => setShowLeftSidebar(false)}
          />
        )}

        {/* Single Sidebar - Fixed on desktop, Collapsible on mobile */}
        <div className={`sidebar-container ${showLeftSidebar ? 'show' : ''}`}>
          <LeftSidebar />
        </div>

        {/* Center Stage - Fluid */}
        <CenterStage
          temperature={temperature}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          showRightPanel={showRightPanel}
          setShowRightPanel={setShowRightPanel}
          showLeftSidebar={showLeftSidebar}
          setShowLeftSidebar={setShowLeftSidebar}
          messages={messages}
          onClearChat={clearChat}
        />

        {/* Right Panel - Normal position on desktop, Overlay on mobile */}
        {showRightPanel && (
          <>
            {/* Backdrop for mobile */}
            <div
              className="right-panel-backdrop"
              onClick={() => setShowRightPanel(false)}
            />
            {/* Right Panel */}
            <div className={`right-panel-container ${showRightPanel ? 'show' : ''} h-screen`}>
              <RightPanel
                temperature={temperature}
                setTemperature={setTemperature}
                maxTokens={maxTokens}
                setMaxTokens={setMaxTokens}
                systemPrompt={systemPrompt}
                setSystemPrompt={setSystemPrompt}
                onClose={() => setShowRightPanel(false)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
