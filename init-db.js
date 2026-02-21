// init-db.js
require("dotenv").config();
const { Pool } = require("pg");

// Conexión segura a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

(async () => {
  try {
    console.log("🚀 Conectando a la DB...");
    
    // Crear tabla users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        balance NUMERIC DEFAULT 1000,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabla 'users' creada o verificada");

    // Crear tabla spins
    await pool.query(`
      CREATE TABLE IF NOT EXISTS spins (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        reels TEXT[],
        win BOOLEAN,
        payout INT,
        nonce INT,
        hash TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabla 'spins' creada o verificada");

    // Insertar usuario de prueba
    await pool.query(`
      INSERT INTO users (username, password)
      VALUES ('test', '123')
      ON CONFLICT (username) DO NOTHING;
    `);
    console.log("✅ Usuario de prueba agregado");

    // Insertar algunos spins de prueba
    await pool.query(`
      INSERT INTO spins (user_id, reels, win, payout, nonce, hash)
      VALUES
        (1, '{"🍒","🍒","🍒"}', true, 100, 1, 'hash1'),
        (1, '{"🍋","⭐","🍉"}', false, 0, 2, 'hash2')
      ON CONFLICT DO NOTHING;
    `);
    console.log("✅ Spins de prueba agregados");

    // Mostrar últimos 5 usuarios
    const users = await pool.query("SELECT * FROM users ORDER BY id DESC LIMIT 5;");
    console.log("\n🎯 Últimos usuarios:");
    console.table(users.rows);

    // Mostrar últimos 5 spins
    const spins = await pool.query("SELECT * FROM spins ORDER BY id DESC LIMIT 5;");
    console.log("\n🎰 Últimos spins:");
    console.table(spins.rows);

    console.log("\n✅ Script completado. Todo listo para usar.");
  } catch (err) {
    console.error("❌ Error ejecutando script:", err.message);
  } finally {
    await pool.end();
  }
})();
