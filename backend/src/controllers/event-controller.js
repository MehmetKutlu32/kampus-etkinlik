import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

// GET /events  (?category=Atölye isteğe bağlı)
// await unutulursa res.json'a liste yerine Promise gider, yanıt {} olur.
export async function getEvents(req, res, next) {
  try {
    const filter = req.query.category
      ? { category: String(req.query.category) }
      : {};
    const list = await Event.find(filter).sort({ date: 1 });
    res.json(list);
  } catch (err) {
    next(err); // hata middleware'ine gider, sunucu çökmez
  }
}

// GET /events/:id
// Biçimi yanlış id ("yok") kontrol edilmezse Mongoose CastError fırlatır ve
// yanıt 500 olur; bu yüzden önce isValidObjectId ile 404 döneriz.
export async function getEventById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// POST /events
// Doğrulamayı schema yapar (required, enum, minlength...); controller
// ValidationError'ı 400'e çevirir. Sadece bilinen alanlar alınır.
export async function createEvent(req, res, next) {
  try {
    // Postman'de Body › raw › Text ya da form-data seçilirse express.json
    // body'yi okumaz; "title required" yerine asıl sorunu söyleyelim.
    if (!req.is("application/json")) {
      return res.status(400).json({
        error: { message: "Body must be JSON (Content-Type: application/json)" },
      });
    }
    const { title, category, capacity, date, time, location, description } =
      req.body ?? {};
    const event = await Event.create({
      title,
      category,
      capacity,
      date,
      time,
      location,
      description,
    });
    res.status(201).json(event);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}
