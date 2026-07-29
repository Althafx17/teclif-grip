export default function StickyCta() {
  const handleBookClick = (e) => {
    e.preventDefault();
    const targetEl = document.querySelector('#book');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky-cta" aria-label="Quick Actions">
      <a
        href="tel:+919876543210"
        className="sticky-cta-call"
      >
        📞 Call us
      </a>
      <a
        href="#book"
        onClick={handleBookClick}
        className="sticky-cta-book"
      >
        Book a visit →
      </a>
    </div>
  );
}
