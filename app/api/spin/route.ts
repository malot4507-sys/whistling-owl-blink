import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

const symbols = ["🍒", "🍋", "🍉", "⭐"];

function spinReels() {
  return [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];
}

export async function POST() {
  const result = spinReels();

  const win = result[0] === result[1] && result[1] === result[2];
  const payout = win ? 100 : 0;

  try {
    await pool.query(
      "INSERT INTO spins(symbols, win, payout) VALUES($1, $2, $3)",
      [result, win, payout]
    );
  } catch (err) {
    console.error("DB ERROR:", err);
  }

  return NextResponse.json({
    symbols: result,
    win,
    payout,
  });
}
