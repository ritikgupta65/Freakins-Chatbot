import { useTheme } from '@/contexts/ThemeContext';
import { Message } from '@/types/chat';
import { User, MessageCircle } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { theme } = useTheme(); 
  const isUser = message.sender === 'user';

  // Check if this is a JSON string with "products"
  let parsedProducts: any[] = [];
  try {
    const parsed = JSON.parse(message.content);
    if (Array.isArray(parsed) && parsed[0]?.products) {
      parsedProducts = parsed[0].products;
    }
  } catch (e) {}

  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/\*(?!\*)(.*?)\*/g, '• $1');
  };

  const renderProductCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {parsedProducts.map((product, idx) => (
        <div key={idx} className="bg-white/10 border border-white/20 p-4 rounded-2xl text-white shadow-lg">
          <img src={product.imageUrl} alt={product.name} className="rounded-lg w-full h-48 object-cover mb-3" />
          <h3 className="font-bold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-gray-300 mb-2">{product.description}</p>
          {product.color && <p className="text-sm text-gray-400">Color: {product.color}</p>}
          <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block bg-white text-black px-3 py-1 rounded-md text-sm font-medium">
            View Product
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-xs lg:max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-white/20' 
              : `bg-gradient-to-r ${theme.primaryGradient}`
          }`}>
            {isUser ? <User className="w-4 h-4 text-white" /> : theme.logoUrl ? (
              <img src={theme.logoUrl} alt="Bot" className="w-8 h-8 rounded-full" />
            ) : (
              <MessageCircle className="w-4 h-4 text-white" />
            )}
          </div>
        </div>

        <div className={`relative p-3 rounded-2xl ${
          isUser
            ? `bg-gradient-to-r ${theme.primaryGradient} text-white ml-auto`
            : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
        } shadow-xl`}>
          {/* Conditional rendering: product cards or formatted message */}
          {parsedProducts.length > 0 ? (
            renderProductCards()
          ) : (
            <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
          )}

          <p className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-gray-400'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>

          <div className={`absolute top-4 ${isUser ? 'right-0 transform translate-x-1' : 'left-0 transform -translate-x-1'}`}>
            <div className={`w-3 h-3 rotate-45 ${isUser ? `bg-gradient-to-r ${theme.primaryGradient}` : 'bg-white/10 border-l border-t border-white/20'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MessageBubble;