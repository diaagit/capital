#!/bin/sh
set -e

echo "Waiting for Postgres..."
until nc -z postgres 5432; do
  sleep 1
done

echo "Postgres is up. Running Prisma migrations..."
npx prisma migrate deploy --schema=packages/db/prisma/schema.prisma

echo "Starting server..."
exec node apps/http/dist/server.js

