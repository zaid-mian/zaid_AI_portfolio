import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';
import './Chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const BOT_RESPONSES: Record<string, string> = {
  '🚀 Tech Stack & Skills': "I'm highly proficient in Python (95%), C++ (85%), and JavaScript. My core expertise lies in AI/ML (RAG Systems, LLMs, Computer Vision) using LangChain, OpenAI, and TensorFlow. For backends, I use FastAPI, Flask, and Node.js with databases like PostgreSQL, MongoDB, and Redis.",
  '📂 Project Highlights': "I've completed 7+ major projects, including AI-driven cancer detection systems, RAG-powered chatbots, and real-time WebSocket applications. I focus on building grounded, production-ready AI systems rather than just simple demos.",
  '🎓 Education & Achievements': "I'm a 6th-semester BSCS student. My achievements include being a UC Berkeley CALICO finalist, participating in MIT Sloan & Hack-Nation, and completing Harvard's CS50x. I've also solved 50+ LeetCode problems and have 2+ years of experience in AI.",
  '💼 Services Offered': "I offer specialized AI services: 1. Custom ML Model Training 2. Full-Stack AI App Development (FastAPI/React) 3. LLM Orchestration (RAG, LangChain) 4. Custom Chatbot Development for Web, Telegram, or Discord.",
  '🎮 Hobbies & Interests': "When I'm not coding, I enjoy listening to music 🎧, photography 📷, gaming 🎮, and staying active with sports and fitness 🏀.",
  '🤝 Hire Zaid': "Excellent choice! Zaid is actively looking for AI/ML Internships and entry-level roles. You can reach him at mianzaid049@gmail.com or call +92 332 4418821. Want me to scroll you to the contact form?",
};

const INITIAL_BUTTONS = Object.keys(BOT_RESPONSES);

const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Zaid's personal AI assistant. I can answer questions about his tech stack, projects, education, or services. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleActionClick = (action: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: action,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setShowRedirect(false);

    // Bot typing simulation
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: BOT_RESPONSES[action] || "I'm sorry, I don't have information on that topic.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      
      if (action === '🤝 Hire Zaid') {
        setShowRedirect(true);
      }
    }, 800);
  };

  const handleRedirect = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Toggle Button */}
      <motion.button
        className={`chat-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <motion.div
            className="chat-pulse"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="bot-status-dot"></div>
                <div className="chat-header-text">
                  <h3>Zaid-Bot AI</h3>
                  <p><Sparkles size={12} className="inline mr-1" /> Online • v2.0</p>
                </div>
              </div>
              <button className="close-chat" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="chat-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`message-bubble ${msg.sender}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <div className="message-icon">
                    {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className="message-text">{msg.text}</div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div className="message-bubble bot typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="message-icon"><Bot size={16} /></div>
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons inside chat flow */}
              {!isTyping && (
                <motion.div 
                  className="chat-menu-container"
                  variants={menuContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {showRedirect ? (
                    <motion.button
                      className="redirect-btn-bubble"
                      variants={menuItemVariants}
                      onClick={handleRedirect}
                      whileHover={{ scale: 1.05, backgroundColor: '#00eaff', color: '#000' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Yes, take me there
                    </motion.button>
                  ) : (
                    INITIAL_BUTTONS.map((btn) => (
                      <motion.button
                        key={btn}
                        className="menu-item-bubble"
                        variants={menuItemVariants}
                        onClick={() => handleActionClick(btn)}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {btn}
                      </motion.button>
                    ))
                  )}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
