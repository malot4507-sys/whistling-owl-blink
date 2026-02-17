"use client";

import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";

export function Games() {
  const games = [
    {
      icon: "🎰",
      title: "Slot Machines",
      description: "Over 1000+ premium slots from top providers. Progressive jackpots, free spins, and massive multipliers.",
      color: "from-[var(--brand)] to-blue-500",
    },
    {
      icon: "🎲",
      title: "Live Roulette",
      description: "Experience the thrill of real dealers streaming in HD. European, American & French variants.",
      color: "from-[var(--accent)] to-pink-500",
    },
    {
      icon: "🃏",
      title: "Blackjack",
      description: "Classic 21 with perfect strategy guides. Single and multi-hand tables with low and high limits.",
      color: "from-[var(--accent-gold)] to-orange-500",
    },
    {
      icon: "♠️",
      title: "Poker",
      description: "Texas Hold'em, Omaha, and more. Play against the house or join multiplayer tournaments.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section id="games" className="py-24 md:py-32 bg-[var(--surface)]">
      <Container>
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 
            className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Premium Casino Games
          </h2>
          <p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Choose from thousands of games. All provably fair and audited.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {games.map((game, index) => (
            <Card
              key={index}
              className={`p-8 bg-gradient-to-br ${game.color} bg-opacity-10 border-2 border-transparent hover:border-current transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer animate-fade-in-up`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                background: `linear-gradient(135deg, rgba(0,217,255,0.05) 0%, rgba(255,0,255,0.05) 100%)`,
                borderColor: 'rgba(0,217,255,0.2)',
              }}
            >
              <div className="text-6xl mb-4">{game.icon}</div>
              <h3 
                className="text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {game.title}
              </h3>
              <p 
                className="text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {game.description}
              </p>
              <div className="mt-6">
                <button 
                  className="text-[var(--brand)] font-semibold hover:text-[var(--brand-light)] transition-colors duration-300 flex items-center gap-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Play Now <span>→</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
