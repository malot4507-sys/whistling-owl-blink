#!/usr/bin/env node
require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

(async () => {
  console.log("🚀 Inicializando DB y test del casino...");

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // necesario si usas Vercel/Postgres remoto
  });

  try {
    // Conexión a DB
    await pool.query("SELECT 1");
    console.log("✅ Conectado a la DB correctamente");

    // Crear tabla users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        balance NUMERIC DEFAULT 1000,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabla 'users' creada o verificada");

    // Crear tabla spins
    await pool.query(`
      CREATE TABLE IF NOT EXISTS spins (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        bet NUMERIC,
        win NUMERIC,
        reels TEXT[],
        nonce INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabla 'spins' creada o verificada");

    // Crear usuario de prueba
    const testUser = { user: "test", pass: "123", email: "test@example.com" };
    const hash = await bcrypt.hash(testUser.pass, 10);

    const userRes = await pool.query(
      `INSERT INTO users(username, password_hash, email)
       VALUES($1, $2, $3)
       ON CONFLICT (username) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           email = EXCLUDED.email
       RETURNING id, username, email, balance`,
      [testUser.user, hash, testUser.email]
    );
    console.log("✅ Usuario de prueba creado/verificado:", userRes.rows[0]);

    // Insertar spins de prueba
    const spinsSample = [
      ["🍒","🍒","🍒"],
      ["🍋","⭐","🍉"],
      ["⭐","🍋","🍉"],
      ["🍉","🍋","🍒"],
      ["🍒","🍒","🍉"]
    ];

    for (let i = 0; i < spinsSample.length; i++) {
      const reels = spinsSample[i];
      const win = reels.every(s => s === reels[0]) ? 1 : 0;
      const bet = 1;
      await pool.query(
        `INSERT INTO spins(user_id, bet, win, reels, nonce)
         VALUES($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [userRes.rows[0].id, bet, win, reels, i + 1]
      );
    }
    console.log("✅ Spins de prueba insertados");

  } catch (err) {
    console.error("❌ Error ejecutando script:", err.message);
  } finally {
    await pool.end();
    console.log("🚀 Script completado.");
  }
})();
