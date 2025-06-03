'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon,
  Video,
  Plus,
  Save,
  Eye,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'IMAGE' | 'VIDEO';
  uploaded?: boolean;
  url?: string;
}

export default function AddProjectPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // بيانات المشروع - متطابقة مع API
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    completionDate: '',
    client: '',
    featured: false,
    projectDuration: '',
    projectCost: '',
    tags: [] as string[],
    materials: [] as string[]
  });

  // حقول إضافية
  const [currentTag, setCurrentTag] = useState('');
  const [currentMaterial, setCurrentMaterial] = useState('');

  // ملفات الوسائط
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // فئات المشاريع - متطابقة مع Portfolio
  const categories = [
    'landscaping',
    'mazallat',
    'pergolas',
    'renovation',
    'sandwich-panel',
    'sawater',
    'byoot-shaar',
    'khayyam'
  ];

  const categoryNames: Record<string, string> = {
    'landscaping': 'تنسيق الحدائق',
    'mazallat': 'المظلات',
    'pergolas': 'البرجولات',
    'renovation': 'الترميم',
    'sandwich-panel': 'الساندوتش بانل',
    'sawater': 'السواتر',
    'byoot-shaar': 'بيوت الشعر',
    'khayyam': 'الخيام'
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (response.ok) {
        setIsAuthenticated(true);
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // إزالة الخطأ عند التعديل
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addMaterial = () => {
    if (currentMaterial.trim() && !formData.materials.includes(currentMaterial.trim())) {
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, currentMaterial.trim()]
      }));
      setCurrentMaterial('');
    }
  };

  const removeMaterial = (materialToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter(material => material !== materialToRemove)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  // تحسين معالجة الفيديوهات وإضافة رسائل خطأ واضحة
  const handleFiles = (files: File[]) => {
    const validFiles: File[] = [];
    const errorsArr: string[] = [];

    files.forEach(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      // التحقق من نوع الملف
      if (!isImage && !isVideo) {
        errorsArr.push(`${file.name}: نوع الملف غير مدعوم`);
        return;
      }

      // التحقق من حجم الملف (50MB للفيديو، 10MB للصور)
      const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        const maxSizeMB = isVideo ? '50' : '10';
        errorsArr.push(`${file.name}: حجم الملف (${sizeMB}MB) أكبر من المسموح (${maxSizeMB}MB)`);
        return;
      }

      // التحقق من أنواع الفيديو المدعومة
      if (isVideo) {
        const supportedVideoTypes = [
          'video/mp4',
          'video/webm',
          'video/mov',
          'video/avi',
          'video/quicktime', // للملفات .mov
          'video/x-msvideo'  // للملفات .avi
        ];
        if (!supportedVideoTypes.includes(file.type)) {
          console.log('نوع الفيديو:', file.type, 'غير مدعوم');
          errorsArr.push(`${file.name}: نوع الفيديو غير مدعوم. الأنواع المدعومة: MP4, WebM, MOV, AVI`);
          return;
        }
        console.log('فيديو مقبول:', file.name, 'نوع:', file.type);
      }

      validFiles.push(file);
    });

    // عرض الأخطاء إن وجدت
    if (errorsArr.length > 0) {
      setErrors(prev => ({
        ...prev,
        files: errorsArr.join('\n')
      }));

      // مسح رسالة الخطأ بعد 5 ثواني
      setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.files;
          return newErrors;
        });
      }, 5000);
    }

    if (validFiles.length === 0) return;

    const newMediaFiles: MediaFile[] = validFiles.map(file => {
      const preview = URL.createObjectURL(file);
      const type = file.type.startsWith('image/') ? 'IMAGE' : 'VIDEO';

      console.log('إنشاء معاينة للملف:', {
        name: file.name,
        type: file.type,
        mediaType: type,
        preview: preview,
        size: file.size
      });

      return {
        id: Math.random().toString(36).substring(7),
        file,
        preview,
        type
      };
    });

    setMediaFiles(prev => [...prev, ...newMediaFiles]);
  };

  const removeMediaFile = (id: string) => {
    setMediaFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const uploadMediaFiles = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const mediaFile of mediaFiles) {
      if (mediaFile.uploaded && mediaFile.url) {
        uploadedUrls.push(mediaFile.url);
        continue;
      }

      const formData = new FormData();
      formData.append('file', mediaFile.file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);

          // تحديث حالة الملف
          setMediaFiles(prev => prev.map(f =>
            f.id === mediaFile.id
              ? { ...f, uploaded: true, url: data.url }
              : f
          ));
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    return uploadedUrls;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'عنوان المشروع مطلوب';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف المشروع مطلوب';
    }

    if (!formData.category) {
      newErrors.category = 'فئة المشروع مطلوبة';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'موقع المشروع مطلوب';
    }

    if (!formData.completionDate) {
      newErrors.completionDate = 'تاريخ إكمال المشروع مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // رفع الملفات أولاً
      const mediaUrls = await uploadMediaFiles();

      // إنشاء بيانات المشروع متطابقة مع API
      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        location: formData.location.trim(),
        completionDate: formData.completionDate,
        client: formData.client.trim() || null,
        featured: formData.featured,
        projectDuration: formData.projectDuration.trim() || null,
        projectCost: formData.projectCost.trim() || null,
        mediaItems: mediaUrls.map((url, index) => ({
          type: mediaFiles[index]?.type || 'IMAGE',
          src: url,
          title: `${formData.title} - صورة ${index + 1}`,
          order: index
        })),
        tags: formData.tags,
        materials: formData.materials
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('تم إضافة المشروع بنجاح! سيتم توجيهك إلى قائمة المشاريع...');

        // توجيه المستخدم بعد 2 ثانية
        setTimeout(() => {
          router.push('/dashboard/projects');
        }, 2000);
      } else {
        setErrors({ general: result.error || 'حدث خطأ في حفظ المشروع' });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setErrors({ general: 'حدث خطأ في الاتصال بالخادم' });
    } finally {
      setIsSaving(false);
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
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard/projects')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                العودة للمشاريع
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                إضافة مشروع جديد
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* رسائل النجاح والخطأ */}
      {successMessage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800">{successMessage}</span>
          </div>
        </div>
      )}

      {errors.general && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800">{errors.general}</span>
          </div>
        </div>
      )}

      {/* رسائل خطأ رفع الملفات */}
      {errors.files && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 whitespace-pre-line">
            <AlertCircle className="h-5 w-5 text-red-600 mt-1" />
            <span className="text-red-800">{errors.files}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* معلومات أساسية */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>المعلومات الأساسية</CardTitle>
            <CardDescription>أدخل المعلومات الأساسية للمشروع</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان المشروع *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="مثال: مظلة حديقة فيلا الرياض"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الفئة *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">اختر الفئة</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {categoryNames[category]}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الموقع *</label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="مثال: جدة - حي النهضة"
                  className={errors.location ? 'border-red-500' : ''}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">تاريخ الإكمال *</label>
                <Input
                  type="date"
                  value={formData.completionDate}
                  onChange={(e) => handleInputChange('completionDate', e.target.value)}
                  className={errors.completionDate ? 'border-red-500' : ''}
                />
                {errors.completionDate && <p className="text-red-500 text-sm mt-1">{errors.completionDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">اسم العميل</label>
                <Input
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  placeholder="اختياري"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">مدة المشروع</label>
                <Input
                  value={formData.projectDuration}
                  onChange={(e) => handleInputChange('projectDuration', e.target.value)}
                  placeholder="مثال: 30 يوم"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">التكلفة التقريبية</label>
                <Input
                  value={formData.projectCost}
                  onChange={(e) => handleInputChange('projectCost', e.target.value)}
                  placeholder="مثال: 50,000 ريال"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  مشروع مميز (سيظهر في المقدمة)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">وصف المشروع *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="اكتب وصفاً شاملاً للمشروع..."
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </CardContent>
        </Card>

        {/* الكلمات المفتاحية والمواد */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>تفاصيل إضافية</CardTitle>
            <CardDescription>أضف الكلمات المفتاحية والمواد المستخدمة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* الكلمات المفتاحية */}
            <div>
              <label className="block text-sm font-medium mb-2">الكلمات المفتاحية</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="أضف كلمة مفتاحية"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* المواد المستخدمة */}
            <div>
              <label className="block text-sm font-medium mb-2">المواد المستخدمة</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={currentMaterial}
                  onChange={(e) => setCurrentMaterial(e.target.value)}
                  placeholder="أضف مادة مستخدمة"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                />
                <Button type="button" onClick={addMaterial} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.materials.map((material, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {material}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeMaterial(material)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* رفع الملفات */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>صور وفيديوهات المشروع</CardTitle>
            <CardDescription>ارفع الصور والفيديوهات التي توضح المشروع</CardDescription>
          </CardHeader>
          <CardContent>
            {/* منطقة رفع الملفات */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                اسحب الملفات هنا أو اضغط للاختيار
              </p>
              <p className="text-sm text-gray-500 mb-4">
                يمكنك رفع الصور (JPG, PNG) والفيديوهات (MP4, MOV, WebM, AVI) بحد أقصى 10MB للصورة و50MB للفيديو
              </p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileInput}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload">
                <Button type="button" asChild>
                  <span>اختيار الملفات</span>
                </Button>
              </label>
            </div>

            {/* معاينة الملفات المرفوعة */}
            {mediaFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-4">الملفات المرفوعة ({mediaFiles.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mediaFiles.map((file) => (
                    <div key={file.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        {file.type === 'IMAGE' ? (
                          <img
                            src={file.preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          // معاينة الفيديو
                          <div className="relative w-full h-full bg-gray-800">
                            <video
                              src={file.preview}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                              onError={(e) => {
                                console.log('خطأ في تحميل الفيديو:', e);
                                // إظهار رسالة خطأ أو صورة بديلة
                              }}
                              onLoadedData={() => {
                                console.log('تم تحميل الفيديو بنجاح');
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
                              <source src={file.preview} type={file.file.type} />
                              متصفحك لا يدعم تشغيل الفيديو
                            </video>
                            {/* طبقة علوية مع أيقونة الفيديو */}
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center pointer-events-none">
                              <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
                                <Video className="h-8 w-8 text-gray-700" />
                              </div>
                            </div>
                            {/* مؤشر المدة إذا كان متاحاً */}
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              فيديو
                            </div>
                          </div>
                        )}
                      </div>

                      {/* زر الحذف */}
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeMediaFile(file.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>

                      {/* مؤشر الرفع */}
                      {file.uploaded && (
                        <div className="absolute bottom-2 left-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      )}

                      {/* تسمية نوع الملف */}
                      <div className="absolute bottom-2 right-2">
                        <Badge
                          variant={file.type === 'IMAGE' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {file.type === 'IMAGE' ? 'صورة' : 'فيديو'}
                        </Badge>
                      </div>

                      {/* معلومات إضافية عن الملف */}
                      <div className="mt-2 text-xs text-gray-600 text-center">
                        <div className="truncate">{file.file.name}</div>
                        <div>{(file.file.size / 1024 / 1024).toFixed(1)} MB</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* أزرار الحفظ */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/projects')}
            disabled={isSaving}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                حفظ المشروع
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
