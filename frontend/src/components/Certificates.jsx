import React from 'react';
import { ExternalLink, Award, Calendar } from 'lucide-react';

const Certificates = () => {
    const certifications = [
        {
            title: "Programming Fundamentals",
            issuer: "Udacity",
            date: "Dec 2025",
            link: "https://www.udacity.com/certificate/e/3c56be12-dca0-11f0-9964-1b6de304da39",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
            tags: ["HTML", "CSS", "JS", "UI/UX"]
        },
        {
            title: "Full-Stack Web Development",
            issuer: "FreeCodeCamp",
            date: "soon",
            link: "#",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
            tags: ["MERN", "Security"]
        },
        {
            title: "Data Analysis",
            issuer: "Udacity",
            date: "soon",
            link: "#",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000",
            tags: ["Data Structures", "Logic"]
        }
    ];

    return (
        <section id="certificates" className="section certificates-section">
            <div className="container">
                <div className="section-header animate-fade-in">
                    <div className="section-title-wrapper">
                        <h2 className="section-title">Certifications</h2>
                        <div className="title-line"></div>
                    </div>
                    <p className="section-description">
                        Validating my skills and expertise through industry-recognized certifications and continuous learning.
                    </p>
                </div>

                <div className="certificates-grid">
                    {certifications.map((cert, index) => (
                        <div key={index} className="cert-card glass-card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="cert-image">
                                <img src={cert.image} alt={cert.title} />
                                <div className="cert-overlay">
                                    <Award className="cert-award-icon" />
                                </div>
                            </div>

                            <div className="cert-content">
                                <div className="cert-main">
                                    <h3 className="cert-title">{cert.title}</h3>
                                    <p className="cert-issuer">{cert.issuer}</p>
                                </div>

                                <div className="cert-meta">
                                    <span className="cert-date">
                                        <Calendar size={14} /> {cert.date}
                                    </span>
                                    <div className="cert-tags">
                                        {cert.tags.map(tag => (
                                            <span key={tag} className="cert-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                                    View Certificate <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .certificates-section {
          padding-top: 100px;
        }

        .section-description {
          color: var(--text-secondary);
          margin-bottom: 3rem;
          font-size: 1.1rem;
          max-width: 600px;
        }

        .section-title-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: white;
          white-space: nowrap;
        }

        .title-line {
          height: 3px;
          background: var(--primary-color);
          width: 80px;
          border-radius: 4px;
        }

        .certificates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .cert-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
        }

        .cert-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary-color);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 10px 40px -10px rgba(109, 40, 217, 0.3);
        }

        .cert-image {
          position: relative;
          height: 180px;
          width: 100%;
          overflow: hidden;
        }

        .cert-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .cert-card:hover .cert-image img {
          transform: scale(1.1);
        }

        .cert-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          opacity: 0.8;
        }

        .cert-award-icon {
          color: var(--primary-color);
          width: 32px;
          height: 32px;
          background: rgba(0, 0, 0, 0.5);
          padding: 6px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }

        .cert-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 1.5rem;
        }

        .cert-main {
          flex-grow: 1;
        }

        .cert-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .cert-issuer {
          color: var(--primary-color);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .cert-meta {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cert-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .cert-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .cert-tag {
          font-size: 0.75rem;
          padding: 0.2rem 0.6rem;
          background: rgba(109, 40, 217, 0.1);
          color: var(--primary-color);
          border: 1px solid rgba(109, 40, 217, 0.2);
          border-radius: 4px;
          font-weight: 600;
        }

        .cert-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem;
          background: var(--primary-color);
          color: white;
          border-radius: var(--radius-sm);
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
          margin-top: auto;
        }

        .cert-link:hover {
          filter: brightness(1.1);
          gap: 0.8rem;
        }

        @media (max-width: 768px) {
          .certificates-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </section>
    );
};

export default Certificates;
