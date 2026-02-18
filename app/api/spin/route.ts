import { NextResponse } from "next/server";
import crypto from "crypto";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function rngFloat(seed: string) {
  const hash = sha256(seed);
  const slice = hash.substring(0, 13);
  const intVal = parseInt(slice, 16);
  return intVal / 0xfffffffffffff;
}

export async function POST(req: Request) {
  try {
    const { bet, clientSeed } = await req.json();

    if (!bet || bet <= 0) {
      return NextResponse.json({ error: "Invalid bet" }, { status: 400 });
    }

    const serverSeed = crypto.randomBytes(32).toString("hex");
    const nonce = Date.now();

    const roll = rngFloat(serverSeed + clientSeed + nonce);

    // 🎰 PAYTABLE — house edge ~15%
    let multiplier = 0;

    if (roll > 0.98) multiplier = 10;
    else if (roll > 0.93) multiplier = 5;
    else if (roll > 0.85) multiplier = 2;
    else if (roll > 0.70) multiplier = 1.2;
    else multiplier = 0;

    const win = bet * multiplier;

    await pool.query(
      `INSERT INTO spins 
      (bet, multiplier, win, server_seed, client_seed, nonce, created_at)
      VALUES ($1,$2,$3,$4,$5,$6,NOW())`,
      [bet, multiplier, win, serverSeed, clientSeed, nonce]
    );

    return NextResponse.json({
      roll,
      multiplier,
      win,
      nonce,
      serverSeedHash: sha256(serverSeed),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Spin failed" }, { status: 500 });
  }
}
