import RequestForm from "@/components/RequestForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={20} />
          กลับหน้าหลัก
        </Link>
        <RequestForm />
      </div>
    </div>
  );
}
