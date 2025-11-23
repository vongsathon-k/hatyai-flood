import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import dbConnect from "@/lib/mongodb";
import Request from "@/models/Request";
import cloudinary from "@/lib/cloudinary";

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const requests = await Request.find({}).sort({ timestamp: -1 });
      // Transform _id to id for frontend compatibility
      const formattedRequests = requests.map((req) => ({
        id: req._id.toString(),
        name: req.name,
        phone: req.phone,
        message: req.message,
        lat: req.lat,
        lng: req.lng,
        imageUrl: req.imageUrl,
        timestamp: req.timestamp,
      }));
      return res.status(200).json(formattedRequests);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  } else if (req.method === "POST") {
    try {
      const form = formidable({
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
      });

      const [fields, files] = await new Promise<
        [formidable.Fields, formidable.Files]
      >((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve([fields, files]);
        });
      });

      // Extract fields
      const name = Array.isArray(fields.name)
        ? fields.name[0]
        : (fields.name as unknown as string) || "";
      const phone = Array.isArray(fields.phone)
        ? fields.phone[0]
        : (fields.phone as unknown as string) || "";
      const message = Array.isArray(fields.message)
        ? fields.message[0]
        : (fields.message as unknown as string) || "";
      const lat = parseFloat(
        Array.isArray(fields.lat)
          ? fields.lat[0]
          : (fields.lat as unknown as string) || "0"
      );
      const lng = parseFloat(
        Array.isArray(fields.lng)
          ? fields.lng[0]
          : (fields.lng as unknown as string) || "0"
      );

      let imageUrl = null;
      const imageFile = Array.isArray(files.image)
        ? files.image[0]
        : files.image;

      if (imageFile) {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(imageFile.filepath, {
          folder: "hatyai-flood-rescue",
        });
        imageUrl = result.secure_url;
      }

      const newRequest = await Request.create({
        name,
        phone,
        message,
        lat,
        lng,
        imageUrl,
      });

      return res.status(201).json({
        id: newRequest._id.toString(),
        name: newRequest.name,
        phone: newRequest.phone,
        message: newRequest.message,
        lat: newRequest.lat,
        lng: newRequest.lng,
        imageUrl: newRequest.imageUrl,
        timestamp: newRequest.timestamp,
      });
    } catch (error) {
      console.error("Error processing request:", error);
      return res.status(500).json({ error: "Failed to process request" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
