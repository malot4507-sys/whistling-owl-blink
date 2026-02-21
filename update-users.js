require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    // Agregar columnas si no existen
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
      ADD COLUMN IF NOT EXISTS password TEXT,
      ADD COLUMN IF NOT EXISTS balance NUMERIC DEFAULT 1000;
    `);

    console.log("✅ Tabla 'users' actualizada correctamente");
  } catch (err) {
    console.error("❌ Error actualizando tabla:", err.message);
  } finally {
    await pool.end();
  }
})();
