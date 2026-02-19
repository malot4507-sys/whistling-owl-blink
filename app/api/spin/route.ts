import { NextResponse } from "next/server";
import crypto from "crypto";
import { pool } from "@/lib/db";

const SYMBOLS = ["🍒","🍋","🍉","⭐"];

export async function POST() {
  const bet = 1;
  const userId = "demo";

  // Seeds provably fair
  const serverSeed = crypto.randomBytes(32).toString("hex");
  const clientSeed = crypto.randomBytes(16).toString("hex");

  const nonceRes = await pool.query(
    "SELECT COALESCE(MAX(nonce),0)+1 AS nonce FROM spins"
  );
  const nonce = nonceRes.rows[0].nonce;

  const hash = crypto
    .createHash("sha256")
    .update(serverSeed + clientSeed + nonce)
    .digest("hex");

  // RNG determinístico
  function pick(i: number) {
    const slice = hash.slice(i * 8, i * 8 + 8);
    const num = parseInt(slice, 16);
    return SYMBOLS[num % SYMBOLS.length];
  }

  const reels = [pick(0), pick(1), pick(2)];
  const winAmount =
    reels[0] === reels[1] && reels[1] === reels[2] ? bet * 100 : 0;

  await pool.query(
    `INSERT INTO spins
    (bet, win, nonce, server_seed, client_seed, hash, reels, user_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [bet, winAmount, nonce, serverSeed, clientSeed, hash, reels, userId]
  );

  return NextResponse.json({
    reels,
    win: winAmount > 0,
    payout: winAmount,
    nonce,
    hash,
  });
}
