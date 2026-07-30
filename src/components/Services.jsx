import useScrollReveal from '../hooks/useScrollReveal';

const services = [
  {
    num: '01',
    title: 'Tyres',
    image: '/images/svc-tyres.jpg',
    desc: 'Fitting, balancing, alignment and rotation across every major brand — pressure and tread checks on the house.',
    tags: ['Fitting', 'Alignment', 'Balancing'],
    icon: (
      <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="7"/><path d="M24 5v9M24 34v9M5 24h9M34 24h9M11 11l6 6M31 31l6 6M37 11l-6 6M17 31l-6 6"/></svg>
    ),
  },
  {
    num: '02',
    title: 'Car Care',
    image: '/images/svc-car-care.jpg',
    desc: 'Periodic service, diagnostics, brakes and fluids — logged, transparent and done right the first time.',
    tags: ['Service', 'Diagnostics', 'Brakes'],
    icon: (
      <svg viewBox="0 0 48 48"><path d="M8 30l3-9a5 5 0 0 1 4.7-3.4h16.6A5 5 0 0 1 37 21l3 9"/><path d="M6 30h36v6a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-2H13v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><circle cx="13" cy="30" r="1.6"/><circle cx="35" cy="30" r="1.6"/></svg>
    ),
  },
  {
    num: '03',
    title: 'Car Wash',
    image: '/images/svc-car-wash.jpg',
    desc: 'Foam, rinse and hand-finish in about 45 minutes. Express outside, or a full interior deep-clean inside.',
    tags: ['Express', 'Foam', 'Interior'],
    icon: (
      <svg viewBox="0 0 48 48"><path d="M9 34l2.5-7A4 4 0 0 1 15 24.5h18A4 4 0 0 1 36.5 27L39 34"/><path d="M7 34h34v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/><path d="M15 15v3M24 13v3M33 15v3M13 10v2M24 8v2M35 10v2"/></svg>
    ),
  },
  {
    num: '04',
    title: 'Oil Change',
    image: '/images/svc-oil-change.jpg',
    desc: 'Genuine oils and filters matched to your engine, with a full multi-point inspection before you leave.',
    tags: ['Genuine oil', 'Filters', 'Inspection'],
    icon: (
      <svg viewBox="0 0 48 48"><path d="M24 6c-4 6-8 10-8 15a8 8 0 0 0 16 0c0-5-4-9-8-15z"/><path d="M18 40h12M20 44h8"/></svg>
    ),
  },
  {
    num: '05',
    title: 'Detailing',
    image: '/images/svc-detailing.jpg',
    desc: 'Ceramic coating, polishing and paint correction that brings the showroom shine back — and keeps it.',
    tags: ['Ceramic', 'Polish', 'Correction'],
    icon: (
      <svg viewBox="0 0 48 48"><path d="M17 6l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/><path d="M35 24l1.8 3.6L40 29l-3.2 1.4L35 34l-1.8-3.6L30 29l3.2-1.4z"/></svg>
    ),
  },
  {
    num: '06',
    title: 'Lounge',
    image: '/images/svc-lounge.jpg',
    desc: 'Fast Wi-Fi, real coffee and comfortable seating. Work or unwind while we take care of the rest.',
    tags: ['Wi-Fi', 'Coffee', 'Comfort'],
    icon: (
      <svg viewBox="0 0 48 48"><path d="M12 22a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v6H12z"/><path d="M8 28h32v8a2 2 0 0 1-2 2h-2v-3H12v3h-2a2 2 0 0 1-2-2z"/><path d="M32 14c0-2-2-2-2-4M36 14c0-2-2-2-2-4"/></svg>
    ),
  },
];

export default function Services() {
  const ref = useScrollReveal();

  return (
    <section className="band" id="services" ref={ref}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">What we do</p>
          <h2>One stop.<br/>Every service.</h2>
          <p>From a quick tyre swap to a full detail, GRIP handles it in-house with trained technicians and a waiting lounge worth staying for.</p>
        </div>

        <div className="svc-grid">
          {services.map((svc, i) => (
            <article className="svc reveal" data-d={i % 3 === 0 ? undefined : String(i % 3)} key={svc.num}>
              <div className="svc-img-bg" style={{ backgroundImage: `url(${svc.image})` }}></div>
              <div className="svc-content">
                <span className="num">{svc.num}</span>
                <div className="ico">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <div className="tags">
                  {svc.tags.map((tag) => <i key={tag}>{tag}</i>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
