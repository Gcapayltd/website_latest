import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefreshCw, ArrowRightLeft, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/sections/Navigation';
import { Footer } from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

// All currencies for dropdown
const allCurrencies = [
  { code: 'usd', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  { code: 'eur', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'gbp', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
  { code: 'jpy', name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  { code: 'cad', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
  { code: 'aud', name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
  { code: 'chf', name: 'Swiss Franc', flag: '🇨🇭', symbol: 'CHF' },
  { code: 'tzs', name: 'Tanzanian Shilling', flag: '🇹🇿', symbol: 'TSh' },
  { code: 'kes', name: 'Kenyan Shilling', flag: '🇰🇪', symbol: 'KSh' },
  { code: 'ugx', name: 'Ugandan Shilling', flag: '🇺🇬', symbol: 'USh' },
  { code: 'rwf', name: 'Rwandan Franc', flag: '🇷🇼', symbol: 'RWF' },
  { code: 'zar', name: 'South African Rand', flag: '🇿🇦', symbol: 'R' },
  { code: 'ngn', name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
  { code: 'ghs', name: 'Ghanaian Cedi', flag: '🇬🇭', symbol: 'GH₵' }
];

// Popular rates to display
const popularRates = ['tzs', 'kes', 'ugx', 'eur', 'gbp', 'zar'];

export function ExchangeRatesPage() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('tzs');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const converterRef = useRef<HTMLDivElement>(null);
  const ratesRef = useRef<HTMLDivElement>(null);

  // Fetch exchange rates
  const fetchRates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      try {
        response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
        );
      } catch {
        response = await fetch(
          `https://latest.currency-api.pages.dev/v1/currencies/usd.json`
        );
      }
      
      if (!response.ok) throw new Error('Failed to fetch rates');
      
      const data = await response.json();
      setRates(data.usd);
      setLastUpdate(new Date().toLocaleString());
    } catch (err) {
      setError('Unable to fetch current rates. Please try again later.');
      console.error('Exchange rate fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Convert currency
  const convertCurrency = () => {
    const numAmount = parseFloat(amount);
    if (rates[fromCurrency] && rates[toCurrency] && numAmount) {
      const usdAmount = numAmount / rates[fromCurrency];
      const converted = usdAmount * rates[toCurrency];
      setConvertedAmount(converted);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, rates]);

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(converterRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(ratesRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-[8vw] min-h-[50vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/rate.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/70 via-[#0B0B0D]/80 to-[#0B0B0D]" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A45C]/10 rounded-full blur-3xl" />
        
        <div ref={heroRef} className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6 backdrop-blur-sm">
            Live Rates
          </span>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] mb-4">
            Exchange <span className="text-[#C9A45C]">Rates</span>
          </h1>
          <p className="text-lg text-[#A9A6B0] mb-6">
            Real-time currency exchange rates across Africa and beyond. Updated every 10 minutes.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={fetchRates}
              className="bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold px-6 py-3 rounded-xl h-auto"
            >
              <RefreshCw className={`mr-2 w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Rates
            </Button>
            {lastUpdate && (
              <span className="text-sm text-[#A9A6B0]">
                Updated: {lastUpdate}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Currency Converter */}
      <section className="py-12 px-6 lg:px-[8vw]">
        <div 
          ref={converterRef}
          className="max-w-4xl mx-auto bg-[#141419] border border-[#2a2a30] rounded-3xl p-8 lg:p-10"
        >
          <h2 className="text-2xl font-bold text-[#F4F1EC] mb-8 text-center flex items-center justify-center gap-2">
            <ArrowRightLeft className="w-6 h-6 text-[#C9A45C]" />
            Currency Converter
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-end">
            {/* Amount */}
            <div className="lg:col-span-2">
              <label className="block text-sm text-[#A9A6B0] mb-2 font-medium">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0B0D] border border-[#2a2a30] rounded-xl text-[#F4F1EC] placeholder:text-[#A9A6B0]/50 focus:outline-none focus:border-[#C9A45C]/50 transition-colors"
                placeholder="Enter amount"
              />
            </div>

            {/* From Currency */}
            <div className="lg:col-span-2">
              <label className="block text-sm text-[#A9A6B0] mb-2 font-medium">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0B0D] border border-[#2a2a30] rounded-xl text-[#F4F1EC] focus:outline-none focus:border-[#C9A45C]/50 transition-colors"
              >
                {allCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code} className="bg-[#0B0B0D]">
                    {currency.flag} {currency.code.toUpperCase()} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button 
                onClick={swapCurrencies}
                variant="outline" 
                className="border-[#2a2a30] text-[#A9A6B0] hover:text-[#C9A45C] hover:border-[#C9A45C]/50 rounded-full w-12 h-12 p-0"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </Button>
            </div>

            {/* To Currency */}
            <div className="lg:col-span-2">
              <label className="block text-sm text-[#A9A6B0] mb-2 font-medium">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0B0D] border border-[#2a2a30] rounded-xl text-[#F4F1EC] focus:outline-none focus:border-[#C9A45C]/50 transition-colors"
              >
                {allCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code} className="bg-[#0B0B0D]">
                    {currency.flag} {currency.code.toUpperCase()} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          <div className="mt-8 p-6 bg-gradient-to-r from-[#C9A45C]/10 to-[#A8843D]/10 border border-[#C9A45C]/30 rounded-2xl">
            <div className="text-center">
              {loading ? (
                <div className="h-8 bg-[#2a2a30] rounded animate-pulse max-w-xs mx-auto" />
              ) : convertedAmount ? (
                <>
                  <div className="text-3xl font-bold text-[#C9A45C]">
                    {parseFloat(convertedAmount.toString()).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} {toCurrency.toUpperCase()}
                  </div>
                  <div className="text-sm text-[#A9A6B0] mt-2">
                    1 {fromCurrency.toUpperCase()} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency.toUpperCase()}
                  </div>
                </>
              ) : (
                <span className="text-[#A9A6B0]">Enter an amount to convert</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Rates */}
      <section className="py-16 px-6 lg:px-[8vw]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#F4F1EC] mb-8 text-center">
            Popular Rates <span className="text-[#C9A45C]">(USD Base)</span>
          </h2>

          {error ? (
            <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <div ref={ratesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularRates.map((code) => {
                const currency = allCurrencies.find(c => c.code === code);
                const rate = rates[code];
                
                return (
                  <div 
                    key={code}
                    className="p-6 bg-[#141419] border border-[#2a2a30] rounded-2xl hover:border-[#C9A45C]/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{currency?.flag}</span>
                        <div>
                          <div className="font-semibold text-[#F4F1EC]">{code.toUpperCase()}</div>
                          <div className="text-sm text-[#A9A6B0]">{currency?.name}</div>
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="text-2xl font-bold text-[#C9A45C]">
                      {loading ? (
                        <div className="h-8 bg-[#2a2a30] rounded animate-pulse w-32" />
                      ) : (
                        rate?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
                      )}
                    </div>
                    <div className="text-sm text-[#A9A6B0] mt-1">
                      1 USD = {rate?.toLocaleString()} {code.toUpperCase()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-[8vw]">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#C9A45C] to-[#A8843D] rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-[#0B0B0D] mb-4">
            Ready to integrate our payment API?
          </h2>
          <p className="text-[#0B0B0D]/70 mb-8 max-w-xl mx-auto">
            Process local and international payments with just a few lines of code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#0B0B0D] hover:bg-[#1a1a20] text-white font-semibold px-8 py-4 rounded-full h-auto">
              Explore API Docs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="border-2 border-[#0B0B0D] text-[#0B0B0D] hover:bg-[#0B0B0D] hover:text-white px-8 py-4 rounded-full h-auto bg-transparent">
              Get API Key
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ExchangeRatesPage;
