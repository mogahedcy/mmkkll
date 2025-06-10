'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AdvancedPagination from '@/components/ui/advanced-pagination';
import AdvancedFilters from '@/components/AdvancedFilters';
import SavedSearches from '@/components/SavedSearches';
import {
  Search,
  Grid3X3,
  List,
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  Heart,
  Calendar,
  MapPin,
  Star,
  Play,
  Image as ImageIcon,
  Video,
  Download,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  Award,
  Building,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  X
} from 'lucide-react';

// تعريف الواجهات
interface MediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  src: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  order: number;
  duration?: number;
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
  projectDuration?: string;
  projectCost?: string;
  views: number;
  likes: number;
  rating: number;
  createdAt: string;
  mediaItems: MediaItem[];
  tags: { id: string; name: string; }[];
  materials: { id: string; name: string; }[];
  _count?: {
    comments: number;
    likes: number;
  };
}

interface FiltersState {
  category: string;
  location: string;
  featured: boolean | null;
  minRating: number;
  dateRange: string;
  hasVideo: boolean | null;
  priceRange: string;
}

// خيارات الفلترة والترتيب
const categories = [
  { id: '', name: 'جميع الفئات', icon: Building },
  { id: 'مظلات', name: 'مظلات', icon: Building },
  { id: 'برجولات', name: 'برجولات', icon: Building },
  { id: 'سواتر', name: 'سواتر', icon: Building },
  { id: 'ساندوتش بانل', name: 'ساندوتش بانل', icon: Building },
  { id: 'تنسيق حدائق', name: 'تنسيق حدائق', icon: Building },
  { id: 'خيام ملكية', name: 'خيام ملكية', icon: Building },
  { id: 'بيوت شعر', name: 'بيوت شعر', icon: Building },
  { id: 'ترميم', name: 'ترميم', icon: Building }
];

const sortOptions = [
  { value: 'newest', label: 'الأحدث', icon: Clock },
  { value: 'oldest', label: 'الأقدم', icon: Clock },
  { value: 'most-viewed', label: 'الأكثر مشاهدة', icon: Eye },
  { value: 'most-liked', label: 'الأكثر إعجاباً', icon: Heart },
  { value: 'highest-rated', label: 'الأعلى تقييماً', icon: Star },
  { value: 'featured', label: 'المميزة', icon: Award },
  { value: 'alphabetical', label: 'أبجدياً', icon: SortAsc }
];

const viewModes = [
  { value: 'grid', label: 'شبكة', icon: Grid3X3 },
  { value: 'list', label: 'قائمة', icon: List }
];

export default function PortfolioPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // الحالات الأساسية
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  // حالات الفلترة والبحث
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  // حالات الفلترة المتقدمة
  const [filters, setFilters] = useState<FiltersState>({
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    featured: searchParams.get('featured') === 'true' ? true : searchParams.get('featured') === 'false' ? false : null,
    minRating: Number(searchParams.get('minRating')) || 0,
    dateRange: searchParams.get('dateRange') || '',
    hasVideo: searchParams.get('hasVideo') === 'true' ? true : searchParams.get('hasVideo') === 'false' ? false : null,
    priceRange: searchParams.get('priceRange') || ''
  });

  // حالات إضافية
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<string[]>([]);

  // جلب المشاريع من API
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sort: sortBy,
        ...(searchTerm && { search: searchTerm }),
        ...(filters.category && { category: filters.category }),
        ...(filters.location && { location: filters.location }),
        ...(filters.featured !== null && { featured: filters.featured.toString() }),
        ...(filters.minRating > 0 && { minRating: filters.minRating.toString() }),
        ...(filters.dateRange && { dateRange: filters.dateRange }),
        ...(filters.hasVideo !== null && { hasVideo: filters.hasVideo.toString() }),
        ...(filters.priceRange && { priceRange: filters.priceRange })
      });

      console.log('🔍 جلب المشاريع مع المعايير:', {
        category: filters.category || 'الكل',
        page: currentPage,
        search: searchTerm,
        sort: sortBy
      });

      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();

      console.log('📦 البيانات المستلمة من API:', data);

      if (data.success && data.projects) {
        setProjects(data.projects);
        setTotalCount(data.total || data.projects.length);
        console.log('✅ تم جلب المشاريع بنجاح:', data.projects.length);
      } else {
        throw new Error(data.error || 'فشل في جلب المشاريع');
      }
    } catch (error) {
      console.error('❌ خطأ في جلب المشاريع:', error);
      setError('حدث خطأ في تحميل المشاريع. يرجى المحاولة مرة أخرى.');
      setProjects([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, sortBy, searchTerm, filters]);

  // فلترة المشاريع محلياً
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...projects];

    // الفلترة حسب النص
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.location.toLowerCase().includes(term) ||
        project.category.toLowerCase().includes(term) ||
        project.tags?.some(tag => tag.name.toLowerCase().includes(term)) ||
        project.materials?.some(material => material.name.toLowerCase().includes(term))
      );
    }

    // الترتيب
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'most-viewed':
          return (b.views || 0) - (a.views || 0);
        case 'most-liked':
          return (b.likes || 0) - (a.likes || 0);
        case 'highest-rated':
          return (b.rating || 0) - (a.rating || 0);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'alphabetical':
          return a.title.localeCompare(b.title, 'ar');
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchTerm, sortBy]);

  // التحديث عند تغيير المعايير
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // تحديث URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (currentPage !== 1) params.set('page', currentPage.toString());
    if (filters.category) params.set('category', filters.category);
    if (filters.location) params.set('location', filters.location);
    if (filters.featured !== null) params.set('featured', filters.featured.toString());
    if (filters.minRating > 0) params.set('minRating', filters.minRating.toString());
    if (filters.dateRange) params.set('dateRange', filters.dateRange);
    if (filters.hasVideo !== null) params.set('hasVideo', filters.hasVideo.toString());
    if (filters.priceRange) params.set('priceRange', filters.priceRange);

    const newUrl = params.toString() ? `/portfolio?${params.toString()}` : '/portfolio';
    window.history.replaceState({}, '', newUrl);
  }, [searchTerm, sortBy, currentPage, filters]);

  // تحميل العلامات المرجعية من localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedProjects');
    if (saved) {
      setBookmarkedProjects(JSON.parse(saved));
    }
  }, []);

  // دوال المساعدة
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: Partial<FiltersState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const toggleBookmark = (projectId: string) => {
    const newBookmarks = bookmarkedProjects.includes(projectId)
      ? bookmarkedProjects.filter(id => id !== projectId)
      : [...bookmarkedProjects, projectId];

    setBookmarkedProjects(newBookmarks);
    localStorage.setItem('bookmarkedProjects', JSON.stringify(newBookmarks));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      location: '',
      featured: null,
      minRating: 0,
      dateRange: '',
      hasVideo: null,
      priceRange: ''
    });
    setSortBy('newest');
    setCurrentPage(1);
  };

  // حساب النتائج للصفحة الحالية
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredAndSortedProjects.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);

  // إحصائيات المشاريع
  const stats = useMemo(() => {
    const total = projects.length;
    const featured = projects.filter(p => p.featured).length;
    const totalViews = projects.reduce((sum, p) => sum + (p.views || 0), 0);
    const avgRating = projects.length > 0 
      ? projects.reduce((sum, p) => sum + (p.rating || 0), 0) / projects.length 
      : 0;

    return { total, featured, totalViews, avgRating };
  }, [projects]);

  // مكون بطاقة المشروع
  const ProjectCard = ({ project }: { project: Project }) => {
    const mainImage = project.mediaItems?.find(item => item.type === 'IMAGE');
    const mainVideo = project.mediaItems?.find(item => item.type === 'VIDEO');
    const mainMedia = mainImage || mainVideo;
    const hasVideo = project.mediaItems?.some(item => item.type === 'VIDEO');
    const imageCount = project.mediaItems?.filter(item => item.type === 'IMAGE').length || 0;
    const videoCount = project.mediaItems?.filter(item => item.type === 'VIDEO').length || 0;
    const isBookmarked = bookmarkedProjects.includes(project.id);

    const cardContent = (
      <Card className="group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 rounded-2xl">
        {/* الصورة الرئيسية */}
        <div className="relative h-64 overflow-hidden">
          {mainMedia ? (
            <>
              {mainMedia.type === 'IMAGE' ? (
                <Image
                  src={mainMedia.src}
                  alt={`${project.title} - محترفين الديار العالمية`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/uploads/mazallat-1.webp';
                  }}
                />
              ) : (
                <div className="relative w-full h-full bg-gray-900">
                  <video
                    src={mainMedia.src}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    muted
                    loop
                    playsInline
                    poster={mainMedia.thumbnail}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-gray-800" />
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Building className="w-16 h-16 text-gray-400" />
            </div>
          )}

          {/* التراكبات */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* شارات علوية */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <Badge className="bg-primary text-primary-foreground font-bold shadow-lg">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge className="bg-yellow-500 text-white font-bold shadow-lg">
                <Star className="w-3 h-3 mr-1" />
                مميز
              </Badge>
            )}
            {hasVideo && (
              <Badge className="bg-red-500 text-white font-bold shadow-lg">
                <Video className="w-3 h-3 mr-1" />
                فيديو
              </Badge>
            )}
          </div>

          {/* أزرار الإجراءات */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                toggleBookmark(project.id);
              }}
            >
              <Bookmark 
                className={`w-4 h-4 ${isBookmarked ? 'fill-current text-yellow-500' : 'text-gray-600'}`} 
              />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                // مشاركة المشروع
                if (navigator.share) {
                  navigator.share({
                    title: project.title,
                    text: project.description,
                    url: `/portfolio/${project.id}`
                  });
                }
              }}
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </Button>
          </div>

          {/* شارة الوسائط */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="flex items-center gap-2">
              {imageCount > 0 && (
                <Badge variant="secondary" className="bg-black/50 text-white border-0 backdrop-blur-sm">
                  <ImageIcon className="w-3 h-3 mr-1" />
                  {imageCount}
                </Badge>
              )}
              {videoCount > 0 && (
                <Badge variant="secondary" className="bg-black/50 text-white border-0 backdrop-blur-sm">
                  <Video className="w-3 h-3 mr-1" />
                  {videoCount}
                </Badge>
              )}
            </div>
          </div>

          {/* تراكب المعاينة */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <Button size="lg" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
              <Eye className="w-5 h-5 mr-2" />
              عرض التفاصيل
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* محتوى البطاقة */}
        <CardContent className="p-6">
          {/* عنوان المشروع */}
          <h3 className="font-bold text-lg text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          {/* معلومات المشروع */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-accent" />
              <span>{new Date(project.completionDate).getFullYear()}</span>
            </div>
          </div>

          {/* وصف المشروع */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* العلامات */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
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
          )}

          {/* الإحصائيات */}
          <div className="flex items-center justify-between text-sm border-t pt-4">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {project.views || 0}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {project.likes || 0}
              </span>
              {project.rating > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  {project.rating.toFixed(1)}
                </span>
              )}
            </div>

            {project.projectCost && (
              <Badge variant="outline" className="font-semibold">
                {project.projectCost}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );

    return (
      <Link href={`/portfolio/${project.id}`} className="block">
        {cardContent}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30" dir="rtl">
      {/* العنوان الرئيسي */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              معرض أعمال 
              <span className="block text-yellow-300">محترفين الديار العالمية</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-4xl mx-auto">
              اكتشف مشاريعنا المتميزة في جدة والمناطق المحيطة
            </p>

            {/* الإحصائيات */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-100">مشروع منجز</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
                  {stats.featured}
                </div>
                <div className="text-sm text-gray-100">مشروع مميز</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
                  {(stats.totalViews / 1000).toFixed(1)}K
                </div>
                <div className="text-sm text-gray-100">مشاهدة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
                  {stats.avgRating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-100">متوسط التقييم</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* شريط البحث والفلاتر */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* البحث */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="ابحث في المشاريع..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pr-10 py-3 text-lg border-2 focus:border-primary rounded-xl"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => handleSearch('')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex gap-3">
              {/* فلاتر سريعة */}
              <div className="flex gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Button
                    key={category.id}
                    variant={filters.category === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange({ category: category.id })}
                    className="whitespace-nowrap"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* الفلاتر المتقدمة */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 ${showFilters ? 'bg-primary text-white' : ''}`}
              >
                <Filter className="w-4 h-4" />
                فلاتر
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>

              {/* الترتيب */}
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* وضع العرض */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                {viewModes.map((mode) => (
                  <Button
                    key={mode.value}
                    variant={viewMode === mode.value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode(mode.value)}
                    className="rounded-none border-0"
                  >
                    <mode.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* الفلاتر المتقدمة */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-xl border">
              <AdvancedFilters
                filters={filters}
                onFiltersChange={handleFilterChange}
                categories={categories}
              />
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <Button variant="outline" onClick={clearAllFilters}>
                  مسح جميع الفلاتر
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  تطبيق الفلاتر
                </Button>
              </div>
            </div>
          )}

          {/* معلومات النتائج */}
          <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <div>
              عرض {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProjects.length)} من {filteredAndSortedProjects.length} نتيجة
              {searchTerm && (
                <span className="mr-2">
                  للبحث عن: <strong>"{searchTerm}"</strong>
                </span>
              )}
            </div>
            <SavedSearches />
          </div>
        </div>
      </section>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">جاري تحميل المشاريع...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[500px]">
            <Card className="p-8 text-center max-w-md">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">حدث خطأ</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchProjects}>
                إعادة المحاولة
              </Button>
            </Card>
          </div>
        ) : filteredAndSortedProjects.length === 0 ? (
          <div className="flex items-center justify-center min-h-[500px]">
            <Card className="p-8 text-center max-w-md">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground mb-4">
                لم نجد أي مشاريع تطابق معايير البحث الخاصة بك
              </p>
              <Button onClick={clearAllFilters}>
                مسح جميع الفلاتر
              </Button>
            </Card>
          </div>
        ) : (
          <>
            {/* شبكة المشاريع */}
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                : 'space-y-6'
              }
            `}>
              {currentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* التنقل بين الصفحات */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <AdvancedPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  showPageInfo={true}
                  totalItems={filteredAndSortedProjects.length}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* قسم الدعوة للعمل */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <TrendingUp className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            هل أعجبك عملنا؟
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            نحن جاهزون لتحويل أفكارك إلى واقع مذهل. احصل على استشارة مجانية وعرض سعر مخصص لمشروعك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
              <Link href="/quote">
                احصل على عرض سعر
                <ArrowUpRight className="w-5 h-5 mr-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">
                                تواصل معنا
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}