"use client";

import { Container } from "@/components/container";

export function CryptoPayments() {
  const cryptos = [
    { name: "Bitcoin", symbol: "BTC", icon: "₿", color: "#f7931a" },
    { name: "Ethereum", symbol: "ETH", icon: "Ξ", color: "#627eea" },
    { name: "USDT", symbol: "USDT", icon: "₮", color: "#26a17b" },
    { name: "Litecoin", symbol: "LTC", icon: "Ł", color: "#345d9d" },
  ];

  return (
    <section id="crypto" className="py-24 md:py-32 bg-black/40 backdrop-blur-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--accent-gold)] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--brand)] rounded-full blur-[150px] opacity-10"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 
              className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Instant Crypto
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-gold)] to-[var(--brand)]">
                Deposits & Withdrawals
              </span>
            </h2>
            <p 
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Play with confidence. Deposit and withdraw in seconds with blockchain technology.
              No banks, no delays, complete privacy.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: "⚡", text: "Lightning-fast transactions (1-5 minutes)" },
                { icon: "🔒", text: "100% anonymous and secure" },
                { icon: "💰", text: "No fees on crypto deposits" },
                { icon: "🌍", text: "Available worldwide, no restrictions" },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-3xl">{feature.icon}</span>
                  <span className="text-gray-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up delay-200">
            <img
              src="https://lrggyvioreorxttbasgi.supabase.co/storage/v1/object/public/app-assets/7798/images/1771295916196-crypto-casino.jpg"
              alt="Crypto Casino"
              className="rounded-3xl shadow-2xl shadow-[var(--brand)]/20"
            />
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {cryptos.map((crypto, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[var(--brand)]/50 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div 
                    className="text-4xl font-bold mb-2"
                    style={{ color: crypto.color }}
                  >
                    {crypto.icon}
                  </div>
                  <div 
                    className="font-bold text-white text-lg"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {crypto.name}
                  </div>
                  <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
