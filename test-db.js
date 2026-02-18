require("dotenv").config();
const { Pool } = require("pg");

async function test() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB conectada correctamente");
    console.log(res.rows[0]);
  } catch (err) {
    console.error("❌ Error conectando DB:", err.message);
  }

  process.exit();
}

test();
