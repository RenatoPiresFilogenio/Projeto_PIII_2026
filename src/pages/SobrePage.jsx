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

const aboutHighlights = [
  {
    title: 'Desafios com contexto',
    text: 'Empresas descrevem necessidades tecnológicas com mais clareza, prioridade e aderência ao problema real.',
  },
  {
    title: 'Especialistas com aderência',
    text: 'Pesquisadores e desenvolvedores aparecem com base em área, experiência, tema e potencial de colaboração.',
  },
  {
    title: 'Decisão com apoio',
    text: 'Propostas, indicadores e sinais do ecossistema ajudam a transformar busca em parceria e inovação aplicada.',
  },
]

const aboutPillars = [
  {
    eyebrow: 'Conexão qualificada',
    title: 'A plataforma aproxima empresas e pesquisadores no mesmo fluxo.',
    text: 'A busca organiza problema, setor, tecnologia e perfil técnico para tornar a conexão mais objetiva desde o primeiro contato.',
  },
  {
    eyebrow: 'Desafios tecnológicos',
    title: 'Demandas reais ganham visibilidade, contexto e direcionamento.',
    text: 'Empresas conseguem estruturar desafios com mais clareza, facilitando entendimento, aderência e priorização de possíveis parceiros.',
  },
  {
    eyebrow: 'Propostas e soluções',
    title: 'A colaboração evolui de interesse para proposta concreta.',
    text: 'Pesquisadores podem responder demandas com caminhos de solução, metodologia e possibilidade de parceria aplicada.',
  },
  {
    eyebrow: 'Dados e indicadores',
    title: 'Informação estratégica apoia decisões mais maduras de inovação.',
    text: 'Indicadores e informações estratégicas ampliam o contexto da busca e ajudam a orientar próximos passos com mais segurança.',
  },
]

const aboutOdsFacts = [
  {
    label: 'Meta 9.5',
    text: 'Fortalecer a pesquisa científica e ampliar capacidades tecnológicas industriais com mais incentivo à inovação.',
  },
  {
    label: 'Impacto esperado',
    text: 'Reduzir a distância entre universidade e mercado, ampliando a aplicação prática do conhecimento produzido no país.',
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
                  Sobre a Innovare
                </div>

                <h1 className="about-hero__title">
                  Transformamos pesquisa aplicada em conexão real com a indústria.
                </h1>

                <p className="about-hero__text">
                  A Innovare é uma plataforma web criada para aproximar empresas que enfrentam
                  desafios tecnológicos de pesquisadores e desenvolvedores capazes de responder
                  com conhecimento, propostas e soluções em desenvolvimento.
                </p>

                <p className="about-hero__support">
                  Em vez de dispersar problema, especialista, oportunidade e contexto em vários
                  lugares, organizamos tudo em uma experiência mais clara de descoberta,
                  colaboração e avanço da inovação.
                </p>
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
            <h2 className="section-title">
              A proposta do Innovare fica clara quando problema, expertise e decisão aparecem
              no mesmo fluxo.
            </h2>
            <p className="section-subtitle">
              Cada camada da plataforma ajuda a transformar uma demanda difusa em oportunidade
              concreta de colaboração, pesquisa aplicada e inovação.
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
                  Alinhada à indústria, inovação e fortalecimento da pesquisa aplicada.
                </h2>
              </div>

              <div className="about-ods-panel__body">
                <div className="about-ods-panel__content">
                  <p className="section-subtitle about-ods-panel__text">
                    A Innovare contribui para reduzir a distância entre produção científica e
                    necessidade produtiva ao criar um ambiente digital que aproxima empresas,
                    pesquisadores e oportunidades de inovação com mais contexto, visibilidade e
                    capacidade de ação.
                  </p>
                  <p className="about-ods-panel__text about-ods-panel__text--secondary">
                    Esse alinhamento conversa diretamente com a Meta 9.5 da ODS 9, que propõe
                    fortalecer a pesquisa científica, ampliar capacidades tecnológicas industriais
                    e incentivar inovação com impacto econômico e social.
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
                Entre na plataforma e comece a transformar desafios, expertise e oportunidades
                em colaboração aplicada.
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
