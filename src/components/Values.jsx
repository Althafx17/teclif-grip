import useScrollReveal from '../hooks/useScrollReveal';

const values = [
  { letter: 'Q', title: 'Quality', desc: 'Genuine parts, certified oils and technicians who treat every vehicle like their own. No shortcuts, no surprises.' },
  { letter: 'T', title: 'Trust', desc: 'Clear estimates, honest advice and a written record of everything we touch. You approve before we begin.' },
  { letter: 'C', title: 'Convenience', desc: "Everything in one visit, one location, one bill — plus a lounge that makes the time fly. That's the GRIP." },
];

export default function Values() {
  const ref = useScrollReveal();

  return (
    <section className="band" id="why" ref={ref}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">Why GRIP</p>
          <h2>Three words we<br/>actually mean.</h2>
        </div>
        <div className="values">
          {values.map((v, i) => (
            <div className="value reveal" data-d={i > 0 ? String(i) : undefined} key={v.letter}>
              <span className="k">{v.letter}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
