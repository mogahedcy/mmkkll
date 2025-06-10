
'use client';

export default function cloudinaryLoader({ src, width, quality }) {
  // التحقق من أنواع الملفات المختلفة
  if (src.includes('.mp4') || src.includes('.webm') || src.includes('.mov')) {
    // للفيديو، نرجع الرابط كما هو
    return src;
  }
  
  // للصور، نستخدم التحسين
  const params = [`w_${width}`, `q_${quality || 'auto'}`, 'f_auto'];
  
  if (src.startsWith('https://res.cloudinary.com')) {
    return src.replace('/upload/', `/upload/${params.join(',')}/`);
  }
  
  return src;
}
