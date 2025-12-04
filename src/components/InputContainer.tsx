import { useState } from 'react';
import { Send, Settings, ChevronDown } from 'lucide-react';

interface InputContainerProps {
  temperature: number;
  message: string;
  setMessage: (value: string) => void;
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  showRightPanel: boolean;
  setShowRightPanel: (value: boolean) => void;
}

export function InputContainer({
  temperature,
  message,
  setMessage,
  selectedModel,
  setSelectedModel,
  showRightPanel,
  setShowRightPanel
}: InputContainerProps) {
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Dynamic border color based on temperature
  const getBorderGlow = () => {
    if (temperature >= 0.7) {
      // High temperature: Orange/Purple gradient (creativity/heat)
      return isFocused
        ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1.5px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.3)'
        : '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(249, 115, 22, 0.4)';
    } else if (temperature <= 0.3) {
      // Low temperature: Blue/Green gradient (precision/coolness)
      return isFocused
        ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1.5px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)'
        : '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.4)';
    } else {
      // Neutral temperature: Subtle grey
      return isFocused
        ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1.5px rgba(255, 255, 255, 0.15)'
        : '0 8px 24px rgba(0, 0, 0, 0.4)';
    }
  };

  const models = ['GPT-4', 'GPT-3.5-Turbo', 'Claude-3', 'Gemini-Pro'];

  return (
    <div
      className="mx-auto transition-all duration-500"
      style={{
        maxWidth: isFocused ? '56rem' : '45rem',
        width: isFocused ? '100%' : '80%',
      }}
    >
      <div
        className="bg-[#2A2A2A] rounded-2xl"
        style={{
          boxShadow: getBorderGlow(),
          maxHeight: isFocused ? '300px' : '64px',
          overflow: isFocused ? 'visible' : 'hidden',
          transition: 'all 500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        }}
      >
        {/* Top 70% - Text Input Area */}
        <div
          className="px-6"
          style={{
            paddingTop: isFocused ? '20px' : '12px',
            paddingBottom: isFocused ? '12px' : '0px',
            opacity: isFocused ? 1 : 0.9,
            transition: 'all 500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="How can I help..."
            className="w-full resize-none border-none outline-none bg-transparent text-zinc-200 placeholder-zinc-600"
            style={{
              fontSize: '17px',
              fontWeight: 300,
              lineHeight: '1.6',
              overflow: 'hidden',
              transition: 'all 500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
            rows={isFocused ? 4 : 1}
          />
        </div>

        {/* Bottom Bar - The Anchor */}
        <div
          className="flex items-center justify-between px-6 border-t border-white/5"
          style={{
            maxHeight: isFocused ? '60px' : '0px',
            paddingTop: isFocused ? '14px' : '0px',
            paddingBottom: isFocused ? '14px' : '0px',
            borderTopColor: isFocused ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            opacity: isFocused ? 1 : 0,
            overflow: isFocused ? 'visible' : 'hidden',
            transition: 'all 500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        >
          {/* Bottom-Left: Model Selector Pill */}
          <div className="relative">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowModelDropdown(!showModelDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-black/30 hover:bg-black/40 text-zinc-500 hover:text-zinc-400 rounded-full transition-colors"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
            >
              <span>{selectedModel}</span>
              <ChevronDown className="w-3 h-3" strokeWidth={2} />
            </button>

            {showModelDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-44 bg-[#2A2A2A] rounded-xl py-2 z-50" style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)' }}>
                {models.map((model) => (
                  <button
                    key={model}
                    onClick={() => {
                      setSelectedModel(model);
                      setShowModelDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors ${selectedModel === model ? 'bg-white/5 text-zinc-300' : ''
                      }`}
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom-Right: Settings Icon + Send Button */}
          <div className="flex items-center gap-2">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowRightPanel(!showRightPanel)}
              className={`p-2.5 rounded-full transition-all ${showRightPanel
                  ? 'text-zinc-300 bg-white/10'
                  : 'text-zinc-600 hover:text-zinc-400 hover:bg-white/5'
                }`}
              title={showRightPanel ? 'Hide settings' : 'Show settings'}
            >
              <Settings className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              className="p-2.5 bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-zinc-100 rounded-full transition-colors"
            >
              <Send className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
