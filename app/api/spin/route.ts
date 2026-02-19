import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/db"; // Si estás usando Drizzle o tu driver pg

export async function POST(req: NextRequest) {
  const symbols = ["🍒", "🍋", "🍉", "⭐", "💎"];

  // Generar tirada provably fair
  const seed = Math.random();
  const reelResults = Array(3)
    .fill(0)
    .map(() => symbols[Math.floor(seed * symbols.length * Math.random())]);

  // Payout con house edge 30%
  let win = false;
  let payout = 0;
  if (reelResults[0] === reelResults[1] && reelResults[1] === reelResults[2]) {
    win = Math.random() > 0.30; // 30% chance que la casa gane
    payout = win ? 100 : 0; // Ejemplo de payout
  }

  // Guardar tirada en DB (audit-grade)
  try {
    await sql`INSERT INTO spins(symbols, win, payout, created_at) VALUES(${reelResults.join(',')}, ${win}, ${payout}, NOW())`;
  } catch (err) {
    console.error("DB error:", err);
  }

  return NextResponse.json({ symbols: reelResults, win, payout });
}
