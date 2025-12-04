import React from 'react';

interface RightPanelProps {
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  systemPrompt: string;
  setSystemPrompt: (value: string) => void;
}

export function RightPanel({
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  systemPrompt,
  setSystemPrompt
}: RightPanelProps) {
  return (
    <div className="w-[320px] flex-shrink-0 bg-[#1A1A1A] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-5">
        <h2 className="text-zinc-400" style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Parameters & Config
        </h2>
      </div>

      {/* Content */}
      <div className="px-6 space-y-8">
        {/* Temperature Slider */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <label className="text-zinc-500" style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Temperature
            </label>
            <span className="text-zinc-600" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', fontWeight: 400 }}>
              {temperature.toFixed(1)}
            </span>
          </div>
          <div className="relative">
            <div className="h-0.5 bg-zinc-800 rounded-full" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer slider-clean"
            />
          </div>
          <div className="flex justify-between mt-2.5">
            <span className="text-zinc-800" style={{ fontSize: '11px' }}>0.0</span>
            <span className="text-zinc-800" style={{ fontSize: '11px' }}>1.0</span>
          </div>
        </div>

        {/* Max Tokens Slider */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <label className="text-zinc-500" style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Max Tokens
            </label>
            <span className="text-zinc-600" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', fontWeight: 400 }}>
              {maxTokens}
            </span>
          </div>
          <div className="relative">
            <div className="h-0.5 bg-zinc-800 rounded-full" />
            <input
              type="range"
              min="128"
              max="8192"
              step="128"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer slider-clean"
            />
          </div>
          <div className="flex justify-between mt-2.5">
            <span className="text-zinc-800" style={{ fontSize: '11px' }}>128</span>
            <span className="text-zinc-800" style={{ fontSize: '11px' }}>8192</span>
          </div>
        </div>

        {/* System Prompt */}
        <div>
          <label className="block text-zinc-500 mb-4" style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            System Prompt
          </label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full px-4 py-3 bg-[#0F0F0F] text-zinc-500 rounded-xl outline-none resize-none focus:bg-[#141414] transition-colors"
            rows={5}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', lineHeight: '1.6', fontWeight: 300 }}
          />
        </div>
      </div>

      {/* Footer - API Status */}
      <div className="mt-auto p-6 pt-8">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-zinc-700" style={{ fontSize: '12px', fontWeight: 300 }}>API Connected</span>
        </div>
      </div>
      
      <style>{`
        .slider-clean {
          height: 2px;
        }
        
        .slider-clean::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          transition: transform 0.15s ease;
        }
        
        .slider-clean::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        
        .slider-clean::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          transition: transform 0.15s ease;
        }
        
        .slider-clean::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
