import React from 'react';
import {
    Code2,
    Database,
    Server,
    Layout,
    Settings,
    Smartphone,
    Globe,
    Cpu,
    Layers,
    Terminal
} from 'lucide-react';

const skills = [
    { name: 'React', icon: <Code2 size={24} /> },
    { name: 'Node.js', icon: <Server size={24} /> },
    { name: 'PostgreSQL', icon: <Database size={24} /> },
    { name: 'TypeScript', icon: <Terminal size={24} /> },
    { name: 'Python', icon: <Settings size={24} /> },
    { name: 'Tailwind', icon: <Layout size={24} /> },
    { name: 'Docker', icon: <Layers size={24} /> },
    { name: 'Svelte', icon: <Code2 size={24} /> },
    { name: 'Express', icon: <Globe size={24} /> },
    { name: 'Mobile Dev', icon: <Smartphone size={24} /> },
];

const SkillsMarquee = () => {
    return (
        <section className="marquee-section">
            <div className="marquee-container">
                <div className="marquee-content">
                    {skills.map((skill, index) => (
                        <div key={`skill-1-${index}`} className="skill-item">
                            <span className="skill-icon">{skill.icon}</span>
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {skills.map((skill, index) => (
                        <div key={`skill-2-${index}`} className="skill-item">
                            <span className="skill-icon">{skill.icon}</span>
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .marquee-section {
          padding: 2rem 0;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
          overflow: hidden;
          position: relative;
        }

        /* Fade effect on sides */
        .marquee-section::before,
        .marquee-section::after {
          content: "";
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .marquee-section::before {
          left: 0;
          background: linear-gradient(to right, var(--bg-color), transparent);
        }

        .marquee-section::after {
          right: 0;
          background: linear-gradient(to left, var(--bg-color), transparent);
        }

        .marquee-container {
          display: flex;
          overflow: hidden;
          user-select: none;
        }

        .marquee-content {
          display: flex;
          flex-shrink: 0;
          gap: 4rem;
          animation: scroll 30s linear infinite;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 1.2rem;
          white-space: nowrap;
          transition: color 0.3s;
        }

        .skill-item:hover {
          color: var(--accent-color);
        }

        .skill-icon {
          color: var(--primary-color);
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - 2rem)); /* Adjust based on gap */
          }
        }
        
        /* Pause on hover for better UX */
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};

export default SkillsMarquee;
