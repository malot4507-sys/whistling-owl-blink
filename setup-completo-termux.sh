#!/bin/bash
set -e

DB_DIR="$PREFIX/var/lib/postgresql"
LOG_FILE="$DB_DIR/logfile"
DB_NAME="casino"
DB_USER="u0_a257"

echo "🔹 Verificando servidor PostgreSQL..."
pg_ctl -D "$DB_DIR" status >/dev/null 2>&1 || {
    echo "🔹 Iniciando servidor PostgreSQL..."
    pg_ctl -D "$DB_DIR" -l "$LOG_FILE" start
    sleep 2
}

echo "🔹 Creando usuario si no existe..."
psql -U "$DB_USER" -d postgres -tc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1 || psql -U "$DB_USER" -d postgres -c "CREATE USER $DB_USER WITH SUPERUSER;"

echo "🔹 Creando base de datos si no existe..."
psql -U "$DB_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1 || createdb -U "$DB_USER" "$DB_NAME"

echo "🔹 Importando esquemas SQL..."
psql -U "$DB_USER" -d "$DB_NAME" -f schema.sql
psql -U "$DB_USER" -d "$DB_NAME" -f schema_spins.sql

echo "🔹 Base de datos lista. Tablas actuales:"
psql -U "$DB_USER" -d "$DB_NAME" -c "\dt"

echo "✅ Todo listo. Puedes continuar con la app."
