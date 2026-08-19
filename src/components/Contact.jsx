import { useRef, useCallback } from 'react';
import { socialLinks } from '../data';
import '../styles/Contact.css';

export default function Contact() {
  const overlayRef = useRef(null);

  const handlePointerMove = useCallback((e) => {
    const wrapper = e.currentTarget;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const r = wrapper.getBoundingClientRect();
    overlay.style.cssText = `--opacity:1; --x:${e.clientX - r.left}px; --y:${e.clientY - r.top}px;`;
  }, []);

  const handlePointerLeave = useCallback(() => {
    const overlay = overlayRef.current;
    if (overlay) overlay.style.cssText = '--opacity:0;';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Mensagem enviada com sucesso! 🚀', success: true } }));
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.errors
          ? errorData.errors.map((err) => err.message).join(', ')
          : 'Erro ao enviar. Tente novamente.';
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: errorMsg, success: false } }));
      }
    } catch {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Erro na conexão. Tente novamente.', success: false } }));
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="intro-contact">
          <h1>Entre em contato <span className="dot">.</span></h1>
          <p>Tem um projeto em mente ou quer apenas dizer olá? Eu adoraria ouvir você.<br />Vamos criar algo incrível juntos!</p>
        </div>

        <div className="contact-content">
          <div className="form-wrapper" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
            <form className="contact-form" action="https://formspree.io/f/mdkloojo" method="POST" onSubmit={handleSubmit}>
              <h2><span className="bar" /> Diga Olá 👋</h2>
              <p>Sinta-se à vontade para entrar em contato via formulário abaixo</p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input type="text" id="name" name="name" placeholder="Seu nome" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Seu e-mail" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <input type="text" id="subject" name="subject" placeholder="Assunto da sua mensagem" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea id="message" name="message" placeholder="Como posso ajudar?" required />
              </div>

              <input type="text" name="_gotcha" style={{ display: 'none' }} />
              <button className="submit-button" type="submit">⌯⌲ Enviar Mensagem</button>
            </form>
            <div className="overlay" ref={overlayRef} />
          </div>

          <div className="connect">
            <h2><span className="bar" /> Vamos nos conectar</h2>
            <p>Você também pode me encontrar em</p>

            <div className="social-icons">
              <a href={socialLinks.github} aria-label="GitHub" className="icon github" target="_blank" rel="noopener noreferrer" />
              <a href={socialLinks.linkedin} aria-label="LinkedIn" className="icon linkedin" target="_blank" rel="noopener noreferrer" />
              <a href={socialLinks.instagram} aria-label="Instagram" className="icon instagram" target="_blank" rel="noopener noreferrer" />
            </div>

            <p className="contact-direct-label">Ou entre em contato comigo diretamente em:</p>
            <div className="email-contact">
              <span className="email-icon">✉︎</span>
              <a href={`mailto:${socialLinks.email}`}>{socialLinks.email}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
