import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'नमस्ते! 🙏 मैं आपकी सहायता के लिए यहाँ हूँ। मुझसे कुछ भी पूछें।',
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    { text: '📚 कोर्स कैसे शुरू करें?', en: 'How to start courses?' },
    { text: '💰 क्या यह मुफ्त है?', en: 'Is it free?' },
    { text: '📱 मोबाइल में चलेगा?', en: 'Works on mobile?' },
    { text: '🎓 प्रमाणपत्र मिलेगा?', en: 'Will I get certificate?' }
  ];

  const botResponses = {
    'कोर्स कैसे शुरू करें': 'कोर्स शुरू करने के लिए:\n1. साइन अप करें (मुफ्त)\n2. अपना विषय चुनें 📚\n3. कक्षा का चयन करें\n4. सीखना शुरू करें! 🚀',
    'मुफ्त': 'जी हाँ! हमारे सभी बेसिक कोर्स पूरी तरह से मुफ्त हैं। 🎉 कोई छिपा हुआ शुल्क नहीं है। बस साइन अप करें और सीखना शुरू करें!',
    'मोबाइल': 'बिल्कुल! 📱 हमारा प्लेटफॉर्म पूरी तरह से मोबाइल फ्रेंडली है। आप अपने फोन, टैबलेट या कंप्यूटर किसी पर भी पढ़ सकते हैं।',
    'प्रमाणपत्र': 'हाँ! 🎓 कोर्स पूरा करने पर आपको डिजिटल प्रमाणपत्र मिलेगा जिसे आप डाउनलोड कर सकते हैं।',
    'help': 'मैं आपकी निम्न में मदद कर सकता हूँ:\n• कोर्स की जानकारी\n• साइन अप प्रक्रिया\n• तकनीकी सहायता\n• शिक्षकों से संपर्क\n• प्रमाणपत्र के बारे में',
    'default': 'धन्यवाद आपके सवाल के लिए! 😊 हमारी टीम जल्द ही आपसे संपर्क करेगी। अभी के लिए आप हमारे FAQ सेक्शन देख सकते हैं या फिर से कोशिश करें।'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('कोर्स') || msg.includes('course') || msg.includes('शुरू')) {
      return botResponses['कोर्स कैसे शुरू करें'];
    } else if (msg.includes('मुफ्त') || msg.includes('free') || msg.includes('शुल्क') || msg.includes('पैसे')) {
      return botResponses['मुफ्त'];
    } else if (msg.includes('मोबाइल') || msg.includes('mobile') || msg.includes('फोन') || msg.includes('phone')) {
      return botResponses['मोबाइल'];
    } else if (msg.includes('प्रमाणपत्र') || msg.includes('certificate') || msg.includes('सर्टिफिकेट')) {
      return botResponses['प्रमाणपत्र'];
    } else if (msg.includes('help') || msg.includes('मदद') || msg.includes('सहायता')) {
      return botResponses['help'];
    } else if (msg.includes('नमस्ते') || msg.includes('hello') || msg.includes('hi')) {
      return 'नमस्ते! 🙏 मैं आपकी कैसे मदद कर सकता हूँ?';
    } else if (msg.includes('धन्यवाद') || msg.includes('thank')) {
      return 'आपका स्वागत है! 😊 कुछ और मदद चाहिए तो बताइए।';
    }
    
    return botResponses['default'];
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(inputMessage),
        time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    const newUserMessage = {
      type: 'user',
      text: question.text,
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(question.text),
        time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 via-green-600 to-blue-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl animate-bounce">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-lg">शिक्षा सहायक</h3>
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span>ऑनलाइन / Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="p-3 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2 font-medium">त्वरित प्रश्न:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs bg-gradient-to-r from-green-100 to-blue-100 hover:from-green-200 hover:to-blue-200 text-gray-700 p-2 rounded-lg transition-all duration-200 text-left font-medium"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="अपना सवाल लिखें..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-bold"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-green-500 via-green-600 to-blue-600 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-3xl relative group"
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && (
          <div className="absolute -top-1 -right-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            मदद चाहिए? पूछें! 
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-gray-800"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default Chatbot;