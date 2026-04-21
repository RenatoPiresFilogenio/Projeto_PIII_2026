# Auditoria Front x Back

## Rotas reais confirmadas no backend

- `GET/POST /api/companies/`
- `GET/PATCH/PUT/DELETE /api/companies/{id}`
- `GET/POST /api/researchers/`
- `GET/PATCH/PUT/DELETE /api/researchers/{id}`
- `GET /api/researchers/{id}/resume/`
- `GET/POST /api/universities/`
- `GET/PUT/DELETE /api/universities/{id}`
- `GET/POST /api/resumes/`
- `GET/PUT/DELETE /api/resumes/{id}`
- `GET/POST /api/educations/`
- `GET/PATCH/PUT/DELETE /api/educations/{id}`
- `GET/POST /api/experiences/`
- `GET/PATCH/PUT/DELETE /api/experiences/{id}`
- `GET/POST /api/skills/`
- `GET/PUT/DELETE /api/skills/{id}`

## Matriz de aderencia

| Tela / area | Front anterior | Backend real | Divergencia encontrada | Acao no front |
|---|---|---|---|---|
| Login | mock com email/senha e perfis demo | nao existe autenticacao | front prometia login inexistente | sessao local por selecao de cadastro real |
| Cadastro empresa | preview visual sem API | `POST /api/companies/` | mock desnecessario | formulario real integrado |
| Cadastro pesquisador | preview visual sem API | `POST /api/universities/`, `POST /api/resumes/`, `POST /api/researchers/` | mock desnecessario | cadastro real encadeado |
| Painel `/pesquisa` | busca semantica fake | apenas CRUD basico de entidades | tela esperava IA, match e desafios inexistentes | painel de exploracao com dados reais e filtro local |
| Perfil empresa | campos inexistentes no backend | `name`, `cnpj`, `registration_status`, `status` | contrato divergente | formulario reduzido aos campos reais |
| Perfil pesquisador | contrato mockado com objetos aninhados | `name`, `availability`, `status`, `university`, `resume` | nomes e estrutura divergentes | formulario corrigido e curriculo lido via endpoint real |
| Curriculo do pesquisador | mock completo | `GET /api/researchers/{id}/resume/`, `POST/DELETE educations`, `POST/DELETE experiences` | front nao consumia nada real | integracao de leitura e manutencao de formacoes/experiencias |
| Indicadores | numeros estaticos | listas paginadas do DRF | dados inventados | indicadores calculados da base real |
| Publicar desafio | formulario fake | nao existe rota | fluxo inexistente no backend | tela marcada como indisponivel sem inventar API |

## Mocks removidos

- `src/mocks/mockUsers.js`
- `src/mocks/mockSearchData.js`

## Dependencias de backend ainda inexistentes

- autenticacao real por credenciais
- desafios tecnologicos
- propostas de parceria
- notificacoes
- status de proposta
- busca semantica
- match por IA
- vinculacao de novas habilidades ao curriculo via API
