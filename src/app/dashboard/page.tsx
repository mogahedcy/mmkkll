
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Camera,
  Eye,
  Heart,
  MessageSquare,
  Plus,
  Settings,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Image,
  Video,
  Activity,
  ArrowRight
} from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  featuredProjects: number;
  recentViews: number;
  totalMedia: number;
  imageCount: number;
  videoCount: number;
}

interface RecentProject {
  id: string;
  title: string;
  category: string;
  views: number;
  likes: number;
  createdAt: string;
  featured: boolean;
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    featuredProjects: 0,
    recentViews: 0,
    totalMedia: 0,
    imageCount: 0,
    videoCount: 0
  });
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (response.ok) {
        setIsAuthenticated(true);
        await loadDashboardData();
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      // جلب المشاريع مع الإحصائيات
      const response = await fetch('/api/projects?limit=100');
      const data = await response.json();
      
      if (data.projects) {
        const projects = data.projects;
        
        // حساب الإحصائيات
        const totalViews = projects.reduce((sum: number, p: any) => sum + (p.views || 0), 0);
        const totalLikes = projects.reduce((sum: number, p: any) => sum + (p.likes || 0), 0);
        const totalComments = projects.reduce((sum: number, p: any) => sum + (p._count?.comments || 0), 0);
        const featuredProjects = projects.filter((p: any) => p.featured).length;
        const totalMedia = projects.reduce((sum: number, p: any) => sum + (p.mediaItems?.length || 0), 0);
        const imageCount = projects.reduce((sum: number, p: any) => 
          sum + (p.mediaItems?.filter((m: any) => m.type === 'IMAGE').length || 0), 0);
        const videoCount = projects.reduce((sum: number, p: any) => 
          sum + (p.mediaItems?.filter((m: any) => m.type === 'VIDEO').length || 0), 0);

        setStats({
          totalProjects: projects.length,
          totalViews,
          totalLikes,
          totalComments,
          featuredProjects,
          recentViews: Math.floor(totalViews * 0.3), // تقدير للمشاهدات الأخيرة
          totalMedia,
          imageCount,
          videoCount
        });

        // أحدث 5 مشاريع
        setRecentProjects(projects.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    trend 
  }: { 
    title: string; 
    value: number | string; 
    icon: any; 
    color: string; 
    trend?: string; 
  }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {trend}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
              <p className="text-sm text-gray-500">مرحباً بك في نظام إدارة المشاريع</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard/settings')}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                الإعدادات
              </Button>
              <Button
                onClick={() => router.push('/dashboard/projects/add')}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                مشروع جديد
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="إجمالي المشاريع"
            value={stats.totalProjects}
            icon={BarChart3}
            color="bg-blue-500"
            trend="+12% هذا الشهر"
          />
          <StatCard
            title="إجمالي المشاهدات"
            value={stats.totalViews.toLocaleString()}
            icon={Eye}
            color="bg-green-500"
            trend="+8% هذا الأسبوع"
          />
          <StatCard
            title="المشاريع المميزة"
            value={stats.featuredProjects}
            icon={Star}
            color="bg-yellow-500"
          />
          <StatCard
            title="إجمالي الوسائط"
            value={stats.totalMedia}
            icon={Camera}
            color="bg-purple-500"
          />
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="الإعجابات"
            value={stats.totalLikes}
            icon={Heart}
            color="bg-red-500"
          />
          <StatCard
            title="التعليقات"
            value={stats.totalComments}
            icon={MessageSquare}
            color="bg-indigo-500"
          />
          <StatCard
            title="المشاهدات الأخيرة"
            value={stats.recentViews}
            icon={Activity}
            color="bg-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>المشاريع الأخيرة</CardTitle>
                  <CardDescription>آخر المشاريع المضافة</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/dashboard/projects')}
                  className="flex items-center gap-2"
                >
                  عرض الكل
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.length > 0 ? (
                    recentProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{project.title}</h4>
                            {project.featured && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                مميز
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{project.category}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {project.views || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {project.likes || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(project.createdAt).toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                        >
                          عرض
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>لا توجد مشاريع بعد</p>
                      <Button
                        className="mt-4"
                        onClick={() => router.push('/dashboard/projects/add')}
                      >
                        إضافة أول مشروع
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Media Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
                <CardDescription>المهام الأكثر استخداماً</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/projects/add')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة مشروع جديد
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/projects')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  إدارة المشاريع
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/portfolio')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  معاينة الموقع
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  إعدادات النظام
                </Button>
              </CardContent>
            </Card>

            {/* Media Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الوسائط</CardTitle>
                <CardDescription>توزيع الصور والفيديوهات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">الصور</span>
                  </div>
                  <span className="font-medium">{stats.imageCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-red-500" />
                    <span className="text-sm">الفيديوهات</span>
                  </div>
                  <span className="font-medium">{stats.videoCount}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">الإجمالي</span>
                  </div>
                  <span className="font-bold">{stats.totalMedia}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
