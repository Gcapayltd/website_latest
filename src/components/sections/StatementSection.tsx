import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Statement Section Component (Full Page Pinned)
export interface StatementSectionProps {
  headline: string;
  subheadline: string;
  image: string;
  zIndex: number;
  entranceDirection?: 'top' | 'bottom' | 'left' | 'right' | 'scale';
  stat?: string;
  statLabel?: string;
}

export function StatementSection({ headline, subheadline, image, zIndex, entranceDirection = 'bottom', stat, statLabel }: StatementSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 5%', // Start when section is almost at top (not before)
          end: '+=100%',
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        }
      });

      // Entrance animations (0% - 30%)
      let entranceFrom: gsap.TweenVars = {};
      switch (entranceDirection) {
        case 'top':
          entranceFrom = { y: '-50vh', opacity: 0 };
          break;
        case 'bottom':
          entranceFrom = { y: '50vh', opacity: 0 };
          break;
        case 'left':
          entranceFrom = { x: '-60vw', opacity: 0 };
          break;
        case 'right':
          entranceFrom = { x: '60vw', opacity: 0 };
          break;
        case 'scale':
          entranceFrom = { scale: 0.75, opacity: 0 };
          break;
      }

      scrollTl
        .fromTo(headlineRef.current, 
          entranceFrom, 
          { x: 0, y: 0, scale: 1, opacity: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo(subheadlineRef.current, 
          { y: '15vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.1
        )
        .fromTo(bgRef.current, 
          { scale: 1.15, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        );

      // Exit animations (70% - 100%)
      let exitTo: gsap.TweenVars = {};
      switch (entranceDirection) {
        case 'top':
          exitTo = { y: '35vh', opacity: 0 };
          break;
        case 'bottom':
          exitTo = { y: '-35vh', opacity: 0 };
          break;
        case 'left':
          exitTo = { x: '45vw', opacity: 0 };
          break;
        case 'right':
          exitTo = { x: '-45vw', opacity: 0 };
          break;
        case 'scale':
          exitTo = { scale: 1.1, opacity: 0 };
          break;
      }

      scrollTl
        .fromTo(headlineRef.current, 
          { opacity: 1 }, 
          { ...exitTo, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(subheadlineRef.current, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(bgRef.current, 
          { scale: 1, opacity: 1 }, 
          { scale: 1.08, opacity: 0.5, ease: 'none' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, [entranceDirection]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex }}
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0"
      >
        <img 
          src={image} 
          alt={headline} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0B0D]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h2 
          ref={headlineRef}
          className="text-[clamp(40px,8vw,120px)] font-bold leading-[0.95] tracking-[-0.03em] text-[#F4F1EC] uppercase"
        >
          {headline}
        </h2>
        <p 
          ref={subheadlineRef}
          className="mt-6 max-w-[50vw] text-[clamp(16px,1.4vw,24px)] text-[#A9A6B0] leading-relaxed"
        >
          {subheadline}
        </p>
        {stat && (
          <div className="mt-8 flex items-center gap-3">
            <span className="text-4xl lg:text-5xl font-bold text-[#C9A45C]">{stat}</span>
            <span className="text-sm text-[#A9A6B0]">{statLabel}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default StatementSection;
