# دليل إضافة المشاريع - معرض أعمال محترفين الديار العالمية

## الطرق المختلفة لإضافة مشروع جديد

### 1. عبر لوحة الإدارة (الواجهة المرئية)

#### الخطوات:
1. **تسجيل الدخول:**
   - انتقل إلى `/portfolio/admin`
   - ادخل بيانات المدير

2. **إضافة المشروع:**
   - اضغط "إضافة مشروع جديد"
   - املأ النموذج:
     ```
     العنوان: مظلة سيارات فيلا المهندس أحمد
     الوصف: تركيب مظلة سيارات بتصميم عصري...
     الفئة: مظلات سيارات
     الموقع: جدة - حي الشاطئ
     تاريخ الإنجاز: 2024-12-01
     العميل: المهندس أحمد محمد
     مدة التنفيذ: 3 أيام
     التكلفة: 15,000 ريال
     العلامات: مظلة، سيارات، حديثة
     المواد: حديد مجلفن، قماش PVC
     ```

3. **رفع الوسائط:**
   - اضغط على منطقة الرفع
   - اختر الصور/الفيديوهات
   - أو اسحب الملفات مباشرة

### 2. عبر API مباشرة

#### مثال على إضافة مشروع:

```javascript
// إضافة مشروع جديد
const newProject = {
  title: "مظلة سيارات فيلا المهندس أحمد",
  description: "تركيب مظلة سيارات عصرية بتصميم أنيق...",
  category: "مظلات سيارات",
  location: "جدة - حي الشاطئ",
  completionDate: "2024-12-01",
  client: "المهندس أحمد محمد",
  featured: false,
  projectDuration: "3 أيام",
  projectCost: "15,000 ريال",
  tags: ["مظلة", "سيارات", "حديثة"],
  materials: ["حديد مجلفن", "قماش PVC"],
  mediaItems: [
    {
      type: "IMAGE",
      src: "/uploads/mazallat-1.webp",
      title: "صورة المظلة النهائية",
      order: 0
    },
    {
      type: "IMAGE",
      src: "/uploads/mazallat-2.webp",
      title: "منظر جانبي للمظلة",
      order: 1
    }
  ]
};

// إرسال الطلب
fetch('/api/portfolio', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newProject)
});
```

### 3. البيانات المطلوبة

#### البيانات الأساسية:
- **العنوان** (title): نص وصفي
- **الوصف** (description): تفاصيل المشروع
- **الفئة** (category): من القائمة المحددة
- **الموقع** (location): المدينة والحي
- **تاريخ الإنجاز** (completionDate): بصيغة ISO
- **مدة التنفيذ** (projectDuration): نص حر
- **التكلفة** (projectCost): نص حر

#### البيانات الاختيارية:
- **العميل** (client): اسم العميل
- **مميز** (featured): true/false
- **العلامات** (tags): مصفوفة نصوص
- **المواد** (materials): مصفوفة نصوص
- **الوسائط** (mediaItems): صور وفيديوهات

### 4. الفئات المتاحة:
- مظلات سيارات
- برجولات
- ساندوتش بانل
- تنسيق حدائق
- سواتر
- خيام ملكية
- بيوت شعر

### 5. رفع الوسائط

#### الصور المدعومة:
- JPG, PNG, WebP
- حد أقصى: 10MB
- أبعاد موصى بها: 1920x1080

#### الفيديوهات المدعومة:
- MP4, WebM
- حد أقصى: 50MB
- مدة موصى بها: أقل من 2 دقيقة

### 6. نصائح للحصول على أفضل النتائج:

1. **الصور:**
   - استخدم صور عالية الجودة
   - اعرض زوايا مختلفة للمشروع
   - أضف صور قبل وبعد إذا أمكن

2. **النصوص:**
   - اكتب عنوان واضح ووصفي
   - استخدم وصف تفصيلي للمشروع
   - أضف الكلمات المفتاحية في العلامات

3. **التصنيف:**
   - اختر الفئة الصحيحة
   - استخدم مشروع مميز للأعمال الاستثنائية
   - أضف تفاصيل التكلفة والمدة بدقة
