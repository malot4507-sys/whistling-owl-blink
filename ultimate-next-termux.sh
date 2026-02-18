#!/data/data/com.termux/files/usr/bin/bash
# 🚀 Next.js Ultimate Termux Launcher (Next 13 + React 18)

echo "🔹 Iniciando Next.js Termux Ultimate Setup..."

# 1️⃣ Instalar Next 13 + React 18 (compatible Termux)
echo "📦 Instalando Next.js 13 + React 18..."
npm install next@13.5.6 react@18 react-dom@18 --no-audit --no-fund

# 2️⃣ Instalar Babel fallback
echo "📦 Instalando Babel fallback para evitar SWC..."
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

# 5️⃣ Configurar next.config.mjs para Termux
echo "🛠️ Modificando next.config.mjs para desactivar SWC y Turbopack..."
# Agregar variables de entorno al inicio
sed -i '1i process.env.NEXT_DISABLE_SWC_NATIVE="1"; process.env.NEXT_DISABLE_SWC_WASM="1"; process.env.NEXT_PRIVATE_DISABLE_SWC="1"; process.env.NEXT_DISABLE_TURBO="1"; process.env.NEXT_FORCE_WASM="0";' next.config.mjs
# Eliminar cualquier bloque turbopack
sed -i '/turbopack: {/,/},/d' next.config.mjs

# 6️⃣ Detectar IP local para acceso desde otros dispositivos
IP=$(ip addr show wlan0 | grep "inet " | awk '{print $2}' | cut -d/ -f1)
if [ -z "$IP" ]; then
  IP="127.0.0.1"
fi

# 7️⃣ Ejecutar Next.js con entorno seguro Termux
echo "🚀 Iniciando Next.js..."
echo "🌐 Tu sitio estará disponible en:"
echo "   Local: http://localhost:3000"
echo "   Red:   http://$IP:3000"

NEXT_DISABLE_TURBO=1 NEXT_DISABLE_SWC_NATIVE=1 npx next dev
