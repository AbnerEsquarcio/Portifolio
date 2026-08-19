import { useState, useEffect, useMemo } from 'react';
import { projects } from '../data';
import '../styles/Projects.css';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [viewMode, setViewMode] = useState('grid');
  const [animKey, setAnimKey] = useState(0);

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ['Todos', ...tags];
  }, []);

  const filtered = activeFilter === 'Todos'
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

  function handleFilter(tag) {
    setActiveFilter(tag);
    setAnimKey((k) => k + 1);
  }

  function handleView(mode) {
    setViewMode(mode);
    setAnimKey((k) => k + 1);
  }

  return (
    <section id="projetos" className="projects-section">
      <div className="main-content">
        <h1 className="projects-title">Projetos <span className="dot">.</span></h1>
        <p className="projects-description">
          Explore meus projetos que demonstram minhas habilidades em desenvolvimento web.
          Cada projeto reflete minha paixão por código e criatividade.
        </p>

        <div className="tech-filters">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`filter${activeFilter === tag ? ' active' : ''}`}
              onClick={() => handleFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="container">
          <div className={`view-toggle${viewMode === 'list' ? ' active-list' : ''}`}>
            <div className="toggle-slider" />
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => handleView('grid')}
              aria-label="Visualização em grade"
            >
              <img src="https://img.icons8.com/?size=100&id=GhW7E6TRTWHw&format=png&color=FFFFFF" alt="Grade" width="16" height="16" />
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => handleView('list')}
              aria-label="Visualização em lista"
            >
              <img src="https://img.icons8.com/?size=100&id=CiWGW32TM9pM&format=png&color=FFFFFF" alt="Lista" width="16" height="16" />
            </button>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'projects-grid' : 'projects-list'} key={animKey}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`project-card${show ? ' show' : ''}`}>
      <img src={project.image} alt={project.name} className="project-thumb" />
      <div className="project-content">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-buttons">
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-demo">🔗 Live Demo</a>
          <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn btn-code">💻 View Code</a>
        </div>
      </div>
    </div>
  );
}
