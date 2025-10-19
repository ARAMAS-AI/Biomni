import { MessageContent } from './MessageContent';
import { StepsHistory } from './StepsHistory';
import { Card } from './ui/card';

interface Step {
  id: string;
  type: 'thought' | 'observation' | 'code' | 'solution';
  content: string;
  timestamp: number;
}

interface Message {
  id:string;
  role: 'user' | 'assistant';
  content: string;
  steps?: Step[];
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === 'user') {
    return null; // User messages are shown in left column
  }

  return (
    <div className="space-y-4 animate-fadeInUp">
      {message.steps && message.steps.length > 0 && (
        <StepsHistory steps={message.steps} />
      )}
      
      {message.content && (
        <Card className="bg-white border border-slate-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Final Answer</h3>
                <p className="text-xs text-slate-500">Generated solution</p>
              </div>
            </div>
            <MessageContent content={message.content} />
          </div>
        </Card>
      )}
    </div>
  );
}
