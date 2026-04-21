import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from '../../../components/Reveal'
import { useAuth } from '../../../context/AuthContext'
import {
  listCompanies,
  listEducations,
  listExperiences,
  listResearchers,
  listResumes,
  listSkills,
  listUniversities,
} from '../../../services/pdConnectApi'
import './IndicadoresPage.scss'

function formatMetric(value) {
  return new Intl.NumberFormat('pt-BR').format(value || 0)
}

function buildHeight(value, total) {
  if (!total) {
    return '22%'
  }

  return `${Math.max(22, Math.round((value / total) * 100))}%`
}

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
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [metrics, setMetrics] = useState({
    companies: [],
    researchers: [],
    universities: [],
    resumes: [],
    educations: [],
    experiences: [],
    skills: [],
  })

  useEffect(() => {
    let isMounted = true

    const loadMetrics = async () => {
      setLoading(true)
      setError('')

      try {
        const [
          companies,
          researchers,
          universities,
          resumes,
          educations,
          experiences,
          skills,
        ] = await Promise.all([
          listCompanies(),
          listResearchers(),
          listUniversities(),
          listResumes(),
          listEducations(),
          listExperiences(),
          listSkills(),
        ])

        if (!isMounted) {
          return
        }

        setMetrics({
          companies,
          researchers,
          universities,
          resumes,
          educations,
          experiences,
          skills,
        })
      } catch (loadFailure) {
        if (!isMounted) {
          return
        }

        setError(
          loadFailure.message || 'Não foi possível consolidar os indicadores com a base atual da API.'
        )
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadMetrics()

    return () => {
      isMounted = false
    }
  }, [])

  const companyCount = metrics.companies.length
  const researcherCount = metrics.researchers.length
  const universityCount = metrics.universities.length
  const activeCompanies = metrics.companies.filter((item) => item.status === true).length
  const availableResearchers = metrics.researchers.filter((item) => item.availability === true).length
  const activeResearchers = metrics.researchers.filter((item) => item.status === true).length

  const overviewIndicators = useMemo(() => ([
    {
      eyebrow: 'Empresas',
      value: formatMetric(companyCount),
      label: 'Cadastros disponíveis em `GET /api/companies/`',
      progress: companyCount ? 100 : 16,
    },
    {
      eyebrow: 'Pesquisadores',
      value: formatMetric(researcherCount),
      label: 'Cadastros disponíveis em `GET /api/researchers/`',
      progress: researcherCount ? 100 : 16,
    },
    {
      eyebrow: 'Universidades',
      value: formatMetric(universityCount),
      label: 'Instituições registradas em `GET /api/universities/`',
      progress: universityCount ? 100 : 16,
    },
    {
      eyebrow: 'Currículos',
      value: formatMetric(metrics.resumes.length),
      label: 'Currículos retornados por `GET /api/resumes/`',
      progress: metrics.resumes.length ? 100 : 16,
    },
  ]), [companyCount, metrics.resumes.length, researcherCount, universityCount])

  const secondaryIndicators = useMemo(() => ([
    {
      eyebrow: 'Formações',
      value: formatMetric(metrics.educations.length),
      label: 'Itens em `GET /api/educations/`',
      progress: metrics.educations.length ? 100 : 16,
    },
    {
      eyebrow: 'Experiências',
      value: formatMetric(metrics.experiences.length),
      label: 'Itens em `GET /api/experiences/`',
      progress: metrics.experiences.length ? 100 : 16,
    },
    {
      eyebrow: 'Habilidades',
      value: formatMetric(metrics.skills.length),
      label: 'Itens em `GET /api/skills/`',
      progress: metrics.skills.length ? 100 : 16,
    },
    {
      eyebrow: 'Disponibilidade',
      value: `${researcherCount ? Math.round((availableResearchers / researcherCount) * 100) : 0}%`,
      label: 'Pesquisadores marcados como disponíveis',
      progress: researcherCount ? Math.round((availableResearchers / researcherCount) * 100) : 16,
    },
  ]), [
    availableResearchers,
    metrics.educations.length,
    metrics.experiences.length,
    metrics.skills.length,
    researcherCount,
  ])

  const researchersByUniversity = useMemo(() => {
    const counts = metrics.universities.map((university) => {
      const linkedResearchers = metrics.researchers.filter(
        (researcher) => researcher.university === university.id_university
      ).length

      return {
        label: university.name,
        value: linkedResearchers,
      }
    })

    const totalLinkedResearchers = counts.reduce((sum, item) => sum + item.value, 0)

    return counts
      .sort((left, right) => right.value - left.value)
      .slice(0, 5)
      .map((item) => ({
        label: item.label,
        value: `${item.value} pesquisador(es)`,
        height: buildHeight(item.value, totalLinkedResearchers),
      }))
  }, [metrics.researchers, metrics.universities])

  const statusDistribution = useMemo(() => {
    const inactiveCompanies = companyCount - activeCompanies
    const unavailableResearchers = researcherCount - availableResearchers

    const items = [
      {
        label: 'Empresas ativas',
        value: `${activeCompanies}`,
        raw: activeCompanies,
      },
      {
        label: 'Empresas inativas',
        value: `${inactiveCompanies}`,
        raw: inactiveCompanies,
      },
      {
        label: 'Pesquisadores ativos',
        value: `${activeResearchers}`,
        raw: activeResearchers,
      },
      {
        label: 'Pesquisadores disponíveis',
        value: `${availableResearchers}`,
        raw: availableResearchers,
      },
      {
        label: 'Pesquisadores indisponíveis',
        value: `${unavailableResearchers}`,
        raw: unavailableResearchers,
      },
    ]

    const maxValue = Math.max(...items.map((item) => item.raw), 0)

    return items.map((item) => ({
      label: item.label,
      value: item.value,
      height: buildHeight(item.raw, maxValue),
    }))
  }, [activeCompanies, activeResearchers, availableResearchers, companyCount, researcherCount])

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="section-label">Indicadores</span>
          <h1 className="page-header__title">
            Leituras reais da <span className="text-gradient">base atual</span> do P&amp;D Connect
          </h1>
          <p className="page-header__text">
            Esta página deixou de usar números estáticos e passou a consolidar apenas o que a API
            realmente entrega hoje.
          </p>
        </div>
      </section>

      <section className="section indicators-stage">
        <div className="container">
          {loading ? (
            <div className="indicators-feedback">
              <h2>Carregando indicadores</h2>
              <p>Consultando os endpoints reais do backend para montar os cards e gráficos.</p>
            </div>
          ) : null}

          {!loading && error ? (
            <div className="indicators-feedback indicators-feedback--error">
              <h2>Falha ao carregar indicadores</h2>
              <p>{error}</p>
            </div>
          ) : null}

          {!loading && !error ? (
            <>
              <div className="indicadores__grid">
                {overviewIndicators.map((item) => (
                  <Reveal key={item.label}>
                    <IndicatorCard item={item} shouldReduceMotion={shouldReduceMotion} />
                  </Reveal>
                ))}
              </div>

              <div className="indicators__charts">
                <Reveal>
                  <DistributionChart
                    eyebrow="Universidades vinculadas"
                    title="Pesquisadores por universidade"
                    subtitle="Top 5 instituições pelo número de pesquisadores associados na base atual."
                    items={researchersByUniversity.length > 0 ? researchersByUniversity : [
                      { label: 'Sem dados', value: '0', height: '22%' },
                    ]}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </Reveal>

                <Reveal>
                  <DistributionChart
                    eyebrow="Status dos cadastros"
                    title="Empresas e pesquisadores por disponibilidade"
                    subtitle="Leitura combinada dos booleanos de status e disponibilidade existentes no backend."
                    items={statusDistribution}
                    secondary
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </Reveal>
              </div>

              <div className="indicadores__grid indicators__grid--secondary">
                {secondaryIndicators.map((item) => (
                  <Reveal key={item.label}>
                    <IndicatorCard item={item} shouldReduceMotion={shouldReduceMotion} />
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <Reveal>
            <div className="cta-box">
              <h2 className="cta-box__title">
                Continue a navegação com o <span className="text-gradient">backend real</span>
              </h2>
              <p className="cta-box__subtitle">
                Os próximos passos prontos hoje são cadastro, exploração da base e edição de
                perfil conforme os endpoints existentes.
              </p>
              <div className="cta-box__buttons">
                {isAuthenticated ? (
                  <>
                    <Link to="/pesquisa" className="btn btn-primary btn-lg">
                      Abrir painel integrado
                    </Link>
                    <Link to="/perfil" className="btn btn-outline btn-lg">
                      Editar perfil
                    </Link>
                  </>
                ) : (
                  <Link to="/login" className="btn btn-primary btn-lg">
                    Entrar na plataforma
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
