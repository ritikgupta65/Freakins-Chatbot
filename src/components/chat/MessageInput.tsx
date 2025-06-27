import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Send, Phone, Paperclip } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isConnected: boolean;
  startCall: () => void;
  stopCall: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled,
  isConnected,
  startCall,
  stopCall,
}) => {
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCallClick = () => {
    if (isConnected) {
      stopCall();
    } else {
      startCall();
    }
  };

  const handleAttachmentClick = () => {
    console.log('Attachment button clicked');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="p-4 bg-white/5 backdrop-blur-md border-t border-b border-white/20">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200 min-h-[56px] max-h-32 scrollbar-hide"
            rows={1}
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCallClick}
            className={`p-3 rounded-full transition-colors text-white ${
              isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Phone className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleAttachmentClick}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`p-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
              message.trim() && !disabled
                ? `bg-gradient-to-r ${theme.primaryGradient} text-white shadow-xl hover:shadow-2xl`
                : 'bg-white/10 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;