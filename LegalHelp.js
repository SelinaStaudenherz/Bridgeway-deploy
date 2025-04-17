import React, { useState, useRef, useEffect } from 'react';
import { translations } from '../../data/translations';

const LegalHelp = ({ language, isPremium }) => {
  const t = translations[language] || translations.en;
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I can help with common legal and financial questions. What would you like to know about?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Suggested questions
  const suggestedQuestions = [
    { id: 1, text: t.workVisaQuestion },
    { id: 2, text: t.workerRightsQuestion },
    { id: 3, text: t.bankAccountQuestion },
    { id: 4, text: t.sendMoneyQuestion }
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText
    };
    setMessages([...messages, userMessage]);
    setInputText('');

    // Process response (simulate thinking with timeout)
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      setMessages(prevMessages => [...prevMessages, {
        id: prevMessages.length + 1,
        sender: 'bot',
        text: botResponse
      }]);
    }, 1000);
  };

  const handleQuestionClick = (question) => {
    // Add user message with suggested question
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: question
    };
    setMessages([...messages, userMessage]);

    // Process response (simulate thinking with timeout)
    setTimeout(() => {
      const botResponse = generateResponse(question);
      setMessages(prevMessages => [...prevMessages, {
        id: prevMessages.length + 1,
        sender: 'bot',
        text: botResponse
      }]);
    }, 1000);
  };

  const generateResponse = (question) => {
    // Simple conditional logic for responses based on keywords in questions
    const lowerQuestion = question.toLowerCase();
    
    // Check if premium features should be limited
    if (!isPremium && messages.filter(m => m.sender === 'user').length > 2) {
      return 'To continue using the advanced chatbot features, please upgrade to our Premium plan.';
    }
    
    if (lowerQuestion.includes('visa') || lowerQuestion.includes('work permit')) {
      return `To get a work visa, you typically need to follow these steps:
      
1. Find an employer willing to sponsor you
2. Your employer files a petition with immigration authorities
3. Once approved, you apply for the visa at your local embassy or consulate
4. Submit required documentation including passport, photos, forms, and fees
5. Attend an interview if required
6. Wait for visa processing

Requirements vary by country, so check the specific immigration website for your destination country.`;
    } 
    else if (lowerQuestion.includes('rights') || lowerQuestion.includes('worker')) {
      return `As a worker, you generally have these rights regardless of immigration status:

1. Right to be paid minimum wage and overtime
2. Right to a safe workplace free from discrimination and harassment
3. Right to join a union and advocate for better working conditions
4. Right to take breaks as mandated by law
5. Right to workers' compensation for injuries
6. Protection from retaliation when reporting violations

For specific legal advice about your situation, consult with an employment attorney or local labor office.`;
    } 
    else if (lowerQuestion.includes('bank') || lowerQuestion.includes('account')) {
      return `To open a bank account in most countries, you'll need:

1. Identification (passport, ID card, or driver's license)
2. Proof of address (utility bill, rental agreement)
3. Immigration documentation (visa or residence permit)
4. Initial deposit (amount varies by bank)

Many banks now offer specialized accounts for newcomers. It's best to research banks with multilingual services or those familiar with serving immigrants.`;
    } 
    else if (lowerQuestion.includes('send') || lowerQuestion.includes('money') || lowerQuestion.includes('international')) {
      return `To send money internationally, you have several options:

1. Bank wire transfers: Secure but often expensive and slow
2. Money transfer services: Western Union, MoneyGram, Ria
3. Online services: Wise (formerly TransferWise), Remitly, WorldRemit
4. Payment apps: PayPal, Venmo (limited international capabilities)
5. Cryptocurrency: Bitcoin and other digital currencies

Compare fees, exchange rates, and delivery times. Many online services offer better rates than traditional banks.`;
    } 
    else {
      return `I don't have specific information about that topic yet. Here are some topics I can help with:
      
- How to get a work visa
- Understanding your worker rights
- Opening a bank account
- Sending money internationally

Feel free to ask about any of these topics!`;
    }
  };

  return (
    <div className="legal-help-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="text-center mb-4">{t.legalHelpHeading}</h2>
            
            <div className="chatbot-container">
              <div className="chatbot-messages" style={{ height: '400px', overflowY: 'auto' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                    style={{
                      alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      backgroundColor: message.sender === 'user' ? '#0d6efd' : '#f8f9fa',
                      color: message.sender === 'user' ? 'white' : 'black',
                      borderRadius: '1rem',
                      padding: '0.75rem 1rem',
                      margin: '0.5rem 0',
                      maxWidth: '75%',
                      marginLeft: message.sender === 'user' ? 'auto' : '0',
                      marginRight: message.sender === 'user' ? '0' : 'auto',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {message.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSubmit} className="chatbot-input d-flex">
                <input
                  type="text"
                  className="form-control"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.chatbotPlaceholder}
                />
                <button type="submit" className="btn btn-primary ms-2">
                  {t.send}
                </button>
              </form>
            </div>
            
            <div className="suggested-questions mt-4">
              <h5>{t.suggestedQuestions}</h5>
              <div className="d-flex flex-wrap">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question.id}
                    className="btn btn-outline-secondary me-2 mb-2"
                    onClick={() => handleQuestionClick(question.text)}
                  >
                    {question.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalHelp;
