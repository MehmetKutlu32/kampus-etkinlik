import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

// Kurallar schema'da: controller ayrıca if (!title ...) kontrolü yapmaz.
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"],
    },
    capacity: { type: Number, min: 0, default: 0 },
    // API'de "GG-AA-YYYY", veritabanında gerçek Date:
    // set ile gelen metin Date'e çevrilir, get ile yanıtta yine metin görünür.
    date: { type: Date, required: true, set: parseDate, get: formatDate },
    time: { type: String, default: "" },
    location: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, maxlength: 500, default: "" },
  },
  {
    timestamps: true, // createdAt ve updatedAt kendiliğinden eklenir
    toJSON: { getters: true }, // res.json'da date "15-10-2026" olarak çıkar
    id: false, // getters açılınca eklenen sanal "id" alanı istemiyoruz, _id yeter
  }
);

// Model adı "Event" -> MongoDB'de collection adı "events"
export const Event = mongoose.model("Event", eventSchema);
