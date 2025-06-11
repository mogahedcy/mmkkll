'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Video,
  Image as ImageIcon,
  Filter,
  X,
  ChevronDown,
  Search
} from 'lucide-react';

interface FiltersState {
  category: string;
  location: string;
  featured: boolean | null;
  minRating: number;
  dateRange: string;
  hasVideo: boolean | null;
  priceRange: string;
}

interface AdvancedFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: Partial<FiltersState>) => void;
  categories: { id: string; name: string; icon: any }[];
}

const locations = [
  'جدة - الكل',
  'جدة - شمال جدة',
  'جدة - وسط جدة', 
  'جدة - شرق جدة',
  'جدة - جنوب جدة',
  'جدة - غرب جدة',
  'جدة - حي الفيصلية',
  'جدة - حي الزهراء',
  'جدة - حي النعيم',
  'جدة - حي الروضة',
  'جدة - حي الحمراء',
  'جدة - حي البوادي',
  'جدة - حي أبحر',
  'جدة - حي الصفا'
];

const dateRanges = [
  { value: '', label: 'كل الأوقات' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: 'last-year', label: 'العام الماضي' },
  { value: 'last-6-months', label: 'آخر 6 أشهر' },
  { value: 'last-3-months', label: 'آخر 3 أشهر' }
];

const priceRanges = [
  { value: '', label: 'جميع الأسعار' },
  { value: 'under-10k', label: 'أقل من 10,000 ريال' },
  { value: '10k-25k', label: '10,000 - 25,000 ريال' },
  { value: '25k-50k', label: '25,000 - 50,000 ريال' },
  { value: '50k-100k', label: '50,000 - 100,000 ريال' },
  { value: 'over-100k', label: 'أكثر من 100,000 ريال' }
];

export default function AdvancedFilters({ filters, onFiltersChange, categories }: AdvancedFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    category: true,
    location: false,
    rating: false,
    date: false,
    media: false,
    price: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== null && value !== 0
  ).length;

  const FilterSection = ({ 
    id, 
    title, 
    icon: Icon, 
    children 
  }: { 
    id: string; 
    title: string; 
    icon: any; 
    children: React.ReactNode; 
  }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-primary" />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform ${
            expandedSections[id] ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {expandedSections[id] && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* عداد الفلاتر النشطة */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <span className="font-medium">الفلاتر المتقدمة</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-primary text-white">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange({
              category: '',
              location: '',
              featured: null,
              minRating: 0,
              dateRange: '',
              hasVideo: null,
              priceRange: ''
            })}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            مسح الكل
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* فلتر الفئات */}
        <Card>
          <FilterSection id="category" title="الفئة" icon={Filter}>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={filters.category === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFiltersChange({ category: category.id })}
                  className="justify-start text-sm"
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </FilterSection>
        </Card>

        {/* فلتر الموقع */}
        <Card>
          <FilterSection id="location" title="الموقع" icon={MapPin}>
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="ابحث عن موقع..."
                  value={filters.location}
                  onChange={(e) => onFiltersChange({ location: e.target.value })}
                  className="pr-10"
                />
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {locations
                  .filter(loc => loc.toLowerCase().includes(filters.location.toLowerCase()))
                  .map((location) => (
                  <Button
                    key={location}
                    variant={filters.location === location ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onFiltersChange({ location })}
                    className="w-full justify-start text-sm"
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </FilterSection>
        </Card>

        {/* فلتر التقييم والمميزات */}
        <Card>
          <FilterSection id="rating" title="التقييم والمميزات" icon={Star}>
            <div className="space-y-4">
              {/* التقييم الأدنى */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التقييم الأدنى
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={filters.minRating >= rating ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onFiltersChange({ minRating: rating })}
                      className="p-2"
                    >
                      <Star className={`w-4 h-4 ${filters.minRating >= rating ? 'fill-current' : ''}`} />
                    </Button>
                  ))}
                </div>
              </div>

              {/* المشاريع المميزة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المشاريع المميزة
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={filters.featured === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onFiltersChange({ featured: null })}
                  >
                    الكل
                  </Button>
                  <Button
                    variant={filters.featured === true ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onFiltersChange({ featured: true })}
                  >
                    مميز فقط
                  </Button>
                  <Button
                    variant={filters.featured === false ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onFiltersChange({ featured: false })}
                  >
                    غير مميز
                  </Button>
                </div>
              </div>
            </div>
          </FilterSection>
        </Card>

        {/* فلتر التاريخ */}
        <Card>
          <FilterSection id="date" title="تاريخ الإنجاز" icon={Calendar}>
            <div className="grid grid-cols-2 gap-2">
              {dateRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={filters.dateRange === range.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFiltersChange({ dateRange: range.value })}
                  className="justify-start text-sm"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </FilterSection>
        </Card>

        {/* فلتر الوسائط */}
        <Card>
          <FilterSection id="media" title="نوع الوسائط" icon={ImageIcon}>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وجود فيديو
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={filters.hasVideo === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onFiltersChange({ hasVideo: null })}
                  >
                    الكل
                  </Button>
                  <Button
                    variant={filters.hasVideo === true ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onFiltersChange({ hasVideo: true })}
                    className="flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    مع فيديو
                  </Button>
                  <Button
                    variant={filters.hasVideo === false ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onFiltersChange({ hasVideo: false })}
                    className="flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    صور فقط
                  </Button>
                </div>
              </div>
            </div>
          </FilterSection>
        </Card>

        {/* فلتر السعر */}
        <Card>
          <FilterSection id="price" title="نطاق السعر" icon={DollarSign}>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={filters.priceRange === range.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFiltersChange({ priceRange: range.value })}
                  className="w-full justify-start text-sm"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </FilterSection>
        </Card>
      </div>

      {/* ملخص الفلاتر النشطة */}
      {activeFiltersCount > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-primary">الفلاتر النشطة:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e: React.MouseEvent) => onFiltersChange({
                  category: '',
                  location: '',
                  featured: null,
                  minRating: 0,
                  dateRange: '',
                  hasVideo: null,
                  priceRange: ''
                })}
                className="text-red-600 hover:text-red-700"
              >
                مسح الكل
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categories.find(c => c.id === filters.category)?.name}
                  <button onClick={() => onFiltersChange({ category: '' })}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.location}
                  <button onClick={() => onFiltersChange({ location: '' })}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.featured !== null && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.featured ? 'مميز' : 'غير مميز'}
                  <button onClick={() => onFiltersChange({ featured: null })}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.minRating > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  تقييم {filters.minRating}+ نجوم
                  <button onClick={() => onFiltersChange({ minRating: 0 })}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.dateRange && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {dateRanges.find(d => d.value === filters.dateRange)?.label}
                  <button onClick={() => onFiltersChange({ dateRange: '' })}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.hasVideo !== null && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.hasVideo ? 'مع فيديو' : 'صور فقط'}
                  <button onClick={() => onFiltersChange({ hasVideo: null })}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.priceRange && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {priceRanges.find(p => p.value === filters.priceRange)?.label}
                  <button onClick={() => onFiltersChange({ priceRange: '' })}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}