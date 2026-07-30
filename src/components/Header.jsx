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
          {/* Menu Button on Left */}
          <button
            className={`menu-btn${menuOpen ? ' open' : ''}`}
            id="menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <div className="burger-icon">
              <span></span><span></span><span></span>
            </div>
            <span className="menu-btn-label">MENU</span>
          </button>

          {/* Centered Logo */}
          <a href="#top" className="mark nav-logo-centered" aria-label="GRIP home" onClick={(e) => handleNavClick(e, '#top')}>
            <img src="/images/navbar-icon.png" alt="GRIP" />
            {/* <span className="word">GRIP<i className="dot"></i></span> */}
          </a>
          
          {/* Right-side CTA button */}
          <div className="nav-right-spacer">
            <a
              href="#book"
              className="btn btn-amber nav-cta header-cta"
              onClick={(e) => handleNavClick(e, '#book')}
            >
              Book a visit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>

          {/* Slide-in Menu Drawer on Left */}
          <nav
            className={`nav-drawer-left${menuOpen ? ' open' : ''}`}
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="drawer-header">
              <span className="drawer-title">NAVIGATION</span>
              <button className="drawer-close-btn" onClick={closeMenu} aria-label="Close menu">✕</button>
            </div>

            <div className="drawer-links">
              <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>
                <span className="n">01</span> Services
              </a>
              <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')}>
                <span className="n">02</span> Experience
              </a>
              <a href="#why" onClick={(e) => handleNavClick(e, '#why')}>
                <span className="n">03</span> Why GRIP
              </a>
              <a href="#process" onClick={(e) => handleNavClick(e, '#process')}>
                <span className="n">04</span> How it works
              </a>
            </div>

            <div className="drawer-footer">
              <a href="#book" className="btn btn-amber nav-cta" onClick={(e) => handleNavClick(e, '#book')}>
                Book a visit →
              </a>
            </div>
          </nav>
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
