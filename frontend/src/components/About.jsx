import React, { useState } from 'react';
import profileImg from '../assets/profile.jpg';
import {
  Code2,
  Database,
  Server,
  Layout,
  Settings,
  Globe,
  Terminal,
  Cpu,
  GitBranch,
  Figma,
  Smartphone,
  Layers
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('stack');

  const techStack = [
    { name: "React", icon: <Code2 /> },
    { name: "Next.js", icon: <Globe /> },
    { name: "Node.js", icon: <Server /> },
    { name: "TypeScript", icon: <Terminal /> },
    { name: "Tailwind", icon: <Layout /> },
    { name: "PostgreSQL", icon: <Database /> },
    { name: "Python", icon: <Settings /> },
    { name: "Javascript", icon: <Code2 /> }
  ];

  const tools = [
    { name: "Git", icon: <GitBranch /> },
    { name: "Docker", icon: <Layers /> },
    { name: "Figma", icon: <Figma /> },
    { name: "VS Code", icon: <Cpu /> },
    { name: "Linux", icon: <Terminal /> },
    { name: "Postman", icon: <Globe /> }
  ];

  const displayedSkills = activeTab === 'stack' ? techStack : tools;

  return (
    <section id="about" className="section about-section">
      <div className="container">

        {/* About Me Section */}
        <div className="about-header animate-fade-in">
          <div className="section-title-wrapper">
            <h2 className="section-title">About Me</h2>
            <div className="title-line"></div>
          </div>

          <div className="about-card glass-card">
            <div className="about-image-wrapper">
              <div className="image-circle">
                <img src={profileImg} alt="About Me" />
              </div>
            </div>
            <div className="about-content">
              <p className="bio-text">
                Hi! I'm <span className="highlight">Emandoyesus Tesfaye</span>, a Full Stack Developer from Ethiopia.
                I specialize in building modern web applications with clean code and exceptional user experiences.
              </p>
              <p className="bio-text">
                I transform ideas into functional, beautiful products that users love. Every project is an opportunity
                to blend creativity with technical excellence, ensuring your vision comes to life in the most impactful way.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="skills-section animate-fade-in delay-200">
          <div className="section-title-wrapper">
            <h2 className="section-title">Skills</h2>
            <div className="title-line"></div>
          </div>

          <div className="skills-tabs">
            <button
              className={`tab-btn ${activeTab === 'stack' ? 'active' : ''}`}
              onClick={() => setActiveTab('stack')}
            >
              Tech Stack
            </button>
            <button
              className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              Tools
            </button>
          </div>

          <div className="skills-grid">
            {displayedSkills.map((skill, index) => (
              <div key={index} className="skill-box glass-card">
                <div className="skill-icon">{skill.icon}</div>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .about-section {
          padding-top: 100px;
        }

        .section-title-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          white-space: nowrap;
        }

        .title-line {
          height: 3px;
          background: linear-gradient(to right, var(--primary-color), transparent);
          flex: 1;
          max-width: 150px;
          border-radius: 2px;
        }

        .about-card {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2.5rem;
          padding: 2.5rem;
          align-items: start;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
        }

        .about-image-wrapper {
          display: flex;
          justify-content: center;
        }

        .image-circle {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 3px solid var(--primary-color);
          padding: 6px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(109, 40, 217, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .image-circle:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 50px rgba(109, 40, 217, 0.3);
        }

        .image-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .bio-text {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }

        .bio-text:last-child {
          margin-bottom: 0;
        }

        .highlight {
          color: white;
          font-weight: 700;
          background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Skills */
        .skills-section {
          margin-top: 4rem;
        }

        .skills-tabs {
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .tab-btn {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.75rem 0;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          bottom: -1px;
        }

        .tab-btn:hover {
          color: white;
        }

        .tab-btn.active {
          color: white;
          border-bottom-color: var(--primary-color);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 1.25rem;
        }

        .skill-box {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1rem 1.25rem;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.02);
          border-radius: var(--radius-sm);
          transition: all 0.3s ease;
        }

        .skill-box:hover {
          transform: translateY(-3px);
          border-color: var(--primary-color);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 8px 20px rgba(109, 40, 217, 0.15);
        }

        .skill-icon {
          color: var(--primary-color);
          display: flex;
          align-items: center;
          font-size: 1.25rem;
        }
        
        .skill-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: white;
        }

        @media (max-width: 968px) {
          .about-section {
            padding-top: 80px;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .about-card {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 1.75rem;
            gap: 2rem;
          }

          .image-circle {
            margin: 0 auto 1.5rem;
            width: 180px;
            height: 180px;
            filter: grayscale(0.5);
            border-color: rgba(255, 255, 255, 0.2);
          }

          .bio-text {
            font-size: 0.9rem;
            line-height: 1.65;
          }

          .skills-section {
            margin-top: 3rem;
          }

          .skills-tabs {
            gap: 1.5rem;
            justify-content: center;
          }

          .tab-btn {
            font-size: 0.875rem;
          }

          .skill-icon {
            color: var(--text-secondary);
            font-size: 1.1rem;
          }

          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.875rem;
          }

          .skill-box {
            padding: 0.875rem 1rem;
          }

          .skill-name {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
