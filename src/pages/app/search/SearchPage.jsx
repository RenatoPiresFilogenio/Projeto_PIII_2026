import { useMemo, useState } from 'react'
import { buildSearchExperience } from '../../../mocks/mockSearchData'
import { useAuth } from '../../../context/AuthContext'
import './SearchPage.scss'

const initialQuery = 'solucoes para carros que utilizam bateria eletrica'

const resultTypeLabels = {
  pesquisador: 'Pesquisador',
  pesquisa: 'Pesquisa',
  desafio: 'Desafio',
  empresa: 'Empresa',
}

export default function SearchPage() {
  const { user } = useAuth()
  const [query, setQuery] = useState(initialQuery)
  const [activeQuery, setActiveQuery] = useState(initialQuery)

  const searchExperience = useMemo(
    () => buildSearchExperience(activeQuery, user?.tipoUsuario?.nome),
    [activeQuery, user]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    setActiveQuery(query.trim() || initialQuery)
  }

  return (
    <section className="app-page app-search-page">
      <div className="container app-page__container">
        <header className="app-page__header">
          <div>
            <span className="section-label">Pesquisa principal</span>
            <h1 className="app-page__title">Pesquisa semantica com leitura de contexto</h1>
          </div>
          <p className="app-page__subtitle">
            Descreva o problema em linguagem natural. A plataforma organiza temas, areas e resultados por aderencia semantica.
          </p>
        </header>

        <div className="search-hero-card">
          <div className="search-hero-card__content">
            <span className="search-hero-card__eyebrow">Busca inteligente</span>
            <h2 className="search-hero-card__title">
              Pesquise com uma frase completa e veja a interpretacao da consulta.
            </h2>
            <p className="search-hero-card__text">{searchExperience.helper}</p>
          </div>

          <form className="app-search-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="semantic-search">
              Buscar desafios, pesquisadores e pesquisas
            </label>
            <textarea
              id="semantic-search"
              className="app-search-form__input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              rows={3}
              placeholder="Ex.: solucoes para carros que utilizam bateria eletrica"
            />
            <button type="submit" className="btn btn-primary app-search-form__button">
              Pesquisar
            </button>
          </form>
        </div>

        <div className="app-search-layout">
          <aside className="semantic-panel">
            <div className="semantic-panel__block">
              <span className="semantic-panel__label">Consulta ativa</span>
              <p className="semantic-panel__query">"{activeQuery}"</p>
            </div>

            <div className="semantic-panel__block">
              <h3 className="semantic-panel__title">Temas identificados</h3>
              <div className="semantic-panel__chips">
                {searchExperience.semantic.themes.map((item) => (
                  <span key={item} className="semantic-chip semantic-chip--primary">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="semantic-panel__block">
              <h3 className="semantic-panel__title">Categorias relacionadas</h3>
              <div className="semantic-panel__chips">
                {searchExperience.semantic.categories.map((item) => (
                  <span key={item} className="semantic-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="semantic-panel__block">
              <h3 className="semantic-panel__title">Areas e tecnologias</h3>
              <div className="semantic-panel__chips">
                {[...searchExperience.semantic.areas, ...searchExperience.semantic.technologies].map((item) => (
                  <span key={item} className="semantic-chip semantic-chip--soft">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="semantic-panel__block">
              <h3 className="semantic-panel__title">Palavras-chave extraidas</h3>
              <ul className="semantic-panel__keywords">
                {searchExperience.semantic.keywords.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="search-results">
            <div className="search-results__header">
              <div>
                <span className="section-label">Resultados</span>
                <h2 className="search-results__title">Conexoes sugeridas</h2>
              </div>
              <p className="search-results__meta">
                {searchExperience.results.length} itens por relevancia semantica
              </p>
            </div>

            <div className="search-results__list">
              {searchExperience.results.map((result) => (
                <article key={result.id} className="search-result-card">
                  <div className="search-result-card__top">
                    <span className={`search-result-card__type search-result-card__type--${result.type}`}>
                      {resultTypeLabels[result.type]}
                    </span>
                    <span className="search-result-card__relevance">{result.relevance}</span>
                  </div>

                  <h3 className="search-result-card__title">{result.title}</h3>
                  <p className="search-result-card__subtitle">{result.subtitle}</p>
                  <p className="search-result-card__text">{result.description}</p>

                  <div className="search-result-card__tags">
                    {result.tags.map((tag) => (
                      <span key={tag} className="search-result-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button type="button" className="btn btn-ghost search-result-card__button">
                    {result.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
