'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  MapPin,
  User,
  Clock,
  DollarSign,
  Eye,
  Heart,
  Star,
  Play,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Target,
  CheckCircle,
  Quote,
  Phone
} from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  src: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  duration?: string;
  order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  client?: string;
  featured: boolean;
  views: number;
  likes: number;
  rating: number;
  projectDuration: string;
  projectCost: string;
  createdAt: string;
  mediaItems: MediaItem[];
  tags: { id: string; name: string; }[];
  materials: { id: string; name: string; }[];
  _count: {
    comments: number;
    likes: number;
  };
}

const categories = [
  { id: 'all', name: 'جميع المشاريع', icon: '🏗️', color: 'bg-gray-500' },
  { id: 'landscaping', name: 'تنسيق الحدائق', icon: '🌿', color: 'bg-green-500' },
  { id: 'mazallat', name: 'المظلات', icon: '☂️', color: 'bg-blue-500' },
  { id: 'pergolas', name: 'البرجولات', icon: '🏛️', color: 'bg-amber-500' },
  { id: 'renovation', name: 'الترميم', icon: '🔨', color: 'bg-orange-500' },
  { id: 'sandwich-panel', name: 'الساندوتش بانل', icon: '🏢', color: 'bg-slate-500' },
  { id: 'sawater', name: 'السواتر', icon: '🧱', color: 'bg-red-500' },
  { id: 'byoot-shaar', name: 'بيوت الشعر', icon: '⛺', color: 'bg-purple-500' },
  { id: 'khayyam', name: 'الخيام', icon: '🏕️', color: 'bg-emerald-500' }
];

const stats = [
  { icon: Target, value: '500+', label: 'مشروع مكتمل', color: 'text-blue-600' },
  { icon: Users, value: '300+', label: 'عميل راضي', color: 'text-green-600' },
  { icon: Award, value: '15+', label: 'سنة خبرة', color: 'text-purple-600' },
  { icon: Star, value: '4.9', label: 'تقييم العملاء', color: 'text-yellow-600' }
];

export default function PortfolioPageClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-viewed' | 'highest-rated'>('newest');

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, showOnlyFeatured, currentPage, sortBy]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        featured: showOnlyFeatured.toString(),
        page: currentPage.toString(),
        limit: '12'
      });

      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();

      if (data.projects) {
        setProjects(data.projects);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('خطأ في جلب المشاريع:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const HeroSection = () => (
    <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-bounce delay-300"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              معرض أعمالنا
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              استكشف مجموعة متنوعة من مشاريعنا المميزة في مجال تنسيق الحدائق والمظلات والبرجولات
            </p>
          </motion.div>

          {/* إحصائيات */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4 ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* أزرار الإجراء */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              asChild
            >
              <Link href="#projects">
                استعرض المشاريع
                <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold"
              asChild
            >
              <Link href="/contact">
                <Phone className="ml-2 h-5 w-5" />
                اطلب استشارة مجانية
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* موجة سفلية */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L1440 120L1440 0C1440 0 1140 80 720 80C300 80 0 0 0 0L0 120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );

  const ProjectCard = ({ project }: { project: Project }) => {
    const mainImage = project.mediaItems.find(item => item.type === 'IMAGE');
    const mainVideo = project.mediaItems.find(item => item.type === 'VIDEO');
    const mainMedia = mainImage || mainVideo;
    const hasVideo = project.mediaItems.some(item => item.type === 'VIDEO');

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -8 }}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative"
      >
        {/* صورة/فيديو المشروع */}
        <div className="relative h-64 overflow-hidden">
          {mainMedia ? (
            <>
              {mainMedia.type === 'IMAGE' ? (
                <Image
                  src={mainMedia.src}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="relative w-full h-full bg-gray-900">
                  <video
                    src={mainMedia.src}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    muted
                    playsInline
                    preload="metadata"
                    onError={(e) => {
                      console.log('خطأ في تحميل فيديو Portfolio:', mainMedia.src);
                    }}
                    onMouseEnter={(e) => {
                      const video = e.target as HTMLVideoElement;
                      video.currentTime = 0;
                      video.play().catch(console.error);
                    }}
                    onMouseLeave={(e) => {
                      const video = e.target as HTMLVideoElement;
                      video.pause();
                      video.currentTime = 0;
                    }}
                  >
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center pointer-events-none group-hover:bg-opacity-10 transition-all duration-300">
                    <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-10 w-10 text-gray-800" />
                    </div>
                  </div>
                  {/* مؤشر الفيديو */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-500 text-white text-xs">
                      فيديو
                    </Badge>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}

          {/* شارات علوية */}
          <div className="absolute top-4 left-4 flex gap-2">
            {project.featured && (
              <Badge className="bg-yellow-500 text-white shadow-lg">
                <Star className="h-3 w-3 mr-1 fill-current" />
                مميز
              </Badge>
            )}
            {hasVideo && (
              <Badge className="bg-red-500 text-white shadow-lg">
                <Play className="h-3 w-3 mr-1 fill-current" />
                فيديو
              </Badge>
            )}
          </div>

          {/* فئة المشروع */}
          <div className="absolute top-4 right-4">
            <Badge className={`${categories.find(c => c.id === project.category)?.color} text-white shadow-lg`}>
              {categories.find(c => c.id === project.category)?.icon} {categories.find(c => c.id === project.category)?.name}
            </Badge>
          </div>

          {/* معلومات سريعة */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-black bg-opacity-70 text-white">
              <Eye className="h-3 w-3 mr-1" />
              {project.views}
            </Badge>
            <Badge variant="secondary" className="bg-black bg-opacity-70 text-white">
              <Heart className="h-3 w-3 mr-1" />
              {project.likes}
            </Badge>
          </div>
        </div>

        {/* محتوى البطاقة */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* تفاصيل المشروع */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2 text-blue-500" />
              <span>{project.location}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2 text-green-500" />
              <span>{new Date(project.completionDate).toLocaleDateString('ar-SA')}</span>
            </div>

            {project.client && (
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-2 text-purple-500" />
                <span>{project.client}</span>
              </div>
            )}

            {project.projectDuration && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2 text-orange-500" />
                <span>{project.projectDuration}</span>
              </div>
            )}
          </div>

          {/* تقييم المشروع */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(project.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm text-gray-600 mr-2">({project.rating.toFixed(1)})</span>
            </div>
            <div className="text-sm text-gray-500">
              {project._count.comments} تعليق
            </div>
          </div>

          {/* الكلمات المفتاحية */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag.id} variant="outline" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* زر التفاصيل */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full group-hover:bg-blue-600 transition-all duration-300 relative overflow-hidden"
              asChild
            >
              <Link href={`/portfolio/${project.id}`}>
                <span className="relative z-10">عرض التفاصيل</span>
                <ArrowRight className="mr-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* قسم البطل */}
      <HeroSection />

      {/* قسم المشاريع */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* فلاتر البحث */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-6">

                {/* شريط البحث */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="ابحث في المشاريع..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-12 pl-4 py-3 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* إعدادات العرض */}
                <div className="flex gap-4">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => setViewMode('grid')}
                    className="px-6"
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => setViewMode('list')}
                    className="px-6"
                  >
                    <List className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* فلاتر الفئات */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">الفئات</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`${selectedCategory === category.id ? category.color : ''} transition-all duration-200`}
                    >
                      <span className="ml-2">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* فلاتر إضافية */}
              <div className="mt-6 flex flex-wrap gap-4">
                <Button
                  variant={showOnlyFeatured ? 'default' : 'outline'}
                  onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                  className="flex items-center gap-2"
                >
                  <Star className="h-4 w-4" />
                  المشاريع المميزة فقط
                </Button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="newest">الأحدث</option>
                  <option value="oldest">الأقدم</option>
                  <option value="most-viewed">الأكثر مشاهدة</option>
                  <option value="highest-rated">الأعلى تقييماً</option>
                </select>
              </div>
            </div>
          </div>

          {/* عرض المشاريع */}
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <>
              {/* نتائج البحث */}
              <div className="mb-8 text-center">
                <p className="text-lg text-gray-600">
                  تم العثور على <span className="font-bold text-blue-600">{filteredProjects.length}</span> مشروع
                  {selectedCategory !== 'all' && (
                    <span> في فئة <span className="font-bold">{categories.find(c => c.id === selectedCategory)?.name}</span></span>
                  )}
                </p>
              </div>

              {/* شبكة المشاريع */}
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                <AnimatePresence>
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-6">
                <Search className="h-24 w-24 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">لا توجد مشاريع</h3>
              <p className="text-gray-600 mb-8">
                {searchTerm ? 'لا توجد نتائج للبحث المحدد' : 'لم يتم العثور على مشاريع في هذه الفئة'}
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setShowOnlyFeatured(false);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                عرض جميع المشاريع
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* قسم الدعوة للعمل */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              هل أعجبك عملنا؟
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              دعنا نحول رؤيتك إلى واقع. احصل على استشارة مجانية اليوم!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link href="/contact">
                  تواصل معنا الآن
                  <Phone className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link href="/quote">
                  احصل على عرض سعر
                  <Quote className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
