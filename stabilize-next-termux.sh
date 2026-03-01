#!/data/data/com.termux/files/usr/bin/bash

echo "🧹 Estabilizando Next.js para Termux..."

if [ ! -f "package.json" ]; then
  echo "❌ Ejecuta esto dentro de ~/whistling-owl-blink"
  exit 1
fi

echo "🗑 Eliminando lockfiles y módulos..."
rm -rf node_modules package-lock.json pnpm-lock.yaml .next

echo "📦 Corrigiendo versiones incompatibles..."

npm pkg set dependencies.next="13.5.6"
npm pkg delete dependencies.@next/mdx
npm pkg delete dependencies.@next/swc-wasm-nodejs
npm pkg delete devDependencies.eslint-config-next

echo "📥 Reinstalando dependencias limpias..."
npm install

echo "⚙️ Configurando entorno..."
export NODE_ENV=development
export NEXT_DISABLE_SWC_NATIVE=1
export NEXT_DISABLE_TURBO=1

echo "🚀 Iniciando servidor..."
npx next dev -H 0.0.0.0
