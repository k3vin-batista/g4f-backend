# G4F Backend API

API RESTful desenvolvida em **NestJS**, utilizando **TypeORM**, **PostgreSQL** e **Redis**, com foco em boas práticas de arquitetura, organização por domínio, testes automatizados e infraestrutura via Docker.

---

## Requisitos

Para rodar o projeto localmente, você precisa ter instalado:

- Node.js **v22**
- npm ou yarn
- Docker e Docker Compose (opcional, mas recomendado)

---

## Configuração de Ambiente

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no exemplo abaixo:

```env
# Application
PORT=4501

# Database
DB_HOST=localhost
DB_PORT=4502
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=g4f

# Cache
CACHE_DRIVER=in-memory
# CACHE_DRIVER=redis
REDIS_HOST=localhost
REDIS_PORT=4504
```

---

## Executando Localmente (sem Docker)

### Instalar dependências

```bash
npm install
```

---

### Subir dependências (Postgres e Redis)

Você pode subir apenas os serviços de infraestrutura:

```bash
docker compose up postgres redis -d
```

Ou usar seus próprios serviços locais.

---

### Rodar migrations

```bash
npm run migration:run
```

---

### Iniciar a API

```bash
npm run start:dev
```

A API estará disponível em:

```
http://localhost:4501
```

---

## Executando com Docker (Recomendado)

### Subir toda a stack

```bash
docker compose up --build
```

Isso irá iniciar:

- API → `http://localhost:4501`
- PostgreSQL → `localhost:4502`
- PGAdmin → `http://localhost:4503`
- Redis → `localhost:4504`

---

### Acessar o PGAdmin

- URL: `http://localhost:4503`
- Email: `admin@g4f.com`
- Senha: `admin`

Para conectar ao banco:

- Host: `postgres`
- Port: `5432`
- User: `postgres`
- Password: `postgres`
- Database: `g4f`

---

# Executando Testes

### Testes unitários

```bash
npm run test
```

---

### Testes E2E (BDD)

```bash
npm run test:e2e
```

Os testes E2E validam comportamentos como:

- Criação de Notícias
- Validação de payload
- Respostas HTTP semânticas

---

## Migrations

### Criar uma nova migration

```bash
npm run migration:generate -- src/core/database/migration/NomeDaMigration
```

### Rodar migrations

```bash
npm run migration:run
```

---

## Estrutura do Projeto

```txt
src/
├─ app.module.ts
├─ main.ts
│
├─ core/
│  └─ database/
│     ├─ database.module.ts
│     ├─ data-source.ts
│     └─ migration/
│
├─ shared/
│  ├─ shared.module.ts
│  ├─ cache/
│  ├─ pagination/
│  └─ entities/
│
├─ noticias/
│  ├─ dto/
│  ├─ entities/
│  ├─ repositories/
│  ├─ noticias.controller.ts
│  ├─ noticias.service.ts
│  └─ noticias.module.ts
│
└─ test/
   └─ noticias/
```

### Organização

- **Core**: infraestrutura e configurações globais
- **Shared**: componentes reutilizáveis (cache, paginação, base entities)
- **Domains**: cada pasta representa um domínio isolado (ex: `noticias`)
- **Test**: testes E2E seguindo metodologia BDD

---

## Cache

A aplicação suporta cache de listagem utilizando:

- **In-memory cache** (default)
- **Redis**

A troca de implementação é feita via variável de ambiente:

```env
CACHE_DRIVER=memory
# ou
CACHE_DRIVER=redis
```
