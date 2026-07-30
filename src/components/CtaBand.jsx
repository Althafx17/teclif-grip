export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="ghost-tread"></div>
      <div className="rolling-tyre-container">
        <svg className="rolling-tyre" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="24" cy="24" r="19"/>
          <circle cx="24" cy="24" r="7"/>
          <path d="M24 5v9M24 34v9M5 24h9M34 24h9M11 11l6 6M31 31l6 6M37 11l-6 6M17 31l-6 6"/>
        </svg>
      </div>
      <div className="wrap">
        <h2>See it. Grip it. Drive it.</h2>
        <a href="#book" className="btn btn-dark">
          Book your visit
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </section>
  );
}
