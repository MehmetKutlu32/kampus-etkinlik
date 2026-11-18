import mongoose from "mongoose";

// Bağlantı adresi koda yazılmaz, .env'deki MONGODB_URI'den okunur.
export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI tanımlı değil");
  }

  await mongoose.connect(uri);

  // uri içinde şifre olabilir, onu değil sadece host ve veritabanı adını yaz
  const { host, name } = mongoose.connection;
  const yer = uri.startsWith("mongodb+srv://") ? "Atlas" : "yerel";
  console.log(`MongoDB bağlandı (${yer}): ${host}/${name}`);
}
