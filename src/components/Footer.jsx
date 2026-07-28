export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="#top" className="mark-img" aria-label="GRIP">
              <img src="/images/logo-uploaded.png" alt="GRIP Logo" style={{ height: '8.2rem', width: 'auto' }} />
            </a>
            <p>A next-generation automotive care center. Quality, trust and convenience for every vehicle owner — under one roof.</p>
          </div>
          <div className="foot-col">
            <h4>Services</h4>
            <a href="#services">Tyres</a>
            <a href="#services">Car Care</a>
            <a href="#services">Car Wash</a>
            <a href="#services">Oil Change</a>
            <a href="#services">Detailing</a>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <a href="#experience">Experience</a>
            <a href="#why">Why GRIP</a>
            <a href="#process">How it works</a>
            <a href="#book">Book a visit</a>
          </div>
          <div className="foot-col">
            <h4>Visit</h4>
            <span>Kozhikode, Kerala</span>
            <span>+91 98765 43210</span>
            <span>hello@grip.com</span>
            <span>Mon–Sun · 8AM–9PM</span>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 GRIP Automotive Experience Center. All rights reserved.</span>
          <span className="tag">Quality. Trust. Convenience. <b>That's the GRIP.</b></span>
        </div>
      </div>
    </footer>
  );
}
