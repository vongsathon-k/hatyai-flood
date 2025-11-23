import axios from "axios";

export interface RescueRequest {
  id: string;
  name: string;
  phone: string;
  message: string;
  lat: number;
  lng: number;
  timestamp: string;
  imageUrl?: string;
}

// Create axios instance
const api = axios.create({
  baseURL: "/api",
});

export const submitRequest = async (data: FormData) => {
  const response = await api.post("/requests", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getRequests = async (): Promise<RescueRequest[]> => {
  const response = await api.get("/requests");
  return response.data;
};
