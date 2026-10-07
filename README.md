# Canlı Adres: https://web-tech-project-orpin.vercel.app

# Kampüs Etkinlikleri

Kampüs içindeki seminer, atölye ve söyleşilerin listelendiği, detaylarının görüntülendiği ve yeni etkinlik eklenip güncellenebildiği web uygulaması.

- **Öğrenci:** Mehmet Kutlu — 2416501002
- **Ders:** Web Teknolojileri ve Programlama
- **Canlı Adres:** [https://web-tech-project-orpin.vercel.app](https://web-tech-project-orpin.vercel.app)
- **Örnek Detay:** [https://web-tech-project-orpin.vercel.app/etkinlik-detay.html?id=event-3](https://web-tech-project-orpin.vercel.app/etkinlik-detay.html?id=event-3)
- **GitHub Repository:** [https://github.com/MehmetKutlu32/kampus-etkinlik](https://github.com/MehmetKutlu32/kampus-etkinlik)

---

## 📁 Proje Klasör Yapısı

```text
.
├── .gitignore
├── README.md
├── sprint1/
│   ├── README.md
│   ├── afis.jpg
│   ├── index.html
│   ├── etkinlikler.html
│   ├── etkinlik-detay.html
│   ├── etkinlik-ekle.html
│   └── etkinlik-guncelle.html
├── sprint2/
│   ├── README.md
│   ├── afis.jpg
│   ├── css/
│   │   └── 2416501002.css
│   ├── index.html
│   ├── etkinlikler.html
│   ├── etkinlik-detay.html
│   ├── etkinlik-ekle.html
│   └── etkinlik-guncelle.html
└── sprint3/
    ├── README.md
    ├── afis.jpg
    ├── css/
    │   └── 2416501002.css
    ├── js/
    │   ├── data.js
    │   ├── event-list.js
    │   ├── event-detail.js
    │   └── event-form.js
    ├── index.html
    ├── etkinlikler.html
    ├── etkinlik-detay.html
    ├── etkinlik-ekle.html
    └── etkinlik-guncelle.html
```

---

## 🚀 Sprintler

- **[Sprint 1 (HTML ve Git)](./sprint1/README.md)**
  - Semantik HTML yapısı, formlar, tablolar ve afiş tasarımı tamamlandı.

- **[Sprint 2 (CSS ve Responsive Tasarım)](./sprint2/README.md)**
  - Numaraya göre dinamik renk tonu (`--ton: mod(2416501002, 360) = 282`), son haneye (`2`) göre `--font: Tahoma` uygulandı.
  - Tablodan CSS Grid kart yapısına geçildi (`<section>` > `<article>`).
  - Mobil öncelikli tam responsive tasarım (tek sütun mobilde, çok sütun masaüstünde).
  - Geniş ekranda afiş solda, künye (`dl`) sağda yerleşim.
  - Formlarda etiketler üstte, hatalı/boş alanlar kırmızı ile belirgin.

- **[Sprint 3 (JavaScript ve DOM)](./sprint3/README.md)**
  - `data.js` modülü ile 6 adet etkinlik içeren merkezi veri havuzu oluşturuldu.
  - Ana sayfada tarihe göre sıralı yaklaşan 2 etkinlik (`data-limit="2"`), etkinlikler sayfasında 6 etkinlik dinamik kart olarak üretildi.
  - Arama kutusu ve kategori filtresi birlikte çalıştırıldı, tekil kategoriler `Set` ile veriden oluşturuldu.
  - `URLSearchParams` ile `?id=` parametresine göre detay sayfası oluşturuldu; geçersiz id'de kırmızı hata kutusu gösterildi.
  - Formlarda tarayıcı balonları kapatılarak (`novalidate`) JavaScript ile alan doğrulaması, hata bildirimleri ve başarı durumunda JSON gösterimi yapıldı.
  - Güncelleme sayfası detay sayfasından id ile açıldığında otomatik dolduruldu, id'siz açıldığında uyarı kutusu gösterildi.
