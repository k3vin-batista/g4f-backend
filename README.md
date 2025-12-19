Backend API built with NestJS, PostgreSQL and TypeORM.

This project is dockerized from the start and prepared for domain-driven development.

---

## Tech Stack
- Node.js 22
- NestJS
- TypeORM
- PostgreSQL
- Docker & Docker Compose
- Swagger (OpenAPI)

---

## Project Structure

```txt
src/
 ├─ core/        # Infrastructure and configuration
 ├─ shared/      # Shared utilities (cross-domain)
 ├─ app.module.ts
 └─ main.ts
````

* `core`: database, config, and infrastructure concerns
* `shared`: reusable cross-domain components
* Domain folders will live directly under `src/`

---

## Environment Configuration

Create a `.env` file based on `.env.example`:

```env
PORT=4501
ENV=development

DB_HOST=localhost
DB_PORT=4502
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=g4f
```

> When running with Docker, database variables are overridden by Docker Compose.

---

## Running with Docker

### Build and start containers

```bash
docker compose up --build
```

### Services

* API: [http://localhost:4501/](http://localhost:4501)
* Swagger UI: [http://localhost:4501/docs](http://localhost:4501/docs)
* PGAdmin: [http://localhost:4503/](http://localhost:4503)

### PGAdmin credentials

* Email: `admin@g4f.com`
* Password: `admin`

To register the database server in PGAdmin:

* Host: `postgres`
* Port: `5432`
* Username: `postgres`
* Password: `postgres`
* Database: `g4f`

---

## Running locally (without Docker)

```bash
npm install
npm run start:dev
```

Make sure your local Postgres is running and `.env` is correctly configured.

---

## Database Migrations

This project uses **TypeORM migrations**.

* `synchronize` is disabled
* Schema changes must be handled via migrations

Migrations are located at:

```
src/core/database/migration
```

---

## API Documentation

Swagger is available at:

```
http://localhost:4501/docs
```

---