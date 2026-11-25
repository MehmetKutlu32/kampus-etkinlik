// API'de tarih "GG-AA-YYYY" ("15-10-2026") metnidir, veritabanında gerçek Date.
// Neden metin değil? "05-11-2026" metin olarak "15-10-2026"dan küçüktür;
// Kasım Ekim'den önce sıralanır. Date olunca sort ve $gte doğru çalışır.

// "15-10-2026" -> Date (UTC gece yarısı). Biçim ya da gün yanlışsa
// Invalid Date döner; Mongoose bunu "Cast to date failed" ile 400'e çevirir.
export function parseDate(value) {
  if (value == null || value instanceof Date) return value; // boş: required yakalar
  if (typeof value !== "string") return new Date(NaN); // sayı vb. kabul edilmez
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!m) return new Date(NaN); // "2026-12-20" gibi yanlış biçim -> 400
  const [, gun, ay, yil] = m.map(Number);
  const tarih = new Date(Date.UTC(yil, ay - 1, gun));
  if (tarih.getUTCDate() !== gun || tarih.getUTCMonth() !== ay - 1) {
    return new Date(NaN); // 31-02-2026 gibi olmayan gün
  }
  return tarih;
}

// Date -> "15-10-2026"
export function formatDate(tarih) {
  if (!(tarih instanceof Date)) return tarih;
  const gun = String(tarih.getUTCDate()).padStart(2, "0");
  const ay = String(tarih.getUTCMonth() + 1).padStart(2, "0");
  return `${gun}-${ay}-${tarih.getUTCFullYear()}`;
}

// Bugünün başı (UTC 00:00), /events/upcoming için
export function todayStart() {
  const s = new Date();
  return new Date(
    Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate())
  );
}
