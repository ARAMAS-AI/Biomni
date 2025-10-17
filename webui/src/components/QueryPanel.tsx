import { useState, type KeyboardEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Beaker, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QueryPanelProps {
  onSend: (query: string) => void;
  isStreaming: boolean;
}

export function QueryPanel({ onSend, isStreaming }: QueryPanelProps) {
  const [query, setQuery] = useState('');

  const handleSend = () => {
    if (query.trim() && !isStreaming) {
      onSend(query.trim());
      setQuery('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const exampleQueries = [
    "Predict ADMET properties for ibuprofen",
    "What are the binding sites of aspirin?",
    "Analyze the toxicity of caffeine",
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="p-6 border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Beaker className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BiOmni Agent
            </h1>
            <p className="text-sm text-muted-foreground">
              Advanced biomedical AI assistant
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <Card className="shadow-xl border-0 ring-1 ring-slate-200 dark:ring-slate-700">
          <CardHeader>
            <CardTitle className="text-lg">Enter Your Query</CardTitle>
            <CardDescription>
              Ask questions about biomedical compounds, predict properties, or explore molecular data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your biomedical query here..."
                disabled={isStreaming}
                className={cn(
                  "w-full min-h-[200px] p-4 rounded-lg border bg-background",
                  "resize-none focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "text-base leading-relaxed"
                )}
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {isStreaming ? 'Processing...' : 'Cmd/Ctrl + Enter to send'}
              </div>
            </div>

            <Button
              onClick={handleSend}
              disabled={!query.trim() || isStreaming}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isStreaming ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Query
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Example Queries</h3>
          <div className="space-y-2">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => !isStreaming && setQuery(example)}
                disabled={isStreaming}
                className={cn(
                  "w-full text-left p-3 rounded-lg bg-white dark:bg-slate-800",
                  "border border-slate-200 dark:border-slate-700",
                  "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "text-sm"
                )}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
