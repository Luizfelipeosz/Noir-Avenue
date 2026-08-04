# Noir Avenue

> Plataforma Front-End inspirada em experiências premium de e-commerce, desenvolvida com foco em escalabilidade, arquitetura previsível e evolução contínua de produto.

🔗 **Projeto online:** [Noir Avenue — GitHub Pages](https://luizfelipeosz.github.io/Noir-Avenue/)

O Noir Avenue nasceu com um objetivo simples: construir uma aplicação Front-End que simulasse desafios encontrados em produtos reais, desde autenticação e gerenciamento de estado até componentização, organização arquitetural, experiência do usuário e publicação em produção.

A proposta do projeto vai além da construção de telas. Cada funcionalidade é desenvolvida considerando manutenção, reutilização de componentes e capacidade de evolução ao longo do tempo.

Atualmente, o projeto possui uma versão publicada e continua sendo desenvolvido de forma incremental, utilizando sprints para organizar novas funcionalidades e melhorias.

---

## Visão do Produto

O Noir Avenue é uma aplicação inspirada em marketplaces modernos, com identidade visual baseada na atmosfera noturna de Nova York.

O projeto busca reproduzir o ciclo de desenvolvimento de um produto digital, passando por etapas de planejamento, implementação, resolução de problemas, integração entre funcionalidades e publicação.

### Objetivos do Projeto

* Construir uma SPA utilizando React.
* Aplicar boas práticas de arquitetura Front-End.
* Simular um ambiente de desenvolvimento orientado a produto.
* Desenvolver componentes reutilizáveis e consistentes.
* Trabalhar com autenticação, rotas protegidas e persistência local.
* Aplicar decisões técnicas pensando em manutenção e evolução.
* Publicar e validar a aplicação em um ambiente real.

---

## Stack Utilizada

* React.js
* JavaScript (ES6+)
* TypeScript *(em evolução para novas features)*
* React Router
* Vite
* CSS3
* Sonner
* LocalStorage
* ESLint
* Git & GitHub
* GitHub Actions
* GitHub Pages

---

## Funcionalidades Implementadas

### Sprint 1 — Camada de Autenticação

* Tela de Login.
* Tela de Cadastro.
* Persistência de sessão.
* Funcionalidade "Lembrar e-mail".
* Feedback visual utilizando Sonner.
* Rotas protegidas.
* Controle de autenticação.

### Sprint 2 — Estruturação do Produto

* Dashboard inicial.
* Página de Perfil.
* Edição de informações do usuário.
* Exclusão de conta.
* Organização arquitetural.
* Estruturação de componentes reutilizáveis.
* Definição de Design Tokens.
* Organização de estilos.
* Evolução da identidade visual.
* Configuração de build para produção.
* Publicação utilizando GitHub Pages.
* Automação do deploy através de GitHub Actions.

---

## Próximas Entregas

O Noir Avenue continua em desenvolvimento. As próximas evoluções planejadas incluem:

* Sistema de Favoritos.
* Configurações do usuário.
* Catálogo de produtos.
* Busca e filtros.
* Carrinho de compras.
* Integração com APIs.
* Responsividade avançada.
* Testes automatizados.
* Evolução gradual da arquitetura para TypeScript.

---

## Arquitetura

O projeto foi estruturado pensando em crescimento e previsibilidade.

```bash
src
├── assets
├── components
├── pages
│   ├── Login
│   ├── Cadastro
│   ├── Dashboard
│   └── Perfil
├── routes
├── services
├── styles
├── utils
└── hooks
```

Essa organização permite:

* Separação clara de responsabilidades.
* Facilidade de manutenção.
* Escalabilidade para novas funcionalidades.
* Maior previsibilidade durante a evolução do projeto.
* Melhor experiência para futuras contribuições.

---

## Deploy

O projeto possui uma pipeline de publicação utilizando GitHub Actions.

A cada atualização enviada para a branch `main`, a aplicação é construída através do Vite e publicada automaticamente no GitHub Pages.

### Fluxo

```text
Git Push
   ↓
GitHub Actions
   ↓
npm run build
   ↓
Vite
   ↓
GitHub Pages
   ↓
Aplicação publicada
```

Essa configuração permite validar não apenas o desenvolvimento local, mas também o comportamento da aplicação em um ambiente publicado.

🔗 **Acessar o projeto:** [Noir Avenue](https://luizfelipeosz.github.io/Noir-Avenue/)

---

## Decisões Técnicas

Algumas decisões adotadas durante o desenvolvimento:

* Utilização de SPA para proporcionar navegação fluida.
* Implementação de rotas protegidas para simular ambientes autenticados.
* Utilização de `localStorage` para persistência durante a fase atual do projeto.
* Componentização para reduzir acoplamento e facilitar manutenção.
* Uso de Design Tokens para manter consistência visual.
* Estrutura orientada à evolução do produto.
* Construção incremental utilizando sprints.
* Configuração específica do Vite para suportar publicação em subdiretório.
* Utilização de `BrowserRouter` com `BASE_URL` para compatibilidade com o GitHub Pages.
* Automação do processo de build e deploy através do GitHub Actions.

---

## Capturas do Projeto

### Login

Adicione aqui uma captura atualizada da tela de Login.

### Dashboard

Adicione aqui uma captura atualizada do Dashboard.

### Perfil

Adicione aqui uma captura atualizada da página de Perfil.

> As capturas serão atualizadas conforme novas funcionalidades forem incorporadas ao produto.

---

## Executando Localmente

```bash
# Clone o repositório
git clone https://github.com/Luizfelipeosz/Noir-Avenue.git

# Entre no diretório
cd Noir-Avenue

# Instale as dependências
npm install

# Execute o projeto em desenvolvimento
npm run dev
```

A aplicação será iniciada em:

```bash
http://localhost:5173
```

Para testar a versão de produção localmente:

```bash
npm run build
npm run preview
```

A versão de preview será disponibilizada pelo Vite.

---

## Filosofia de Desenvolvimento

O Noir Avenue é tratado como um produto em constante evolução.

Cada sprint adiciona novas funcionalidades, mas também busca responder perguntas comuns do desenvolvimento Front-End moderno:

* Como manter uma arquitetura sustentável?
* Como escalar componentes sem aumentar a complexidade?
* Como equilibrar experiência do usuário e manutenção?
* Como tomar decisões pensando no longo prazo?
* Como garantir que uma aplicação continue funcionando ao sair do ambiente local?

Mais do que um portfólio, este projeto representa uma abordagem de desenvolvimento baseada em **construção incremental, decisões técnicas e evolução contínua**.

---

## Status do Projeto

🟢 **Online e em desenvolvimento ativo**

O Noir Avenue possui uma versão publicada e continuará recebendo novas funcionalidades, melhorias de arquitetura e evoluções de produto.

---

## Autor

**Luiz Felipe Oliveira Souza**

**Front-End Developer Jr.**

* React.js
* TypeScript
* Next.js
* Arquitetura Front-End
* SPAs
* Evolução Contínua de Produtos

🔗 **GitHub:** [github.com/Luizfelipeosz](https://github.com/Luizfelipeosz)

🔗 **LinkedIn:** [linkedin.com/in/luiz-felipe-o-souza-9a488b372](https://linkedin.com/in/luiz-felipe-o-souza-9a488b372)

---

> Desenvolvido com foco em qualidade, escalabilidade, experiência do usuário e evolução contínua.
