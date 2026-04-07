import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthNav() {
  const { user, logout } = useAuth()

  const navItems = useMemo(() => {
    const items = [
      { to: '/pesquisa', label: 'Pesquisa' },
      { to: '/app/indicadores', label: 'Indicadores' },
      { to: '/perfil', label: 'Editar perfil' },
    ]

    if (user?.tipoUsuario?.nome === 'empresa') {
      items.push({ to: '/desafios/novo', label: 'Publicar desafio' })
    }

    return items
  }, [user])

  const profileName = user?.tipoUsuario?.nome === 'empresa'
    ? user?.empresa?.nome
    : user?.pesquisador?.nome

  const profileMeta = user?.tipoUsuario?.nome === 'empresa'
    ? user?.empresa?.setor
    : user?.pesquisador?.universidade?.nome

  return (
    <header className="auth-nav">
      <div className="container auth-nav__inner">
        <div className="auth-nav__brand">
          <div className="logo-icon">PD</div>
          <div>
            <div className="auth-nav__brand-title">P&amp;D Connect</div>
            <div className="auth-nav__brand-subtitle">Area autenticada</div>
          </div>
        </div>

        <nav className="auth-nav__links" aria-label="Navegacao autenticada">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `auth-nav__link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="auth-nav__profile">
          <div className="auth-nav__profile-text">
            <span className="auth-nav__profile-name">{profileName}</span>
            <span className="auth-nav__profile-meta">{profileMeta}</span>
          </div>

          <button type="button" className="btn btn-ghost auth-nav__logout" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
