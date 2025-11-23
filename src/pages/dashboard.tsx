import { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { getRequests, updateRequestStatus } from "@/services/api";

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
  const queryClient = useQueryClient();
  
  const {
    data: requests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'completed' }) =>
      updateRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });

  const handleStatusUpdate = (id: string, status: 'pending' | 'completed') => {
    if (confirm('ยืนยันการเปลี่ยนสถานะ?')) {
      updateStatusMutation.mutate({ id, status });
    }
  };

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
        <RescueMap requests={requests || []} onStatusUpdate={handleStatusUpdate} />

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
                className={`p-4 hover:bg-slate-50 transition-colors ${req.status === 'completed' ? 'bg-green-50' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-slate-800">{req.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    req.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {req.status === 'completed' ? 'ช่วยเหลือแล้ว' : 'รอความช่วยเหลือ'}
                  </span>
                </div>
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
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-slate-500">
                    {new Date(req.timestamp).toLocaleTimeString("th-TH")}
                  </div>
                  {req.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusUpdate(req.id, 'completed')}
                      className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                    >
                      ช่วยเหลือแล้ว
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
