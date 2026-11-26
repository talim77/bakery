'use client'

import { useState, type FormEvent } from 'react'
import { Check, Clock3, MessageCircle } from 'lucide-react'
import { cakeQuote, weightToKg } from '@/lib/cake-pricing'

const shopWhatsApp = '9161994212'
const flavors = ['Chocolate Truffle', 'Pineapple', 'Black Forest', 'Red Velvet', 'Butterscotch', 'Vanilla', 'Fresh Fruit', 'Custom flavour']
const sizes = [
  { value: '250 g', label: '250 g' },
  { value: '500 g', label: '500 g' },
  { value: '1 kg', label: '1 kg' },
  { value: '1.5 kg', label: '1.5 kg' },
  { value: '2 kg', label: '2 kg' },
  { value: '2.5 kg', label: '2.5 kg' },
  { value: '3 kg', label: '3 kg' },
  { value: 'Custom size', label: 'Custom size' },
]

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function CakeBookingForm() {
  const [submitted, setSubmitted] = useState(false)
  const [weight, setWeight] = useState('500 g')
  const [customWeight, setCustomWeight] = useState('3')
  const [emergency, setEmergency] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', cake: flavors[0], date: '', time: '', message: '' })

  const weightKg = weight === 'Custom size' ? Number(customWeight) || 0 : weightToKg(weight)
  const isOneKgOrMore = weightKg >= 1
  const quote = cakeQuote(weightKg, emergency)

  function updateWeight(nextWeight: string) {
    setWeight(nextWeight)
    if (nextWeight !== 'Custom size' && weightToKg(nextWeight) < 1) setEmergency(false)
  }

  function bookCake(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const preparation = weightKg < 1
      ? 'Small cake: available in shop, ready anytime'
      : emergency
        ? 'Emergency preparation: 10 minutes (+₹50)'
        : 'Standard preparation: about 60 minutes'
    const details = [
      'Hello! I would like to enquire / book a cake.',
      `Name: ${form.name}`,
      `Customer WhatsApp: ${form.phone}`,
      `Cake flavour: ${form.cake}`,
      `Size: ${weight === 'Custom size' ? `${customWeight} kg (custom)` : weight}`,
      `Price before discount: ${formatPrice(quote.basePrice)}`,
      quote.discount ? `Size discount: ${quote.discount}% (-${formatPrice(quote.basePrice - Math.round(quote.basePrice * (1 - quote.discount / 100)))})` : 'Size discount: Not applicable',
      `Estimated total${quote.emergencyFee ? ' (includes emergency fee)' : ''}: ${formatPrice(quote.total)}`,
      `Preparation: ${preparation}`,
      `Celebration date: ${form.date || 'Please suggest'}`,
      `Pickup time: ${form.time || 'Please confirm'}`,
      `Special requests: ${form.message || 'None'}`,
      'Please confirm availability and final price. Thank you!',
    ].join('\n')

    setSubmitted(true)
    window.open(`https://wa.me/91${shopWhatsApp}?text=${encodeURIComponent(details)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="booking-section" id="order">
      <div className="booking-aside">
        <div className="eyebrow"><span className="eyebrow-line" /> YOUR CELEBRATION STARTS HERE</div>
        <h2>Tell us what<br />you&apos;re <em>dreaming of.</em></h2>
        <p>Share a few details and we&apos;ll help you make it delicious. Your booking request opens in WhatsApp, ready for you to review and send.</p>
        <div className="lead-time"><Clock3 size={18} /><span><b>Ready when you need it</b><br />Under 1 kg: available in shop anytime<br />1 kg and above: around 60 minutes</span></div>
        <div className="contact-card"><span className="contact-icon"><MessageCircle size={18} /></span><span>In a hurry?<br /><b>10-minute emergency baking available.</b></span></div>
      </div>

      <form className="booking-form" onSubmit={bookCake}>
        <div className="form-heading"><div><span className="form-kicker">CAKE ENQUIRY & BOOKING</span><h3>Let&apos;s make it happen.</h3></div><span className="form-heart" aria-hidden="true">♡</span></div>
        <div className="form-grid">
          <label>Your name<input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="e.g. Priya Sharma" autoComplete="name" /></label>
          <label>Your WhatsApp number<input required type="tel" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} placeholder="Your contact number" autoComplete="tel" /></label>
          <label>Cake flavour<select value={form.cake} onChange={event => setForm({ ...form, cake: event.target.value })}>{flavors.map(flavour => <option key={flavour}>{flavour}</option>)}</select></label>
          <label>Size / weight<select value={weight} onChange={event => updateWeight(event.target.value)}>{sizes.map(size => <option key={size.value} value={size.value}>{size.label}</option>)}</select></label>
          {weight === 'Custom size' && <label>Custom weight (kg)<input type="number" min="0.25" max="20" step="0.25" required value={customWeight} onChange={event => setCustomWeight(event.target.value)} /></label>}
          <label>Celebration date<input type="date" value={form.date} onChange={event => setForm({ ...form, date: event.target.value })} /></label>
          <label>Pickup time<select value={form.time} onChange={event => setForm({ ...form, time: event.target.value })}><option value="">Choose a time</option><option>10 am – 1 pm</option><option>1 pm – 4 pm</option><option>4 pm – 7 pm</option><option>Flexible</option></select></label>
          {isOneKgOrMore && <label>Preparation speed<select value={emergency ? 'emergency' : 'standard'} onChange={event => setEmergency(event.target.value === 'emergency')}><option value="standard">Normal — about 60 minutes</option><option value="emergency">Emergency — 10 minutes (+₹50)</option></select></label>}
          {weightKg < 1 && <div className="ready-note"><Clock3 size={15} /> Small cakes are kept available in the shop and are ready anytime.</div>}
          <label className="full-field">Any special requests? <span className="optional">(optional)</span><textarea rows={3} value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} placeholder="Design, message on cake, eggless, budget..." /></label>
        </div>
        <div className="quote-summary" aria-live="polite">
          <div><span>{weight === 'Custom size' ? `${customWeight || '0'} kg custom cake` : weight} · estimate</span><strong>{formatPrice(quote.total)}</strong></div>
          <div className="quote-meta">{quote.discount ? <span>{quote.discount}% size discount applied</span> : <span>₹400 per kg</span>}{quote.emergencyFee > 0 && <span>Includes ₹50 emergency fee</span>}</div>
          <p>Final price will be confirmed by the shop on WhatsApp.</p>
        </div>
        <button className="button button-dark submit-button" type="submit">{submitted ? <><Check size={17} /> WhatsApp opened — send your message</> : <>Send enquiry on WhatsApp <MessageCircle size={17} /></>}</button>
        <p className="privacy-note">Your details open in your WhatsApp message for you to review and send. They are not stored on this website.</p>
      </form>
    </div>
  )
}
