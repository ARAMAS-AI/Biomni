import { useState, useRef, useEffect } from 'react';
import { ChatMessage, type Message } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAgentStream } from '@/hooks/useAgentStream';
import { Beaker } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentAssistantMessage]);

  const { sendQuery, isStreaming, error } = useAgentStream(
    (streamMessage) => {
      // Update the current streaming message
      setCurrentAssistantMessage({
        role: 'assistant',
        thought: streamMessage.thought,
        observation: streamMessage.observation,
        code: streamMessage.code,
        timestamp: new Date(),
      });
    },
    () => {
      // On stream complete, add the final message to the list
      if (currentAssistantMessage) {
        setMessages((prev) => [...prev, currentAssistantMessage]);
        setCurrentAssistantMessage(null);
      }
    }
  );

  const handleSendMessage = (text: string) => {
    // Add user message
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
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <Card className="rounded-none border-x-0 border-t-0">
        <CardHeader className="py-4">
          <CardTitle className="flex items-center gap-2">
            <Beaker className="w-6 h-6" />
            BiOmni Agent
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && !currentAssistantMessage && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
              <Beaker className="w-16 h-16 mb-4 opacity-50" />
              <h2 className="text-2xl font-semibold mb-2">Welcome to BiOmni Agent</h2>
              <p className="max-w-md">
                Ask questions about biomedical compounds, predict ADMET properties,
                or explore molecular data. The agent will think through your query
                and provide detailed analysis.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {currentAssistantMessage && (
            <ChatMessage message={currentAssistantMessage} />
          )}

          {error && (
            <Card className="border-destructive bg-destructive/10 mb-4">
              <CardContent className="p-4">
                <p className="text-sm text-destructive font-semibold">Error:</p>
                <p className="text-sm text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={isStreaming}
        loading={isStreaming}
      />
    </div>
  );
}

export default App;
