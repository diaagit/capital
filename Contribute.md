# Capital Installation Guide

This guide explains how to set up and run the **Capital** project. There are **three ways** to get started:

1. **Manual Setup** (Node.js + local Postgres)
2. **Using Docker**
3. **Using Docker Compose** (**recommended**)

---

## ✅ Quick Start: View Database in Browser
To open Prisma Studio and inspect your database, run:

```bash
npm run start:db
````

---

## 1. Manual Installation

### **Prerequisites**

* **Node.js** ≥ 18 ([Download here](https://nodejs.org/))
* **Postgres** installed locally OR a hosted Postgres instance (e.g., [Neon.tech](https://neon.tech))
* **Docker** (optional, for running Postgres locally without installing)

---

### **Steps**

```bash
# 1. Clone the repository
git clone https://github.com/ronakmaheshwari/capital
cd capital

# 2. Install dependencies
npm install

# 3. Start a local Postgres container (optional, if Postgres is not installed locally)
docker run --name postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -d -p 5432:5432 postgres

# (Alternatively, use a Neon.tech DB and copy the connection string)

# 4. Configure environment variables
cp .env.example .env
# Open .env and set DATABASE_URL, for example:
# DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres

# 5. Apply database migrations
npm run migrate:db

# 6. Generate Prisma Client
npm run generate:db

# 7. Build and start the app
npm run build
npm run start
```

Your backend will be available at:
**[http://localhost:3001](http://localhost:3001)** (or as defined by `PORT` in `.env`).

---

## 2. Docker Installation

Use this if you want to run the app in containers without Compose.

### **Steps**

```bash
# 1. Create a dedicated Docker network and volumes
docker network create capital_network
docker volume create pg_data
docker volume create redis_data

# 2. Start Postgres
docker run --network capital_network \
  --name postgres \
  -v pg_data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -d -p 5432:5432 postgres

# 3. Start Redis
docker run --network capital_network \
  --name redis \
  -v redis_data:/data \
  -d -p 6379:6379 redis

# 4. Build backend image
docker build --network=host -f docker/Dockerfile.http -t capital-backend .

# 5. Run the backend container
docker run --network capital_network \
  -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=supersecretkey \
  -p 3001:3001 capital-backend
```

---

## 3. Docker Compose Installation (Recommended)

This method is the easiest way to run **Postgres**, **Redis**, **Backend**, and **Frontend** together.

### **Steps**

```bash
# Start all services (Postgres, Redis, Backend, Frontend)
docker-compose up
```

This will start:

* **Postgres** (port **5432**)
* **Redis** (port **6379**)
* **Backend** at [http://localhost:3001](http://localhost:3001)
* **Frontend** at [http://localhost:3000](http://localhost:3000)

---

### **Example `.env` File**

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres
REDIS_URL=redis://redis:6379
JWT_SECRET=supersecretkey
SALT_ROUNDS=10
PORT=3001
```

---

### **Stop and Clean Up**

```bash
# Stop all services
docker-compose down

# Remove volumes (reset Postgres & Redis data)
docker-compose down -v
```

---

## **Available NPM Scripts**
| Command                  | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| `npm run start:db`       | Open Prisma Studio to inspect your database                      |
| `npm run generate:db`    | Generate Prisma client                                           |
| `npm run start:frontend` | Start the frontend app                                           |
| `npm run start:backend`  | Start the backend app in dev mode                                |
| `npm run migrate:db`     | Apply Prisma migrations                                          |
| `npm run seed:db`        | Seed the database                                                |
| `npm run build`          | Build all projects using Turbo                                   |
| `npm run dev`            | Start all apps in dev mode using Turbo                           |
| `npm run lint`           | Run linter on all packages using Turbo                           |
| `npm run check-types`    | Run TypeScript type checks using Turbo                           |
| `npm run format`         | Format code with Prettier                                        |
| `npm run biome:all`      | Run Biome formatter and fix checks                               |
| `npm run biome:format`   | Format code using Biome                                          |
| `npm run biome:fix`      | Run Biome checks and auto-fix issues                             |
| `npm run biome:lint`     | Run Biome lint checks                                            |
| `npm run biome:unsafe`   | Run Biome checks with `--unsafe` auto-fix                        |
| `npm run biome:validate` | Validate Biome configuration                                     |
---

### ✅ **Recommended Workflow**

1. Run `npm install`
2. Copy `.env.example` → `.env` and update values
3. Start DB (via Postgres or Docker)
4. Run `npm run migrate:db` → `npm run generate:db`
5. Start backend: `npm run start:backend`
6. Start frontend: `npm run start:frontend`

---

