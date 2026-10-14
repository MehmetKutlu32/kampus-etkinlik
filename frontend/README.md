# Canlı Adres: https://web-tech-project-orpin.vercel.app

# Kampüs Etkinlikleri — Sprint 4 (Vite, TypeScript ve React)

Sprint 3'teki Kampüs Etkinlikleri sitesi bu sprintte React ve TypeScript ile yeniden yazıldı. Tek sayfa uygulaması `App.tsx` içinde çalışır; sayfa geçişi ve arama `state` ile yapılır (Router yok, Sprint 6'da gelecek).

- **Öğrenci:** Mehmet Kutlu — 2416501002
- **Ders:** Web Teknolojileri ve Programlama, Sprint 4

## Çalıştırma

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # hatasız bitmeli
npm run preview
```

## Dosyalar ne iş yapıyor?

| Dosya | Görevi |
| --- | --- |
| `package.json` | Proje adı, komutlar (dev, build) ve paket listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümleri. |
| `node_modules/` | İndirilen paketler; GitHub'a gitmez. |
| `tsconfig*.json` | TypeScript ayarları. |
| `vite.config.ts` | Vite ayarları ve React eklentisi. |
| `index.html` | Tek HTML; içinde boş `div#root` var. |
| `src/main.tsx` | React'i başlatır, `App`'i `root`'a çizer. |
| `src/App.tsx` | Uygulamanın ana bileşeni; 5 sayfanın hepsi burada. |
| `src/App.css` | App'in stilleri (Sprint 3 CSS'i). |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte boş. |
| `src/types/campus-event.ts` | `CampusEvent` tipi ve `Category` union tipi. |
| `src/data/events.ts` | Tipli 6 etkinlik verisi. |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `public/` | Olduğu gibi kopyalanan dosyalar (`afis.svg`, `favicon.svg`). |

## Sayfalar

Ana sayfa (yaklaşan 2 etkinlik), Etkinlikler (arama + kategori filtresi), Detay, Ekle ve Güncelle (sadece görünüm; kayıt yapılmaz).
