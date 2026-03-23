import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const overviewIndicators = [
  {
    eyebrow: 'Base científica',
    value: '180 mil+',
    label: 'Pesquisadores ativos no Brasil',
    progress: 85,
  },
  {
    eyebrow: 'Intensidade de investimento',
    value: '1,3%',
    label: 'PIB investido em P&D',
    progress: 45,
  },
  {
    eyebrow: 'Capilaridade acadêmica',
    value: '350+',
    label: 'Universidades com pesquisa',
    progress: 72,
  },
  {
    eyebrow: 'Produção anual',
    value: '48 mil+',
    label: 'Artigos científicos por ano',
    progress: 68,
  },
]

const secondaryIndicators = [
  {
    eyebrow: 'Posicionamento global',
    value: '13º',
    label: 'Ranking em produção científica',
    progress: 60,
  },
  {
    eyebrow: 'Propriedade intelectual',
    value: '7,5 mil+',
    label: 'Patentes registradas por ano',
    progress: 38,
  },
  {
    eyebrow: 'Aplicação prática',
    value: '25%',
    label: 'Pesquisas aplicadas ao mercado',
    progress: 25,
  },
  {
    eyebrow: 'Rede de inovação',
    value: '2,2 mil+',
    label: 'Grupos de pesquisa em inovação',
    progress: 55,
  },
]

const regionalDistribution = [
  { label: 'Sudeste', value: '70%', height: '70%' },
  { label: 'Sul', value: '45%', height: '45%' },
  { label: 'Nordeste', value: '35%', height: '35%' },
  { label: 'Centro-Oeste', value: '25%', height: '25%' },
  { label: 'Norte', value: '15%', height: '15%' },
]

const areaDistribution = [
  { label: 'Engenharias', value: '80 mil', height: '80%' },
  { label: 'Saúde', value: '65 mil', height: '65%' },
  { label: 'Exatas', value: '55 mil', height: '55%' },
  { label: 'Agrárias', value: '45 mil', height: '45%' },
  { label: 'Humanas', value: '40 mil', height: '40%' },
  { label: 'Biológicas', value: '30 mil', height: '30%' },
]

function IndicatorCard({ item, shouldReduceMotion }) {
  return (
    <article className="indicador-card">
      <span className="indicador-card__eyebrow">{item.eyebrow}</span>
      <div className="indicador-card__value">{item.value}</div>
      <p className="indicador-card__label">{item.label}</p>

      <div className="indicador-card__bar" aria-hidden="true">
        <motion.div
          className="indicador-card__bar-fill"
          style={{ width: `${item.progress}%`, transformOrigin: 'left center' }}
          initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </article>
  )
}

function DistributionChart({ eyebrow, title, subtitle, items, secondary = false, shouldReduceMotion }) {
  return (
    <article className="chart-panel">
      <div className="chart-panel__head">
        <span className="chart-panel__eyebrow">{eyebrow}</span>
        <h3 className="chart-panel__title">{title}</h3>
        <p className="chart-panel__subtitle">{subtitle}</p>
      </div>

      <div className="chart-bars" aria-hidden="true">
        {items.map((item, index) => (
          <div key={item.label} className="chart-bar">
            <div className="chart-bar__track">
              <motion.div
                className={`chart-bar__fill${secondary ? ' chart-bar__fill--secondary' : ''}`}
                initial={shouldReduceMotion ? { height: item.height } : { height: '0%' }}
                whileInView={{ height: item.height }}
                viewport={{ once: true, amount: 0.4 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }
                }
              />
            </div>
            <div className="chart-bar__meta">
              <span className="chart-bar__value">{item.value}</span>
              <span className="chart-bar__label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default function IndicadoresPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="section-label">Indicadores</span>
          <h1 className="page-header__title">
            Leituras de <span className="text-gradient">pesquisa</span> e{' '}
            <span className="text-gradient">inovação</span>
          </h1>
          <p className="page-header__text">
            Um panorama visual do ecossistema que a plataforma ajuda a conectar entre indústria,
            pesquisa aplicada e capacidade de inovação.
          </p>
        </div>
      </section>

      <section className="section indicators-stage">
        <div className="container">
          <div className="indicators__grid">
            {overviewIndicators.map((item) => (
              <Reveal key={item.label}>
                <IndicatorCard item={item} shouldReduceMotion={shouldReduceMotion} />
              </Reveal>
            ))}
          </div>

          <div className="indicators__charts">
            <Reveal>
              <DistributionChart
                eyebrow="Distribuição regional"
                title="Investimento em P&D por região"
                subtitle="Participação estimada no total nacional de investimento em pesquisa e desenvolvimento."
                items={regionalDistribution}
                shouldReduceMotion={shouldReduceMotion}
              />
            </Reveal>

            <Reveal>
              <DistributionChart
                eyebrow="Distribuição por área"
                title="Pesquisadores por área de atuação"
                subtitle="Leitura comparativa entre áreas com maior massa crítica de pesquisa no país."
                items={areaDistribution}
                secondary
                shouldReduceMotion={shouldReduceMotion}
              />
            </Reveal>
          </div>

          <div className="indicators__grid indicators__grid--secondary">
            {secondaryIndicators.map((item) => (
              <Reveal key={item.label}>
                <IndicatorCard item={item} shouldReduceMotion={shouldReduceMotion} />
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
                Transforme esses sinais em <span className="text-gradient">conexões aplicadas</span>
              </h2>
              <p className="cta-box__subtitle">
                Entre na plataforma para aproximar desafio, pesquisa e decisão com mais contexto.
              </p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Cadastrar-se
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
