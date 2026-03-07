#!/bin/bash
set -e

# ========================================
# ⚡ Setup PostgreSQL para Termux
# ========================================

PG_DATA="$PREFIX/var/lib/postgresql"
PG_LOG="$PG_DATA/logfile"
PG_USER=$(whoami)    # Usuario Termux actual
DB_NAME="casino"

echo "🔹 Limpiando directorio de PostgreSQL..."
mkdir -p "$PG_DATA"
chmod 700 "$PG_DATA"

# Si ya hay datos, se advierte
if [ -d "$PG_DATA/base" ]; then
    echo "⚠️  Directorio PostgreSQL ya contiene datos. Se mantendrán."
else
    echo "🔹 Inicializando PostgreSQL..."
    initdb "$PG_DATA"
fi

echo "🔹 Iniciando servidor PostgreSQL..."
pg_ctl -D "$PG_DATA" -l "$PG_LOG" start

# Esperar unos segundos para asegurarnos de que arranca
sleep 2

echo "🔹 Creando usuario y base de datos..."

psql -U "$PG_USER" << EOF
-- Eliminar si ya existen
DROP DATABASE IF EXISTS $DB_NAME;
DROP USER IF EXISTS $PG_USER;

-- Crear usuario y DB
CREATE USER $PG_USER WITH PASSWORD '';
CREATE DATABASE $DB_NAME OWNER $PG_USER;
EOF

echo "✅ PostgreSQL listo. Base de datos '$DB_NAME' creada con usuario '$PG_USER'."
echo "Para detener el servidor: pg_ctl -D $PG_DATA stop"
echo "Para conectarte: psql -U $PG_USER -d $DB_NAME"
