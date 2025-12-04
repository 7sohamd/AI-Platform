import React, { useState } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { CenterStage } from './components/CenterStage';
import { RightPanel } from './components/RightPanel';

export default function App() {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful coding assistant...');
  const [selectedModel, setSelectedModel] = useState('GPT-4');

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
        />
        
        {/* Right Panel - Fixed 320px */}
        <RightPanel
          temperature={temperature}
          setTemperature={setTemperature}
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
          systemPrompt={systemPrompt}
          setSystemPrompt={setSystemPrompt}
        />
      </div>
    </>
  );
}
