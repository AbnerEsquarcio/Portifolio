import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Toast from './components/Toast';
import { experiences, education } from './data';

export default function App() {
  return (
    <>
      <Navbar />
      <section id="home" className="section home">
        <Home />
      </section>

      <main className="main-about">
        <section id="sobre-mim">
          <About />
          <section id="experiencia-formacao" className="fade-section">
            <div className="timeline-wrapper">
              <Timeline title="Experiência" items={experiences} />
              <Timeline title="Formação" items={education} />
            </div>
          </section>
        </section>

        <div className="menu-spacing" />

        <Projects />

        <div className="menu-spacing" />

        <Contact />
      </main>

      <Toast />
    </>
  );
}
