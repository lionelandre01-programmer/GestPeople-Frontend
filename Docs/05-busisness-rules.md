# 📋 Regras de Negócio - GestPeople

## 🎯 Visão Geral

As regras de negócio definem como o sistema GestPeople funciona, quais são as limitações e restrições, e como os dados devem ser processados. Estas regras garantem consistência e integridade dos dados.

---

## 👤 Regras de Utilizadores

### 1. **Criação de Utilizador**
- Cada utilizador DEVE ter `email` único
- O `email` é necessário para login
- `Departamento` e `Função` são obrigatórios na criação
- Ao criar um utilizador, é AUTOMATICAMENTE criado um registo de `Suspensao` com estado `efectivo = true`
- A senha é hasheada com bcrypt
- Campos obrigatórios: `first_name`, `last_name`, `email`, `password`, `nascimento`, `genero`, `departamento_id`, `funcao_id`

**Regra de Negócio:**
```
QUANDO novo utilizador é criado:
  Criar registo de Suspensao com:
    - user_id = novo utilizador
    - efectivo = true
    - suspenso = false
    - demitido = false
```

### 2. **Atualização de Utilizador**
- Um utilizador pode atualizar seus próprios dados
- Um gestor/admin pode atualizar dados de outro utilizador
- NÃO é possível alterar email após criação (deve ser único)
- Campo `image` armazena URL da foto de perfil

### 3. **Deleção de Utilizador**
- Apenas Admin pode deletar utilizadores
- Quando deletado, todos os seus registos relacionados são deletados (presences, desempenhos, etc.)
- A deleção é em cascata

### 4. **Login**
- Email e password obrigatórios
- Se utilizador tem múltiplas sessões ativas, todos os tokens anteriores são DELETADOS (logout de todas as sessões)
- Login falha se: email não existe, password incorreta, utilizador deletado
- Ao fazer login com sucesso, retorna token + dados do utilizador (com departamento e função)

### 5. **Logout**
- Todos os tokens do utilizador são deletados
- Impossível usar tokens antigos após logout

---

## 🏢 Regras de Departamentos

### 1. **Criação de Departamento**
- Nome (denominacao) DEVE ser único
- Campo `responsabilidade` é opcional
- Apenas Admin e Gestor podem criar departamentos

### 2. **Atualização de Departamento**
- Pode ser editado por Admin e Gestor
- Nome continua sendo único (não pode repetir com outro departamento)

### 3. **Deleção de Departamento**
- Apenas Admin pode deletar
- Se tenta deletar departamento com utilizadores, deve realocar os utilizadores primeiro
- (Ideal) Departamento só deve ser deletado se sem utilizadores

### 4. **Hierarquia de Departamentos**
- Um utilizador pertence a exatamente um departamento
- Um departamento pode ter múltiplos utilizadores
- Diretor é responsável por um único departamento

---

## 💼 Regras de Funções

### 1. **Criação de Função**
- Nome (denominacao) DEVE ser único
- DEVE estar associada a uma estrutura salarial (`salary_id`)
- Apenas Admin e Gestor podem criar
- Campo `responsabilidade` é opcional

### 2. **Atualização de Função**
- Pode alterar nome, responsabilidade e estrutura salarial
- Nome continua único

### 3. **Atribuição de Função a Utilizador**
- Um utilizador tem exatamente uma função
- Ao mudar função, a estrutura salarial muda automaticamente
- Restrição: Não pode deletar função se tem utilizadores atribuídos

---

## 💰 Regras de Salários

### 1. **Estrutura Salarial**
- Cada função tem uma estrutura salarial única
- Componentes:
  - **Salário Base** - Valor fixo
  - **Transporte** - Percentagem do salário base
  - **Alimentação** - Percentagem do salário base
  - **Desempenho** - Percentagem do salário base (baseado em avaliações)
  - **Presença** - Percentagem do salário base (bonus por assiduidade)

### 2. **Cálculo de Salário Total Mensal**

```
Salário Total = (Salário Base + Subsídios) - Descontos

Onde:
  Subsídios = Salário Base * (Transporte% + Alimentação% + Desempenho% + Presença%) / 100
  
  Descontos = Salário Base * (
    (Faltas não justificadas * %) + 
    (Atrasos * %) + 
    (Faltas justificadas * %) + 
    (Desempenho baixo * %)
  ) / 100

Exemplo:
  Salário Base: 30.000 AOA
  Transporte: 5%
  Alimentação: 10%
  Desempenho: 3%
  Presença: 2%
  
  Subsídios = 30.000 * (5 + 10 + 3 + 2) / 100 = 9.000 AOA
  
  Se houver:
    - 2 faltas não justificadas (desconto 5% cada)
    - 1 atraso (desconto 2%)
    - Desempenho baixo (desconto 3%)
  
  Descontos = 30.000 * (2*5 + 1*2 + 3) / 100 = 3.300 AOA
  
  Total = 30.000 + 9.000 - 3.300 = 35.700 AOA
```

### 3. **Descontos**
- Faltas não justificadas: Percentagem definida em tabela `descontos`
- Atrasos: Percentagem definida em tabela `descontos`
- Faltas justificadas: Percentagem reduzida
- Desempenho baixo: Desconto se desempenho ≤ 30

### 4. **Liquidação de Salário**
- Campo `liquidado` em desempenho, presença = marca se já foi usado no cálculo
- Previne dupla contagem de descontos/bônus

---

## 📅 Regras de Presenças

### 1. **Registo de Presença**
- Um registo por utilizador por dia (UNIQUE constraint: user_id, data)
- Status obrigatório: `presente`, `ausente`, `atrasado`
- Se `ausente` sem justificativa: gera desconto automático
- Se `ausente` com justificativa: desconto reduzido

### 2. **Campos de Presença**
- `entrada` - Hora que entrou (ex: 08:00)
- `saida` - Hora que saiu (ex: 17:00)
- `justificativa` - Motivo da falta
- `justificada` - Flag para falta com justificativa
- `liquidado` - Já foi usado no cálculo salarial?

### 3. **Regras por Status**
| Status | Entrada | Saída | Desconto | Regra |
|--------|---------|-------|----------|-------|
| Presente | Obrigatório | Obrigatório | Nenhum | Trabalhou dia completo |
| Atrasado | Obrigatório | Obrigatório | 2% | Chegou atrasado mas trabalhou |
| Ausente (sem justo) | Opcional | Opcional | 5% | Não compareceu |
| Ausente (com justo) | Opcional | Opcional | 1% | Não compareceu mas justificou |

### 4. **Relatórios de Presença**
- Filtrar por utilizador
- Filtrar por data
- Contar faltas, atrasos, presenças
- Calcular taxa de assiduidade

---

## 📊 Regras de Desempenho

### 1. **Registo de Desempenho**
- Valor: `0-100` (0 = péssimo, 100 = excelente)
- Escalas:
  - 0-25: Baixo
  - 26-50: Médio
  - 51-75: Bom
  - 76-100: Excelente

### 2. **Influência no Salário**
- Se desempenho ≤ 30: Gera desconto de 3%
- Se desempenho 31-60: Nenhum desconto
- Se desempenho ≥ 61: Adiciona bónus (componente `desempenho` aplicado)

### 3. **Avaliações Múltiplas**
- Um utilizador pode ter múltiplas avaliações (histórico)
- Apenas a mais recente influencia o salário (se `liquidado = false`)
- Após processamento de salário, marca-se `liquidado = true`

### 4. **Ranking de Desempenho**
- Sistema pode consultar TOP utilizadores por desempenho
- Ordenação descendente por `nivel`

---

## 🚫 Regras de Suspensões

### 1. **Estados de Suspensão**

Cada utilizador tem um registo de suspensão com 3 flags:

| Flag | Significa | Efeito |
|------|-----------|--------|
| `efectivo = true` | Contratado efetivo | Pode trabalhar |
| `suspenso = true` | Suspenso disciplinarmente | Não pode acessar sistema |
| `demitido = true` | Demitido | Não pode acessar sistema |

### 2. **Transições de Estado**

```
Estado Normal (efectivo, !suspenso, !demitido)
    ↓
    ├─→ Suspenso (efectivo, suspenso, !demitido)
    │   Período determinado [inicio - fim]
    │   ↓
    │   Volta ao Normal (quando data_fim passa)
    │
    └─→ Demitido (efectivo, demitido)
        Permanente - sem retorno
```

### 3. **Regras de Suspensão**
- Suspensão tem data de início e fim
- Quando data_fim passa, pode voltar ao normal
- Demissão é permanente
- Utilizador suspenso/demitido não consegue fazer login
- Não pode registar presença, desempenho, etc.

### 4. **Criação de Suspensão**
- Automaticamente criada quando novo utilizador é adicionado
- Pode ser editada por Gestor/Admin/Diretor
- Registro automático de quando foi suspenso (para auditoria)

---

## 💬 Regras de Mensagens

### 1. **Envio de Mensagens**
- Um utilizador pode enviar para qualquer outro utilizador
- `from_user_id` = remetente, `to_user_id` = destinatário
- `body` é o conteúdo da mensagem (obrigatório)
- Qualquer role pode enviar mensagens

### 2. **Deleção de Mensagens**
- Campo `delete = false` por padrão
- Quando deletada, `delete` muda para `true`
- Mensagem não é removida do BD (auditoria), apenas marcada como deletada

### 3. **Visualização**
- Remetente vê mensagens enviadas
- Destinatário vê mensagens recebidas
- Apenas mensagens não deletadas aparecem

---

## 📈 Regras de Movimentos

### 1. **Criação de Movimento**
- Registra cada ação importante no sistema
- Quando: novo utilizador, atualização, mudança de dados sensíveis
- Rastreabilidade completa

### 2. **Campos Auditados**
- Quem fez
- O quê foi alterado
- Quando foi alterado
- Dados anterior vs novo

---

## 🔄 Regras de Cálculo de Folha de Pagamento

### 1. **Processamento Mensal**
Cada mês, o sistema deve:

1. Contar presenças do mês
   - Faltas não justificadas
   - Atrasos
   - Faltas justificadas
   
2. Consultar última avaliação de desempenho
   - Se ≤ 30 → aplica desconto
   
3. Calcular:
   ```
   Salário Total = (Base + Subsídios) - Descontos
   ```

4. Marcar como `liquidado`:
   - Presencas do mês com `liquidado = true`
   - Desempenho do mês com `liquidado = true`

5. Criar registo em `pagamentos`
   - user_id
   - valor
   - mês/ano
   - detalhamento (base, subsídios, descontos)

### 2. **Regra de Fechamento**
- Depois de processado, não pode ser alterado (auditoria)
- Se houver erro, criar ajuste (novo pagamento) ao invés de alterar

---

## 🛡️ Validações Globais

### 1. **Validação de Datas**
- `data_nascimento` deve ser anterior a hoje
- Utilizador deve ser maior de 18 anos (recomendado)
- `data_inicio_suspensao` ≤ `data_fim_suspensao`

### 2. **Validação de Valores Monetários**
- Salário base > 0
- Percentagens de subsídios: 0-100%
- Percentagens de desconto: 0-100%

### 3. **Validação de Email**
- Formato válido (RFC 5322)
- Único no sistema
- Case-insensitive para buscas

### 4. **Validação de Enums**
- Status presença: apenas "presente", "ausente", "atrasado"
- Genero: apenas "Masculino", "Feminino"

---

## 📊 Relatórios Baseados em Regras

### 1. **Relatório de Folha de Pagamento**
- Consolidar salários do mês
- Detalhamento por componente
- Total de subsídios vs descontos
- Comparação mês anterior

### 2. **Relatório de Desempenho**
- Top 10 melhores desempenhos
- Desempenhos baixos (alertar)
- Tendência por departamento

### 3. **Relatório de Assiduidade**
- Taxa de falta por departamento
- Utilizadores com muitas faltas
- Atrasos registados

### 4. **Relatório de Suspensões**
- Utilizadores atualmente suspensos
- Histórico de suspensões
- Demissões registadas

---

## ⚠️ Casos Especiais e Exceções

### 1. **Utilizador Demitido**
- NÃO pode fazer login
- NÃO pode registar presença
- NÃO pode receber mensagens
- Dados continuam na BD (histórico)

### 2. **Utilizador Suspenso**
- NÃO pode fazer login durante período de suspensão
- Quando fim da suspensão passa, automaticamente reativado
- Pode voltar a fazer login

### 3. **Sem Presenças no Mês**
- Se não há registos de presença: considerar ausente todos os dias
- Aplicar desconto máximo

### 4. **Sem Avaliação de Desempenho**
- Se não há desempenho recente: usar última conhecida
- Se nenhuma nunca foi registada: considerar 50 (médio)

---

## 🚀 Implementação no Código

As regras são implementadas através de:

1. **Model Validations** - Regras em Models
2. **Service Layer** - Lógica complexa em Services
3. **Form Requests** - Validação de entrada
4. **Policies** - Autorização
5. **Database Constraints** - UNIQUE, FOREIGN KEY, CHECK

---

**Conclusão**: As regras de negócio garantem que o sistema GestPeople funcione de forma consistente, segura e atenda às necessidades operacionais da gestão de RH.