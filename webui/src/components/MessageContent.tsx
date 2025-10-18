import { StepItem } from './StepItem';

interface Step {
  id: string;
  type: 'thought' | 'observation' | 'code' | 'solution';
  content: string;
  timestamp: number;
}

interface MessageContentProps {
  steps: Step[];
}

export function MessageContent({ steps }: MessageContentProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="animate-slide-in-up"
          style={{ 
            animationDelay: `${index * 0.15}s`,
            animationFillMode: 'both'
          }}
        >
          <StepItem
            type={step.type}
            content={step.content}
            stepNumber={index + 1}
          />
        </div>
      ))}
    </div>
  );
}