import { v2 as cloudinary } from 'cloudinary';

// تكوين Cloudinary
const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'demo'
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary configured successfully with cloud:', process.env.CLOUDINARY_CLOUD_NAME);
} else {
  console.log('⚠️ Cloudinary not configured. Using local fallback mode.');
  console.log('📋 Environment variables status:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'missing',
    api_key: process.env.CLOUDINARY_API_KEY ? 'configured' : 'missing',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'configured' : 'missing'
  });
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  resource_type: 'image' | 'video' | 'raw';
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
  created_at: string;
}

/**
 * رفع ملف إلى Cloudinary
 */
export async function uploadToCloudinary(
  file: File,
  options: {
    folder?: string;
    public_id?: string;
    resource_type?: 'auto' | 'image' | 'video' | 'raw';
    transformation?: any;
  } = {}
): Promise<CloudinaryUploadResult> {
  // التحقق من إعداد Cloudinary
  if (!isCloudinaryConfigured) {
    throw new Error('Cloudinary غير مُعَدّ. يرجى إضافة بيانات الاعتماد في ملف .env');
  }

  try {
    // التحقق من صحة الملف أولاً
    if (!file || file.size === 0) {
      throw new Error('الملف فارغ أو غير صالح');
    }

    // تحويل File إلى Buffer مع معالجة الأخطاء
    let buffer: Buffer;
    try {
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
      
      if (buffer.length === 0) {
        throw new Error('فشل في قراءة محتوى الملف');
      }
    } catch (error) {
      throw new Error(`فشل في معالجة الملف: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
    }

    // تحديد نوع الملف مع فحص أعمق
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    
    if (!isVideo && !isImage) {
      throw new Error(`نوع الملف غير مدعوم: ${file.type}`);
    }

    const defaultOptions = {
      folder: options.folder || 'portfolio',
      resource_type: options.resource_type || (isVideo ? 'video' : isImage ? 'image' : 'auto'),
      public_id: options.public_id,
      transformation: options.transformation || (isVideo ? {
        // تحسينات للفيديو
        quality: 'auto',
        fetch_format: 'auto',
        width: 1280,
        height: 720,
        crop: 'limit', // لا يقطع، فقط يقلل إذا كان أكبر
        bit_rate: '1m', // 1 Mbps للحجم المعقول
      } : {
        // تحسينات للصور
        quality: 'auto',
        fetch_format: 'auto',
        flags: 'progressive',
      }),
      // إعدادات إضافية
      overwrite: true,
      invalidate: true,
      // إعدادات خاصة بالفيديو
      ...(isVideo && {
        chunk_size: 6000000, // 6MB chunks for large videos
        timeout: 120000, // 2 minutes timeout for videos
      }),
      ...options
    };

    console.log('🚀 رفع ملف إلى Cloudinary:', {
      name: file.name,
      type: file.type,
      size: file.size,
      folder: defaultOptions.folder,
      resource_type: defaultOptions.resource_type,
      sizeInMB: (file.size / 1024 / 1024).toFixed(2) + 'MB'
    });

    // رفع الملف
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        defaultOptions,
        (error, result) => {
          if (error) {
            console.error('❌ خطأ في رفع Cloudinary:', error);
            reject(error);
          } else if (result) {
            console.log('✅ تم رفع الملف بنجاح:', {
              url: result.secure_url,
              public_id: result.public_id,
              resource_type: result.resource_type,
              bytes: result.bytes
            });
            
            // التحقق من صحة النتيجة
            if (!result.secure_url) {
              reject(new Error('لم يتم إرجاع رابط آمن من Cloudinary'));
              return;
            }
            
            resolve(result as CloudinaryUploadResult);
          } else {
            reject(new Error('لم يتم إرجاع نتيجة من Cloudinary'));
          }
        }
      ).end(buffer);
    });

    return result;
  } catch (error) {
    console.error('❌ خطأ في رفع الملف:', error);

    // رسائل خطأ مخصصة حسب نوع الخطأ
    let errorMessage = 'خطأ غير معروف';

    if (error instanceof Error) {
      if (error.message.includes('Invalid cloud_name')) {
        errorMessage = 'اسم Cloud غير صحيح في إعدادات Cloudinary';
      } else if (error.message.includes('Invalid API key')) {
        errorMessage = 'API Key غير صحيح في إعدادات Cloudinary';
      } else if (error.message.includes('file size')) {
        errorMessage = 'حجم الملف كبير جداً. الحد الأقصى للفيديو 100MB';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'انتهت مهلة رفع الملف. جرب ملف أصغر';
      } else if (isVideo && error.message.includes('resource_type')) {
        errorMessage = 'نوع الفيديو غير مدعوم. جرب MP4';
      } else {
        errorMessage = error.message;
      }
    }

    throw new Error(`فشل في رفع الملف: ${errorMessage}`);
  }
}

/**
 * حذف ملف من Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<any> {
  try {
    console.log('🗑️ حذف ملف من Cloudinary:', publicId);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true
    });

    console.log('✅ تم حذف الملف:', result);
    return result;
  } catch (error) {
    console.error('❌ خطأ في حذف الملف:', error);
    throw error;
  }
}

/**
 * الحصول على رابط محسن للصورة
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    quality: options.quality || 'auto',
    fetch_format: options.format || 'auto',
    width: options.width,
    height: options.height,
    crop: options.crop || 'fill',
    flags: 'progressive',
    ...options
  });
}

/**
 * الحصول على رابط محسن للفيديو
 */
export function getOptimizedVideoUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    quality: options.quality || 'auto',
    fetch_format: options.format || 'auto',
    width: options.width,
    height: options.height,
    ...options
  });
}

/**
 * إنشاء thumbnail للفيديو
 */
export function getVideoThumbnail(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    start_offset?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'jpg',
    quality: 'auto',
    width: options.width || 300,
    height: options.height || 200,
    crop: 'fill',
    start_offset: options.start_offset || '0',
    ...options
  });
}

/**
 * تحسين الصورة تلقائياً حسب الاستخدام
 */
export function getResponsiveImageUrl(
  publicId: string,
  usage: 'thumbnail' | 'card' | 'hero' | 'gallery' = 'card'
): string {
  const configs = {
    thumbnail: { width: 150, height: 150, crop: 'thumb', gravity: 'face' },
    card: { width: 400, height: 300, crop: 'fill' },
    hero: { width: 1200, height: 600, crop: 'fill' },
    gallery: { width: 800, height: 600, crop: 'fill' }
  };

  const config = configs[usage];
  
  return cloudinary.url(publicId, {
    ...config,
    quality: 'auto',
    fetch_format: 'auto',
    flags: 'progressive',
    dpr: 'auto'
  });
}

/**
 * إنشاء مجموعة من الصور بأحجام مختلفة (responsive images)
 */
export function getImageSrcSet(publicId: string): string {
  const sizes = [320, 640, 768, 1024, 1280, 1920];
  
  return sizes.map(size => {
    const url = cloudinary.url(publicId, {
      width: size,
      quality: 'auto',
      fetch_format: 'auto',
      flags: 'progressive'
    });
    return `${url} ${size}w`;
  }).join(', ');
}

/**
 * تحقق من صحة رابط Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}

/**
 * استخراج معرف العام من رابط Cloudinary
 */
export function extractPublicIdFromUrl(url: string): string | null {
  if (!isCloudinaryUrl(url)) return null;
  
  const matches = url.match(/\/(?:image|video)\/upload\/(?:v\d+\/)?(.+?)(?:\.|$)/);
  return matches ? matches[1].split('.')[0] : null;
}

export default cloudinary;
