import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

// Önce veritabanı, sonra sunucu: bağlantı yoksa istek kabul etmeyiz.
try {
  await connectDatabase();
  app.listen(PORT, (err) => {
    // Express 5: port doluysa (EADDRINUSE) hata buraya gelir
    if (err) {
      console.error(`Sunucu başlatılamadı: ${err.message}`);
      process.exit(1);
    }
    console.log(`API: http://localhost:${PORT}`);
  });
} catch (err) {
  console.error(`Bağlanılamadı: ${err.message}`);
  process.exit(1);
}
