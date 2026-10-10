import type { MouseEvent } from 'react'
import { ArrowDown, ArrowRight, Check, MessageCircle, Sparkles } from 'lucide-react'

type HomeProps = {
  onNavigate: (path: string) => void
}

const Home = ({ onNavigate }: HomeProps) => {
  function openServices(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate('/services')
  }

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span /> BILEKAHALI · BENGALURU</p>
        <h1 id="hero-title">A sacred beginning,<br /><em>guided with care.</em></h1>
        <p className="hero-description">Bring tradition home with thoughtful Vedic puja, experienced pandit guidance, and rituals arranged around your family.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="/services" onClick={openServices}>Explore Services <ArrowRight size={16} aria-hidden="true" /></a>
          <a className="button button-quiet" href="https://wa.me/919009564884?text=Namaste%2C%20I%20would%20like%20to%20book%20a%20puja." target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" /> WhatsApp us</a>
        </div>
        <div className="hero-notes">
          <span><Check size={14} aria-hidden="true" /> Traditional Vedic vidhi</span>
          <span><Check size={14} aria-hidden="true" /> Personal guidance</span>
        </div>
      </div>
      <div className="hero-art" role="img" aria-label="A warmly lit Hindu temple prepared for worship">
        <div className="hero-art-shade" />
        <div className="hero-caption"><Sparkles size={17} aria-hidden="true" /><span>For every important moment<small>Rituals rooted in devotion</small></span></div>
        <a className="scroll-cue" href="/services" onClick={openServices} aria-label="Explore puja services"><ArrowDown size={17} aria-hidden="true" /></a>
      </div>
      <div className="hero-bottomline"><span>श्रद्धा · सेवा · संस्कार</span><span>YOUR FAMILY'S PUROHIT</span></div>
    </section>
  )
}

export default Home