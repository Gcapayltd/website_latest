import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/sections/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { StatementSection } from '@/components/sections/StatementSection';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { DeveloperSection } from '@/components/sections/DeveloperSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

// Main App
function App() {
  useEffect(() => {
    // Ensure page starts at top on mount/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    // Refresh ScrollTrigger after DOM is ready
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 200);
    
    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection />
        <ProductsSection />
        <AboutSection />
        
        {/* Full Page Pinned Statement Sections */}
        <StatementSection 
          headline="Always On"
          subheadline="Built for reliability. Our systems are monitored 24/7 with automatic failover to keep your payments flowing."
          image="/portrait_always_on.jpg"
          zIndex={30}
          entranceDirection="bottom"
          stat="24/7"
          statLabel="Monitoring"
        />
        
        <StatementSection 
          headline="Fast Settlement"
          subheadline="Get paid faster. Funds move quickly through our optimized payment rails so your business keeps moving."
          image="/portrait_instant.jpg"
          zIndex={40}
          entranceDirection="left"
          stat="Real-time"
          statLabel="Processing"
        />
        
        <StatementSection 
          headline="Scale With Us"
          subheadline="From startup to enterprise, our infrastructure grows with you. Handle millions of transactions without breaking a sweat."
          image="/portrait_scale.jpg"
          zIndex={50}
          entranceDirection="scale"
          stat="Unlimited"
          statLabel="Growth"
        />
        
        <InsightsSection />
        <DeveloperSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
