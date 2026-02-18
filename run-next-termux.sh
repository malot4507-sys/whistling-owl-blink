#!/data/data/com.termux/files/usr/bin/bash
# 🚀 Termux Ready-to-Go Next.js Setup (Next 13 + React 18)

echo "🔹 Iniciando setup ultra-ligero para Termux..."

# 1️⃣ Instalar dependencias necesarias
echo "📦 Instalando Next 13 + React 18..."
npm install next@13.5.6 react@18 react-dom@18 --no-audit --no-fund

# 2️⃣ Instalar Babel fallback para evitar SWC
echo "📦 Instalando Babel fallback..."
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader --no-audit --no-fund

# 3️⃣ Crear .babelrc si no existe
if [ ! -f ".babelrc" ]; then
  echo '{
  "presets": ["next/babel"]
}' > .babelrc
  echo "✅ .babelrc creado"
fi

# 4️⃣ Limpiar compilaciones viejas
echo "🧹 Limpiando .next y caches..."
rm -rf .next node_modules/.cache

# 5️⃣ Modificar next.config.mjs para Termux
echo "🛠️ Configurando next.config.mjs para desactivar SWC y Turbopack..."
sed -i '1i process.env.NEXT_DISABLE_SWC_NATIVE="1"; process.env.NEXT_DISABLE_SWC_WASM="1"; process.env.NEXT_PRIVATE_DISABLE_SWC="1"; process.env.NEXT_DISABLE_TURBO="1"; process.env.NEXT_FORCE_WASM="0";' next.config.mjs

# Quitar bloque turbopack si existe
sed -i '/turbopack: {/,/},/d' next.config.mjs

# 6️⃣ Ejecutar proyecto
echo "🚀 Arrancando Next.js..."
NEXT_DISABLE_TURBO=1 NEXT_DISABLE_SWC_NATIVE=1 npx next dev
