
import { CodeBlock } from './CodeBlock';
import { useTheme } from './ThemeProvider';

interface ChatMessageProps {
  type: 'user' | 'ai';
  content: string;
}

export function ChatMessage({ type, content }: ChatMessageProps) {
  const { theme } = useTheme();

  if (type === 'user') {
    return (
      <div className="flex justify-end">
        <div
          className="px-5 py-4 rounded-2xl"
          style={{
            maxWidth: 'min(75%, calc(100vw - 3rem))',
            backgroundColor: 'var(--bg-tertiary)',
            color: theme === 'dark' ? '#E5E5E5' : '#1A1A1A',
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: '1.6',
            transition: 'background-color 0.5s ease, color 0.5s ease'
          }}
        >
          {content}
        </div>
      </div>
    );
  }

  // AI message with code block handling
  const parts = content.split('```');

  return (
    <div className="flex justify-start">
      <div
        className="px-5 py-4 rounded-2xl"
        style={{
          maxWidth: 'min(85%, calc(100vw - 3rem))',
          backgroundColor: 'var(--bg-input)',
          color: theme === 'dark' ? '#D4D4D4' : '#1A1A1A',
          fontSize: '17px',
          fontWeight: 300,
          lineHeight: '1.6',
          transition: 'background-color 0.5s ease, color 0.5s ease'
        }}
      >
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