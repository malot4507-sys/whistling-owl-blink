"use client";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-r from-purple-900/40 via-[var(--surface)] to-cyan-900/40 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMDBkOWZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 
            className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ready to Win Big?
          </h2>
          <p 
            className="text-2xl text-gray-300 mb-10 leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Join thousands of players winning every day. Sign up now and get your welcome bonus.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-100">
            <Button 
              size="lg" 
              className="rounded-full px-10 py-7 text-xl font-bold bg-gradient-to-r from-[var(--brand)] via-[var(--accent)] to-[var(--accent-gold)] hover:opacity-90 transition-all duration-500 shadow-2xl shadow-[var(--brand)]/50 hover:shadow-[var(--brand)]/80 hover:-translate-y-1 animate-pulse"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Claim Your Bonus
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-10 py-7 text-xl font-semibold border-2 border-white text-white hover:bg-white/10 transition-all duration-500"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Play Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400 animate-fade-in-up delay-200">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Instant Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>200% Welcome Bonus</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
