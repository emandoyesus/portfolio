import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import CertificatesPage from './pages/CertificatesPage';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition variant="fadeUp">
                <HomePage />
              </PageTransition>
            } />
            <Route path="/about" element={
              <PageTransition variant="slideRight">
                <AboutPage />
              </PageTransition>
            } />
            <Route path="/projects" element={
              <PageTransition variant="scaleUp">
                <ProjectsPage />
              </PageTransition>
            } />
            <Route path="/certificates" element={
              <PageTransition variant="slideRight">
                <CertificatesPage />
              </PageTransition>
            } />
            <Route path="/contact" element={
              <PageTransition variant="flip">
                <ContactPage />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
