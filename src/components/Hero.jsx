import useScrollReveal from '../hooks/useScrollReveal';

export default function Hero() {
  const ref = useScrollReveal();

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-bg">
        <div className="hero-media-loop">
          <img src="/images/hero-chatgpt-bg.png" alt="GRIP Hero Background" className="hero-bg-img" />
        </div>
        <div className="tread"></div>
      </div>
      <div className="slash"></div>
      <div className="wrap hero-inner">
        <p className="eyebrow reveal">Automotive Experience Center</p>
        <h1 className="reveal" data-d="1">
          <span className="k">GRIP</span><span className="bigdot"></span>
        </h1>
        <p className="hero-sub reveal" data-d="2">
          Tyres, car care, car wash, oil change and a genuine lounge —{' '}
          <b>every service your vehicle needs, under one roof.</b>{' '}
          Drop the keys, take a seat, drive out ready.
        </p>
        <div className="hero-actions reveal" data-d="3">
          <a href="#book" className="btn btn-amber">
            Book a visit
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a href="#services" className="btn btn-ghost">Explore services</a>
        </div>

        <div className="hero-stats reveal" data-d="4">
          <div className="stat"><div className="n">6</div><div className="l">Services · one roof</div></div>
          <div className="stat"><div className="n">45<span>min</span></div><div className="l">Express car wash</div></div>
          <div className="stat"><div className="n">100<span>%</span></div><div className="l">Genuine parts</div></div>
          <div className="stat"><div className="n">7</div><div className="l">Days a week</div></div>
        </div>
      </div>

      <div className="hero-tag" aria-hidden="true">Quality. Trust. Convenience.<b>That's the GRIP.</b></div>
      <div className="scroll-hint"><span className="bar"></span>Scroll</div>
    </section>
  );
}
