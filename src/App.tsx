import { useEffect, useState } from 'react'
import { ArrowRight, Clock3, MapPin } from 'lucide-react'
// @ts-expect-error CSS is loaded by the bundler; TypeScript has no CSS module declaration.
import './BookingPage.css'
import Home from './Home'
import Navbar from './Navbar'
import Service, { services } from './Service'
import Blogs from './Blogs'
import Contact from './Contact'

const whatsappLink = 'https://wa.me/919009564884?text=Namaste%2C%20I%20would%20like%20to%20book%20a%20puja.'

function getCurrentPath() {
  const path = window.location.pathname.replace(/\/+$/, '')
  const normalizedPath = path || '/'
  if (['/', '/services', '/blogs', '/contact'].includes(normalizedPath)) return normalizedPath
  window.history.replaceState({}, '', '/')
  return '/'
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)
  const [selectedPuja, setSelectedPuja] = useState(
    () => new URLSearchParams(window.location.search).get('service') ?? '',
  )

  function navigate(path: string) {
    window.history.pushState({}, '', path)
    setCurrentPath(getCurrentPath())
    setSelectedPuja(new URLSearchParams(window.location.search).get('service') ?? '')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  useEffect(() => {
    function handlePopState() {
      const path = getCurrentPath()
      setCurrentPath(path)
      setSelectedPuja(new URLSearchParams(window.location.search).get('service') ?? '')
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function bookService(name: string) {
    setSelectedPuja(name)
    navigate(`/contact?service=${encodeURIComponent(name)}`)
  }

  function renderHomePage() {
    return (
      <>
        <Home onNavigate={navigate} />
        <section className="guide-section" id="puja-guide" aria-labelledby="guide-title">
          <div className="guide-heading">
            <p className="eyebrow">A SIMPLE WAY TO BEGIN</p>
            <h2 id="guide-title">Plan your puja with <em>clarity.</em></h2>
            <p>Every ceremony is different. Share the occasion and venue, and Acharya will help you understand the next steps.</p>
          </div>
          <div className="guide-content">
            <div className="guide-steps" aria-label="Puja enquiry steps">
              <article className="guide-step"><span>01</span><h3>Tell us about the occasion</h3><p>Choose a service, preferred date, and venue in the enquiry form. Add any questions you already have.</p></article>
              <article className="guide-step"><span>02</span><h3>Discuss the ceremony</h3><p>Acharya will follow up to understand your requirements and discuss the vidhi, timing, and arrangements.</p></article>
              <article className="guide-step"><span>03</span><h3>Confirm preparations</h3><p>Once the ceremony details are understood, you can confirm availability and the preparations needed for your puja.</p></article>
            </div>
            <div className="guide-faq">
              <h3>Common questions</h3>
              <details>
                <summary>What details should I share?</summary>
                <p>Tell us which ceremony you have in mind, your preferred date, the venue or area, and any questions. You can choose “Other ceremony” if you do not see your service listed.</p>
              </details>
              <details>
                <summary>Will I be told what to prepare?</summary>
                <p>Preparations can vary by ceremony and venue. Ask during your enquiry so the requirements can be discussed for your specific puja.</p>
              </details>
              <details>
                <summary>Is my date confirmed when I submit the form?</summary>
                <p>No. Your enquiry starts a conversation; timing and availability are confirmed with you afterward.</p>
              </details>
            </div>
          </div>
          <a className="guide-cta" href="/contact" onClick={(event) => { event.preventDefault(); navigate('/contact') }}>Start an enquiry <ArrowRight size={16} aria-hidden="true" /></a>
        </section>
        <section className="acharya-section" id="about" aria-labelledby="about-title">
          <div className="acharya-image" role="img" aria-label="Temple lamps glowing during a traditional evening puja" />
          <div className="acharya-copy">
            <p className="eyebrow">A PERSONAL, DEVOTIONAL APPROACH</p>
            <h2 id="about-title">Tradition that feels <em>close to home.</em></h2>
            <p>Acharya Punit Tiwari helps families celebrate life’s milestones through meaningful Hindu rituals. From choosing the right puja to understanding the preparations, you’ll have a point of contact at every step.</p>
            <div className="acharya-details"><span><MapPin size={16} aria-hidden="true" /> Bilekahali, Bengaluru</span><span><Clock3 size={16} aria-hidden="true" /> By appointment</span></div>
            <a className="text-link" href={whatsappLink} target="_blank" rel="noreferrer">Speak with Acharya <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Navbar onNavigate={navigate} currentPath={currentPath} />

      <main id="home">
        {currentPath === '/services' && <Service onBook={bookService} />}
        {currentPath === '/blogs' && <Blogs onNavigate={navigate} />}
        {currentPath === '/contact' && <Contact services={services} selectedPuja={selectedPuja} />}
        {currentPath === '/' && renderHomePage()}
      </main>
    </>
  )
}

export default App
