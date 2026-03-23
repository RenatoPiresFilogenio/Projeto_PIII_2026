import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function LoginPage() {
  const location = useLocation()
  const [isRegister, setIsRegister] = useState(false)
  const [loginTab, setLoginTab] = useState('empresa')
  const [regTab, setRegTab] = useState('empresa')

  useEffect(() => {
    if (location.hash === '#cadastro') {
      setIsRegister(true)
    }
  }, [location])

  const toggleForm = (e) => {
    e.preventDefault()
    setIsRegister((prev) => !prev)
  }

  return (
    <section className="login-page">
      <div className="login-page__bg">
        <div className="login-page__bg-orb login-page__bg-orb--1"></div>
        <div className="login-page__bg-orb login-page__bg-orb--2"></div>
      </div>

      {/* LOGIN SECTION */}
      {!isRegister && (
        <div className="login-box" id="loginBox">
          <div className="login-box__header">
            <h1 className="login-box__title">Bem-vindo de volta</h1>
            <p className="login-box__subtitle">Acesse sua conta para continuar</p>
          </div>

          <div className="login-tabs">
            <div
              className={`login-tab${loginTab === 'empresa' ? ' active' : ''}`}
              onClick={() => setLoginTab('empresa')}
            >
              🏢 Empresa
            </div>
            <div
              className={`login-tab${loginTab === 'pesquisador' ? ' active' : ''}`}
              onClick={() => setLoginTab('pesquisador')}
            >
              🎓 Pesquisador
            </div>
          </div>

          {/* Empresa Login */}
          {loginTab === 'empresa' && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label" htmlFor="empresa-email">E-mail corporativo</label>
                <input type="email" id="empresa-email" className="form-input" placeholder="contato@suaempresa.com.br" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="empresa-senha">Senha</label>
                <input type="password" id="empresa-senha" className="form-input" placeholder="••••••••" />
              </div>
              <div className="form-checkbox">
                <input type="checkbox" id="empresa-lembrar" />
                <label htmlFor="empresa-lembrar">Lembrar de mim</label>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Entrar</button>
              </div>
            </form>
          )}

          {/* Pesquisador Login */}
          {loginTab === 'pesquisador' && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label" htmlFor="pesq-email">E-mail institucional</label>
                <input type="email" id="pesq-email" className="form-input" placeholder="pesquisador@universidade.edu.br" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="pesq-senha">Senha</label>
                <input type="password" id="pesq-senha" className="form-input" placeholder="••••••••" />
              </div>
              <div className="form-checkbox">
                <input type="checkbox" id="pesq-lembrar" />
                <label htmlFor="pesq-lembrar">Lembrar de mim</label>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Entrar</button>
              </div>
            </form>
          )}

          <div className="form-divider">ou</div>

          <div className="form-footer">
            Ainda não tem conta? <a href="#" onClick={toggleForm}>Cadastre-se gratuitamente</a>
          </div>
        </div>
      )}

      {/* REGISTER SECTION */}
      {isRegister && (
        <div className="login-box" id="registerBox">
          <div className="login-box__header">
            <h1 className="login-box__title">Criar Conta</h1>
            <p className="login-box__subtitle">Comece a conectar inovação e pesquisa</p>
          </div>

          <div className="login-tabs">
            <div
              className={`login-tab${regTab === 'empresa' ? ' active' : ''}`}
              onClick={() => setRegTab('empresa')}
            >
              🏢 Empresa
            </div>
            <div
              className={`login-tab${regTab === 'pesquisador' ? ' active' : ''}`}
              onClick={() => setRegTab('pesquisador')}
            >
              🎓 Pesquisador
            </div>
          </div>

          {/* Empresa Register */}
          {regTab === 'empresa' && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-emp-nome">Nome da Empresa</label>
                <input type="text" id="reg-emp-nome" className="form-input" placeholder="Sua Empresa Ltda." />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-emp-setor">Setor de Atuação</label>
                  <input type="text" id="reg-emp-setor" className="form-input" placeholder="Tecnologia, Saúde..." />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-emp-porte">Porte</label>
                  <input type="text" id="reg-emp-porte" className="form-input" placeholder="PME, Grande..." />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-emp-email">E-mail corporativo</label>
                <input type="email" id="reg-emp-email" className="form-input" placeholder="contato@empresa.com.br" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-emp-senha">Senha</label>
                <input type="password" id="reg-emp-senha" className="form-input" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-emp-local">Localização</label>
                <input type="text" id="reg-emp-local" className="form-input" placeholder="São Paulo, SP" />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Criar Conta</button>
              </div>
            </form>
          )}

          {/* Pesquisador Register */}
          {regTab === 'pesquisador' && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-pesq-nome">Nome Completo</label>
                <input type="text" id="reg-pesq-nome" className="form-input" placeholder="Dr. João Silva" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-pesq-area">Área de Atuação</label>
                  <input type="text" id="reg-pesq-area" className="form-input" placeholder="IA, Biotecnologia..." />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-pesq-inst">Instituição</label>
                  <input type="text" id="reg-pesq-inst" className="form-input" placeholder="USP, UNICAMP..." />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-pesq-email">E-mail institucional</label>
                <input type="email" id="reg-pesq-email" className="form-input" placeholder="pesquisador@universidade.edu.br" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-pesq-senha">Senha</label>
                <input type="password" id="reg-pesq-senha" className="form-input" placeholder="••••••••" />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Criar Conta</button>
              </div>
            </form>
          )}

          <div className="form-divider">ou</div>

          <div className="form-footer">
            Já tem uma conta? <a href="#" onClick={toggleForm}>Faça login</a>
          </div>
        </div>
      )}
    </section>
  )
}
