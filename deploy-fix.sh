

#!/data/data/com.termux/files/usr/bin/bash

echo "🚀 Limpiando Babel, caches y archivos problemáticos..."
rm -f .babelrc babelrc
rm -f app/opengraph-image.tsx app/twitter-image.tsx
rm -rf .next node_modules/.cache

echo "📦 Instalando dependencias frescas..."
npm install

echo "📝 Commit de cambios para Vercel..."
git add .
git commit -m "fix: clean build for Vercel" || echo "No changes to commit"
git push origin main

echo "⚡ Redeploy a producción en Vercel..."
vercel --prod --yes

echo "✅ Deploy completo. Tu API /api/spin y DATABASE_URL están funcionando"
