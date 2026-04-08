import { Link } from 'react-router-dom'
import Reveal from '../../../components/Reveal'
import './SobrePage.scss'

const aboutHighlights = [
  {
    title: 'Desafios com contexto',
    text: 'Demandas ficam mais claras, priorizadas e aderentes ao problema real.',
  },
  {
    title: 'Especialistas com aderência',
    text: 'Perfis aparecem por área, experiência e potencial de colaboração.',
  },
  {
    title: 'Decisão com apoio',
    text: 'Indicadores e sinais do ecossistema ajudam a transformar busca em parceria.',
  },
]

const aboutPillars = [
  {
    eyebrow: 'Conexão qualificada',
    title: 'Empresas e pesquisadores no mesmo fluxo.',
    text: 'Organiza problema, setor e perfil técnico para tornar a conexão mais objetiva.',
  },
  {
    eyebrow: 'Desafios tecnológicos',
    title: 'Demandas reais ganham clareza e direção.',
    text: 'Estrutura desafios e ajuda a priorizar parceiros mais aderentes.',
  },
  {
    eyebrow: 'Propostas e soluções',
    title: 'A colaboração evolui para proposta concreta.',
    text: 'Permite responder demandas com método, proposta e parceria aplicada.',
  },
  {
    eyebrow: 'Dados e indicadores',
    title: 'Decisões ficam mais maduras e seguras.',
    text: 'Amplia o contexto da busca e orienta próximos passos com mais segurança.',
  },
]

const aboutOdsFacts = [
  {
    label: 'Meta 9.5',
    text: 'Fortalecer a pesquisa científica e ampliar capacidades tecnológicas com incentivo à inovação.',
  },
  {
    label: 'Impacto esperado',
    text: 'Aproximar universidade e mercado para ampliar a aplicação prática do conhecimento.',
  },
]

export default function SobrePage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero__glow"></div>
        <div className="about-hero__glow about-hero__glow--right"></div>

        <div className="container">
          <Reveal>
            <div className="about-hero__intro">
              <div className="about-hero__content">
                <div className="about-hero__badge">
                  <span className="badge-dot"></span>
                  Sobre a P&amp;D Connect
                </div>

                <h1 className="about-hero__title">Pesquisa aplicada conectada à indústria.</h1>

                <div className="about-hero__body">
                  <p className="about-hero__text">
                    A P&amp;D Connect aproxima empresas com desafios tecnológicos de pesquisadores
                    capazes de responder com conhecimento e proposta aplicada.
                  </p>

                  <div className="about-hero__support-block">
                    <span className="about-hero__support-label">Menos dispersão, mais clareza</span>
                    <p className="about-hero__support">
                      Problema, especialista e oportunidade passam a coexistir em um fluxo mais
                      claro de descoberta e colaboração.
                    </p>
                  </div>
                </div>

                <div className="about-hero__highlights">
                  {aboutHighlights.map((item, index) => (
                    <article key={item.title} className="about-hero__highlight">
                      <div className="about-hero__highlight-top">
                        <span className="about-hero__highlight-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h2 className="about-hero__highlight-title">{item.title}</h2>
                      </div>
                      <p className="about-hero__highlight-text">{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Pilares da plataforma</span>
            <h2 className="section-title">Problema, expertise e decisão no mesmo fluxo.</h2>
            <p className="section-subtitle">
              A plataforma organiza demanda, parceria e direcionamento em uma leitura mais
              objetiva.
            </p>
          </Reveal>

          <div className="about-pillars">
            {aboutPillars.map((pillar, index) => (
              <Reveal key={pillar.title}>
                <article className="about-pillar-card">
                  <div className="about-pillar-card__top">
                    <span className="about-pillar-card__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="about-pillar-card__eyebrow">{pillar.eyebrow}</span>
                  </div>

                  <h3 className="about-pillar-card__title">{pillar.title}</h3>
                  <p className="about-pillar-card__text">{pillar.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-ods-section">
        <div className="container">
          <Reveal>
            <div className="about-ods-panel">
              <div className="about-ods-panel__intro">
                <span className="section-label">ODS 9</span>
                <h2 className="section-title about-ods-panel__title">
                  Alinhada à indústria e à pesquisa aplicada.
                </h2>
              </div>

              <div className="about-ods-panel__body">
                <div className="about-ods-panel__content">
                  <p className="section-subtitle about-ods-panel__text">
                    A plataforma reduz a distância entre produção científica e demanda produtiva ao
                    aproximar empresas, pesquisadores e oportunidades com mais contexto.
                  </p>
                  <p className="about-ods-panel__text about-ods-panel__text--secondary">
                    Esse movimento se conecta à Meta 9.5 da ODS 9, fortalecendo pesquisa
                    científica, capacidade tecnológica e inovação com impacto.
                  </p>
                </div>

                <div className="about-ods-panel__facts">
                  {aboutOdsFacts.map((fact) => (
                    <div key={fact.label} className="about-ods-panel__fact">
                      <span className="about-ods-panel__fact-label">{fact.label}</span>
                      <p className="about-ods-panel__fact-text">{fact.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <Reveal>
            <div className="cta-box">
              <h2 className="cta-box__title">
                Leve sua demanda ou pesquisa para um fluxo mais{' '}
                <span className="text-gradient">conectado</span>
              </h2>
              <p className="cta-box__subtitle">
                Cadastre-se e transforme desafio, expertise e oportunidade em colaboração aplicada.
              </p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Cadastrar Agora
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
