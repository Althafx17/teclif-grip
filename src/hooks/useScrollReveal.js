import { useEffect, useRef } from 'react';

export default function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    const targets = el.querySelectorAll('.reveal');
    targets.forEach((t) => io.observe(t));
    if (el.classList.contains('reveal')) io.observe(el);

    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
