"use client";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section 
      className="relative min-h-screen -mt-24 flex items-start bg-cover bg-center"
      style={{
        backgroundImage: `url('https://lrggyvioreorxttbasgi.supabase.co/storage/v1/object/public/app-assets/7798/images/1771295906087-casino-hero.jpg')`,
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-purple-900/40"></div>
      
      {/* Animated neon glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[var(--brand)] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-80 h-80 bg-[var(--accent)] rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <Container className="relative z-10 pt-32 pb-20">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Play & Win with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand)] via-[var(--accent)] to-[var(--accent-gold)]">
              Crypto
            </span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            The future of online gaming. Lightning-fast deposits and instant crypto payouts.
            Play slots, roulette, blackjack and more with Bitcoin, Ethereum & USDT.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-lg font-bold bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] hover:opacity-90 transition-all duration-500 shadow-2xl shadow-[var(--brand)]/50 hover:shadow-[var(--brand)]/70 hover:-translate-y-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Start Playing Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 py-6 text-lg font-semibold border-2 border-[var(--brand)] text-white hover:bg-[var(--brand)]/10 transition-all duration-500"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              View Games
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex items-center gap-8 text-sm text-gray-400 animate-fade-in-up delay-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Instant Payouts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎰</span>
              <span>2500+ Games</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
