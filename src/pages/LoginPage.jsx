import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const defaultLoginState = {
  empresa: {
    email: 'contato@ecomove.com.br',
    password: 'empresa123',
  },
  pesquisador: {
    email: 'camila.nunes@ufscar.br',
    password: 'pesquisa123',
  },
}

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, login, loginWithDemo, demoAccounts } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [loginTab, setLoginTab] = useState('empresa')
  const [regTab, setRegTab] = useState('empresa')
  const [message, setMessage] = useState('')
  const [loginState, setLoginState] = useState(defaultLoginState)

  useEffect(() => {
    if (location.hash === '#cadastro') {
      setIsRegister(true)
    }
  }, [location])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/pesquisa', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const toggleForm = (event) => {
    event.preventDefault()
    setIsRegister((prev) => !prev)
    setMessage('')
  }

  const handleChange = (type, field, value) => {
    setLoginState((current) => ({
      ...current,
      [type]: {
        ...current[type],
        [field]: value,
      },
    }))
    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = loginState[loginTab]
    const result = login({
      type: loginTab,
      email: payload.email,
      password: payload.password,
    })

    if (!result.ok) {
      setMessage(result.message)
    }
  }

  const handleDemoAccess = (type) => {
    loginWithDemo(type)
  }

  return (
    <section className="login-page">
      <div className="login-page__bg">
        <div className="login-page__bg-orb login-page__bg-orb--1"></div>
        <div className="login-page__bg-orb login-page__bg-orb--2"></div>
      </div>

      {!isRegister && (
        <div className="login-box login-box--wide" id="loginBox">
          <div className="login-box__header">
            <h1 className="login-box__title">Acesse a area autenticada</h1>
            <p className="login-box__subtitle">
              Depois do login, o usuario vai direto para a tela principal de pesquisa semantica.
            </p>
          </div>

          <div className="login-demo">
            <article className="login-demo__card">
              <span className="login-demo__eyebrow">Empresa demo</span>
              <h2 className="login-demo__title">{demoAccounts.empresa.label}</h2>
              <p className="login-demo__credentials">
                {demoAccounts.empresa.email}
                <br />
                senha: {demoAccounts.empresa.password}
              </p>
              <button type="button" className="btn btn-primary" onClick={() => handleDemoAccess('empresa')}>
                Entrar como empresa
              </button>
            </article>

            <article className="login-demo__card">
              <span className="login-demo__eyebrow">Pesquisador demo</span>
              <h2 className="login-demo__title">{demoAccounts.pesquisador.label}</h2>
              <p className="login-demo__credentials">
                {demoAccounts.pesquisador.email}
                <br />
                senha: {demoAccounts.pesquisador.password}
              </p>
              <button type="button" className="btn btn-primary" onClick={() => handleDemoAccess('pesquisador')}>
                Entrar como pesquisador
              </button>
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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">E-mail</label>
              <input
                type="email"
                id="login-email"
                className="form-input"
                value={loginState[loginTab].email}
                onChange={(event) => handleChange(loginTab, 'email', event.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Senha</label>
              <input
                type="password"
                id="login-password"
                className="form-input"
                value={loginState[loginTab].password}
                onChange={(event) => handleChange(loginTab, 'password', event.target.value)}
              />
            </div>

            {message ? <p className="login-message">{message}</p> : null}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Entrar</button>
            </div>
          </form>

          <div className="form-divider">ou</div>

          <div className="form-footer">
            Quer visualizar tambem o cadastro? <a href="#cadastro" onClick={toggleForm}>Abrir exemplo de cadastro</a>
          </div>
        </div>
      )}

      {isRegister && (
        <div className="login-box login-box--wide" id="registerBox">
          <div className="login-box__header">
            <h1 className="login-box__title">Cadastro visual do produto</h1>
            <p className="login-box__subtitle">
              Esta etapa permanece como demonstracao de interface enquanto o backend ainda nao foi integrado.
            </p>
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

          {regTab === 'empresa' ? (
            <div className="login-register-preview">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nome da empresa</label>
                  <input className="form-input" placeholder="Ex.: EcoMove Mobility" />
                </div>
                <div className="form-group">
                  <label className="form-label">CNPJ</label>
                  <input className="form-input" placeholder="12.345.678/0001-90" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Setor</label>
                  <input className="form-input" placeholder="Mobilidade eletrica" />
                </div>
                <div className="form-group">
                  <label className="form-label">Localizacao</label>
                  <input className="form-input" placeholder="Campinas, SP" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Descricao institucional</label>
                <textarea className="form-input login-register-preview__textarea" placeholder="Resumo da empresa, foco em P&D e objetivos de parceria." />
              </div>
            </div>
          ) : (
            <div className="login-register-preview">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nome completo</label>
                  <input className="form-input" placeholder="Ex.: Dra. Camila Nunes" />
                </div>
                <div className="form-group">
                  <label className="form-label">Universidade</label>
                  <input className="form-input" placeholder="Ex.: UFSCar" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Areas de atuacao</label>
                  <input className="form-input" placeholder="Baterias, energia, materiais" />
                </div>
                <div className="form-group">
                  <label className="form-label">Disponibilidade</label>
                  <input className="form-input" placeholder="Disponivel para parceria" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Resumo academico</label>
                <textarea className="form-input login-register-preview__textarea" placeholder="Resumo do curriculo, habilidades, experiencias e linhas de pesquisa." />
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-primary" onClick={() => setIsRegister(false)}>
              Voltar para login
            </button>
          </div>

          <div className="form-footer">
            Para navegar no sistema agora, use os perfis demo na tela de login.
          </div>
        </div>
      )}
    </section>
  )
}
