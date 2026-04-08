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
    title: 'Empresas e pesquisadores estruturam sua presenÃ§a na plataforma.',
    text: 'O primeiro passo organiza quem busca parceria e quem oferece conhecimento, criando uma base mais clara para as conexÃµes.',
    details: [
      {
        label: 'Empresas',
        text: 'Registram setor de atuaÃ§Ã£o, porte, desafios tecnolÃ³gicos enfrentados, orÃ§amento para projetos de inovaÃ§Ã£o e localizaÃ§Ã£o.',
      },
      {
        label: 'Pesquisadores',
        text: 'Cadastram Ã¡reas de atuaÃ§Ã£o, projetos desenvolvidos, instituiÃ§Ã£o de vÃ­nculo e interesse em parceria com empresas.',
      },
    ],
    tags: [
      { label: 'Setor de atuaÃ§Ã£o' },
      { label: 'Projetos' },
      { label: 'Desafios' },
      { label: 'LocalizaÃ§Ã£o' },
      { label: 'Expertise' },
    ],
  },
  {
    id: 'matchmaking',
    step: '02',
    eyebrow: 'Matchmaking inteligente',
    title: 'A busca cruza contexto tÃ©cnico, problema e aderÃªncia entre perfis.',
    text: 'O sistema cruza automaticamente as informaÃ§Ãµes cadastradas, considerando Ã¡rea de pesquisa, mineraÃ§Ã£o de palavras-chave e tipo de problema tecnolÃ³gico. A plataforma utiliza busca semÃ¢ntica e IA para sugerir as conexÃµes com maior relevÃ¢ncia.',
    tags: [
      { label: 'Busca semÃ¢ntica' },
      { label: 'IA matchmaking' },
      { label: 'Palavras-chave' },
      { label: 'Ranking' },
    ],
  },
  {
    id: 'propostas',
    step: '03',
    eyebrow: 'Envio de propostas',
    title: 'A conexÃ£o evolui para proposta com escopo, mÃ©todo e direÃ§Ã£o.',
    text: 'Pesquisadores respondem a demandas com propostas de parceria detalhadas, incluindo resumo da abordagem, cronograma de execuÃ§Ã£o e metodologia. As empresas podem avaliar e selecionar as propostas mais adequadas.',
    tags: [
      { label: 'Resumo' },
      { label: 'Cronograma' },
      { label: 'Metodologia' },
      { label: 'AvaliaÃ§Ã£o' },
    ],
  },
  {
    id: 'acompanhamento',
    step: '04',
    eyebrow: 'Acompanhamento do projeto',
    title: 'As etapas da parceria ficam visÃ­veis com mais clareza e continuidade.',
    text: 'Acompanhe o status das propostas em tempo real: pendente, aceita, recusada, em andamento ou concluÃ­da. Todas as partes envolvidas tÃªm visibilidade completa do progresso.',
    tags: [
      { label: 'Pendente', tone: 'warning' },
      { label: 'Aceita', tone: 'success' },
      { label: 'Em andamento', tone: 'primary' },
      { label: 'ConcluÃ­da', tone: 'secondary' },
    ],
  },
]

const resourceCards = [
  {
    icon: appIcons.matchmaking,
    title: 'Sinais de compatibilidade',
    text: 'A plataforma destaca aderÃªncia entre perfis, desafios e temas para tornar a descoberta mais objetiva e contextualizada.',
  },
  {
    icon: appIcons.indicators,
    title: 'Dashboard de indicadores',
    text: 'Visualize dados sobre pesquisadores, investimentos em P&D e comparaÃ§Ãµes regionais para entender o cenÃ¡rio de inovaÃ§Ã£o.',
    iconModifier: 'feature-card__icon--secondary',
  },
  {
    icon: appIcons.security,
    title: 'SeguranÃ§a de dados',
    text: 'Todas as informaÃ§Ãµes sÃ£o armazenadas com seguranÃ§a, garantindo a privacidade de empresas e pesquisadores.',
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
            Do <span className="text-gradient">desafio</span> Ã {' '}
            <span className="text-gradient">soluÃ§Ã£o</span>
          </h1>
          <p className="page-header__text">
            Entenda a jornada da plataforma do cadastro atÃ© a evoluÃ§Ã£o das parcerias, com cada
            etapa organizada para reduzir ruÃ­do e apoiar a prÃ³xima decisÃ£o.
          </p>
        </div>
      </section>

      <section className="section process-journey">
        <div className="container">
          <Reveal className="text-center process-journey__intro">
            <span className="section-label">Fluxo da Plataforma</span>
            <h2 className="section-title">
              Quatro etapas para transformar busca em colaboraÃ§Ã£o aplicada.
            </h2>
            <p className="section-subtitle">
              O fluxo foi desenhado para orientar descoberta, correspondÃªncia, proposta e
              acompanhamento com mais clareza.
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
              Mais do que <span className="text-gradient">conexÃµes</span>
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
                Cadastre-se e descubra oportunidades de inovaÃ§Ã£o esperando por vocÃª.
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
