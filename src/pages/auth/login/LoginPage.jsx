import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatBooleanLabel } from '../../../lib/domain'
import { useAuth } from '../../../context/AuthContext'
import PageFaq from '../../../components/PageFaq'
import {
  listCompanies,
  listResearchers,
  listUniversities,
} from '../../../services/pdConnectApi'
import './LoginPage.scss'

const loginFaqSections = [
  {
    title: 'Como o acesso funciona hoje',
    text: 'A tela permite escolher um cadastro existente da API para montar a sessão local do front, já que o backend ainda não expõe autenticação própria para empresa e pesquisador.',
  },
  {
    title: 'O que esta página usa',
    items: [
      'GET /api/companies/',
      'GET /api/researchers/',
      'GET /api/universities/',
      'POST /api/companies/',
      'POST /api/universities/',
      'POST /api/resumes/',
      'POST /api/researchers/',
    ],
  },
  {
    title: 'O que ainda depende de backend',
    items: [
      'Login real com validação de credenciais',
      'Sessão autenticada no backend',
      'Controle de acesso por token ou cookie',
      'Recuperação de senha',
    ],
  },
]

const defaultCompanyForm = {
  name: '',
  cnpj: '',
  registrationStatus: 'Ativo',
  status: 'true',
}

const defaultResearcherForm = {
  name: '',
  availability: 'true',
  status: 'true',
  universityId: '',
  universityName: '',
}

function toBoolean(value) {
  return value === 'true'
}

function getReturnPath(pathname) {
  return typeof pathname === 'string' && pathname.trim() ? pathname : '/pesquisa'
}

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    authMode,
    isAuthenticated,
    signInAsEntity,
    registerCompany,
    registerResearcher,
  } = useAuth()

  const [isRegister, setIsRegister] = useState(false)
  const [loginTab, setLoginTab] = useState('empresa')
  const [regTab, setRegTab] = useState('empresa')
  const [isLoadingOptions, setIsLoadingOptions] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const [registerMessage, setRegisterMessage] = useState('')
  const [isFaqOpen, setIsFaqOpen] = useState(false)
  const [accessOptions, setAccessOptions] = useState({
    companies: [],
    researchers: [],
    universities: [],
  })
  const [selectedEntity, setSelectedEntity] = useState({
    empresa: '',
    pesquisador: '',
  })
  const [companyForm, setCompanyForm] = useState(defaultCompanyForm)
  const [researcherForm, setResearcherForm] = useState(defaultResearcherForm)

  useEffect(() => {
    setIsRegister(location.hash === '#cadastro')
  }, [location.hash])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getReturnPath(location.state?.from), { replace: true })
    }
  }, [isAuthenticated, location.state, navigate])

  const loadAccessOptions = async () => {
    setIsLoadingOptions(true)
    setLoadError('')

    try {
      const [companies, researchers, universities] = await Promise.all([
        listCompanies(),
        listResearchers(),
        listUniversities(),
      ])

      setAccessOptions({ companies, researchers, universities })
    } catch (error) {
      setLoadError(
        error.message || 'Não foi possível consultar os cadastros reais da API neste momento.'
      )
    } finally {
      setIsLoadingOptions(false)
    }
  }

  useEffect(() => {
    loadAccessOptions()
  }, [])

  const openRegisterForm = (event) => {
    event.preventDefault()
    navigate('/login#cadastro')
    setLoginMessage('')
    setRegisterMessage('')
  }

  const openLoginForm = (event) => {
    event.preventDefault()
    navigate('/login')
    setLoginMessage('')
    setRegisterMessage('')
  }

  const handleSelectEntity = (type, value) => {
    setSelectedEntity((current) => ({
      ...current,
      [type]: value,
    }))
    setLoginMessage('')
  }

  const handleCompanyFormChange = (field, value) => {
    setCompanyForm((current) => ({
      ...current,
      [field]: value,
    }))
    setRegisterMessage('')
  }

  const handleResearcherFormChange = (field, value) => {
    setResearcherForm((current) => ({
      ...current,
      [field]: value,
    }))
    setRegisterMessage('')
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setSubmitLoading(true)
    setLoginMessage('')

    const result = await signInAsEntity({
      type: loginTab,
      id: selectedEntity[loginTab],
    })

    if (!result.ok) {
      setLoginMessage(result.message)
    }

    setSubmitLoading(false)
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault()
    setSubmitLoading(true)
    setRegisterMessage('')

    let result

    if (regTab === 'empresa') {
      result = await registerCompany({
        name: companyForm.name.trim(),
        cnpj: companyForm.cnpj.trim(),
        registrationStatus: companyForm.registrationStatus.trim(),
        status: toBoolean(companyForm.status),
      })
    } else {
      result = await registerResearcher({
        name: researcherForm.name.trim(),
        availability: toBoolean(researcherForm.availability),
        status: toBoolean(researcherForm.status),
        universityId: researcherForm.universityId,
        universityName: researcherForm.universityName.trim(),
      })
    }

    if (!result.ok) {
      setRegisterMessage(result.message)
    }

    setSubmitLoading(false)
  }

  const currentOptions = loginTab === 'empresa' ? accessOptions.companies : accessOptions.researchers

  return (
    <section className="login-page">
      <div className="login-page__bg">
        <div className="login-page__bg-orb login-page__bg-orb--1"></div>
        <div className="login-page__bg-orb login-page__bg-orb--2"></div>
      </div>

      {!isRegister && (
        <div className="login-box login-box--wide" id="loginBox">
          <div className="login-box__header">
            <h1 className="login-box__title">Acesso com os cadastros reais da API</h1>
            <p className="login-box__subtitle">
              Escolha um perfil disponível para continuar ou abra o FAQ desta página para entender
              o funcionamento atual do acesso.
            </p>
            <button
              type="button"
              className="btn btn-outline page-faq-trigger login-box__faq-trigger"
              onClick={() => setIsFaqOpen(true)}
            >
              FAQ da página
            </button>
          </div>

          <div className="login-demo">
            <article className="login-demo__card">
              <span className="login-demo__eyebrow">Empresas</span>
              <h2 className="login-demo__title">{accessOptions.companies.length}</h2>
              <p className="login-demo__credentials">Cadastros disponíveis para acesso no sistema.</p>
            </article>

            <article className="login-demo__card">
              <span className="login-demo__eyebrow">Pesquisadores</span>
              <h2 className="login-demo__title">{accessOptions.researchers.length}</h2>
              <p className="login-demo__credentials">Perfis disponíveis para acesso no sistema.</p>
            </article>
          </div>

          <div className="login-tabs">
            <div
              className={`login-tab${loginTab === 'empresa' ? ' active' : ''}`}
              onClick={() => setLoginTab('empresa')}
            >
              Empresa
            </div>
            <div
              className={`login-tab${loginTab === 'pesquisador' ? ' active' : ''}`}
              onClick={() => setLoginTab('pesquisador')}
            >
              Pesquisador
            </div>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="entity-select">
                Cadastro disponível
              </label>

              <select
                id="entity-select"
                className="form-input"
                value={selectedEntity[loginTab]}
                onChange={(event) => handleSelectEntity(loginTab, event.target.value)}
                disabled={isLoadingOptions || submitLoading}
              >
                <option value="">Selecione um cadastro</option>
                {currentOptions.map((item) => (
                  <option
                    key={loginTab === 'empresa' ? item.id_company : item.id_researcher}
                    value={loginTab === 'empresa' ? item.id_company : item.id_researcher}
                  >
                    {loginTab === 'empresa'
                      ? `${item.name} | ${item.cnpj}`
                      : `${item.name} | disponibilidade ${formatBooleanLabel(item.availability, {
                        trueLabel: 'ativa',
                        falseLabel: 'inativa',
                        nullLabel: 'não informada',
                      })}`}
                  </option>
                ))}
              </select>
            </div>

            <p className="login-inline-help">
              {loginTab === 'empresa'
                ? 'Ao entrar como empresa, o sistema carrega o perfil institucional correspondente.'
                : 'Ao entrar como pesquisador, o sistema carrega o perfil e os dados do currículo correspondente.'}
            </p>

            {loadError ? (
              <div className="login-feedback login-feedback--error">
                <p>{loadError}</p>
                <button type="button" className="btn btn-ghost" onClick={loadAccessOptions}>
                  Tentar novamente
                </button>
              </div>
            ) : null}

            {!isLoadingOptions && !loadError && currentOptions.length === 0 ? (
              <div className="login-feedback">
                <p>Nenhum cadastro desse perfil foi encontrado na API.</p>
                <button type="button" className="btn btn-ghost" onClick={(event) => openRegisterForm(event)}>
                  Ir para cadastro
                </button>
              </div>
            ) : null}

            {loginMessage ? <p className="login-message">{loginMessage}</p> : null}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={isLoadingOptions || submitLoading}>
                {submitLoading ? 'Entrando...' : 'Entrar com esse perfil'}
              </button>
            </div>
          </form>

          <div className="form-divider">ou</div>

          <div className="form-footer">
            Ainda não possui cadastro? <a href="/login#cadastro" onClick={openRegisterForm}>Cadastrar novo perfil</a>
          </div>
        </div>
      )}

      {isRegister && (
        <div className="login-box login-box--wide" id="registerBox">
          <div className="login-box__header">
            <h1 className="login-box__title">Cadastro aderente ao backend atual</h1>
            <p className="login-box__subtitle">
              Preencha os dados do perfil desejado e use o FAQ se quiser entender o que já está
              integrado nesta etapa.
            </p>
            <button
              type="button"
              className="btn btn-outline page-faq-trigger login-box__faq-trigger"
              onClick={() => setIsFaqOpen(true)}
            >
              FAQ da página
            </button>
          </div>

          <div className="login-tabs">
            <div
              className={`login-tab${regTab === 'empresa' ? ' active' : ''}`}
              onClick={() => setRegTab('empresa')}
            >
              Empresa
            </div>
            <div
              className={`login-tab${regTab === 'pesquisador' ? ' active' : ''}`}
              onClick={() => setRegTab('pesquisador')}
            >
              Pesquisador
            </div>
          </div>

          <form onSubmit={handleRegisterSubmit} className="login-register-preview">
            {regTab === 'empresa' ? (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="company-name">Nome da empresa</label>
                    <input
                      id="company-name"
                      className="form-input"
                      value={companyForm.name}
                      onChange={(event) => handleCompanyFormChange('name', event.target.value)}
                      placeholder="Ex.: EcoMove Mobility"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="company-cnpj">CNPJ</label>
                    <input
                      id="company-cnpj"
                      className="form-input"
                      value={companyForm.cnpj}
                      onChange={(event) => handleCompanyFormChange('cnpj', event.target.value)}
                      placeholder="12.345.678/0001-90"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="company-status">Situação cadastral</label>
                    <input
                      id="company-status"
                      className="form-input"
                      value={companyForm.registrationStatus}
                      onChange={(event) => handleCompanyFormChange('registrationStatus', event.target.value)}
                      placeholder="Ex.: Ativo"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="company-active">Status do cadastro</label>
                    <select
                      id="company-active"
                      className="form-input"
                      value={companyForm.status}
                      onChange={(event) => handleCompanyFormChange('status', event.target.value)}
                    >
                      <option value="true">Ativo</option>
                      <option value="false">Inativo</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="researcher-name">Nome completo</label>
                    <input
                      id="researcher-name"
                      className="form-input"
                      value={researcherForm.name}
                      onChange={(event) => handleResearcherFormChange('name', event.target.value)}
                      placeholder="Ex.: Dra. Camila Nunes"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="researcher-university">Universidade existente</label>
                    <select
                      id="researcher-university"
                      className="form-input"
                      value={researcherForm.universityId}
                      onChange={(event) => handleResearcherFormChange('universityId', event.target.value)}
                    >
                      <option value="">Selecione uma universidade</option>
                      {accessOptions.universities.map((item) => (
                        <option key={item.id_university} value={item.id_university}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="researcher-availability">Disponibilidade</label>
                    <select
                      id="researcher-availability"
                      className="form-input"
                      value={researcherForm.availability}
                      onChange={(event) => handleResearcherFormChange('availability', event.target.value)}
                    >
                      <option value="true">Disponível</option>
                      <option value="false">Indisponível</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="researcher-status">Status do cadastro</label>
                    <select
                      id="researcher-status"
                      className="form-input"
                      value={researcherForm.status}
                      onChange={(event) => handleResearcherFormChange('status', event.target.value)}
                    >
                      <option value="true">Ativo</option>
                      <option value="false">Inativo</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="researcher-university-new">Nova universidade</label>
                  <input
                    id="researcher-university-new"
                    className="form-input"
                    value={researcherForm.universityName}
                    onChange={(event) => handleResearcherFormChange('universityName', event.target.value)}
                    placeholder="Use este campo se a universidade ainda não existir na base"
                  />
                </div>
              </>
            )}

            {registerMessage ? <p className="login-message">{registerMessage}</p> : null}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitLoading}>
                {submitLoading ? 'Salvando...' : 'Cadastrar e entrar'}
              </button>
            </div>
          </form>

          <div className="form-footer">
            Já possui cadastro? <a href="/login" onClick={openLoginForm}>Voltar para o acesso</a>
          </div>
        </div>
      )}

      <PageFaq
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        title="Acesso e cadastro"
        intro={authMode}
        sections={loginFaqSections}
      />
    </section>
  )
}
