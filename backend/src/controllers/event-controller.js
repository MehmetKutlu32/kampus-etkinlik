import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

// Olmayan ya da biçimi yanlış id: aynı 404 tek yerde (GET, PATCH, DELETE)
function notFound(res) {
  return res.status(404).json({ error: { message: "Event not found" } });
}

// PATCH ile değiştirilemeyecek alanlar
const KORUNAN_ALANLAR = ["_id", "createdAt", "updatedAt", "__v"];

// GET /events  (?search=git & ?category=Atölye isteğe bağlı, ikisi birlikte de olur)
// Query string'den filtre nesnesi kurulur; await unutulursa res.json'a liste
// yerine Promise gider, yanıt {} olur.
export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = String(category);
    if (search) {
      // ( * ? gibi işaretler regex'i bozmasın: ?search=( 500 yerine boş liste
      const guvenli = String(search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: guvenli, $options: "i" }; // büyük/küçük harf fark etmez
    }
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err); // hata middleware'ine gider, sunucu çökmez
  }
}

// GET /events/:id
// Biçimi yanlış id ("yok") kontrol edilmezse Mongoose CastError fırlatır ve
// yanıt 500 olur; bu yüzden önce isValidObjectId ile 404 döneriz.
export async function getEventById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findById(req.params.id);
    if (!event) return notFound(res);
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

// PATCH /events/:id
// Sadece gönderilen alanlar değişir. returnDocument: "after" olmazsa yanıtta
// eski kayıt döner; runValidators: true olmazsa schema kuralları (enum,
// minlength...) güncellemede çalışmaz ve category: "Parti" kabul edilir.
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const body = req.body ?? {};
    if (typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({ error: { message: "Body must be an object" } });
    }
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: { message: "Body is empty" } });
    }
    const korunan = Object.keys(body).filter((k) => KORUNAN_ALANLAR.includes(k));
    if (korunan.length > 0) {
      return res
        .status(400)
        .json({ error: { message: `${korunan.join(", ")} cannot be changed` } });
    }
    // { "$unset": ... } gibi MongoDB operatörleri body ile gönderilemez
    const operator = Object.keys(body).filter((k) => k.startsWith("$"));
    if (operator.length > 0) {
      return res
        .status(400)
        .json({ error: { message: `${operator.join(", ")} is not allowed` } });
    }
    const event = await Event.findByIdAndUpdate(req.params.id, body, {
      returnDocument: "after", // güncellenmiş kaydı döndür
      runValidators: true, // schema kuralları burada da çalışsın
    });
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    // ValidationError: enum, minlength... CastError: "2026-12-20" gibi yanlış tarih
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// DELETE /events/:id
// Başarılıysa 204 No Content: yanıtın gövdesi olmaz, bu yüzden res.json değil
// res.status(204).end(). Aynı kayıt ikinci kez silinmek istenirse 404.
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return notFound(res); // ikinci silme de buraya düşer
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
