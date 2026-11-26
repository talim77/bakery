import Image from 'next/image'
import { ArrowDown, ArrowRight, CakeSlice, Clock3, Heart, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import { CakeBookingForm } from '@/components/cake-booking-form'

const cakes = [
  { name: 'Chocolate Truffle', type: 'BESTSELLER', price: '₹200', image: '/cake-hero.png', color: '#f5e8e1', detail: 'Rich, silky & deeply chocolatey' },
  { name: 'Fresh Fruit Cake', type: 'FRESH & LIGHT', price: '₹200', image: '/fruit-cake.png', color: '#f4eadc', detail: 'Seasonal fruits, cloud-soft cream' },
  { name: 'Red Velvet', type: 'A LITTLE SPECIAL', price: '₹200', image: '/red-velvet.png', color: '#f6e5e1', detail: 'Velvety layers with cream cheese' },
]

export default function Page() {
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
        <div className="hero-visual"><Image src="/cake-hero.png" alt="Freshly decorated berry celebration cake on a pedestal" fill priority sizes="(max-width: 760px) 100vw, 55vw" className="hero-image" /><div className="image-sticker"><Sparkles size={16} /><span>BAKED<br />WITH LOVE</span></div><div className="hero-caption"><span>01 / 03</span><span>THE BERRY BLISS</span></div></div>
        <span className="hero-scribble" aria-hidden="true">sweet<br />things</span>
      </section>

      <section className="qualities" aria-label="Our promises"><div><span className="quality-icon"><Heart size={17} /></span><span><b>Made with love</b><small>Every single time</small></span></div><div><span className="quality-icon"><Clock3 size={17} /></span><span><b>Freshly baked</b><small>Made to your order</small></span></div><div><span className="quality-icon"><Sparkles size={17} /></span><span><b>Made just for you</b><small>Your cake, your way</small></span></div><div className="flavour-count"><b>8+</b><span>lovely flavours<br />to fall for</span></div></section>

      <section className="menu-section" id="cakes"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> A LITTLE SOMETHING FOR EVERYONE</div><h2>Meet your new<br /><em>favourite</em> cake.</h2></div><a className="text-link menu-link" href="#order">Can&apos;t find your flavour? <ArrowRight size={14} /></a></div><div className="cake-grid">{cakes.map(cake => <article className="cake-card" key={cake.name}><div className="cake-photo" style={{ backgroundColor: cake.color }}><span className="cake-label">{cake.type}</span><Image src={cake.image} alt={`${cake.name} cake`} fill sizes="(max-width: 700px) 90vw, 30vw" className="cake-image" /></div><div className="cake-info"><div><h3>{cake.name}</h3><p>{cake.detail}</p></div><span className="cake-price">from {cake.price}</span></div></article>)}</div><p className="menu-footnote">Starting prices shown for 500 g. Cakes 1 kg and above receive size-based discounts.</p></section>

      <section className="size-strip"><div className="size-intro"><span className="eyebrow"><span className="eyebrow-line" /> MADE FOR YOUR MOMENT</span><h2>A slice for one,<br />or <em>everyone.</em></h2></div><div className="size-options"><div><b>250 g</b><span>₹100 · ready anytime</span></div><div><b>500 g</b><span>₹200 · ready anytime</span></div><div><b>1 kg</b><span>₹360 <i>10% off</i></span></div><div><b>1.5 kg</b><span>₹510 <i>15% off</i></span></div><div><b>2 kg</b><span>₹640 <i>20% off</i></span></div><p>3 kg and above: 25% off. Custom sizes welcome. Emergency 10-minute baking for 1 kg+ adds ₹50.</p></div></section>

      <CakeBookingForm />

      <footer className="site-footer" id="about"><a href="#home" className="brand footer-brand"><span className="brand-mark"><CakeSlice size={20} /></span><span>meetha<span className="brand-script"> moments</span><small>CAKES MADE WITH LOVE</small></span></a><p>A little sweetness for all of life&apos;s lovely moments.</p><div className="footer-contact"><a href="https://wa.me/919161994212?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20cakes." target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp us</a><span><MapPin size={15} /> Your neighbourhood bakery</span></div><span className="copyright">© 2025 Meetha Moments · Baked with love</span></footer>
    </main>
  )
}
