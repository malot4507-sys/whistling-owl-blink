#!/usr/bin/env node

require("dotenv").config();
const { Pool } = require("pg");

async function test() {
  // Pool con SSL desactivando validación de certificado para DB remota
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    // Verificar conexión
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB conectada correctamente");
    console.log("Hora actual DB:", res.rows[0].now);

    // Últimos 5 spins
    const spins = await pool.query(
      "SELECT id, bet, win, reels, nonce FROM spins ORDER BY id DESC LIMIT 5"
    );
    console.log("\n🎰 Últimos 5 spins:");
    console.table(spins.rows);

    // Últimos 5 usuarios
    const users = await pool.query(
      "SELECT id, username, balance, created_at FROM users ORDER BY id DESC LIMIT 5"
    );
    console.log("\n👤 Últimos 5 usuarios:");
    console.table(users.rows);

  } catch (err) {
    console.error("❌ Error conectando DB o ejecutando query:", err.message);
  } finally {
    await pool.end();
    console.log("\n🚀 Script completado.");
    process.exit();
  }
}

test();
