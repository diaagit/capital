# Capital Installation Guide

This guide provides three ways to run the project:

1. **Manual setup** (Node.js + local Postgres)
2. **Using Docker**
3. **Using Docker Compose (recommended)**

---

Want to see data in database:

In root folder just run:

1. npm run start:db

## **1. Manual Installation**

### Prerequisites

* Node.js >= 18 (install from [Node.js official site](https://nodejs.org/))
* Postgres installed locally or hosted (e.g., [neon.tech](https://neon.tech))

### Steps

```bash
# Clone the repository
git clone https://github.com/ronakmaheshwari/capital
cd capital

# Install dependencies
npm install

# Start a local Postgres container (if Postgres is not already running)
docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

# OR use a Neon.tech DB and grab your connection string

# Configure environment
cp .env.example .env
# Edit .env and set DATABASE_URL, for example:
# DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres

# Apply database migrations
cd packages/db/prisma
npx prisma migrate dev

# Generate Prisma Client
cd ../..
npx prisma generate

# Build and start the app
npm run build
npm run start
```

The backend will be available at **[http://localhost:3001](http://localhost:3001)** (or as set by `PORT`).

---

## **2. Docker Installation**

### Steps

```bash
# Create a dedicated network and volumes
docker network create capital_network
docker volume create pg_data
docker volume create redis_data

# Start Postgres
docker run --network capital_network \
  --name postgres \
  -v pg_data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -d -p 5432:5432 postgres

# Start Redis
docker run --network capital_network \
  --name redis \
  -v redis_data:/data \
  -d -p 6379:6379 redis

# Build backend image
docker build --network=host -f docker/Dockerfile.http -t capital-backend .

# Run the backend container
docker run --network capital_network \
  -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=supersecretkey \
  -p 3001:3001 capital-backend
```

---

## **3. Docker Compose Installation (Recommended)**

### Steps

```bash
# Start everything (Postgres, Redis, Backend, Frontend)
docker-compose up 
```

This will start:

* **Postgres** (port 5432)
* **Redis** (port 6379)
* **Backend** at [http://localhost:3001](http://localhost:3001)
* **Frontend** at [http://localhost:3000](http://localhost:3000)

---

### Example `.env`

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/postgres
REDIS_URL=redis://redis:6379
JWT_SECRET=supersecretkey
SALT_ROUNDS=10
PORT=3001
```

---

### Stop and Clean Up

```bash
# Stop all services
docker-compose down

# Remove volumes (reset Postgres & Redis data)
docker-compose down -v
```
---

