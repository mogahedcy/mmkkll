import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, ArrowLeft, Star, MapPin, Clock } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Star className="w-4 h-4 fill-current" />
            <span>محترفين الديار العالمية - متخصصون في جميع الخدمات المعمارية والتصميمية بجدة منذ 15 عاماً</span>
            <Star className="w-4 h-4 fill-current" />
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              محترفين الديار العالمية
              <span className="block text-3xl md:text-5xl mt-2 text-primary">
                خبرة تفوق 15 عاماً في جدة
              </span>
            </h2>

          {/* Subheading */}
          <p className="text-xl mb-8 text-muted-foreground leading-relaxed max-w-2xl">
              🏆 الشركة الرائدة في جدة لتركيب المظلات والبرجولات والسواتر وتنسيق الحدائق
              ✅ ضمان 10 سنوات ✅ تركيب احترافي ✅ أسعار منافسة ✅ خدمة 24/7
            </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2 space-x-reverse">
              <MapPin className="w-4 h-4 text-accent" />
              <span>8 خدمات متخصصة في جدة وضواحيها</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Clock className="w-4 h-4 text-accent" />
              <span>ضمان 10 سنوات على جميع الخدمات</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Star className="w-4 h-4 text-accent" />
              <span>أكثر من 5000 مشروع متنوع ناجح</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link href="https://wa.me/+966553719009" className="flex items-center space-x-3 space-x-reverse">
                <MessageCircle className="w-5 h-5" />
                <span>استشارة مجانية عبر واتساب</span>
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              <Link href="tel:+966553719009" className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5" />
                <span>اتصال مباشر: 966553719009+</span>
              </Link>
            </Button>
          </div>

          {/* Quick Access Links */}
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/services/mazallat" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
              <span>مظلات سيارات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/services/pergolas" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
              <span>برجولات حدائق</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/services/sawater" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
              <span>سواتر خصوصية</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/services/sandwich-panel" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
              <span>ساندوتش بانل</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/services/renovation" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
              <span>ترميم ملحقات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/services/landscaping" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
              <span>تنسيق حدائق</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/services/byoot-shaar" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
              <span>بيوت شعر</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/services/khayyam" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
              <span>خيام ملكية</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-16 h-16 bg-accent/10 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
    </section>
  );
}