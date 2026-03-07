import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       RETURNING id`,
      [email, hashed]
    );

    const userId = result.rows[0].id;

    // Crear wallet inicial
    await pool.query(
      `INSERT INTO wallets (user_id, balance)
       VALUES ($1, 1000)`,
      [userId]
    );

    return Response.json({ message: "User created", userId });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "User exists" }, { status: 400 });
  }
}
