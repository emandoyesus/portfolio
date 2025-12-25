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
      const response = await fetch('http://localhost:5000/api/projects');
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
        <h2 className="heading-md">
          Featured <span className="text-gradient">Projects</span>
        </h2>

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
                      <img src={project.image_url} alt={project.title} />
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
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
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
            background: rgba(255, 255, 255, 0.03); /* Moved background here */
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
          height: 220px;
          overflow: hidden;
          background: #2a2a30;
          transform: translateZ(20px); /* 3D Depth */
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .tilt-card-container:hover .card-image img {
          transform: scale(1.1);
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
          padding: 0.75rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .icon-btn:hover {
          transform: scale(1.1);
          background: var(--accent-color);
        }

        .card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          transform: translateZ(30px); /* 3D Depth */
          background: transparent;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: white;
        }

        .project-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .tech-stack {
          margin-top: auto;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--accent-color);
          border: 1px solid rgba(255, 255, 255, 0.1);
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
      `}</style>
    </section>
  );
};

export default Projects;
