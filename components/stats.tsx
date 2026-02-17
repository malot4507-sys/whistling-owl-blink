"use client";

import { Container } from "@/components/container";

export function Stats() {
  const stats = [
    { number: "2,500+", label: "Casino Games", icon: "🎰" },
    { number: "$50M+", label: "Paid Out", icon: "💰" },
    { number: "500K+", label: "Active Players", icon: "👥" },
    { number: "24/7", label: "Support", icon: "💬" },
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-[var(--surface)] via-purple-950/20 to-[var(--surface)] relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[var(--brand)] rounded-full blur-[100px] opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[var(--accent)] rounded-full blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 
            className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Trusted by Thousands
          </h2>
          <p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Join the fastest-growing crypto casino community
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-[var(--brand)]/20 hover:border-[var(--brand)]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--brand)]/20 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div 
                className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stat.number}
              </div>
              <div 
                className="text-gray-400 font-semibold"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
