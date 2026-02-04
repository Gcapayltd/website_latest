import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Briefcase } from 'lucide-react';
import { Navigation } from '@/components/sections/Navigation';
import { Footer } from '@/components/sections/Footer';

export function CareersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-[8vw] min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/career.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/80 via-[#0B0B0D]/85 to-[#0B0B0D]" />
        </div>
        
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6 backdrop-blur-sm">
            Careers
          </span>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] mb-6">
            Join Our <span className="text-[#C9A45C]">Team</span>
          </h1>
          <p className="text-xl text-[#A9A6B0] max-w-2xl mx-auto">
            Help us build the future of payments in Africa. We're looking for talented individuals who share our passion for innovation.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 lg:px-[8vw]">
        <div ref={contentRef} className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-[#141419] border border-[#2a2a30] rounded-2xl flex items-center justify-center">
            <Briefcase className="w-10 h-10 text-[#C9A45C]" />
          </div>
          
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] mb-6">
            No Open Positions Yet
          </h2>
          
          <p className="text-xl text-[#A9A6B0] leading-relaxed mb-8">
            We don't have any open positions at the moment, but we're always interested in hearing from talented individuals. Check back later or send us your resume.
          </p>
          
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#141419] border border-[#2a2a30] rounded-full text-[#A9A6B0] mb-8">
            <div className="w-2 h-2 bg-[#C9A45C] rounded-full animate-pulse" />
            <span className="text-sm">Positions coming soon</span>
          </div>

          <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[#F4F1EC] mb-4">Send us your resume</h3>
            <p className="text-[#A9A6B0] mb-4">
              Even though we don't have open positions right now, we'd love to hear from you. Send your resume and tell us why you'd be a great fit for GCA Pay.
            </p>
            <a 
              href="mailto:careers@gca-pay.com" 
              className="inline-flex items-center gap-2 text-[#C9A45C] hover:text-[#F4F1EC] transition-colors font-semibold"
            >
              careers@gca-pay.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CareersPage;
