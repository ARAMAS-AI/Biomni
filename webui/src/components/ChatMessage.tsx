import { MessageContent } from './MessageContent';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  steps?: Array<{
    id: string;
    type: 'thought' | 'observation' | 'code' | 'solution';
    content: string;
    timestamp: number;
  }>;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
        transform transition-all duration-300 hover:scale-110
        ${isUser 
          ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30' 
          : 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30'
        }
      `}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Role Label */}
        <div className={`text-xs font-medium ${isUser ? 'text-right text-blue-400' : 'text-left text-purple-400'}`}>
          {isUser ? 'You' : 'BiOmni Agent'}
        </div>

        {/* Message Bubble or Steps */}
        {isUser ? (
          <div className={`
            inline-block max-w-3xl rounded-2xl px-5 py-3
            bg-gradient-to-br from-blue-500/20 to-cyan-500/20
            backdrop-blur-sm border border-blue-500/30
            transition-all duration-300 hover:shadow-xl hover:scale-[1.01]
          `}>
            <p className="text-slate-200 leading-relaxed">{message.content}</p>
          </div>
        ) : (
          <div className="w-full">
            {message.steps && message.steps.length > 0 ? (
              <MessageContent steps={message.steps} />
            ) : (
              <div className="animate-pulse flex items-center gap-2 text-slate-400 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="ml-2">Thinking...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}