"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function SlotMachine() {
  const symbols = ["🍒", "🍋", "🍉", "⭐", "💎"];
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setResult("");

    try {
      const res = await fetch("/api/spin", { method: "POST" });
      const data = await res.json(); // { symbols: [...], win: boolean, payout: number }

      // Animación simple
      const animationSteps = 10;
      let i = 0;
      const interval = setInterval(() => {
        setReels(symbols.map(() => symbols[Math.floor(Math.random() * symbols.length)]));
        i++;
        if (i >= animationSteps) {
          clearInterval(interval);
          setReels(data.symbols);
          setResult(data.win ? `🎉 Ganaste ${data.payout}!` : "😢 La casa gana");
          setSpinning(false);
        }
      }, 100);
    } catch (err) {
      console.error(err);
      setResult("⚠ Error de conexión");
      setSpinning(false);
    }
  };

  return (
    <div className="text-center p-8 bg-gray-900 rounded-xl shadow-lg">
      <div className="text-6xl mb-4 flex justify-center gap-4">
        {reels.map((s, idx) => (
          <motion.div
            key={idx}
            animate={{ y: spinning ? [0, -20, 0] : 0 }}
            transition={{ repeat: spinning ? Infinity : 0, duration: 0.1 }}
          >
            {s}
          </motion.div>
        ))}
      </div>
      <button
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold"
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>
      {result && <p className="mt-4 text-xl">{result}</p>}
    </div>
  );
}
