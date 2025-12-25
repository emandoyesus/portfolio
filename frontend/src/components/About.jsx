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
    Terminal,
    Brain,
    GitBranch,
    Figma
} from 'lucide-react';

const About = () => {
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: <Layout className="category-icon" />,
            skills: [
                { name: "React", level: "Expert" },
                { name: "Next.js", level: "Advanced" },
                { name: "TypeScript", level: "Advanced" },
                { name: "Tailwind CSS", level: "Expert" },
                { name: "Framer Motion", level: "Intermediate" }
            ]
        },
        {
            title: "Backend Engineering",
            icon: <Server className="category-icon" />,
            skills: [
                { name: "Node.js", level: "Advanced" },
                { name: "Express", level: "Advanced" },
                { name: "PostgreSQL", level: "Intermediate" },
                { name: "Python", level: "Intermediate" },
                { name: "Redis", level: "Basic" }
            ]
        },
        {
            title: "Tools & DevOps",
            icon: <Settings className="category-icon" />,
            skills: [
                { name: "Git & GitHub", level: "Expert" },
                { name: "Docker", level: "Intermediate" },
                { name: "AWS", level: "Basic" },
                { name: "Figma", level: "Intermediate" },
                { name: "Linux", level: "Advanced" }
            ]
        }
    ];

    return (
        <section id="about" className="section about-section">
            <div className="container">

                {/* Bio Section */}
                <div className="about-header animate-fade-in">
                    <h2 className="heading-md">About <span className="text-gradient">Me</span></h2>
                    <div className="bio-content glass-card">
                        <p className="bio-text">
                            I'm <span className="highlight">Emandoyesus Tesfaye</span>, a passionate Full Stack Developer based in Mekelle, Ethiopia.
                            My journey in tech started with a curiosity for how things work, which rapidly evolved into a love for building
                            robust, scalable applications.
                        </p>
                        <p className="bio-text">
                            I specialize in the <strong>MERN stack</strong> and modern web technologies. Whether I'm designing a pixel-perfect
                            frontend or architecting a complex backend API, I'm driven by the goal of creating seamless digital experiences.
                            When I'm not coding, you can find me exploring new open-source projects or learning about the latest advancements in AI.
                        </p>
                    </div>
                </div>

                {/* Tech Stack Section */}
                <div className="tech-stack-section animate-fade-in delay-200">
                    <h3 className="heading-md">My <span className="text-gradient">Tech Stack</span></h3>

                    <div className="skills-grid">
                        {skillCategories.map((category, index) => (
                            <div key={index} className="skill-card glass-card">
                                <div className="skill-header">
                                    {category.icon}
                                    <h4>{category.title}</h4>
                                </div>
                                <div className="skill-list">
                                    {category.skills.map((skill, idx) => (
                                        <div key={idx} className="skill-item">
                                            <span className="skill-name">{skill.name}</span>
                                            <div className="skill-bar-bg">
                                                <div
                                                    className="skill-bar-fill"
                                                    style={{
                                                        width: skill.level === 'Expert' ? '95%' :
                                                            skill.level === 'Advanced' ? '85%' :
                                                                skill.level === 'Intermediate' ? '70%' : '50%'
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style>{`
        .about-header {
          margin-bottom: 5rem;
        }

        .bio-content {
          padding: 2.5rem;
          line-height: 1.8;
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .bio-text {
          margin-bottom: 1.5rem;
        }
        
        .bio-text:last-child {
          margin-bottom: 0;
        }

        .highlight {
          color: var(--accent-color);
          font-weight: 600;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skill-card {
          padding: 2rem;
        }

        .skill-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .category-icon {
          color: var(--primary-color);
          width: 32px;
          height: 32px;
        }

        .skill-header h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }

        .skill-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .skill-item {
          width: 100%;
        }

        .skill-name {
          display: block;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .skill-bar-bg {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
          border-radius: 10px;
          transition: width 1s ease-out;
        }
        
        .skill-card:hover .skill-bar-fill {
           filter: brightness(1.2);
        }
      `}</style>
        </section>
    );
};

export default About;
