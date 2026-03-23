import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function SobrePage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <span className="section-label">Sobre Nós</span>
          <h1 className="page-header__title">Construindo <span className="text-gradient">pontes</span> entre ciência e indústria</h1>
          <p className="page-header__text">Conheça a missão, os valores e o propósito por trás do Innovare.</p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="about-content">
              <div className="about-content__text">
                <p>O <strong style={{ color: 'var(--accent-primary)' }}>Innovare</strong> nasceu da necessidade de reduzir a distância entre o conhecimento produzido nas universidades e as necessidades reais do setor produtivo brasileiro.</p>
                <p>Apesar do grande volume de produção científica no Brasil, uma parcela significativa das pesquisas desenvolvidas em universidades e centros de pesquisa não chega a ser aplicada no setor produtivo. Ao mesmo tempo, muitas empresas enfrentam dificuldades para inovar e solucionar problemas tecnológicos.</p>
                <p>Nossa plataforma cria um ambiente digital que facilita a colaboração, a transferência de conhecimento e o desenvolvimento de projetos de inovação, conectando quem tem o problema com quem tem a solução.</p>
                <p>Acreditamos que a inovação acontece quando o conhecimento acadêmico encontra os desafios reais do mercado. E é exatamente isso que o Innovare proporciona.</p>
              </div>

              <div className="about-ods">
                <h3 className="about-ods__title">
                  🌍 <span className="text-gradient">ODS 9 — Indústria, Inovação e Infraestrutura</span>
                </h3>
                <p className="about-ods__text">
                  Nossa proposta está diretamente alinhada com a <strong>Meta 9.5</strong> da ODS 9, que determina fortalecer a pesquisa científica e melhorar as capacidades tecnológicas industriais, incentivando a inovação e aumentando o número de trabalhadores em P&D.
                </p>
                <br />
                <p className="about-ods__text">
                  Contribuímos para essa meta conectando pesquisadores a empresas que precisam de soluções tecnológicas, ampliando o impacto da ciência na economia real.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="about-values">
            <Reveal>
              <div className="value-card">
                <div className="value-card__icon">🤝</div>
                <h3 className="value-card__title">Colaboração</h3>
                <p className="value-card__text">Facilitamos conexões genuínas entre pesquisadores e empresas para gerar impacto real.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="value-card">
                <div className="value-card__icon">💡</div>
                <h3 className="value-card__title">Inovação</h3>
                <p className="value-card__text">Usamos tecnologia de ponta para acelerar a transferência de conhecimento para o mercado.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="value-card">
                <div className="value-card__icon">🔓</div>
                <h3 className="value-card__title">Transparência</h3>
                <p className="value-card__text">Acompanhamento claro do status das propostas e parcerias em todas as etapas.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="value-card">
                <div className="value-card__icon">🌱</div>
                <h3 className="value-card__title">Impacto Social</h3>
                <p className="value-card__text">Contribuímos para o desenvolvimento sustentável e a redução da desigualdade tecnológica.</p>
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
              <h2 className="cta-box__title">Faça parte da <span className="text-gradient">revolução</span></h2>
              <p className="cta-box__subtitle">Cadastre-se agora e comece a transformar ciência em soluções para o mundo real.</p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">Cadastrar Agora</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
