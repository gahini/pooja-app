import type { MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'

export type PujaService = {
  name: string
  subtitle: string
  image: string
}

export const services: PujaService[] = [
  { name: 'Shaadi', subtitle: 'Vedic wedding ceremonies', image: 'photo-1587271636175-90d58cdad458' },
  { name: 'Griha Pravesh', subtitle: 'Auspicious new-home beginnings', image: 'photo-1754276747848-fed9fe91d806' },
  { name: 'Devta Pratishtha', subtitle: 'Idol installation and worship', image: 'photo-1606293926075-69a00dbfde81' },
  { name: 'Chandi Parayan', subtitle: 'Sacred recitation of Devi Mahatmya', image: 'photo-1605649487212-47bdab064df7' },
  { name: 'Shri Satyanarayan Swami Puja', subtitle: 'Puja, katha and prasad', image: 'photo-1590736969955-71cc94901144' },
  { name: 'Griha Shanti', subtitle: 'Peace and harmony for your home', image: 'photo-1680491025190-269d21ac8326' },
  { name: 'Kaal Sarp Dosh Puja', subtitle: 'Traditional graha-shanti rituals', image: 'photo-1551979122-3a33d9391335' },
  { name: 'Kundli Vivah', subtitle: 'Kundli matching and wedding guidance', image: 'photo-1519741497674-611481863552' },
  { name: 'Rudraksha Kendra', subtitle: 'Rudraksha guidance and seva', image: 'photo-1754276747848-fed9fe91d806' },
  { name: 'Janam Kundli', subtitle: 'Birth-chart preparation and reading', image: 'photo-1590736969955-71cc94901144' },
  { name: 'Yajna Anushthan', subtitle: 'Vedic havan and sankalp', image: 'photo-1551979122-3a33d9391335' },
  { name: 'Bhagwat Parayan', subtitle: 'Shrimad Bhagwat katha recitation', image: 'photo-1605649487212-47bdab064df7' },
  { name: 'Rudrabhishek', subtitle: 'Abhishek and Shiva puja', image: 'photo-1606293926075-69a00dbfde81' },
  { name: 'Mahamrityunjay Jaap Anushthan', subtitle: 'Mantra jaap with Vedic vidhi', image: 'photo-1680491025190-269d21ac8326' },
]

type ServiceProps = {
  onBook: (name: string) => void
}

const Service = ({ onBook }: ServiceProps) => {
  return (
    <section className="services-section" id="services" aria-labelledby="services-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PUJA &amp; SPIRITUAL SERVICES</p>
          <h2 id="services-title">For every <em>sacred moment.</em></h2>
        </div>
        <p>Choose a service to begin your enquiry. We’ll help you plan the vidhi, date, and arrangements.</p>
      </div>
      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-item" key={service.name}>
            <div className="service-image">
              <img
                src={`https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=720&q=80`}
                alt=""
                loading="lazy"
              />
              <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="service-info">
              <h3>{service.name}</h3>
              <p>{service.subtitle}</p>
              <a
                className="service-arrow"
                href={`/contact?service=${encodeURIComponent(service.name)}`}
                aria-label={`Enquire about ${service.name}`}
                onClick={(event) => {
                  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                  event.preventDefault()
                  onBook(service.name)
                }}
              >
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Service
