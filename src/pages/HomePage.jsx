import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

/* ── Reveal wrapper ── */
function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/* ── Spline Patch ── */
function patchSpline() {
  const viewer = document.querySelector('spline-viewer')
  if (!viewer) return

  const isSceneElement = (el) => {
    if (el.tagName === 'CANVAS') return true
    if (el.querySelector && el.querySelector('canvas')) return true
    return false
  }

  const hide = () => {
    const root = viewer.shadowRoot
    if (!root) return

    root.querySelectorAll('canvas').forEach((c) => {
      c.style.cssText += 'background:transparent!important;background-color:transparent!important;'
    })

    root.querySelectorAll('a, img').forEach((el) => {
      el.style.cssText = 'display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;width:0!important;height:0!important;overflow:hidden!important;'
    })

    root.querySelectorAll('div, span, p').forEach((el) => {
      if (isSceneElement(el)) return
      const cs = getComputedStyle(el)
      if (cs.position === 'absolute' || cs.position === 'fixed') {
        el.style.cssText += 'display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;'
      }
    })

    if (!root.querySelector('#spline-kill')) {
      const s = document.createElement('style')
      s.id = 'spline-kill'
      s.textContent = `
        canvas { background: transparent !important; }
        a, img, [class*="logo"], [class*="watermark"], [class*="hint"] {
          display: none !important; opacity: 0 !important; visibility: hidden !important;
          width: 0 !important; height: 0 !important; pointer-events: none !important;
        }
      `
      root.appendChild(s)
    }
  }

  hide()
  ;[100, 400, 800, 1500, 3000, 5000].forEach((t) => setTimeout(hide, t))
  viewer.addEventListener('load', () => {
    hide()
    setTimeout(hide, 300)
  })

  setTimeout(() => {
    if (viewer.shadowRoot) {
      new MutationObserver(hide).observe(viewer.shadowRoot, { childList: true, subtree: true })
    }
  }, 300)
}

export default function HomePage() {
  const splineLoaded = useRef(false)

  useEffect(() => {
    if (!splineLoaded.current) {
      splineLoaded.current = true
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@splinetool/viewer@1.12.69/build/spline-viewer.js'
      document.head.appendChild(script)
      script.onload = () => setTimeout(patchSpline, 500)
    } else {
      setTimeout(patchSpline, 500)
    }
  }, [])

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" id="hero">
        <div className="hero__bg-glow"></div>
        <div className="hero__bg-glow hero__bg-glow--right"></div>

        <div className="container">
          <div className="hero__content">
            <div className="hero__badge">
              <span className="badge-dot"></span>
              Alinhado com ODS 9 — Indústria, Inovação e Infraestrutura
            </div>

            <h1 className="hero__title">
              Onde a <span className="text-gradient highlight">ciência</span> encontra o <span className="text-gradient highlight">mercado</span>
            </h1>

            <p className="hero__description">
              Conectamos empresas que enfrentam desafios tecnológicos a pesquisadores capazes de oferecer soluções inovadoras. Uma ponte entre o conhecimento acadêmico e as necessidades reais do setor produtivo.
            </p>

            <div className="hero__cta">
              <Link to="/login" className="btn btn-primary btn-lg">
                <span className="btn-icon">🚀</span>
                Comece Agora
              </Link>
              <Link to="/como-funciona" className="btn btn-outline btn-lg">
                Saiba Mais →
              </Link>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-number">500+</div>
                <div className="hero__stat-label">Pesquisadores</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">120+</div>
                <div className="hero__stat-label">Empresas</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-number">85+</div>
                <div className="hero__stat-label">Projetos Conectados</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Spline Orb */}
          <div className="hero__visual">
            <spline-viewer
              url="https://prod.spline.design/Q71vslsA72RPUfzu/scene.splinecode"
              loading-anim-type="none"
              background="transparent"
            ></spline-viewer>
          </div>
        </div>
      </section>

      {/* ═══════════ PROBLEMS ═══════════ */}
      <section className="section problems" id="problemas">
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">O Desafio</span>
            <h2 className="section-title">A desconexão entre <span className="text-gradient">conhecimento</span> e <span className="text-gradient">indústria</span></h2>
            <p className="section-subtitle">O Brasil produz ciência de ponta, mas grande parte dela nunca chega ao mercado. Identificamos os principais obstáculos.</p>
          </Reveal>

          <div className="problems__grid">
            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--cyan">🔗</div>
                <h3 className="problem-card__title">Falta de Integração</h3>
                <p className="problem-card__text">Universidades e empresas operam em universos separados, sem canais de comunicação eficientes para colaboração.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--purple">📊</div>
                <h3 className="problem-card__title">Baixo Investimento em P&D</h3>
                <p className="problem-card__text">Muitas empresas ainda não investem em pesquisa e desenvolvimento por desconhecimento das oportunidades disponíveis.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--pink">🔍</div>
                <h3 className="problem-card__title">Acesso Difícil a Especialistas</h3>
                <p className="problem-card__text">Encontrar pesquisadores especializados em áreas específicas é um processo demorado e pouco estruturado.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--cyan">👁️</div>
                <h3 className="problem-card__title">Pesquisas Invisíveis</h3>
                <p className="problem-card__text">Pesquisas com alto potencial de aplicação prática permanecem desconhecidas pelo setor produtivo.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--purple">💰</div>
                <h3 className="problem-card__title">Financiamento Disperso</h3>
                <p className="problem-card__text">Editais e oportunidades de financiamento são difíceis de encontrar e acompanhar de forma centralizada.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--pink">⚡</div>
                <h3 className="problem-card__title">Desperdício de Conhecimento</h3>
                <p className="problem-card__text">A desconexão gera desperdício de capital intelectual e reduz a capacidade de inovação do país.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="section" id="como-funciona">
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Como Funciona</span>
            <h2 className="section-title">Simples, rápido e <span className="text-gradient">eficiente</span></h2>
            <p className="section-subtitle">Três passos para transformar desafios em oportunidades de inovação.</p>
          </Reveal>

          <div className="how-it-works__steps">
            <Reveal>
              <div className="step-card">
                <div className="step-card__number">1</div>
                <h3 className="step-card__title">Cadastre-se</h3>
                <p className="step-card__text">Empresas registram seus desafios tecnológicos. Pesquisadores apresentam suas áreas de expertise e projetos.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="step-card">
                <div className="step-card__number">2</div>
                <h3 className="step-card__title">Matchmaking IA</h3>
                <p className="step-card__text">Nossa inteligência artificial cruza dados e sugere as melhores conexões entre problemas e soluções.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="step-card">
                <div className="step-card__number">3</div>
                <h3 className="step-card__title">Colabore</h3>
                <p className="step-card__text">Inicie parcerias, envie propostas e acompanhe o progresso dos projetos em tempo real.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="section" id="funcionalidades" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Funcionalidades</span>
            <h2 className="section-title">Tudo que você precisa em <span className="text-gradient">um só lugar</span></h2>
            <p className="section-subtitle">Ferramentas poderosas para impulsionar a inovação e facilitar conexões estratégicas.</p>
          </Reveal>

          <div className="features__grid">
            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon">👥</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Cadastro Inteligente</h3>
                  <p className="feature-card__text">Perfis detalhados para pesquisadores e empresas com áreas de atuação, projetos e desafios.</p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--secondary">🤖</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Matchmaking com IA</h3>
                  <p className="feature-card__text">Recomendações automáticas de pesquisadores para demandas baseadas em compatibilidade.</p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--warm">🔎</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Busca Semântica</h3>
                  <p className="feature-card__text">Encontre soluções por área, setor, tecnologia e localização com ranking de relevância.</p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon">📋</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Propostas & Acompanhamento</h3>
                  <p className="feature-card__text">Envie propostas com cronograma e metodologia. Acompanhe o status em tempo real.</p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--secondary">📢</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Mural de Editais</h3>
                  <p className="feature-card__text">Editais públicos, programas de incentivo e oportunidades de financiamento centralizados.</p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--warm">📈</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Dashboard de Indicadores</h3>
                  <p className="feature-card__text">Visualize dados sobre inovação, investimentos em P&D e comparações regionais.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="section cta-section">
        <div className="container">
          <Reveal>
            <div className="cta-box">
              <h2 className="cta-box__title">Pronto para <span className="text-gradient">inovar</span>?</h2>
              <p className="cta-box__subtitle">Junte-se a centenas de empresas e pesquisadores que já estão transformando desafios em oportunidades.</p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">
                  <span className="btn-icon">🏢</span>
                  Sou Empresa
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg">
                  <span className="btn-icon">🎓</span>
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
