import { useEffect, useRef, useState } from "react";
import {
  Code,
  Timer,
  Cpu,
  Trophy,
  Gamepad2,
  CheckCircle2,
  Brain,
  Server,
  ArrowRight,
  MessageSquare,
  Target,
  Layers,
  Rocket,
} from "lucide-react";

import "./About.css";

export function About() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [extraVisible, setExtraVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [hobbiesVisible, setHobbiesVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  /* ===== TITLE REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setTitleVisible(true),
      { threshold: 0.5 }
    );
    const intro = document.querySelector(".about-intro-screen");
    if (intro) observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  /* ===== IMAGE SCROLL ===== */
  useEffect(() => {
    const NAVBAR_HEIGHT = 80;
    const IMAGE_STOP_OFFSET = 60;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, NAVBAR_HEIGHT + IMAGE_STOP_OFFSET - rect.top);
      const progress = Math.min(scrolled / (window.innerHeight * 0.25), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== WHO AM I REVEAL (whole box + then typing) ===== */
  useEffect(() => {
    let triggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;

          // after 4s: show WHO AM I card (whole box)
          setTimeout(() => {
            setInfoVisible(true);

            // after card is visible: start typing on title
            setTimeout(() => {
              const el = document.querySelector(".whoami-title");
              el?.classList.add("type");
            }, 200);
          }, 1000); // 4 seconds AFTER scrolled into view
        }
      },
      { threshold: 0.7 }
    );

    if (infoRef.current) observer.observe(infoRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== EXTRA REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setExtraVisible(true),
      { threshold: 0.3 }
    );
    if (extraRef.current) observer.observe(extraRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== SERVICES REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setServicesVisible(true),
      { threshold: 0.15 }
    );
    if (servicesRef.current) observer.observe(servicesRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== PROCESS REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setProcessVisible(true),
      { threshold: 0.15 }
    );
    if (processRef.current) observer.observe(processRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== HOBBIES REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHobbiesVisible(true),
      { threshold: 0.3 }
    );
    const hobbiesElement = document.querySelector(".about-hobbies");
    if (hobbiesElement) observer.observe(hobbiesElement);
    return () => observer.disconnect();
  }, []);

  /* ===== COUNTERS ===== */
  const counters = [
    { icon: Code, label: "Projects Completed", value: 7 },
    { icon: Timer, label: "Years Experience in Ai", value: 2 },
    { icon: Cpu, label: "Technologies Mastered", value: 7 },
    { icon: Trophy, label: "LeetCode Solved", value: 50 },
  ];

  const [countValues, setCountValues] = useState(counters.map(() => 0));

  useEffect(() => {
    if (!extraVisible) return;

    counters.forEach((counter, index) => {
      let start = 0;
      const end = counter.value;
      const interval = setInterval(() => {
        start++;
        setCountValues((prev) => {
          const updated = [...prev];
          updated[index] = start;
          return updated;
        });
        if (start === end) clearInterval(interval);
      }, 1500 / counter.value);
    });
  }, [extraVisible]);

  /* ===== IMAGE + TEXT ===== */
  const getImageWidth = () =>
    scrollProgress < 0.2 ? 100 :
    scrollProgress < 0.6 ? 100 - ((scrollProgress - 0.4) / 0.2) * 60 :
    40;

  const NAVBAR_HEIGHT = 80;

  const getImageTransform = () =>
    scrollProgress < 0.2
      ? `translateY(${100 - (scrollProgress / 0.2) * 100 + NAVBAR_HEIGHT}px)`
      : `translateY(${NAVBAR_HEIGHT}px)`;

  const getTextOpacity = () =>
    scrollProgress < 0.4 ? 0 :
    scrollProgress < 0.6 ? (scrollProgress - 0.4) / 0.2 :
    1;

  return (
    <section id="about" className="about-wrapper">
      {/* INTRO TITLE */}
      <div className={`about-intro-screen ${titleVisible ? "show-title" : ""}`}>
        <h1>
          About <span className="grad">me?</span>
        </h1>
      </div>

      {/* MAIN SCROLL AREA */}
      <div ref={containerRef} className="about-scroll">
        <div className="about-sticky">
          {/* IMAGE */}
          <div
            className="about-image"
            style={{ width: `${getImageWidth()}%`, transform: getImageTransform() }}
          >
            <img src="./temp.jpeg" alt="Profile" />
          </div>

          {/* INFO PANEL */}
          <div
            ref={infoRef}
            className={`about-info ${infoVisible ? "info-show" : ""}`}
            style={{
              // WHOLE BOX HIDDEN UNTIL infoVisible === true
              opacity: infoVisible ? getTextOpacity() : 0,
              width: infoVisible
                ? getImageWidth() > 70
                  ? "0%"
                  : "60%"
                : "0%"
            }}
          >
            <div className="info-inner">
              <h2 className="whoami-title">
                <span>Who am I?</span>
              </h2>

              <p>
                 I'm a 6th-semester BSCS student dedicated to bridging the gap between AI research and
                  production-ready software. My focus is on <span className="text-foreground">RAG systems, LLM orchestration with LangChain</span>,
                 and Python backends that don't break in production.
              </p>

              <p>
                I have hands-on experience training ML models from scratch — KNN, SVC, Random 
                Forest, CNNs — and a deep understanding of neural network fundamentals.
              </p>

              <p>
                Additionally, I use AI-assisted development workflows to accelerate end-to-end
                solutions — from rapid prototyping to production-ready websites — without compromising
                 code quality.
              </p>
              
              <div className="mt-6 space-y-2 text-sm"> 
                   <p className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Building grounded LLM systems, not flaky demos</p> 
                   <p className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Open-source contributor &amp; hackathon competitor</p> 
                   <p className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Available for internships and entry-level AI roles</p> 
              </div>
            </div>

            <div className="skill-cards-container">
              <div className="skill-card">
                <div className="skill-icon-wrapper purple">
                  <Brain size={24} />
                </div>
                <div className="skill-content">
                  <h3>RAG & LLM Specialist</h3>
                  <p>Architecting retrieval-augmented systems with LangChain, vector DBs and grounded outputs.</p>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon-wrapper cyan">
                  <Code size={24} />
                </div>
                <div className="skill-content">
                  <h3>Backend Engineer</h3>
                  <p>FastAPI & Flask APIs, real-time WebSocket pipelines, PostgreSQL & MongoDB at the core.</p>
                </div>
              </div>

              <div className="skill-card">
                <div className="skill-icon-wrapper pink">
                  <Trophy size={24} />
                </div>
                <div className="skill-content">
                  <h3>Competition-tested</h3>
                  <p>UC Berkeley CALICO finalist, MIT Sloan & Hack-Nation participant, Harvard CS50x.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXTRA SECTION */}
      <div ref={extraRef} className={`about-extra ${extraVisible ? "extra-show" : ""}`}>
        <div className="about-counters">
          {counters.map((c, i) => (
            <div key={i} className="counter-box">
              <c.icon size={42} className="counter-icon" />
              <h3>{countValues[i]}+</h3>
              <p>{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div ref={servicesRef} className={`about-services ${servicesVisible ? "services-show" : ""}`}>
        <div className="services-header">
          <span className="badge">WHAT I DO</span>
          <h2>Services That <span className="grad">Drive Results</span></h2>
          <p>
            Specialized AI & engineering services — from custom ML models to full-stack LLM applications,
            tailored to ship in production.
          </p>
        </div>

        <div className="services-grid">
          {/* AI / ML Solutions */}
          <div className="service-card">
            <div className="service-icon purple">
              <Cpu size={24} />
            </div>
            <h3>AI / ML Solutions</h3>
            <p>End-to-end ML pipelines and intelligent systems that move out of notebooks and into production.</p>
            <ul>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> Custom ML model training</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> Recommendation systems</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> Computer vision pipelines</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> NLP & sentiment analysis</li>
            </ul>
            <button className="btn-get-started purple">Get Started <ArrowRight size={16} /></button>
          </div>

          {/* Full-Stack AI Apps */}
          <div className="service-card">
            <div className="service-icon blue">
              <Code size={24} />
            </div>
            <h3>Full-Stack AI Apps</h3>
            <p>Complete AI-powered web applications — Python backends, modern frontends, real-time UX.</p>
            <ul>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> FastAPI / Flask backends</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> RAG-powered chatbots</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> Real-time WebSocket apps</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> API design & integration</li>
            </ul>
            <button className="btn-get-started blue">Get Started <ArrowRight size={16} /></button>
          </div>

          {/* LLM Orchestration */}
          <div className="service-card">
            <div className="service-icon green">
              <Brain size={24} />
            </div>
            <h3>LLM Orchestration</h3>
            <p>Grounded LLM systems with retrieval, tool use and reliable evaluation — no hallucinated demos.</p>
            <ul>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> RAG architectures</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> LangChain pipelines</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> Vector databases</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> Prompt engineering</li>
            </ul>
            <button className="btn-get-started green">Get Started <ArrowRight size={16} /></button>
          </div>

          {/* Custom Chatbot Development */}
          <div className="service-card">
            <div className="service-icon red">
              <MessageSquare size={24} />
            </div>
            <h3>Custom Chatbot Development</h3>
            <p>Conversational AI for any platform.</p>
            <ul>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> Telegram & Discord bots</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> Web-based chatbots</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> RAG-powered assistants</li>
              <li><CheckCircle2 size={16} className="text-emerald-400" /> Custom knowledge bases</li>
            </ul>
            <button className="btn-get-started red">Get Started <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* PROCESS SECTION */}
      <div ref={processRef} className={`about-process ${processVisible ? "process-show" : ""}`}>
        <div className="process-header">
          <h2>My <span className="grad">Process</span></h2>
        </div>
        <div className="process-grid">
          <div className="process-step">
            <div className="process-icon-outer">
              <div className="process-icon-inner">
                <Target size={24} />
              </div>
            </div>
            <span className="step-number">STEP 01</span>
            <h3>Discovery</h3>
            <p>Understand the problem, data and constraints.</p>
          </div>

          <div className="process-step">
            <div className="process-icon-outer">
              <div className="process-icon-inner">
                <Layers size={24} />
              </div>
            </div>
            <span className="step-number">STEP 02</span>
            <h3>Design</h3>
            <p>Architect the model, data flow and APIs.</p>
          </div>

          <div className="process-step">
            <div className="process-icon-outer">
              <div className="process-icon-inner">
                <Cpu size={24} />
              </div>
            </div>
            <span className="step-number">STEP 03</span>
            <h3>Develop</h3>
            <p>Train, build and integrate end-to-end.</p>
          </div>

          <div className="process-step">
            <div className="process-icon-outer">
              <div className="process-icon-inner">
                <Rocket size={24} />
              </div>
            </div>
            <span className="step-number">STEP 04</span>
            <h3>Deliver</h3>
            <p>Ship, monitor and iterate in production.</p>
          </div>
        </div>
      </div>

      {/* HOBBIES SECTION */}
      <div className={`about-hobbies ${hobbiesVisible ? "hobbies-show" : "hobbies-hidden"}`}>
        <h2>Hobbies</h2>
        <div className="hobby-grid">
          <div className="hobby">🎧 Listening to Music</div>
          <div className="hobby">📷 Photography</div>
          <div className="hobby">🎮 Gaming</div>
          <div className="hobby">🏀 Sports & Fitness</div>
        </div>
      </div>
    </section>
  );
}
