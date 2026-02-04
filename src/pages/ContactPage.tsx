import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, ChevronDown, MessageSquare, Clock, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/sections/Navigation';
import { Footer } from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(infoRef.current?.children || [],
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(faqRef.current?.children || [],
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: 'How do I get started with GCA Pay?',
      answer: 'Getting started is simple. Create an account at merchant.gca-pay.com, complete the verification process, and you\'ll receive your API keys. Our documentation at docs.gca-pay.com will guide you through the integration process.'
    },
    {
      question: 'What payment methods do you support?',
      answer: 'We currently support all major mobile money providers in Tanzania including M-Pesa, Tigo Pesa, Airtel Money, and Halotel. Bank transfers and card payments are coming soon.'
    },
    {
      question: 'How long does settlement take?',
      answer: 'Settlement times vary by payment method. Mobile money collections are typically settled within 24 hours. We\'re working on instant settlement options for eligible merchants.'
    },
    {
      question: 'What are your transaction fees?',
      answer: 'Our fees are competitive and transparent. Contact our sales team for detailed pricing based on your expected transaction volume and business type.'
    },
    {
      question: 'Do you provide a sandbox environment for testing?',
      answer: 'Yes! We provide a full sandbox environment where you can test all API endpoints without processing real transactions. Access it through your merchant dashboard.'
    },
    {
      question: 'How do I contact support for technical issues?',
      answer: 'For technical support, email us at support@gca-pay.com or reach out via WhatsApp at +255 673 920 232. Our team typically responds within 2 hours during business hours.'
    },
    {
      question: 'Is there a minimum transaction amount?',
      answer: 'The minimum transaction amount is TZS 1,000 for collections and TZS 500 for disbursements. There\'s no maximum limit, but large transactions may require additional verification.'
    },
    {
      question: 'How secure is GCA Pay?',
      answer: 'Security is our top priority. We use bank-grade encryption, secure API authentication with signatures, and follow industry best practices for data protection.'
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Kinondoni Street', 'Dar es Salaam, Tanzania'],
      color: 'from-[#C9A45C] to-[#A8843D]'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+255 673 920 232', 'Mon-Fri, 9am-6pm EAT'],
      color: 'from-[#4A90A4] to-[#2E5A6B]'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@gca-pay.com', 'support@gca-pay.com'],
      color: 'from-[#7B68A4] to-[#4A3D6B]'
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-[8vw] min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/contact.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/80 via-[#0B0B0D]/85 to-[#0B0B0D]" />
        </div>
        
        <div ref={heroRef} className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6 backdrop-blur-sm">
            Get in Touch
          </span>
          <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-tight tracking-[-0.02em] text-[#F4F1EC] mb-6">
            We'd love to <span className="text-[#C9A45C]">hear from you</span>
          </h1>
          <p className="text-xl text-[#A9A6B0]">
            Have questions about our APIs? Want to discuss a partnership? Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-6 lg:px-[8vw]">
        <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="group relative bg-[#141419] border border-[#2a2a30] rounded-2xl p-6 hover:border-[#C9A45C]/30 transition-all text-center"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <info.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#F4F1EC] mb-2">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-[#A9A6B0] text-sm">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 px-6 lg:px-[8vw]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="bg-[#141419] border border-[#2a2a30] rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#C9A45C]/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#C9A45C]" />
              </div>
              <h2 className="text-2xl font-bold text-[#F4F1EC]">Send us a message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#A9A6B0] mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0B0B0D] border border-[#2a2a30] rounded-xl text-[#F4F1EC] placeholder-[#6b6b70] focus:outline-none focus:border-[#C9A45C]/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#A9A6B0] mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0B0B0D] border border-[#2a2a30] rounded-xl text-[#F4F1EC] placeholder-[#6b6b70] focus:outline-none focus:border-[#C9A45C]/50 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#A9A6B0] mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0B0B0D] border border-[#2a2a30] rounded-xl text-[#F4F1EC] placeholder-[#6b6b70] focus:outline-none focus:border-[#C9A45C]/50 transition-colors"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#A9A6B0] mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0B0B0D] border border-[#2a2a30] rounded-xl text-[#F4F1EC] focus:outline-none focus:border-[#C9A45C]/50 transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#A9A6B0] mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#0B0B0D] border border-[#2a2a30] rounded-xl text-[#F4F1EC] placeholder-[#6b6b70] focus:outline-none focus:border-[#C9A45C]/50 transition-colors resize-none"
                  placeholder="Tell us about your project or question..."
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#C9A45C] hover:bg-[#A8843D] text-[#0B0B0D] font-semibold py-4 rounded-xl h-auto"
              >
                Send Message
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            <div className="bg-[#141419] border border-[#2a2a30] rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#4A90A4]/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#4A90A4]" />
                </div>
                <h3 className="text-xl font-bold text-[#F4F1EC]">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#A9A6B0]">Monday - Friday</span>
                  <span className="text-[#F4F1EC]">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9A6B0]">Saturday</span>
                  <span className="text-[#F4F1EC]">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9A6B0]">Sunday</span>
                  <span className="text-[#F4F1EC]">Closed</span>
                </div>
              </div>
              <p className="text-sm text-[#A9A6B0] mt-4 pt-4 border-t border-[#2a2a30]">
                All times are East Africa Time (EAT)
              </p>
            </div>

            <div className="bg-[#141419] border border-[#2a2a30] rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#7B68A4]/20 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#7B68A4]" />
                </div>
                <h3 className="text-xl font-bold text-[#F4F1EC]">For Businesses</h3>
              </div>
              <p className="text-[#A9A6B0] mb-4">
                Looking to integrate GCA Pay into your platform? Our team can help you get started quickly.
              </p>
              <a href="https://merchant.gca-pay.com/auth?mode=login" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#7B68A4] hover:bg-[#5D4A8B] text-white font-semibold py-3 rounded-xl">
                  Open Merchant Dashboard
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-[8vw] bg-gradient-to-b from-transparent to-[#0a0a0c]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-full text-sm text-[#C9A45C] mb-6">
              FAQ
            </span>
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#F4F1EC] mb-4">
              Frequently Asked <span className="text-[#C9A45C]">Questions</span>
            </h2>
            <p className="text-lg text-[#A9A6B0]">
              Find answers to common questions about GCA Pay.
            </p>
          </div>

          <div ref={faqRef} className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#141419] border border-[#2a2a30] rounded-2xl overflow-hidden hover:border-[#C9A45C]/20 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-[#F4F1EC] font-medium pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#C9A45C] flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-[#A9A6B0] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-[8vw]">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#C9A45C] to-[#A8843D] rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-[#0B0B0D] mb-4">
            Ready to get started?
          </h2>
          <p className="text-[#0B0B0D]/70 mb-8 max-w-xl mx-auto">
            Create your merchant account today and start accepting payments in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://merchant.gca-pay.com/auth?mode=register" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#0B0B0D] hover:bg-[#1a1a20] text-white font-semibold px-8 py-4 rounded-full h-auto">
                Create Account
              </Button>
            </a>
            <a href="https://docs.gca-pay.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-2 border-[#0B0B0D] text-[#0B0B0D] hover:bg-[#0B0B0D] hover:text-white px-8 py-4 rounded-full h-auto bg-transparent">
                Read Documentation
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;
