import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

interface PlaceholderProps {
  title: string;
  activeService?: string;
}

export default function Placeholder({ title, activeService }: PlaceholderProps) {
  return (
    <Layout activeService={activeService}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="mb-6">
            <div className="bg-saudi-green/10 p-8 rounded-full inline-block">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-8">
            هذه الصفحة قيد التطوير حالياً. يرجى العودة لاحقاً أو اختيار خدمة
            أخرى
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-saudi-green hover:bg-saudi-green-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
          >
            <span>العودة للرئيسية</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
