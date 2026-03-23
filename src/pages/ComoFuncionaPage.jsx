import { motion, useReducedMotion } from 'framer-motion'
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

const journeySteps = [
  {
    id: 'cadastro',
    step: '01',
    eyebrow: 'Cadastro de perfis',
    title: 'Empresas e pesquisadores estruturam sua presença na plataforma.',
    text: 'O primeiro passo organiza quem busca parceria e quem oferece conhecimento, criando uma base mais clara para as conexões.',
    details: [
      {
        label: 'Empresas',
        text: 'Registram setor de atuação, porte, desafios tecnológicos enfrentados, orçamento para projetos de inovação e localização.',
      },
      {
        label: 'Pesquisadores',
        text: 'Cadastram áreas de atuação, projetos desenvolvidos, instituição de vínculo e interesse em parceria com empresas.',
      },
    ],
    tags: [
      { label: 'Setor de atuação' },
      { label: 'Projetos' },
      { label: 'Desafios' },
      { label: 'Localização' },
      { label: 'Expertise' },
    ],
  },
  {
    id: 'matchmaking',
    step: '02',
    eyebrow: 'Matchmaking inteligente',
    title: 'A busca cruza contexto técnico, problema e aderência entre perfis.',
    text: 'O sistema cruza automaticamente as informações cadastradas, considerando área de pesquisa, mineração de palavras-chave e tipo de problema tecnológico. A plataforma utiliza busca semântica e IA para sugerir as conexões com maior relevância.',
    tags: [
      { label: 'Busca semântica' },
      { label: 'IA matchmaking' },
      { label: 'Palavras-chave' },
      { label: 'Ranking' },
    ],
  },
  {
    id: 'propostas',
    step: '03',
    eyebrow: 'Envio de propostas',
    title: 'A conexão evolui para proposta com escopo, método e direção.',
    text: 'Pesquisadores respondem a demandas com propostas de parceria detalhadas, incluindo resumo da abordagem, cronograma de execução e metodologia. As empresas podem avaliar e selecionar as propostas mais adequadas.',
    tags: [
      { label: 'Resumo' },
      { label: 'Cronograma' },
      { label: 'Metodologia' },
      { label: 'Avaliação' },
    ],
  },
  {
    id: 'acompanhamento',
    step: '04',
    eyebrow: 'Acompanhamento do projeto',
    title: 'As etapas da parceria ficam visíveis com mais clareza e continuidade.',
    text: 'Acompanhe o status das propostas em tempo real: pendente, aceita, recusada, em andamento ou concluída. Todas as partes envolvidas têm visibilidade completa do progresso.',
    tags: [
      { label: 'Pendente', tone: 'warning' },
      { label: 'Aceita', tone: 'success' },
      { label: 'Em andamento', tone: 'primary' },
      { label: 'Concluída', tone: 'secondary' },
    ],
  },
]

const resourceCards = [
  {
    icon: '🧭',
    title: 'Sinais de compatibilidade',
    text: 'A plataforma destaca aderência entre perfis, desafios e temas para tornar a descoberta mais objetiva e contextualizada.',
  },
  {
    icon: '📊',
    title: 'Dashboard de indicadores',
    text: 'Visualize dados sobre pesquisadores, investimentos em P&D e comparações regionais para entender o cenário de inovação.',
    iconModifier: 'feature-card__icon--secondary',
  },
  {
    icon: '🔐',
    title: 'Segurança de dados',
    text: 'Todas as informações são armazenadas com segurança, garantindo a privacidade de empresas e pesquisadores.',
    iconModifier: 'feature-card__icon--warm',
  },
]

const cardTransition = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1],
}

export default function ComoFuncionaPage() {
  const shouldReduceMotion = useReducedMotion()
  const totalSteps = String(journeySteps.length).padStart(2, '0')

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="section-label">Como Funciona</span>
          <h1 className="page-header__title">
            Do <span className="text-gradient">desafio</span> à{' '}
            <span className="text-gradient">solução</span>
          </h1>
          <p className="page-header__text">
            Entenda a jornada da plataforma com uma progressão guiada, do cadastro até a evolução
            das parcerias.
          </p>
        </div>
      </section>

      <section className="section process-journey">
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Fluxo da Plataforma</span>
            <h2 className="section-title">
              Uma jornada por etapas, com foco total em cada decisão.
            </h2>
            <p className="section-subtitle">
              Role a página para acompanhar o passo a passo da experiência. Cada etapa assume o
              centro da tela para orientar a próxima ação com mais clareza.
            </p>
          </Reveal>
        </div>

        <div className="container">
          <div className="process-journey__stack">
            {journeySteps.map((step) => (
              <motion.article
                key={step.id}
                className="process-step-card"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3, margin: '0px 0px -12% 0px' }}
                transition={shouldReduceMotion ? { duration: 0 } : cardTransition}
              >
                <div className="process-step-card__meta">
                  <span className="process-step-card__meta-label">Etapa {step.step}</span>
                  <span className="process-step-card__meta-count">
                    {step.step} / {totalSteps}
                  </span>
                </div>

                <div className="process-step-card__header">
                  <span className="process-step-card__number">{step.step}</span>

                  <div className="process-step-card__heading">
                    <p className="process-step-card__eyebrow">{step.eyebrow}</p>
                    <h3 className="process-step-card__title">{step.title}</h3>
                  </div>
                </div>

                <p className="process-step-card__text">{step.text}</p>

                {step.details ? (
                  <div className="process-step-card__details">
                    {step.details.map((detail) => (
                      <div key={detail.label} className="process-step-card__detail">
                        <span className="process-step-card__detail-label">{detail.label}</span>
                        <p className="process-step-card__detail-text">{detail.text}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="process-step-card__tags">
                  {step.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`process-step-card__tag${
                        tag.tone ? ` process-step-card__tag--${tag.tone}` : ''
                      }`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-extra">
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Recursos Adicionais</span>
            <h2 className="section-title">
              Mais do que <span className="text-gradient">conexões</span>
            </h2>
          </Reveal>

          <div className="features__grid">
            {resourceCards.map((card) => (
              <Reveal key={card.title}>
                <div className="feature-card">
                  <div className={`feature-card__icon ${card.iconModifier || ''}`.trim()}>
                    {card.icon}
                  </div>
                  <div className="feature-card__content">
                    <h3 className="feature-card__title">{card.title}</h3>
                    <p className="feature-card__text">{card.text}</p>
                  </div>
                </div>
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
                Comece <span className="text-gradient">agora</span>
              </h2>
              <p className="cta-box__subtitle">
                Cadastre-se e descubra oportunidades de inovação esperando por você.
              </p>
              <div className="cta-box__buttons">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Criar Conta Gratuita
                </Link>
                <Link to="/indicadores" className="btn btn-outline btn-lg">
                  Ver Indicadores
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
