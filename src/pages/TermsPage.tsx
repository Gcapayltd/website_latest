import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Navigation } from '@/components/sections/Navigation';
import { Footer } from '@/components/sections/Footer';

export function TermsPage() {
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
            Terms of Service
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
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                By accessing or using GCA Pay's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users of our platform, including merchants, businesses, and API integrators.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">2. Description of Services</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>GCA Pay provides payment processing services including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mobile money collection and disbursement</li>
                  <li>Payment gateway API integration</li>
                  <li>Merchant dashboard and reporting tools</li>
                  <li>Checkout links and payment pages</li>
                  <li>USSD payment processing</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">3. Account Registration</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>To use our services, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Register for an account with accurate and complete information</li>
                  <li>Provide valid business registration documents (for business accounts)</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be at least 18 years old or the legal age in your jurisdiction</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">4. Acceptable Use</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>You agree not to use our services for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Illegal activities or transactions</li>
                  <li>Money laundering or terrorist financing</li>
                  <li>Fraudulent or deceptive practices</li>
                  <li>Unauthorized access to our systems</li>
                  <li>Transactions involving prohibited goods or services</li>
                  <li>Any activity that violates applicable laws or regulations</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">5. Fees and Payments</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>By using our services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Pay all applicable transaction fees as outlined in our pricing</li>
                  <li>Authorize us to deduct fees from your account balance</li>
                  <li>Maintain sufficient balance for disbursement operations</li>
                  <li>Accept that fees may be updated with prior notice</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">6. Transaction Processing</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>Regarding transactions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We process transactions on a best-effort basis</li>
                  <li>Transaction completion depends on third-party payment providers</li>
                  <li>We are not liable for delays caused by external systems</li>
                  <li>Failed transactions will be reversed according to our refund policy</li>
                  <li>Settlement times may vary based on payment channel</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">7. API Usage</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>For API users:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>API keys must be kept confidential and secure</li>
                  <li>You are responsible for all activity using your API credentials</li>
                  <li>Rate limits and usage quotas must be respected</li>
                  <li>We may modify API endpoints with reasonable notice</li>
                  <li>Sandbox environments are provided for testing purposes</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">8. Limitation of Liability</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                To the maximum extent permitted by law, GCA Pay shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">9. Indemnification</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                You agree to indemnify and hold harmless GCA Pay, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising from your use of our services or violation of these terms.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">10. Termination</h2>
              <div className="text-[#A9A6B0] leading-relaxed space-y-4">
                <p>We may suspend or terminate your account if:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You violate these terms or our acceptable use policy</li>
                  <li>We detect fraudulent or suspicious activity</li>
                  <li>Required by law or regulatory authorities</li>
                  <li>Your account remains inactive for an extended period</li>
                </ul>
                <p>You may close your account at any time by contacting our support team.</p>
              </div>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">11. Governing Law</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the United Republic of Tanzania. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Tanzania.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">12. Changes to Terms</h2>
              <p className="text-[#A9A6B0] leading-relaxed">
                We reserve the right to modify these terms at any time. We will provide notice of significant changes via email or through our platform. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#F4F1EC] mb-4">13. Contact Information</h2>
              <div className="text-[#A9A6B0] leading-relaxed">
                <p>For questions about these Terms of Service, please contact us at:</p>
                <div className="mt-4 space-y-2">
                  <p><strong className="text-[#F4F1EC]">Email:</strong> legal@gca-pay.com</p>
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

export default TermsPage;
