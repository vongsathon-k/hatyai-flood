import Link from "next/link";
import { AlertTriangle, LifeBuoy } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          Hatyai Flood Rescue
        </h1>
        <p className="text-lg text-slate-600">
          ระบบช่วยเหลือผู้ประสบภัยน้ำท่วม อำเภอหาดใหญ่
        </p>

        <div className="grid gap-4 mt-8">
          <Link
            href="/report"
            className="flex items-center justify-center gap-3 p-6 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors"
          >
            <AlertTriangle size={32} />
            <span className="text-xl font-semibold">แจ้งขอความช่วยเหลือ</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-3 p-6 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition-colors"
          >
            <LifeBuoy size={32} />
            <span className="text-xl font-semibold">สำหรับทีมช่วยเหลือ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
