import { useState, type KeyboardEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isStreaming: boolean;
}

export function ChatInput({ onSend, isStreaming }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isStreaming) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <div className="flex-1 relative group">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about biomedical research..."
          disabled={isStreaming}
          className="
            h-12 pr-4 pl-4 text-base
            bg-slate-900/50 border-slate-700/50
            focus:bg-slate-900/80 focus:border-blue-500/50
            transition-all duration-300
            placeholder:text-slate-500
            rounded-xl
            text-white!
            shadow-lg
            group-hover:shadow-xl
            disabled:opacity-50
          "
        />
        <div className="
          absolute inset-0 rounded-xl -z-10
          bg-gradient-to-r from-blue-500/20 to-cyan-500/20
          opacity-0 group-hover:opacity-100 blur-xl
          transition-opacity duration-500
        " />
      </div>
      
      <Button
        onClick={handleSend}
        disabled={!input.trim() || isStreaming}
        className="
          h-12 px-6 rounded-xl
          bg-gradient-to-r from-blue-500 to-cyan-500
          hover:from-blue-600 hover:to-cyan-600
          disabled:from-slate-700 disabled:to-slate-700
          shadow-lg shadow-blue-500/30
          hover:shadow-xl hover:shadow-blue-500/40
          transition-all duration-300
          hover:scale-105
          disabled:scale-100 disabled:shadow-none
          font-medium
        "
      >
        {isStreaming ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin text-white!" />
            Thinking
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2 text-white!" />
            Send
          </>
        )}
      </Button>
    </div>
  );
}