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
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    fetchProjects();
  }, [page]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p =>
        p.category?.toLowerCase() === activeFilter.toLowerCase() ||
        p.tech_stack?.some(t => t.toLowerCase() === activeFilter.toLowerCase())
      ));
    }
  }, [activeFilter, projects]);

  const fetchProjects = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/projects?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const json = await response.json();
      const list = json.data || json;
      const returnedMeta = json.meta || {};
      setProjects(list);
      setMeta(returnedMeta);
    } catch (err) {
      console.error(err);
      setError('Could not load projects. Please try again later.');
      setFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const setFallbackData = () => {
    const data = [
      {
        id: 1,
        title: 'Movie Explore',
        description: 'A responsive web app that lets users search and explore movies with details like ratings, genres, and trailers.',
        tech_stack: ['React', 'TMDB API', 'TailwindCSS', 'JavaScript'],
        github_url: '#',
        live_url: '#',
        image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000',
        category: 'Web',
        featured: true
      },
      {
        id: 2,
        title: 'E-Commerce Website',
        description: 'A comprehensive E-Commerce website built with NextJS and TailwindCSS. Includes Payment Integration with stripe.',
        tech_stack: ['Next.js', 'TailwindCSS', 'Stripe', 'Zustand'],
        github_url: '#',
        live_url: '#',
        image_url: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000',
        category: 'Web',
        featured: true
      },
      {
        id: 3,
        title: 'AI Portfolio Website',
        description: 'A modern, responsive portfolio website built with React and Framer Motion. Features smooth animations and clean design.',
        tech_stack: ['React', 'Framer Motion', 'CSS3', 'JavaScript'],
        github_url: '#',
        live_url: '#',
        image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
        category: 'Web',
        featured: false
      }
    ];
    setProjects(data);
    setMeta({ page: 1, limit, total: 3, totalPages: 1 });
  };

  const categories = ['All', 'Web', 'Mobile', 'UI/UX'];

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <h2 className="section-title">Projects</h2>
            <div className="title-line"></div>
          </div>

          <div className="filter-bar animate-fade-in">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'All' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="projects-grid">
            {[1, 2, 3].map(i => <div key={i} className="glass-card skeleton-card"></div>)}
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <TiltCard key={project.id} className="project-card-outer">
                <article className="project-article glass-card">
                  <div className="card-image">
                    {project.featured && <span className="featured-badge">Featured</span>}
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="placeholder-image">
                        <Layers size={48} />
                      </div>
                    )}
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

                    <div className="project-actions">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="action-btn github">
                          <Github size={18} />
                          Code
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="action-btn demo">
                          <ExternalLink size={18} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>
        )}

        {!loading && meta && meta.totalPages > 1 && activeFilter === 'All' && (
          <div className="pagination">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="btn btn-glass">
              Prev
            </button>
            <div className="page-info">
              Page {meta.page || page} of {meta.totalPages}
            </div>
            <button onClick={() => setPage(p => Math.min(meta.totalPages || 1, p + 1))} disabled={page >= (meta.totalPages || 1)} className="btn btn-glass">
              Next
            </button>
          </div>
        )}
      </div>

      <style>{`
        .section {
          padding-top: 100px;
        }

        .section-header {
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .section-title-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .section-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: white;
          white-space: nowrap;
        }

        .title-line {
          height: 3px;
          background: linear-gradient(to right, #00ff88, transparent);
          flex: 1;
          max-width: 150px;
          border-radius: 2px;
        }

        /* Filter Bar */
        .filter-bar {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .filter-btn.active {
          background: #00ff88;
          color: #030305;
          border-color: #00ff88;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          perspective: 2000px;
        }

        .project-card-outer {
            transition: transform 0.1s ease-out;
            transform-style: preserve-3d;
            will-change: transform;
            position: relative;
        }

        .project-article {
            display: flex;
            flex-direction: column;
            height: 100%;
            border-radius: 16px;
            overflow: hidden;
            background: rgba(18, 18, 23, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
            padding: 0;
        }

        .project-card-outer:hover .project-article {
            border-color: rgba(0, 255, 136, 0.3);
            box-shadow: 0 0 30px rgba(0, 255, 136, 0.1);
        }

        .card-image {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #1a1a1f;
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #00ff88;
          color: #030305;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 800;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card-outer:hover .card-image img {
          transform: scale(1.1);
        }

        .card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #00ff88;
          line-height: 1.2;
        }

        .project-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tech-stack {
          margin-top: auto;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tech-tag {
          font-size: 0.75rem;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-weight: 500;
        }

        /* Project Actions */
        .project-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.7rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .action-btn.github {
          background: rgba(255, 255, 255, 0.03);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .action-btn.demo {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.2);
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .action-btn.github:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .action-btn.demo:hover {
          background: #00ff88;
          color: #030305;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-top: 3rem;
        }

        .page-info {
          color: var(--text-secondary);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.8rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .filter-bar {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
