import { Hero } from "@/components/hero";
import { Games } from "@/components/games";
import { CryptoPayments } from "@/components/crypto-payments";
import { Stats } from "@/components/stats";
import { CTABanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Games />
      <CryptoPayments />
      <Stats />
      <CTABanner />
      <Footer />
    </main>
  );
}
