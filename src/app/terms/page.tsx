import type { Metadata } from 'next'
import { FileText, Scale, Handshake, AlertTriangle, CheckCircle, Shield, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'شروط الخدمة | مؤسسة الديار العالمية - الشروط والأحكام',
  description: 'شروط وأحكام الخدمة لمؤسسة الديار العالمية. تعرف على الشروط والأحكام التي تحكم استخدام خدماتنا.',
  openGraph: {
    title: 'شروط الخدمة | مؤسسة الديار العالمية',
    description: 'شروط وأحكام الخدمة لمؤسسة الديار العالمية. تعرف على الشروط والأحكام التي تحكم استخدام خدماتنا.',
    type: 'website',
    locale: 'ar_SA'
  }
}

const keyTerms = [
  {
    title: 'الشفافية',
    description: 'جميع الشروط والأحكام واضحة ومفهومة',
    icon: FileText
  },
  {
    title: 'العدالة',
    description: 'شروط عادلة ومتوازنة لجميع الأطراف',
    icon: Scale
  },
  {
    title: 'الالتزام',
    description: 'نلتزم بجميع الشروط والقوانين المعمول بها',
    icon: Handshake
  },
  {
    title: 'الحماية',
    description: 'حماية حقوق جميع الأطراف وضمان المصالح',
    icon: Shield
  }
];

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-primary font-medium">شروط الخدمة</span>
            </nav>

            <Scale className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              شروط الخدمة
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              الشروط والأحكام التي تحكم استخدام خدمات مؤسسة الديار العالمية
            </p>
            <div className="mt-8 text-sm text-gray-500">
              آخر تحديث: ديسمبر 2024
            </div>
          </div>
        </section>

        {/* Key Terms */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyTerms.map((term, index) => (
                <div key={index} className="text-center">
                  <term.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{term.title}</h3>
                  <p className="text-gray-600 text-sm">{term.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-8">

              {/* مقدمة */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 text-primary mr-3" />
                  مقدمة
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  مرحباً بكم في موقع مؤسسة الديار العالمية. هذه الشروط والأحكام ("الشروط") تحكم استخدامكم لموقعنا الإلكتروني
                  وخدماتنا المقدمة من قبل مؤسسة الديار العالمية ("نحن"، "لنا"، "الشركة").
                  باستخدام خدماتنا، فإنكم توافقون على الالتزام بهذه الشروط والأحكام.
                </p>
              </div>

              {/* قبول الشروط */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 text-primary mr-3" />
                  قبول الشروط
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  من خلال الوصول إلى موقعنا الإلكتروني أو استخدام خدماتنا، فإنك توافق على:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>الالتزام بجميع الشروط والأحكام المذكورة هنا</li>
                  <li>احترام حقوق الملكية الفكرية الخاصة بنا</li>
                  <li>استخدام خدماتنا بطريقة قانونية ومناسبة</li>
                  <li>تقديم معلومات صحيحة ودقيقة</li>
                </ul>
              </div>

              {/* وصف الخدمات */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Handshake className="w-6 h-6 text-primary mr-3" />
                  وصف الخدمات
                </h2>
                <p className="text-gray-700 mb-4">نقدم الخدمات التالية:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>تصميم وتركيب المظلات بجميع أنواعها</li>
                  <li>تركيب السواتر الخصوصية والحمايه</li>
                  <li>إنشاء البرجولات والهناجر</li>
                  <li>تركيب الخيام الملكية</li>
                  <li>بناء بيوت الشعر التراثية</li>
                  <li>تركيب ساندوتش بانل</li>
                  <li>تنسيق الحدائق والمساحات الخضراء</li>
                  <li>ترميم الملحقات والمباني</li>
                </ul>
              </div>

              {/* التزامات العميل */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-primary mr-3" />
                  التزامات العميل
                </h2>
                <p className="text-gray-700 mb-4">يلتزم العميل بما يلي:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>تقديم معلومات صحيحة ودقيقة عن المشروع والموقع</li>
                  <li>الحصول على التراخيص اللازمة إن وجدت</li>
                  <li>توفير الوصول الآمن لموقع العمل</li>
                  <li>سداد المستحقات في المواعيد المحددة</li>
                  <li>إخلاء الموقع من أي عوائق قد تؤثر على العمل</li>
                  <li>التواصل الفعال مع فريق العمل</li>
                </ul>
              </div>

              {/* التزامات الشركة */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 text-primary mr-3" />
                  التزامات الشركة
                </h2>
                <p className="text-gray-700 mb-4">نلتزم بما يلي:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>تنفيذ الأعمال وفقاً للمواصفات المتفق عليها</li>
                  <li>استخدام مواد عالية الجودة ومطابقة للمعايير</li>
                  <li>الالتزام بالمواعيد المحددة للتسليم</li>
                  <li>توفير فريق عمل مؤهل ومدرب</li>
                  <li>ضمان الأعمال المنجزة لفترة محددة</li>
                  <li>المحافظة على نظافة وأمان موقع العمل</li>
                </ul>
              </div>

              {/* الأسعار والدفع */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 text-primary mr-3" />
                  الأسعار والدفع
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">الأسعار:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                      <li>جميع الأسعار المعروضة تشمل ضريبة القيمة المضافة</li>
                      <li>الأسعار قابلة للتغيير دون إشعار مسبق</li>
                      <li>السعر النهائي يحدد بعد المعاينة والاتفاق</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">شروط الدفع:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                      <li>دفع مقدم 50% عند توقيع العقد</li>
                      <li>دفع 30% عند بداية التنفيذ</li>
                      <li>دفع 20% عند الانتهاء والتسليم</li>
                      <li>طرق الدفع المقبولة: نقد، تحويل بنكي، شيك</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* المواعيد والتسليم */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 text-primary mr-3" />
                  المواعيد والتسليم
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>نلتزم بالمواعيد المحددة في العقد</li>
                  <li>في حالة التأخير لأسباب خارجة عن سيطرتنا، سنقوم بإشعار العميل فوراً</li>
                  <li>الظروف الجوية السيئة قد تؤثر على مواعيد التسليم</li>
                  <li>تسليم المشروع يتم بعد الفحص والموافقة النهائية</li>
                </ul>
              </div>

              {/* الضمان */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 text-primary mr-3" />
                  الضمان
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700">نقدم ضمان شامل على جميع أعمالنا:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                    <li>ضمان 5 سنوات على الهيكل الأساسي</li>
                    <li>ضمان 3 سنوات على المواد والتشطيبات</li>
                    <li>ضمان سنة واحدة على أعمال الصيانة</li>
                    <li>الضمان لا يشمل الأضرار الناتجة عن سوء الاستخدام</li>
                    <li>الضمان لا يشمل الكوارث الطبيعية</li>
                  </ul>
                </div>
              </div>

              {/* الإلغاء والاستردادل */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-primary mr-3" />
                  الإلغاء والاسترداد
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">إلغاء العميل:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                      <li>يمكن الإلغاء قبل بداية التنفيذ مع خصم 20% رسوم إدارية</li>
                      <li>بعد بداية التنفيذ: يحاسب العميل على التكاليف المتكبدة</li>
                      <li>لا يمكن الإلغاء بعد إنجاز 70% من المشروع</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">إلغاء الشركة:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                      <li>نحتفظ بحق إلغاء المشروع في حالة عدم سداد المستحقات</li>
                      <li>في حالة استحالة تنفيذ المشروع لأسباب فنية</li>
                      <li>في حالة عدم التزام العميل بالشروط المتفق عليها</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* المسؤولية */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Scale className="w-6 h-6 text-primary mr-3" />
                  المسؤولية
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>نحن مسؤولون عن جودة العمل والمواد المستخدمة</li>
                  <li>لسنا مسؤولين عن الأضرار الناتجة عن سوء الاستخدام</li>
                  <li>لسنا مسؤولين عن التأخير بسبب الظروف الجوية أو القوة القاهرة</li>
                  <li>مسؤوليتنا محدودة بقيمة المشروع المتفق عليها</li>
                </ul>
              </div>

              {/* حل النزاعات */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Handshake className="w-6 h-6 text-primary mr-3" />
                  حل النزاعات
                </h2>
                <p className="text-gray-700 mb-4">
                  في حالة نشوء أي نزاع، نلتزم بالإجراءات التالية:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
                  <li>محاولة الحل الودي من خلال التفاوض المباشر</li>
                  <li>اللجوء إلى الوساطة إذا لزم الأمر</li>
                  <li>في حالة فشل الحل الودي، يتم اللجوء للمحاكم السعودية</li>
                  <li>القانون السعودي هو المرجع في جميع النزاعات</li>
                </ul>
              </div>

              {/* تعديل الشروط */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 text-primary mr-3" />
                  تعديل الشروط
                </h2>
                <p className="text-gray-700">
                  نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار العملاء بأي تغييرات جوهرية
                  قبل 30 يوماً من دخولها حيز التنفيذ. استمرار استخدام خدماتنا بعد التعديل يعني موافقتك على الشروط الجديدة.
                </p>
              </div>

              {/* معلومات التواصل */}
              <div className="bg-primary/5 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">معلومات التواصل</h2>
                <p className="text-gray-700 mb-4">
                  لأي استفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>البريد الإلكتروني:</strong> legal@aldeyar-jeddah.com</p>
                  <p><strong>الهاتف:</strong> +966 55 371 9009</p>
                  <p><strong>العنوان:</strong> جدة، المملكة العربية السعودية</p>
                  <p><strong>ساعات العمل:</strong> الأحد - الخميس: 8:00 ص - 6:00 م</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
import type { Metadata } from 'next'
import { FileText, Users, Shield, AlertCircle, CheckCircle, Scale } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'شروط الخدمة | مؤسسة الديار العالمية - اتفاقية الاستخدام',
  description: 'شروط وأحكام استخدام خدمات مؤسسة الديار العالمية. تعرف على حقوقك وواجباتك عند التعامل معنا.',
  openGraph: {
    title: 'شروط الخدمة | مؤسسة الديار العالمية',
    description: 'شروط وأحكام استخدام خدمات مؤسسة الديار العالمية',
    url: 'https://aldeyarksa.tech/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background to-accent/5">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <Scale className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                شروط الخدمة
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا
              </p>
              <div className="text-sm text-muted-foreground mt-4">
                تاريخ آخر تحديث: 1 ديسمبر 2024
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
              {/* قبول الشروط */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-foreground">1. قبول الشروط</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    باستخدام موقعنا الإلكتروني أو طلب خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
                    إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.
                  </p>
                </div>
              </section>

              {/* الخدمات المقدمة */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-foreground">2. الخدمات المقدمة</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>نقدم الخدمات التالية:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>تصميم وتركيب مظلات السيارات</li>
                    <li>تصميم وتنفيذ برجولات الحدائق</li>
                    <li>تركيب سواتر الخصوصية</li>
                    <li>تركيب ألواح الساندوتش بانل</li>
                    <li>ترميم وصيانة الملحقات</li>
                    <li>تنسيق الحدائق والمساحات الخضراء</li>
                    <li>بناء بيوت الشعر التراثية</li>
                    <li>تأجير الخيام الملكية للمناسبات</li>
                  </ul>
                </div>
              </section>

              {/* التزامات العميل */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-foreground">3. التزامات العميل</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">تقديم معلومات دقيقة</h3>
                    <p>يلتزم العميل بتقديم معلومات صحيحة ودقيقة عن المشروع والموقع المطلوب تنفيذ الخدمة فيه.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">إتاحة الموقع</h3>
                    <p>يجب على العميل إتاحة الموقع للفريق التقني في الأوقات المتفق عليها.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">السداد</h3>
                    <p>الالتزام بجدول الدفعات المتفق عليه في العقد.</p>
                  </div>
                </div>
              </section>

              {/* الأسعار والدفع */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-foreground">4. الأسعار والدفع</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">الأسعار</h3>
                    <p>الأسعار المعروضة على الموقع استرشادية وقابلة للتغيير. السعر النهائي يحدد بعد الكشف والمعاينة.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">طرق الدفع</h3>
                    <p>نقبل الدفع نقداً، أو بالتحويل البنكي، أو بالتقسيط حسب الاتفاق.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">الضرائب</h3>
                    <p>جميع الأسعار تشمل ضريبة القيمة المضافة 15%.</p>
                  </div>
                </div>
              </section>

              {/* الضمانات */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-foreground">5. الضمانات</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>نقدم ضمانات متنوعة حسب نوع الخدمة:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>ضمان التركيب: سنة واحدة</li>
                    <li>ضمان المواد: حسب نوع المادة (3-10 سنوات)</li>
                    <li>ضمان الصيانة: 6 أشهر على أعمال الصيانة</li>
                  </ul>
                </div>
              </section>

              {/* المسؤولية */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-foreground">6. حدود المسؤولية</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    مسؤوليتنا محدودة بقيمة الخدمة المقدمة. لا نتحمل مسؤولية الأضرار غير المباشرة أو 
                    الأضرار الناتجة عن سوء الاستخدام أو عدم اتباع تعليمات الصيانة.
                  </p>
                </div>
              </section>

              {/* إلغاء الخدمة */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-foreground">7. إلغاء الخدمة</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">إلغاء من قبل العميل</h3>
                    <p>يمكن إلغاء الخدمة قبل بدء التنفيذ بـ 48 ساعة دون رسوم. بعد بدء التنفيذ، يتم تحصيل رسوم بحسب المراحل المنجزة.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">إلغاء من جانبنا</h3>
                    <p>نحتفظ بحق إلغاء الخدمة في حالة عدم التزام العميل بالشروط المتفق عليها.</p>
                  </div>
                </div>
              </section>

              {/* القانون المعمول به */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-foreground">8. القانون المعمول به</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية. 
                    أي نزاع ينشأ عن هذه الاتفاقية يحل عبر المحاكم المختصة في جدة.
                  </p>
                </div>
              </section>

              {/* تعديل الشروط */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-foreground">9. تعديل الشروط</h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    نحتفظ بحق تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار العملاء بأي تغييرات 
                    من خلال الموقع الإلكتروني أو البريد الإلكتروني.
                  </p>
                </div>
              </section>

              {/* معلومات الاتصال */}
              <section className="bg-accent/5 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">معلومات الاتصال</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>للاستفسارات حول هذه الشروط والأحكام، يمكنك التواصل معنا:</p>
                  <ul className="list-none space-y-2">
                    <li><strong>الهاتف:</strong> +966 12 123 4567</li>
                    <li><strong>البريد الإلكتروني:</strong> info@aldeyarksa.tech</li>
                    <li><strong>العنوان:</strong> جدة، المملكة العربية السعودية</li>
                  </ul>
                </div>
              </section>
            </div>

            {/* روابط ذات صلة */}
            <div className="text-center mt-12">
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/privacy"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  سياسة الخصوصية
                </Link>
                <Link
                  href="/contact"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  اتصل بنا
                </Link>
                <Link
                  href="/"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
