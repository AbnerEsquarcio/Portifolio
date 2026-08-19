import { useRef, useCallback } from 'react';
import { navItems, socialLinks } from '../data';
import { handleSectionClick } from '../utils/scrollToSection';
import '../styles/Navbar.css';

export default function Navbar() {
  const dockRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const dock = dockRef.current;
    if (!dock) return;
    const rect = dock.getBoundingClientRect();
    const x = e.clientX - rect.left;

    Array.from(dock.children).forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2 - rect.left;
      const distance = Math.abs(x - itemCenter);
      const scale = Math.max(1, 1.8 - distance / 90);
      const lift = (scale - 1) * -18;
      item.style.transform = `scale(${scale}) translateY(${lift}px)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const dock = dockRef.current;
    if (!dock) return;
    Array.from(dock.children).forEach((item) => {
      item.style.transform = 'scale(1) translateY(0)';
    });
  }, []);

  const handleClick = (event, href) => handleSectionClick(event, href);

  return (
    <div
      className="nav-floating"
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          title={item.title}
          onClick={(e) => handleClick(e, item.href)}
        >
          <i className={item.icon} />
        </a>
      ))}
      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
        <i className="fab fa-linkedin" />
      </a>
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
        <i className="fab fa-instagram" />
      </a>
      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" title="GitHub">
        <i className="fab fa-github" />
      </a>
    </div>
  );
}
