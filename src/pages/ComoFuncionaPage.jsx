import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function ComoFuncionaPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <span className="section-label">Como Funciona</span>
          <h1 className="page-header__title">Do <span className="text-gradient">desafio</span> à <span className="text-gradient">solução</span></h1>
          <p className="page-header__text">Entenda o fluxo completo da plataforma, desde o cadastro até a conclusão de parcerias de sucesso.</p>
        </div>
      </section>

      {/* FLOW TIMELINE */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Fluxo da Plataforma</span>
            <h2 className="section-title">Passo a <span className="text-gradient">passo</span></h2>
          </Reveal>

          <div className="flow-timeline">
            <Reveal>
              <div className="flow-item">
                <div className="flow-item__dot"></div>
                <h3 className="flow-item__title">1. Cadastro de Perfis</h3>
                <p className="flow-item__text">
                  <strong style={{ color: 'var(--accent-primary)' }}>Empresas</strong> registram informações como setor de atuação, porte, desafios tecnológicos enfrentados, orçamento para projetos de inovação e localização.<br /><br />
                  <strong style={{ color: 'var(--accent-secondary)' }}>Pesquisadores</strong> cadastram suas áreas de atuação, projetos desenvolvidos, instituição de vínculo e interesse em parceria com empresas.
                </p>
                <div className="flow-item__list">
                  <span className="flow-item__tag">Setor de Atuação</span>
                  <span className="flow-item__tag">Projetos</span>
                  <span className="flow-item__tag">Desafios</span>
                  <span className="flow-item__tag">Localização</span>
                  <span className="flow-item__tag">Expertise</span>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="flow-item">
                <div className="flow-item__dot"></div>
                <h3 className="flow-item__title">2. Matchmaking Inteligente</h3>
                <p className="flow-item__text">
                  O sistema cruza automaticamente as informações cadastradas, considerando área de pesquisa, mineração de palavras-chave e tipo de problema tecnológico. A plataforma utiliza busca semântica com Elasticsearch e IA para sugerir as melhores conexões por ranking de relevância.
                </p>
                <div className="flow-item__list">
                  <span className="flow-item__tag">Busca Semântica</span>
                  <span className="flow-item__tag">IA Matchmaking</span>
                  <span className="flow-item__tag">Palavras-chave</span>
                  <span className="flow-item__tag">Ranking</span>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="flow-item">
                <div className="flow-item__dot"></div>
                <h3 className="flow-item__title">3. Envio de Propostas</h3>
                <p className="flow-item__text">
                  Pesquisadores respondem a demandas com propostas de parceria detalhadas, incluindo resumo da abordagem, cronograma de execução e metodologia. As empresas podem avaliar e selecionar as propostas mais adequadas.
                </p>
                <div className="flow-item__list">
                  <span className="flow-item__tag">Resumo</span>
                  <span className="flow-item__tag">Cronograma</span>
                  <span className="flow-item__tag">Metodologia</span>
                  <span className="flow-item__tag">Avaliação</span>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="flow-item">
                <div className="flow-item__dot"></div>
                <h3 className="flow-item__title">4. Acompanhamento do Projeto</h3>
                <p className="flow-item__text">
                  Acompanhe o status das propostas em tempo real: <strong>pendente</strong>, <strong>aceita</strong>, <strong>recusada</strong>, <strong>em andamento</strong> ou <strong>concluída</strong>. Todas as partes envolvidas têm visibilidade completa do progresso.
                </p>
                <div className="flow-item__list">
                  <span className="flow-item__tag" style={{ background: 'rgba(180, 150, 20, 0.12)', color: '#9a8415' }}>Pendente</span>
                  <span className="flow-item__tag" style={{ background: 'rgba(58, 138, 92, 0.12)', color: 'var(--accent-green)' }}>Aceita</span>
                  <span className="flow-item__tag" style={{ background: 'var(--accent-primary-dim)', color: 'var(--accent-primary)' }}>Em Andamento</span>
                  <span className="flow-item__tag" style={{ background: 'var(--accent-secondary-dim)', color: 'var(--accent-secondary)' }}>Concluída</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURES HIGHLIGHT */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Recursos Adicionais</span>
            <h2 className="section-title">Mais do que <span className="text-gradient">conexões</span></h2>
          </Reveal>

          <div className="features__grid">
            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon">🧭</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Sinais de Compatibilidade</h3>
                  <p className="feature-card__text">A plataforma destaca aderência entre perfis, desafios e temas para tornar a descoberta mais objetiva e contextualizada.</p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--secondary">📊</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Dashboard de Indicadores</h3>
                  <p className="feature-card__text">Visualize dados sobre pesquisadores, investimentos em P&D e comparações regionais para entender o cenário de inovação.</p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--warm">🔐</div>
                <div className="feature-card__content">
                  <h3 className="feature-card__title">Segurança de Dados</h3>
                  <p className="feature-card__text">Todas as informações são armazenadas com segurança, garantindo a privacidade de empresas e pesquisadores.</p>
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
              <h2 className="cta-box__title">Comece <span className="text-gradient">agora</span></h2>
              <p className="cta-box__subtitle">Cadastre-se e descubra oportunidades de inovação esperando por você.</p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">Criar Conta Gratuita</Link>
                <Link to="/indicadores" className="btn btn-outline btn-lg">Ver Indicadores</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
