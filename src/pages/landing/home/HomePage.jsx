import { Link } from 'react-router-dom'
import FeatureCard from '../../../components/FeatureCard'
import Reveal from '../../../components/Reveal'
import { appIcons } from '../../../lib/icons'
import './HomePage.scss'

const heroSupportCards = [
  {
    eyebrow: 'Cadastros',
    title: 'Empresas e pesquisadores entram usando os registros reais da API.',
  },
  {
    eyebrow: 'Perfis',
    title: 'O painel atual integra perfil, currículo, formações e experiências.',
  },
  {
    eyebrow: 'Evolução',
    title: 'Desafios, propostas e IA seguem previstos, mas dependem do backend.',
  },
]

const featureCards = [
  {
    icon: appIcons.matchmaking,
    title: 'Cadastro aderente ao backend',
    description:
      'O front agora consome os endpoints reais de empresas, pesquisadores, universidades e currículos.',
  },
  {
    icon: appIcons.search,
    title: 'Exploração da base real',
    description:
      'A área autenticada usa filtro textual local sobre os dados carregados da API, sem mocks.',
  },
  {
    icon: appIcons.proposals,
    title: 'Indicadores da plataforma',
    description:
      'Os indicadores agora mostram somente métricas que a API atual realmente entrega.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="hero" id="hero">
        <div className="hero__bg-glow"></div>
        <div className="hero__bg-glow hero__bg-glow--right"></div>

        <div className="container">
          <div className="hero__content hero__content--centered">
            <div className="hero__badge">
              <span className="badge-dot"></span>
              ODS 9 | Pesquisa, indústria e inovação conectadas
            </div>

            <h1 className="hero__title">Conecte cadastros, currículos e capacidades reais da plataforma</h1>

            <p className="hero__description">
              A P&amp;D Connect organiza a conexão entre empresas e pesquisadores e evolui a
              interface conforme os endpoints reais do backend.
            </p>

            <div className="hero__actions hero__actions--centered">
              <Link to="/login" className="btn btn-primary btn-lg">
                Entrar na plataforma
              </Link>
              <Link to="/como-funciona" className="btn btn-outline btn-lg">
                Ver como funciona
              </Link>
            </div>
          </div>

          <div className="hero__support hero__support--compact">
            <div className="hero__support-grid">
              {heroSupportCards.map((card) => (
                <article key={card.eyebrow} className="hero__support-card">
                  <span className="hero__support-card-eyebrow">{card.eyebrow}</span>
                  <h3 className="hero__support-card-title">{card.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section--muted home-features home-features--focused"
        id="funcionalidades"
      >
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Funcionalidades</span>
            <h2 className="section-title">
              O front agora segue o que a <span className="text-gradient">API realmente oferece</span>
            </h2>
            <p className="section-subtitle">Integração correta primeiro, evolução funcional depois.</p>
          </Reveal>

          <div className="features__grid features__grid--three">
            {featureCards.map((card) => (
              <Reveal key={card.title}>
                <FeatureCard icon={card.icon} title={card.title} description={card.description} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <Reveal>
            <div className="cta-box">
              <h2 className="cta-box__title">
                Transforme <span className="text-gradient">dados reais em navegação confiável</span>
              </h2>
              <p className="cta-box__subtitle">
                Entre na plataforma para explorar a base atual, revisar o perfil e acompanhar a
                aderência com o backend.
              </p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Sou Empresa
                </Link>
                <Link to="/login#cadastro" className="btn btn-outline btn-lg">
                  Sou Pesquisador
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
