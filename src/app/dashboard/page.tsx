'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3,
  Eye,
  Star,
  FolderOpen,
  Image,
  Video,
  Users,
  TrendingUp,
  Plus,
  Settings,
  LogOut,
  Home,
  Upload
} from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  totalViews: number;
  totalRatings: number;
  averageRating: number;
  totalImages: number;
  totalVideos: number;
  recentProjects: number;
  featuredProjects: number;
  categoryStats?: Record<string, number>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalViews: 0,
    totalRatings: 0,
    averageRating: 0,
    totalImages: 0,
    totalVideos: 0,
    recentProjects: 0,
    featuredProjects: 0,
    categoryStats: {}
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (response.ok) {
        setIsAuthenticated(true);
        await loadDashboardStats();
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

  const loadDashboardStats = async () => {
    try {
      // جلب إحصائيات المشاريع
      const projectsResponse = await fetch('/api/projects');
      const projects = await projectsResponse.json();

      // حساب الإحصائيات
      const totalProjects = projects.length;
      const totalViews = projects.reduce((sum: number, project: any) => sum + (project.views || 0), 0);
      const ratingsCount = projects.reduce((sum: number, project: any) => sum + (project.ratings?.length || 0), 0);
      const totalRatingValue = projects.reduce((sum: number, project: any) => {
        const projectRatings = project.ratings || [];
        return sum + projectRatings.reduce((pSum: number, rating: any) => pSum + rating.rating, 0);
      }, 0);

      const averageRating = ratingsCount > 0 ? totalRatingValue / ratingsCount : 0;

      const totalImages = projects.reduce((sum: number, project: any) => {
        return sum + (project.media?.filter((m: any) => m.type === 'image').length || 0);
      }, 0);

      const totalVideos = projects.reduce((sum: number, project: any) => {
        return sum + (project.media?.filter((m: any) => m.type === 'video').length || 0);
      }, 0);

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const recentProjects = projects.filter((project: any) =>
        new Date(project.createdAt) > oneWeekAgo
      ).length;

      const featuredProjects = projects.filter((project: any) => project.featured).length;

      // حساب إحصائيات الفئات
      const categoryStats: Record<string, number> = {};
      projects.forEach((project: any) => {
        categoryStats[project.category] = (categoryStats[project.category] || 0) + 1;
      });

      setStats({
        totalProjects,
        totalViews,
        totalRatings: ratingsCount,
        averageRating,
        totalImages,
        totalVideos,
        recentProjects,
        featuredProjects,
        categoryStats
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                لوحة التحكم - محترفين الديار العالمية
              </h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                الموقع الرئيسي
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                {stats.recentProjects} مشروع جديد هذا الأسبوع
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المشاهدات</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                جميع المشاريع
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.averageRating.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                من {stats.totalRatings} تقييم
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الوسائط</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalImages + stats.totalVideos}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.totalImages} صورة، {stats.totalVideos} فيديو
              </p>
            </CardContent>
          </Card>
        </div>

        {/* إجراءات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                إضافة مشروع جديد
              </CardTitle>
              <CardDescription>
                إضافة مشروع جديد إلى معرض الأعمال
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => router.push('/dashboard/projects/add')}
              >
                إضافة مشروع
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-blue-600" />
                إدارة المشاريع
              </CardTitle>
              <CardDescription>
                عرض وتعديل المشاريع الموجودة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/dashboard/projects')}
              >
                عرض المشاريع
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" />
                إعدادات الحساب
              </CardTitle>
              <CardDescription>
                تغيير كلمة المرور والإعدادات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/dashboard/settings')}
              >
                الإعدادات
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* تفاصيل إضافية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>المشاريع المميزة</CardTitle>
              <CardDescription>
                عدد المشاريع المميزة حالياً
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-600">
                  {stats.featuredProjects}
                </div>
                <Badge variant="secondary">
                  {stats.totalProjects > 0 ? ((stats.featuredProjects / stats.totalProjects) * 100).toFixed(1) : 0}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>نشاط المشاريع</CardTitle>
              <CardDescription>
                المشاريع المضافة مؤخراً
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-600">
                  {stats.recentProjects}
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الأداء العام</CardTitle>
              <CardDescription>
                متوسط المشاهدات لكل مشروع
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-orange-600">
                  {stats.totalProjects > 0 ? Math.round(stats.totalViews / stats.totalProjects) : 0}
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* إحصائيات الفئات */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>توزيع المشاريع حسب الفئة</CardTitle>
            <CardDescription>
              عدد المشاريع في كل فئة من فئات الخدمات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.categoryStats?.mazallat || 0}
                </div>
                <div className="text-sm text-gray-600">مظلات</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {stats.categoryStats?.renovation || 0}
                </div>
                <div className="text-sm text-gray-600">ترميم</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {stats.categoryStats?.pergolas || 0}
                </div>
                <div className="text-sm text-gray-600">برجولات</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.categoryStats?.sawater || 0}
                </div>
                <div className="text-sm text-gray-600">سواتر</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">
                  {stats.categoryStats?.landscaping || 0}
                </div>
                <div className="text-sm text-gray-600">تنسيق حدائق</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.categoryStats?.['byoot-shaar'] || 0}
                </div>
                <div className="text-sm text-gray-600">بيوت شعر</div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  {stats.categoryStats?.khayyam || 0}
                </div>
                <div className="text-sm text-gray-600">خيام</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {stats.categoryStats?.['sandwich-panel'] || 0}
                </div>
                <div className="text-sm text-gray-600">ساندوتش بانل</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
