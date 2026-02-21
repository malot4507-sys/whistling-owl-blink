#!/usr/bin/env node
require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

async function main() {
  console.log("🚀 Inicializando DB y test del casino...");

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    // Test de conexión
    const now = await pool.query("SELECT NOW()");
    console.log("✅ Conectado a la DB correctamente:", now.rows[0]);

    // Crear tabla users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        balance NUMERIC DEFAULT 1000,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabla 'users' creada o verificada");

    // Crear tabla spins
    await pool.query(`
      CREATE TABLE IF NOT EXISTS spins (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        reels TEXT[],
        bet NUMERIC DEFAULT 1,
        payout NUMERIC DEFAULT 0,
        win BOOLEAN DEFAULT false,
        nonce INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabla 'spins' creada o verificada");

    // Crear usuario de prueba
    const testUser = {
      username: "test",
      email: "test@example.com",
      password: "123",
    };
    const hash = await bcrypt.hash(testUser.password, 10);

    const resUser = await pool.query(
      `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO UPDATE
        SET email = EXCLUDED.email
      RETURNING id, username, email, balance;
    `,
      [testUser.username, testUser.email, hash]
    );
    console.log("✅ Usuario de prueba creado/verificado:", resUser.rows[0]);

    // Insertar algunos spins de prueba
    const testSpins = [
      ["🍒", "🍒", "🍒"],
      ["🍉", "🍒", "🍋"],
      ["⭐", "🍋", "🍉"],
      ["🍉", "🍋", "🍒"],
      ["🍒", "🍒", "🍉"],
    ];

    for (let i = 0; i < testSpins.length; i++) {
      await pool.query(
        `
        INSERT INTO spins (user_id, reels, nonce)
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
      `,
        [resUser.rows[0].id, testSpins[i], i + 1]
      );
    }
    console.log("✅ Spins de prueba insertados");

  } catch (err) {
    console.error("❌ Error ejecutando script:", err.message);
  } finally {
    await pool.end();
    console.log("🚀 Script completado.");
  }
}

main();
