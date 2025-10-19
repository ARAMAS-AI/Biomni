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
  const groupedSteps = steps.reduce((acc, step) => {
    if (!acc[step.type]) {
      acc[step.type] = [];
    }
    acc[step.type].push(step);
    return acc;
  }, {} as Record<string, Step[]>);

  return (
    <div className="space-y-3">
      {Object.entries(groupedSteps).map(([type, typeSteps]) => (
        <div key={type}>
          {typeSteps.map((step) => (
            <StepItem key={step.id} step={step} />
          ))}
        </div>
      ))}
    </div>
  );
}