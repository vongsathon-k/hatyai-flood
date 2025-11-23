import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Phone, Navigation, Image as ImageIcon } from "lucide-react";
import { RescueRequest } from "@/services/api";

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface RescueMapProps {
  requests: RescueRequest[];
}

export default function RescueMap({ requests }: RescueMapProps) {
  const center: [number, number] = [7.00866, 100.47469]; // Hat Yai

  const handleNavigate = (lat: number, lng: number) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {requests.map((req) => (
        <Marker key={req.id} position={[req.lat, req.lng]}>
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-bold text-lg mb-1">{req.name}</h3>
              <p className="text-slate-600 text-sm mb-2">{req.message}</p>
              {req.imageUrl && (
                <div className="mb-2">
                  <img
                    src={req.imageUrl}
                    alt="สถานการณ์"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-700 mb-3">
                <Phone size={14} />
                <a href={`tel:${req.phone}`} className="hover:underline">
                  {req.phone}
                </a>
              </div>
              <button
                onClick={() => handleNavigate(req.lat, req.lng)}
                className="w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
              >
                <Navigation size={16} />
                นำทาง
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
