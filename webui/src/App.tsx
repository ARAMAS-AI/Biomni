import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAgentStream } from '@/hooks/useAgentStream';
import type { StreamMessage } from '@/hooks/useAgentStream';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  steps?: Array<{
    id: string;
    type: 'thought' | 'observation' | 'code' | 'solution';
    content: string;
    timestamp: number;
  }>;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stepCounter, setStepCounter] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStreamMessage = (streamMessage: StreamMessage) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];

      if (lastMessage && lastMessage.role === 'assistant') {
        const steps = lastMessage.steps || [];
        
        if (streamMessage.thought) {
          const thoughtStep = {
            id: `step-${stepCounter}`,
            type: 'thought' as const,
            content: streamMessage.thought,
            timestamp: Date.now(),
          };
          steps.push(thoughtStep);
          setStepCounter(prev => prev + 1);
        }

        if (streamMessage.observation) {
          const obsStep = {
            id: `step-${stepCounter + 1}`,
            type: 'observation' as const,
            content: streamMessage.observation,
            timestamp: Date.now() + 1,
          };
          steps.push(obsStep);
          setStepCounter(prev => prev + 1);
        }

        if (streamMessage.code) {
          const codeStep = {
            id: `step-${stepCounter + 2}`,
            type: 'code' as const,
            content: streamMessage.code,
            timestamp: Date.now() + 2,
          };
          steps.push(codeStep);
          setStepCounter(prev => prev + 1);
        }

        if (streamMessage.solution) {
          const solutionStep = {
            id: `step-${stepCounter + 3}`,
            type: 'solution' as const,
            content: streamMessage.solution,
            timestamp: Date.now() + 3,
          };
          steps.push(solutionStep);
          setStepCounter(prev => prev + 1);
        }

        lastMessage.steps = steps;

        if (streamMessage.solution) {
          lastMessage.content = streamMessage.solution;
        }
      }

      return newMessages;
    });
  };

  const handleStreamComplete = () => {
    console.log('Stream completed');
  };

  const { sendQuery, isStreaming, error } = useAgentStream(
    handleStreamMessage,
    handleStreamComplete
  );

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      steps: [],
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    sendQuery(content);
  };

  const hasAssistantOutput = messages.some(
    (msg) => msg.role === 'assistant' && ((msg.steps && msg.steps.length > 0) || msg.content)
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left Column - Query Input */}
      <div className="w-[400px] border-r border-slate-200 bg-white flex flex-col shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center gap-4">
          <img src="/light.png" alt="Logo" className="w-10 h-10 rounded-md" />
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-0">Aramas AI</h1>
            <p className="text-sm text-slate-500">Enter your query to get started</p>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages
              .filter((msg) => msg.role === 'user')
              .map((msg, idx) => (
                <div key={msg.id} className="group animate-fadeInUp">
                  <div className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      Query {idx + 1}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>{new Date(parseInt(msg.id)).toLocaleTimeString()}</span>
                  </div>
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-4 shadow-sm">
                    <p className="text-slate-800 text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Agent Response */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-slate-200 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Agent Response</h2>
          <p className="text-sm text-slate-500 h-5">
            {isStreaming ? (
              <span className="flex items-center gap-2">
                <span className="thinking-dots flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 bg-violet-500 rounded-full"></span>
                  <span className="inline-block w-2 h-2 bg-violet-500 rounded-full"></span>
                  <span className="inline-block w-2 h-2 bg-violet-500 rounded-full"></span>
                </span>
                Processing your query...
              </span>
            ) : (
              hasAssistantOutput ? 'Response complete' : 'Waiting for query'
            )}
          </p>
        </div>

        <ScrollArea className="flex-1">
          {hasAssistantOutput ? (
            <div className="p-6 space-y-6">
              {messages
                .filter((msg) => msg.role === 'assistant')
                .map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            !isStreaming && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-fadeInUp">
                <img src="/light.png" alt="Logo" className="w-24 h-24 mb-6 opacity-40 rounded-lg" />
                <h2 className="text-xl font-semibold text-slate-600">Aramas AI</h2>
                <p className="text-slate-500 mt-2 max-w-sm">
                  Your intelligent agent is ready. Start by entering a query on the left to see the magic happen.
                </p>
              </div>
            )
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

export default App;

