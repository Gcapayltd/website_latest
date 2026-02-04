import { Globe, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Footer
export function Footer() {
  return (
    <footer className="relative w-full py-16 bg-[#0B0B0D] border-t border-[#1a1a20] z-50 overflow-hidden">
      {/* Animated Background Text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none opacity-50">
        <div className="animate-marquee whitespace-nowrap flex">
          <span className="text-[25vw] font-black text-[#131316] tracking-tighter mx-4">GCA PAY</span>
          <span className="text-[25vw] font-black text-[#131316] tracking-tighter mx-4">GCA PAY</span>
          <span className="text-[25vw] font-black text-[#131316] tracking-tighter mx-4">GCA PAY</span>
          <span className="text-[25vw] font-black text-[#131316] tracking-tighter mx-4">GCA PAY</span>
        </div>
      </div>

      <div className="relative z-10 px-6 lg:px-[8vw]">
        {/* Email Subscription */}
        <div className="mb-16 pb-12 border-b border-[#1a1a20]">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#F4F1EC] mb-3">Stay updated</h3>
            <p className="text-[#A9A6B0] mb-6">Get the latest news, updates, and insights delivered to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#141419] border border-[#2a2a30] rounded-xl text-[#F4F1EC] placeholder:text-[#A9A6B0]/50 focus:outline-none focus:border-[#C9A45C]/50 transition-colors"
              />
              <Button className="bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold px-6 py-3 rounded-xl h-auto">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 mb-8 lg:mb-0">
            <div className="mb-4">
              <img src="/logo.png" alt="GCA Pay" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-[#A9A6B0] mb-4">
              Powering payments across Africa. Built for developers, designed for growth.
            </p>
            <div className="flex items-center gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 bg-[#141419] border border-[#2a2a30] rounded-full flex items-center justify-center text-[#A9A6B0] hover:text-[#C9A45C] hover:border-[#C9A45C]/50 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-[#F4F1EC] mb-4">Products</h4>
            <ul className="space-y-3">
              <li><Link to="/collection" className="text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors">Collection API</Link></li>
              <li><Link to="/disbursement" className="text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors">Disbursement API</Link></li>
              <li><Link to="/rates" className="text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors">Exchange Rates</Link></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-sm font-semibold text-[#F4F1EC] mb-4">Developers</h4>
            <ul className="space-y-3">
              <li><a href="https://docs.gca-pay.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors">Documentation</a></li>
              <li><a href="https://merchant.gca-pay.com/auth?mode=register" target="_blank" rel="noopener noreferrer" className="text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors">Get API Keys</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-[#F4F1EC] mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/careers" className="text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#F4F1EC] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A45C] mt-0.5 shrink-0" />
                <span className="text-sm text-[#A9A6B0]">Kinondoni Street, Dar es Salaam, Tanzania</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <a href="tel:+255673920232" className="text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors">+255 673 920 232</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <a href="mailto:info@gca-pay.com" className="text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors">info@gca-pay.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#1a1a20] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#A9A6B0]">
            © 2026 GCA Pay. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-[#A9A6B0]">
            <Link to="/privacy" className="hover:text-[#C9A45C] transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[#C9A45C] transition-colors">Terms</Link>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
