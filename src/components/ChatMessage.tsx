
import { CodeBlock } from './CodeBlock';

interface ChatMessageProps {
  type: 'user' | 'ai';
  content: string;
}

export function ChatMessage({ type, content }: ChatMessageProps) {
  if (type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] px-5 py-4 bg-zinc-800/40 text-zinc-100 rounded-2xl" style={{ fontSize: '16px', fontWeight: 300, lineHeight: '1.6' }}>
          {content}
        </div>
      </div>
    );
  }

  // AI message with code block handling
  const parts = content.split('```');

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] px-5 py-4 bg-zinc-900/30 text-zinc-300 rounded-2xl" style={{ fontSize: '17px', fontWeight: 300, lineHeight: '1.6' }}>
        {parts.map((part, index) => {
          if (index % 2 === 1) {
            // Code block
            const lines = part.split('\n');
            const language = lines[0];
            const code = lines.slice(1).join('\n');

            return <CodeBlock key={index} language={language} code={code} />;
          } else {
            // Regular text
            return <div key={index} className="whitespace-pre-wrap">{part}</div>;
          }
        })}
      </div>
    </div>
  );
}