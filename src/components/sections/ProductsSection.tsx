import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BarChart3, Wallet, Send } from 'lucide-react';
import { SlideText } from '@/components/SlideText';

gsap.registerPlugin(ScrollTrigger);

// Products Section
export function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Zoom-in entrance effect - emerging from the expanding hero card
      // Starts very small and centered, scales up to fill the screen
      gsap.fromTo(containerRef.current,
        { 
          scale: 0.3, 
          opacity: 0,
          transformOrigin: 'center top'
        },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom', // Start as soon as section appears at bottom of viewport
            end: 'top 20%',
            scrub: 1.5,
          }
        }
      );

      // Heading fades in slightly after the zoom starts
      gsap.fromTo(headingRef.current, 
        { y: 60, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );

      // Cards emerge with stagger after zoom completes
      gsap.fromTo(cardsRef.current?.children || [], 
        { y: 80, opacity: 0, scale: 0.9 }, 
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const products = [
    {
      icon: Wallet,
      title: 'Collection API',
      description: 'Accept payments via mobile money, cards, and bank transfers. Real-time notifications and instant confirmation.',
      features: ['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'Card Payments'],
      cta: 'Start collecting',
      link: '/collection',
      color: 'from-[#C9A45C] to-[#A8843D]',
    },
    {
      icon: Send,
      title: 'Disbursement API',
      description: 'Send payouts to wallets and accounts in seconds. Bulk transfers with detailed reporting.',
      features: ['Bulk Payouts', 'Scheduled Transfers', 'Real-time Status', 'Retry Logic'],
      cta: 'Send payouts',
      link: '/disbursement',
      color: 'from-[#4A90A4] to-[#2E5A6B]',
    },
    {
      icon: BarChart3,
      title: 'Reconciliation',
      description: 'Auto-match transactions and close books faster. Comprehensive dashboards and analytics.',
      features: ['Auto Reconciliation', 'Custom Reports', 'Export Data', 'Analytics'],
      cta: 'View reporting',
      link: 'https://merchant.gca-pay.com/auth?mode=register',
      external: true,
      color: 'from-[#8B5A6B] to-[#5D3A47]',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="products"
      className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#0B0B0D] overflow-hidden z-20 -mt-20"
    >
      <div className="dirt-grain" />
      {/* Animated Background Text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <div className="animate-marquee whitespace-nowrap flex">
          <span className="text-[20vw] font-black text-[#1a1a1f] tracking-tight mx-8">PRODUCTS</span>
          <span className="text-[20vw] font-black text-[#1a1a1f] tracking-tight mx-8">PRODUCTS</span>
          <span className="text-[20vw] font-black text-[#1a1a1f] tracking-tight mx-8">PRODUCTS</span>
          <span className="text-[20vw] font-black text-[#1a1a1f] tracking-tight mx-8">PRODUCTS</span>
        </div>
      </div>

      <div ref={containerRef} className="relative z-10 px-6 lg:px-[8vw] will-change-transform">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-24">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6">
            Our APIs
          </span>
          <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] mb-4">
            Everything you need to
            <span className="text-[#C9A45C]"> move money</span>
          </h2>
          <p className="text-lg text-[#A9A6B0] max-w-2xl mx-auto">
            Powerful APIs designed for developers. Build, test, and scale your payment infrastructure in minutes.
          </p>
        </div>

        {/* Product Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {products.map((product, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-b from-[#141419] to-[#0f0f13] border border-[#2a2a30] rounded-3xl p-8 hover:border-[#C9A45C]/50 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient Glow */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${product.color} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}>
                <product.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#F4F1EC] mb-3">{product.title}</h3>
              <p className="text-[#A9A6B0] mb-6 leading-relaxed">{product.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.features.map((feature, fIndex) => (
                  <span 
                    key={fIndex}
                    className="px-3 py-1 bg-[#1a1a20] border border-[#2a2a30] rounded-full text-xs text-[#A9A6B0]"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {product.external ? (
                <a 
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#C9A45C] font-semibold hover:text-[#F4F1EC] transition-colors group/link slide-trigger"
                >
                  <SlideText>{product.cta}</SlideText>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              ) : (
                <a 
                  href={product.link}
                  className="inline-flex items-center text-[#C9A45C] font-semibold hover:text-[#F4F1EC] transition-colors group/link slide-trigger"
                >
                  <SlideText>{product.cta}</SlideText>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
