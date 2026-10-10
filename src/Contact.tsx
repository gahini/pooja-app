import { useEffect, useState, type FormEvent } from 'react'
import { ArrowRight, Clock3, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { PujaService } from './Service'

type ContactProps = {
  services: PujaService[]
  selectedPuja: string
}

type EnquiryType = 'general' | 'pooja'

const phoneNumber = '+919009564884'
const location = 'Bilekahali, near Shri Patalamma Temple, Bengaluru'

const Contact = ({ services, selectedPuja }: ContactProps) => {
  const [submitted, setSubmitted] = useState<EnquiryType | null>(null)
  const [generalService, setGeneralService] = useState(selectedPuja)
  const [poojaService, setPoojaService] = useState(selectedPuja)

  useEffect(() => {
    if (selectedPuja) {
      setGeneralService(selectedPuja)
      setPoojaService(selectedPuja)
    }
  }, [selectedPuja])

  function handleSubmit(event: FormEvent<HTMLFormElement>, type: EnquiryType) {
    event.preventDefault()
    const details = new FormData(event.currentTarget)
    const fields = type === 'general'
      ? [
          `Name: ${details.get('generalName')}`,
          `Phone: ${details.get('generalPhone')}`,
          `Preferred service: ${details.get('generalService')}`,
          `Message: ${details.get('generalMessage')}`,
        ]
      : [
          `Name: ${details.get('poojaName')}`,
          `Contact: ${details.get('poojaContact')}`,
          `Pooja service: ${details.get('poojaService')}`,
          `Date: ${details.get('poojaDate')}`,
          `Time: ${details.get('poojaTime')}`,
          `Location: ${details.get('poojaLocation')}`,
          `Message: ${details.get('poojaMessage') || 'No additional message'}`,
        ]

    const message = [`Namaste, I have a ${type} enquiry.`, ...fields].join('\n')
    window.open(`https://wa.me/${phoneNumber.slice(1)}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setSubmitted(type)
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-heading">
        <p className="eyebrow">WE’RE HERE TO HELP</p>
        <h2 id="contact-title">Let’s talk about <em>your occasion.</em></h2>
        <p>Choose the enquiry form that suits you. We’ll get back to you to discuss the details.</p>
      </div>

      <div className="contact-columns">
        <div className="contact-enquiries" id="booking">
          <form className="booking-form contact-form" onSubmit={(event) => handleSubmit(event, 'general')}>
            <div className="form-topline"><span>GENERAL ENQUIRY</span><MessageCircle size={19} aria-hidden="true" /></div>
            <div className="form-fields">
              <div className="field-group">
                <label htmlFor="general-name">Your name <span>*</span></label>
                <input id="general-name" name="generalName" autoComplete="name" placeholder="Full name" required />
              </div>
              <div className="field-group">
                <label htmlFor="general-phone">Phone number <span>*</span></label>
                <input id="general-phone" name="generalPhone" type="tel" autoComplete="tel" placeholder="Your phone number" required />
              </div>
              <div className="field-group field-wide">
                <label htmlFor="general-service">Preferred service <span>*</span></label>
                <select id="general-service" name="generalService" value={generalService} onChange={(event) => setGeneralService(event.target.value)} required>
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}
                  <option value="Other ceremony">Other ceremony</option>
                </select>
              </div>
              <div className="field-group field-wide">
                <label htmlFor="general-message">Message <span>*</span></label>
                <textarea id="general-message" name="generalMessage" placeholder="How can we help?" rows={3} required />
              </div>
            </div>
            <button className="submit-booking" type="submit">Send general enquiry <ArrowRight size={16} aria-hidden="true" /></button>
            {submitted === 'general' && <p className="booking-notice" role="status">Your enquiry is ready in WhatsApp. Tap Send to share it.</p>}
          </form>

          <form className="booking-form contact-form" onSubmit={(event) => handleSubmit(event, 'pooja')}>
            <div className="form-topline"><span>POOJA ENQUIRY</span><Clock3 size={19} aria-hidden="true" /></div>
            <div className="form-fields">
              <div className="field-group">
                <label htmlFor="pooja-name">Your name <span>*</span></label>
                <input id="pooja-name" name="poojaName" autoComplete="name" placeholder="Full name" required />
              </div>
              <div className="field-group">
                <label htmlFor="pooja-contact">Contact number <span>*</span></label>
                <input id="pooja-contact" name="poojaContact" type="tel" autoComplete="tel" placeholder="Phone number" required />
              </div>
              <div className="field-group field-wide">
                <label htmlFor="pooja-service">Pooja service <span>*</span></label>
                <select id="pooja-service" name="poojaService" value={poojaService} onChange={(event) => setPoojaService(event.target.value)} required>
                  <option value="" disabled>Select a pooja service</option>
                  {services.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}
                  <option value="Other ceremony">Other ceremony</option>
                </select>
              </div>
              <div className="field-group">
                <label htmlFor="pooja-date">Preferred date <span>*</span></label>
                <input id="pooja-date" name="poojaDate" type="date" required />
              </div>
              <div className="field-group">
                <label htmlFor="pooja-time">Preferred time <span>*</span></label>
                <input id="pooja-time" name="poojaTime" type="time" required />
              </div>
              <div className="field-group field-wide">
                <label htmlFor="pooja-location">Location <span>*</span></label>
                <input id="pooja-location" name="poojaLocation" autoComplete="street-address" placeholder="Ceremony address or area" required />
              </div>
              <div className="field-group field-wide">
                <label htmlFor="pooja-message">Your message</label>
                <textarea id="pooja-message" name="poojaMessage" placeholder="Share any details or questions" rows={3} />
              </div>
            </div>
            <button className="submit-booking" type="submit">Send pooja enquiry <ArrowRight size={16} aria-hidden="true" /></button>
            {submitted === 'pooja' && <p className="booking-notice" role="status">Your enquiry is ready in WhatsApp. Tap Send to share it.</p>}
          </form>
        </div>

        <aside className="contact-details" aria-label="Contact details">
          <div className="contact-map">
            <iframe
              title="Map showing Bilekahali near Shri Patalamma Temple, Bengaluru"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="contact-information">
            <h3>Visit or get in touch</h3>
            <p><MapPin size={17} aria-hidden="true" /><span>{location}</span></p>
            <p><Phone size={17} aria-hidden="true" /><a href={`tel:${phoneNumber}`}>+91 90095 64884</a></p>
            <div className="contact-socials">
              <a href={`https://wa.me/${phoneNumber.slice(1)}`} target="_blank" rel="noreferrer">
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowRight size={14} aria-hidden="true" /></a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Contact
