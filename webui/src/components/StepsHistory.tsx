import { StepItem } from './StepItem';

interface Step {
  id: string;
  type: 'thought' | 'observation' | 'code' | 'solution';
  content: string;
  timestamp: number;
}

interface StepsHistoryProps {
  steps: Step[];
}

export function StepsHistory({ steps }: StepsHistoryProps) {
  return (
    // Steps are rendered chronologically to show the agent's process.
    <div className="space-y-3">
      {steps.map((step) => (
        <StepItem key={step.id} step={step} />
      ))}
    </div>
  );
}
