import mongoose from "mongoose";
import { Event } from "../models/event-model.js";
import { events } from "../data/events.js";

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
export function createEvent(req, res) {
  const { title, category, capacity, date, time, location, description } =
    req.body ?? {};

  if (!title || !category || !date) {
    return res
      .status(400)
      .json({ error: { message: "title, category and date are required" } });
  }

  const newEvent = {
    id: `event-${Date.now()}`,
    title,
    category,
    date,
    capacity: Number(capacity) || 0,
    time: time ?? "",
    location: location ?? "",
    description: description ?? "",
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
}
