import { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

// Active Google Apps Script Web App URL (configurable via VITE_SCRIPT_URL in .env or Vercel)
const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyYxun3euPCKWRfSI7T6SmYmrr_hoejdPLi57Ddmlg6Ja2BRxF2YUepJRYsIQQQ3k03AQ/exec";

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

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    switch (name) {
      case 'name':
        if (!trimmedValue) return 'Please enter your name.';
        if (trimmedValue.length < 2) return 'Please enter at least 2 characters for your name.';
        return '';
      case 'phone':
        if (!trimmedValue) return 'Please enter your phone number.';
        if (!/^[0-9+()\-\s]{7,15}$/.test(trimmedValue)) return 'Please enter a valid phone number.';
        return '';
      case 'vehicle':
        if (!trimmedValue) return 'Please enter your vehicle make and model.';
        if (trimmedValue.length < 2) return 'Please enter a valid vehicle name.';
        return '';
      case 'service':
        if (!trimmedValue) return 'Please choose a service.';
        return '';
      case 'date':
        if (!trimmedValue) return 'Please select a preferred date.';
        if (new Date(trimmedValue) < new Date(new Date().toDateString())) return 'Please choose a future date.';
        return '';
      case 'time':
        if (!trimmedValue) return 'Please select a preferred time.';
        return '';
      case 'notes':
        if (trimmedValue && trimmedValue.length > 200) return 'Notes should be 200 characters or less.';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (data) => {
    const nextErrors = {};

    Object.entries(data).forEach(([name, value]) => {
      const message = validateField(name, value);
      if (message) nextErrors[name] = message;
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm(formData);
    if (!isValid) return;

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
      setErrors({});
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
            <div className={`field ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p className="field-error" id="name-error" role="alert">{errors.name}</p>}
            </div>
            <div className={`field ${errors.phone ? 'has-error' : ''}`}>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+91 …"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <p className="field-error" id="phone-error" role="alert">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid2">
            <div className={`field ${errors.vehicle ? 'has-error' : ''}`}>
              <label htmlFor="vehicle">Vehicle</label>
              <input
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Make & model"
                aria-invalid={Boolean(errors.vehicle)}
                aria-describedby={errors.vehicle ? 'vehicle-error' : undefined}
              />
              {errors.vehicle && <p className="field-error" id="vehicle-error" role="alert">{errors.vehicle}</p>}
            </div>
            <div className={`field ${errors.service ? 'has-error' : ''}`}>
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? 'service-error' : undefined}
              >
                <option value="" disabled>Choose a service</option>
                <option value="Tyres">Tyres</option>
                <option value="Car Care / Service">Car Care / Service</option>
                <option value="Car Wash">Car Wash</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Detailing">Detailing</option>
                <option value="Full inspection">Full inspection</option>
              </select>
              {errors.service && <p className="field-error" id="service-error" role="alert">{errors.service}</p>}
            </div>
          </div>

          <div className="grid2">
            <div className={`field ${errors.date ? 'has-error' : ''}`}>
              <label htmlFor="date">Preferred date</label>
              <input
                id="date"
                name="date"
                type="date"
                min={minDate}
                value={formData.date}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? 'date-error' : undefined}
              />
              {errors.date && <p className="field-error" id="date-error" role="alert">{errors.date}</p>}
            </div>
            <div className={`field ${errors.time ? 'has-error' : ''}`}>
              <label htmlFor="time">Preferred time</label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? 'time-error' : undefined}
              />
              {errors.time && <p className="field-error" id="time-error" role="alert">{errors.time}</p>}
            </div>
          </div>

          <div className={`field ${errors.notes ? 'has-error' : ''}`}>
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Anything we should know?"
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={errors.notes ? 'notes-error' : undefined}
            ></textarea>
            {errors.notes && <p className="field-error" id="notes-error" role="alert">{errors.notes}</p>}
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
