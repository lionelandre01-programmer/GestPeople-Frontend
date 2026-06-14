# 🚀 Guia de Instalação - GestPeople

## � Objetivo

Instalar o **backend Laravel** e o **frontend React** do GestPeople em um ambiente local.
Este guia cobre as etapas de configuração para os dois repositórios e explica como fazer o frontend se comunicar com o backend.

---

## 📋 Pré-requisitos

Antes de começar, tenha instalados:

- **PHP 8.2+**
- **Composer**
- **MySQL 5.7+** ou **MariaDB**
- **Node.js 16+**
- **npm**
- **Git**
- **Editor de texto** (VS Code, PHPStorm etc.)

---

## 📁 Repositórios

- Backend: `https://github.com/lionelandre01-programmer/gestpeople-backend.git`
- Frontend: `https://github.com/lionelandre01-programmer/gestpeople-frontend.git`

---

## 🛠️ Instalação do Backend

### 1. Clonar o backend

```bash
git clone https://github.com/lionelandre01-programmer/gestpeople-backend.git
cd gestpeople-backend/GestPeople
composer install
```

### 2. Criar o arquivo `.env`

```bash
cp .env.example .env
```

### 3. Atualizar variáveis do backend

Edite `.env` com a configuração local:

```env
APP_NAME=GestPeople
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gestpeople
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=127.0.0.1:5173,localhost:5173
SESSION_DOMAIN=127.0.0.1
```

> Observação: o frontend usa `GestaPossoas/src/api.js` com `baseURL: "http://127.0.0.1:8000/api"`. Ajuste o `baseURL` caso o backend esteja em outra URL.

### 4. Gerar a chave da aplicação

```bash
php artisan key:generate
```

### 5. Configurar o banco de dados

No MySQL, execute:

```sql
CREATE DATABASE gestpeople CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Executar migrações

```bash
php artisan migrate
```

### 7. Executar seeders (opcional)

```bash
php artisan db:seed
```

### 3. Gerar a chave de aplicação

```bash
php artisan key:generate
```

### 4. Criar a base de dados

```sql
CREATE DATABASE gestpeople CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Executar migrações

```bash
php artisan migrate
```

### 6. (Opcional) Executar seeders

```bash
php artisan db:seed
```

### 7. Preparar o Frontend

```bash
cd ../../GestPeople-Frontend/GestaPossoas
npm install
```

### 8. Rodar o Frontend

```bash
npm run dev
```

A aplicação de frontend estará disponível em:

- `http://127.0.0.1:5173`

## 🔗 Resumo de execução

- Backend: `php artisan serve --host=127.0.0.1 --port=8000`
- Frontend: `npm run dev`
- API Base: `http://127.0.0.1:8000/api`

## 🐛 Troubleshooting

### Erro de permissão em `storage`

```bash
chmod -R 775 storage bootstrap/cache
```

### Erro de conexão com o banco de dados

- Verifique `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME` e `DB_PASSWORD` no `.env`
- Teste a conexão com o MySQL

### Erro 401 / logout automático

- O token expirou ou não está presente
- Limpe `localStorage` no navegador e faça login novamente

### CORS ou autenticação falhando

- Confirme `SANCTUM_STATEFUL_DOMAINS`
- Confirme que o frontend e o backend estão em `127.0.0.1:5173` e `127.0.0.1:8000`

---

**Pronto!** 🎉 O GestPeople deve estar funcionando no seu ambiente local.