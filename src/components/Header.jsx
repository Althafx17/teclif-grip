import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav">
        <a href="#top" className="mark" aria-label="GRIP home">
          <img src="/images/navbar-icon.png" alt="GRIP" />
          <span className="word">GRIP<i className="dot"></i></span>
        </a>
        <nav className={`nav-links${menuOpen ? ' open' : ''}`} id="menu">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#why" onClick={closeMenu}>Why GRIP</a>
          <a href="#process" onClick={closeMenu}>How it works</a>
          <a href="#book" className="btn btn-amber nav-cta" onClick={closeMenu}>Book a visit</a>
        </nav>
        <button
          className={`burger${menuOpen ? ' x' : ''}`}
          id="burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
