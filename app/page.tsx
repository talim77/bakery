'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowDown, ArrowRight, CakeSlice, Check, Clock3, Heart, MapPin, MessageCircle, Sparkles } from 'lucide-react'

const shopWhatsApp = '' // Add the shop's WhatsApp number with country code before accepting orders.
const flavors = ['Chocolate Truffle', 'Pineapple', 'Black Forest', 'Red Velvet', 'Butterscotch', 'Vanilla', 'Fresh Fruit', 'Custom flavour']
const cakes = [
  { name: 'Chocolate Truffle', type: 'BESTSELLER', price: '₹450', image: '/cake-hero.png', color: '#f5e8e1', detail: 'Rich, silky & deeply chocolatey' },
  { name: 'Fresh Fruit Cake', type: 'FRESH & LIGHT', price: '₹500', image: '/fruit-cake.png', color: '#f4eadc', detail: 'Seasonal fruits, cloud-soft cream' },
  { name: 'Red Velvet', type: 'A LITTLE SPECIAL', price: '₹550', image: '/red-velvet.png', color: '#f6e5e1', detail: 'Velvety layers with cream cheese' },

]

function whatsappUrl(message: string) {
  return `https://wa.me/${shopWhatsApp}?text=${encodeURIComponent(message)}`
}

export default function Page() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', cake: 'Chocolate Truffle', weight: '500 g', date: '', time: '', message: '' })

  function bookCake(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!shopWhatsApp) {
      window.alert('Booking WhatsApp is not configured yet. Add the shop number with country code in app/page.tsx.')
      return
    }
    const details = [
      'Hi! I would like to enquire / book a cake 🎂',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Cake & flavour: ${form.cake}`,
      `Weight / size: ${form.weight}`,
      `Date: ${form.date || 'Please suggest'}`,
      `Pickup time: ${form.time || 'Please confirm'}`,
      `Notes: ${form.message || 'None'}`,
      'Please confirm availability and final price. Thank you!'
    ].join('\n')
    setSubmitted(true)
    window.open(whatsappUrl(details), '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <div className="announcement">Baked fresh with love, just for your little celebrations <span>♡</span></div>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Meetha Moments home"><span className="brand-mark"><CakeSlice size={22} /></span><span>meetha<span className="brand-script"> moments</span><small>CAKES MADE WITH LOVE</small></span></a>
        <nav aria-label="Main navigation"><a href="#cakes">Our cakes</a><a href="#about">Our story</a><a href="#order">Custom orders</a></nav>
        <a className="header-cta" href="#order">Order a cake <ArrowRight size={15} /></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> YOUR HAPPY LITTLE CAKE PLACE</div><h1>Every moment<br />deserves a <em>cake.</em></h1><p>Little celebrations, big milestones, or just because. We bake every cake fresh, with a whole lot of love.</p><div className="hero-actions"><a href="#order" className="button button-dark">Let&apos;s bake yours <ArrowRight size={16} /></a><a href="#cakes" className="text-link">Explore the menu <ArrowDown size={14} /></a></div><div className="hero-note"><span className="avatars">♡</span><span><b>Made fresh, never frozen</b><br />A little joy in every bite</span></div></div>
        <div className="hero-visual"><Image src="/cake-hero.png" alt="Freshly decorated berry celebration cake on a pedestal" fill priority sizes="(max-width: 760px) 100vw, 55vw" className="hero-image"/><div className="image-sticker"><Sparkles size={16} /><span>BAKED<br />WITH LOVE</span></div><div className="hero-caption"><span>01 / 03</span><span>THE BERRY BLISS</span></div></div>
        <span className="hero-scribble" aria-hidden="true">sweet<br />things</span>
      </section>

      <section className="qualities" aria-label="Our promises"><div><span className="quality-icon"><Heart size={17}/></span><span><b>Made with love</b><small>Every single time</small></span></div><div><span className="quality-icon"><Clock3 size={17}/></span><span><b>Freshly baked</b><small>Made to your order</small></span></div><div><span className="quality-icon"><Sparkles size={17}/></span><span><b>Made just for you</b><small>Your cake, your way</small></span></div><div className="flavour-count"><b>8+</b><span>lovely flavours<br />to fall for</span></div></section>

      <section className="menu-section" id="cakes"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> A LITTLE SOMETHING FOR EVERYONE</div><h2>Meet your new<br /><em>favourite</em> cake.</h2></div><a className="text-link menu-link" href="#order">Can&apos;t find your flavour? <ArrowRight size={14}/></a></div><div className="cake-grid">{cakes.map((cake) => <article className="cake-card" key={cake.name}><div className="cake-photo" style={{ backgroundColor: cake.color }}><span className="cake-label">{cake.type}</span><Image src={cake.image} alt={`${cake.name} cake`} fill sizes="(max-width: 700px) 90vw, 30vw" className="cake-image"/></div><div className="cake-info"><div><h3>{cake.name}</h3><p>{cake.detail}</p></div><span className="cake-price">from {cake.price}</span></div></article>)}</div><p className="menu-footnote">Prices shown are starting prices for 500 g. Final price depends on size, flavour & design.</p></section>

      <section className="size-strip"><div className="size-intro"><span className="eyebrow"><span className="eyebrow-line"/> MADE FOR YOUR MOMENT</span><h2>A slice for one,<br />or <em>everyone.</em></h2></div><div className="size-options"><div><b>250 g</b><span>2–3 people</span></div><div><b>500 g</b><span>4–6 people</span></div><div><b>1 kg</b><span>8–10 people</span></div><div><b>1.5 kg</b><span>12–15 people</span></div><div><b>2 kg+</b><span>Party time!</span></div><p>Need a different size? We&apos;ll make it your way.</p></div></section>

      <section className="booking-section" id="order"><div className="booking-aside"><div className="eyebrow"><span className="eyebrow-line"/> YOUR CELEBRATION STARTS HERE</div><h2>Tell us what<br />you&apos;re <em>dreaming of.</em></h2><p>Share a few details and we&apos;ll help you make it delicious. Your booking request opens in WhatsApp, ready for you to send.</p><div className="lead-time"><Clock3 size={18}/><span><b>How much notice do I need?</b><br />Classic cakes: 24–48 hours<br />Custom designs: 3–5 days</span></div><div className="contact-card"><span className="contact-icon"><MessageCircle size={18}/></span><span>Rather chat first?<br /><b>We&apos;re just a message away.</b></span></div></div><form className="booking-form" onSubmit={bookCake}><div className="form-heading"><div><span className="form-kicker">CAKE ENQUIRY & BOOKING</span><h3>Let&apos;s make it happen.</h3></div><span className="form-heart">♡</span></div><div className="form-grid"><label>Your name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="e.g. Priya Sharma" autoComplete="name"/></label><label>WhatsApp number<input required type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="Your contact number" autoComplete="tel"/></label><label>Cake flavour<select value={form.cake} onChange={e => setForm({...form, cake:e.target.value})}>{flavors.map(flavour => <option key={flavour}>{flavour}</option>)}</select></label><label>Size / weight<select value={form.weight} onChange={e => setForm({...form, weight:e.target.value})}>{['250 g','500 g','1 kg','1.5 kg','2 kg','Custom size'].map(size => <option key={size}>{size}</option>)}</select></label><label>Celebration date<input type="date" value={form.date} onChange={e => setForm({...form, date:e.target.value})}/></label><label>Pickup time<select value={form.time} onChange={e => setForm({...form, time:e.target.value})}><option value="">Choose a time</option><option>10 am – 1 pm</option><option>1 pm – 4 pm</option><option>4 pm – 7 pm</option><option>Flexible</option></select></label><label className="full-field">Any special requests? <span className="optional">(optional)</span><textarea rows={3} value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Design, message on cake, eggless, budget..."/></label></div><button className="button button-dark submit-button" type="submit">{submitted ? <><Check size={17}/> WhatsApp opened — send your message</> : <>Send enquiry on WhatsApp <MessageCircle size={17}/></>}</button><p className="privacy-note">No account, no app form submission — WhatsApp opens with your details. You review and send it.</p></form></section>

      <footer className="site-footer" id="about"><a href="#home" className="brand footer-brand"><span className="brand-mark"><CakeSlice size={20}/></span><span>meetha<span className="brand-script"> moments</span><small>CAKES MADE WITH LOVE</small></span></a><p>A little sweetness for all of life&apos;s lovely moments.</p><div className="footer-contact"><a href={whatsappUrl('Hi! I would like to know more about your cakes.')} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp us</a><span><MapPin size={15}/> Your neighbourhood bakery</span></div><span className="copyright">© 2025 Meetha Moments · Baked with love</span></footer>
    </main>
  )
}
