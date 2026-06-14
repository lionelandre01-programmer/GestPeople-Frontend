# 🏗️ Arquitetura do Sistema - GestPeople

## 📐 Visão Geral da Arquitetura

O GestPeople é organizado em camadas claras de **Frontend** e **Backend**, com comunicação entre elas via **API RESTful**.
Esse modelo permite que a interface do usuário evolua independentemente da lógica de negócio e que o backend sirva vários clientes.

## 🧱 Arquitetura Frontend x Backend

### Frontend
- Aplicação React + Vite localizada em `GestaPossoas/`.
- Usa `React Router` para navegação e rotas de página.
- `AuthContext` mantém estado de autenticação e dados do usuário.
- `src/api.js` define o cliente Axios que consome a API Laravel.
- Componentes e páginas apresentam dados, formulários e dashboards.

### Backend
- Projeto Laravel em repositório separado.
- Expõe endpoints da API em `routes/api.php`.
- Autentica usuários e valida acesso via tokens.
- Processa requisições, aplica regras de negócio e persiste dados no banco.

### Comunicação
- O frontend envia requisições `HTTP` para o backend.
- O backend retorna respostas `JSON`.
- O frontend consome as respostas e atualiza a interface.

---

## 📁 Estrutura de Pastas - Frontend

```
GestaPossoas/
├── public/
├── src/
│   ├── api.js                # Cliente Axios e interceptors
│   ├── App.jsx               # Rotas e handlers principais
│   ├── main.jsx              # Ponto de entrada do React
│   ├── context/
│   │   └── AuthContext.jsx   # Estado global de autenticação
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Back.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Cadastro.jsx
│   │   ├── Profile.jsx
│   │   ├── Departamentos.jsx
│   │   ├── Desempenho.jsx
│   │   ├── Presencas.jsx
│   │   ├── Salario.jsx
│   │   ├── Messege.jsx
│   │   └── ...
│   ├── assets/
│   ├── App.css
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 📁 Estrutura de Pastas - Backend

```
gestpeople-backend/
├── GestPeople/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/       # Controladores da API
│   │   │   └── Requests/          # Validação de requisição
│   │   ├── Models/                # Models Eloquent
│   │   ├── Policies/              # Regras de autorização
│   │   ├── Services/              # Lógica de negócio
│   │   └── Providers/             # Provedores de serviço
│   ├── database/
│   │   ├── migrations/
│   │   ├── factories/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── storage/
│   ├── tests/
│   ├── .env
│   ├── .env.example
│   ├── artisan
│   ├── composer.json
│   └── README.md
└── Docs/
```

## 🔄 Fluxo de Comunicação

### 1. Requisição do Frontend
- O usuário interage com a interface React.
- O `App.jsx` ou um componente chama `api.<method>(endpoint, data)`.
- O `src/api.js` adiciona o token de autenticação e envia a requisição.

### 2. Processamento no Backend
- A rota de API (`routes/api.php`) mapeia a requisição para um controller.
- O controller valida dados e delega lógica para services ou modelos.
- O backend acessa o banco de dados, atualiza registros e monta a resposta.

### 3. Resposta do Backend
- O backend retorna JSON estruturado.
- O frontend processa os dados recebidos.
- A interface é atualizada e o estado do React reflete a operação.

---

## 🔐 Camadas de Segurança

### Frontend
- O token é armazenado em `localStorage`.
- `AuthContext` mantém o token e os dados do usuário entre as páginas.
- Requisições sem token ou com token inválido podem redirecionar para `/login`.

### Backend
- `auth:sanctum` ou middleware equivalente protege os endpoints.
- Policies validam permissões de acordo com a role do usuário.
- A validação de entrada é feita no backend via Requests/Rules.

---

## 🧩 Componentes Principais do Frontend

- `Header.jsx` - navegação e links condicionais por autenticação.
- `App.jsx` - definição das rotas e handlers de logout, cadastro e update.
- `AuthContext.jsx` - provê `user`, `token`, `setUser` e `setToken`.
- `api.js` - cliente Axios com `baseURL` e interceptors de erro 401.
- `pages/` - telas de login, cadastro, departamentos, desempenho, presenças, salário e mensagens.

---

## 🧠 Como o Backend Suporta o Frontend

- Fornece endpoints de CRUD para usuários, departamentos, funções, presenças, desempenho, salários e mensagens.
- Retorna dados JSON consumidos diretamente pela aplicação React.
- Trata autenticação, autorização e validação de dados.
- Garante consistência e integridade dos dados no banco.

---

## 📦 Boas Práticas

### Frontend
- Separar componentes e páginas.
- Usar `AuthContext` para gerenciar estado global.
- Centralizar chamadas HTTP em `src/api.js`.
- Tratar erros de rede e status 401.

### Backend
- Manter a API RESTful em `routes/api.php`.
- Usar controllers e services para separar responsabilidades.
- Validar dados com Requests.
- Usar policies para validação de roles.

---

## 🎯 Decisões Arquiteturais

| Camada | Tecnologia | Propósito |
|---|---|---|
| Frontend | React + Vite | UI, navegação, formulários e dashboards |
| Backend | Laravel | API, validação, autenticação e persistência |
| Dados | MySQL | Armazenamento relacional de usuários, presenças, salários e mensagens |
| Comunicação | Axios + JSON | Troca de dados entre frontend e backend |

---

## 📌 Conclusão

A arquitetura do GestPeople separa a apresentação do estado e lógica de interface (frontend) da regra de negócio e persistência (backend).
Essa divisão facilita manutenção, testes e evolução independente de cada camada.