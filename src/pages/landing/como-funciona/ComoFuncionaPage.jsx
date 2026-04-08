import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import IconBadge from '../../../components/IconBadge'
import Reveal from '../../../components/Reveal'
import { appIcons } from '../../../lib/icons'
import './ComoFuncionaPage.scss'

const journeySteps = [
  {
    id: 'cadastro',
    step: '01',
    eyebrow: 'Cadastro de perfis',
    title: 'Empresas e pesquisadores estruturam sua presença.',
    text: 'O cadastro organiza quem busca parceria e quem oferece conhecimento, criando uma base mais clara para as conexões.',
    details: [
      {
        label: 'Empresas',
        text: 'Informam setor, porte, desafios, orçamento e localização.',
      },
      {
        label: 'Pesquisadores',
        text: 'Informam áreas de atuação, projetos, vínculo institucional e interesse em parceria.',
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
    title: 'A busca cruza contexto técnico, problema e aderência.',
    text: 'A plataforma cruza área, problema e linguagem da demanda para sugerir conexões mais relevantes com busca semântica e IA.',
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
    title: 'A conexão evolui para proposta com direção.',
    text: 'Pesquisadores enviam propostas com abordagem, cronograma e metodologia para avaliação das empresas.',
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
    title: 'A parceria segue visível até a conclusão.',
    text: 'O status das propostas fica visível em tempo real, da pendência à conclusão.',
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
    icon: appIcons.matchmaking,
    title: 'Sinais de compatibilidade',
    text: 'Destaca aderência entre perfis, desafios e temas para orientar a descoberta.',
  },
  {
    icon: appIcons.indicators,
    title: 'Leitura de indicadores',
    text: 'Organiza dados sobre pesquisa, investimento e distribuição regional.',
    iconModifier: 'feature-card__icon--secondary',
  },
  {
    icon: appIcons.security,
    title: 'Segurança de dados',
    text: 'Protege informações de empresas e pesquisadores com armazenamento seguro.',
    iconModifier: 'feature-card__icon--warm',
  },
]

export default function ComoFuncionaPage() {
  const shouldReduceMotion = useReducedMotion()
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const totalSteps = String(journeySteps.length).padStart(2, '0')
  const activeStep = journeySteps[activeStepIndex]
  const carouselTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }

  function goToStep(nextIndex) {
    if (nextIndex < 0 || nextIndex >= journeySteps.length || nextIndex === activeStepIndex) return
    setDirection(nextIndex > activeStepIndex ? 1 : -1)
    setActiveStepIndex(nextIndex)
  }

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
            A jornada da plataforma organiza descoberta, correspondência, proposta e acompanhamento
            em quatro etapas.
          </p>
        </div>
      </section>

      <section className="section process-journey">
        <div className="container">
          <Reveal className="text-center process-journey__intro">
            <span className="section-label">Fluxo da Plataforma</span>
            <h2 className="section-title">Quatro etapas para transformar busca em colaboração.</h2>
            <p className="section-subtitle">
              Um fluxo claro para descobrir, conectar, propor e acompanhar.
            </p>
          </Reveal>

          <Reveal>
            <div className="process-journey__overview">
              {journeySteps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  className={`process-journey__overview-item${
                    index === activeStepIndex ? ' process-journey__overview-item--active' : ''
                  }`}
                  onClick={() => goToStep(index)}
                  aria-current={index === activeStepIndex ? 'step' : undefined}
                >
                  <span className="process-journey__overview-number">{step.step}</span>
                  <h3 className="process-journey__overview-title">{step.eyebrow}</h3>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="process-journey__stack">
            <div className="process-step-carousel">
              <div className="process-step-carousel__controls">
                <button
                  type="button"
                  className="process-step-carousel__button"
                  onClick={() => goToStep(activeStepIndex - 1)}
                  disabled={activeStepIndex === 0}
                  aria-label="Etapa anterior"
                >
                  <IconBadge icon={appIcons.previous} className="process-step-carousel__button-icon" />
                  <span>Anterior</span>
                </button>

                <div className="process-step-carousel__status" aria-live="polite">
                  <span className="process-step-carousel__status-current">{activeStep.step}</span>
                  <span className="process-step-carousel__status-separator">/</span>
                  <span className="process-step-carousel__status-total">{totalSteps}</span>
                </div>

                <button
                  type="button"
                  className="process-step-carousel__button"
                  onClick={() => goToStep(activeStepIndex + 1)}
                  disabled={activeStepIndex === journeySteps.length - 1}
                  aria-label="Próxima etapa"
                >
                  <span>Próxima</span>
                  <IconBadge icon={appIcons.next} className="process-step-carousel__button-icon" />
                </button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={activeStep.id}
                  className="process-step-card"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, x: direction > 0 ? 24 : -24, y: 10 }
                  }
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: direction > 0 ? -24 : 24, y: -10 }
                  }
                  transition={carouselTransition}
                >
                  <div className="process-step-card__meta">
                    <span className="process-step-card__meta-label">Etapa {activeStep.step}</span>
                    <span className="process-step-card__meta-count">
                      {activeStep.step} / {totalSteps}
                    </span>
                  </div>

                  <div className="process-step-card__header">
                    <span className="process-step-card__number">{activeStep.step}</span>
                    <div className="process-step-card__heading">
                      <p className="process-step-card__eyebrow">{activeStep.eyebrow}</p>
                      <h3 className="process-step-card__title">{activeStep.title}</h3>
                    </div>
                  </div>

                  <div className="process-step-card__layout">
                    <div className="process-step-card__copy">
                      <p className="process-step-card__text">{activeStep.text}</p>
                    </div>

                    <div
                      className={`process-step-card__support${
                        activeStep.details ? '' : ' process-step-card__support--tags-only'
                      }`}
                    >
                      {activeStep.details ? (
                        <div className="process-step-card__details">
                          {activeStep.details.map((detail) => (
                            <div key={detail.label} className="process-step-card__detail">
                              <span className="process-step-card__detail-label">{detail.label}</span>
                              <p className="process-step-card__detail-text">{detail.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="section process-extra">
        <div className="container">
          <Reveal className="text-center">
            <span className="section-label">Recursos adicionais</span>
            <h2 className="section-title">
              Mais contexto para <span className="text-gradient">decidir</span>
            </h2>
          </Reveal>

          <div className="features__grid">
            {resourceCards.map((card) => (
              <Reveal key={card.title}>
                <div className="feature-card">
                  <IconBadge icon={card.icon} className={card.iconModifier || ''} />
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
                Comece sua <span className="text-gradient">conexão</span>
              </h2>
              <p className="cta-box__subtitle">
                Cadastre-se e descubra oportunidades de inovação alinhadas ao seu perfil.
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
