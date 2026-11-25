// Örnek veri: npm run seed ile veritabanına yazılır. id yok, _id'yi MongoDB verir.
// Tarihler "GG-AA-YYYY". İlk ikisi geçmiş tarihli: /events/upcoming listesinde
// görünmezler, /events ile farkı böyle görürüz.
export const seedEvents = [
  {
    title: "Bilim Kurgu Evrenlerinde Zaman ve Distopya",
    category: "Seminer",
    capacity: 110,
    date: "14-11-2026",
    time: "13:30",
    location: "Kültür Merkezi Büyük Salon",
    description: "Dune, Silo ve Dark gibi eserlerde kapalı toplum kurgusu, zaman döngüleri ve paralel evren teorileri üzerine inceleme.",
  },
  {
    title: "Modern Oyunlarda Hikaye Anlatımı ve Bölüm Tasarımı",
    category: "Söyleşi",
    capacity: 75,
    date: "18-11-2026",
    time: "10:30",
    location: "C Blok Seminer Salonu",
    description: "Ghost of Tsushima, The Last of Us ve The Witcher 3 gibi yapımlarda atmosfer kurulumu, açık dünya dinamikleri ve boss mekanikleri.",
  },
  {
    title: "Sim-Racing ve Formula 1 Telemetri Analizi",
    category: "Söyleşi",
    capacity: 60,
    date: "03-12-2026",
    time: "15:00",
    location: "Mühendislik Fakültesi Konferans Salonu",
    description: "Direct Drive direksiyon sistemlerinde geri bildirim mekanikleri, lastik stratejileri ve yarış verisi okuma.",
  },
  {
    title: "ESP32 ile IoT Prototipleme Atölyesi",
    category: "Atölye",
    capacity: 15,
    date: "05-12-2026",
    time: "09:30",
    location: "Mikroişlemciler Laboratuvarı",
    description: "Mikrodenetleyiciler, sensör entegrasyonu, multimetre ile devre hata ayıklama ve lehimleme pratiği.",
  },
  {
    title: "ASP.NET Core ve PostgreSQL ile Ölçeklenebilir API",
    category: "Seminer",
    capacity: 90,
    date: "10-12-2026",
    time: "14:00",
    location: "Merkez Kütüphane Konferans Odası",
    description: "Entity Framework Core optimizasyonları, temiz mimari prensipleri ve Flutter istemcileriyle gerçek zamanlı haberleşme.",
  },
  {
    title: "90'lar Otomobil Elektroniği ve EFI Sistemleri",
    category: "Söyleşi",
    capacity: 50,
    date: "15-12-2026",
    time: "16:00",
    location: "D Blok Amfi 3",
    description: "Klasik atmosferik motorlarda sensör arıza tespiti, röle/sigorta kutusu revizyonu ve rölanti kontrolü.",
  },
];
