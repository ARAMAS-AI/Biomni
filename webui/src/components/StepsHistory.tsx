import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StepItem } from './StepItem';
import { Card } from '@/components/ui/card';
import { AlertCircle, Sparkles, Activity } from 'lucide-react';
import type { Message } from './ChatMessage';

interface StepsHistoryProps {
  messages: Message[];
  currentMessage: Message | null;
  error: string | null;
}

export function StepsHistory({ messages, currentMessage, error }: StepsHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentMessage]);

  // Filter out user messages, only show assistant steps
  const assistantMessages = messages.filter(m => m.role === 'assistant');
  const allSteps = currentMessage
    ? [...assistantMessages, currentMessage]
    : assistantMessages;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-950">
      <div className="p-6 border-b bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-foreground">Execution Steps</h2>
            <p className="text-sm text-muted-foreground">
              {allSteps.length > 0
                ? `${allSteps.length} step${allSteps.length !== 1 ? 's' : ''} completed`
                : 'Waiting for query...'}
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          {allSteps.length === 0 && !error && (
            <Card className="p-12 text-center border-dashed border-2">
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Sparkles className="w-12 h-12 opacity-50" />
                <div>
                  <p className="text-lg font-semibold mb-1">Ready to Process</p>
                  <p className="text-sm">
                    Enter a query in the left panel to see the agent's thinking process
                  </p>
                </div>
              </div>
            </Card>
          )}

          {error && (
            <Card className="p-4 border-destructive bg-destructive/10 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-destructive">Error</p>
                  <p className="text-sm text-destructive/90 mt-1">{error}</p>
                </div>
              </div>
            </Card>
          )}

          {allSteps.map((message, index) => (
            <StepItem
              key={index}
              message={message}
              stepNumber={index + 1}
              isLatest={index === allSteps.length - 1 && !!currentMessage}
            />
          ))}

          <div ref={endRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
