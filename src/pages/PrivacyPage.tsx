import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Navigation } from '@/components/sections/Navigation';
import { Footer } from '@/components/sections/Footer';

export function PrivacyPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-[8vw] min-h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/legal.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/80 via-[#0B0B0D]/85 to-[#0B0B0D]" />
        </div>
        
        <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6 backdrop-blur-sm">
            Legal
          </span>
          <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-[#A9A6B0]">
            Last updated: February 4, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 lg:px-[8vw]">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <div className="space-y-12">
            
            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">1. Introduction</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                GCA Pay ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our payment services and visit our website.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">2. Information We Collect</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>We collect information you provide directly to us, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal identification information (name, email address, phone number)</li>
                  <li>Business information (company name, registration details)</li>
                  <li>Financial information (bank account details, mobile money numbers)</li>
                  <li>Transaction data (payment history, amounts, recipients)</li>
                  <li>Device and usage information (IP address, browser type, access times)</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">3. How We Use Your Information</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and facilitate payment transactions</li>
                  <li>Verify your identity and prevent fraud</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send transaction notifications and service updates</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Improve our services and develop new features</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">4. Information Sharing</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment partners and financial institutions to process transactions</li>
                  <li>Mobile network operators for mobile money services</li>
                  <li>Regulatory authorities as required by law</li>
                  <li>Service providers who assist in our operations</li>
                </ul>
                <p>We do not sell your personal information to third parties.</p>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">5. Data Security</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                We implement industry-standard security measures to protect your information, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">6. Data Retention</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                We retain your information for as long as necessary to provide our services and comply with legal obligations. Transaction records are kept for a minimum of 7 years as required by financial regulations.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">7. Your Rights</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Lodge a complaint with regulatory authorities</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">8. Cookies and Tracking</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services. You can manage cookie preferences through your browser settings.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">9. Changes to This Policy</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">10. Contact Us</h2>
              <div className="text-[#A9A6B0] leading-relaxed">
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <div className="mt-4 space-y-2">
                  <p><strong className="text-[#F4F1EC]">Email:</strong> privacy@gca-pay.com</p>
                  <p><strong className="text-[#F4F1EC]">Address:</strong> Kinondoni Street, Dar es Salaam, Tanzania</p>
                  <p><strong className="text-[#F4F1EC]">Phone:</strong> +255 673 920 232</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PrivacyPage;
