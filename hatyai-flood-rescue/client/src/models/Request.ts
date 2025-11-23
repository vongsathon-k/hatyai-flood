import mongoose from "mongoose";

export interface IRequest extends mongoose.Document {
  name: string;
  phone: string;
  message: string;
  lat: number;
  lng: number;
  imageUrl?: string;
  timestamp: Date;
}

const RequestSchema = new mongoose.Schema<IRequest>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Request ||
  mongoose.model<IRequest>("Request", RequestSchema);
