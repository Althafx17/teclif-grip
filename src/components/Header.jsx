import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const isNavigatingRef = useRef(false);

  // Scroll detection for sticky header background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock / unlock body scroll & handle Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      // Store current scroll position before locking
      scrollPositionRef.current = window.scrollY;
      isNavigatingRef.current = false;
      
      // Lock body scroll (iOS Safari & cross-browser compliant)
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      window.addEventListener('keydown', handleKeyDown);
    } else {
      // Restore scroll position ONLY if closing without clicking a nav link
      const savedScrollPos = scrollPositionRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      if (!isNavigatingRef.current && savedScrollPos > 0) {
        window.scrollTo(0, savedScrollPos);
      }

      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => {
    isNavigatingRef.current = false;
    setMenuOpen(false);
  };

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    isNavigatingRef.current = true;
    setMenuOpen(false);

    // Release body scroll immediately so browser can scroll
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';

    setTimeout(() => {
      if (hash === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 60);
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
