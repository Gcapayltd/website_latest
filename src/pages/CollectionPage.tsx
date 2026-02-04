import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Smartphone, CreditCard, Building2, Zap, Shield, Clock, Link2, Monitor, Code2, Hash, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/sections/Navigation';
import { Footer } from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export function CollectionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(featuresRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      );

      gsap.fromTo(toolsRef.current?.children || [],
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.6, 
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: toolsRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(dashboardRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(channelsRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: channelsRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Zap, title: 'Real-Time Notifications', description: 'Get instant alerts every time a transaction is processed through webhooks' },
    { icon: Shield, title: 'Secure & Reliable', description: 'Bank-grade security with end-to-end encryption for all your transactions' },
    { icon: Clock, title: 'Quick Reconciliation', description: 'All transactions viewable in your dashboard with detailed reporting' },
  ];

  const paymentTools = [
    {
      icon: Hash,
      name: 'PUSH USSD',
      description: 'Enable customers to pay directly from their phones using USSD prompts. No internet required.',
      features: ['Works without internet', 'Familiar to all users', 'Instant confirmation'],
      priority: true,
    },
    {
      icon: Link2,
      name: 'Checkout Links',
      description: 'Generate unique payment links for your e-commerce, membership apps, ticketing systems, or any software product.',
      features: ['One link, unlimited payments', 'Real-time transaction alerts', 'Perfect for online stores'],
    },
    {
      icon: Code2,
      name: 'API Integration',
      description: 'Connect your existing systems directly to our payment infrastructure with our RESTful APIs.',
      features: ['RESTful API design', 'Full documentation', 'Sandbox testing'],
    },
    {
      icon: Monitor,
      name: 'Merchant Dashboard',
      description: 'Manage everything from our web-based dashboard. Track transactions and generate reports.',
      features: ['Transaction history', 'Analytics & reports', 'Team access'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-[8vw] min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/hero_main.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/80 via-[#0B0B0D]/85 to-[#0B0B0D]" />
        </div>
        
        <div ref={heroRef} className="relative z-10 max-w-4xl">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6 backdrop-blur-sm">
            Payment Gateway
          </span>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] mb-6">
            Collection <span className="text-[#C9A45C]">API</span>
          </h1>
          <p className="text-xl text-[#A9A6B0] mb-8 max-w-2xl">
            Simplify how your business receives payments. Our collection service connects you to every major payment channel in Tanzania through a single, powerful integration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://merchant.gca-pay.com/auth?mode=register" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold px-8 py-4 rounded-full h-auto text-base">
                Start Collecting
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="https://docs.gca-pay.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-2 border-[#F4F1EC]/30 text-[#F4F1EC] hover:bg-[#F4F1EC]/10 px-8 py-4 rounded-full h-auto text-base bg-transparent">
                View Documentation
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 lg:px-[8vw]">
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-[#141419] border border-[#2a2a30] rounded-2xl hover:border-[#C9A45C]/30 transition-all"
            >
              <div className="w-12 h-12 bg-[#C9A45C]/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#C9A45C]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F4F1EC] mb-2">{feature.title}</h3>
              <p className="text-[#A9A6B0]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Channels - Redesigned */}
      <section className="py-20 px-6 lg:px-[8vw]">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6">
            Payment Channels
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#F4F1EC] mb-4">
            Accept payments from <span className="text-[#C9A45C]">anywhere</span>
          </h2>
          <p className="text-lg text-[#A9A6B0] max-w-2xl mx-auto">
            One integration connects you to all major payment providers in Tanzania.
          </p>
        </div>

        <div ref={channelsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mobile Money - Active */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A45C]/20 to-[#A8843D]/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative bg-gradient-to-br from-[#1a1a20] to-[#141419] border-2 border-[#C9A45C]/40 rounded-3xl p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A45C] to-[#A8843D] flex items-center justify-center shadow-lg shadow-[#C9A45C]/20">
                  <Smartphone className="w-8 h-8 text-[#0B0B0D]" />
                </div>
                <span className="px-3 py-1 bg-[#C9A45C]/20 border border-[#C9A45C]/40 rounded-full text-xs font-semibold text-[#C9A45C] uppercase tracking-wider">
                  Active
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-[#F4F1EC] mb-3">Mobile Money</h3>
              <p className="text-[#A9A6B0] mb-6">Accept payments from all major mobile money providers in Tanzania instantly.</p>

              <div className="pt-6 border-t border-[#2a2a30]">
                <div className="flex items-center gap-2 text-[#C9A45C]">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Instant settlement available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Transfer - Coming Soon */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A90A4]/10 to-[#2E5A6B]/5 rounded-3xl blur-xl opacity-30" />
            <div className="relative bg-[#141419]/80 border border-[#2a2a30] rounded-3xl p-8 h-full overflow-hidden">
              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 bg-[#0B0B0D]/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#4A90A4]/20 flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-[#4A90A4]" />
                </div>
                <span className="px-4 py-2 bg-[#4A90A4]/20 border border-[#4A90A4]/40 rounded-full text-sm font-semibold text-[#4A90A4] uppercase tracking-wider">
                  Coming Soon
                </span>
                <p className="text-[#A9A6B0] mt-3 text-sm text-center px-6">We're working on bringing bank transfers to you</p>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4A90A4] to-[#2E5A6B] flex items-center justify-center opacity-50">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[#F4F1EC]/50 mb-3">Bank Transfer</h3>
              <p className="text-[#A9A6B0]/50">Direct bank-to-bank transfers from major Tanzanian banks.</p>
            </div>
          </div>

          {/* Card Payments - Coming Soon */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5A6B]/10 to-[#5D3A47]/5 rounded-3xl blur-xl opacity-30" />
            <div className="relative bg-[#141419]/80 border border-[#2a2a30] rounded-3xl p-8 h-full overflow-hidden">
              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 bg-[#0B0B0D]/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#8B5A6B]/20 flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-[#8B5A6B]" />
                </div>
                <span className="px-4 py-2 bg-[#8B5A6B]/20 border border-[#8B5A6B]/40 rounded-full text-sm font-semibold text-[#8B5A6B] uppercase tracking-wider">
                  Coming Soon
                </span>
                <p className="text-[#A9A6B0] mt-3 text-sm text-center px-6">Card payments launching soon</p>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5A6B] to-[#5D3A47] flex items-center justify-center opacity-50">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[#F4F1EC]/50 mb-3">Card Payments</h3>
              <p className="text-[#A9A6B0]/50">Accept Visa, Mastercard, and other major card payments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Tools - Bento Grid Style */}
      <section className="py-20 px-6 lg:px-[8vw]">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6">
            Payment Tools
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#F4F1EC] mb-4">
            Multiple ways to <span className="text-[#C9A45C]">collect</span>
          </h2>
          <p className="text-lg text-[#A9A6B0] max-w-2xl mx-auto">
            Choose the collection method that fits your business.
          </p>
        </div>

        <div ref={toolsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paymentTools.map((tool, index) => (
            <div 
              key={index}
              className={`group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                tool.priority 
                  ? 'bg-gradient-to-br from-[#1a1a20] to-[#141419] border-2 border-[#C9A45C]/40 hover:border-[#C9A45C]/60' 
                  : 'bg-[#141419] border border-[#2a2a30] hover:border-[#C9A45C]/30'
              }`}
            >
              {tool.priority && (
                <span className="absolute -top-3 left-4 px-3 py-1 bg-[#C9A45C] text-[#0B0B0D] text-xs font-semibold rounded-full">
                  Recommended
                </span>
              )}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br rounded-bl-full transition-opacity ${
                tool.priority 
                  ? 'from-[#C9A45C]/10 to-transparent opacity-100' 
                  : 'from-[#C9A45C]/5 to-transparent opacity-0 group-hover:opacity-100'
              }`} />
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                tool.priority 
                  ? 'bg-gradient-to-br from-[#C9A45C] to-[#A8843D] shadow-lg shadow-[#C9A45C]/20' 
                  : 'bg-gradient-to-br from-[#C9A45C]/20 to-[#C9A45C]/5'
              }`}>
                <tool.icon className={`w-6 h-6 ${tool.priority ? 'text-[#0B0B0D]' : 'text-[#C9A45C]'}`} />
              </div>
              
              <h3 className="text-lg font-bold text-[#F4F1EC] mb-2">{tool.name}</h3>
              <p className="text-sm text-[#A9A6B0] mb-4 leading-relaxed">{tool.description}</p>
              
              <div className="space-y-2">
                {tool.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                    <span className="text-xs text-[#A9A6B0]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-6 lg:px-[8vw]">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6">
            Dashboard
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#F4F1EC] mb-4">
            Everything in <span className="text-[#C9A45C]">one place</span>
          </h2>
          <p className="text-lg text-[#A9A6B0] max-w-2xl mx-auto">
            Track every transaction, generate reports, and manage your collections from a single, intuitive dashboard.
          </p>
        </div>

        <div ref={dashboardRef} className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A45C]/20 to-transparent rounded-3xl blur-3xl" />
          <div className="relative bg-[#141419] border border-[#2a2a30] rounded-3xl p-4 shadow-2xl">
            <img 
              src="/collections.webp" 
              alt="GCA Pay Collections Dashboard" 
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-[8vw]">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#C9A45C] to-[#A8843D] rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-[#0B0B0D] mb-4">
            Ready to simplify your payment collection?
          </h2>
          <p className="text-[#0B0B0D]/70 mb-8 max-w-xl mx-auto">
            Join businesses across Tanzania who trust GCA Pay for their payment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://merchant.gca-pay.com/auth?mode=register" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#0B0B0D] hover:bg-[#1a1a20] text-white font-semibold px-8 py-4 rounded-full h-auto">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <Button variant="outline" className="border-2 border-[#0B0B0D] text-[#0B0B0D] hover:bg-[#0B0B0D] hover:text-white px-8 py-4 rounded-full h-auto bg-transparent">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CollectionPage;
