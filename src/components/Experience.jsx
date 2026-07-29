import useScrollReveal from '../hooks/useScrollReveal';

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <section className="roof band" id="experience" ref={ref}>
      <div className="wrap">
        <div className="reveal">
          <p className="eyebrow">The GRIP difference</p>
          <h2>Not a garage.<br/>An experience.</h2>
          <p>Most workshops make you choose between quality and convenience. GRIP was built to remove that trade-off — a next-generation care center where advanced vehicle services and a modern customer experience live under the same roof.</p>
          <p>You see the work, you understand the cost, and you actually enjoy the wait.</p>
          <ul className="checks">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
              <span>Transparent pricing — approved before any work begins</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
              <span>Trained technicians and genuine parts, every time</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5"/></svg>
              <span>Live status updates while you relax in the lounge</span>
            </li>
          </ul>
        </div>

        <div className="roof-visual reveal" data-d="2" aria-hidden="true">
          <span className="cap">Under one roof</span>
          <div className="g-lg">
            <img src="/images/logo-uploaded.png" alt="GRIP Logo" loading="lazy" style={{ height: '24.2rem', width: 'auto' }} />
          </div>
          <div className="cut"></div>
        </div>
      </div>
    </section>
  );
}
