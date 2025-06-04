
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Eye, Heart, Star, Calendar, MapPin, Loader2 } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  src: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  createdAt: string;
  mediaItems: MediaItem[];
  tags?: { name: string }[];
  featured: boolean;
  views: number;
  likes: number;
  rating: number;
}

export default function LatestProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects?limit=6&sort=newest');
        const data = await response.json();
        
        if (data.success && data.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('خطأ في جلب أحدث المشاريع:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProjects();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">جاري تحميل أحدث المشاريع...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            أحدث المشاريع المضافة
          </h2>
          <p className="text-lg text-muted-foreground">لا توجد مشاريع متاحة حالياً</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Clock className="w-4 h-4" />
            <span>أحدث الإضافات</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            أحدث المشاريع المضافة
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            اكتشف أحدث أعمالنا وإنجازاتنا الجديدة في مختلف مجالات الخدمات المتخصصة
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => {
            const mainMedia = project.mediaItems && project.mediaItems.length > 0 ? project.mediaItems[0] : null;
            const daysSinceAdded = Math.floor((new Date().getTime() - new Date(project.createdAt).getTime()) / (1000 * 3600 * 24));

            return (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  {mainMedia ? (
                    <Image
                      src={mainMedia.src}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-project.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">🏗️</span>
                        </div>
                        <p className="text-sm text-gray-500">لا توجد صورة</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* New Badge */}
                  {daysSinceAdded <= 7 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      جديد
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    {project.category}
                  </div>

                  {/* Date Added */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                    {daysSinceAdded === 0 ? 'اليوم' : daysSinceAdded === 1 ? 'أمس' : `منذ ${daysSinceAdded} أيام`}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Project Title */}
                  <h3 className="font-bold text-primary text-lg leading-tight mb-3 line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Project Meta */}
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{formatDate(project.createdAt)}</span>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="flex items-center space-x-1 space-x-reverse">
                        <Eye className="w-4 h-4" />
                        <span>{project.views || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1 space-x-reverse">
                        <Heart className="w-4 h-4" />
                        <span>{project.likes || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1 space-x-reverse">
                        <Star className="w-4 h-4" />
                        <span>{project.rating || 0}</span>
                      </span>
                    </div>
                    {project.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        مميز
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button asChild variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300">
                    <Link href={`/portfolio/${project.id}`} className="flex items-center justify-center space-x-2 space-x-reverse">
                      <span>عرض التفاصيل</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="px-8 py-6 h-auto text-lg shadow-lg">
            <Link href="/portfolio" className="flex items-center space-x-3 space-x-reverse">
              <span>مشاهدة جميع المشاريع</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
