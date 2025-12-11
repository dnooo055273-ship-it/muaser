import { useState } from "react";
import Layout from "@/components/Layout";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("المملكة العربية السعودية");

  const countries = [
    "المملكة العربية السعودية",
    "دولة الإمارات",
    "الكويت",
    "البحرين",
    "قطر",
  ];

  const serviceButtons = [
    "تأشيرة",
    "تصديق",
    "تجديد جواز",
  ];

  // Mock calendar data
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const bookedDates = [2, 8, 10, 24, 27, 28, 29];
  const unavailableDates = [14, 15, 21, 22, 29, 30];

  return (
    <Layout activeService="calendar">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                الخدمات الفصلية
              </h2>
              <div className="w-24 h-1 bg-saudi-green mx-auto mt-4"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          {/* Country Selector */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">السفارة</h3>
            <div className="relative">
              <div className="border-2 border-saudi-green rounded-full px-6 py-3 flex items-center justify-between bg-white cursor-pointer hover:bg-gray-50 transition">
                <span className="text-saudi-green font-semibold">
                  {selectedCountry}
                </span>
                <svg
                  className="w-6 h-6 text-saudi-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Service Buttons */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              الخدمة المطلوبة
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {serviceButtons.map((service) => (
                <button
                  key={service}
                  className="px-8 py-3 border-2 border-gray-300 rounded-full text-gray-700 font-semibold hover:border-saudi-green hover:text-saudi-green transition-colors"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
              <div className="text-center flex-1">
                <h4 className="font-bold text-gray-900 text-lg">
                  Jumada Al-Thani (6-11 / 1445)
                </h4>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">هـ</span>
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Sat", "Fri", "Thu", "Wed", "Tue", "Mon"].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => {
                const isBooked = bookedDates.includes(day);
                const isUnavailable = unavailableDates.includes(day);
                const isSelected = selectedDate === day;

                let bgColor = "bg-white hover:bg-gray-50";
                let textColor = "text-gray-900";
                let borderColor = "border border-gray-200";

                if (isUnavailable) {
                  bgColor = "bg-gray-200";
                  textColor = "text-gray-500";
                } else if (isBooked) {
                  bgColor = "bg-saudi-green";
                  textColor = "text-white";
                } else if (isSelected) {
                  bgColor = "bg-green-200";
                  borderColor = "border-2 border-saudi-green";
                }

                return (
                  <button
                    key={day}
                    onClick={() => !isUnavailable && setSelectedDate(day)}
                    className={`p-3 rounded-lg transition ${bgColor} ${textColor} ${borderColor} font-semibold`}
                    disabled={isUnavailable}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Info Text */}
            <p className="text-center text-gray-600 text-sm mt-8">
              سيتم حجز الموعد لقرب فرع منكم
              <br />
              للاطلاع على أقرب موقع خريطة للسفارة احفظ هنا
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
