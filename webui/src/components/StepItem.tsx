import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MessageContent } from './MessageContent';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Message } from './ChatMessage';

interface StepItemProps {
  message: Message;
  stepNumber: number;
  isLatest?: boolean;
}

export function StepItem({ message, stepNumber, isLatest = false }: StepItemProps) {
  const [isOpen, setIsOpen] = useState(isLatest);
  const isComplete = !isLatest;
  const isSolution = !!message.solution;

  // Generate a preview/summary for the step
  const getStepSummary = () => {
    if (message.solution) return 'Final Solution';
    if (message.code) return 'Executing Code';
    if (message.observation) return 'Analyzing Results';
    if (message.thought) {
      const firstLine = message.thought.split('\n')[0];
      return firstLine.length > 60 ? firstLine.substring(0, 60) + '...' : firstLine;
    }
    return 'Processing...';
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card
        className={cn(
          "mb-3 overflow-hidden border transition-all duration-200",
          isLatest && "border-l-4 border-l-blue-500 shadow-md",
          isSolution && "border-l-4 border-l-purple-500 shadow-lg bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-950/20",
          isOpen && "shadow-lg"
        )}
      >
        <CollapsibleTrigger className="w-full p-4 hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {isOpen ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform" />
              )}
            </div>

            <div className="flex-shrink-0">
              {isSolution ? (
                <Sparkles className="w-5 h-5 text-purple-500" />
              ) : isComplete ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-blue-500 animate-pulse" />
              )}
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  Step {stepNumber}
                </span>
                <span className="text-sm text-muted-foreground">
                  {getStepSummary()}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 border-t">
            <MessageContent
              thought={message.thought}
              observation={message.observation}
              code={message.code}
              solution={message.solution}
            />
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
