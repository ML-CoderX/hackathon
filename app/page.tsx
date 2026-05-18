import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection, StatsSection, FeaturesSection, TrustedBySection } from '@/components/hero-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <TrustedBySection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
