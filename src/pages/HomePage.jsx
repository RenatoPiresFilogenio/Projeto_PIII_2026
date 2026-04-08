import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import Reveal from '../components/Reveal'
import { appIcons } from '../lib/icons'

const heroSupportCards = [
  {
    eyebrow: 'Empresas',
    title: 'Publiquem desafios com contexto e encontrem especialistas aderentes.',
    text: 'A plataforma aproxima problema, setor e maturidade para acelerar conexões mais objetivas.',
  },
  {
    eyebrow: 'Pesquisadores',
    title: 'Descubram demandas reais compatíveis com sua linha de pesquisa.',
    text: 'Oportunidades aplicadas aparecem com mais clareza e facilitam propostas de parceria qualificadas.',
  },
  {
    eyebrow: 'Oportunidades',
    title: 'Cruzem decisões com indicadores, aderência e sinais do ecossistema.',
    text: 'Mais contexto ajuda a avançar projetos com menos ruído e mais segurança na priorização.',
  },
]

const featureCards = [
  {
    icon: appIcons.matchmaking,
    title: 'Matchmaking com contexto',
    description:
      'Conectamos pesquisadores e empresas com base em compatibilidade real de interesses, áreas e objetivos.',
  },
  {
    icon: appIcons.search,
    title: 'Busca semântica',
    description:
      'Pesquise em linguagem natural e encontre resultados relevantes mesmo sem usar termos técnicos.',
  },
  {
    icon: appIcons.proposals,
    title: 'Propostas e acompanhamento',
    description:
      'Envie propostas, acompanhe o status e gerencie parcerias de forma simples e centralizada.',
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

            <h1 className="hero__title">
              Conecte empresas com desafios a pesquisadores com soluções
            </h1>

            <p className="hero__description">
              A Innovare organiza o encontro entre desafios tecnológicos, expertise científica e
              oportunidades de inovação em uma experiência mais clara e orientada à colaboração.
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
            <p className="section-subtitle">
              Três blocos centrais organizam a descoberta, a conexão e a gestão das parcerias.
            </p>
          </Reveal>

          <div className="features__grid features__grid--three">
            {featureCards.map((card) => (
              <Reveal key={card.title}>
                <FeatureCard
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
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
                Pronto para <span className="text-gradient">transformar busca em parceria</span>?
              </h2>
              <p className="cta-box__subtitle">
                Junte-se a empresas e pesquisadores que já estão conectando problema, conhecimento e
                oportunidade com mais clareza.
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
