#!/data/data/com.termux/files/usr/bin/bash
# setup-secure-termux.sh
# Script para configurar la app con cifrado AES-256 sin pedir password interactivo

set -e

echo "🔹 Verificando servidor PostgreSQL..."
pg_ctl -D $PREFIX/var/lib/postgresql status >/dev/null 2>&1 || {
    echo "Servidor no está corriendo, iniciando..."
    pg_ctl -D $PREFIX/var/lib/postgresql -l $PREFIX/var/lib/postgresql/logfile start
}

# Crear usuario y base de datos si no existen
psql -U u0_a257 -tc "SELECT 1 FROM pg_database WHERE datname = 'casino'" | grep -q 1 || createdb -U u0_a257 casino

# Configuración de cifrado AES-256-CBC
# 🔹 Define tu contraseña aquí (mejor en variable de entorno)
: "${ENC_PASS:=mypassword123}"  # Si ENC_PASS no existe, usa "mypassword123"

# Archivos que quieras cifrar
FILES_TO_ENCRYPT=("db/schema.sql" "db/schema_spins.sql")

echo "🔹 Cifrando archivos de configuración con AES-256-CBC..."
for f in "${FILES_TO_ENCRYPT[@]}"; do
    [ -f "$f" ] || continue
    openssl enc -aes-256-cbc -salt -in "$f" -out "$f.enc" -pass env:ENC_PASS
    echo "  - $f -> $f.enc"
done

echo "✅ Configuración segura completada."
