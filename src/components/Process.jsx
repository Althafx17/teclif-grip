import useScrollReveal from '../hooks/useScrollReveal';

const steps = [
  { num: '01', title: 'Book', image: '/images/svc-car-care.jpg', desc: 'Pick a service and a time online or over the phone in under a minute.', hasArrow: true },
  { num: '02', title: 'Drop', image: '/images/svc-oil-change.jpg', desc: 'Hand over the keys. We inspect, confirm the plan and get your approval.', hasArrow: true },
  { num: '03', title: 'Relax', image: '/images/svc-lounge.jpg', desc: 'Settle into the lounge with coffee and Wi-Fi while we work — and update you live.', hasArrow: true },
  { num: '04', title: 'Drive', image: '/images/svc-tyres.jpg', desc: "Collect a car that's serviced, cleaned and ready. Grip the wheel, go.", hasArrow: false },
];

export default function Process() {
  const ref = useScrollReveal();

  return (
    <section className="band" id="process" style={{ background: 'var(--ink-3)' }} ref={ref}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">How it works</p>
          <h2>Four steps.<br/>Zero hassle.</h2>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div
              className="step reveal"
              data-d={i > 0 ? String(i) : undefined}
              key={s.num}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const rotateX = (e.clientY - rect.top - rect.height / 2) / 10;
                const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 10;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                e.currentTarget.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(255, 192, 0, 0.25)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="step-img-bg" style={{ backgroundImage: `url(${s.image})` }}></div>
              <div className="step-content">
                <div className="n">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {s.hasArrow && (
                <div className="arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
