import { useEffect } from 'react'
import './PageFaq.scss'

export default function PageFaq({
  isOpen,
  onClose,
  title,
  intro = '',
  sections = [],
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="page-faq" role="dialog" aria-modal="true" aria-labelledby="page-faq-title">
      <button type="button" className="page-faq__backdrop" aria-label="Fechar FAQ" onClick={onClose} />

      <div className="page-faq__dialog">
        <div className="page-faq__header">
          <div>
            <span className="page-faq__eyebrow">FAQ da página</span>
            <h2 id="page-faq-title" className="page-faq__title">{title}</h2>
          </div>
          <button type="button" className="page-faq__close" onClick={onClose}>
            Fechar
          </button>
        </div>

        {intro ? <p className="page-faq__intro">{intro}</p> : null}

        <div className="page-faq__body">
          {sections.map((section) => (
            <section key={section.title} className="page-faq__section">
              <h3 className="page-faq__section-title">{section.title}</h3>
              {section.text ? <p className="page-faq__section-text">{section.text}</p> : null}
              {section.items?.length ? (
                <ul className="page-faq__list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
