import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden bg-[#1E1E1E] code-block-container">
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
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1A1A1A] border-b border-zinc-800/30">
        <span
          className="text-zinc-600 lowercase"
          style={{ fontSize: '12px' }}
        >
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-400 transition-colors"
          style={{ fontSize: '12px' }}
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
          style={vscDarkPlus}
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
            color: '#4a4a4a',
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
