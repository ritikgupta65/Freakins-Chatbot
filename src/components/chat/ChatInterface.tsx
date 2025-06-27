import { useState, useEffect } from 'react';
import WelcomeScreen from './WelcomeScreen';
import ChatWindow from './ChatWindow';
import NavigationBar from './NavigationBar';
import { Message, ChatState } from '@/types/chat';
import { useVapi } from '@/hooks/useVapi';

const ChatInterface = () => {
  const [chatState, setChatState] = useState<ChatState>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // VAPI integration
  const apiKey = '4990af9d-ee12-4591-a103-2810f3d78126';
  const assistantId = 'ea3b9464-bb40-43ec-a4d0-6c9728923143';
  const { isConnected, isSpeaking, startCall, stopCall, transcript, clearTranscript } = useVapi(apiKey, assistantId);

  const startChat = (initialMessage?: string) => {
    setChatState('chatting');
    if (initialMessage) {
      handleSendMessage(initialMessage);
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5678/webhook/5165540a-b829-4b9c-bac4-ce5a0ffe9aed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || 'Sorry, I couldn’t understand that.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Oops! Something went wrong. Try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const goHome = () => {
    setChatState('welcome');
  };

  const startNewChat = () => {
    setMessages([]);
    clearTranscript(); // Clear the transcript
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        {chatState === 'welcome' ? (
          <div className="h-full overflow-y-auto pb-20">
            <WelcomeScreen onStartChat={startChat} />
          </div>
        ) : (
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            onGoHome={goHome}
            onNewChat={startNewChat}
            isConnected={isConnected}
            transcript={transcript}
            startCall={startCall}
            stopCall={stopCall}
          />
        )}
      </div>
      <NavigationBar currentView={chatState} onNavigate={setChatState} />
    </div>
  );
};

export default ChatInterface;