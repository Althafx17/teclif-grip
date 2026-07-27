import { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

// Support either VITE_SCRIPT_ID or full VITE_SCRIPT_URL from .env
const SCRIPT_ID = import.meta.env.VITE_SCRIPT_ID || "AKfycbxxiZzyDBBB6Y4kZNTytrfOBmLXEr_c30kPA4wlMVhskbcf1zHLwx8nyH_WUMqdCJfUmw";
const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || `https://script.google.com/macros/s/${SCRIPT_ID}/exec`;

export default function Booking() {
  const ref = useScrollReveal();
  const [minDate, setMinDate] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus('loading');

    try {
      if (SCRIPT_URL && !SCRIPT_URL.includes('YOUR_ID')) {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // required for Apps Script cross-origin requests
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(formData),
        });
      } else {
        // Fallback simulation if SCRIPT_URL is not yet configured
        await new Promise((res) => setTimeout(res, 600));
      }

      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        vehicle: '',
        service: '',
        date: '',
        time: '',
        notes: '',
      });
    } catch (err) {
      console.error('Booking submission error:', err);
      setStatus('error');
    }
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
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 …"
                required
              />
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label htmlFor="vehicle">Vehicle</label>
              <input
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="Make & model"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Choose a service</option>
                <option value="Tyres">Tyres</option>
                <option value="Car Care / Service">Car Care / Service</option>
                <option value="Car Wash">Car Wash</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Detailing">Detailing</option>
                <option value="Full inspection">Full inspection</option>
              </select>
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label htmlFor="date">Preferred date</label>
              <input
                id="date"
                name="date"
                type="date"
                min={minDate}
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="time">Preferred time</label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Anything we should know?"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-amber" disabled={status === 'loading'}>
            {status === 'loading' ? 'Booking...' : 'Request booking'}
          </button>

          <p className="form-note">No payment now — we'll call to confirm your slot.</p>

          <div className={`toast${status === 'success' ? ' show' : ''}`} id="toast">
            Thanks — your request is in. We'll call you shortly to confirm. That's the GRIP.
          </div>

          {status === 'error' && (
            <div className="toast show" style={{ borderColor: '#ff4d4d', color: '#ff8080', background: 'rgba(255,77,77,0.12)' }}>
              Something went wrong. Please try again or call us directly.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
