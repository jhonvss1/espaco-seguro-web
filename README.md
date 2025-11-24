# Espaço Seguro – Documentação Geral

Bem-vindo ao **Espaço Seguro**, a versão web do ambiente pensado para acolher pessoas que desejam compartilhar experiências ou buscar ajuda de forma anônima. Abaixo está um panorama das decisões do projeto, funcionalidades e como evoluir o front-end.

## 1. Visão Geral

- **Stack principal**: Angular 17 (standalone components, provideRouter).
- **Estilo**: Design system próprio, com tokens em `src/global-styles.css`.
- **Estrutura**:
  - `src/app/core` – layout, serviços, interceptors, guardas.
  - `src/app/features` – cada módulo funcional (auth, conteúdos, sessões etc.).
  - `src/app/shared` – componentes reutilizáveis (button, card, navbar).
  - `src/assets` – imagens e arquivos estáticos.

## 2. Funcionalidades Implementadas

1. **Autenticação**:
   - Login e cadastro com formulários reativos simples usando `[(ngModel)]`.
   - Após login, o usuário é redirecionado para a Home e a sessão fica armazenada no `AuthService` (com persistência em `localStorage`).
   - O cabeçalho do site alterna automaticamente entre “Entrar / Criar conta” e “Olá, {usuário} / Sair”.

2. **Conteúdos**:
   - Listagem dinâmica (`/conteudos`) buscando cards na API via `CardService`.
   - Tela de detalhe (`/conteudos/:id`) consumindo o endpoint de detalhe e exibindo o corpo completo.
   - Formulário de criação de conteúdo com envio automático do `autorId`.

3. **Sessões/Postagens**: Esqueleto inicial para telas futuras (cards, conversas, feed etc.), seguindo os mockups.

4. **UI/UX**:
   - Layout responsivo com `page-shell`, grids adaptáveis e media queries para header/nav.
   - Componentes reutilizáveis (`ui-button`, `ui-card`, `ui-input`, `ui-navbar`) facilitam manter o design consistente.

## 3. Fluxo de Desenvolvimento

1. **Iniciar o projeto**:
   ```bash
   npm install
   npm start
   # ou ng serve
   ```
   A aplicação estará disponível em `http://localhost:4200`.

2. **Estrutura dos serviços**:
   - `AuthService` → login/cadastro, estado do usuário e logout.
   - `CardService` → criação e leitura de cards (conteúdos). Ajuste as rotas conforme sua API.

3. **Como adicionar novas features**:
   - Criar um componente standalone em `src/app/features/...`.
   - Registrar a rota em `src/app/app.routes.ts`.
   - Reutilizar os componentes compartilhados para manter o padrão visual.

## 4. Boas Práticas Seguidas

- **Signals** (`signal`, `computed`) para estado simples no `AuthService`.
- **Injeção via `inject(...)`** em componentes/serviços, deixando construtores limpos.
- **Tratamento de API**: os serviços convertem o JSON da API para objetos usados nas telas.
- **CSS desacoplado**: cada feature tem seu próprio `.scss`, além do estilo global.
- **Responsividade**: media queries e grids flexíveis, garantindo uso confortável em desktop, tablet e celular.

## 5. Referências Úteis

- Documentação Angular: <https://angular.dev>
- Guia de tokens/design system (`src/global-styles.css`)
- Rotas principais (`src/app/app.routes.ts`)
- Componentes compartilhados (`src/app/shared/components`)

---
