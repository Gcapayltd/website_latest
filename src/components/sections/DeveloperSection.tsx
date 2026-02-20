import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, Shield, Zap, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SlideText } from '@/components/SlideText';

gsap.registerPlugin(ScrollTrigger);

// Developer Section
export function DeveloperSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, 
        { x: -50, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(rightRef.current?.children || [], 
        { x: 50, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightRef.current,
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
      id="docs"
      className="relative w-full py-24 lg:py-32 bg-gradient-to-br from-[#0f1419] via-[#0B0B0D] to-[#141820] z-50 overflow-hidden"
    >
      <div className="dirt-grain" />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A45C]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4A90A4]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#F4F1EC 1px, transparent 1px), linear-gradient(90deg, #F4F1EC 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 px-6 lg:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <div ref={leftRef}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#C9A45C]/20 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-[#C9A45C]" />
              </div>
              <span className="text-sm font-semibold tracking-[0.08em] uppercase text-[#C9A45C]">
                For Developers
              </span>
            </div>
            
            <h2 className="text-[clamp(32px,4vw,52px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] mb-6">
              Built for developers, by developers
            </h2>
            
            <p className="text-lg text-[#A9A6B0] leading-relaxed mb-8">
              Clean APIs, comprehensive documentation, and SDKs in your favorite languages. 
              Get started in minutes, not days.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Zap, text: 'Idempotent requests' },
                { icon: Shield, text: 'Webhook signatures' },
                { icon: Globe, text: 'Sandbox environment' },
                { icon: Clock, text: 'Auto retry logic' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[#C9A45C]" />
                  <span className="text-[#F4F1EC]">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a href="https://docs.gca-pay.com" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold px-6 py-3 rounded-xl slide-trigger">
                  <SlideText>Read the docs</SlideText>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href="https://merchant.gca-pay.com/auth?mode=register" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#F4F1EC]/20 text-[#F4F1EC] hover:bg-[#F4F1EC]/10 px-6 py-3 rounded-xl slide-trigger">
                  <SlideText>Get Started</SlideText>
                </Button>
              </a>
            </div>
          </div>

          {/* Right - Code Blocks */}
          <div ref={rightRef} className="space-y-4">
            {/* Code Block 1 */}
            <div className="bg-[#0a0a0c] border border-[#2a2a30] rounded-2xl overflow-hidden hover:border-[#C9A45C]/30 transition-colors shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111115] border-b border-[#2a2a30]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-[#A9A6B0]">Collect payment</span>
              </div>
              <pre className="p-4 text-sm text-[#A9A6B0] overflow-x-auto font-mono">
                <code>{`curl -X POST https://gcapay.site/api/v1/payment-service/payment \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone_number": "+255683542710",
    "amount": "1000"
  }'`}</code>
              </pre>
            </div>

            {/* Code Block 2 - Response */}
            <div className="bg-[#0a0a0c] border border-[#2a2a30] rounded-2xl overflow-hidden hover:border-[#C9A45C]/30 transition-colors shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111115] border-b border-[#2a2a30]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-[#C9A45C]">Response • 200 OK</span>
              </div>
              <pre className="p-4 text-sm text-[#A9A6B0] overflow-x-auto font-mono">
                <code>{`{
  "status": "success",
  "transaction_id": "txn_8f2k4m9p",
  "message": "Payment initiated",
  "amount": "1000",
  "currency": "TZS"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeveloperSection;
