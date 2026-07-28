# GestPeople (Front-end)

Este é o front-end de um sistema de Gestão de Pessoal (RH) desenvolvido em React. O back-end é implementado em Laravel e está hospedado em um repositório separado.

**Nota:** O sistema ainda está em desenvolvimento e pode não ter todas as funcionalidades implementadas.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida para projetos modernos.
- **Tailwind CSS**: Framework CSS utilitário para estilização.
- **React Router**: Para navegação entre páginas.
- **Axios**: Para requisições HTTP (se usado no api.js).
- **React Icons**: Para ícones.
- **Date-fns**: Para formatação de datas.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/lionelandre01-programmer/GestPeople-Frontend.git
   cd GestPeople-Frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

## Como Executar

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

2. Abra o navegador e acesse `http://localhost:5173` (porta padrão do Vite).

## Estrutura do Projeto

```
src/
├── api.js                 # Configurações de API para comunicação com o back-end
├── App.jsx                # Componente principal da aplicação
├── main.jsx               # Ponto de entrada da aplicação
├── index.css              # Estilos globais
├── App.css                # Estilos específicos da App
├── assets/                # Recursos estáticos (imagens, etc.)
├── components/            # Componentes reutilizáveis
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Loading.jsx
│   └── ... (outros componentes)
├── context/               # Contextos React (ex: AuthContext)
├── pages/                 # Páginas da aplicação
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── Cadastro.jsx
│   └── ... (outras páginas)
└── images/                # Imagens específicas do projeto
```

## Funcionalidades

- **Autenticação**: Login e logout de usuários.
- **Dashboard**: Visão geral do sistema.
- **Perfil do Usuário**: Visualização e edição de informações pessoais.
- **Cadastro**: Registro de novos usuários ou dados.
- **Lista**: Listagem de usuários ou dados.
- **Departamentos e Funções**: Gestão de departamentos e funções (em desenvolvimento).

## Back-end

O back-end deste sistema é desenvolvido em Laravel e pode ser encontrado em: [\[Repositório do Back-end\]](https://github.com/lionelandre01-programmer/gestpeople-backend.git)

Certifique-se de que o back-end esteja rodando (geralmente em `http://127.0.0.1:8000`) para que as funcionalidades que dependem de API funcionem corretamente.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato com [lionelgomes@084gmail.com].

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

## 👥 Autor

Desenvolvido Por Lionel Cristóvão André.

---

**Status do Projeto**: Em desenvolvimento 🚧

**Última atualização**: Julho de 2026