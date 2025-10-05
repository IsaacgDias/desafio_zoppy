# Desafio Técnico Zoppy - CRUD Clientes e Produtos

## Descrição
Este projeto é uma aplicação **CRUD de Clientes e Produtos**.  
O objetivo é gerenciar registros de forma persistente, garantindo boas práticas de desenvolvimento, testes unitários, integração entre módulos e um frontend moderno e responsivo.

A aplicação permite:
- Criar, ler, atualizar e deletar clientes e produtos.
- Vincular produtos a clientes.
- Filtrar listas de registros.
- Acessar a aplicação em dispositivos móveis (mobile-first).
- Visualizar os dados com paginação e filtros.

**Tecnologias utilizadas:**
- Backend: [Node.js](https://nodejs.org/), [NestJS 10.x](https://docs.nestjs.com/), [Sequelize](https://sequelize.org/), [MySQL](https://www.mysql.com/)
- Frontend: [Angular 19](https://angular.io/), [TailwindCSS](https://tailwindcss.com/), [RxJS](https://rxjs.dev/)
- Docker: Para conteinerização do backend e banco de dados
- Testes unitários: [Jest](https://jestjs.io/)

---

## Requisitos
- Node.js v20+
- NestJs v10.x
- Angular CLI v19+
- Docker e Docker Compose
- MySQL (via Docker)

---

## Instalação e Setup com Docker

1. Clone o repositório:
```bash
git clone https://github.com/IsaacgDias/desafio_zoppy.git
cd desafio_zoppy
```

2. Suba os containers do backend e banco de dados:
docker compose up --build

3. O backend estará disponível em 
http://localhost:3000

4. O frotend estará disponivel em 
http://localhost:4200

5. O banco de dados MySQL já estará pronto conforme configuração do docker-compose.yml:

## Instalação Localmente sem Docker

### Backend
cd backend
npm install
npm run start:dev

### Frontend
cd frontend
npm install
ng serve


# Testes Unitários
cd backend
npm install
npm run test       

## Endpoints da API

### Clientes
- GET /clientes          → Listar todos os clientes
- GET /clientes/:id      → Obter cliente por ID
- POST /clientes         → Criar novo cliente
- PUT /clientes/:id      → Atualizar cliente
- DELETE /clientes/:id   → Deletar cliente

### Produtos
- GET /produtos
- GET /produtos/:id
- POST /produtos
- PUT /produtos/:id
- DELETE /produtos/:id

### Relacionamento
- POST /clientes/:id/produtos → Vincular produtos a um cliente


