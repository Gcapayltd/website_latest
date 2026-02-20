import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SlideText } from '@/components/SlideText';

gsap.registerPlugin(ScrollTrigger);

// About Section
export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(contentRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#EDE8DF] z-20 overflow-hidden"
    >
      {/* Dirt grain texture */}
      <div className="dirt-grain" style={{ mixBlendMode: 'multiply', opacity: 0.2 }} />
      {/* Warm earthy tint layer */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 60%, rgba(160,110,60,0.10) 0%, transparent 65%), radial-gradient(ellipse at 80% 20%, rgba(190,150,90,0.08) 0%, transparent 60%)',
        }}
      />
      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none z-0 shadow-[inset_0_0_80px_rgba(100,70,30,0.10)]" />
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C9A45C]/10 to-transparent" />
      
      <div className="relative z-10 px-6 lg:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <img 
                src="/about.jpg" 
                alt="About GCA Pay" 
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 via-transparent to-transparent" />
            </div>
            
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#C9A45C]/30 rounded-3xl -z-10" />
            
            {/* Floating accent */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#C9A45C]/30 rounded-full blur-2xl" />
          </div>

          {/* Right - Content */}
          <div ref={contentRef}>
            <span className="inline-block px-4 py-2 bg-[#C9A45C]/15 border border-[#C9A45C]/50 rounded-full text-sm text-[#8B6A2E] font-medium mb-6">
              About Us
            </span>
            
            <h2 className="text-[clamp(32px,4vw,52px)] font-bold leading-tight tracking-[-0.02em] text-[#0B0B0D] mb-6">
              Empowering businesses with seamless payments
            </h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg text-[#3a3840] leading-relaxed">
                GCA Pay is a financial platform designed to empower businesses with payments in Tanzania. Our platform streamlines payment processes by offering powerful tools for collecting and disbursing payments seamlessly.
              </p>
              <p className="text-lg text-[#3a3840] leading-relaxed">
                Whether you need to accept payments via mobile money, bank transfers, or card payments, or manage payouts with ease — GCA Pay provides the infrastructure to support your business growth.
              </p>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                'Mobile Money',
                'Bank Transfers', 
                'Card Payments',
                'Bulk Payouts'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A8843D]" />
                  <span className="text-[#1a1820] font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button className="bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold px-8 py-4 rounded-full text-base slide-trigger">
              <SlideText>Learn more about us</SlideText>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
