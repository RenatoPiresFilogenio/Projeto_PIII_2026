# Innovare Landing Page

Landing page front-end da plataforma **Innovare**, focada em conectar empresas com desafios tecnológicos, pesquisadores com soluções e oportunidades relacionadas à inovação.

## Requisitos

- Node.js `18` ou superior
- npm `9` ou superior

## Como rodar localmente

1. Abra o terminal na pasta do projeto.
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra no navegador o endereço exibido no terminal.
   Em geral, o Vite usa algo como `http://localhost:5173`.

## Scripts disponíveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o projeto em modo desenvolvimento com recarregamento automático.

### Build de produção

```bash
npm run build
```

Gera a versão otimizada na pasta `dist/`.

### Preview da build

```bash
npm run preview
```

Serve localmente a build gerada em `dist/` para validação final.

## Estrutura principal

```text
src/
  components/   -> componentes reutilizáveis
  pages/        -> páginas da aplicação
  hooks/        -> hooks utilitários
index.html      -> entrada principal
vite.config.js  -> configuração do Vite
package.json    -> scripts e dependências
```

## Dependências importantes

- `react` e `react-dom` para a interface
- `react-router-dom` para navegação entre páginas
- `framer-motion` para animações de transição e experiências guiadas de scroll

Não é necessário instalar nenhuma biblioteca manualmente além do fluxo padrão:

```bash
npm install
```

Esse comando já instala todas as dependências do projeto, incluindo o `framer-motion`.

## Fluxo recomendado para usar em outra máquina

1. Baixe ou clone o projeto.
2. Entre na pasta do projeto.
3. Rode `npm install`.
4. Rode `npm run dev`.

Se quiser testar a versão final:

1. Rode `npm run build`.
2. Rode `npm run preview`.

## Observações

- A pasta `node_modules` não precisa ser enviada junto com o projeto.
- A pasta `dist` é gerada automaticamente pelo build.
- O projeto é front-end puro nesta etapa, sem dependência de backend para rodar a landing page.
- A página `Como Funciona` usa `framer-motion` para controlar a transição suave entre etapas no scroll.
- Para rodar o projeto em outra máquina, basta clonar o repositório, executar `npm install` e depois `npm run dev`.
