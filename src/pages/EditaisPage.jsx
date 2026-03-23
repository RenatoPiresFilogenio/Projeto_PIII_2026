import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const editais = [
  {
    status: 'aberto',
    badge: '✅ Inscrições Abertas',
    title: 'Programa de Apoio à Inovação Tecnológica — FINEP',
    org: 'FINEP — Financiadora de Estudos e Projetos',
    text: 'Financiamento para projetos de inovação em empresas que envolvam parceria com instituições de pesquisa. Recursos para prototipagem, testes e validação de tecnologias.',
    date: '📅 Até 15/06/2026',
    value: '💰 R$ 500 mil - R$ 5 milhões',
  },
  {
    status: 'aberto',
    badge: '✅ Inscrições Abertas',
    title: 'Chamada Universal — CNPq',
    org: 'CNPq — Conselho Nacional de Desenvolvimento',
    text: 'Apoio a projetos de pesquisa em todas as áreas do conhecimento, com foco em desenvolvimento tecnológico e inovação aplicada ao setor produtivo.',
    date: '📅 Até 30/07/2026',
    value: '💰 R$ 30 mil - R$ 200 mil',
  },
  {
    status: 'breve',
    badge: '🔜 Em Breve',
    title: 'Programa RHAE — Pesquisador na Empresa',
    org: 'MCTI — Ministério da Ciência, Tecnologia e Inovação',
    text: 'Inserção de mestres e doutores em empresas para desenvolvimento de projetos de inovação tecnológica, fortalecendo a conexão academia-indústria.',
    date: '📅 Previsto para Ago/2026',
    value: '💰 Bolsa + Recursos',
  },
  {
    status: 'aberto',
    badge: '✅ Inscrições Abertas',
    title: 'Subvenção Econômica à Inovação',
    org: 'FINEP / MCTI',
    text: 'Recursos não reembolsáveis para empresas brasileiras que desenvolvam produtos e processos inovadores com potencial de impacto no mercado.',
    date: '📅 Até 20/05/2026',
    value: '💰 R$ 1 milhão - R$ 10 milhões',
  },
  {
    status: 'breve',
    badge: '🔜 Em Breve',
    title: 'Programa de Embrapii — Unidade de Inovação',
    org: 'EMBRAPII',
    text: 'Cofinanciamento para projetos de pesquisa, desenvolvimento e inovação em parceria com instituições de pesquisa credenciadas pela Embrapii.',
    date: '📅 Previsto para Set/2026',
    value: '💰 Cofinanciamento 33%',
  },
  {
    status: 'encerrado',
    badge: '❌ Encerrado',
    title: 'Edital de Inovação para a Indústria — SENAI',
    org: 'SENAI — Serviço Nacional de Aprendizagem Industrial',
    text: 'Apoio a projetos de inovação industrial em parceria com universidades e centros de pesquisa, nas áreas de automação, IoT e indústria 4.0.',
    date: '📅 Encerrado em 01/02/2026',
    value: '💰 R$ 100 mil - R$ 400 mil',
  },
]

export default function EditaisPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <span className="section-label">Oportunidades</span>
          <h1 className="page-header__title">Editais e <span className="text-gradient">Financiamento</span></h1>
          <p className="page-header__text">Acompanhe editais públicos, programas de incentivo e oportunidades de financiamento para projetos de inovação.</p>
        </div>
      </section>

      {/* EDITAIS */}
      <section className="section">
        <div className="container">
          <div className="editais__grid">
            {editais.map((edital, i) => (
              <Reveal key={i}>
                <div className="edital-card">
                  <span className={`edital-card__badge edital-card__badge--${edital.status}`}>{edital.badge}</span>
                  <h3 className="edital-card__title">{edital.title}</h3>
                  <p className="edital-card__org">{edital.org}</p>
                  <p className="edital-card__text">{edital.text}</p>
                  <div className="edital-card__meta">
                    <span>{edital.date}</span>
                    <span>{edital.value}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <Reveal>
            <div className="cta-box">
              <h2 className="cta-box__title">Receba <span className="text-gradient">alertas</span> de novos editais</h2>
              <p className="cta-box__subtitle">Cadastre-se para ser notificado quando novos editais e oportunidades de financiamento forem publicados.</p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">Cadastrar e Receber Alertas</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
