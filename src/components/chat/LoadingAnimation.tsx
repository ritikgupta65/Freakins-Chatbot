import { useTheme } from '@/contexts/ThemeContext';
import { MessageCircle } from 'lucide-react';

const LoadingAnimation = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-start mb-4">
      <div className="flex">
        {/* Avatar */}
        <div className="flex-shrink-0 mr-3">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.primaryGradient} flex items-center justify-center`}>
            {theme.logoUrl ? (
              <img src={theme.logoUrl} alt="Bot" className="w-8 h-8 rounded-full" />
            ) : (
              <MessageCircle className="w-4 h-4 text-white" />
            )}
          </div>
        </div>

        {/* Loading Bubble */}
        <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <div className="flex space-x-1">
            <div className={`w-2 h-2 bg-gradient-to-r ${theme.primaryGradient} rounded-full animate-bounce`}></div>
            <div className={`w-2 h-2 bg-gradient-to-r ${theme.primaryGradient} rounded-full animate-bounce delay-100`}></div>
            <div className={`w-2 h-2 bg-gradient-to-r ${theme.primaryGradient} rounded-full animate-bounce delay-200`}></div>
          </div>
          
          {/* Message Tail */}
          <div className="absolute top-4 left-0 transform -translate-x-1">
            <div className="w-3 h-3 rotate-45 bg-white/10 border-l border-t border-white/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
