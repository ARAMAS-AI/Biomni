import { useState, type KeyboardEvent } from 'react';
import { Button } from './ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        disabled={disabled}
        className="w-full min-h-[120px] p-4 text-sm bg-white border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400"
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {disabled ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Processing...
          </span>
        ) : (
          'Send Query'
        )}
      </Button>
    </div>
  );
}