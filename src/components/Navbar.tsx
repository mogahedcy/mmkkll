
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Home,
  User,
  FileText,
  Star,
  Award,
  Search,
  Wrench,
  ChevronDown,
  Menu,
  X,
  Shield,
  Clock,
  CheckCircle,
  Tent,
  Car,
  Hammer,
  Grid,
  Layers,
  Trees,
  Building2,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Star, text: '+15 سنة خبرة', color: 'text-amber-600' },
    { icon: Shield, text: 'ضمان 10 سنوات', color: 'text-green-600' },
    { icon: Clock, text: 'خدمة 24/7', color: 'text-blue-600' },
    { icon: CheckCircle, text: 'جودة مضمونة', color: 'text-emerald-600' }
  ];

  const mainNavItems = [
    { label: 'الرئيسية', href: '/', icon: Home },
    { label: 'من نحن', href: '/about', icon: User },
    { label: 'معرض الأعمال', href: '/portfolio', icon: Building2 },
    { label: 'المدونة', href: '/articles', icon: FileText },
    { label: 'اتصل بنا', href: '/contact', icon: Phone }
  ];

  const servicesItems = [
    {
      label: 'مظلات السيارات',
      href: '/services/mazallat',
      icon: Car,
      description: 'مظلات متطورة لحماية المركبات',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'الخيام والبيوت الشعر',
      href: '/services/khayyam',
      icon: Tent,
      description: 'خيام تراثية وعصرية مميزة',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: 'بيوت الشعر',
      href: '/services/byoot-shaar',
      icon: Home,
      description: 'بيوت شعر أصيلة وفاخرة',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'السواتر',
      href: '/services/sawater',
      icon: Shield,
      description: 'سواتر للخصوصية والحماية',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      label: 'تنسيق الحدائق',
      href: '/services/landscaping',
      icon: Trees,
      description: 'تصميم وتنسيق المساحات الخضراء',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'برجولات',
      href: '/services/pergolas',
      icon: Grid,
      description: 'برجولات خشبية وحديدية أنيقة',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'التشطيبات والتجديد',
      href: '/services/renovation',
      icon: Hammer,
      description: 'خدمات التجديد والتشطيب',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      label: 'الساندوتش بانل',
      href: '/services/sandwich-panel',
      icon: Layers,
      description: 'ألواح عازلة متطورة',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <>
      {/* Top Bar الشريط العلوي */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-accent text-white py-2.5 hidden lg:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-4 h-4" />
                <Link href="tel:+966553719009" className="hover:text-white/80 transition-colors font-medium">
                  +966 553 719 009
                </Link>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-4 h-4" />
                <Link href="mailto:info@aldeyarksa.tech" className="hover:text-white/80 transition-colors">
                  info@aldeyarksa.tech
                </Link>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">جدة، المملكة العربية السعودية</span>
              </div>
            </div>

            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="flex items-center space-x-4 space-x-reverse">
                {features.slice(0, 3).map((feature) => (
                  <div key={feature.text} className="flex items-center space-x-1.5 space-x-reverse">
                    <feature.icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Link
                  href="https://www.instagram.com/aldiyarglobal"
                  className="hover:text-white/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link
                  href="https://wa.me/966553719009"
                  className="hover:text-white/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation الشريط الرئيسي */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100'
          : 'bg-white shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">

            {/* Logo - محسن ومطور */}
            <Link href="/" className="flex items-center space-x-3 space-x-reverse group flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-all duration-300">
                  <Award className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-md">
                  <Sparkles className="w-2 h-2 lg:w-2.5 lg:h-2.5 text-white fill-current" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  محترفين الديار العالمية
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground hidden sm:block">
                  خبرة +15 عاماً في جدة والمملكة
                </div>
              </div>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2 space-x-reverse lg:hidden">
              <Link
                href="https://wa.me/966553719009"
                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </Link>
              <Link
                href="tel:+966553719009"
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                aria-label="اتصال"
              >
                <Phone className="w-4 h-4" />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="القائمة"
                className="w-10 h-10 p-0"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
              {mainNavItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium flex items-center space-x-2 space-x-reverse group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium flex items-center space-x-2 space-x-reverse group">
                  <Wrench className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>خدماتنا</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu */}
                {isServicesOpen && (
                  <div className="absolute top-full right-0 w-[900px] bg-white border border-gray-100 rounded-2xl shadow-2xl p-8 transform translate-y-2 z-50">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-primary mb-2">خدماتنا المتخصصة</h3>
                      <p className="text-gray-600">نقدم أفضل الحلول في مجال المظلات والسواتر والتصميم مع ضمان الجودة</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {servicesItems.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-start space-x-4 space-x-reverse p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200"
                        >
                          <div className={`p-3 rounded-lg ${service.bgColor} group-hover:scale-105 transition-transform`}>
                            <service.icon className={`w-6 h-6 ${service.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                              {service.label}
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        {features.map((feature) => (
                          <div key={feature.text} className="flex items-center space-x-2 space-x-reverse">
                            <feature.icon className={`w-4 h-4 ${feature.color}`} />
                            <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/quote"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        احصل على عرض سعر
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {mainNavItems.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium flex items-center space-x-2 space-x-reverse group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 space-x-reverse">
              <Button asChild variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-white">
                <Link href="/search" className="flex items-center space-x-2 space-x-reverse">
                  <Search className="w-4 h-4" />
                  <span>البحث</span>
                </Link>
              </Button>

              <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 px-6">
                <Link href="tel:+966553719009" className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-4 h-4" />
                  <span>اتصل الآن</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              
              {/* Contact Info */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Phone className="w-4 h-4 text-primary" />
                    <Link href="tel:+966553719009" className="text-sm font-medium">
                      +966 553 719 009
                    </Link>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Link
                      href="https://wa.me/966553719009"
                      className="p-2 rounded-full bg-green-100 text-green-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/aldiyarglobal"
                      className="p-2 rounded-full bg-pink-100 text-pink-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Mobile Services */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm font-semibold text-gray-600 border-b border-gray-100">
                  خدماتنا
                </div>
                {servicesItems.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <service.icon className={`w-5 h-5 ${service.color}`} />
                    <div className="flex-1">
                      <div className="font-medium">{service.label}</div>
                      <div className="text-xs text-gray-600 hidden sm:block">{service.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 space-y-3">
                <Button asChild className="w-full bg-gradient-to-r from-primary to-accent h-12">
                  <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                    احصل على عرض سعر مجاني
                  </Link>
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" className="border-primary/20 text-primary h-10">
                    <Link href="/search" onClick={() => setIsMenuOpen(false)}>
                      البحث
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-10">
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                      اتصل بنا
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
