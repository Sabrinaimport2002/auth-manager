# 🔐 Auth Manager

Sistema de gerenciamento de autenticação desenvolvido em Angular com interface moderna e intuitiva.

## 📋 Sobre o Projeto

Auth Manager é uma aplicação web para gerenciamento de autenticação de usuários, desenvolvida com Angular 20 e Angular Material. O sistema oferece funcionalidades de registro, login, gerenciamento de perfil e controle de acesso através de guards de rota.

## ✨ Funcionalidades

- 🔑 **Autenticação de Usuários**
  - Login com email e senha
  - Registro de novos usuários
  - Logout seguro
  - Proteção de rotas com guards

- 👤 **Gerenciamento de Perfil**
  - Visualização de dados do usuário
  - Edição de nome e email
  - Alteração de senha
  - Avatar com iniciais do nome

- 🎨 **Interface Moderna**
  - Design responsivo com Angular Material
  - Animações suaves e transições
  - Feedback visual com notificações (snackbar)
  - Tema personalizado

- 📱 **Navegação**
  - Menu lateral responsivo
  - Dashboard interativo
  - Páginas home e perfil

## 🛠️ Tecnologias Utilizadas

- **Angular** 20.3.0
- **Angular Material** 20.2.9
- **TypeScript** 5.9.2
- **RxJS** 7.8.0
- **SCSS** para estilização
- **LocalStorage** para persistência de dados

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [Angular CLI](https://angular.dev/tools/cli) (versão 20 ou superior)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd auth-manager
```

2. Instale as dependências:
```bash
npm install
```

## 💻 Como Executar

### Ambiente de Desenvolvimento

Inicie o servidor de desenvolvimento:
```bash
npm start
```
ou
```bash
ng serve
```

Acesse a aplicação em `http://localhost:4200/`

A aplicação será recarregada automaticamente sempre que você modificar os arquivos fonte.

### Build de Produção

Para criar uma build otimizada para produção:
```bash
npm run build
```

Os arquivos compilados serão armazenados no diretório `dist/`.

## 📁 Estrutura do Projeto

```
auth-manager/
├── src/
│   ├── app/
│   │   ├── core/                    # Módulos e serviços principais
│   │   │   ├── guards/              # Guards de rota (auth, guest)
│   │   │   ├── models/              # Interfaces e modelos de dados
│   │   │   ├── services/            # Serviços (auth, menu, notification)
│   │   │   └── validators/          # Validadores customizados
│   │   ├── pages/                   # Páginas da aplicação
│   │   │   ├── dashboard/           # Página principal após login
│   │   │   ├── home/                # Página inicial
│   │   │   ├── login/               # Página de login
│   │   │   ├── profile/             # Página de perfil do usuário
│   │   │   └── register/            # Página de registro
│   │   ├── shared/                  # Componentes compartilhados
│   │   │   ├── components/          # Componentes reutilizáveis
│   │   │   │   └── menu/            # Menu lateral
│   │   │   └── material/            # Módulos do Angular Material
│   │   ├── app.config.ts            # Configuração da aplicação
│   │   ├── app.routes.ts            # Configuração de rotas
│   │   └── app.ts                   # Componente principal
│   ├── styles/                      # Estilos globais
│   │   ├── _animations.scss         # Animações customizadas
│   │   ├── _avatar.scss             # Estilos de avatar
│   │   ├── _buttons.scss            # Estilos de botões
│   │   ├── _cards.scss              # Estilos de cards
│   │   ├── _forms.scss              # Estilos de formulários
│   │   ├── _material-overrides.scss # Sobrescritas do Material
│   │   ├── _snackbar.scss           # Estilos de notificações
│   │   └── _variables.scss          # Variáveis SCSS
│   └── styles.scss                  # Estilos principais
├── angular.json                     # Configuração do Angular
├── package.json                     # Dependências do projeto
└── tsconfig.json                    # Configuração do TypeScript
```

## 🎯 Funcionalidades Implementadas

### Autenticação
- ✅ Sistema de login com validação
- ✅ Registro de novos usuários
- ✅ Validação de email único
- ✅ Persistência de sessão (localStorage)
- ✅ Guards para proteção de rotas

### Perfil do Usuário
- ✅ Visualização de dados do perfil
- ✅ Edição de nome e email
- ✅ Alteração de senha com validação
- ✅ Avatar com iniciais

### Interface
- ✅ Menu lateral responsivo
- ✅ Sistema de notificações
- ✅ Animações e transições
- ✅ Design responsivo

## 🚧 Melhorias Futuras

Este projeto ainda está em desenvolvimento. Algumas melhorias planejadas incluem:

- [ ] Integração com backend real (API REST)
- [ ] Validação de email
- [ ] Recuperação de senha
- [ ] Autenticação com JWT
- [ ] Refresh token
- [ ] Perfil com foto de usuário
- [ ] Histórico de atividades

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run watch` - Build em modo watch para desenvolvimento

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está em desenvolvimento.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando Angular por Sabrina Vitória.

---

**Nota**: Atualmente este projeto utiliza localStorage para armazenar dados. Em um ambiente de produção, recomenda-se implementar uma API backend com autenticação segura e banco de dados apropriado.
