import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Newspaper, ArrowRight } from 'lucide-react';
import { SlideText } from '@/components/SlideText';

gsap.registerPlugin(ScrollTrigger);

// Insights/Blog Section
export function InsightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
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
    <section 
      ref={sectionRef} 
      id="insights"
      className="relative w-full py-24 lg:py-32 bg-[#0B0B0D] z-50"
    >
      <div className="dirt-grain" />
      <div className="px-6 lg:px-[8vw]">
        <div ref={contentRef} className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6">
            Insights
          </span>
          
          <div className="w-20 h-20 mx-auto mb-8 bg-[#141419] border border-[#2a2a30] rounded-2xl flex items-center justify-center">
            <Newspaper className="w-10 h-10 text-[#C9A45C]" />
          </div>
          
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] mb-6">
            News & Insights
          </h2>
          
          <p className="text-xl text-[#A9A6B0] leading-relaxed">
            The latest news, product updates, and expert perspectives from the GCA Pay team.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold rounded-xl transition-colors group slide-trigger"
            >
              <SlideText>Browse Articles</SlideText>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#141419] border border-[#2a2a30] rounded-full text-[#A9A6B0]">
              <div className="w-2 h-2 bg-[#C9A45C] rounded-full animate-pulse" />
              <span className="text-sm">New articles regularly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InsightsSection;
