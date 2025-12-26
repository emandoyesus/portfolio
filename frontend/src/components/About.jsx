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
                Hi everyone! My name is <span className="highlight">Emandoyesus Tesfaye</span>. I'm a Full Stack developer
                from Ethiopia. I have experience in web development using modern technologies.
                I really enjoy what I do right now; in my opinion, creating programs is not just a job,
                but also an art that has aesthetic value.
              </p>
              <p className="bio-text">
                My job is to build your idea to be functional and user-friendly yet still attractive.
                In addition, I provide a personal touch to your product and ensure that the product catches
                attention and is easy to use. My goal is to convey your message and identity in the most
                creative way. If you are interested in hiring me, please contact me!
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
          padding-top: 120px;
        }

        .section-title-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          white-space: nowrap;
        }

        .title-line {
          height: 2px;
          background: var(--primary-color);
          width: 100px;
          border-radius: 2px;
        }

        .about-card {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          padding: 3rem;
          align-items: center;
          background: rgba(255, 255, 255, 0.03); /* Changed from #111 to glass variable */
          border: 1px solid var(--glass-border);
        }

        .about-image-wrapper {
          display: flex;
          justify-content: center;
        }

        .image-circle {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 4px solid var(--primary-color);
          padding: 5px;
          overflow: hidden;
        }

        .image-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .bio-text {
          color: var(--text-secondary); /* Updated variable */
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .highlight {
          color: var(--primary-color);
          font-weight: 600;
        }

        /* Skills */
        .skills-section {
          margin-top: 5rem;
        }

        .skills-tabs {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .tab-btn {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding-bottom: 0.5rem;
          border-bottom: 2px solid transparent;
          transition: all 0.3s;
        }

        .tab-btn:hover {
          color: white;
        }

        .tab-btn.active {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        .skill-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.03);
          transition: transform 0.3s, border-color 0.3s;
        }

        .skill-box:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
        }

        .skill-icon {
          color: var(--primary-color);
          display: flex;
          align-items: center;
        }
        
        .skill-name {
          font-weight: 600;
          color: white;
        }

        @media (max-width: 968px) {
          .about-card {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 2rem;
          }

          .image-circle {
            margin: 0 auto;
            filter: grayscale(0.5);
            border-color: rgba(255, 255, 255, 0.2);
          }

          .skill-icon {
            color: var(--text-secondary);
          }

          .tab-btn.active {
            color: white;
            border-bottom-color: var(--primary-color);
          }

          .highlight {
            color: white;
            text-decoration: underline;
            text-decoration-color: var(--primary-color);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
