import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Layers } from 'lucide-react';

const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <div
        className="tilt-glow"
        style={{
          opacity,
          background: `radial-gradient(circle at ${50 + (rotation.y * 5)}% ${50 + (rotation.x * -5)}%, rgba(255,255,255,0.1), transparent 50%)`
        }}
      />
      {children}
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError('Could not load projects. Please try again later.');
      setFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const setFallbackData = () => {
    setProjects([
      {
        id: 1,
        title: 'Project Alpha',
        description: 'A cutting-edge dashboard built with React and D3.js for visualizing complex datasets in real-time.',
        tech_stack: ['React', 'D3.js', 'Node.js'],
        github_url: '#',
        live_url: '#',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 2,
        title: 'Neon E-Commerce',
        description: 'Full-stack e-commerce platform with stripe integration and neon aesthetics using 3D elements.',
        tech_stack: ['Next.js', 'Three.js', 'Stripe'],
        github_url: '#',
        live_url: '#',
        image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 3,
        title: 'AI Chat Interface',
        description: 'Responsive chat interface connecting to LLMs with streaming responses and markdown support.',
        tech_stack: ['TypeScript', 'OpenAI', 'Tailwind'],
        github_url: '#',
        live_url: '#',
        image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'
      }
    ]);
  };

  if (!loading && projects.length === 0 && !error) {
    setFallbackData();
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <h2 className="section-title">Projects</h2>
            <div className="title-line"></div>
          </div>
          <p className="section-description animate-fade-in">
            A showcase of my recent work and technical expertise
          </p>
        </div>

        {loading ? (
          <div className="projects-grid">
            {[1, 2, 3].map(i => <div key={i} className="glass-card skeleton-card"></div>)}
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <TiltCard key={project.id} className="glass-card project-card">
                <article className="project-article">
                  <div className="card-image">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="220"
                      />
                    ) : (
                      <div className="placeholder-image">
                        <Layers size={48} />
                      </div>
                    )}
                    <div className="card-overlay">
                      <div className="links">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="icon-btn">
                            <Github size={20} />
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="icon-btn">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>

                    <div className="tech-stack">
                      {Array.isArray(project.tech_stack) ?
                        project.tech_stack.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        )) :
                        project.tech_stack?.split(',').map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))
                      }
                    </div>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .section {
          padding-top: 100px;
        }

        .section-header {
          margin-bottom: 3rem;
        }

        .section-title-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
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

        .section-description {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 600px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.75rem;
          perspective: 2000px;
        }

        .tilt-card-container {
            transition: transform 0.1s ease-out;
            transform-style: preserve-3d;
            will-change: transform;
            position: relative;
            padding: 0 !important; /* Override glass-card padding */
        }
        
        .tilt-glow {
            position: absolute;
            inset: 0;
            border-radius: var(--radius-md);
            z-index: 2;
            pointer-events: none;
        }

        .project-article {
            display: flex;
            flex-direction: column;
            height: 100%;
            border-radius: var(--radius-md);
            overflow: hidden;
            background: rgba(255, 255, 255, 0.02);
        }

        .project-card {
          padding: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid var(--glass-border); /* Move border to container */
        }

        .card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #1a1a1f;
          transform: translateZ(20px);
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .tilt-card-container:hover .card-image img {
          transform: scale(1.08);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tilt-card-container:hover .card-overlay {
          opacity: 1;
        }

        .links {
          display: flex;
          gap: 1rem;
          transform: translateY(20px) translateZ(50px); /* 3D Pop */
          transition: transform 0.3s ease;
        }

        .tilt-card-container:hover .links {
          transform: translateY(0) translateZ(50px);
        }

        .icon-btn {
          background: white;
          color: black;
          padding: 0.65rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .icon-btn:hover {
          transform: scale(1.15);
          background: var(--primary-color);
          color: white;
        }

        .card-content {
          padding: 1.25rem 1.5rem 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          transform: translateZ(30px);
          background: transparent;
        }

        .project-title {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 0.625rem;
          color: white;
          line-height: 1.3;
        }

        .project-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.25rem;
          line-height: 1.6;
        }

        .tech-stack {
          margin-top: auto;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          font-size: 0.7rem;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          background: rgba(109, 40, 217, 0.1);
          color: var(--primary-color);
          border: 1px solid rgba(109, 40, 217, 0.2);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          background: rgba(109, 40, 217, 0.15);
          transform: translateY(-2px);
        }

        .skeleton-card {
          height: 400px;
          animation: pulse 2s infinite;
        }
        
        .placeholder-image {
           width: 100%;
           height: 100%;
           display: flex;
           align-items: center;
           justify-content: center;
           color: var(--text-secondary);
        }

        @keyframes pulse {
          0% { background-color: rgba(255,255,255,0.02); }
          50% { background-color: rgba(255,255,255,0.05); }
          100% { background-color: rgba(255,255,255,0.02); }
        }

        @media (max-width: 768px) {
          .section {
            padding-top: 80px;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .section-header {
            margin-bottom: 2rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .card-image {
            height: 180px;
          }

          .card-content {
            padding: 1rem 1.25rem 1.25rem;
          }

          .project-title {
            font-size: 1.15rem;
          }

          .project-desc {
            font-size: 0.85rem;
            margin-bottom: 1rem;
          }

          .project-article {
            background: rgba(0, 0, 0, 0.2);
          }

          .tech-tag {
            background: rgba(255, 255, 255, 0.03);
            color: var(--text-secondary);
            border-color: var(--glass-border);
            font-size: 0.65rem;
            padding: 0.25rem 0.65rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
