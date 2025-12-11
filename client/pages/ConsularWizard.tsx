import { useState } from "react";
import Layout from "@/components/Layout";
import { ChevronLeft, ChevronRight, Check, MapPin, FileText } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  idNumber: string;
  birthDate: string;
  nationality: string;
  phone: string;
  email: string;
  embassy: string;
  service: string;
  selectedDate: number | null;
  selectedTime: string;
  documents: {
    passportCopy: boolean;
    idCardCopy: boolean;
    personalPhotos: boolean;
    bankStatement: boolean;
    salaryLetter: boolean;
  };
  agreedToTerms: boolean;
  paymentMethod: string;
}

const initialFormData: FormData = {
  name: "",
  idNumber: "",
  birthDate: "",
  nationality: "",
  phone: "",
  email: "",
  embassy: "",
  service: "",
  selectedDate: null,
  selectedTime: "",
  documents: {
    passportCopy: true,
    idCardCopy: true,
    personalPhotos: false,
    bankStatement: false,
    salaryLetter: false,
  },
  agreedToTerms: false,
  paymentMethod: "",
};

export default function ConsularWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    "المملكة العربية السعودية",
    "دولة الإمارات",
    "الكويت",
    "البحرين",
    "قطر",
    "عمان",
    "المغرب",
    "الجزائر",
    "تونس",
    "مصر",
    "السودان",
    "الأردن",
    "لبنان",
    "فلسطين",
    "سوريا",
    "العراق",
    "اليمن",
    "جيبوتي",
    "الصومال",
    "موريتانيا",
    "باكستان",
    "بنغلاديش",
    "الهند",
    "إيران",
    "تركيا",
    "ماليزيا",
    "إندونيسيا",
    "سنغافورة",
    "تايلاند",
    "الفلبين",
    "فيتنام",
    "الصين",
    "اليابان",
    "كوريا الجنوبية",
    "كوريا الشمالية",
    "منغوليا",
    "روسيا",
    "أوكرانيا",
    "بيلاروسيا",
    "كازاخستان",
    "أوزبكستان",
    "تركمانستان",
    "طاجيكستان",
    "قيرغيزستان",
    "أفغانستان",
    "ألبانيا",
    "الجبل الأسود",
    "صربيا",
    "البوسنة والهرسك",
    "كرواتيا",
    "سلوفينيا",
    "ماقدونيا",
    "كوسوفو",
    "بولندا",
    "التشيك",
    "سلوفاكيا",
    "المجر",
    "رومانيا",
    "بلغاريا",
    "اليونان",
    "ألمانيا",
    "النمسا",
    "سويسرا",
    "فرنسا",
    "بلجيكا",
    "هولندا",
    "لوكسمبرج",
    "إيطاليا",
    "إسبانيا",
    "البرتغال",
    "الدنمارك",
    "السويد",
    "النرويج",
    "فنلندا",
    "أيسلندا",
    "إيرلندا",
    "المملكة المتحدة",
    "كندا",
    "الولايات المتحدة الأمريكية",
    "المكسيك",
    "غواتيمالا",
    "هندوراس",
    "السلفادور",
    "نيكاراغوا",
    "كوستاريكا",
    "بنما",
    "كوبا",
    "جمهورية الدومينيكان",
    "هايتي",
    "جامايكا",
    "بليز",
    "كولومبيا",
    "فنزويلا",
    "جيانا",
    "سورينام",
    "غيانا الفرنسية",
    "الإكوادور",
    "البيرو",
    "بوليفيا",
    "البرازيل",
    "باراغواي",
    "تشيلي",
    "الأرجنتين",
    "أوروغواي",
    "إثيوبيا",
    "إريتريا",
    "جنوب أفريقيا",
    "بوتسوانا",
    "ليسوتو",
    "إسواتيني",
    "ناميبيا",
    "أنغولا",
    "زامبيا",
    "زيمبابوي",
    "موزمبيق",
    "تنزانيا",
    "كينيا",
    "أوغندا",
    "رواندا",
    "بوروندي",
    "الكونغو الديمقراطية",
    "الكونغو",
    "جنوب السودان",
    "غانا",
    "نيجيريا",
    "الكاميرون",
    "غابون",
    "ساحل العاج",
    "السنغال",
    "مالي",
    "بوركينا فاسو",
    "النيجر",
    "تشاد",
    "ليبيا",
    "ليبيريا",
    "سيراليون",
    "غينيا",
    "غينيا بيساو",
    "أسترالياً",
    "نيوزيلندا",
    "فيجي",
    "سامोا",
    "جزر سليمان",
    "فانواتو",
    "بابوا غينيا الجديدة",
  ];

  const services = ["تأشيرة"];

  // Calendar data
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const availableDates = [1, 3, 4, 5, 6, 7, 9, 11, 12, 13, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27];
  const partiallyBusyDates = [2, 8, 10];
  const busyDates = [14, 15, 21, 22, 28, 29, 30];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 2:
        if (!formData.agreedToTerms) {
          newErrors.terms = "يجب الموافقة على الشروط والأحكام";
        }
        break;
      case 3:
        if (!formData.embassy) newErrors.embassy = "اختر السفارة";
        if (!formData.service) newErrors.service = "اختر الخدمة";
        break;
      case 4:
        if (!formData.selectedDate) newErrors.date = "اختر التاريخ";
        break;
      case 5:
        // Step 5 is optional - data will be auto-filled from Absher
        break;
      case 6:
        const hasAnyDocument = Object.values(formData.documents).some(value => value);
        if (!hasAnyDocument) {
          newErrors.documents = "يجب تأكيد تحميل المستندات المطلوبة";
        }
        break;
      case 7:
        // All data should be validated already
        break;
      case 8:
        if (!formData.paymentMethod) newErrors.payment = "اختر طريقة الدفع";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 9) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
        toast.success("تم حفظ البيانات بنجاح");
      }
    } else {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleDocumentChange = (doc: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [doc]: value,
      },
    }));
  };

  const StepIndicator = () => null;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <StepIndicator />

        {/* Step Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="animate-fadeIn text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-saudi-green/10 p-12 rounded-full">
                    <FileText className="w-24 h-24 text-saudi-green" />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  الخدمات القنصلية
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                  خدمة متخصصة لحجز مواعيد السفارات والقنصليات بكل سهولة وموثوقية
                </p>
                <p className="text-gray-600 max-w-2xl mx-auto mb-2">
                  من خلال هذا النظام يمكنك حجز موعد لإنجاز خدماتك القنصلية بكفاءة
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-2xl mx-auto mb-8 text-right">
                <p className="text-gray-700 leading-relaxed">
                  قبل البدء، تأكد من حصولك على المستندات المطلوبة حسب نوع
                  الخدمة التي تحتاجها. الخدمة متاحة للمواطنين والمقيمين
                  وفقاً للشروط المعمول بها.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Terms & Conditions */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                شروط الخدمة
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-saudi-green pb-3">
                    الشروط والأحكام
                  </h3>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <div className="flex gap-4">
                      <div className="text-saudi-green mt-1">✓</div>
                      <p>
                        تختلف المتطلبات والمستندات المطلوبة حسب كل دولة،
                        ويجب رفعها بشكل واضح لاتمام الحجز
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div className="text-saudi-green mt-1">✓</div>
                      <p>
                        تمكنك الخدمة من استعراض المواعيد السابقة وحالة
                        الطلبات الحالية
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div className="text-saudi-green mt-1">✓</div>
                      <p>
                        قد يتم تعديل أو إلغاء الموعد من قبل السفارة
                        مباشرة وفق سياساتها
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div className="text-saudi-green mt-1">✓</div>
                      <p>
                        <strong>يمكن التعديل أو الإلغاء</strong>
                        <br />
                        يحق لك تعديل أو إلغاء الموعد من خلال النظام وفقًا
                        لسياسات السفارة
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div className="text-saudi-green mt-1">✓</div>
                      <p>
                        <strong>الرسوم المطبقة</strong>
                        <br />
                        جميع الرسوم المعروضة تشمل رسوم الدولة والخدمة ولا
                        توجد رسوم إضافية
                      </p>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-saudi-green cursor-pointer transition bg-white">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) =>
                      handleInputChange("agreedToTerms", e.target.checked)
                    }
                    className="w-5 h-5 rounded cursor-pointer mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-700">
                    أوافق على جميع الشروط والأحكام وأتحمل المسؤولية عن صحة البيانات المدخلة
                  </span>
                </label>

                {errors.terms && (
                  <p className="text-red-500 text-sm text-center">{errors.terms}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Embassy & Service Selection */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                اختر السفارة والخدمة
              </h2>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    اختر السفارة*
                  </label>
                  <select
                    value={formData.embassy}
                    onChange={(e) => handleInputChange("embassy", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition text-right ${
                      errors.embassy
                        ? "border-red-500"
                        : "border-gray-200 focus:border-saudi-green"
                    }`}
                  >
                    <option value="">اختر دولة</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.embassy && (
                    <p className="mt-2 text-red-500 text-sm">{errors.embassy}</p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    نوع الخدمة المطلوبة*
                  </label>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {services.map((service) => (
                      <button
                        key={service}
                        onClick={() => handleInputChange("service", service)}
                        className={`px-8 py-3 border-2 rounded-full font-semibold transition-all ${
                          formData.service === service
                            ? "border-saudi-green bg-saudi-green text-white"
                            : "border-gray-300 text-gray-700 hover:border-saudi-green"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {errors.service && (
                    <p className="mt-2 text-red-500 text-sm">{errors.service}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Date Selection */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                اختر موعد مناسب
              </h2>

              <div className="space-y-6">
                {/* Best Time Suggestion */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <p className="text-center">
                    <span className="font-bold text-green-700 text-lg">أفضل موعد لك:</span>
                    <br />
                    <span className="text-green-600 text-sm">
                      التاريخ 3 - يوم الأربعاء (متاح وأقل ازدحاماً)
                    </span>
                  </p>
                </div>

                {/* Calendar */}
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["الأحد", "السبت", "الجمعة", "الخميس", "الأربعاء", "الثلاثاء", "الاثنين"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center font-semibold text-gray-600 py-2 text-xs md:text-sm"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day) => {
                      const isAvailable = availableDates.includes(day);
                      const isPartiallyBusy = partiallyBusyDates.includes(day);
                      const isBusy = busyDates.includes(day);
                      const isSelected = formData.selectedDate === day;

                      let bgColor = "bg-white border border-gray-200";
                      let textColor = "text-gray-900";

                      if (!isAvailable && !isPartiallyBusy && !isBusy) {
                        bgColor = "bg-gray-100 border border-gray-300";
                        textColor = "text-gray-400 cursor-not-allowed";
                      } else if (isBusy) {
                        bgColor = "bg-red-100 border border-red-300";
                        textColor = "text-red-700";
                      } else if (isPartiallyBusy) {
                        bgColor = "bg-yellow-100 border border-yellow-300 hover:bg-yellow-200";
                        textColor = "text-yellow-700 cursor-pointer";
                      } else if (isSelected) {
                        bgColor = "bg-saudi-green border-2 border-saudi-green";
                        textColor = "text-white";
                      } else if (isAvailable) {
                        bgColor = "bg-green-50 border border-green-300 hover:bg-green-100";
                        textColor = "text-green-700";
                      }

                      return (
                        <button
                          key={day}
                          onClick={() => {
                            if (!isBusy && (isAvailable || isPartiallyBusy)) {
                              handleInputChange("selectedDate", day);
                            }
                          }}
                          disabled={isBusy || (!isAvailable && !isPartiallyBusy)}
                          className={`p-2 md:p-3 rounded-lg transition font-semibold text-xs md:text-sm ${bgColor} ${textColor}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-50 border border-green-300 rounded"></div>
                      <span>متاح</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-100 border border-yellow-300 rounded"></div>
                      <span>ازدحام جزئي</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-100 border border-red-300 rounded"></div>
                      <span>مزدحم</span>
                    </div>
                  </div>
                </div>

                {/* Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700">
                    <strong>ملاحظة:</strong> سيتم حجز موعدك لأقرب فرع من السفارة بناءً على موقعك الجغرافي.
                  </p>
                  <a
                    href="#"
                    className="text-saudi-green font-semibold hover:underline flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    اعرض مواقع السفارات على الخريطة
                  </a>
                </div>

                {/* Time Selection */}
                {formData.selectedDate && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                      اختر الساعة المناسبة
                    </h3>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30"].map((time) => (
                          <button
                            key={time}
                            onClick={() => handleInputChange("selectedTime", time)}
                            className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                              formData.selectedTime === time
                                ? "bg-saudi-green text-white border-2 border-saudi-green"
                                : "border-2 border-gray-300 text-gray-700 hover:border-saudi-green hover:text-saudi-green"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {errors.date && (
                  <p className="text-red-500 text-sm text-center">{errors.date}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Personal Information */}
          {currentStep === 5 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                البيانات الشخصية
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <p className="text-gray-700">
                  <strong>ملاحظة:</strong> سيتم تعبئة هذه البيانات تلقائياً من نظام أبشر. يمكنك مراجعتها وتعديلها إن لزم الأمر، أو الانتقال للصفحة التالية مباشرة.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    الاسم الكامل*
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition text-right ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-200 focus:border-saudi-green"
                    }`}
                    placeholder="أدخل اسمك الكامل"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      رقم الهوية*
                    </label>
                    <input
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange("idNumber", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition text-right ${
                        errors.idNumber
                          ? "border-red-500"
                          : "border-gray-200 focus:border-saudi-green"
                      }`}
                      placeholder="114*******"
                    />
                    {errors.idNumber && (
                      <p className="mt-1 text-red-500 text-sm">{errors.idNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      تاريخ الميلاد*
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition text-right ${
                        errors.birthDate
                          ? "border-red-500"
                          : "border-gray-200 focus:border-saudi-green"
                      }`}
                    />
                    {errors.birthDate && (
                      <p className="mt-1 text-red-500 text-sm">{errors.birthDate}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      الجنسية*
                    </label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange("nationality", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition text-right ${
                        errors.nationality
                          ? "border-red-500"
                          : "border-gray-200 focus:border-saudi-green"
                      }`}
                      placeholder="السعودية"
                    />
                    {errors.nationality && (
                      <p className="mt-1 text-red-500 text-sm">{errors.nationality}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      رقم الهاتف*
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition text-right ${
                        errors.phone
                          ? "border-red-500"
                          : "border-gray-200 focus:border-saudi-green"
                      }`}
                      placeholder="0504404880"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    البريد الإلكتروني*
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition text-right ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-200 focus:border-saudi-green"
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Document Upload */}
          {currentStep === 6 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                المستندات المطلوبة
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">المستندات المطلوبة:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-center gap-3">
                      <span className="text-saudi-green">•</span>
                      <span>صورة من جواز السفر</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-saudi-green">•</span>
                      <span>صورة من بطاقة الاحوال</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-saudi-green">•</span>
                      <span>صور شخصية</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-saudi-green">•</span>
                      <span>كشف الحساب البنكي</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-saudi-green">•</span>
                      <span>خطاب تعريف بالراتب</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-sm text-gray-700">
                    <strong>ملاحظة:</strong> يجب رفع المستندات بصيغة PDF واضحة. قد تختلف المستندات المطلوبة حسب السفارة والخدمة.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-saudi-green cursor-pointer transition bg-white">
                    <input
                      type="checkbox"
                      checked={formData.documents.passportCopy}
                      onChange={(e) =>
                        handleDocumentChange("passportCopy", e.target.checked)
                      }
                      className="w-5 h-5 rounded cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">صورة من جواز السفر</p>
                      <p className="text-sm text-gray-600">PDF</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-saudi-green cursor-pointer transition bg-white">
                    <input
                      type="checkbox"
                      checked={formData.documents.idCardCopy}
                      onChange={(e) =>
                        handleDocumentChange("idCardCopy", e.target.checked)
                      }
                      className="w-5 h-5 rounded cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">صورة من بطاقة الاحوال</p>
                      <p className="text-sm text-gray-600">PDF</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-saudi-green cursor-pointer transition bg-white">
                    <input
                      type="checkbox"
                      checked={formData.documents.personalPhotos}
                      onChange={(e) =>
                        handleDocumentChange("personalPhotos", e.target.checked)
                      }
                      className="w-5 h-5 rounded cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">صور شخصية</p>
                      <p className="text-sm text-gray-600">PDF</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-saudi-green cursor-pointer transition bg-white">
                    <input
                      type="checkbox"
                      checked={formData.documents.bankStatement}
                      onChange={(e) =>
                        handleDocumentChange("bankStatement", e.target.checked)
                      }
                      className="w-5 h-5 rounded cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">كشف الحساب البنكي</p>
                      <p className="text-sm text-gray-600">PDF</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-saudi-green cursor-pointer transition bg-white">
                    <input
                      type="checkbox"
                      checked={formData.documents.salaryLetter}
                      onChange={(e) =>
                        handleDocumentChange("salaryLetter", e.target.checked)
                      }
                      className="w-5 h-5 rounded cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">خطاب تعريف بالراتب</p>
                      <p className="text-sm text-gray-600">PDF</p>
                    </div>
                  </label>
                </div>

                {errors.documents && (
                  <p className="text-red-500 text-sm">{errors.documents}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 7: Review */}
          {currentStep === 7 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                مراجعة البيانات
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b-2 border-saudi-green">
                    بيانات الموعد
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                    <div>
                      <p className="text-gray-600">السفارة</p>
                      <p className="font-bold">{formData.embassy}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">نوع الخدمة</p>
                      <p className="font-bold">{formData.service}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">التاريخ المختار</p>
                      <p className="font-bold">
                        {formData.selectedDate} من الشهر الهجري الحالي
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b-2 border-saudi-green">
                    البيانات الشخصية
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                    <div>
                      <p className="text-gray-600">الاسم</p>
                      <p className="font-bold">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">رقم الهوية</p>
                      <p className="font-bold">{formData.idNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">تاريخ الميلاد</p>
                      <p className="font-bold">{formData.birthDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">الجنسية</p>
                      <p className="font-bold">{formData.nationality}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">رقم الهاتف</p>
                      <p className="font-bold">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">البريد الإلكتروني</p>
                      <p className="font-bold">{formData.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-gray-700">
                    <strong>ملاحظة:</strong> سيتم تأكيد الموعد رسميًا من خلال نظام السفارات والقنصليات.
                    ستصل لك رسالة تأكيد على البريد الإلكتروني والهاتف.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Payment */}
          {currentStep === 8 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                الدفع
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">
                    ملخص الرسوم
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">رسوم الدولة</span>
                      <span className="font-bold text-gray-900">150 ريال</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">رسوم الخدمة</span>
                      <span className="font-bold text-gray-900">50 ريال</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">الإجمالي قبل الضريبة</span>
                      <span className="font-bold text-gray-900">200 ريال</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">ضريبة القيمة المضافة (15%)</span>
                      <span className="font-bold text-gray-900">30 ريال</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="font-bold text-lg">الإجمالي</span>
                      <span className="text-saudi-green font-bold text-2xl">230 ريال</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-sm text-gray-700">
                    <strong>ملاحظة:</strong> قد تختلف الرسوم حسب نوع الخدمة والسفارة المختارة.
                    الرسوم المعروضة شاملة لجميع الرسوم والضرائب.
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    اختر طريقة الدفع*
                  </label>
                  <div className="space-y-3">
                    {["بطاقة ائتمان", "Apple Pay", "محفظة رقمية"].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                          formData.paymentMethod === method
                            ? "border-saudi-green bg-saudi-green/5"
                            : "border-gray-200 hover:border-saudi-green bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === method}
                          onChange={() => handleInputChange("paymentMethod", method)}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <span className="font-semibold text-gray-900">
                          {method}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {errors.payment && (
                  <p className="text-red-500 text-sm">{errors.payment}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 9: Status */}
          {currentStep === 9 && (
            <div className="animate-fadeIn text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-saudi-green/10 p-12 rounded-full">
                    <Check className="w-24 h-24 text-saudi-green" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-saudi-green mb-4">
                  تم تأكيد الموعد بنجاح!
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  تم حفظ طلبك بنجاح وسيتم مراجعته من قبل السفارة خلال 24 ساعة
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl mx-auto mb-8">
                <h3 className="font-bold text-gray-900 mb-6 text-xl">
                  تفاصيل الموعد
                </h3>
                <div className="space-y-4 text-right">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">رقم الطلب</span>
                    <span className="font-bold text-gray-900">APT-2024-#001234</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">السفارة</span>
                    <span className="font-bold text-gray-900">{formData.embassy}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">الخدمة</span>
                    <span className="font-bold text-gray-900">{formData.service}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">التاريخ</span>
                    <span className="font-bold text-gray-900">
                      {formData.selectedDate} / شهر 6 / 1445 هـ
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-gray-600">الحالة</span>
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">
                      قيد المراجعة
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl mx-auto mb-8">
                <h3 className="font-bold text-gray-900 mb-6">حالة الطلب</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div className="text-right flex-1">
                      <p className="font-bold text-gray-900">قيد المراجعة</p>
                      <p className="text-sm text-gray-600">جاري فحص البيانات</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="text-right flex-1">
                      <p className="font-bold text-gray-900">مؤكد</p>
                      <p className="text-sm text-gray-600">جاري التنفيذ</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div className="text-right flex-1">
                      <p className="font-bold text-gray-900">تحت الإجراء</p>
                      <p className="text-sm text-gray-600">جاري معالجة الطلب</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                      4
                    </div>
                    <div className="text-right flex-1">
                      <p className="font-bold text-gray-900">مكتمل</p>
                      <p className="text-sm text-gray-600">تم إنجاز الخدمة</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  سيصل إليك تأكيد عبر البريد الإلكتروني والرسائل النصية
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setFormData(initialFormData);
                      setErrors({});
                      toast.success("تم إعادة تعيين النموذج");
                      window.scrollTo(0, 0);
                    }}
                    className="bg-saudi-green hover:bg-saudi-green-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
                  >
                    حجز موعد جديد
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setFormData(initialFormData);
                      setErrors({});
                      toast.info("تم إلغاء الطلب");
                      window.scrollTo(0, 0);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
                  >
                    إلغاء الطلب أو الموعد
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 9 && (
            <div className="flex justify-between items-center mt-6 md:mt-12 gap-4">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                  currentStep === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
                السابق
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-saudi-green hover:bg-saudi-green-dark text-white rounded-full font-bold transition-all transform hover:scale-105"
              >
                التالي
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </Layout>
  );
}
