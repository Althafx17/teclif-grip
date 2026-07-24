import { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Booking() {
  const ref = useScrollReveal();
  const [showToast, setShowToast] = useState(false);
  const [buttonText, setButtonText] = useState('Request booking');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setShowToast(true);
    setButtonText('Request sent ✓');
    setTimeout(() => form.reset(), 400);
  };

  return (
    <section className="band" id="book" ref={ref}>
      <div className="wrap book">
        <div className="book-info reveal">
          <p className="eyebrow">Book a visit</p>
          <h2>Reserve your<br/>slot at GRIP.</h2>
          <p>Tell us what your vehicle needs and when suits you. We'll confirm your slot and have everything ready before you arrive.</p>

          <div className="info-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div><div className="t">Location</div><div className="v">GRIP Automotive Experience Center, Kozhikode, Kerala</div></div>
          </div>
          <div className="info-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z"/></svg>
            <div><div className="t">Call us</div><div className="v">+91 98765 43210</div></div>
          </div>
          <div className="info-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            <div><div className="t">Open</div><div className="v">Mon–Sun · 8:00 AM – 9:00 PM</div></div>
          </div>
        </div>

        <form id="bookForm" className="reveal" data-d="1" noValidate onSubmit={handleSubmit}>
          <div className="grid2">
            <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" placeholder="Your name" required /></div>
            <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" placeholder="+91 …" required /></div>
          </div>
          <div className="grid2">
            <div className="field"><label htmlFor="vehicle">Vehicle</label><input id="vehicle" name="vehicle" placeholder="Make & model" required /></div>
            <div className="field">
              <label htmlFor="service">Service</label>
              <select id="service" name="service" required defaultValue="">
                <option value="" disabled>Choose a service</option>
                <option>Tyres</option>
                <option>Car Care / Service</option>
                <option>Car Wash</option>
                <option>Oil Change</option>
                <option>Detailing</option>
                <option>Full inspection</option>
              </select>
            </div>
          </div>
          <div className="grid2">
            <div className="field"><label htmlFor="date">Preferred date</label><input id="date" name="date" type="date" min={minDate} required /></div>
            <div className="field"><label htmlFor="time">Preferred time</label><input id="time" name="time" type="time" required /></div>
          </div>
          <div className="field"><label htmlFor="notes">Notes (optional)</label><textarea id="notes" name="notes" rows="3" placeholder="Anything we should know?"></textarea></div>
          <button type="submit" className="btn btn-amber">{buttonText}</button>
          <p className="form-note">No payment now — we'll call to confirm your slot.</p>
          <div className={`toast${showToast ? ' show' : ''}`} id="toast">Thanks — your request is in. We'll call you shortly to confirm. That's the GRIP.</div>
        </form>
      </div>
    </section>
  );
}
