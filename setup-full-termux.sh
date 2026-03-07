#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "🔹 Deteniendo cualquier servidor PostgreSQL..."
pg_ctl -D $PREFIX/var/lib/postgresql stop -m immediate || true
rm -f $PREFIX/var/lib/postgresql/postmaster.pid

# Inicializar clúster solo si no existe
if [ ! -d "$PREFIX/var/lib/postgresql/base" ]; then
  echo "🔹 Inicializando PostgreSQL..."
  initdb $PREFIX/var/lib/postgresql -U u0_a257
fi

echo "🔹 Iniciando servidor PostgreSQL..."
pg_ctl -D $PREFIX/var/lib/postgresql -l $PREFIX/var/lib/postgresql/logfile start
sleep 2

# Crear base de datos si no existe
psql -U u0_a257 -tc "SELECT 1 FROM pg_database WHERE datname='casino'" | grep -q 1 || createdb -U u0_a257 casino

echo "🔹 Importando esquemas SQL..."
psql -U u0_a257 -d casino -f schema.sql
psql -U u0_a257 -d casino -f schema_spins.sql

echo "🔹 Instalando dependencias Node..."
npm install

echo "🔹 Compilando Next.js..."
npm run build

echo "🔹 Iniciando app en modo desarrollo..."
npm run dev
