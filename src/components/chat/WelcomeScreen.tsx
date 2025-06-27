
import { useTheme } from '@/contexts/ThemeContext';
import { MessageCircle, Clock, Phone, User, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStartChat: (message?: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  const { theme } = useTheme();

  const handleQuickAction = (action: string) => {
    onStartChat(action);
  };

  const recentConversations = [
    {
      id: 1,
      preview: "Great! Please provide the following details...",
      timestamp: "2 minutes ago"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-lime-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-lime-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-auto">
        {/* Logo Section */}
        <div className="text-center mb-8">
          {theme.logoUrl ? (
            <img 
              src={theme.logoUrl} 
              alt={theme.brandName}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl shadow-2xl"
            />
          ) : (
            <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${theme.primaryGradient} shadow-2xl flex items-center justify-center`}>
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          )}
          
          <h1 className="text-2xl font-bold text-white mb-2">Hi, there!</h1>
          <p className="text-white text-lg mb-8">How can we help you today??</p>
        </div>

        {/* Main Quick Action */}
        <div className="mb-6">
          <button
            onClick={() => handleQuickAction('Ask a question')}
            className="w-full p-4 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 text-white hover:bg-black/40 transition-all duration-300 group flex items-center justify-between"
          >
            <div className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-3" />
              <span className="font-medium">Ask a question</span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => handleQuickAction('Track my order')}
            className="flex-1 px-4 py-3 bg-black/20 backdrop-blur-md rounded-xl border border-white/20 text-white text-sm hover:bg-black/30 transition-all duration-300"
          >
            Track my order
          </button>
          <button
            onClick={() => handleQuickAction('New arrivals')}
            className="flex-1 px-4 py-3 bg-black/20 backdrop-blur-md rounded-xl border border-white/20 text-white text-sm hover:bg-black/30 transition-all duration-300"
          >
            New arrivals
          </button>
        </div>

        {/* Recent Conversations */}
        {recentConversations.length > 0 && (
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Recent Conversation</h3>
            {recentConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onStartChat()}
                className="w-full p-4 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 text-left hover:bg-black/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">{conversation.preview}</p>
                    <p className="text-gray-400 text-xs">{conversation.timestamp}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Additional Actions - UI only, no backend functionality */}
        <div className="space-y-3">
          <button
            className="w-full p-4 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 text-white hover:bg-black/40 transition-all duration-300 group flex items-center justify-between"
          >
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3" />
              <span className="font-medium">Start a live call</span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            className="w-full p-4 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 text-white hover:bg-black/40 transition-all duration-300 group flex items-center justify-between"
          >
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3" />
              <span className="font-medium">Talk to a human agent</span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
