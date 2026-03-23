import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

function Reveal({ children, className = '' }) {
  const ref = useReveal()

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

const heroSuggestions = ['IA', 'Renato', 'Charles', 'sustentável']

const heroSignals = [
  { value: '500+', label: 'perfis técnicos e científicos mapeados' },
  { value: '120+', label: 'desafios e demandas com contexto' },
  { value: '85+', label: 'conexões sugeridas com aderência' },
]

const heroSupportCards = [
  {
    eyebrow: 'Empresas',
    title: 'Publiquem desafios com contexto e encontrem especialistas aderentes.',
    text: 'A busca aproxima problema, setor, tecnologia e maturidade em uma experiência mais objetiva.',
  },
  {
    eyebrow: 'Pesquisadores',
    title: 'Descubram demandas reais compatíveis com sua linha de pesquisa.',
    text: 'A plataforma destaca oportunidades aplicadas e abre caminho para propostas de parceria mais qualificadas.',
  },
  {
    eyebrow: 'Oportunidades',
    title: 'Cruzem a mesma busca com indicadores, aderência e sinais do ecossistema.',
    text: 'Mais contexto ajuda a apoiar decisão, conexão e avanço dos projetos com mais segurança.',
  },
]

const searchPreviewScenarios = {
  ia: [
    {
      id: 'ia-renato',
      kind: 'pesquisador',
      title: 'Renato Silva',
      description: 'Especialista em IA aplicada à indústria e manutenção preditiva.',
      meta: 'Universidade Federal • Visão computacional e automação',
    },
    {
      id: 'ia-technova',
      kind: 'empresa',
      title: 'Empresa TechNova',
      description: 'Busca automação com IA para reduzir falhas e gargalos na produção.',
      meta: 'Desafio ativo • Manufatura avançada',
    },
    {
      id: 'ia-logistica',
      kind: 'projeto',
      title: 'Projeto: IA para otimização logística',
      description: 'Solução para prever rotas, reduzir custos operacionais e ganhar escala.',
      meta: 'Solução aplicada • Supply chain industrial',
    },
  ],
  renato: [
    {
      id: 'renato-profile',
      kind: 'pesquisador',
      title: 'Renato Silva',
      description: 'Pesquisador em IA industrial com foco em inspeção visual e predição de falhas.',
      meta: 'Linhas de pesquisa • Automação e dados',
    },
    {
      id: 'renato-demand',
      kind: 'empresa',
      title: 'Empresa MetalForge',
      description: 'Procura parceiro para visão computacional em controle de qualidade fabril.',
      meta: 'Demanda aberta • Indústria metalmecânica',
    },
    {
      id: 'renato-solution',
      kind: 'projeto',
      title: 'Projeto: Diagnóstico preditivo para linhas de usinagem',
      description: 'Combina sensores e IA para antecipar manutenção e reduzir parada de máquina.',
      meta: 'Parceria sugerida • Aplicação industrial',
    },
  ],
  charles: [
    {
      id: 'charles-profile',
      kind: 'pesquisador',
      title: 'Charles Almeida',
      description: 'Especialista em manufatura avançada, materiais inteligentes e prototipagem.',
      meta: 'Instituição de pesquisa • Materiais e processos',
    },
    {
      id: 'charles-demand',
      kind: 'empresa',
      title: 'Empresa BioForge',
      description: 'Busca pesquisador para escalar novos materiais com aplicação industrial.',
      meta: 'Oportunidade ativa • Novos materiais',
    },
    {
      id: 'charles-solution',
      kind: 'projeto',
      title: 'Projeto: Plataforma de rastreabilidade para P&D colaborativo',
      description: 'Integra testes, protótipos e marcos técnicos em um fluxo único de inovação.',
      meta: 'Solução colaborativa • Desenvolvimento tecnológico',
    },
  ],
  sustentavel: [
    {
      id: 'sustentavel-profile',
      kind: 'pesquisador',
      title: 'Larissa Costa',
      description: 'Pesquisadora em materiais sustentáveis, economia circular e embalagens.',
      meta: 'Pesquisa aplicada • Sustentabilidade industrial',
    },
    {
      id: 'sustentavel-demand',
      kind: 'empresa',
      title: 'Empresa VerdeVale',
      description: 'Busca solução para embalagens de baixo impacto e redução de resíduos.',
      meta: 'Desafio estratégico • Cadeia de alimentos',
    },
    {
      id: 'sustentavel-solution',
      kind: 'projeto',
      title: 'Projeto: Bioembalagem sustentável para cadeia de alimentos',
      description: 'Alternativa com menor impacto ambiental e maior aderência a exigências regulatórias.',
      meta: 'Solução em desenvolvimento • Economia circular',
    },
  ],
}

const searchPreviewPool = Object.values(searchPreviewScenarios).flat()

const resultKindLabels = {
  pesquisador: 'Pesquisador',
  empresa: 'Empresa',
  projeto: 'Projeto / Solução',
}

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function getSearchPreviewResults(query) {
  const normalizedQuery = normalizeText(query)

  if (normalizedQuery.length < 2) {
    return []
  }

  const directScenario = Object.entries(searchPreviewScenarios).find(([trigger]) => (
    normalizedQuery.includes(trigger) || trigger.includes(normalizedQuery)
  ))

  if (directScenario) {
    return directScenario[1]
  }

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean)

  return searchPreviewPool
    .map((result) => {
      const haystack = normalizeText(
        [result.title, result.description, result.meta, result.kind].join(' ')
      )

      const score = tokens.reduce((total, token) => (
        haystack.includes(token) ? total + Math.max(1, token.length - 1) : total
      ), 0)

      return { ...result, score }
    })
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
}

export default function HomePage() {
  const searchPanelRef = useRef(null)
  const searchInputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)

  const previewResults = getSearchPreviewResults(searchQuery)
  const hasSearchQuery = searchQuery.trim().length > 0
  const showSearchPreview = isSearchActive && hasSearchQuery

  const applySuggestion = (suggestion) => {
    setSearchQuery(suggestion)
    setIsSearchActive(true)

    requestAnimationFrame(() => {
      if (!searchInputRef.current) return
      searchInputRef.current.focus()
      searchInputRef.current.setSelectionRange(suggestion.length, suggestion.length)
    })
  }

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!searchPanelRef.current?.contains(event.target)) {
        setIsSearchActive(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSearchActive(false)
        searchInputRef.current?.blur()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero__bg-glow"></div>
        <div className="hero__bg-glow hero__bg-glow--right"></div>

        <div className="container">
          <div className="hero__content">
            <div className="hero__badge">
              <span className="badge-dot"></span>
              ODS 9 | Pesquisa, indústria e inovação conectadas
            </div>

            <h1 className="hero__title">
              Busque a conexão certa entre empresas com desafios e pesquisadores com soluções
            </h1>

            <p className="hero__description">
              A Innovare transforma a busca no ponto de encontro entre desafios tecnológicos,
              expertise científica e oportunidades de inovação. Pesquise um nome, tema ou
              tecnologia e veja conexões relevantes no mesmo fluxo.
            </p>
          </div>

          <div className="hero__search-wrap">
            <p className="hero__search-lead">
              Digite um nome, uma tecnologia ou um tema e veja a plataforma conectar demanda,
              especialista e solução em segundos.
            </p>

            <div ref={searchPanelRef} className="hero-search">
              <form
                className="hero-search__form"
                onSubmit={(event) => {
                  event.preventDefault()
                  setIsSearchActive(true)
                }}
              >
                <div className="hero-search__shell">
                  <label className="sr-only" htmlFor="hero-search">
                    Buscar desafios, pesquisadores e soluções
                  </label>
                  <span className="hero-search__icon" aria-hidden="true">
                    Busca
                  </span>

                  <input
                    id="hero-search"
                    ref={searchInputRef}
                    type="text"
                    className="hero-search__input"
                    value={searchQuery}
                    onChange={(event) => {
                      setSearchQuery(event.target.value)
                      setIsSearchActive(true)
                    }}
                    onFocus={() => setIsSearchActive(true)}
                    placeholder="Digite IA, Renato, Charles ou sustentável"
                  />

                  <button type="submit" className="hero-search__button">
                    Explorar conexões
                  </button>
                </div>
              </form>

              {showSearchPreview && (
                <div className="hero-search__dropdown" role="listbox" aria-live="polite">
                  <div className="hero-search__dropdown-head">
                    <div>
                      <p className="hero-search__dropdown-eyebrow">Conexões sugeridas</p>
                      <p className="hero-search__dropdown-title">
                        Pesquisador, empresa e solução relacionados à sua busca
                      </p>
                    </div>

                    <span className="hero-search__dropdown-query">
                      {searchQuery.trim()}
                    </span>
                  </div>

                  {previewResults.length > 0 ? (
                    <div className="hero-search__results">
                      {previewResults.map((result) => (
                        <article key={result.id} className="hero-search__result" role="option">
                          <span
                            className={`hero-search__result-badge hero-search__result-badge--${result.kind}`}
                          >
                            {resultKindLabels[result.kind]}
                          </span>

                          <div className="hero-search__result-content">
                            <h3 className="hero-search__result-title">{result.title}</h3>
                            <p className="hero-search__result-text">{result.description}</p>
                            <p className="hero-search__result-meta">{result.meta}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="hero-search__empty">
                      <p className="hero-search__empty-title">
                        Nenhuma prévia pronta para esse termo.
                      </p>
                      <p className="hero-search__empty-text">
                        Entre na plataforma para explorar mais perfis, desafios e oportunidades
                        relacionadas à sua busca.
                      </p>
                    </div>
                  )}

                  <Link to="/login" className="hero-search__more">
                    + ver mais resultados
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="hero__support">
            <div className="hero-search__footer">
              <span className="hero-search__hint">Experimente com:</span>

              <div className="hero-search__suggestions">
                {heroSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="hero-search__suggestion"
                    onClick={() => applySuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero__support-meta">
              <div className="hero__actions">
                <Link to="/login" className="hero__text-link">
                  Publicar um desafio
                </Link>
                <Link to="/como-funciona" className="hero__text-link">
                  Ver como funciona
                </Link>
              </div>
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

            <div className="hero__signals">
              {heroSignals.map((signal) => (
                <div key={signal.label} className="hero__signal">
                  <div className="hero__signal-value">{signal.value}</div>
                  <div className="hero__signal-label">{signal.label}</div>
                </div>
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
              A desconexão entre <span className="text-gradient">conhecimento</span> e{' '}
              <span className="text-gradient">indústria</span>
            </h2>
            <p className="section-subtitle">
              O Brasil produz ciência de ponta, mas grande parte dela nunca chega ao mercado.
              Identificamos os principais obstáculos.
            </p>
          </Reveal>

          <div className="problems__grid">
            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--cyan">🔗</div>
                <h3 className="problem-card__title">Falta de Integração</h3>
                <p className="problem-card__text">
                  Universidades e empresas operam em universos separados, sem canais de comunicação
                  eficientes para colaboração.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--purple">📊</div>
                <h3 className="problem-card__title">Baixo Investimento em P&amp;D</h3>
                <p className="problem-card__text">
                  Muitas empresas ainda não investem em pesquisa e desenvolvimento por
                  desconhecimento das oportunidades disponíveis.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--pink">🔍</div>
                <h3 className="problem-card__title">Acesso Difícil a Especialistas</h3>
                <p className="problem-card__text">
                  Encontrar pesquisadores especializados em áreas específicas é um processo demorado
                  e pouco estruturado.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--cyan">👁️</div>
                <h3 className="problem-card__title">Pesquisas Invisíveis</h3>
                <p className="problem-card__text">
                  Pesquisas com alto potencial de aplicação prática permanecem desconhecidas pelo
                  setor produtivo.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--purple">💰</div>
                <h3 className="problem-card__title">Decisão Sem Contexto</h3>
                <p className="problem-card__text">
                  Sem sinais claros de aderência, maturidade e prioridade, boas conexões demoram
                  mais para acontecer.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="problem-card">
                <div className="problem-card__icon problem-card__icon--pink">⚡</div>
                <h3 className="problem-card__title">Desperdício de Conhecimento</h3>
                <p className="problem-card__text">
                  A desconexão gera desperdício de capital intelectual e reduz a capacidade de
                  inovação do país.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="funcionalidades" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Funcionalidades</span>
            <h2 className="section-title">
              Da <span className="text-gradient">busca</span> ao acompanhamento da parceria
            </h2>
            <p className="section-subtitle">
              A experiência começa na descoberta e segue com organização, recomendação e
              acompanhamento.
            </p>
          </Reveal>

          <div className="features__grid">
            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon">👥</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Perfis Estruturados</h3>
                  <p className="feature-card__text">
                    Empresas e pesquisadores apresentam competências, desafios, histórico e áreas de
                    atuação com clareza.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--secondary">🤝</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Matchmaking com Contexto</h3>
                  <p className="feature-card__text">
                    A plataforma ajuda a aproximar demanda e pesquisa com base em aderência,
                    especialidade e oportunidade.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--warm">🔎</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Busca Semântica</h3>
                  <p className="feature-card__text">
                    Encontre soluções por área, setor, tecnologia, localização e vocabulário do
                    problema real.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon">📋</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Propostas e Acompanhamento</h3>
                  <p className="feature-card__text">
                    Envie propostas com cronograma e metodologia. Acompanhe o status de cada
                    conexão com transparência.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--secondary">📢</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Sinais de Compatibilidade</h3>
                  <p className="feature-card__text">
                    Indicadores e sinais de aderência ajudam a priorizar conexões mais relevantes
                    com menos ruído.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--warm">📈</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Indicadores Estratégicos</h3>
                  <p className="feature-card__text">
                    Visualize dados sobre inovação, investimento em P&amp;D e oportunidades para
                    orientar decisões com mais contexto.
                  </p>
                </div>
              </div>
            </Reveal>
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
