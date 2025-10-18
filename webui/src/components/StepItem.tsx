import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';
import { Brain, Code, Eye, Lightbulb } from 'lucide-react';

interface StepItemProps {
  type: 'thought' | 'observation' | 'code' | 'solution';
  content: string;
  stepNumber: number;
}

const stepConfig = {
  thought: {
    icon: Brain,
    label: 'Thinking',
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    iconBg: 'from-purple-500 to-pink-500',
    textColor: 'text-purple-300',
  },
  observation: {
    icon: Eye,
    label: 'Observation',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    iconBg: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-300',
  },
  code: {
    icon: Code,
    label: 'Code Execution',
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    iconBg: 'from-green-500 to-emerald-500',
    textColor: 'text-green-300',
  },
  solution: {
    icon: Lightbulb,
    label: 'Solution',
    gradient: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
    iconBg: 'from-amber-500 to-orange-500',
    textColor: 'text-amber-300',
  },
};

export function StepItem({ type, content, stepNumber }: StepItemProps) {
  const config = stepConfig[type];
  const Icon = config.icon;

  return (
    <div 
      className={`
        group relative rounded-xl 
        bg-gradient-to-br ${config.gradient} 
        backdrop-blur-sm border ${config.border}
        p-5 transition-all duration-500 ease-out
        hover:scale-[1.02] hover:shadow-2xl
        hover:border-opacity-60
      `}
    >
      {/* Glow effect on hover */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
        transition-opacity duration-500
        bg-gradient-to-br ${config.gradient}
        blur-xl -z-10
      `} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`
          flex items-center justify-center w-10 h-10 rounded-lg
          bg-gradient-to-br ${config.iconBg} 
          shadow-lg transform transition-transform duration-300
          group-hover:scale-110 group-hover:rotate-3
        `}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${config.textColor}`}>
              {config.label}
            </span>
            <span className="text-xs text-slate-500">
              Step {stepNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {type === 'code' ? (
          <div className="rounded-lg overflow-hidden bg-slate-950/50 border border-slate-800/50">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeHighlight]}
              // className="prose prose-invert prose-sm max-w-none p-4"
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
              }}
            >
              {`\`\`\`python\n${content}\n\`\`\``}
            </ReactMarkdown>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            // className="prose prose-invert prose-sm max-w-none"
            components={{
              p: ({ children }) => (
                <p className="text-slate-200 leading-relaxed mb-3 last:mb-0">
                  {children}
                </p>
              ),
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
              pre: ({ children }) => (
                <pre className="bg-slate-950/50 rounded-lg p-4 overflow-x-auto border border-slate-800/50 my-3">
                  {children}
                </pre>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 text-slate-200 my-3">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1 text-slate-200 my-3">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-slate-200 leading-relaxed">
                  {children}
                </li>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>

      {/* Bottom accent line */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-0.5 
        bg-gradient-to-r ${config.iconBg}
        transform scale-x-0 group-hover:scale-x-100
        transition-transform duration-500 ease-out
        rounded-b-xl
      `} />
    </div>
  );
}