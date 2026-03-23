import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

/* ── Animated Counter ── */
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const animated = useRef(false)

  const animate = useCallback(() => {
    if (animated.current || !ref.current) return
    animated.current = true
    const duration = 2000
    const start = performance.now()

    function update(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * target)
      if (ref.current) {
        ref.current.textContent = prefix + current.toLocaleString('pt-BR') + suffix
      }
      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  }, [target, suffix, prefix])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate])

  return <div ref={ref} className="indicador-card__value">0</div>
}

/* ── Animated Bar ── */
function AnimatedBar({ width }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.width = '0%'
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.width = width
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [width])

  return <div ref={ref} className="indicador-card__bar-fill" style={{ width: '0%' }}></div>
}

/* ── Chart Bar ── */
function ChartBar({ height, label, secondary = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.height = '0%'
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.height = height
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [height])

  return (
    <div className="chart-bar">
      <div
        ref={ref}
        className={`chart-bar__fill${secondary ? ' chart-bar__fill--secondary' : ''}`}
        style={{ height: '0%' }}
      ></div>
      <div className="chart-bar__label">{label}</div>
    </div>
  )
}

export default function IndicadoresPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <span className="section-label">Dashboard</span>
          <h1 className="page-header__title">Indicadores de <span className="text-gradient">Inovação</span></h1>
          <p className="page-header__text">Dados e estatísticas sobre pesquisa, desenvolvimento e inovação no Brasil.</p>
        </div>
      </section>

      {/* INDICADORES */}
      <section className="section">
        <div className="container">
          <div className="indicadores__grid">
            <Reveal>
              <div className="indicador-card">
                <AnimatedCounter target={180000} suffix="+" />
                <div className="indicador-card__label">Pesquisadores Ativos no Brasil</div>
                <div className="indicador-card__bar">
                  <AnimatedBar width="85%" />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="indicador-card">
                <AnimatedCounter target={1} suffix=",3%" prefix="R$ " />
                <div className="indicador-card__label">PIB investido em P&D</div>
                <div className="indicador-card__bar">
                  <AnimatedBar width="45%" />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="indicador-card">
                <AnimatedCounter target={350} suffix="+" />
                <div className="indicador-card__label">Universidades com Pesquisa</div>
                <div className="indicador-card__bar">
                  <AnimatedBar width="72%" />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="indicador-card">
                <AnimatedCounter target={48000} suffix="+" />
                <div className="indicador-card__label">Artigos Científicos/Ano</div>
                <div className="indicador-card__bar">
                  <AnimatedBar width="68%" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* BAR CHART 1 */}
          <Reveal>
            <div className="chart-container">
              <h3 className="chart-container__title">Investimento em P&D por Região (% do total)</h3>
              <div className="chart-bars">
                <ChartBar height="70%" label="Sudeste" />
                <ChartBar height="45%" label="Sul" />
                <ChartBar height="35%" label="Nordeste" />
                <ChartBar height="25%" label="Centro-Oeste" />
                <ChartBar height="15%" label="Norte" />
              </div>
            </div>
          </Reveal>

          {/* BAR CHART 2 */}
          <Reveal>
            <div className="chart-container" style={{ marginTop: '24px' }}>
              <h3 className="chart-container__title">Número de Pesquisadores por Área (em milhares)</h3>
              <div className="chart-bars">
                <ChartBar height="80%" label="Engenharias" secondary />
                <ChartBar height="65%" label="Ciências da Saúde" secondary />
                <ChartBar height="55%" label="Exatas" secondary />
                <ChartBar height="45%" label="Agrárias" secondary />
                <ChartBar height="40%" label="Humanas" secondary />
                <ChartBar height="30%" label="Biológicas" secondary />
              </div>
            </div>
          </Reveal>

          {/* MORE INDICATORS */}
          <div className="indicadores__grid" style={{ marginTop: '40px' }}>
            <Reveal>
              <div className="indicador-card">
                <AnimatedCounter target={13} suffix="º" />
                <div className="indicador-card__label">Ranking Global em Produção Científica</div>
                <div className="indicador-card__bar">
                  <AnimatedBar width="60%" />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="indicador-card">
                <AnimatedCounter target={7500} suffix="+" />
                <div className="indicador-card__label">Patentes Registradas/Ano</div>
                <div className="indicador-card__bar">
                  <AnimatedBar width="38%" />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="indicador-card">
                <AnimatedCounter target={25} suffix="%" />
                <div className="indicador-card__label">Pesquisas Aplicadas ao Mercado</div>
                <div className="indicador-card__bar">
                  <AnimatedBar width="25%" />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="indicador-card">
                <AnimatedCounter target={2200} suffix="+" />
                <div className="indicador-card__label">Grupos de Pesquisa em Inovação</div>
                <div className="indicador-card__bar">
                  <AnimatedBar width="55%" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <Reveal>
            <div className="cta-box">
              <h2 className="cta-box__title">Contribua para esses <span className="text-gradient">números</span></h2>
              <p className="cta-box__subtitle">Faça parte da rede que está transformando a inovação no Brasil.</p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">Cadastre-se Agora</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
