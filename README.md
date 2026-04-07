# P&D Connect Front-end

Front-end em React + Vite da plataforma **P&D Connect**, uma interface que conecta empresas e pesquisadores em fluxos de Pesquisa e Desenvolvimento.

Nesta etapa, o projeto funciona como **front-end demonstrativo**, com:

- landing page institucional;
- login mockado;
- fluxo autenticado com redirecionamento para pesquisa;
- navegacao adaptada por tipo de usuario;
- busca semantica simulada;
- edicao de perfil;
- publicacao de desafio para empresa.

Ainda **nao ha integracao real com API, banco ou autenticacao de back-end**.

## Stack

- `React 19`
- `Vite 6`
- `React Router DOM 7`
- `Framer Motion`

## Requisitos

Antes de rodar o projeto, tenha instalado:

- `Node.js 18` ou superior
- `npm 9` ou superior

## Como rodar o projeto

1. Clone ou baixe este repositorio.
2. Abra o terminal na pasta do projeto.
3. Instale as dependencias:

```bash
npm install
```

4. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

5. Abra no navegador o endereco exibido no terminal.

Em geral, o Vite sobe em algo como:

```text
http://localhost:5173
```

## Scripts disponiveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor local com recarregamento automatico.

### Build de producao

```bash
npm run build
```

Gera a build otimizada na pasta `dist/`.

### Preview da build

```bash
npm run preview
```

Serve localmente a build gerada para conferencia final.

## Fluxo atual do front-end

### Area publica

Rotas disponiveis sem login:

- `/`
- `/sobre`
- `/como-funciona`
- `/indicadores`
- `/login`

### Area autenticada

Apos o login, o usuario e redirecionado automaticamente para:

```text
/pesquisa
```

Na area autenticada existem:

- `Pesquisa`
- `Indicadores`
- `Editar perfil`
- `Publicar desafio` somente para empresa

## Perfis demo para teste

O projeto ja possui dois perfis mockados prontos para navegacao.

### Empresa

- E-mail: `contato@ecomove.com.br`
- Senha: `empresa123`

### Pesquisador

- E-mail: `camila.nunes@ufscar.br`
- Senha: `pesquisa123`

Tambem existem botoes de acesso rapido na tela de login para entrar com esses perfis.

## O que esta mockado

Como ainda nao existe API nesta fase, os seguintes comportamentos sao simulados no front-end:

- autenticacao;
- sessao do usuario;
- tipo de usuario;
- resultados da busca semantica;
- interpretacao por IA e extracao de temas;
- dados de perfil;
- desafios publicados;
- formulario de publicacao de desafio.

## Estrutura principal do projeto

```text
src/
  components/   -> componentes reutilizaveis e layouts
  context/      -> contexto de autenticacao mockada
  mocks/        -> dados fake do dominio
  pages/        -> paginas publicas e autenticadas
index.html      -> entrada da aplicacao
vite.config.js  -> configuracao do Vite
package.json    -> scripts e dependencias
```

## Organizacao do dominio no front-end

Os mocks e a interface seguem o dominio definido no projeto:

- usuarios
- tipo de usuario
- pesquisador
- empresa
- area de pesquisa
- curriculo
- habilidades
- formacao
- experiencias
- pesquisa
- desafio tecnologico

## Observacoes importantes

- `node_modules` **nao deve** ser versionado.
- `dist` e gerado automaticamente por `npm run build`.
- o projeto pode ser executado em outra maquina apenas com:
  - `npm install`
  - `npm run dev`
- nao e necessario configurar banco, variaveis de ambiente ou servicos externos para ver o front-end funcionando nesta fase.

## Passo rapido para outra maquina

Se alguem baixar o projeto do GitHub, o fluxo e:

```bash
npm install
npm run dev
```

Depois disso, basta abrir o endereco local exibido pelo Vite e testar a interface.
