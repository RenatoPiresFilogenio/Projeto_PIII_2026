import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoAccounts, getDemoAccountByType, sanitizeSessionUser } from '../mocks/mockUsers'

const STORAGE_KEY = 'pdconnect-auth-session'

const AuthContext = createContext(null)

function readStoredSession() {
  try {
    const rawSession = window.localStorage.getItem(STORAGE_KEY)
    return rawSession ? JSON.parse(rawSession) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredSession())

  useEffect(() => {
    if (!user) {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }, [user])

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login: ({ type, email, password }) => {
      const account = getDemoAccountByType(type)

      if (!account) {
        return { ok: false, message: 'Tipo de usuario nao encontrado.' }
      }

      if (email !== account.email || password !== account.password) {
        return { ok: false, message: 'Credenciais invalidas para o perfil selecionado.' }
      }

      const sessionUser = sanitizeSessionUser(account)
      setUser(sessionUser)
      return { ok: true, user: sessionUser }
    },
    loginWithDemo: (type) => {
      const account = getDemoAccountByType(type)

      if (!account) {
        return { ok: false, message: 'Perfil demo nao encontrado.' }
      }

      const sessionUser = sanitizeSessionUser(account)
      setUser(sessionUser)
      return { ok: true, user: sessionUser }
    },
    logout: () => setUser(null),
    demoAccounts: {
      empresa: {
        email: demoAccounts.empresa.email,
        password: demoAccounts.empresa.password,
        label: demoAccounts.empresa.empresa.nome,
      },
      pesquisador: {
        email: demoAccounts.pesquisador.email,
        password: demoAccounts.pesquisador.password,
        label: demoAccounts.pesquisador.pesquisador.nome,
      },
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
