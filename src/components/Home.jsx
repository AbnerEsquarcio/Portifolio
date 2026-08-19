import { useEffect, useRef } from 'react';
import { handleSectionClick } from '../utils/scrollToSection';
import '../styles/Home.css';

const introText = "Olá, eu sou o Abner 👋";

const animatedLines = [
  [
    { text: 'desenvolvedor', className: 'intro-style' },
    { text: 'web,', className: 'intro-style' },
  ],
  [
    { text: 'apaixonado', className: '' },
    { text: 'por', className: '' },
  ],
  [
    { text: 'transformar', className: '' },
    { text: 'código', className: '' },
    { text: 'em', className: '' },
  ],
  [
    { text: 'experiências', className: '' },
    { text: 'Online.', className: 'underline' },
  ],
];

export default function Home() {
  const introRef = useRef(null);
  const animatedRef = useRef(null);
  const btnGroupRef = useRef(null);
  const delayStep = 200;

  useEffect(() => {
    startAnimation();
  }, []);

  function startAnimation() {
    const introContainer = introRef.current;
    const animatedContainer = animatedRef.current;
    const btnGroup = btnGroupRef.current;
    if (!introContainer || !animatedContainer || !btnGroup) return;

    introContainer.innerHTML = '';
    animatedContainer.innerHTML = '';

    const createWordSpan = (word, className = '') => {
      const span = document.createElement('span');
      span.textContent = word;
      if (className) span.classList.add(className);
      span.classList.add('fade-word');
      return span;
    };

    introText.split(' ').forEach((word, index, arr) => {
      const span = createWordSpan(word);
      introContainer.appendChild(span);
      if (index < arr.length - 1) introContainer.appendChild(document.createTextNode(' '));
    });

    animatedLines.forEach((lineWords) => {
      const line = document.createElement('div');
      line.classList.add('animated-line');
      lineWords.forEach(({ text, className }, index) => {
        const span = createWordSpan(text, className);
        line.appendChild(span);
        if (index < lineWords.length - 1) line.appendChild(document.createTextNode(' '));
      });
      animatedContainer.appendChild(line);
    });

    const buttons = btnGroup.querySelectorAll('a.fancy-button');
    let currentDelay = animatedLines.flat().length + introText.split(' ').length;

    buttons.forEach((button) => {
      const text = button.textContent.trim();
      const icon = button.querySelector('.hover-img');
      button.textContent = '';

      const words = text.split(' ');
      const spans = [];

      words.forEach((word, index) => {
        const span = createWordSpan(word);
        button.appendChild(span);
        spans.push(span);
        if (index < words.length - 1) button.appendChild(document.createTextNode(' '));
      });

      if (icon) button.appendChild(icon);

      spans.forEach((span, i) => {
        setTimeout(() => span.classList.add('fade-in'), delayStep * (currentDelay + i));
      });

      const totalDelay = delayStep * (currentDelay + spans.length);
      setTimeout(() => button.classList.add('underline-in'), totalDelay);

      currentDelay += spans.length;
    });

    const allWords = document.querySelectorAll('.fade-word');
    allWords.forEach((word, i) => {
      setTimeout(() => word.classList.add('fade-in'), delayStep * i);
    });
  }

  return (
    <div className="home-content main-content border-content">
      <div className="home-img">
        <img src="/Portifolio/img/profile.png" alt="Foto de Abner Esquarcio" />
      </div>
      <div className="home-text">
        <div ref={introRef} id="intro" />
        <div ref={animatedRef} id="animated-text" />
      </div>
      <section className="home-btn">
        <div className="btn-group" ref={btnGroupRef}>
          <a className="fancy-button" href="#sobre-mim" onClick={(event) => handleSectionClick(event, '#sobre-mim')}>
            Mais sobre mim <span className="hover-img btn1" />
          </a>
          <a className="fancy-button" href="#projetos" onClick={(event) => handleSectionClick(event, '#projetos')}>
            Meus Projetos <span className="hover-img btn2" />
          </a>
          <a className="fancy-button" href="#contatos" onClick={(event) => handleSectionClick(event, '#contatos')}>
            Vamos Conversar! <span className="hover-img btn3" />
          </a>
        </div>
      </section>
    </div>
  );
}
