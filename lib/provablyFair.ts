import crypto from "crypto";

/*
 Provably Fair Slot Engine
 Audit-grade RNG using SHA256
*/

export type SpinResult = {
  reels: number[];
  win: number;
  hash: string;
  serverSeed: string;
  clientSeed: string;
  nonce: number;
};

const SYMBOLS = 6; // 6 símbolos (0-5)
const REELS = 3;

// Tabla de pagos (ajustada a 15% house edge)
const PAYTABLE: Record<string, number> = {
  "0,0,0": 50,
  "1,1,1": 25,
  "2,2,2": 15,
  "3,3,3": 8,
  "4,4,4": 5,
  "5,5,5": 3,
};

export function generateServerSeed() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashServerSeed(seed: string) {
  return crypto.createHash("sha256").update(seed).digest("hex");
}

export function spin(
  serverSeed: string,
  clientSeed: string,
  nonce: number,
  bet: number
): SpinResult {
  const hash = crypto
    .createHash("sha256")
    .update(`${serverSeed}:${clientSeed}:${nonce}`)
    .digest("hex");

  const reels: number[] = [];

  for (let i = 0; i < REELS; i++) {
    const slice = hash.substring(i * 8, i * 8 + 8);
    const num = parseInt(slice, 16);
    reels.push(num % SYMBOLS);
  }

  const key = reels.join(",");
  let payout = PAYTABLE[key] || 0;

  // Aplicar House Edge 25%
  payout = Math.floor(payout * 0.75);

  return {
    reels,
    win: payout * bet,
    hash,
    serverSeed,
    clientSeed,
    nonce,
  };
}
