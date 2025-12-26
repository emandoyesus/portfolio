import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, Send } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="badge animate-fade-in">Full Stack Developer</span>
          <h2 className="greeting animate-fade-in">Hi, I'm <span className="text-white">Emandoyesus Tesfaye</span></h2>
          <h1 className="heading-lg animate-fade-in delay-100">
            Building digital <br />
            <span className="text-gradient">experiences</span> that matter.
          </h1>
          <p className="description animate-fade-in delay-200">
            I craft accessible, pixel-perfect, and performant web applications.
            Let's turn your vision into reality.
          </p>

          <div className="cta-group animate-fade-in delay-300">
            <Link to="/projects" className="btn btn-primary">
              View Work <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="btn btn-glass">
              Contact Me
            </Link>
          </div>

          <div className="socials animate-fade-in delay-300">
            <a href="https://www.github.com/emandoyesus" target="_blank" className="social-icon"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/emandoyesus" target="_blank" className="social-icon"><Linkedin size={24} /></a>
            <a href="mailto:emmandoyesus@gmail.com" target="_blank" className="social-icon"><Mail size={24} /></a>
            <a href="https://t.me/vintage_01" target="_blank" rel="noopener noreferrer" className="social-icon" title="Telegram">
              <Send size={18} />
            </a>
          </div>
        </div>

        <div className="hero-visual animate-fade-in delay-200">
          <div className="glow-circle"></div>

          <div className="profile-container">
            <div className="profile-glow"></div>
            <img src={profileImg} alt="Profile" className="profile-img" />
            <div className="floating-badge badge-1">
              <span>React</span>
            </div>
            <div className="floating-badge badge-2">
              <span>Node.js</span>
            </div>
            <div className="floating-badge badge-3">
              <span>PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-text {
          position: relative;
          z-index: 10;
        }

        .badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          background: rgba(109, 40, 217, 0.1);
          color: var(--accent-color);
          border: 1px solid rgba(109, 40, 217, 0.2);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .greeting {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .text-white {
          color: white;
          font-weight: 700;
        }

        .description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          max-width: 500px;
        }

        .cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .socials {
          display: flex;
          gap: 1.5rem;
        }

        .social-icon {
          color: var(--text-secondary);
          transition: all 0.3s;
        }

        .social-icon:hover {
          color: var(--accent-color);
          transform: translateY(-3px);
        }

        /* Visual Side */
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .glow-circle {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--primary-color) 0%, transparent 60%);
          opacity: 0.15;
          filter: blur(80px);
          z-index: -1;
        }

        .profile-container {
          position: relative;
          width: 320px;
          height: 320px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          padding: 4px; /* Border width */
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: spin 10s linear infinite;
        }

        .profile-img {
          width: 290px;
          height: 290px;
          border-radius: 50%;
          object-fit: cover;
          border: 8px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .floating-badge {
          position: absolute;
          padding: 0.75rem 1.5rem;
          background: rgba(18, 18, 23, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          color: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          z-index: 2;
          animation: float 6s ease-in-out infinite;
        }

        .badge-1 { top: 10%; right: 0; animation-delay: 0s; }
        .badge-2 { bottom: 15%; right: -10px; animation-delay: 2s; }
        .badge-3 { bottom: 20%; left: -20px; animation-delay: 4s; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .hero-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            order: 2;
          }

          .hero-visual {
            order: 1;
            margin-bottom: 2rem;
          }

          .profile-container {
            width: 260px;
            height: 260px;
          }

          .profile-img {
            width: 230px;
            height: 230px;
          }
          
          .description {
            margin-left: auto;
            margin-right: auto;
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .cta-group {
            gap: 0.75rem;
            margin-bottom: 2rem;
          }

          .socials {
            justify-content: center;
            gap: 1.25rem;
          }

          .profile-img {
            filter: grayscale(0.5);
            border-color: rgba(255, 255, 255, 0.1);
          }

          .glow-circle {
            opacity: 0.1;
            filter: blur(100px);
            width: 300px;
            height: 300px;
          }

          .floating-badge {
            background: rgba(18, 18, 23, 0.95);
            border-color: var(--glass-border);
            color: var(--text-secondary);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
