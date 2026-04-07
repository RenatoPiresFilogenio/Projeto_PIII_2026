import { useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function buildInitialProfile(user) {
  if (user?.tipoUsuario?.nome === 'empresa') {
    return {
      nomeEmpresa: user.empresa.nome,
      cnpj: user.empresa.cnpj,
      setor: user.empresa.setor,
      localizacao: user.empresa.localizacao,
      porte: user.empresa.dados.porte,
      descricao: user.empresa.dados.descricao,
      focoPdi: user.empresa.dados.focoPdi,
      site: user.empresa.dados.site,
      email: user.email,
      telefone: user.usuarioTelefone?.[0] ?? '',
    }
  }

  return {
    nome: user?.pesquisador?.nome ?? '',
    email: user?.email ?? '',
    telefone: user?.usuarioTelefone?.[0] ?? '',
    universidade: user?.pesquisador?.universidade?.nome ?? '',
    disponibilidade: user?.pesquisador?.disponibilidade ?? '',
    areas: user?.pesquisador?.areaPesquisa?.join(', ') ?? '',
    resumo: user?.pesquisador?.curriculo?.resumo ?? '',
    habilidades: user?.pesquisador?.curriculo?.habilidades?.join(', ') ?? '',
  }
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState(() => buildInitialProfile(user))

  const isEmpresa = user?.tipoUsuario?.nome === 'empresa'

  const supportData = useMemo(() => {
    if (isEmpresa) {
      return user?.empresa?.desafios ?? []
    }

    return user?.pesquisador?.pesquisas ?? []
  }, [isEmpresa, user])

  const timelineData = useMemo(() => {
    if (isEmpresa) {
      return [
        { label: 'Status da empresa', value: user?.empresa?.status },
        { label: 'Comprovante', value: user?.empresa?.comprovanteInscricao },
        { label: 'Area principal', value: user?.empresa?.setor },
      ]
    }

    return user?.pesquisador?.curriculo?.formacao ?? []
  }, [isEmpresa, user])

  const detailData = useMemo(() => (
    isEmpresa
      ? []
      : user?.pesquisador?.curriculo?.experiencias ?? []
  ), [isEmpresa, user])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setSaved(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <section className="app-page profile-page">
      <div className="container app-page__container">
        <header className="app-page__header">
          <div>
            <span className="section-label">Editar perfil</span>
            <h1 className="app-page__title">
              {isEmpresa ? 'Perfil institucional da empresa' : 'Perfil academico e profissional'}
            </h1>
          </div>
          <p className="app-page__subtitle">
            Estrutura adaptada ao tipo de usuario, com foco em dados principais e historico relevante.
          </p>
        </header>

        <div className="profile-layout">
          <form className="profile-form-card" onSubmit={handleSubmit}>
            <div className="profile-form-card__head">
              <div>
                <span className="profile-form-card__eyebrow">
                  {isEmpresa ? 'Empresa' : 'Pesquisador'}
                </span>
                <h2 className="profile-form-card__title">
                  {isEmpresa ? 'Informacoes principais' : 'Dados de apresentacao'}
                </h2>
              </div>
              {saved ? <span className="profile-form-card__status">Alteracoes simuladas salvas</span> : null}
            </div>

            <div className="profile-form-grid">
              {isEmpresa ? (
                <>
                  <label className="profile-field">
                    <span>Nome da empresa</span>
                    <input name="nomeEmpresa" value={formData.nomeEmpresa} onChange={handleChange} />
                  </label>
                  <label className="profile-field">
                    <span>CNPJ</span>
                    <input name="cnpj" value={formData.cnpj} onChange={handleChange} />
                  </label>
                  <label className="profile-field">
                    <span>Setor de atuacao</span>
                    <input name="setor" value={formData.setor} onChange={handleChange} />
                  </label>
                  <label className="profile-field">
                    <span>Localizacao</span>
                    <input name="localizacao" value={formData.localizacao} onChange={handleChange} />
                  </label>
                  <label className="profile-field">
                    <span>Porte</span>
                    <input name="porte" value={formData.porte} onChange={handleChange} />
                  </label>
                  <label className="profile-field">
                    <span>Site</span>
                    <input name="site" value={formData.site} onChange={handleChange} />
                  </label>
                  <label className="profile-field profile-field--full">
                    <span>Descricao institucional</span>
                    <textarea
                      name="descricao"
                      rows={4}
                      value={formData.descricao}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="profile-field profile-field--full">
                    <span>Foco de P&D</span>
                    <textarea
                      name="focoPdi"
                      rows={3}
                      value={formData.focoPdi}
                      onChange={handleChange}
                    />
                  </label>
                </>
              ) : (
                <>
                  <label className="profile-field">
                    <span>Nome completo</span>
                    <input name="nome" value={formData.nome} onChange={handleChange} />
                  </label>
                  <label className="profile-field">
                    <span>E-mail institucional</span>
                    <input name="email" value={formData.email} onChange={handleChange} />
                  </label>
                  <label className="profile-field">
                    <span>Telefone</span>
                    <input name="telefone" value={formData.telefone} onChange={handleChange} />
                  </label>
                  <label className="profile-field">
                    <span>Universidade</span>
                    <input name="universidade" value={formData.universidade} onChange={handleChange} />
                  </label>
                  <label className="profile-field">
                    <span>Disponibilidade</span>
                    <input name="disponibilidade" value={formData.disponibilidade} onChange={handleChange} />
                  </label>
                  <label className="profile-field profile-field--full">
                    <span>Areas de atuacao</span>
                    <input name="areas" value={formData.areas} onChange={handleChange} />
                  </label>
                  <label className="profile-field profile-field--full">
                    <span>Resumo do curriculo</span>
                    <textarea name="resumo" rows={4} value={formData.resumo} onChange={handleChange} />
                  </label>
                  <label className="profile-field profile-field--full">
                    <span>Habilidades</span>
                    <textarea
                      name="habilidades"
                      rows={3}
                      value={formData.habilidades}
                      onChange={handleChange}
                    />
                  </label>
                </>
              )}
            </div>

            <div className="profile-form-card__actions">
              <button type="submit" className="btn btn-primary">
                Salvar alteracoes
              </button>
            </div>
          </form>

          <aside className="profile-side">
            <section className="profile-side__card">
              <span className="profile-side__eyebrow">
                {isEmpresa ? 'Estrutura institucional' : 'Formacao e experiencia'}
              </span>
              <h3 className="profile-side__title">
                {isEmpresa ? 'Base institucional' : 'Base academica'}
              </h3>
              <div className="profile-side__stack">
                {timelineData.map((item) => (
                  <article key={item.label || item.curso} className="profile-side__item">
                    <strong>{item.label || item.curso}</strong>
                    <span>{item.value || item.instituicao}</span>
                    {item.conclusao ? <small>Conclusao: {item.conclusao}</small> : null}
                  </article>
                ))}
              </div>
            </section>

            {detailData.length > 0 ? (
              <section className="profile-side__card">
                <span className="profile-side__eyebrow">Experiencias</span>
                <div className="profile-side__stack">
                  {detailData.map((item) => (
                    <article key={item.titulo} className="profile-side__item">
                      <strong>{item.titulo}</strong>
                      <span>{item.periodo}</span>
                      <small>{item.descricao}</small>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="profile-side__card">
              <span className="profile-side__eyebrow">
                {isEmpresa ? 'Desafios publicados' : 'Pesquisas cadastradas'}
              </span>
              <div className="profile-side__stack">
                {supportData.map((item) => (
                  <article key={item.id} className="profile-side__item">
                    <strong>{item.titulo}</strong>
                    <span>{item.status}</span>
                    <small>{item.areaPesquisa || item.area}</small>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  )
}
