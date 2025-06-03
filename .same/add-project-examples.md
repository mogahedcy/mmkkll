# أمثلة عملية لإضافة المشاريع

## 1. مثال على مشروع مظلة سيارات

```javascript
const mazallaProject = {
  title: "مظلة سيارات فيلا المهندس أحمد - حي الشاطئ",
  description: "تركيب مظلة سيارات عصرية بتصميم أنيق ومتين، تتسع لسيارتين بمساحة 6×8 متر، مصنوعة من أجود أنواع الحديد المجلفن المقاوم للصدأ وقماش PVC عالي الجودة المقاوم للعوامل الجوية. تم تنفيذ المشروع خلال 3 أيام عمل مع ضمان 5 سنوات.",
  category: "مظلات سيارات",
  location: "جدة - حي الشاطئ",
  completionDate: "2024-12-01",
  client: "المهندس أحمد محمد",
  featured: true,
  projectDuration: "3 أيام",
  projectCost: "15,000 ريال",
  tags: ["مظلة", "سيارات", "حديثة", "متينة", "ضمان"],
  materials: ["حديد مجلفن", "قماش PVC", "براغي ستانلس", "دهان إلكتروستاتيك"],
  mediaItems: [
    {
      type: "IMAGE",
      src: "/uploads/mazallat-1.webp",
      title: "صورة المظلة النهائية - منظر أمامي",
      description: "المظلة مركبة ومجهزة للاستخدام",
      order: 0
    },
    {
      type: "IMAGE",
      src: "/uploads/mazallat-2.webp",
      title: "منظر جانبي للمظلة",
      description: "يظهر التصميم الأنيق والهيكل المتين",
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
  body: JSON.stringify(mazallaProject)
})
.then(response => response.json())
.then(data => console.log('تم إضافة المشروع:', data))
.catch(error => console.error('خطأ:', error));
```

## 2. مثال على مشروع برجولا

```javascript
const pergolaProject = {
  title: "برجولا خشبية للحديقة - فيلا الأستاذ محمد",
  description: "تصميم وتنفيذ برجولا خشبية أنيقة بمساحة 4×6 متر لحديقة الفيلا، مصنوعة من خشب الصنوبر المعالج ضد الحشرات والرطوبة، مع إضاءة LED مدمجة وإمكانية تركيب نباتات متسلقة. تم تنفيذ العمل وفقاً لأعلى معايير الجودة.",
  category: "برجولات",
  location: "جدة - حي النعيم",
  completionDate: "2024-11-15",
  client: "الأستاذ محمد عبدالله",
  featured: false,
  projectDuration: "5 أيام",
  projectCost: "25,000 ريال",
  tags: ["برجولا", "خشب", "حديقة", "إضاءة", "طبيعي"],
  materials: ["خشب صنوبر معالج", "براغي ستانلس", "إضاءة LED", "مواد عزل", "دهان شفاف"],
  mediaItems: [
    {
      type: "IMAGE",
      src: "/uploads/pergola-1.jpg",
      title: "البرجولا مكتملة في الحديقة",
      order: 0
    },
    {
      type: "IMAGE",
      src: "/uploads/pergola-2.jpg",
      title: "تفاصيل الإضاءة والتصميم",
      order: 1
    }
  ]
};
```

## 3. مثال على مشروع ساندوتش بانل

```javascript
const sandwichPanelProject = {
  title: "واجهة ساندوتش بانل لمستودع تجاري",
  description: "تركيب واجهة ساندوتش بانل عازل للحرارة والصوت لمستودع تجاري بمساحة 200 متر مربع، باستخدام ألواح ساندوتش بانل عالية الجودة بسمك 10 سم، مع نظام تهوية متقدم وأبواب أوتوماتيكية. العمل منجز وفق المواصفات العالمية.",
  category: "ساندوتش بانل",
  location: "جدة - المنطقة الصناعية",
  completionDate: "2024-10-20",
  client: "شركة النور التجارية",
  featured: true,
  projectDuration: "10 أيام",
  projectCost: "80,000 ريال",
  tags: ["ساندوتش بانل", "عزل", "مستودع", "تجاري", "أوتوماتيك"],
  materials: ["ساندوتش بانل 10 سم", "هيكل حديدي", "أبواب أوتوماتيكية", "نظام تهوية", "مواد عزل إضافية"],
  mediaItems: [
    {
      type: "IMAGE",
      src: "/uploads/sandwich-panel-1.jpg",
      title: "الواجهة النهائية للمستودع",
      order: 0
    },
    {
      type: "IMAGE",
      src: "/uploads/sandwich-panel-2.jpg",
      title: "التفاصيل الداخلية والتشطيبات",
      order: 1
    }
  ]
};
```

## 4. مثال على مشروع تنسيق حدائق

```javascript
const landscapingProject = {
  title: "تنسيق وتجميل حديقة منزلية - فيلا العائلة الكريمة",
  description: "تصميم وتنفيذ مشروع تنسيق حدائق متكامل يشمل زراعة النباتات المحلية، تركيب نظام ري أوتوماتيكي، إنشاء ممرات حجرية، إضافة نافورة مياه، وتركيب إضاءة ليلية. المشروع يحول الحديقة إلى واحة خضراء جميلة ومتناسقة.",
  category: "تنسيق حدائق",
  location: "جدة - حي الفيحاء",
  completionDate: "2024-11-30",
  client: "عائلة الأستاذ سعد",
  featured: true,
  projectDuration: "15 يوم",
  projectCost: "45,000 ريال",
  tags: ["تنسيق", "حدائق", "نباتات", "نافورة", "إضاءة", "ري أوتوماتيكي"],
  materials: ["نباتات محلية", "نظام ري", "أحجار طبيعية", "نافورة مياه", "إضاءة LED", "تربة مخصبة"],
  mediaItems: [
    {
      type: "IMAGE",
      src: "/uploads/landscaping-1.webp",
      title: "الحديقة بعد التنسيق الكامل",
      order: 0
    }
  ]
};
```

## 5. كيفية إضافة المشاريع:

### عبر الكود:
```javascript
// دالة مساعدة لإضافة مشروع
async function addProject(projectData) {
  try {
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ تم إضافة المشروع بنجاح:', result.title);
      return result;
    } else {
      throw new Error('فشل في إضافة المشروع');
    }
  } catch (error) {
    console.error('❌ خطأ في إضافة المشروع:', error);
    throw error;
  }
}

// استخدام الدالة
addProject(mazallaProject);
```

### عبر واجهة الإدارة:
1. انتقل إلى `/portfolio/admin`
2. اضغط "إضافة مشروع جديد"
3. املأ النموذج
4. ارفع الصور
5. احفظ المشروع

### عبر الأداة المساعدة:
1. انتقل إلى `/portfolio/add`
2. استخدم النموذج التفاعلي
3. معاينة قبل الحفظ
4. حفظ المشروع

## 6. نصائح للحصول على أفضل النتائج:

### للصور:
- استخدم صور عالية الجودة (1920x1080 على الأقل)
- اعرض زوايا مختلفة للمشروع
- أضف صور قبل وبعد
- استخدم الإضاءة الطبيعية
- تأكد من وضوح التفاصيل

### للنصوص:
- اكتب عنوان واضح ووصفي
- استخدم وصف تفصيلي وشامل
- أضف الكلمات المفتاحية في العلامات
- اذكر المواد المستخدمة بدقة
- وضح مدة وتكلفة المشروع

### للتصنيف:
- اختر الفئة الصحيحة
- استخدم "مميز" للأعمال الاستثنائية فقط
- أضف علامات ذات صلة
- وضح تفاصيل الموقع بدقة
