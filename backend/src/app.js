import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

// Middleware: her istek route'a gelmeden önce buradan geçer
app.use(cors());
app.use(express.json()); // JSON body -> req.body

// Sunucu ayakta mı?
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501002",
  });
});

app.use("/events", eventRoutes);

// Hiçbir route eşleşmezse
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Hata yakalayıcı: 4 parametre görünce Express bunu hata middleware'i sayar.
// Controller'lardaki next(err) buraya gelir; sunucu çökmez.
app.use((err, req, res, next) => {
  // Bozuk JSON body (express.json ayrıştıramadı) kullanıcı hatasıdır
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON body" } });
  }
  // Ayrıntı (stack, bağlantı bilgisi) terminalde kalır, kullanıcıya gitmez
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
