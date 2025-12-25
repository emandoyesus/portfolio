import React from 'react';
import { Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const Contact = () => {
  const [status, setStatus] = React.useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('Connecting to API at:', apiUrl);
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6d28d9', '#00d4ff', '#ffffff'] // Matching your theme
        });
        e.target.reset();
        setTimeout(() => setStatus('idle'), 3000); // Reset status after 3 seconds
      } else {
        setStatus('error');
        const errorMessage = data.details ? `${data.error}: ${data.details}` : (data.error || 'Failed to send message');
        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      alert(`Network error: ${error.message}. Please check the console (F12) for details.`);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-wrapper glass-card">
          <div className="contact-info">
            <h2 className="heading-md">Let's <span className="text-gradient">Connect</span></h2>
            <p className="contact-text">
              Have a project in mind? Want to discuss the latest tech?
              I'm always open to new opportunities and interesting conversations.
            </p>

            <div className="info-items">
              <div className="info-item">
                <span className="label">Location</span>
                <span className="value">Mekelle, Ethiopia</span>
              </div>
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">emmandoyesus@gmail.com</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-input" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" placeholder="john@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" className="form-input" rows="5" placeholder="Your message..." required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'} <Send size={18} />
            </button>
          </form>
        </div>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Portfolio. Built with React & Vite.</p>
        </footer>
      </div>

      <style>{`
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
          padding: 4rem;
          background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
        }

        .contact-text {
          color: var(--text-secondary);
          margin-bottom: 3rem;
          font-size: 1.1rem;
        }

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .label {
          color: var(--accent-color);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .value {
          font-size: 1.1rem;
          font-weight: 500;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .form-input {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          padding: 1rem;
          border-radius: var(--radius-sm);
          color: white;
          font-family: inherit;
          transition: all 0.3s;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-color);
          background: rgba(0, 0, 0, 0.4);
        }

        .footer {
          margin-top: 6rem;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }

        @media (max-width: 768px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
            padding: 2rem;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
