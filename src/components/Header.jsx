import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll detection for sticky header background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open & handle Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);

    // Unlock body scroll immediately so the document can scroll smoothly
    document.body.style.overflow = '';
    document.body.style.touchAction = '';

    setTimeout(() => {
      if (hash === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  return (
    <>
      <header id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="wrap nav">
          <a href="#top" className="mark" aria-label="GRIP home" onClick={(e) => handleNavClick(e, '#top')}>
            <img src="/images/navbar-icon.png" alt="GRIP" />
            <span className="word">GRIP<i className="dot"></i></span>
          </a>
          
          <nav
            className={`nav-links${menuOpen ? ' open' : ''}`}
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a>
            <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a>
            <a href="#why" onClick={(e) => handleNavClick(e, '#why')}>Why GRIP</a>
            <a href="#process" onClick={(e) => handleNavClick(e, '#process')}>How it works</a>
            <a href="#book" className="btn btn-amber nav-cta" onClick={(e) => handleNavClick(e, '#book')}>Book a visit</a>
          </nav>

          <button
            className={`burger${menuOpen ? ' x' : ''}`}
            id="burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`nav-backdrop${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}
