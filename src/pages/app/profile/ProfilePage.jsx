import { useEffect, useMemo, useState } from 'react'
import { formatBooleanLabel, formatDateLabel } from '../../../lib/domain'
import { useAuth } from '../../../context/AuthContext'
import {
  createEducation,
  deleteEducation,
  updateCompany,
  updateResearcher,
} from '../../../services/pdConnectApi'
import './ProfilePage.scss'

const PAGE_SIZE = 5

const defaultEducationForm = {
  course: '',
  institution: '',
  startDate: '',
  endDate: '',
}

function buildInitialProfile(user) {
  if (user?.type === 'empresa') {
    return {
      name: user.company?.name || '',
      cnpj: user.company?.cnpj || '',
      registrationStatus: user.company?.registration_status || '',
      status: String(Boolean(user.company?.status)),
    }
  }

  return {
    name: user?.researcher?.name || '',
    availability:
      user?.researcher?.availability === null || user?.researcher?.availability === undefined
        ? 'true'
        : String(Boolean(user?.researcher?.availability)),
    status: String(Boolean(user?.researcher?.status)),
    university: user?.researcher?.university ? String(user.researcher.university) : '',
    resume: user?.researcher?.resume || '',
  }
}

function toBoolean(value) {
  return value === 'true'
}

function paginateItems(items, page) {
  const startIndex = (page - 1) * PAGE_SIZE
  return items.slice(startIndex, startIndex + PAGE_SIZE)
}

function buildPageLabel(page, totalItems) {
  if (!totalItems) {
    return '0 de 0'
  }

  const start = (page - 1) * PAGE_SIZE + 1
  const end = Math.min(page * PAGE_SIZE, totalItems)
  return `${start}-${end} de ${totalItems}`
}

export default function ProfilePage() {
  const { refreshUser, user } = useAuth()
  const [savedMessage, setSavedMessage] = useState('')
  const [resumeMessage, setResumeMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isEducationSaving, setIsEducationSaving] = useState(false)
  const [formData, setFormData] = useState(() => buildInitialProfile(user))
  const [educationForm, setEducationForm] = useState(defaultEducationForm)
  const [activeResearcherTab, setActiveResearcherTab] = useState('general')
  const [educationPage, setEducationPage] = useState(1)
  const [skillsPage, setSkillsPage] = useState(1)

  const isEmpresa = user?.type === 'empresa'
  const resumeData = user?.resume || { education: [], experience: [], skill: [] }
  const researcherUniversityName = user?.university?.name || 'Universidade não informada'
  const researcherStatusLabel = formatBooleanLabel(user?.researcher?.status, {
    trueLabel: 'Ativo',
    falseLabel: 'Inativo',
    nullLabel: 'Não informado',
  })

  const totalEducationPages = Math.max(1, Math.ceil((resumeData.education?.length || 0) / PAGE_SIZE))
  const totalSkillsPages = Math.max(1, Math.ceil((resumeData.skill?.length || 0) / PAGE_SIZE))

  const paginatedEducation = useMemo(
    () => paginateItems(resumeData.education || [], educationPage),
    [educationPage, resumeData.education]
  )

  const paginatedSkills = useMemo(
    () => paginateItems(resumeData.skill || [], skillsPage),
    [resumeData.skill, skillsPage]
  )

  useEffect(() => {
    setFormData(buildInitialProfile(user))
  }, [user])

  useEffect(() => {
    setEducationPage((current) => Math.min(current, totalEducationPages))
  }, [totalEducationPages])

  useEffect(() => {
    setSkillsPage((current) => Math.min(current, totalSkillsPages))
  }, [totalSkillsPages])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setSavedMessage('')
    setErrorMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setSavedMessage('')
    setErrorMessage('')

    try {
      if (isEmpresa) {
        await updateCompany(user.company.id_company, {
          name: formData.name.trim(),
          cnpj: formData.cnpj.trim(),
          registration_status: formData.registrationStatus.trim() || null,
          status: toBoolean(formData.status),
        })
      } else {
        await updateResearcher(user.researcher.id_researcher, {
          name: formData.name.trim(),
          availability: toBoolean(formData.availability),
          status: user.researcher.status,
          university: user.researcher.university,
          resume: user.researcher.resume,
        })
      }

      const refreshed = await refreshUser()

      if (!refreshed.ok) {
        throw new Error(refreshed.message)
      }

      setSavedMessage('Perfil atualizado com sucesso.')
    } catch (error) {
      setErrorMessage(
        error.message || 'Não foi possível salvar as alterações do perfil neste momento.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleEducationChange = (field, value) => {
    setEducationForm((current) => ({ ...current, [field]: value }))
    setResumeMessage('')
    setErrorMessage('')
  }

  const syncResumeAfterChange = async (message) => {
    const refreshed = await refreshUser()

    if (!refreshed.ok) {
      throw new Error(refreshed.message)
    }

    setResumeMessage(message)
  }

  const handleEducationSubmit = async (event) => {
    event.preventDefault()

    if (!user?.researcher?.resume) {
      setErrorMessage('O pesquisador atual não possui um currículo vinculado para receber formações.')
      return
    }

    setIsEducationSaving(true)
    setResumeMessage('')
    setErrorMessage('')

    try {
      await createEducation({
        course: educationForm.course.trim(),
        institution: educationForm.institution.trim(),
        start_date: educationForm.startDate,
        end_date: educationForm.endDate,
        resume: Number(user.researcher.resume),
      })

      await syncResumeAfterChange('Formação adicionada com sucesso.')
      setEducationForm(defaultEducationForm)
      setActiveResearcherTab('educations')
      setEducationPage(1)
    } catch (error) {
      setErrorMessage(
        error.message || 'Não foi possível adicionar a formação ao currículo.'
      )
    } finally {
      setIsEducationSaving(false)
    }
  }

  const handleEducationDelete = async (educationId) => {
    setIsEducationSaving(true)
    setResumeMessage('')
    setErrorMessage('')

    try {
      await deleteEducation(educationId)
      await syncResumeAfterChange('Formação removida com sucesso.')
    } catch (error) {
      setErrorMessage(
        error.message || 'Não foi possível remover a formação selecionada.'
      )
    } finally {
      setIsEducationSaving(false)
    }
  }

  return (
    <section className="app-page profile-page">
      <div className="container app-page__container">
        <header className="app-page__header">
          <div>
            <span className="section-label">Perfil integrado</span>
            <h1 className="app-page__title">
              {isEmpresa ? 'Cadastro institucional da empresa' : 'Perfil do pesquisador'}
            </h1>
          </div>
          <p className="app-page__subtitle">
            A exibição foi reorganizada para priorizar clareza, acesso rápido e menos informações
            técnicas na interface.
          </p>
        </header>

        {isEmpresa ? (
          <div className="profile-layout">
            <form className="profile-form-card" onSubmit={handleSubmit}>
              <div className="profile-form-card__head">
                <div>
                  <span className="profile-form-card__eyebrow">Empresa</span>
                  <h2 className="profile-form-card__title">Informações principais</h2>
                </div>
                {savedMessage ? <span className="profile-form-card__status">{savedMessage}</span> : null}
              </div>

              <div className="profile-form-grid">
                <label className="profile-field">
                  <span>Nome da empresa</span>
                  <input name="name" value={formData.name} onChange={handleChange} />
                </label>

                <label className="profile-field">
                  <span>CNPJ</span>
                  <input name="cnpj" value={formData.cnpj} onChange={handleChange} />
                </label>

                <label className="profile-field profile-field--full">
                  <span>Situação cadastral</span>
                  <input
                    name="registrationStatus"
                    value={formData.registrationStatus}
                    onChange={handleChange}
                    placeholder="Ex.: Ativo"
                  />
                </label>

                <label className="profile-field">
                  <span>Status do cadastro</span>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                </label>
              </div>

              {errorMessage ? <p className="login-message">{errorMessage}</p> : null}

              <div className="profile-form-card__actions">
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                  {isSaving ? 'Salvando...' : 'Salvar alterações'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="profile-tabs-layout">
            <div className="profile-tabs-card">
              <div className="profile-tabs-card__head">
                <div>
                  <span className="profile-form-card__eyebrow">Pesquisador</span>
                  <h2 className="profile-form-card__title">Navegação do perfil</h2>
                </div>
                {savedMessage ? <span className="profile-form-card__status">{savedMessage}</span> : null}
              </div>

              <div className="profile-tabs" role="tablist" aria-label="Abas do perfil do pesquisador">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeResearcherTab === 'general'}
                  className={`profile-tab${activeResearcherTab === 'general' ? ' active' : ''}`}
                  onClick={() => setActiveResearcherTab('general')}
                >
                  Informações gerais
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeResearcherTab === 'educations'}
                  className={`profile-tab${activeResearcherTab === 'educations' ? ' active' : ''}`}
                  onClick={() => setActiveResearcherTab('educations')}
                >
                  Formações
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeResearcherTab === 'skills'}
                  className={`profile-tab${activeResearcherTab === 'skills' ? ' active' : ''}`}
                  onClick={() => setActiveResearcherTab('skills')}
                >
                  Habilidades
                </button>
              </div>

              {errorMessage ? <p className="login-message">{errorMessage}</p> : null}
              {resumeMessage ? <p className="profile-side__message">{resumeMessage}</p> : null}

              {activeResearcherTab === 'general' ? (
                <div className="profile-tab-panel">
                  <form className="profile-form-card profile-form-card--embedded" onSubmit={handleSubmit}>
                    <div className="profile-form-grid">
                      <label className="profile-field">
                        <span>Nome completo</span>
                        <input name="name" value={formData.name} onChange={handleChange} />
                      </label>

                      <label className="profile-field">
                        <span>Disponibilidade</span>
                        <select name="availability" value={formData.availability} onChange={handleChange}>
                          <option value="true">Disponível</option>
                          <option value="false">Indisponível</option>
                        </select>
                      </label>

                      <div className="profile-field profile-field--readonly">
                        <span>Universidade</span>
                        <div className="profile-readonly-value">{researcherUniversityName}</div>
                      </div>

                      <div className="profile-field profile-field--readonly">
                        <span>Status do cadastro</span>
                        <div className="profile-readonly-value">{researcherStatusLabel}</div>
                      </div>
                    </div>

                    <div className="profile-form-card__actions">
                      <button type="submit" className="btn btn-primary" disabled={isSaving}>
                        {isSaving ? 'Salvando...' : 'Salvar alterações'}
                      </button>
                    </div>
                  </form>

                  <section className="profile-side__card">
                    <span className="profile-side__eyebrow">Experiências</span>
                    <h3 className="profile-side__title">Resumo profissional atual</h3>
                    <div className="profile-side__stack">
                      {resumeData.experience?.length > 0 ? (
                        resumeData.experience.map((item) => (
                          <article key={item.id_experience} className="profile-side__item">
                            <strong>{item.description}</strong>
                            <small>
                              {formatDateLabel(item.start_date)} até {formatDateLabel(item.end_date)}
                            </small>
                          </article>
                        ))
                      ) : (
                        <article className="profile-side__item">
                          <strong>Nenhuma experiência cadastrada</strong>
                          <small>Assim que houver experiências no currículo, elas aparecerão aqui.</small>
                        </article>
                      )}
                    </div>
                  </section>
                </div>
              ) : null}

              {activeResearcherTab === 'educations' ? (
                <div className="profile-tab-panel">
                  <section className="profile-side__card">
                    <div className="profile-section-head">
                      <div>
                        <span className="profile-side__eyebrow">Formações</span>
                        <h3 className="profile-side__title">Histórico acadêmico</h3>
                      </div>
                      {resumeData.education?.length > PAGE_SIZE ? (
                        <span className="profile-pagination__meta">
                          {buildPageLabel(educationPage, resumeData.education.length)}
                        </span>
                      ) : null}
                    </div>

                    <div className="profile-side__stack">
                      {paginatedEducation.length > 0 ? (
                        paginatedEducation.map((item) => (
                          <article key={item.id_education} className="profile-side__item">
                            <strong>{item.course}</strong>
                            <span>{item.institution}</span>
                            <small>
                              {formatDateLabel(item.start_date)} até {formatDateLabel(item.end_date)}
                            </small>
                            <button
                              type="button"
                              className="btn btn-ghost profile-side__action"
                              onClick={() => handleEducationDelete(item.id_education)}
                              disabled={isEducationSaving}
                            >
                              Remover formação
                            </button>
                          </article>
                        ))
                      ) : (
                        <article className="profile-side__item">
                          <strong>Nenhuma formação cadastrada</strong>
                          <small>Cadastre sua primeira formação para exibir o histórico acadêmico.</small>
                        </article>
                      )}
                    </div>

                    {resumeData.education?.length > PAGE_SIZE ? (
                      <div className="profile-pagination">
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setEducationPage((current) => Math.max(1, current - 1))}
                          disabled={educationPage === 1}
                        >
                          Anterior
                        </button>
                        <span className="profile-pagination__status">
                          Página {educationPage} de {totalEducationPages}
                        </span>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setEducationPage((current) => Math.min(totalEducationPages, current + 1))}
                          disabled={educationPage === totalEducationPages}
                        >
                          Próxima
                        </button>
                      </div>
                    ) : null}
                  </section>

                  <section className="profile-side__card">
                    <span className="profile-side__eyebrow">Nova formação</span>
                    <h3 className="profile-side__title">Adicionar formação</h3>
                    <form className="profile-inline-form" onSubmit={handleEducationSubmit}>
                      <label className="profile-field">
                        <span>Curso</span>
                        <input
                          value={educationForm.course}
                          onChange={(event) => handleEducationChange('course', event.target.value)}
                        />
                      </label>
                      <label className="profile-field">
                        <span>Instituição</span>
                        <input
                          value={educationForm.institution}
                          onChange={(event) => handleEducationChange('institution', event.target.value)}
                        />
                      </label>
                      <label className="profile-field">
                        <span>Data de início</span>
                        <input
                          type="date"
                          value={educationForm.startDate}
                          onChange={(event) => handleEducationChange('startDate', event.target.value)}
                        />
                      </label>
                      <label className="profile-field">
                        <span>Data de término</span>
                        <input
                          type="date"
                          value={educationForm.endDate}
                          onChange={(event) => handleEducationChange('endDate', event.target.value)}
                        />
                      </label>
                      <button type="submit" className="btn btn-primary" disabled={isEducationSaving}>
                        {isEducationSaving ? 'Salvando...' : 'Adicionar formação'}
                      </button>
                    </form>
                  </section>
                </div>
              ) : null}

              {activeResearcherTab === 'skills' ? (
                <div className="profile-tab-panel">
                  <section className="profile-side__card">
                    <div className="profile-section-head">
                      <div>
                        <span className="profile-side__eyebrow">Habilidades</span>
                        <h3 className="profile-side__title">Competências cadastradas</h3>
                      </div>
                      {resumeData.skill?.length > PAGE_SIZE ? (
                        <span className="profile-pagination__meta">
                          {buildPageLabel(skillsPage, resumeData.skill.length)}
                        </span>
                      ) : null}
                    </div>

                    <div className="profile-side__stack">
                      {paginatedSkills.length > 0 ? (
                        paginatedSkills.map((item) => (
                          <article key={item.id_skill} className="profile-side__item">
                            <strong>{item.description}</strong>
                            <small>Habilidade vinculada ao currículo do pesquisador.</small>
                          </article>
                        ))
                      ) : (
                        <article className="profile-side__item">
                          <strong>Nenhuma habilidade cadastrada</strong>
                          <small>Assim que o currículo tiver habilidades vinculadas, elas aparecerão aqui.</small>
                        </article>
                      )}
                    </div>

                    {resumeData.skill?.length > PAGE_SIZE ? (
                      <div className="profile-pagination">
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setSkillsPage((current) => Math.max(1, current - 1))}
                          disabled={skillsPage === 1}
                        >
                          Anterior
                        </button>
                        <span className="profile-pagination__status">
                          Página {skillsPage} de {totalSkillsPages}
                        </span>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setSkillsPage((current) => Math.min(totalSkillsPages, current + 1))}
                          disabled={skillsPage === totalSkillsPages}
                        >
                          Próxima
                        </button>
                      </div>
                    ) : null}
                  </section>

                  <section className="profile-side__card">
                    <span className="profile-side__eyebrow">Edição restrita</span>
                    <h3 className="profile-side__title">Cadastro de habilidades</h3>
                    <article className="profile-side__item">
                      <strong>Edição indisponível nesta tela</strong>
                      <small>
                        As habilidades permanecem visíveis em leitura. O front não expõe criação
                        ou edição aqui para não simular uma ação que a integração atual não
                        sustenta.
                      </small>
                    </article>
                  </section>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
