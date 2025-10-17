import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MessageContentProps {
  thought?: string;
  observation?: string;
  code?: string;
}

export function MessageContent({ thought, observation, code }: MessageContentProps) {
  return (
    <div className="space-y-3">
      {thought && (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
          >
            {thought}
          </ReactMarkdown>
        </div>
      )}

      {observation && (
        <Card className={cn(
          "p-4 border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
        )}>
          <div className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
            OBSERVATION
          </div>
          <pre className="text-sm whitespace-pre-wrap font-mono text-blue-900 dark:text-blue-100 overflow-x-auto">
            {observation}
          </pre>
        </Card>
      )}

      {code && (
        <Card className={cn(
          "p-4 border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20"
        )}>
          <div className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">
            CODE
          </div>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {`\`\`\`python\n${code}\n\`\`\``}
            </ReactMarkdown>
          </div>
        </Card>
      )}
    </div>
  );
}
