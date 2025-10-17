import { useState, useCallback, useRef } from 'react';

export interface StreamMessage {
  thought?: string;
  observation?: string;
  code?: string;
  solution?: string;
}

export interface UseAgentStreamResult {
  sendQuery: (query: string, llm?: string) => void;
  isStreaming: boolean;
  error: string | null;
  currentMessage: StreamMessage | null;
}

export function useAgentStream(
  onMessage: (message: StreamMessage) => void,
  onComplete: () => void
): UseAgentStreamResult {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<StreamMessage | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendQuery = useCallback(
    async (query: string, llm: string = 'gpt-4.1-mini') => {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setIsStreaming(true);
      setError(null);
      setCurrentMessage(null);

      try {
        const response = await fetch('http://localhost:8000/agent/stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, llm }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No response body');
        }

        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              try {
                const parsed = JSON.parse(data);

                // Check if stream is complete
                if (parsed.output === '[DONE]' && parsed.status === 'completed') {
                  onComplete();
                  setIsStreaming(false);
                  setCurrentMessage(null);
                  break;
                }

                // Check for error
                if (parsed.status === 'error') {
                  setError(parsed.output || 'Unknown error occurred');
                  setIsStreaming(false);
                  break;
                }

                // Regular message update
                const message: StreamMessage = {
                  thought: parsed.thought || undefined,
                  observation: parsed.observation || undefined,
                  code: parsed.code || undefined,
                  solution: parsed.solution || undefined,
                };

                // Only process if there's actual content
                if (message.thought || message.observation || message.code || message.solution) {
                  setCurrentMessage(message);
                  onMessage(message);
                }
              } catch (e) {
                console.error('Failed to parse SSE data:', e, data);
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('Request was aborted');
        } else {
          console.error('Stream error:', err);
          setError(err.message || 'Failed to connect to agent');
        }
        setIsStreaming(false);
      }
    },
    [onMessage, onComplete]
  );

  return {
    sendQuery,
    isStreaming,
    error,
    currentMessage,
  };
}
