import { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { getRequests } from "@/services/api";

// Dynamically import RescueMap
const RescueMap = dynamic(() => import("@/components/RescueMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-200 animate-pulse flex items-center justify-center">
      Loading Map...
    </div>
  ),
});

export default function RescuerDashboard() {
  const {
    data: requests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <header className="bg-white shadow-sm p-4 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-slate-900">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-slate-800">
              Rescuer Dashboard
            </h1>
          </div>
          <button
            onClick={() => refetch()}
            className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw size={24} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      <main className="flex-1 relative">
        <RescueMap requests={requests || []} />

        {/* Overlay List for Desktop */}
        <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto hidden md:block z-[1000]">
          <div className="p-4 border-b sticky top-0 bg-white">
            <h2 className="font-bold text-slate-800">
              รายการขอความช่วยเหลือ ({requests?.length || 0})
            </h2>
          </div>
          <div className="divide-y">
            {requests?.map((req) => (
              <div
                key={req.id}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <h3 className="font-semibold text-slate-800">{req.name}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                  {req.message}
                </p>
                {req.imageUrl && (
                  <div className="mb-2">
                    <img
                      src={req.imageUrl}
                      alt="สถานการณ์"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                )}
                <div className="text-xs text-slate-500">
                  {new Date(req.timestamp).toLocaleTimeString("th-TH")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
