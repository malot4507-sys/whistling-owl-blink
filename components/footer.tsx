"use client";

import { Container } from "@/components/container";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--brand)]/20 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-gray-400">
              Play responsibly. 18+ only.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Games</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#slots" className="hover:text-[var(--brand)] transition-colors">Slots</a></li>
              <li><a href="#roulette" className="hover:text-[var(--brand)] transition-colors">Roulette</a></li>
              <li><a href="#blackjack" className="hover:text-[var(--brand)] transition-colors">Blackjack</a></li>
              <li><a href="#poker" className="hover:text-[var(--brand)] transition-colors">Poker</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Crypto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#btc" className="hover:text-[var(--brand)] transition-colors">Bitcoin</a></li>
              <li><a href="#eth" className="hover:text-[var(--brand)] transition-colors">Ethereum</a></li>
              <li><a href="#usdt" className="hover:text-[var(--brand)] transition-colors">USDT</a></li>
              <li><a href="#payments" className="hover:text-[var(--brand)] transition-colors">All Payments</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#terms" className="hover:text-[var(--brand)] transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-[var(--brand)] transition-colors">Privacy Policy</a></li>
              <li><a href="#responsible" className="hover:text-[var(--brand)] transition-colors">Responsible Gaming</a></li>
              <li><a href="#support" className="hover:text-[var(--brand)] transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[var(--brand)]/20 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} NeonBet Casino. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
