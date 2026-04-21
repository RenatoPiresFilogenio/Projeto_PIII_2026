import { useState } from 'react'
import PageFaq from '../../../components/PageFaq'
import './PublishChallengePage.scss'

const challengeFaqSections = [
  {
    title: 'O que foi encontrado no backend',
    items: [
      'GET /api/companies/',
      'GET /api/researchers/',
      'GET /api/universities/',
      'GET /api/resumes/',
      'GET /api/educations/',
      'GET /api/experiences/',
      'GET /api/skills/',
    ],
  },
  {
    title: 'O que ainda falta para desafios',
    text: 'O fluxo de desafios foi previsto funcionalmente, mas ainda não há rotas reais para sustentar a experiência completa no front.',
    items: [
      'CRUD de desafios tecnológicos',
      'Listagem de propostas recebidas',
      'Aceite, recusa e status de proposta',
      'Validação documental',
      'Notificações e match por IA',
    ],
  },
]

export default function PublishChallengePage() {
  const [isFaqOpen, setIsFaqOpen] = useState(false)

  return (
    <section className="app-page challenge-page">
      <div className="container app-page__container">
        <header className="app-page__header">
          <div>
            <span className="section-label">Desafios</span>
            <h1 className="app-page__title">Fluxo de desafios em preparação</h1>
          </div>
          <div className="app-page__header-actions">
            <p className="app-page__subtitle">
              Esta área será evoluída assim que o backend disponibilizar as rotas necessárias para o
              domínio de desafios.
            </p>
            <button
              type="button"
              className="btn btn-outline page-faq-trigger"
              onClick={() => setIsFaqOpen(true)}
            >
              FAQ da página
            </button>
          </div>
        </header>

        <div className="challenge-form-card challenge-form-card--notice">
          <div className="challenge-form-card__section">
            <div className="challenge-form-card__section-head">
              <span className="challenge-form-card__eyebrow">Em breve</span>
              <h2 className="challenge-form-card__title">Publicação de desafios ainda não disponível</h2>
            </div>

            <p className="challenge-form-card__text">
              O front mantém esta área reservada para o fluxo correto de desafios, sem inventar
              integrações que o backend ainda não sustenta.
            </p>
          </div>

          <div className="challenge-form-card__section">
            <div className="challenge-form-card__list">
              <article className="challenge-form-card__item">
                <strong>Interface preservada para evolução futura</strong>
                <span>O espaço continua pronto para receber o fluxo assim que as rotas reais forem disponibilizadas.</span>
              </article>
              <article className="challenge-form-card__item">
                <strong>Sem contratos simulados</strong>
                <span>As explicações técnicas e dependências desta página agora ficam organizadas no FAQ contextual.</span>
              </article>
            </div>
          </div>
        </div>
      </div>

      <PageFaq
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        title="Fluxo de desafios"
        intro="Este FAQ resume o que já existe no backend e o que ainda precisa ser implementado para liberar a gestão de desafios nesta página."
        sections={challengeFaqSections}
      />
    </section>
  )
}
