import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import "./projects.css";

const PROJECTS = [
  {
    title: "🧠 AI Communication Coach",
    desc: "Real-time multi-modal speech and body language analysis system using Whisper, MediaPipe, and Transformer-based sentiment scoring with WebSocket live feedback.",
    ss: "/mamo.jpeg",
    tech: ["Python", "Flask", "Flask-SocketIO", "OpenAI Whisper", "MediaPipe", "DistilBERT", "FFmpeg", "SQLite"],
    live: "#",
    code: "https://github.com/zaid-mian/AI_Communication_Coach",
  },
  {
    title: "🧠 Mental Health Analyzer",
    desc: "NLP-based system that analyzes user text for anxiety, stress, and depression indicators.",
    ss: "/mentalhealth.jpg",
    tech: ["Python", "Transformers", "NLTK", "scikit-learn"],
    live: "https://mental-health-analyzer.streamlit.app/",
    code: "https://github.com/zaid-mian/Health-Ai",
  },
{
  title: "🏥 Elder Care AI Companion",
  desc: "Autonomous fall detection and AI voice companion system with real-time pose estimation, multi-threaded backend processing, and automated emergency alerts.",
  ss: "/elder-care.jpeg",
  tech: ["Python", "OpenCV", "MediaPipe", "SpeechRecognition", "Twilio API", "SQLite"],
  live: "#",
  code: "https://github.com/zaid-mian/Monica-AI-",
},
  {
  title: "🇵🇰 MediBot AI",
  desc: "Localized AI healthcare assistant integrating Gemini API for symptom analysis, hospital finder, medicine database, and emergency detection.",
  ss: "/medibot.jpeg",
  tech: ["Python", "Flask", "Google Gemini API", "SQLite", "HTML", "CSS"],
  live: "#",
  code: "https://github.com/zaid-mian/Medbot.git",
},
  {
    title: "💬 DocuChat – Gemini AI Chatbot",
    desc: "Gemini-powered PDF analyzer that answers queries from uploaded documents.",
    ss: "/Docuchat.png",
    tech: ["Gemini API", "LangChain", "Python", "Streamlit"],
    live: "https://docuchat-chatbot.streamlit.app/",
    code: "https://github.com/zaid-mian/gemini-ai-chatbot",
  },
 {
  title: "🧠 CNN Character & Digit Visualizer",
  desc: "Interactive deep learning app visualizing CNN layer activations in real-time for MNIST & EMNIST datasets.",
  ss: "/cnnn.jpeg",
  tech: ["Python", "TensorFlow", "Keras", "Streamlit", "OpenCV", "Matplotlib", "NumPy"],
  live: "#",
  code: "https://github.com/zaid-mian/CNN_Character_Visualizer",
},
  {
    title: "🧬 Breast Cancer Prediction",
    desc: "ML pipeline using SVC, RF, and XGBoost with SMOTE for dataset balancing.",
    ss: "/breastpred.jpg",
    tech: ["scikit-learn", "XGBoost", "Pandas"],
    live: "#",
    code: "https://github.com/zaid-mian/Breast-Cancer-Prediction-with-KNN-Cross-Validation-GridSearchCV",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  return (
    <motion.section
      ref={sectionRef}
      className="projects-container"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="projects"
    >
      <motion.div
        className="projects-card"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18 } },
        }}
      >
        {/* Title Animation */}
        <motion.h2
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="projects-title"
                >
          🚀My <span className="proj">Projects</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="projects-subtitle"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          A collection of my major works — blending research, AI innovation.
        </motion.p>

        {/* Grid */}
        <div className="projects-grid">
          {PROJECTS.map((p, idx) => (
            <motion.div
              key={idx}
              className="project-card"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    ease: "easeOut",
                    delay: idx * 0.1,
                  },
                },
              }}
              whileHover={{ scale: 1.04 }}
            >
              <motion.div
                className="project-image-wrapper"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={p.ss} alt={p.title} className="project-image" />
              </motion.div>

              <div className="project-content">
                <h3 className="project-heading">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>

                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <motion.a
                    href={p.code}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="code-btn"
                  >
                    <Github size={14} /> Code
                  </motion.a>

                  {/* <motion.a
                    href={p.live}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="live-btn"
                  >
                    <ExternalLink size={14} /> Live
                  </motion.a> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
