# P&D Connect Front-end

Front-end em React + Vite do projeto **P&D Connect**.

Este repositório contém **apenas o front-end**. O backend não está incluído aqui.

## Requisitos

- `Node.js 18+`
- `npm 9+`
- API backend disponível em algum endereço acessível

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Se quiser usar outro endereço de API, crie um `.env` com base no exemplo:

```bash
cp .env.example .env
```

No Windows, se preferir:

```bat
copy .env.example .env
```

3. Rode o projeto:

```bash
npm run dev
```

4. Abra a URL exibida pelo Vite no navegador.

## URL padrão da API

Por padrão, o front usa:

```text
http://127.0.0.1:8000/api
```

Se precisar alterar, edite o arquivo `.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Build de produção

```bash
npm run build
```

## O que já está integrado

- seleção de perfil com sessão local baseada em cadastros reais da API
- cadastro real de empresa
- cadastro real de pesquisador com criação de universidade e currículo quando necessário
- painel autenticado com leitura de empresas, pesquisadores, universidades e currículo do pesquisador
- edição real de perfil
- gestão de formações no perfil do pesquisador
- indicadores calculados a partir da base real da API

## O que ainda depende de backend

O front não inventa API para fluxos que ainda não existem no backend, como:

- autenticação real por e-mail e senha
- desafios tecnológicos
- propostas de parceria
- atualização completa de status
- notificações
- busca semântica
- match por IA

## Estrutura principal

```text
src/
  components/   -> componentes de interface, navegação e FAQ
  context/      -> sessão local e hidratação do perfil pela API
  lib/          -> cliente HTTP e utilitários de domínio
  pages/        -> páginas públicas e autenticadas
  services/     -> consumo dos endpoints reais do backend
```

## Observações

- `.env` não deve ser versionado; use apenas `.env.example`
- `node_modules` e `dist` estão no `.gitignore`
- o projeto já está preparado para rodar com `npm install` e `npm run dev`
