import { useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import { Camera, MapPin, Send } from "lucide-react";
import { submitRequest } from "@/services/api";

// Dynamically import MapSelector to avoid SSR issues with Leaflet
const MapSelector = dynamic(() => import("./MapSelector"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-slate-200 animate-pulse rounded-lg flex items-center justify-center">
      Loading Map...
    </div>
  ),
});

export default function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    lat: 0,
    lng: 0,
    image: null as File | null,
  });

  const submitMutation = useMutation({
    mutationFn: submitRequest,
    onSuccess: () => {
      alert("ส่งคำร้องขอความช่วยเหลือเรียบร้อยแล้ว");
      setFormData({
        name: "",
        phone: "",
        message: "",
        lat: 0,
        lng: 0,
        image: null,
      });
    },
    onError: () => {
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.lat === 0 || formData.lng === 0) {
      alert("กรุณาปักหมุดตำแหน่งของคุณบนแผนที่");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("message", formData.message);
    data.append("lat", formData.lat.toString());
    data.append("lng", formData.lng.toString());
    if (formData.image) {
      data.append("image", formData.image);
    }

    submitMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        แจ้งขอความช่วยเหลือ
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          ชื่อผู้ติดต่อ
        </label>
        <input
          type="text"
          required
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="ชื่อ-นามสกุล"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          เบอร์โทรศัพท์
        </label>
        <input
          type="tel"
          required
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="08x-xxx-xxxx"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          รายละเอียด/สิ่งที่ต้องการความช่วยเหลือ
        </label>
        <textarea
          required
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="เช่น น้ำท่วมสูง 1 เมตร, ต้องการอาหารและน้ำดื่ม, มีผู้ป่วยติดเตียง"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
          <MapPin size={18} />
          ระบุตำแหน่ง (คลิกบนแผนที่)
        </label>
        <div className="h-64 w-full border border-slate-300 rounded-lg overflow-hidden">
          <MapSelector
            onLocationSelect={(lat, lng) =>
              setFormData({ ...formData, lat, lng })
            }
          />
        </div>
        {formData.lat !== 0 && (
          <p className="text-sm text-green-600">
            พิกัดที่เลือก: {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
          <Camera size={18} />
          รูปภาพสถานที่(จุดสังเกตุ)
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border border-slate-300 rounded-lg"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files?.[0] || null })
          }
        />
      </div>

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {submitMutation.isPending ? (
          "กำลังส่งข้อมูล..."
        ) : (
          <>
            <Send size={20} />
            ส่งคำร้อง
          </>
        )}
      </button>
    </form>
  );
}
