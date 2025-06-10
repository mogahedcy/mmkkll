import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ServiceAreasSection from '@/components/ServiceAreasSection';
import FAQSection from '@/components/FAQSection';
import QuoteSection from '@/components/QuoteSection';
import Footer from '@/components/Footer';
export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
      <section className="relative">
        <h1 className="sr-only">محترفين الديار العالمية - أفضل شركة مظلات وبرجولات في جدة</h1>
        <HeroSection />
      </section>

        {/* Services Overview - What We Offer */}
        <ServicesSection />

        {/* Portfolio - Social Proof */}
        <PortfolioSection />

        {/* Why Choose Us - Trust Building */}
        <WhyChooseUsSection />

        {/* Testimonials - Customer Voice */}
        <TestimonialsSection />

        {/* Service Areas - Local SEO */}
        <ServiceAreasSection />

        {/* FAQ - Address Concerns */}
        <FAQSection />

        {/* Quote Section - Lead Generation */}
        <QuoteSection />
      </main>

      {/* Footer - Complete Information */}
      <Footer />
    </>
  );
}