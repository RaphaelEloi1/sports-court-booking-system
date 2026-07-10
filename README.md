# sports-court-booking-system
Primeiro commit do desafio Avanti

# 🏟️ Sistema de Agendamento de Quadras

Uma aplicação web desenvolvida para facilitar o gerenciamento de reservas de quadras esportivas, permitindo o cadastro de jogadores, quadras e reservas, evitando conflitos de horários e tornando o processo de agendamento mais organizado.

Este projeto foi desenvolvido como desafio do **Bootcamp Desenvolvimento Full Stack Básico (DFS 2026.2)**.

---

## 📋 Objetivo

O objetivo da aplicação é oferecer uma solução simples e eficiente para o gerenciamento de quadras esportivas, permitindo:

- Cadastro de jogadores;
- Cadastro de quadras esportivas;
- Agendamento de reservas;
- Consulta da agenda das quadras;
- Controle de conflitos de horários.

---

## 🚀 Funcionalidades

### 👤 Cadastro de Jogadores

Permite cadastrar jogadores contendo:

- Nome completo
- E-mail
- Telefone

---

### 🏟️ Cadastro de Quadras

Permite cadastrar quadras contendo:

- Nome da quadra
- Modalidade esportiva
- Localização

Exemplos:

- Futebol Society
- Vôlei
- Basquete
- Tênis

---

### 📅 Cadastro de Reservas

Cada reserva possui:

- Jogador responsável
- Quadra
- Data
- Horário de início
- Horário de término

### ✅ Regra de Negócio

O sistema impede que duas reservas sejam realizadas para a mesma quadra no mesmo horário.

---

### 📆 Consulta da Agenda

O sistema permite visualizar:

- Todas as reservas
- Agenda por quadra
- Horários disponíveis
- Horários ocupados

---

## 🛠️ Tecnologias Utilizadas

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript (ES6+)

### Ferramentas

- Git
- GitHub
- VS Code
- Postman

---

# 📂 Estrutura do Projeto

```
sports-court-booking/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# 🗄️ Modelagem do Banco de Dados

## Jogadores

| Campo | Tipo |
|--------|------|
| id | Integer |
| nome | String |
| email | String |
| telefone | String |

---

## Quadras

| Campo | Tipo |
|--------|------|
| id | Integer |
| nome | String |
| modalidade | String |
| localizacao | String |

---

## Reservas

| Campo | Tipo |
|--------|------|
| id | Integer |
| jogadorId | Integer |
| quadraId | Integer |
| data | Date |
| horarioInicio | Time |
| horarioFim | Time |

---

# 🔄 Fluxo da Aplicação

```text
Jogador
     │
     ▼
Escolhe uma quadra
     │
     ▼
Seleciona data e horário
     │
     ▼
Sistema verifica conflito
     │
 ┌───┴────┐
 │        │
 ▼        ▼
Livre   Ocupado
 │        │
 ▼        ▼
Reserva  Erro
Criada
```

---

# 📦 Como Executar o Projeto

## Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/sports-court-booking.git
```

---

## Entrar na pasta

```bash
cd sports-court-booking
```

---

# ▶️ Backend

## Instalar dependências

```bash
cd backend

npm install
```

---

## Configurar o arquivo .env

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/agendamento_quadras"
PORT=3000
```

---

## Executar migrations

```bash
npx prisma migrate dev
```

---

## Iniciar servidor

```bash
npm run dev
```

Servidor:

```
http://localhost:3000
```

---

# 💻 Frontend

Entrar na pasta

```bash
cd frontend
```

Instalar dependências

```bash
npm install
```

Executar

```bash
npm run dev
```

Aplicação:

```
http://localhost:5173
```

---

# 📡 API

## Jogadores

| Método | Endpoint |
|---------|----------|
| GET | /jogadores |
| GET | /jogadores/:id |
| POST | /jogadores |
| PUT | /jogadores/:id |
| DELETE | /jogadores/:id |

---

## Quadras

| Método | Endpoint |
|---------|----------|
| GET | /quadras |
| GET | /quadras/:id |
| POST | /quadras |
| PUT | /quadras/:id |
| DELETE | /quadras/:id |

---

## Reservas

| Método | Endpoint |
|---------|----------|
| GET | /reservas |
| GET | /reservas/:id |
| POST | /reservas |
| PUT | /reservas/:id |
| DELETE | /reservas/:id |


# 🧪 Testes

Para executar os testes (quando implementados):

```bash
npm test
```

---

# 🤝 Equipe

| Nome | Responsabilidade |
|------|------------------|
| Integrante 1 | Backend |
| Integrante 2 | Frontend |
| Integrante 3 | Banco de Dados |
| Integrante 4 | Documentação |

---

# 📅 Cronograma

| Etapa | Data |
|--------|------|
| Backend | 25/07/2026 |
| Frontend | 22/08/2026 |

---

# 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins educacionais durante o Bootcamp Desenvolvimento Full Stack Básico (DFS 2026.2).

---

## ⭐ Desenvolvido por

Equipe do Bootcamp DFS 2026.2

Se este projeto foi útil para você, deixe uma ⭐ no repositório!
