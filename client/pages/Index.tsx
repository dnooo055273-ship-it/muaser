import { useState } from "react";
import Layout from "@/components/Layout";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header Section */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                الخدمات القنصلية
              </h2>
              <div className="w-24 h-1 bg-saudi-green mx-auto mt-4"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          {/* Content Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
            <div className="space-y-6">
              <div className="border-r-4 border-saudi-green pr-6">
                <p className="text-xl font-bold text-gray-900 mb-4">
                  مرحباً بك في خدمة المواعيد القنصلية الموحدة
                </p>
                <p className="text-gray-700 leading-relaxed">
                  يمكنك من خلال منصة ابشر بسهولة وموثوقية الحصول على
                  جميع الخدمات من مختلف الجهات الحكومية.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-r-4 border-saudi-green">
                <h4 className="font-bold text-gray-900 mb-4">الشروط والأحكام</h4>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-saudi-green mt-1">•</span>
                    <span>
                      تختلف المتطلبات والمستدات المطلوبة حسب كل دولة، ويجب رفعها بشكل واضح لاتمام الحجز.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-saudi-green mt-1">•</span>
                    <span>
                      تمكنك الخدمة من استعراض المواعيد السابقة وحالة الطلبات الحالية.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-saudi-green mt-1">•</span>
                    <span>
                      قد يتم تعديل أو إلغاء الموعد من قبل السفارة مباشرة وفق سياساتها.
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-600 italic border-r-4 border-saudi-green pr-6">
                <strong>تنبية:</strong> هذه الخدمة مرتبطة رسميًا بنظام السفارات عبر API
              </p>
            </div>
          </div>

          {/* Action Section */}
          <div className="text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-saudi-green/10 p-8 rounded-full">
                  <svg
                    className="w-16 h-16 text-saudi-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <p className="mb-6">
                <span style={{ fontSize: "14px" }} className="text-gray-600">
                  ابدأ باختيار السفارة المطلوبة للمتابعة
                </span>
              </p>
            </div>

            <button
              onClick={() => navigate('/consular')}
              className="bg-saudi-green hover:bg-saudi-green-dark text-white font-bold py-3 px-12 rounded-full transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2">
              <p>بدء الحجز</p>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
