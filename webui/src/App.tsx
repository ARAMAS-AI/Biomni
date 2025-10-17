import { useState } from 'react';
import { type Message } from '@/components/ChatMessage';
import { QueryPanel } from '@/components/QueryPanel';
import { StepsHistory } from '@/components/StepsHistory';
import { useAgentStream } from '@/hooks/useAgentStream';
import './App.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState<Message | null>(null);

  const { sendQuery, isStreaming, error } = useAgentStream(
    (streamMessage) => {
      // Accumulate the streaming message data
      setCurrentAssistantMessage((prev) => ({
        role: 'assistant',
        thought: streamMessage.thought || prev?.thought,
        observation: streamMessage.observation || prev?.observation,
        code: streamMessage.code || prev?.code,
        solution: streamMessage.solution || prev?.solution,
        timestamp: prev?.timestamp || new Date(),
      }));
    },
    () => {
      // On stream complete, add the final message to the list
      if (currentAssistantMessage) {
        setMessages((prev) => [...prev, currentAssistantMessage]);
        setCurrentAssistantMessage(null);
      }
    }
  );

  const handleSendQuery = (text: string) => {
    // Add user message for tracking
    const userMessage: Message = {
      role: 'user',
      thought: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Send query to agent
    sendQuery(text);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Panel - Query Input */}
      <div className="w-[40%] border-r shadow-lg z-10">
        <QueryPanel onSend={handleSendQuery} isStreaming={isStreaming} />
      </div>

      {/* Right Panel - Steps History */}
      <div className="flex-1">
        <StepsHistory
          messages={messages}
          currentMessage={currentAssistantMessage}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
