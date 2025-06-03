'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Clock,
  DollarSign,
  Star,
  Heart,
  Eye,
  Share2,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  MessageCircle,
  Quote,
  Award,
  CheckCircle,
  Tag
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
  { id: 'landscaping', name: 'تنسيق الحدائق', icon: '🌿', color: 'bg-green-500' },
  { id: 'mazallat', name: 'المظلات', icon: '☂️', color: 'bg-blue-500' },
  { id: 'pergolas', name: 'البرجولات', icon: '🏛️', color: 'bg-amber-500' },
  { id: 'renovation', name: 'الترميم', icon: '🔨', color: 'bg-orange-500' },
  { id: 'sandwich-panel', name: 'الساندوتش بانل', icon: '🏢', color: 'bg-slate-500' },
  { id: 'sawater', name: 'السواتر', icon: '🧱', color: 'bg-red-500' },
  { id: 'byoot-shaar', name: 'بيوت الشعر', icon: '⛺', color: 'bg-purple-500' },
  { id: 'khayyam', name: 'الخيام', icon: '🏕️', color: 'bg-emerald-500' }
];

interface Props {
  project: Project;
}

export default function ProjectDetailsClient({ project }: Props) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const category = categories.find(c => c.id === project.category);
  const currentMedia = project.mediaItems[selectedMediaIndex];

  const handlePrevMedia = () => {
    setSelectedMediaIndex((prev) =>
      prev === 0 ? project.mediaItems.length - 1 : prev - 1
    );
  };

  const handleNextMedia = () => {
    setSelectedMediaIndex((prev) =>
      prev === project.mediaItems.length - 1 ? 0 : prev + 1
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('خطأ في المشاركة:', error);
      }
    } else {
      // نسخ الرابط للحافظة
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط للحافظة');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* شريط التنقل العلوي */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/portfolio">
                <ArrowLeft className="h-5 w-5 ml-2" />
                العودة للمعرض
              </Link>
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 ml-2" />
                مشاركة
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 ml-2" />
                تحميل الكتالوج
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* قسم العرض الرئيسي */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* معرض الوسائط */}
            <div className="space-y-6">
              {/* العرض الرئيسي */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                  {currentMedia && (
                    <>
                      {currentMedia.type === 'IMAGE' ? (
                        <Image
                          src={currentMedia.src}
                          alt={currentMedia.title || project.title}
                          fill
                          className="object-cover cursor-pointer"
                          onClick={() => setIsLightboxOpen(true)}
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <video
                            src={currentMedia.src}
                            className="w-full h-full object-cover"
                            controls={false}
                            muted={isVideoMuted}
                            playsInline
                            onClick={() => setIsLightboxOpen(true)}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                            <Button
                              size="lg"
                              className="bg-white bg-opacity-90 text-gray-900 hover:bg-opacity-100"
                              onClick={() => setIsLightboxOpen(true)}
                            >
                              <Play className="h-8 w-8" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* أزرار التنقل */}
                {project.mediaItems.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90"
                      onClick={handlePrevMedia}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90"
                      onClick={handleNextMedia}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* مؤشر العدد */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  {selectedMediaIndex + 1} / {project.mediaItems.length}
                </div>
              </div>

              {/* معاينات مصغرة */}
              {project.mediaItems.length > 1 && (
                <div className="grid grid-cols-6 gap-2">
                  {project.mediaItems.map((media, index) => (
                    <button
                      key={media.id}
                      onClick={() => setSelectedMediaIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedMediaIndex
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {media.type === 'IMAGE' ? (
                        <Image
                          src={media.src}
                          alt=""
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Play className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* معلومات المشروع */}
            <div className="space-y-8">
              {/* العنوان والتقييم */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {category && (
                    <Badge className={`${category.color} text-white`}>
                      {category.icon} {category.name}
                    </Badge>
                  )}
                  {project.featured && (
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      مميز
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(project.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="mr-2 text-lg font-semibold">{project.rating.toFixed(1)}</span>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 ml-1" />
                      {project.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 ml-1" />
                      {project.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="h-4 w-4 ml-1" />
                      {project._count.comments}
                    </span>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* تفاصيل المشروع */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 text-gray-900">تفاصيل المشروع</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 ml-3 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500">الموقع</div>
                        <div className="font-semibold">{project.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 ml-3 text-green-500" />
                      <div>
                        <div className="text-sm text-gray-500">تاريخ الإكمال</div>
                        <div className="font-semibold">
                          {new Date(project.completionDate).toLocaleDateString('ar-SA')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 ml-3 text-orange-500" />
                      <div>
                        <div className="text-sm text-gray-500">مدة التنفيذ</div>
                        <div className="font-semibold">{project.projectDuration}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {project.client && (
                      <div className="flex items-center">
                        <User className="h-5 w-5 ml-3 text-purple-500" />
                        <div>
                          <div className="text-sm text-gray-500">العميل</div>
                          <div className="font-semibold">{project.client}</div>
                        </div>
                      </div>
                    )}

                    {project.projectCost && (
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 ml-3 text-emerald-500" />
                        <div>
                          <div className="text-sm text-gray-500">التكلفة</div>
                          <div className="font-semibold">{project.projectCost}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Award className="h-5 w-5 ml-3 text-yellow-500" />
                      <div>
                        <div className="text-sm text-gray-500">الحالة</div>
                        <div className="font-semibold flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 ml-1" />
                          مكتمل
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* الكلمات المفتاحية والمواد */}
              {(project.tags.length > 0 || project.materials.length > 0) && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  {project.tags.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Tag className="h-4 w-4 ml-2" />
                        الكلمات المفتاحية
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag.id} variant="secondary">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.materials.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Award className="h-4 w-4 ml-2" />
                        المواد المستخدمة
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.materials.map((material) => (
                          <Badge key={material.id} variant="outline">
                            {material.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* أزرار الإجراء */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1" asChild>
                  <Link href="/contact">
                    <Phone className="h-5 w-5 ml-2" />
                    تواصل معنا
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <Link href="/quote">
                    <Quote className="h-5 w-5 ml-2" />
                    احصل على عرض سعر
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox للوسائط */}
      <AnimatePresence>
        {isLightboxOpen && currentMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative max-w-full max-h-full">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 z-10"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>

              {currentMedia.type === 'IMAGE' ? (
                <Image
                  src={currentMedia.src}
                  alt={currentMedia.title || project.title}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[90vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <video
                  src={currentMedia.src}
                  className="max-w-full max-h-[90vh] object-contain"
                  controls
                  autoPlay
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              {/* أزرار التنقل في Lightbox */}
              {project.mediaItems.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevMedia();
                    }}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextMedia();
                    }}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
