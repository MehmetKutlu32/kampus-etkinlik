# Canlı Adres: https://mehmetkutlu-frontend.vercel.app

# Kampüs Etkinlikleri

Kampüs içindeki seminer, atölye ve söyleşilerin listelendiği, detaylarının görüntülendiği ve yeni etkinlik eklenip güncellenebildiği web uygulaması. Repoda iki uygulama vardır: `frontend/` (React + Vite) ve `backend/` (Node.js + Express REST API).

- **Öğrenci:** Mehmet Kutlu — 2416501002
- **Ders:** Web Teknolojileri ve Programlama
- **Canlı Adres:** [https://mehmetkutlu-frontend.vercel.app](https://mehmetkutlu-frontend.vercel.app)
- **Örnek Detay:** [https://mehmetkutlu-frontend.vercel.app/events/event-2](https://mehmetkutlu-frontend.vercel.app/events/event-2) (Sprint 6'dan itibaren her sayfanın kendi adresi vardır)
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
├── sprint3/
│   ├── README.md
│   ├── afis.jpg
│   ├── css/
│   │   └── 2416501002.css
│   ├── js/
│   │   ├── data.js
│   │   ├── event-list.js
│   │   ├── event-detail.js
│   │   └── event-form.js
│   ├── index.html
│   ├── etkinlikler.html
│   ├── etkinlik-detay.html
│   ├── etkinlik-ekle.html
│   └── etkinlik-guncelle.html
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   ├── vite.config.ts
│   ├── public/
│   │   ├── afis.svg
│   │   └── favicon.svg
│   └── src/
│       ├── App.tsx
│       ├── App.css
│       ├── index.css
│       ├── main.tsx
│       ├── components/
│       │   ├── layout/   Header, Navigation, Footer
│       │   ├── events/   EventCard, EventList, EventFilter, EventDetail
│       │   └── forms/    EventForm
│       ├── context/EventsContext.tsx
│       ├── pages/        HomePage, EventsPage, EventDetailPage,
│       │                 AdminPage, AddEventPage, EditEventPage,
│       │                 LoginPage, RegisterPage, ForgotPasswordPage,
│       │                 NotFoundPage
│       ├── data/events.ts
│       ├── types/campus-event.ts
│       └── utils/        filter-events.ts, format-date.ts, validate-event.ts
└── backend/
    ├── README.md                REST sözleşmesi ve çalıştırma
    ├── package.json
    ├── .env.example
    ├── .gitignore
    ├── requests/kampus-api.json Postman collection (6 istek)
    └── src/
        ├── app.js               Express uygulaması, middleware, route bağlama
        ├── server.js            .env'i okur, portu dinler
        ├── routes/event-routes.js
        ├── controllers/event-controller.js
        └── data/events.js       Bellek içi 6 etkinlik
```

---

## ⚙️ Kurulum

**Frontend**

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

**Backend**

```bash
cd backend
npm install
cp .env.example .env
npm run dev      # http://localhost:3000
```

---

## 🧭 Route Listesi

| Adres | Sayfa |
| --- | --- |
| `/` | HomePage |
| `/events` | EventsPage |
| `/events/:id` | EventDetailPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

---

## 🔌 Backend API

Ayrıntılar ve REST sözleşmesi: [backend/README.md](./backend/README.md)

| Method | Endpoint | Başarılı | Hata |
| --- | --- | --- | --- |
| GET | `/health` | 200 | — |
| GET | `/events` | 200 | — |
| GET | `/events/:id` | 200 | 404 |
| POST | `/events` | 201 | 400 |

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

- **Sprint 4 (Vite, TypeScript ve React)**
  - Aynı site `frontend/` klasöründe Vite + React + TypeScript ile yeniden yazıldı.
  - `CampusEvent` arayüzü ve `Category` union tipi tanımlandı; veri `data/events.ts` içinde tipli tutuldu.
  - Arama, kategori filtresi ve id ile bulma işleri `utils/filter-events.ts` içinde saf fonksiyonlara ayrıldı.
  - 5 sayfa tek `App.tsx` içinde `useState` ile değişir (Router yok); listeler `map` + `key` ile çizilir, sekme başlığı `useEffect` ile güncellenir.
  - Vercel ayarı: Root Directory `frontend`, Framework Preset `Vite`.

- **Sprint 6 + Vize (Router, Context ve Yönetim)**
  - React Router ile 10 adres, 10 sayfa (`src/pages/`); `App.tsx` yalnızca Header, Navigation, `Routes` ve Footer içerir, state yoktur.
  - Menü `NavLink`, sayfa içi bağlantılar `Link`, kayıttan sonra geçiş `useNavigate` ile yapılır; detay ve güncelleme sayfası id'yi `useParams` ile okur.
  - Etkinlik listesi ve `addEvent`, `updateEvent`, `deleteEvent` `EventsContext` içinde; sayfalar `useEvents()` ile okur, değişiklik tüm sayfalarda görünür (sayfa yenilenince veri başa döner).
  - Ekle/Güncelle ortak controlled `EventForm` kullanır; `utils/validate-event.ts` ile doğrulama yapılır.
  - Yönetim sayfasında tablo, Düzenle ve onaylı Sil; tablo telefonda karta dönüşür.
  - Giriş, kayıt ve şifremi unuttum sayfalarında form doğrulaması (bilgiler hiçbir yere gönderilmez).
  - `vercel.json` ile tüm adresler `index.html`'e yönlenir; adres elle yazıldığında ve sayfa yenilendiğinde de doğru sayfa açılır.

- **[Sprint 7 (Express ile REST API)](./backend/README.md)**
  - Repoya ikinci uygulama olarak `backend/` eklendi: Node.js + Express, `"type": "module"` ile import/export.
  - Kod görevlerine göre ayrıldı: `app.js` (middleware ve route bağlama), `server.js` (portu dinler), `routes/` (adres eşleme), `controllers/` (iş mantığı), `data/` (bellek içi veri).
  - Port `.env` dosyasından `dotenv` ile okunur; `.env` GitHub'a gönderilmez, gerekli değişkenler `.env.example` içinde.
  - `GET /health` sunucunun ayakta olduğunu ve öğrenci numarasını döndürür.
  - `GET /events` (isteğe bağlı `?category=` filtresi), `GET /events/:id` (bulunamazsa 404) ve `POST /events` (başarılıysa 201, `title`/`category`/`date` eksikse 400) yazıldı; bütün hatalar `{ "error": { "message": "..." } }` biçiminde döner.
  - 6 etkinlik backend'e kendi içerikleriyle taşındı; veri bellekte tutulur, sunucu yeniden başlayınca POST ile eklenenler kaybolur.
  - 6 test isteği Postman'de "Kampüs API" collection'ı olarak hazırlandı ve `backend/requests/kampus-api.json` olarak dışa aktarıldı.
  - Backend bu sprintte canlıya alınmadı; frontend değişmedi.
