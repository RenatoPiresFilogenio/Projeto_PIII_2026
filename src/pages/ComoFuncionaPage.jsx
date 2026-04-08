import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import IconBadge from '../components/IconBadge'
import Reveal from '../components/Reveal'
import { appIcons } from '../lib/icons'

const journeySteps = [
  {
    id: 'cadastro',
    step: '01',
    eyebrow: 'Cadastro de perfis',
    title: 'Empresas e pesquisadores estruturam sua presen\u00e7a na plataforma.',
    text: 'O primeiro passo organiza quem busca parceria e quem oferece conhecimento, criando uma base mais clara para as conex\u00f5es.',
    details: [
      {
        label: 'Empresas',
        text: 'Registram setor de atua\u00e7\u00e3o, porte, desafios tecnol\u00f3gicos enfrentados, or\u00e7amento para projetos de inova\u00e7\u00e3o e localiza\u00e7\u00e3o.',
      },
      {
        label: 'Pesquisadores',
        text: 'Cadastram \u00e1reas de atua\u00e7\u00e3o, projetos desenvolvidos, institui\u00e7\u00e3o de v\u00ednculo e interesse em parceria com empresas.',
      },
    ],
    tags: [
      { label: 'Setor de atua\u00e7\u00e3o' },
      { label: 'Projetos' },
      { label: 'Desafios' },
      { label: 'Localiza\u00e7\u00e3o' },
      { label: 'Expertise' },
    ],
  },
  {
    id: 'matchmaking',
    step: '02',
    eyebrow: 'Matchmaking inteligente',
    title: 'A busca cruza contexto t\u00e9cnico, problema e ader\u00eancia entre perfis.',
    text: 'O sistema cruza automaticamente as informa\u00e7\u00f5es cadastradas, considerando \u00e1rea de pesquisa, minera\u00e7\u00e3o de palavras-chave e tipo de problema tecnol\u00f3gico. A plataforma utiliza busca sem\u00e2ntica e IA para sugerir as conex\u00f5es com maior relev\u00e2ncia.',
    tags: [
      { label: 'Busca sem\u00e2ntica' },
      { label: 'IA matchmaking' },
      { label: 'Palavras-chave' },
      { label: 'Ranking' },
    ],
  },
  {
    id: 'propostas',
    step: '03',
    eyebrow: 'Envio de propostas',
    title: 'A conex\u00e3o evolui para proposta com escopo, m\u00e9todo e dire\u00e7\u00e3o.',
    text: 'Pesquisadores respondem a demandas com propostas de parceria detalhadas, incluindo resumo da abordagem, cronograma de execu\u00e7\u00e3o e metodologia. As empresas podem avaliar e selecionar as propostas mais adequadas.',
    tags: [
      { label: 'Resumo' },
      { label: 'Cronograma' },
      { label: 'Metodologia' },
      { label: 'Avalia\u00e7\u00e3o' },
    ],
  },
  {
    id: 'acompanhamento',
    step: '04',
    eyebrow: 'Acompanhamento do projeto',
    title: 'As etapas da parceria ficam vis\u00edveis com mais clareza e continuidade.',
    text: 'Acompanhe o status das propostas em tempo real: pendente, aceita, recusada, em andamento ou conclu\u00edda. Todas as partes envolvidas t\u00eam visibilidade completa do progresso.',
    tags: [
      { label: 'Pendente', tone: 'warning' },
      { label: 'Aceita', tone: 'success' },
      { label: 'Em andamento', tone: 'primary' },
      { label: 'Conclu\u00edda', tone: 'secondary' },
    ],
  },
]

const resourceCards = [
  {
    icon: appIcons.matchmaking,
    title: 'Sinais de compatibilidade',
    text: 'A plataforma destaca ader\u00eancia entre perfis, desafios e temas para tornar a descoberta mais objetiva e contextualizada.',
  },
  {
    icon: appIcons.indicators,
    title: 'Dashboard de indicadores',
    text: 'Visualize dados sobre pesquisadores, investimentos em P&D e compara\u00e7\u00f5es regionais para entender o cen\u00e1rio de inova\u00e7\u00e3o.',
    iconModifier: 'feature-card__icon--secondary',
  },
  {
    icon: appIcons.security,
    title: 'Seguran\u00e7a de dados',
    text: 'Todas as informa\u00e7\u00f5es s\u00e3o armazenadas com seguran\u00e7a, garantindo a privacidade de empresas e pesquisadores.',
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
            Do <span className="text-gradient">desafio</span> {'\u00e0'}{' '}
            <span className="text-gradient">solu\u00e7\u00e3o</span>
          </h1>
          <p className="page-header__text">
            {
              'Entenda a jornada da plataforma do cadastro at\u00e9 a evolu\u00e7\u00e3o das parcerias, com cada etapa organizada para reduzir ru\u00eddo e apoiar a pr\u00f3xima decis\u00e3o.'
            }
          </p>
        </div>
      </section>

      <section className="section process-journey">
        <div className="container">
          <Reveal className="text-center process-journey__intro">
            <span className="section-label">Fluxo da Plataforma</span>
            <h2 className="section-title">
              {'Quatro etapas para transformar busca em colabora\u00e7\u00e3o aplicada.'}
            </h2>
            <p className="section-subtitle">
              {'O fluxo foi desenhado para orientar descoberta, correspond\u00eancia, proposta e acompanhamento com mais clareza.'}
            </p>
          </Reveal>

          <Reveal>
            <div className="process-journey__overview">
              {journeySteps.map((step) => (
                <article key={step.id} className="process-journey__overview-item">
                  <span className="process-journey__overview-number">{step.step}</span>
                  <h3 className="process-journey__overview-title">{step.eyebrow}</h3>
                </article>
              ))}
            </div>
          </Reveal>

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

                <div className="process-step-card__layout">
                  <div className="process-step-card__copy">
                    <p className="process-step-card__text">{step.text}</p>
                  </div>

                  <div
                    className={`process-step-card__support${
                      step.details ? '' : ' process-step-card__support--tags-only'
                    }`}
                  >
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
                  </div>
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
              Mais do que <span className="text-gradient">conex\u00f5es</span>
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
                Comece <span className="text-gradient">agora</span>
              </h2>
              <p className="cta-box__subtitle">
                {'Cadastre-se e descubra oportunidades de inova\u00e7\u00e3o esperando por voc\u00ea.'}
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
