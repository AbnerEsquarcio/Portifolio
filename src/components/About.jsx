import { skills } from '../data';
import '../styles/About.css';

export default function About() {
  return (
    <div className="about-me-content border-content">
      <h1 className="about-title">Sobre mim <span className="dot">.</span></h1>

      <div className="about-grid">
        <div className="about-left">
          <img src="/Portifolio/img/profile.png" alt="Foto de Abner Esquarcio" className="profile-image" />
          <a href="/files/Abner Esquarcio - Curriculo.pdf" className="btn-download" download>
            Meu Curriculum
          </a>
        </div>

        <div className="about-right">
          <p className="intro">Olá, eu sou Abner Esquarcio 👋</p>
          <p className="description">
            Desenvolvedor Full Stack Júnior com experiência no desenvolvimento de aplicações web e soluções
            corporativas. Atuo com React, TypeScript, Python, FastAPI e PostgreSQL, criando sistemas, relatórios e
            integrações voltadas ao suporte da operação e tomada de decisão.
          </p>

          <h5>Tecnologias e Ferramentas que Uso</h5>
          <div className="tech-grid">
            <SkillBlock title="Front-end" items={skills.frontend} />
            <SkillBlock title="Back-end" items={skills.backend} />
            <SkillBlock title="Ferramentas" items={skills.tools} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillBlock({ title, items }) {
  return (
    <div className="tech-block">
      <h3 className="stack-title">{title}</h3>
      <div className="stack-icons">
        {items.map((skill) => (
          <span className="badge" key={skill.name}>
            <i className={skill.icon} /> {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
