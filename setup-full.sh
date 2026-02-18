#!/data/data/com.termux/files/usr/bin/bash
# Setup completo Whistling Owl Blink - Termux → GitHub → Vercel

echo "🌀 1. Limpiando Babel y caches..."
rm -f .babelrc babelrc
rm -rf .next node_modules/.cache

echo "📦 2. Reinstalando dependencias y forzando SWC..."
npm install

echo "📝 3. Configurando git si no está listo..."
git config --global user.name "malot4507"
git config --global user.email "malot4507@gmail.com"

echo "🔀 4. Commit de cambios críticos (Babel removed / SWC ready)..."
git add .
git commit -m "fix: remove Babel for SWC compatibility" || echo "No hay cambios nuevos"
git push origin main

echo "🛠️ 5. Preparando NeonDB (custodial) - crear tabla spins..."
psql "$DATABASE_URL" -c "
CREATE TABLE IF NOT EXISTS spins (
  id SERIAL PRIMARY KEY,
  amount NUMERIC NOT NULL,
  result VARCHAR(10) NOT NULL,
  seed VARCHAR(128) NOT NULL,
  payout NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
"

echo "⚡ 6. Generando /api/spin automático..."
mkdir -p app/api/spin
cat > app/api/spin/route.ts <<'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { generateProvablyFair } from '@/lib/provablyFair';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
  const { betAmount } = await req.json();
  const { result, seed } = generateProvablyFair();
  const payout = result === 'win' ? betAmount * 0.65 : 0;
  await pool.query(
    'INSERT INTO spins(amount, result, seed, payout) VALUES($1, $2, $3, $4)',
    [betAmount, result, seed, payout]
  );
  return NextResponse.json({ result, payout, seed });
}
EOF

echo "✅ 7. API lista, prueba localmente:"
echo "npm run dev"
echo "curl -X POST http://localhost:3000/api/spin -H 'Content-Type: application/json' -d '{\"betAmount\":100}'"

echo "🚀 8. Preparando deploy a Vercel..."
vercel env add DATABASE_URL "$DATABASE_URL" Production
vercel --prod --confirm

echo "🎉 Todo listo: Proyecto en producción, API /spin conectada a NeonDB, SWC activo, animaciones y ventaja de casa 15% integradas."
