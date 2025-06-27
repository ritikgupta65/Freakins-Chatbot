import { useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, MessageCircle, Plus } from 'lucide-react';
import { Message } from '@/types/chat';
import MessageBubble from './MessageBubble';
import LoadingAnimation from './LoadingAnimation';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onGoHome: () => void;
  onNewChat: () => void;
  isConnected: boolean;
  transcript: { role: string; text: string; timestamp: number }[];
  startCall: () => void;
  stopCall: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onGoHome,
  onNewChat,
  isConnected,
  transcript,
  startCall,
  stopCall,
}) => {
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, transcript]);

  // Convert transcript to Message objects using provided timestamps
  const transcriptMessages: Message[] = transcript.map((msg, index) => ({
    id: `transcript-${index}`,
    content: msg.text,
    sender: msg.role === 'user' ? 'user' : 'bot',
    timestamp: new Date(msg.timestamp),
  }));

  // Combine and sort messages by timestamp
  const allMessages: Message[] = [...messages, ...transcriptMessages].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onGoHome}
              className="p-2 rounded-full hover:bg-white/20 transition-colors mr-3"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center">
              {theme.logoUrl ? (
                <img
                  src={theme.logoUrl}
                  alt={theme.brandName}
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.primaryGradient} flex items-center justify-center mr-3`}
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-white font-semibold">{theme.brandName}</h2>
                <p className="text-gray-300 text-sm">Online</p>
              </div>
            </div>
          </div>

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="flex items-center px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </button>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {allMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${theme.primaryGradient} flex items-center justify-center mb-4`}
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-400">Start a conversation by typing a message below</p>
          </div>
        ) : (
          <>
            {allMessages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <LoadingAnimation />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="flex-shrink-0 pb-20">
        <MessageInput
          onSendMessage={onSendMessage}
          disabled={isLoading}
          isConnected={isConnected}
          startCall={startCall}
          stopCall={stopCall}
        />
      </div>
    </div>
  );
};

export default ChatWindow;