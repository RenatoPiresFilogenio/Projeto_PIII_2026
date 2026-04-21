import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  createCompany,
  createResearcher,
  createResume,
  createUniversity,
  getCompany,
  getResearcher,
  getResearcherResume,
  getUniversity,
} from '../services/pdConnectApi'

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

function buildFriendlyErrorMessage(error, fallback) {
  if (!error?.message) {
    return fallback
  }

  return error.message
}

function normalizeCompanyUser(company) {
  return {
    type: 'empresa',
    profileId: company.id_company,
    displayName: company.name,
    company,
    researcher: null,
    university: null,
    resume: null,
  }
}

function normalizeResearcherUser(researcher, university = null, resume = null) {
  return {
    type: 'pesquisador',
    profileId: researcher.id_researcher,
    displayName: researcher.name,
    company: null,
    researcher,
    university,
    resume,
  }
}

async function buildUserFromSession(session) {
  if (!session?.type || !session?.id) {
    throw new Error('Sessão local inválida. Entre novamente para continuar.')
  }

  if (session.type === 'empresa') {
    const company = await getCompany(session.id)
    return normalizeCompanyUser(company)
  }

  if (session.type === 'pesquisador') {
    const researcher = await getResearcher(session.id)

    const [universityResult, resumeResult] = await Promise.allSettled([
      researcher.university ? getUniversity(researcher.university) : Promise.resolve(null),
      getResearcherResume(researcher.id_researcher),
    ])

    return normalizeResearcherUser(
      researcher,
      universityResult.status === 'fulfilled' ? universityResult.value : null,
      resumeResult.status === 'fulfilled' ? resumeResult.value : null
    )
  }

  throw new Error('Tipo de perfil não suportado na sessão atual.')
}

function persistSession(session) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

function clearStoredSession() {
  window.localStorage.removeItem(STORAGE_KEY)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [isBootstrapping, setIsBootstrapping] = useState(true)
  const [authError, setAuthError] = useState('')

  const hydrateSession = async (nextSession, options = {}) => {
    const { persist = true } = options

    setIsBootstrapping(true)
    setAuthError('')

    try {
      const nextUser = await buildUserFromSession(nextSession)
      setSession(nextSession)
      setUser(nextUser)

      if (persist) {
        persistSession(nextSession)
      }

      return { ok: true, user: nextUser }
    } catch (error) {
      setSession(null)
      setUser(null)
      clearStoredSession()

      const message = buildFriendlyErrorMessage(
        error,
        'Não foi possível restaurar a sessão local com os dados atuais da API.'
      )
      setAuthError(message)

      return { ok: false, message }
    } finally {
      setIsBootstrapping(false)
    }
  }

  useEffect(() => {
    const storedSession = readStoredSession()

    if (!storedSession) {
      setIsBootstrapping(false)
      return
    }

    hydrateSession(storedSession, { persist: false })
  }, [])

  const value = useMemo(() => ({
    user,
    session,
    isAuthenticated: Boolean(user),
    isBootstrapping,
    authError,
    authMode:
      'A API atual não possui rotas de autenticação. O acesso autenticado do front usa seleção de cadastro existente e sessão local por perfil.',
    signInAsEntity: async ({ type, id }) => {
      if (!type || !id) {
        return {
          ok: false,
          message: 'Selecione um cadastro válido antes de entrar na área autenticada.',
        }
      }

      return hydrateSession({ type, id: Number(id) })
    },
    registerCompany: async ({ name, cnpj, registrationStatus, status }) => {
      try {
        const createdCompany = await createCompany({
          name,
          cnpj,
          registration_status: registrationStatus || null,
          status,
        })

        return hydrateSession({
          type: 'empresa',
          id: createdCompany.id_company,
        })
      } catch (error) {
        return {
          ok: false,
          message: buildFriendlyErrorMessage(
            error,
            'Não foi possível cadastrar a empresa com os dados informados.'
          ),
        }
      }
    },
    registerResearcher: async ({ name, availability, status, universityId, universityName }) => {
      try {
        let resolvedUniversityId = universityId ? Number(universityId) : null

        if (!resolvedUniversityId && universityName?.trim()) {
          const createdUniversity = await createUniversity({ name: universityName.trim() })
          resolvedUniversityId = createdUniversity.id_university
        }

        if (!resolvedUniversityId) {
          return {
            ok: false,
            message: 'Selecione uma universidade existente ou informe uma nova para o cadastro.',
          }
        }

        const createdResume = await createResume()

        const createdResearcher = await createResearcher({
          name,
          availability,
          status,
          university: resolvedUniversityId,
          resume: createdResume.id_resume,
        })

        return hydrateSession({
          type: 'pesquisador',
          id: createdResearcher.id_researcher,
        })
      } catch (error) {
        return {
          ok: false,
          message: buildFriendlyErrorMessage(
            error,
            'Não foi possível cadastrar o pesquisador com os dados informados.'
          ),
        }
      }
    },
    refreshUser: async () => {
      if (!session) {
        return {
          ok: false,
          message: 'Não existe sessão ativa para atualizar.',
        }
      }

      return hydrateSession(session)
    },
    logout: () => {
      setSession(null)
      setUser(null)
      setAuthError('')
      setIsBootstrapping(false)
      clearStoredSession()
    },
  }), [authError, isBootstrapping, session, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
