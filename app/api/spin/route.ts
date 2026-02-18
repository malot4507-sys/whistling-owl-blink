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
