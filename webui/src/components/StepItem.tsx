import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Card } from './ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';

interface Step {
  id: string;
  type: 'thought' | 'observation' | 'code' | 'solution';
  content: string;
  timestamp: number;
}

interface StepItemProps {
  step: Step;
}

const stepConfig = {
  thought: {
    label: 'Thinking',
    icon: '🧠',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
  },
  observation: {
    label: 'Observation',
    icon: '👁️',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
  },
  code: {
    label: 'Code Execution',
    icon: '⚡',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
  },
  solution: {
    label: 'Solution',
    icon: '✨',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
  },
};

export function StepItem({ step }: StepItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = stepConfig[step.type];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={`${config.bgColor} border ${config.borderColor} shadow-sm hover:shadow-md transition-all`}>
        <CollapsibleTrigger className="w-full p-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center text-white font-semibold shadow-sm`}>
                {config.icon}
              </div>
              <div>
                <h4 className={`font-semibold ${config.textColor}`}>{config.label}</h4>
                <p className="text-xs text-slate-500">
                  {new Date(step.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 ${config.textColor} transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 border-t border-slate-200/50">
            {step.type === 'code' ? (
              <div className="rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeHighlight]}
                  components={{
                    code: ({ node, inline, className, children, ...props }: any) => {
                      if (inline) {
                        return (
                          <code className="px-1.5 py-0.5 rounded bg-slate-800/50 text-cyan-400 text-xs font-mono" {...props}>
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    p: ({ children }) => (
                      <p className="text-white leading-relaxed mb-3 last:mb-0">
                        {children}
                      </p>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto my-0">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {`\`\`\`python\n${step.content}\n\`\`\``}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeHighlight]}
                  components={{
                    code: ({ node, inline, className, children, ...props }: any) => {
                      if (inline) {
                        return (
                          <code className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-xs font-mono" {...props}>
                            {children}
                          </code>
                        );
                      }
                      // Block code in non-code steps gets dark treatment
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto border border-slate-800 my-3">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {step.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}