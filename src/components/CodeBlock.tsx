import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="my-4 rounded-xl overflow-hidden code-block-container"
      style={{
        backgroundColor: theme === 'dark' ? '#1E1E1E' : '#F5F5F5',
        transition: 'background-color 0.5s ease'
      }}
    >
      <style>{`
        .code-block-container,
        .code-block-container *,
        .code-block-container code,
        .code-block-container pre,
        .code-block-container span {
          font-family: 'Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Consolas', 'Monaco', monospace !important;
        }
      `}</style>

      {/* Header Bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{
          backgroundColor: theme === 'dark' ? '#1A1A1A' : '#E8E8E8',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.5s ease, border-color 0.5s ease'
        }}
      >
        <span
          className="lowercase"
          style={{
            fontSize: '12px',
            color: theme === 'dark' ? '#737373' : '#525252'
          }}
        >
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 transition-colors"
          style={{
            fontSize: '12px',
            color: theme === 'dark' ? '#737373' : '#525252'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = theme === 'dark' ? '#A1A1A1' : '#1A1A1A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = theme === 'dark' ? '#737373' : '#525252';
          }}
        >
          {copied ? <Check size={13} strokeWidth={2} /> : <Copy size={13} strokeWidth={2} />}
          <span style={{ fontFamily: 'Onest, sans-serif', fontWeight: 300 }}>
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>

      {/* Syntax Highlighting Area */}
      <div>
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'transparent',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1.5em',
            color: theme === 'dark' ? '#4a4a4a' : '#999999',
            userSelect: 'none',
          }}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
