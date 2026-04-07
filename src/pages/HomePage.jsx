import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const heroSignals = [
  { value: '500+', label: 'perfis técnicos e científicos mapeados' },
  { value: '120+', label: 'desafios e demandas com contexto' },
  { value: '85+', label: 'conexões sugeridas com aderência' },
]

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

const problemCards = [
  {
    icon: '\u{1F517}',
    iconClass: 'problem-card__icon--cyan',
    title: 'Falta de integração',
    text: 'Universidades e empresas ainda operam com pouca interação estruturada para transformar pesquisa em colaboração aplicada.',
  },
  {
    icon: '\u{1F4CA}',
    iconClass: 'problem-card__icon--purple',
    title: 'Baixa maturidade de P&D',
    text: 'Muitas empresas não sabem onde buscar pesquisa, parceria ou oportunidade para iniciar projetos de inovação com segurança.',
  },
  {
    icon: '\u{1F50D}',
    iconClass: 'problem-card__icon--pink',
    title: 'Busca pouco estruturada',
    text: 'Encontrar especialistas, temas e tecnologias compatíveis ainda é um processo lento, manual e pouco contextualizado.',
  },
  {
    icon: '\u{1F441}',
    iconClass: 'problem-card__icon--cyan',
    title: 'Pesquisas pouco visíveis',
    text: 'Linhas de pesquisa com potencial de aplicação prática seguem fora do radar de empresas que poderiam se beneficiar delas.',
  },
  {
    icon: '\u{1F4B0}',
    iconClass: 'problem-card__icon--purple',
    title: 'Decisão sem contexto',
    text: 'Sem sinais de aderência, prioridade e maturidade, boas conexões levam mais tempo para ganhar tração.',
  },
  {
    icon: '\u{26A1}',
    iconClass: 'problem-card__icon--pink',
    title: 'Conhecimento desperdiçado',
    text: 'A distância entre setor produtivo e pesquisa reduz impacto econômico, visibilidade e capacidade de inovação.',
  },
]

const featureCards = [
  {
    icon: '\u{1F465}',
    iconClass: '',
    title: 'Perfis estruturados',
    text: 'Empresas e pesquisadores apresentam competências, desafios e histórico com mais clareza desde o primeiro contato.',
  },
  {
    icon: '\u{1F91D}',
    iconClass: 'feature-card__icon--secondary',
    title: 'Matchmaking com contexto',
    text: 'A plataforma aproxima demanda e pesquisa com base em aderência, especialidade e oportunidade real de colaboração.',
  },
  {
    icon: '\u{1F50E}',
    iconClass: 'feature-card__icon--warm',
    title: 'Busca semântica',
    text: 'Pesquise por área, setor, tecnologia, localização e vocabulário do problema real em uma experiência única.',
  },
  {
    icon: '\u{1F4CB}',
    iconClass: '',
    title: 'Propostas e acompanhamento',
    text: 'Envie propostas com escopo e cronograma, acompanhe status e mantenha a parceria organizada com mais transparência.',
  },
  {
    icon: '\u{1F4E2}',
    iconClass: 'feature-card__icon--secondary',
    title: 'Sinais de compatibilidade',
    text: 'Indicadores e sinais de aderência ajudam a priorizar conexões mais relevantes com menos ruído no processo.',
  },
  {
    icon: '\u{1F4C8}',
    iconClass: 'feature-card__icon--warm',
    title: 'Indicadores estratégicos',
    text: 'Dados sobre inovação e investimento em P&D ampliam contexto e apoiam decisões com mais maturidade.',
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
            <div className="hero__signals">
              {heroSignals.map((signal) => (
                <div key={signal.label} className="hero__signal">
                  <div className="hero__signal-value">{signal.value}</div>
                  <div className="hero__signal-label">{signal.label}</div>
                </div>
              ))}
            </div>

            <div className="hero__support-grid">
              {heroSupportCards.map((card) => (
                <article key={card.eyebrow} className="hero__support-card">
                  <span className="hero__support-card-eyebrow">{card.eyebrow}</span>
                  <h3 className="hero__support-card-title">{card.title}</h3>
                  <p className="hero__support-card-text">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section problems" id="problemas">
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">O Desafio</span>
            <h2 className="section-title">
              Onde a conexão entre <span className="text-gradient">pesquisa</span> e{' '}
              <span className="text-gradient">indústria</span> ainda falha
            </h2>
            <p className="section-subtitle">
              A plataforma existe para reduzir gargalos recorrentes entre desafio, expertise e
              decisão.
            </p>
          </Reveal>

          <div className="problems__grid">
            {problemCards.map((card) => (
              <Reveal key={card.title}>
                <div className="problem-card">
                  <div className={`problem-card__icon ${card.iconClass}`.trim()}>{card.icon}</div>
                  <h3 className="problem-card__title">{card.title}</h3>
                  <p className="problem-card__text">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted home-features" id="funcionalidades">
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Funcionalidades</span>
            <h2 className="section-title">
              Da <span className="text-gradient">descoberta</span> ao acompanhamento da parceria
            </h2>
            <p className="section-subtitle">
              A experiência começa na busca e segue com organização, correspondência, proposta e
              acompanhamento.
            </p>
          </Reveal>

          <div className="features__grid">
            {featureCards.map((card) => (
              <Reveal key={card.title}>
                <div className="feature-card">
                  <div className={`feature-card__icon ${card.iconClass}`.trim()}>{card.icon}</div>
                  <div className="feature-card__content">
                    <h3 className="feature-card__title">{card.title}</h3>
                    <p className="feature-card__text">{card.text}</p>
                  </div>
                </div>
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
