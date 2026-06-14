# 📋 Visão Geral do Sistema - GestPeople

## 🎯 Objetivo do Sistema

**GestPeople** é um sistema de **Gestão de Recursos Humanos (RH)** desenvolvido com **Laravel 11**, fornecendo uma **API RESTful completa** para gerenciar todos os aspectos da gestão de pessoal em uma organização.

O sistema foi concebido para centralizar e automatizar os processos de gestão de recursos humanos, permitindo um controle eficiente sobre:
- **Dados de Funcionários**: Informações pessoais, funcções e departamentos
- **Acompanhamento de Desempenho**: Avaliação e monitorização do desempenho dos colaboradores
- **Gestão de Presenças**: Registo de assiduidade e ponto
- **Administração de Salários e Pagamentos**: Gestão de remuneração e benefícios
- **Controle de Suspensões**: Monitorização de suspensões disciplinares
- **Comunicação Interna**: Sistema de mensagens entre funcionários
- **Relatórios e Estatísticas**: Análise de dados para suporte à tomada de decisões

---

## 🏗️ Módulos Principais

O sistema está organizado em **9 módulos principais**, cada um responsável por uma área específica da gestão de RH:

### 1. **👤 Gestão de Utilizadores (User Management)**
   - Criar, listar e atualizar informações de utilizadores
   - Gestão de dados pessoais e profissionais dos funcionários
   - Atribuição de departamentos e funções
   - Acesso a informações de desempenho e suspensões
   - **Endpoints**: `/user/all`, `/user/create`, `/user/update`, `/user/{id}`

### 2. **🏢 Gestão de Departamentos**
   - CRUD completo de departamentos
   - Consultar contagem de utilizadores por departamento
   - Listagem e detalhes de cada departamento
   - Ordenação de funcionários por departamento
   - **Endpoints**: `/departamento/create`, `/departamento/get`, `/departamento/users/count`

### 3. **💼 Gestão de Funções (Cargos)**
   - CRUD de funções e cargos organizacionais
   - Listagem de utilizadores por função
   - Contadores de funções e análise de distribuição
   - **Endpoints**: `/funcao/`, `/funcao/create`, `/funcao/users/count`, `/funcao/count`

### 4. **📊 Gestão de Desempenho**
   - Registo de avaliações de desempenho
   - Acompanhamento do desempenho de funcionários ao longo do tempo
   - Criação de relatórios de desempenho
   - **Endpoints**: `/desempenho/`, `/desempenho/create`

### 5. **📅 Gestão de Presenças**
   - Registo diário de presenças
   - Consulta de informações de assiduidade individual
   - Análise de padrões de presença
   - **Endpoints**: `/presenca/`, `/presenca/create`, `/presenca/information/{id}`

### 6. **💰 Gestão de Salários**
   - Definição e atualização de salários
   - Cálculo automático de componentes salariais
   - Histórico de alterações salariais
   - **Endpoints**: `/salary/`, `/salary/create`, `/salary/update`, `/salary/show/{id}`

### 7. **💳 Gestão de Pagamentos**
   - Registo de pagamentos de salários
   - Processamento de remuneração
   - Consulta de histórico de pagamentos
   - **Endpoints**: `/pagamento/`, `/pagamento/create`, `/pagamento/information/{id}`

### 8. **🚫 Gestão de Suspensões**
   - Registo de suspensões disciplinares
   - Consulta de histórico de suspensões
   - Rastreamento de motivos e datas
   - **Endpoints**: `/suspensao/`, `/suspensao/create`, `/suspensao/information/{id}`

### 9. **💬 Sistema de Mensagens (Chat)**
   - Comunicação interna entre funcionários
   - Envio e recebimento de mensagens
   - Histórico de conversas
   - Notificações de mensagens não lidas
   - **Endpoints**: `/messege/`, `/messege/send`, `/messege/see/{id}`

---

## 👥 Tipos de Utilizadores e Perfis

O sistema contempla diferentes **roles e níveis de acesso** baseados em padrões de autorização (Policy-based):

### 1. **Administrador (Admin)**
   - Acesso total a todos os módulos
   - Capacidade de criar, editar e eliminar utilizadores
   - Gestão completa de departamentos e funções
   - Visualização de todos os relatórios e dados
   - Capacidade de atualizar dados salariais e processamentos de pagamento

### 2. **Gestor de Departamento (Manager)**
   - Visualização de dados do seu departamento
   - Acesso a informações de presenças e desempenho dos colaboradores
   - Capacidade de avaliar desempenho de subordinados
   - Visualização de dados salariais (sem capacidade de edição)

### 3. **Recursos Humanos (HR)**
   - Gestão completa de dados de utilizadores
   - Processamento de salários e pagamentos
   - Gestão de suspensões e disciplina
   - Acesso total a relatórios e estatísticas
   - Coordenação de processos administrativos

### 4. **Funcionário (Employee)**
   - Visualização dos seus próprios dados
   - Consulta de informações pessoais e salariais (dados próprios)
   - Registo e consulta de próprias presenças
   - Acesso a avaliações de desempenho pessoais
   - Comunicação via sistema de mensagens

---

## 🔄 Fluxo Geral do Sistema

### **1. Autenticação e Acesso**
```
Utilizador → [Login] → Validação de credenciais → 
Geração de Token (Sanctum) → Acesso aos Recursos
```

### **2. Gestão de Recursos Humanos - Fluxo Básico**
```
Administrador/HR
    ↓
[Criar/Atualizar Utilizador] → Atribuir Departamento/Função
    ↓
Sistema de Presenças: Registo Diário
    ↓
Avaliação de Desempenho: Registo Periódico
    ↓
Gestão Salarial: Cálculos e Atualizações
    ↓
Processamento de Pagamentos: Execução de Vencimentos
    ↓
Relatórios e Análises: Extração de Dados
```

### **3. Comunicação Interna**
```
Funcionário A → [Enviar Mensagem] → Sistema de Mensagens →
[Notificação] → Funcionário B
```

### **4. Monitorização de Desempenho e Disciplina**
```
Gestor/HR → [Avaliar Desempenho] → Registo no Sistema
     ↓
    Comportamento inadequado → [Registar Suspensão] → 
    Histórico de Disciplina → Acompanhamento
```

### **5. Ciclo de Processamento de Remuneração**
```
Dados de Presenças → Cálculo de Salário →
Geração de Pagamentos → Confirmação de Execução →
Relatórios Financeiros
```

---

## 🔐 Autenticação e Segurança

- **Autenticação**: Utiliza **Laravel Sanctum** para autenticação baseada em tokens
- **Autorização**: Sistema de **Policies** para controle granular de acesso
- **Middleware de Autenticação**: Todas as rotas (exceto login) requerem token válido (`auth:sanctum`)
- **Proteção de Dados**: Acesso baseado em roles e departamentos

### Fluxo de Login:
```
POST /login (credentials) 
  ↓
Validação de credenciais
  ↓
Geração de Token Sanctum
  ↓
Retorno de Token para Frontend
  ↓
Frontend armazena token e o utiliza em requests subsequentes
```

---

## 📊 Estrutura de Dados Principal

O sistema trabalha com as seguintes **entidades principais**:

| Entidade | Descrição |
|----------|-----------|
| **User** | Funcionário do sistema |
| **Departamento** | Unidade organizacional |
| **Função** | Cargo ou posição no organograma |
| **Desempenho** | Avaliação de rendimento |
| **Presença** | Registo diário de assiduidade |
| **Salário** | Remuneração base e componentes |
| **Pagamento** | Processamento e comprovativo de pagamento |
| **Suspensão** | Medida disciplinar |
| **Mensagem** | Comunicação entre utilizadores |

---

## 🔄 Integração Frontend-Backend

- **Backend (Este Repositório)**: Fornece API RESTful em Laravel
- **Frontend**: Aplicação React.js em repositório separado
- **Comunicação**: Via HTTP/HTTPS com tokens JWT (Sanctum)
- **Configuração CORS**: Configurado em `config/cors.php`

---

## 📈 Casos de Uso Principais

1. **Onboarding de Funcionário**: Criar novo utilizador, atribuir departamento e função
2. **Registo de Ponto**: Funcionário faz check-in via sistema de presenças
3. **Avaliação Periódica**: Gestor regista desempenho do colaborador
4. **Ciclo de Pagamento**: HR processa salários e gera pagamentos
5. **Gestão Disciplinar**: Registar suspensão em caso de comportamento inadequado
6. **Comunicação Interna**: Funcionários trocam mensagens via plataforma
7. **Extração de Relatórios**: Visualizar estatísticas e tendências

---

## 🚀 Próximas Fases

Este documento de visão geral é complementado por:
- **Instalação** (`01-installation.md`)
- **Arquitetura Técnica** (`02-architecture.md`)
- **Documentação da Base de Dados** (`03-database.md`)
- **Autenticação e Roles** (`04-auth-roles.md`)
- **Regras de Negócio** (`05-business-rules.md`)
- **Referência Completa da API** (`06-api.md`)
- **Fluxos de Trabalho** (`07-workflows.md`)
- **Deployment** (`08-deployment.md`)
