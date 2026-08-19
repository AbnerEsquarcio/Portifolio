import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Toast from './components/Toast';
import { experiences, education } from './data';
import { initSectionTransitions } from './utils/scrollToSection';

export default function App() {
  useEffect(() => {
    initSectionTransitions();

    const page = document.getElementById('page');
    if (!page) return;

    const preventScroll = (event) => event.preventDefault();
    const preventKeyScroll = (event) => {
      const blockedKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    page.addEventListener('wheel', preventScroll, { passive: false });
    page.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll);

    return () => {
      page.removeEventListener('wheel', preventScroll);
      page.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div id="page">
        <section id="home" className="section section-home section-active">
          <div className="section-panel">
            <Home />
          </div>
        </section>

        <section id="sobre-mim" className="section section-about">
          <div className="section-panel section-inner main-about">
            <About />
            <div className="timeline-wrapper">
              <Timeline title="Experiência" items={experiences} />
              <Timeline title="Formação" items={education} />
            </div>
          </div>
        </section>

        <section id="projetos" className="section section-projects">
          <div className="section-panel">
            <Projects />
          </div>
        </section>

        <section id="contatos" className="section section-contact">
          <div className="section-panel">
            <Contact />
          </div>
        </section>
      </div>

      <Toast />
    </>
  );
}
