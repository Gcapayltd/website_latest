import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SlideText } from '@/components/SlideText';

// Navigation Component
export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePaymentDropdownOpen, setMobilePaymentDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 100) {
          navRef.current.classList.add('bg-[#0B0B0D]/90', 'backdrop-blur-md');
        } else {
          navRef.current.classList.remove('bg-[#0B0B0D]/90', 'backdrop-blur-md');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobilePaymentDropdownOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setPaymentDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setPaymentDropdownOpen(false);
    }, 150);
  };

  // Nav link component with underline hover effect
  const NavLink = ({ href, to, children, external = false }: { href?: string; to?: string; children: React.ReactNode; external?: boolean }) => {
    const baseClasses = "text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors slide-trigger";
    
    if (external && href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
          <SlideText>{children}</SlideText>
        </a>
      );
    }
    
    if (href) {
      return (
        <a href={href} className={baseClasses}>
          <SlideText>{children}</SlideText>
        </a>
      );
    }
    
    if (to) {
      return (
        <Link to={to} className={baseClasses}>
          <SlideText>{children}</SlideText>
        </Link>
      );
    }
    
    return null;
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300">
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="GCA Pay" className="h-10 w-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {isHomePage ? (
            <NavLink href="#products">Products</NavLink>
          ) : (
            <NavLink to="/#products">Products</NavLink>
          )}
          
          {/* Payment Gateway Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="relative flex items-center gap-1 text-sm text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors group">
              Payment Gateway
              <ChevronDown className={`w-4 h-4 transition-transform ${paymentDropdownOpen ? 'rotate-180' : ''}`} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A45C] group-hover:w-full transition-all duration-300" />
            </button>
            
            <div 
              className={`absolute top-full left-0 pt-2 w-48 transition-all duration-200 ${
                paymentDropdownOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="bg-[#141419] border border-[#2a2a30] rounded-xl shadow-xl overflow-hidden">
                <Link 
                  to="/collection" 
                  className="block px-4 py-3 text-sm text-[#A9A6B0] hover:text-[#F4F1EC] hover:bg-[#1a1a20] transition-colors"
                  onClick={() => setPaymentDropdownOpen(false)}
                >
                  Collection
                </Link>
                <Link 
                  to="/disbursement" 
                  className="block px-4 py-3 text-sm text-[#A9A6B0] hover:text-[#F4F1EC] hover:bg-[#1a1a20] transition-colors"
                  onClick={() => setPaymentDropdownOpen(false)}
                >
                  Disbursement
                </Link>
              </div>
            </div>
          </div>
          
          {isHomePage ? (
            <>
              <NavLink href="#insights">Insights</NavLink>
              <NavLink href="https://docs.gca-pay.com" external>Developers</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/#insights">Insights</NavLink>
              <NavLink href="https://docs.gca-pay.com" external>Developers</NavLink>
            </>
          )}
          <NavLink to="/blog">Blog & Publications</NavLink>
          <NavLink to="/rates">Rates</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="https://merchant.gca-pay.com/auth?mode=login" className="text-sm text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors hidden sm:block slide-trigger">
            <SlideText>Sign in</SlideText>
          </a>
          <a href="https://merchant.gca-pay.com/auth?mode=register" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
            <Button className="bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold text-sm px-5 py-2 rounded-xl slide-trigger">
              <SlideText>Get started</SlideText>
            </Button>
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#F4F1EC] hover:bg-[#F4F1EC]/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0B0B0D]/95 backdrop-blur-lg border-t border-[#2a2a30] transition-all duration-300 ${
          mobileMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {isHomePage ? (
            <a 
              href="#products" 
              className="block py-3 text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors border-b border-[#2a2a30]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </a>
          ) : (
            <Link 
              to="/#products" 
              className="block py-3 text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors border-b border-[#2a2a30]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
          )}
          
          {/* Mobile Payment Gateway Dropdown */}
          <div className="border-b border-[#2a2a30]">
            <button 
              className="flex items-center justify-between w-full py-3 text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors"
              onClick={() => setMobilePaymentDropdownOpen(!mobilePaymentDropdownOpen)}
            >
              Payment Gateway
              <ChevronDown className={`w-4 h-4 transition-transform ${mobilePaymentDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobilePaymentDropdownOpen ? 'max-h-40 pb-3' : 'max-h-0'}`}>
              <Link 
                to="/collection" 
                className="block py-2 pl-4 text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collection
              </Link>
              <Link 
                to="/disbursement" 
                className="block py-2 pl-4 text-sm text-[#A9A6B0] hover:text-[#C9A45C] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Disbursement
              </Link>
            </div>
          </div>
          
          {isHomePage ? (
            <a 
              href="#insights" 
              className="block py-3 text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors border-b border-[#2a2a30]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Insights
            </a>
          ) : (
            <Link 
              to="/#insights" 
              className="block py-3 text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors border-b border-[#2a2a30]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Insights
            </Link>
          )}
          
          <a 
            href="https://docs.gca-pay.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block py-3 text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors border-b border-[#2a2a30]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Developers
          </a>
          
          <Link 
            to="/blog" 
            className="block py-3 text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors border-b border-[#2a2a30]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog & Publications
          </Link>
          
          <Link 
            to="/rates" 
            className="block py-3 text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors border-b border-[#2a2a30]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Rates
          </Link>
          
          <Link 
            to="/contact" 
            className="block py-3 text-[#A9A6B0] hover:text-[#F4F1EC] transition-colors border-b border-[#2a2a30]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          
          {/* Mobile Auth Buttons */}
          <div className="pt-4 space-y-3">
            <a 
              href="https://merchant.gca-pay.com/auth?mode=login" 
              className="block w-full text-center py-3 text-[#F4F1EC] border border-[#2a2a30] rounded-xl hover:bg-[#F4F1EC]/10 transition-colors"
            >
              Sign in
            </a>
            <a 
              href="https://merchant.gca-pay.com/auth?mode=register" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold py-3 rounded-xl">
                Get started
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
