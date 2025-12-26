import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <Code2 size={24} color="var(--accent-color)" />
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projects</Link>
          <Link to="/certificates" className={`nav-link ${isActive('/certificates')}`}>Certificates</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
          padding: 1rem 0;
          background: rgba(3, 3, 5, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--glass-border);
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: center; /* Center the group for a balanced look */
          gap: 2.5rem; /* Exactly the same gap between logo and links */
        }

        .nav-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .nav-logo:hover {
          transform: scale(1.1) rotate(10deg);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem; /* Matches the parent gap perfectly */
        }

        .nav-link {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-secondary);
          transition: color 0.3s ease;
          position: relative;
          white-space: nowrap;
        }

        .nav-link:hover, .nav-link.active {
          color: white;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-color);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .nav-content {
            gap: 1.2rem;
          }
          
          .nav-links {
            gap: 1.2rem;
          }

          .nav-link {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .nav-content {
            gap: 0.8rem;
            padding: 0 0.5rem;
          }
          
          .nav-links {
            gap: 0.8rem;
          }
          
          .nav-link {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
