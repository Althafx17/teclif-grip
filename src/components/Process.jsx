import useScrollReveal from '../hooks/useScrollReveal';

const steps = [
  { num: '01', title: 'Book', desc: 'Pick a service and a time online or over the phone in under a minute.', hasArrow: true },
  { num: '02', title: 'Drop', desc: 'Hand over the keys. We inspect, confirm the plan and get your approval.', hasArrow: true },
  { num: '03', title: 'Relax', desc: 'Settle into the lounge with coffee and Wi-Fi while we work — and update you live.', hasArrow: true },
  { num: '04', title: 'Drive', desc: "Collect a car that's serviced, cleaned and ready. Grip the wheel, go.", hasArrow: false },
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
            <div className="step reveal" data-d={i > 0 ? String(i) : undefined} key={s.num}>
              <div className="n">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
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
