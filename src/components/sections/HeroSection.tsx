import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// Rotating phrases for the hero
const rotatingPhrases = [
  'move money',
  'build payments',
  'scale faster',
  'integrate APIs',
  'grow business',
];

// Hero Section with Expanding Card
export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardTextRef = useRef<HTMLDivElement>(null);
  const rotatingTextRef = useRef<HTMLSpanElement>(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // Rotating text animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Animate out
      if (rotatingTextRef.current) {
        gsap.to(rotatingTextRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
            // Animate in
            if (rotatingTextRef.current) {
              gsap.fromTo(rotatingTextRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
              );
            }
          }
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Load animation timeline - runs once on mount
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      loadTl
        .fromTo(bgRef.current, 
          { scale: 1.1, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 1.2 }
        )
        .fromTo(headlineRef.current?.children || [], 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 
          0.3
        )
        .fromTo(subheadlineRef.current, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6 }, 
          0.5
        )
        .fromTo(ctaRef.current, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6 }, 
          0.6
        )
        .fromTo(cardRef.current, 
          { y: 100, opacity: 0, scale: 0.9 }, 
          { y: 0, opacity: 1, scale: 1, duration: 1 }, 
          0.4
        )
        .fromTo(cardTextRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
          0.8
        );

      // Pin the hero section
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Separate scroll animation - only starts after scrolling 150px
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: '150px top', // Must scroll 150px before anything happens
          end: '+=60%',
          scrub: 1.5,
        }
      })
      .to(cardRef.current, {
        scale: 6,
        opacity: 0,
        ease: 'power2.in'
      }, 0)
      .to(headlineRef.current, {
        y: -80,
        opacity: 0,
        ease: 'power2.in'
      }, 0)
      .to(subheadlineRef.current, {
        y: -60,
        opacity: 0,
        ease: 'power2.in'
      }, 0)
      .to(ctaRef.current, {
        y: -50,
        opacity: 0,
        ease: 'power2.in'
      }, 0)
      .to(bgRef.current, {
        scale: 1.1,
        opacity: 0,
        ease: 'power2.in'
      }, 0);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-10 bg-[#0B0B0D]">
      <div className="dirt-grain" />
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/hero_main.jpg" 
          alt="Hero background" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/80 via-[#0B0B0D]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-[#0B0B0D]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[8vw] pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          {/* Left - Text Content */}
          <div className="max-w-xl">
            {/* Headline */}
            <div ref={headlineRef} className="mb-6">
              <h1 className="text-[clamp(42px,5.5vw,80px)] font-bold leading-[1.0] tracking-[-0.03em] text-[#F4F1EC]">
                <span className="block">Change the</span>
                <span className="block">way you</span>
                <span className="block text-[#C9A45C] overflow-hidden">
                  <span ref={rotatingTextRef} className="inline-block">
                    {rotatingPhrases[currentPhraseIndex]}
                  </span>
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p 
              ref={subheadlineRef}
              className="text-[clamp(16px,1.3vw,22px)] text-[#A9A6B0] leading-relaxed mb-8 max-w-md"
            >
              One integration for collections, disbursements, and real-time reconciliation. Built for businesses in Tanzania and beyond.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex items-center gap-4">
              <a href="https://merchant.gca-pay.com/auth?mode=register" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold px-8 py-4 rounded-full text-base">
                  Get started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="https://docs.gca-pay.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#F4F1EC]/30 text-[#F4F1EC] hover:bg-[#F4F1EC]/10 px-6 py-4 rounded-full text-base backdrop-blur-sm">
                  Documentation
                </Button>
              </a>
            </div>
          </div>

          {/* Right - Floating Card (Border Only) */}
          <div className="relative flex justify-center lg:justify-end items-center">
            <div 
              ref={cardRef}
              className="relative w-[280px] sm:w-[340px] lg:w-[380px] aspect-[4/5] rounded-[32px] border-2 border-white/30"
            >
              {/* Subtle corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C9A45C]/60 rounded-tl-[32px]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C9A45C]/60 rounded-br-[32px]" />
              
              {/* Card Content - Animated Text */}
              <div 
                ref={cardTextRef}
                className="relative h-full flex flex-col items-start justify-center p-8 lg:p-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C9A45C]" />
                    <span className="text-xl lg:text-2xl font-light text-white/90 tracking-wide">
                      Integrate
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <span className="text-xl lg:text-2xl font-light text-white/60 tracking-wide">
                      Collect
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <span className="text-xl lg:text-2xl font-light text-white/60 tracking-wide">
                      Transfer
                    </span>
                  </div>
                </div>
                
                {/* Decorative line */}
                <div className="absolute bottom-10 left-8 right-8 h-px bg-gradient-to-r from-white/20 via-[#C9A45C]/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
