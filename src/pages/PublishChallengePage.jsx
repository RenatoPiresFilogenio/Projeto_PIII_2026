import { useState } from 'react'

const initialForm = {
  titulo: '',
  problema: '',
  areaPesquisa: '',
  categoria: '',
  objetivo: '',
  prazo: '',
  orcamento: '',
  resultadosEsperados: '',
  localizacao: '',
  setor: '',
}

export default function PublishChallengePage() {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    ;['titulo', 'problema', 'areaPesquisa', 'categoria', 'objetivo', 'prazo', 'resultadosEsperados'].forEach((field) => {
      if (!formData[field].trim()) {
        nextErrors[field] = 'Preencha este campo para continuar.'
      }
    })

    if (formData.orcamento && Number(formData.orcamento.replace(/[^\d]/g, '')) === 0) {
      nextErrors.orcamento = 'Informe um valor estimado valido.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
    }
  }

  return (
    <section className="app-page challenge-page">
      <div className="container app-page__container">
        <header className="app-page__header">
          <div>
            <span className="section-label">Publicar desafio</span>
            <h1 className="app-page__title">Estruture uma demanda de P&D com clareza</h1>
          </div>
          <p className="app-page__subtitle">
            Organize a demanda com escopo, contexto e resultados esperados para facilitar o match com pesquisadores.
          </p>
        </header>

        <form className="challenge-form-card" onSubmit={handleSubmit}>
          <div className="challenge-form-card__section">
            <div className="challenge-form-card__section-head">
              <span className="challenge-form-card__eyebrow">Escopo do desafio</span>
              <h2 className="challenge-form-card__title">Informacoes principais</h2>
            </div>

            <div className="challenge-form-grid">
              <label className="profile-field profile-field--full">
                <span>Titulo do desafio</span>
                <input name="titulo" value={formData.titulo} onChange={handleChange} />
                {errors.titulo ? <small className="field-error">{errors.titulo}</small> : null}
              </label>

              <label className="profile-field profile-field--full">
                <span>Descricao do problema</span>
                <textarea name="problema" rows={5} value={formData.problema} onChange={handleChange} />
                {errors.problema ? <small className="field-error">{errors.problema}</small> : null}
              </label>

              <label className="profile-field">
                <span>Area de pesquisa</span>
                <input name="areaPesquisa" value={formData.areaPesquisa} onChange={handleChange} />
                {errors.areaPesquisa ? <small className="field-error">{errors.areaPesquisa}</small> : null}
              </label>

              <label className="profile-field">
                <span>Categoria / tema</span>
                <input name="categoria" value={formData.categoria} onChange={handleChange} />
                {errors.categoria ? <small className="field-error">{errors.categoria}</small> : null}
              </label>

              <label className="profile-field profile-field--full">
                <span>Objetivo do projeto</span>
                <textarea name="objetivo" rows={4} value={formData.objetivo} onChange={handleChange} />
                {errors.objetivo ? <small className="field-error">{errors.objetivo}</small> : null}
              </label>
            </div>
          </div>

          <div className="challenge-form-card__section">
            <div className="challenge-form-card__section-head">
              <span className="challenge-form-card__eyebrow">Viabilidade e contexto</span>
              <h2 className="challenge-form-card__title">Prazo, investimento e entrega</h2>
            </div>

            <div className="challenge-form-grid">
              <label className="profile-field">
                <span>Prazo desejado</span>
                <input name="prazo" value={formData.prazo} onChange={handleChange} placeholder="Ex.: 90 dias" />
                {errors.prazo ? <small className="field-error">{errors.prazo}</small> : null}
              </label>

              <label className="profile-field">
                <span>Orcamento estimado</span>
                <input name="orcamento" value={formData.orcamento} onChange={handleChange} placeholder="Ex.: R$ 180.000" />
                {errors.orcamento ? <small className="field-error">{errors.orcamento}</small> : null}
              </label>

              <label className="profile-field">
                <span>Localizacao</span>
                <input name="localizacao" value={formData.localizacao} onChange={handleChange} />
              </label>

              <label className="profile-field">
                <span>Setor</span>
                <input name="setor" value={formData.setor} onChange={handleChange} />
              </label>

              <label className="profile-field profile-field--full">
                <span>Resultados esperados</span>
                <textarea
                  name="resultadosEsperados"
                  rows={4}
                  value={formData.resultadosEsperados}
                  onChange={handleChange}
                />
                {errors.resultadosEsperados ? (
                  <small className="field-error">{errors.resultadosEsperados}</small>
                ) : null}
              </label>
            </div>
          </div>

          <div className="challenge-form-card__footer">
            {submitted ? (
              <p className="challenge-form-card__success">
                Desafio salvo como demonstracao visual. Em uma proxima etapa, isso podera seguir para backend e match automatico.
              </p>
            ) : null}

            <button type="submit" className="btn btn-primary btn-lg">
              Publicar desafio
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
