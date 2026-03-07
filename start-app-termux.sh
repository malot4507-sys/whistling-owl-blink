#!/data/data/com.termux/files/usr/bin/bash
# start-app-termux.sh
# 🔹 Script para iniciar PostgreSQL y levantar la app Next.js en Termux

set -e

# Variables
PGDATA="$PREFIX/var/lib/postgresql"
LOGFILE="$PGDATA/logfile"

echo "🔹 Verificando servidor PostgreSQL..."

# Si PostgreSQL no está corriendo, arrancarlo
pg_ctl -D "$PGDATA" status >/dev/null 2>&1 || {
    echo "🔹 Iniciando servidor PostgreSQL..."
    pg_ctl -D "$PGDATA" -l "$LOGFILE" start
}

# Exportar .env
if [ -f .env ]; then
    echo "🔹 Exportando variables de entorno..."
    export $(cat .env | xargs)
fi

# Comprobar conexión a DB
echo "🔹 Probando conexión a la base de datos..."
psql -U u0_a257 -d casino -h localhost -p 5432 -c "\q" >/dev/null 2>&1 || {
    echo "❌ No se puede conectar a la base de datos. ¿Está inicializada?"
    exit 1
}

echo "✅ Base de datos lista."

# Iniciar Next.js
echo "🔹 Iniciando la app Next.js..."
export CHOKIDAR_USEPOLLING=true
export WATCHPACK_POLLING=true

npm run dev
