#!/data/data/com.termux/files/usr/bin/bash

echo "🚀 Iniciando reparación completa de Next.js en Termux..."

# 1️⃣ Verificar que estamos en el proyecto
if [ ! -f "package.json" ]; then
  echo "❌ No estás en la carpeta del proyecto."
  echo "👉 Ejecuta: cd ~/whistling-owl-blink"
  exit 1
fi

echo "📂 Proyecto detectado"

# 2️⃣ Eliminar lockfile de pnpm si existe
if [ -f "pnpm-lock.yaml" ]; then
  echo "🗑 Eliminando pnpm-lock.yaml..."
  rm -f pnpm-lock.yaml
fi

# 3️⃣ Limpieza total
echo "🧹 Limpiando node_modules, package-lock.json y .next..."
rm -rf node_modules package-lock.json .next

# 4️⃣ Instalar dependencias con npm
echo "📦 Instalando dependencias con npm..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ Error en npm install"
  exit 1
fi

# 5️⃣ Exportar variables para evitar SWC nativo
echo "⚙️ Configurando variables de entorno..."
export NEXT_DISABLE_SWC_NATIVE=1
export NEXT_FORCE_WASM=1
export NEXT_DISABLE_TURBO=1
export NODE_ENV=development

echo "✅ Variables configuradas"

# 6️⃣ Iniciar servidor
echo "🔥 Iniciando Next.js..."
npx next dev -H 0.0.0.0
