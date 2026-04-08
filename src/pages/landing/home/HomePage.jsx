import { Link } from 'react-router-dom'
import FeatureCard from '../../../components/FeatureCard'
import Reveal from '../../../components/Reveal'
import { appIcons } from '../../../lib/icons'
import './HomePage.scss'

const heroSupportCards = [
  {
    eyebrow: 'Empresas',
    title: 'Publiquem desafios e encontrem especialistas aderentes.',
  },
  {
    eyebrow: 'Pesquisadores',
    title: 'Encontrem demandas alinhadas à sua linha de pesquisa.',
  },
  {
    eyebrow: 'Oportunidades',
    title: 'Cruzem contexto, aderência e indicadores na mesma busca.',
  },
]

const featureCards = [
  {
    icon: appIcons.matchmaking,
    title: 'Matchmaking com contexto',
    description:
      'Aproximamos empresas e pesquisadores por aderência de interesses, áreas e objetivos.',
  },
  {
    icon: appIcons.search,
    title: 'Busca semântica',
    description:
      'Busque em linguagem natural e encontre resultados relevantes sem depender de termos exatos.',
  },
  {
    icon: appIcons.proposals,
    title: 'Propostas e acompanhamento',
    description:
      'Envie propostas, acompanhe o status e gerencie parcerias em um só lugar.',
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

            <h1 className="hero__title">Conecte desafios empresariais a pesquisa aplicada</h1>

            <p className="hero__description">
              A P&amp;D Connect aproxima empresas e pesquisadores com busca semântica, contexto
              técnico e fluxo de parceria.
            </p>

            <div className="hero__actions hero__actions--centered">
              <Link to="/login" className="btn btn-primary btn-lg">
                Publicar um desafio
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
              O fluxo essencial da <span className="text-gradient">P&amp;D Connect</span>
            </h2>
            <p className="section-subtitle">Descoberta, conexão e acompanhamento em um só fluxo.</p>
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
                Transforme <span className="text-gradient">busca em parceria</span>
              </h2>
              <p className="cta-box__subtitle">
                Entre na plataforma para conectar desafio, conhecimento e oportunidade com mais
                clareza.
              </p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Sou Empresa
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg">
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
