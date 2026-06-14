# 🚀 Deploy do Frontend GestPeople

## 📌 Objetivo

Este documento descreve o processo de deploy do **frontend React** do GestPeople. O foco é construir a aplicação com **Vite** e servir os arquivos estáticos gerados em produção.

> O frontend está em `GestaPossoas/` e consome uma API externa em `http://127.0.0.1:8000/api`.

## ✅ Pré-requisitos

- Node.js 16+ instalado
- npm instalado
- Acesso ao servidor ou serviço de hospedagem estática
- Backend disponível em produção ou ambiente de teste
- Certificado HTTPS válido para produção

## 🧩 O que é feito no deploy do frontend

1. Instalar dependências do frontend
2. Ajustar a URL da API se necessário
3. Executar o build de produção
4. Servir os arquivos estáticos gerados em `dist/`
5. Garantir fallback para SPA e cache correto

## 🛠️ Passo a passo

### 1. Preparar o projeto

No diretório do frontend:

```bash
cd c:\React2\GestPeople-Frontend\GestaPossoas
npm install
```

### 2. Ajustar o endpoint de API

O cliente Axios está em `src/api.js` com `baseURL: "http://127.0.0.1:8000/api"`.

Em produção, atualize este valor para a URL real do backend se for diferente:

```js
baseURL: "https://api.seudominio.com/api"
```

> Se você usar um servidor web separado, a API deve permitir conexões CORS do domínio do frontend.

### 3. Criar o build de produção

Execute:

```bash
npm run build
```

O Vite irá gerar a pasta `dist/` com os arquivos prontos para deploy.

### 4. Copiar os arquivos gerados

No servidor de produção, copie o conteúdo de `dist/` para o diretório que será servido pelo web server.

Exemplo:

```bash
scp -r dist/* usuario@servidor:/var/www/gestpeople-frontend/
```

### 5. Configurar o servidor para servir o build

#### Opção A: Nginx

Exemplo de configuração Nginx para uma aplicação SPA:

```nginx
server {
  listen 80;
  server_name seu_dominio.com www.seu_dominio.com;
  root /var/www/gestpeople-frontend;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:8000/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Nesse exemplo, o backend é encaminhado pelo mesmo servidor. Se o backend estiver em outro host, ajuste `proxy_pass` para a URL correta.

#### Opção B: Hospedagem estática

Você também pode usar serviços como:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

Nesses casos, apenas envie o conteúdo de `dist/` para o serviço.

## 🔐 HTTPS e produção

Em produção, use HTTPS para proteger o token salvo em `localStorage` e os dados trafegados.

- Ative certificados SSL/TLS
- Redirecione HTTP para HTTPS
- Configure headers básicos de segurança

## ⚠️ Observações importantes

- O frontend atual armazena o token em `localStorage`.
- Se a API estiver em outro domínio, verifique as configurações CORS no backend.
- O SPA deve sempre retornar `index.html` para rotas que não existem como arquivo físico.

## 📦 Resumo do fluxo de deploy

1. `npm install`
2. `npm run build`
3. Enviar `dist/` para o servidor ou serviço de hospedagem
4. Configurar servidor web para servir a pasta estática
5. Ajustar URL da API em `src/api.js` se necessário
6. Testar em produção

## 🧪 Testes pós-deploy

- Abrir a aplicação no navegador e verificar se carrega
- Navegar pelas rotas principais (`/`, `/login`, `/profile`, `/departamentos` etc.)
- Fazer login para testar comunicação com a API
- Verificar console do navegador para erros de rede ou CORS

## 🐞 Troubleshooting

### Erro 404 em rotas internas

Se ao recarregar uma rota interna o servidor retorna 404, ajuste o Nginx para usar `try_files $uri $uri/ /index.html;`.

### Erro de API ou CORS

- Verifique se `src/api.js` aponta para a URL correta da API
- Verifique se o backend aceita requisições de origem do frontend
- Confirme se o backend está acessível a partir do ambiente de produção

### Erro de build

- Confirme se o Node.js e o npm estão instalados corretamente
- Rode `npm install` novamente
- Verifique dependências e versões no `package.json`

## ✅ Dicas finais

- Mantenha o backend e o frontend em repositórios e deploys separados
- Use um pipeline de CI/CD para builds automatizados
- Sempre teste o build de produção localmente antes de subir para o servidor
- Garanta que o `baseURL` da API esteja correto no ambiente de produção
