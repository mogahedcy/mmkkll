'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Car, TreePine, Shield, Home, Wrench, Flower, MapPin, Calendar, Eye } from 'lucide-react';

// بيانات المشاريع المتنوعة من جميع الخدمات - بدون تفاصيل دقيقة للمصداقية
const projects = [
  // مظلات سيارات
  {
    id: 1,
    title: 'مظلة بتصميم إسلامي راقي',
    category: 'مظلات سيارات',
    service: 'mazallat',
    location: 'جدة',
    year: '2024',
    description: 'مظلة سيارات بتصميم إسلامي مميز مع زخارف هندسية جميلة وهيكل حديدي قوي',
    image: '/uploads/mazallat-1.jpg',
    icon: Car,
    features: ['زخارف إسلامية راقية', 'هيكل حديدي متين', 'تصميم معماري فريد']
  },
  {
    id: 2,
    title: 'مظلات مواقف واسعة',
    category: 'مظلات سيارات',
    service: 'mazallat',
    location: 'جدة',
    year: '2024',
    description: 'مظلات مواقف واسعة بتصميم بسيط وأنيق بمساحات كبيرة',
    image: '/uploads/mazallat-2.jpg',
    icon: Car,
    features: ['مساحات واسعة', 'تصميم عملي', 'حماية شاملة للمركبات']
  },

  // برجولات حدائق
  {
    id: 3,
    title: 'برجولة حديثة مع إضاءة مميزة',
    category: 'برجولات حدائق',
    service: 'pergolas',
    location: 'جدة',
    year: '2024',
    description: 'برجولة حديثة بتصميم عصري مع إضاءة LED وأرضية خشبية فاخرة',
    image: '/uploads/pergola-1.jpg',
    icon: TreePine,
    features: ['إضاءة LED مدمجة', 'أرضية خشبية فاخرة', 'تصميم حديث وأنيق']
  },
  {
    id: 4,
    title: 'برجولة مضاءة للجلسات المسائية',
    category: 'برجولات حدائق',
    service: 'pergolas',
    location: 'جدة',
    year: '2024',
    description: 'برجولة راقية مع إضاءة شبكية وأثاث مريح للجلسات المسائية',
    image: '/uploads/pergola-2.jpg',
    icon: TreePine,
    features: ['إضاءة شبكية مميزة', 'أثاث راقي مدمج', 'مناسبة للاستخدام المسائي']
  },

  // ساندوتش بانل
  {
    id: 5,
    title: 'ساندوتش بانل صناعي',
    category: 'ساندوتش بانل',
    service: 'sandwich-panel',
    location: 'جدة',
    year: '2024',
    description: 'تركيب ساندوتش بانل بمواصفات عالية ومعايير جودة متقدمة',
    image: '/uploads/sandwich-panel-1.jpg',
    icon: Home,
    features: ['عزل حراري متقدم', 'مقاوم للعوامل الجوية', 'تركيب احترافي']
  },
  {
    id: 6,
    title: 'ساندوتش بانل متخصص',
    category: 'ساندوتش بانل',
    service: 'sandwich-panel',
    location: 'جدة',
    year: '2023',
    description: 'مشروع ساندوتش بانل متخصص بمواصفات تقنية عالية',
    image: '/uploads/sandwich-panel-2.jpg',
    icon: Home,
    features: ['مواصفات تقنية عالية', 'مقاوم للحريق', 'جودة متميزة']
  },

  // ترميم ملحقات
  {
    id: 7,
    title: 'ترميم شامل ومتكامل',
    category: 'ترميم ملحقات',
    service: 'renovation',
    location: 'جدة',
    year: '2024',
    description: 'مشروع ترميم شامل مع تحديث المرافق والتشطيبات',
    image: '/uploads/renovation-1.jpg',
    icon: Wrench,
    features: ['ترميم شامل', 'تحديث المرافق', 'تشطيبات عالية الجودة']
  },
  {
    id: 8,
    title: 'تجديد وترميم احترافي',
    category: 'ترميم ملحقات',
    service: 'renovation',
    location: 'جدة',
    year: '2024',
    description: 'تجديد وترميم مع إضافة تحسينات حديثة',
    image: '/uploads/renovation-2.jpg',
    icon: Wrench,
    features: ['تجديد متكامل', 'تحسينات حديثة', 'جودة في التنفيذ']
  },

  // سواتر خصوصية
  {
    id: 9,
    title: 'سواتر عصرية للخصوصية',
    category: 'سواتر خصوصية',
    service: 'sawater',
    location: 'جدة',
    year: '2024',
    description: 'تركيب سواتر عالية الجودة بتصميم عصري لضمان الخصوصية',
    image: '/uploads/sawater-1.webp',
    icon: Shield,
    features: ['خصوصية تامة', 'تصميم عصري', 'مواد عالية الجودة']
  },
  {
    id: 10,
    title: 'سواتر للخصوصية',
    category: 'سواتر خصوصية',
    service: 'sawater',
    location: 'جدة',
    year: '2024',
    description: 'سواتر عملية لضمان الخصوصية مع لمسة جمالية مميزة',
    image: '/uploads/sawater-2.webp',
    icon: Shield,
    features: ['خصوصية تامة', 'تصميم عملي', 'مواد عالية الجودة']
  },

  // تنسيق حدائق
  {
    id: 11,
    title: 'تنسيق حديقة متميزة',
    category: 'تنسيق حدائق',
    service: 'landscaping',
    location: 'جدة',
    year: '2023',
    description: 'تصميم وتنسيق حديقة متميزة بأسلوب عصري ونباتات مناسبة للمناخ',
    image: '/uploads/landscaping-1.webp',
    icon: Flower,
    features: ['تصميم متميز', 'نباتات مناسبة للمناخ', 'أنظمة ري حديثة']
  },

  // بيوت شعر تراثية
  {
    id: 12,
    title: 'بيت شعر أصيل',
    category: 'بيوت شعر تراثية',
    service: 'byoot-shaar',
    location: 'جدة',
    year: '2024',
    description: 'بيت شعر تراثي أصيل بصناعة يدوية متقنة ومواد طبيعية عالية الجودة',
    image: '/uploads/byoot-shaar-1.webp',
    icon: Home,
    features: ['صناعة يدوية متقنة', 'مواد طبيعية', 'تراث أصيل']
  },

  // خيام ملكية
  {
    id: 13,
    title: 'خيمة ملكية فاخرة',
    category: 'خيام ملكية',
    service: 'khayyam',
    location: 'جدة',
    year: '2024',
    description: 'خيمة ملكية فاخرة بتصميم راقي ومواصفات عالية للمناسبات',
    image: '/uploads/khayyam-1.webp',
    icon: Home,
    features: ['تصميم ملكي راقي', 'مواصفات عالية', 'مناسبة للمناسبات']
  }
];

const categories = [
  'الكل',
  'مظلات سيارات',
  'برجولات حدائق',
  'ساندوتش بانل',
  'ترميم ملحقات',
  'سواتر خصوصية',
  'تنسيق حدائق',
  'بيوت شعر تراثية',
  'خيام ملكية'
];

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const filteredProjects = selectedCategory === 'الكل'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            معرض أعمال محترفين الديار في جدة
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            استكشف مجموعة متنوعة من مشاريعنا الناجحة في جدة والمناطق المحيطة. نفخر بتقديم خدمات شاملة ومتخصصة
            في المظلات، البرجولات، الساندوتش بانل، الترميم، السواتر، تنسيق الحدائق، بيوت الشعر التراثية،
            والخيام الملكية بأعلى معايير الجودة والحرفية
          </p>

          {/* Enhanced Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-accent mb-2">+5000</div>
              <div className="text-sm text-muted-foreground font-medium">مشروع ناجح</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-accent mb-2">8</div>
              <div className="text-sm text-muted-foreground font-medium">خدمات متخصصة</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-accent mb-2">15</div>
              <div className="text-sm text-muted-foreground font-medium">عام خبرة</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-accent mb-2">جدة</div>
              <div className="text-sm text-muted-foreground font-medium">والمناطق المحيطة</div>
            </div>
          </div>
        </div>

        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'hover:bg-accent/10 hover:border-accent'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback for missing images
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600&h=400&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {project.category}
                  </div>

                  {/* View Details Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Button size="lg" variant="secondary" className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                      <Eye className="w-5 h-5 ml-2" />
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>

                {/* Enhanced Project Content */}
                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-accent/10 p-3 rounded-xl">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary text-lg leading-tight mb-1">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center space-x-6 space-x-reverse text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="font-medium">{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="font-medium">{project.year}</span>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Enhanced Project Features */}
                  <div className="space-y-3 mb-6">
                    {project.features.map((feature, index) => (
                      <div key={`${project.id}-feature-${index}`} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full ml-3 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Project CTA */}
                  <Button asChild variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-500 py-3">
                    <Link href={`/services/${project.service}`} className="flex items-center justify-center space-x-2 space-x-reverse font-medium">
                      <span>اطلب خدمة مماثلة</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            هل لديك مشروع مماثل؟
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            محترفين الديار جاهزون لتنفيذ مشروعك بنفس مستوى الجودة والاحترافية.
            نقدم استشارة مجانية شاملة وعرض سعر مخصص يناسب احتياجاتك ومتطلبات مشروعك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto shadow-lg">
              <Link href="https://wa.me/+966553719009" className="flex items-center space-x-3 space-x-reverse">
                <span>احصل على عرض سعر مجاني</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto shadow-lg">
              <Link href="/contact" className="flex items-center space-x-3 space-x-reverse">
                <span>تواصل معنا الآن</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
