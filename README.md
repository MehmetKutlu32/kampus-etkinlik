# Kampüs Etkinlikleri

Kampüs içindeki seminer, atölye ve söyleşilerin listelendiği, detaylarının görüntülendiği ve yeni etkinlik eklenip güncellenebildiği web uygulaması.

- **Öğrenci:** Mehmet Kutlu — 2416501002
- **Ders:** Web Teknolojileri ve Programlama
- **Canlı Adres:** [https://web-tech-project-orpin.vercel.app](https://web-tech-project-orpin.vercel.app)
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
└── sprint2/
    ├── README.md
    ├── afis.jpg
    ├── css/
    │   └── 2416501002.css
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
