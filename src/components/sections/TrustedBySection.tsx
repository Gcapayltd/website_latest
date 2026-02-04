import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Users, CreditCard, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Trusted By Section
export function TrustedBySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(statsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(logosRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: logosRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Building2, value: '50+', label: 'Businesses' },
    { icon: Users, value: '100K+', label: 'End Users' },
    { icon: CreditCard, value: 'TZS 1B+', label: 'Processed' },
    { icon: TrendingUp, value: '99.5%', label: 'Success Rate' },
  ];

  const partners = [
    'Vodacom', 'Tigo', 'Airtel', 'Halotel', 'CRDB', 'NMB'
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-gradient-to-b from-[#0B0B0D] to-[#0f0f14] z-20 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, #F4F1EC 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 px-6 lg:px-[8vw]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.15em] uppercase text-[#C9A45C] mb-3">
            Trusted by businesses
          </p>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#F4F1EC]">
            Powering payments across Tanzania
          </h2>
        </div>

        {/* Stats Grid */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-20"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative group p-6 lg:p-8 bg-[#141419]/50 border border-[#2a2a30] rounded-2xl text-center hover:border-[#C9A45C]/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-4 bg-[#C9A45C]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C9A45C]/20 transition-colors">
                <stat.icon className="w-6 h-6 text-[#C9A45C]" />
              </div>
              
              {/* Value */}
              <div className="text-3xl lg:text-4xl font-bold text-[#F4F1EC] mb-1">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-sm text-[#A9A6B0]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partners/Networks */}
        <div className="text-center">
          <p className="text-sm text-[#A9A6B0] mb-8">Integrated with leading mobile networks and banks</p>
          
          <div 
            ref={logosRef}
            className="flex flex-wrap items-center justify-center gap-8 lg:gap-12"
          >
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="px-6 py-3 bg-[#1a1a20]/50 border border-[#2a2a30] rounded-xl hover:border-[#C9A45C]/30 transition-colors"
              >
                <span className="text-lg font-semibold text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedBySection;
