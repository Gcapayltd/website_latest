import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SlideText } from '@/components/SlideText';

gsap.registerPlugin(ScrollTrigger);

// CTA Section
export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { y: 40, opacity: 0, scale: 0.98 }, 
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 bg-[#0B0B0D] z-50">
      <div className="dirt-grain" />
      <div className="px-6 lg:px-[8vw]">
        <div 
          ref={contentRef}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C9A45C] to-[#A8843D] p-12 lg:p-20"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold leading-tight tracking-[-0.02em] text-[#0B0B0D] mb-4">
              Ready to transform your payments?
            </h2>
            <p className="text-lg text-[#0B0B0D]/70 mb-8">
              Get started in minutes. No setup fees, no hidden charges.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://merchant.gca-pay.com/auth?mode=register" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#0B0B0D] hover:bg-[#1a1a20] text-white font-semibold px-8 py-4 rounded-full text-base h-auto slide-trigger">
                  <SlideText>Create free account</SlideText>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Button variant="outline" className="border-2 border-[#0B0B0D] text-[#0B0B0D] hover:bg-[#0B0B0D] hover:text-white px-8 py-4 rounded-full text-base h-auto bg-transparent slide-trigger">
                <SlideText>Contact sales</SlideText>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
