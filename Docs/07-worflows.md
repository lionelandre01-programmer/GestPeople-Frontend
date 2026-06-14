# 🔄 Fluxos de Trabalho (Workflows) - GestPeople

## 📌 Visão Geral

Este documento descreve os principais workflows do GestPeople com foco nas responsabilidades de frontend e backend.
A ideia é mostrar como a interface React interage com a API Laravel e quais são as principais rotas e endpoints para cada fluxo.

---

## 🧠 Arquitetura de Fluxo

### Frontend
- Pages/rotas que exibem formulários, tabelas e dashboards.
- `src/api.js` realiza chamadas HTTP para o backend.
- `AuthContext` mantém token e dados do usuário em estado global.
- O React envia e recebe JSON e atualiza a interface.

### Backend
- Recebe requisições da API e valida dados.
- Autentica usuários e emite tokens.
- Salva e consulta dados no banco.
- Retorna respostas padronizadas para o frontend.

### Fluxo Geral
1. Usuário interage com o frontend.
2. Frontend dispara requisição para o backend.
3. Backend processa, valida e atualiza o banco.
4. Backend retorna resposta ao frontend.
5. Frontend renderiza resultados e atualiza o estado.

---

## 🔌 Rotas e Endpoints Principais

| Frontend | Página / Rota | Backend | Ação |
|---|---|---|---|
| `/login` | Login | `POST /login` | Autenticação e token |
| `/cadastro` | Cadastro de usuário | `POST /user/create` | Criar novo funcionário |
| `/departamento/cadastro` | Novo departamento | `POST /departamento/create` | Criar departamento |
| `/funcoes/create` | Nova função | `POST /funcao/create` | Criar função |
| `/profile` | Perfil usuário | `POST /logout` / `POST /user/update` | Logout e atualizar perfil |
| `/presencas/register` | Registro de presença | `POST /presenca/create` | Salvar presença |
| `/desempenhos` | Avaliação | `POST /desempenho/create` | Registrar desempenho |
| `/salario` | Salários | `POST /salario/create`, `PUT /salario/update` | Gerenciar estrutura salarial |
| `/messeges` | Mensagens | `POST /messege/send` | Enviar mensagem |

---

## 1️⃣ Autenticação e Autorização

### Frontend
- Rota: `/login`
- Componente envia credenciais ao backend.
- Armazena token e dados do usuário em `localStorage`.
- `AuthContext` carrega o token ao iniciar o app.
- O menu condicional exibe opções apenas para usuários logados.

### Backend
- Recebe `POST /login`.
- Valida usuário e senha.
- Retorna token e dados do user.
- `auth:sanctum` ou mecanismo equivalente protege endpoints.

### Resultado
- Frontend controla acesso às rotas protegidas.
- Backend garante que apenas requests autenticados sejam atendidos.

---

## 2️⃣ Onboarding e Criação de Usuários

### Frontend
- Rota: `/cadastro`
- Exibe formulário de criação de usuário.
- Permite preencher dados pessoais, departamento e função.
- Após sucesso, redireciona para a página principal.

### Backend
- Endpoint: `POST /user/create`
- Valida requisitos: email único, departamento existente, função existente.
- Cria usuário no banco e define perfil/role.
- Retorna mensagem de sucesso ou erros de validação.

### Observação
- A criação de departamento e função também é iniciada pelo frontend nas rotas de cadastro específicas.
- Isso mantém o controle de dados consistente entre as duas camadas.

---

## 3️⃣ Registro de Presença

### Frontend
- Rotas: `/presencas`, `/presencas/register`, `/presencas/information/:id`
- Exibe lista de funcionários e formulários de ponto.
- Envia dados de entrada, saída, status e justificativa.
- Atualiza o estado local para refletir a confirmação.

### Backend
- Recebe a requisição e valida o colaborador e a data.
- Garante regras como hora de entrada anterior à hora de saída.
- Salva a presença com flag `liquidado=false` até o processamento salarial.

### Impacto
- Esses registros alimentam a folha de pagamento e relatórios de frequência.
- O frontend permite visualização e edição antes do processamento final.

---

## 4️⃣ Avaliação de Desempenho

### Frontend
- Rota: `/desempenhos`
- Mostra histórico de avaliações e formulário de nova avaliação.
- Permite filtrar por funcionário e departamento.
- Envia pontuação, comentários e data ao backend.

### Backend
- Endpoint: `POST /desempenho/create`
- Valida que o usuário existe e que a avaliação é permitida.
- Persiste o registro com `liquidado=false` quando aplicável.

### Considerações
- O frontend pode exibir resultados imediatamente ao receber a confirmação.
- O backend mantém histórico de desempenho para uso na folha salarial.

---

## 5️⃣ Gestão Salarial

### Frontend
- Rotas: `/salario`, `/salario/create`, `/salario/edit/:id`, `/salario/pagamento/:id`
- Exibe estrutura salarial, edita faixas e inicia pagamentos.
- Permite navegar para detalhes e efetuar ajustes antes do processamento.

### Backend
- Endpoints chave: `POST /salario/create`, `PUT /salario/update`, `GET /salario/{id}`
- Calcula valores com base em salários base, presenças, desempenho e descontos.
- Registra pagamentos e marca registros relacionados como liquidado.

### Resultado
- O frontend apresenta os resultados ao utilizador.
- O backend garante que os cálculos são consistentes e auditáveis.

---

## 6️⃣ Perfil do Usuário e Logout

### Frontend
- Rotas: `/profile`, `/update-user`
- Mostra dados do usuário, foto e informações pessoais.
- Oferece botão de logout e edição de perfil.
- O logout remove `token` e `user` do `localStorage`.

### Backend
- Endpoint: `POST /logout`
- Invalida token no servidor ou encerra sessão.
- O backend também processa `POST /user/update` para atualizar dados pessoais.

### Benefício
- O fluxo garante que o usuário só permaneça logado enquanto o backend aceitar o token.
- O logout é sincronizado entre frontend e backend.

---

## 7️⃣ Comunicação Interna (Mensagens)

### Frontend
- Rota: `/messeges`
- Exibe lista de conversas e caixa de envio.
- Envia mensagem para outro usuário.

### Backend
- Endpoint: `POST /messege/send`
- Valida destinatário e remetente.
- Persiste a mensagem com referências de origem/destino.

### Resultado
- Mensagens trocadas via frontend chegam ao backend e são armazenadas no banco.
- O frontend exibe histórico e confirmações de envio.

---

## 📌 Resumo de Responsabilidades

### Frontend
- Apresentar interface e navegação
- Recolher dados e enviar requisições
- Exibir resultados e erros
- Gerenciar estado de autenticação

### Backend
- Autenticar e autorizar
- Validar entradas
- Persistir dados no banco
- Retornar respostas para o frontend

---

## 🎯 Conclusão

Este arquivo agora mostra claramente como cada workflow envolve tanto o frontend React quanto o backend Laravel.
O foco está em manter a interface leve e responsiva, enquanto o backend é responsável pela segurança, validação e persistência dos dados.
**Responsáveis:** Qualquer funcionário
**Frequência:** Conforme necessário
**Resultado:** Comunicação eficiente internamente

---

## 📊 Matriz de Workflows por Role

| Workflow | Admin | Gestor | Diretor | Funcionário |
|----------|-------|--------|---------|-------------|
| Onboarding | ✅ | ✅ | ❌ | ❌ |
| Presença | ✅ | ✅ | ✅ | ❌ |
| Desempenho | ✅ | ✅ | ✅ | Leitura |
| Folha Pagamento | ✅ | ✅ | ❌ | ❌ |
| Suspensão | ✅ | ✅ | ✅ | ❌ |
| Contracheque | Ver todos | Ver dept | Ver dept | Ver próprio |
| Mensagens | ✅ | ✅ | ✅ | ✅ |

---

## ⏰ Timeline de Atividades Mensais

```
┌─────────────────────────────────────────────────────┐
│         CALENDÁRIO DE ATIVIDADES MENSAL             │
└─────────────────────────────────────────────────────┘

Dias 1-25:
├─ Registar Presenças Diárias
├─ Registar Desempenho (conforme necesário)
├─ Comunicação via Mensagens
└─ Consultar Dados Pessoais

Dias 26-28:
├─ ⚠️  Completar Presenças faltantes
├─ Avaliar Desempenho (final do mês)
├─ Verificar dados antes do processamento
└─ Gerador avisa Admin

Dias 29-30:
├─ ⚠️  Admin processa Folha de Pagamento
├─ Sistema calcula todos os salários
├─ Marcar presenças/desempenho como liquidados
└─ Gerar arquivo para Banco

Dia 30-31:
├─ ✅ Banco efetua pagamentos
├─ ✅ Funcionários consultam contracheques
└─ Ciclo fechado, pronto para próximo mês
```

---

## 🚨 Fluxos de Erro e Exceções

### Erro: Utilizador Suspenso
```
Utilizador tenta fazer login
                │
                ▼
Verifica status de suspensão
                │
                ├─ Não suspenso → Login OK
                │
                └─ Suspenso + data_fim < hoje
                   └─ Tenta login
                      │
                      ▼
                   ❌ Acesso Negado
                   "Conta suspensa até XX/XX/XXXX"
```

### Erro: Sem Dados Completos
```
Admin tenta processar folha
                │
                ▼
Verificar presenças completas
                │
                ├─ Completo → Processar
                │
                └─ Faltam dados
                   │
                   ▼
                ⚠️  Avisar Admin
                "João Silva: 10 dias sem presença"
                
                Admin decide:
                ├─ Continuar mesmo assim
                │  (considerar faltas)
                │
                └─ Cancelar
                   (adicionar presenças faltantes)
```

---

**Conclusão**: Os workflows documentados guiam os utilizadores através de cada processo, garantindo consistência e qualidade dos dados no sistema GestPeople.