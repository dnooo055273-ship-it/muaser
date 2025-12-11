import { useState } from "react";
import Layout from "@/components/Layout";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  embassy: string;
  service: string;
  selectedDate: number | null;
  name: string;
  birthDate: string;
  idNumber: string;
  nationality: string;
  email: string;
  phone: string;
  documentsAgreed: boolean;
  passportPhoto: boolean;
  reviewed: boolean;
  totalFee: number;
  paymentMethod: string;
}

const initialFormData: FormData = {
  embassy: "",
  service: "",
  selectedDate: null,
  name: "",
  birthDate: "",
  idNumber: "",
  nationality: "",
  email: "",
  phone: "",
  documentsAgreed: false,
  passportPhoto: false,
  reviewed: false,
  totalFee: 0,
  paymentMethod: "",
};

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const embassies = [
    "المملكة العربية السعودية",
    "دولة الإمارات",
    "الكويت",
    "البحرين",
    "قطر",
  ];

  const services = ["تأشيرة", "تصديق", "تجديد جواز"];
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const bookedDates = [2, 8, 10, 24, 27, 28, 29];
  const unavailableDates = [14, 15, 21, 22, 29, 30];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.embassy) newErrors.embassy = "اختر السفارة";
        break;
      case 2:
        if (!formData.service) newErrors.service = "اختر الخدمة";
        if (!formData.selectedDate) newErrors.date = "اختر التاريخ";
        break;
      case 3:
        if (!formData.name.trim()) newErrors.name = "أدخل الاسم";
        if (!formData.birthDate) newErrors.birthDate = "اختر تاريخ الميلاد";
        if (!formData.idNumber.trim()) newErrors.idNumber = "أدخل رقم الهوية";
        if (!formData.nationality.trim()) newErrors.nationality = "أدخل الجنسية";
        if (!formData.email.trim()) newErrors.email = "أدخل البريد الإلكتروني";
        if (!formData.phone.trim()) newErrors.phone = "أدخل رقم الهاتف";
        break;
      case 4:
        if (!formData.documentsAgreed || !formData.passportPhoto) {
          newErrors.documents = "تأكد من جميع المتطلبات";
        }
        break;
      case 5:
        if (!formData.reviewed) {
          newErrors.review = "تأكد من البيانات";
        }
        break;
      case 6:
        if (!formData.paymentMethod) {
          newErrors.payment = "اختر طريقة الدفع";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1);
        toast.success("تم حفظ البيانات بنجاح");
      }
    } else {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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

  const StepIndicator = () => (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              الخطوة {currentStep} من 7
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / 7) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-saudi-green h-full transition-all duration-300"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Dots */}
        <div className="flex justify-between items-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div key={step} className="flex-1">
              <div
                className={`w-full h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === currentStep
                    ? "bg-saudi-green text-white"
                    : step < currentStep
                    ? "bg-saudi-green/20 text-saudi-green"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout activeService="calendar">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <StepIndicator />

        {/* Step Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          {/* Step 1: Embassy Selection */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                اختر السفارة
              </h2>
              <div className="space-y-3">
                {embassies.map((embassy) => (
                  <button
                    key={embassy}
                    onClick={() => handleInputChange("embassy", embassy)}
                    className={`w-full p-4 text-right rounded-lg border-2 transition-all ${
                      formData.embassy === embassy
                        ? "border-saudi-green bg-saudi-green/5"
                        : "border-gray-200 hover:border-saudi-green"
                    }`}
                  >
                    <span className="font-semibold text-gray-900">{embassy}</span>
                  </button>
                ))}
              </div>
              {errors.embassy && (
                <p className="mt-4 text-red-500 text-sm">{errors.embassy}</p>
              )}
            </div>
          )}

          {/* Step 2: Service & Calendar */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                اختر الخدمة والتاريخ
              </h2>

              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  الخدمة المطلوبة
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {services.map((service) => (
                    <button
                      key={service}
                      onClick={() => handleInputChange("service", service)}
                      className={`px-6 py-3 border-2 rounded-full font-semibold transition-all ${
                        formData.service === service
                          ? "border-saudi-green bg-saudi-green text-white"
                          : "border-gray-300 text-gray-700 hover:border-saudi-green"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  اختر التاريخ المناسب
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Sat", "Fri", "Thu", "Wed", "Tue", "Mon"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center font-semibold text-gray-600 py-2"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day) => {
                      const isBooked = bookedDates.includes(day);
                      const isUnavailable = unavailableDates.includes(day);
                      const isSelected = formData.selectedDate === day;

                      return (
                        <button
                          key={day}
                          onClick={() => {
                            if (!isUnavailable) {
                              handleInputChange("selectedDate", day);
                            }
                          }}
                          disabled={isUnavailable}
                          className={`p-3 rounded-lg transition ${
                            isUnavailable
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : isSelected
                              ? "bg-saudi-green text-white border-2 border-saudi-green"
                              : isBooked
                              ? "bg-saudi-green/30 text-gray-900"
                              : "bg-white border border-gray-200 hover:border-saudi-green text-gray-900"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              {errors.service && (
                <p className="mt-4 text-red-500 text-sm">{errors.service}</p>
              )}
              {errors.date && (
                <p className="mt-4 text-red-500 text-sm">{errors.date}</p>
              )}
            </div>
          )}

          {/* Step 3: Personal Information */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                البيانات الشخصية
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    الاسم*
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      handleInputChange("name", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
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

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    تاريخ الميلاد*
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                      errors.birthDate
                        ? "border-red-500"
                        : "border-gray-200 focus:border-saudi-green"
                    }`}
                  />
                  {errors.birthDate && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.birthDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    رقم الهوية*
                  </label>
                  <input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) =>
                      handleInputChange("idNumber", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                      errors.idNumber
                        ? "border-red-500"
                        : "border-gray-200 focus:border-saudi-green"
                    }`}
                    placeholder="114*******"
                  />
                  {errors.idNumber && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.idNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    الجنسية*
                  </label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                      errors.nationality
                        ? "border-red-500"
                        : "border-gray-200 focus:border-saudi-green"
                    }`}
                    placeholder="السعودية"
                  />
                  {errors.nationality && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.nationality}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    البريد الإلكتروني*
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
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

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    رقم الهاتف*
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
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
            </div>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                المستندات المطلوبة
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    المستندات المطلوبة:
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-saudi-green flex-shrink-0" />
                      <span>صورة من جواز السفر</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-saudi-green flex-shrink-0" />
                      <span>صورة شخصية بخلفية بيضاء</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-saudi-green flex-shrink-0" />
                      <span>نموذج طلب التأشيرة مكتمل</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-saudi-green cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={formData.passportPhoto}
                      onChange={(e) =>
                        handleInputChange("passportPhoto", e.target.checked)
                      }
                      className="w-5 h-5 rounded cursor-pointer"
                    />
                    <span className="font-semibold text-gray-900">
                      صورة من جواز السفر
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-saudi-green cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={formData.documentsAgreed}
                      onChange={(e) =>
                        handleInputChange("documentsAgreed", e.target.checked)
                      }
                      className="w-5 h-5 rounded cursor-pointer"
                    />
                    <span className="font-semibold text-gray-900">
                      أوافق على جميع المتطلبات
                    </span>
                  </label>
                </div>

                {errors.documents && (
                  <p className="text-red-500 text-sm">{errors.documents}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Review & Confirmation */}
          {currentStep === 5 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                مراجعة البيانات
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    بيانات الطلب
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <span className="font-semibold">السفارة:</span>{" "}
                      {formData.embassy}
                    </p>
                    <p>
                      <span className="font-semibold">الخدمة:</span>{" "}
                      {formData.service}
                    </p>
                    <p>
                      <span className="font-semibold">التاريخ المختار:</span>{" "}
                      {formData.selectedDate}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    البيانات الشخصية
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <span className="font-semibold">الاسم:</span>{" "}
                      {formData.name}
                    </p>
                    <p>
                      <span className="font-semibold">تاريخ الميلاد:</span>{" "}
                      {formData.birthDate}
                    </p>
                    <p>
                      <span className="font-semibold">رقم الهوية:</span>{" "}
                      {formData.idNumber}
                    </p>
                    <p>
                      <span className="font-semibold">الجنسية:</span>{" "}
                      {formData.nationality}
                    </p>
                    <p>
                      <span className="font-semibold">البريد:</span>{" "}
                      {formData.email}
                    </p>
                    <p>
                      <span className="font-semibold">الهاتف:</span>{" "}
                      {formData.phone}
                    </p>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-saudi-green cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={formData.reviewed}
                    onChange={(e) =>
                      handleInputChange("reviewed", e.target.checked)
                    }
                    className="w-5 h-5 rounded cursor-pointer mt-1 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">
                    أؤكد صحة البيانات المدخلة وأوافق على الشروط والأحكام
                  </span>
                </label>

                {errors.review && (
                  <p className="text-red-500 text-sm">{errors.review}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Payment */}
          {currentStep === 6 && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                الدفع
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    ملخص الرسوم
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>رسوم الدولة:</span>
                      <span>150 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span>رسوم الخدمة:</span>
                      <span>0 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الإجمالي المطلوب:</span>
                      <span>150 ريال</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold text-lg">
                      <span>الإجمالي:</span>
                      <span className="text-saudi-green">150 ريال</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">
                    طريقة الدفع
                  </h3>
                  <div className="space-y-3">
                    {[
                      "بطاقة ائتمان",
                      "تحويل بنكي",
                      "محفظة رقمية",
                    ].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                          formData.paymentMethod === method
                            ? "border-saudi-green bg-saudi-green/5"
                            : "border-gray-200 hover:border-saudi-green"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === method}
                          onChange={() =>
                            handleInputChange("paymentMethod", method)
                          }
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

          {/* Step 7: Status */}
          {currentStep === 7 && (
            <div className="animate-fadeIn text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-saudi-green/10 p-12 rounded-full">
                    <Check className="w-24 h-24 text-saudi-green" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-saudi-green mb-4">
                  تم تأكيد الموعد!
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  تم حجز موعدك بنجاح. سيصل إليك تأكيد عبر البريد الإلكتروني
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl mx-auto mb-8">
                <h3 className="font-bold text-gray-900 mb-6 text-xl">
                  تفاصيل الموعد
                </h3>
                <div className="space-y-4 text-right">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">رقم الموعد:</span>
                    <span className="font-bold text-gray-900">
                      APT-2024-001234
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">السفارة:</span>
                    <span className="font-bold text-gray-900">
                      {formData.embassy}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">الخدمة:</span>
                    <span className="font-bold text-gray-900">
                      {formData.service}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">التاريخ:</span>
                    <span className="font-bold text-gray-900">
                      Jumada Al-Thani {formData.selectedDate} / 1445 هـ
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">الحالة:</span>
                    <span className="bg-saudi-green/10 text-saudi-green px-4 py-2 rounded-full font-bold text-sm">
                      مؤكد
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  يمكنك متابعة حالة طلبك من خلال رقم الموعد
                </p>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setFormData(initialFormData);
                    setErrors({});
                    toast.success("تم إعادة تعيين النموذج");
                  }}
                  className="bg-saudi-green hover:bg-saudi-green-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  حجز موعد جديد
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 7 && (
            <div className="flex justify-between items-center mt-12 gap-4">
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
                className="flex items-center gap-2 px-6 py-3 bg-saudi-green hover:bg-saudi-green-dark text-white rounded-full font-bold transition-all transform hover:scale-105"
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
