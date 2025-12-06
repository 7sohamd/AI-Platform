
import { Plus, MessageSquare, User, LogOut } from 'lucide-react';

export function LeftSidebar() {
  const recentChats = {
    Today: [
      'React component optimization',
      'Python async/await patterns',
      'Database schema design'
    ],
    Yesterday: [
      'API authentication best practices',
      'CSS Grid vs Flexbox',
      'TypeScript generic types'
    ],
    'Last 7 Days': [
      'Docker compose setup',
      'Unit testing strategies',
      'Performance profiling tips'
    ]
  };

  return (
    <div
      className="w-[260px] flex-shrink-0 flex flex-col h-screen"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        transition: 'background-color 0.5s ease, border-color 0.5s ease'
      }}
    >
      {/* New Chat Button */}
      <div className="p-6">
        <button
          className="w-full flex items-center justify-center gap-3 px-4 py-3 text-zinc-400 hover:text-zinc-200 rounded-xl relative group overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'all 500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        >
          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
              transition: 'opacity 500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
          />
          <Plus
            className="w-5 h-5 relative z-10 group-hover:rotate-90 group-hover:scale-110"
            strokeWidth={1.5}
            style={{
              transition: 'transform 500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
          />
          <span className="relative z-10" style={{ fontSize: '15px', fontWeight: 400 }}>New Chat</span>
        </button>
      </div>

      {/* Recent History */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="mb-5 px-3 text-zinc-600" style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Recent History
        </div>

        {Object.entries(recentChats).map(([category, chats]) => (
          <div key={category} className="mb-8">
            <div className="px-3 mb-3 text-zinc-700" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {category}
            </div>
            {chats.map((chat, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-3 text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors rounded-lg flex items-start gap-3 mb-1"
              >
                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="truncate block flex-1" style={{ fontSize: '15px', fontWeight: 300, lineHeight: '1.5' }}>
                  {chat}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="px-4">
        <div className="h-px bg-white/5"></div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center flex-shrink-0"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <User className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="text-zinc-300 truncate" style={{ fontSize: '14px', fontWeight: 500 }}>
              SOHAM DEY
            </div>
            <div className="text-zinc-600 truncate" style={{ fontSize: '12px', fontWeight: 300 }}>
              soham4707@gmail.com
            </div>
          </div>

          {/* Logout Button */}
          <button
            className="p-2 text-zinc-600 hover:text-zinc-300 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0"
            title="Logout"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}