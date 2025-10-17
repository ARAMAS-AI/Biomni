import { Card, CardContent } from '@/components/ui/card';
import { MessageContent } from './MessageContent';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  role: 'user' | 'assistant';
  thought?: string;
  observation?: string;
  code?: string;
  solution?: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Bot className="w-5 h-5" />
        </div>
      )}

      <Card className={cn(
        "max-w-[80%]",
        isUser ? "bg-primary text-primary-foreground" : "bg-card"
      )}>
        <CardContent className="p-4">
          {isUser ? (
            <p className="text-sm">{message.thought}</p>
          ) : (
            <MessageContent
              thought={message.thought}
              observation={message.observation}
              code={message.code}
              solution={message.solution}
            />
          )}
        </CardContent>
      </Card>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
