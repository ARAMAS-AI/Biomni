import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ScrollArea } from './components/ui/scroll-area';
import { useAgentStream } from './hooks/useAgentStream';
import type { StreamMessage } from './hooks/useAgentStream';

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
  const scrollRef = useRef<HTMLDivElement>(null);
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
        
        // Add each field as a separate step with timestamp
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
      }

      return newMessages;
    });
  };

  const handleStreamComplete = () => {
    console.log('Stream complete');
  };

  const { sendQuery, isStreaming } = useAgentStream(
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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header with Logo - BIGGER LOGO, NO ROUNDING */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50 shadow-xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <img 
            src="/light.jpg" 
            alt="Logo" 
            className="h-16 w-16 object-contain animate-fade-in"
            style={{ borderRadius: '0' }}
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-fade-in">
              Biomedical Research Agent
            </h1>
            {/* <p className="text-xs text-slate-400 animate-fade-in-delay">
              Biomedical Research Assistant
            </p> */}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in-up">
              {/* BIGGER LOGO ON MAIN SCREEN, NO ROUNDING */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-blue-500/30"
                   style={{ borderRadius: '9999px' }}>
                <img 
                  src="/light.jpg" 
                  alt="Logo" 
                  className="h-20 w-20 object-contain"
                  style={{ borderRadius: '0' }}
                />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-slate-200">
                  Welcome to the Biomedical Research Agent
                </h2>
                <p className="text-slate-400 max-w-md">
                  Ask me anything about biomedical research, data analysis, or scientific computing.
                </p>
              </div>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div 
              key={message.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ChatMessage message={message} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="sticky bottom-0 backdrop-blur-xl bg-slate-950/80 border-t border-slate-800/50 shadow-2xl">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <ChatInput onSend={handleSendMessage} isStreaming={isStreaming} />
        </div>
      </div>
    </div>
  );
}

export default App;