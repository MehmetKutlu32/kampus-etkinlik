# Kampüs Etkinlikleri API

Kampüs etkinliklerini JSON olarak veren Node.js + Express REST API'si. Frontend (`../frontend`) ile aynı repoda ayrı bir uygulamadır.

- **Öğrenci:** Mehmet Kutlu — 2416501002
- **Sprint:** 7 (Backend başlangıç)
- **Adres:** http://localhost:3000

Veri şimdilik bellekte (`src/data/events.js`) tutulur. Sunucu yeniden başlayınca `POST` ile eklenen etkinlikler kaybolur.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

| Komut | Açıklama |
|---|---|
| `npm run dev` | Sunucuyu `node --watch` ile başlatır, dosya değişince yeniden başlar |
| `npm start` | Sunucuyu normal başlatır |

## Ortam Değişkenleri

| Değişken | Varsayılan | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinleyeceği port |

`.env` GitHub'a gönderilmez; gerekli değişkenler `.env.example` dosyasındadır.

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 7 |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Sprint 7 |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Sprint 7 |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### Örnek: `POST /events`

`title`, `category` ve `date` zorunludur; biri eksikse `400` döner.

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30
}
```

## Klasör Yapısı

```text
backend/
├── src/
│   ├── app.js                         Express uygulaması, middleware, route bağlama
│   ├── server.js                      .env'i okur, portu dinler
│   ├── routes/event-routes.js         Hangi adres hangi fonksiyona gider
│   ├── controllers/event-controller.js İsteği işler, yanıtı döndürür
│   └── data/events.js                 Bellek içi etkinlik dizisi
├── requests/kampus-api.json           Postman collection (6 istek)
├── .env.example
├── .gitignore
└── package.json
```

## Test

`requests/kampus-api.json` dosyası Postman'e içe aktarılarak 6 istek çalıştırılabilir:

| # | İstek | Beklenen |
|---|---|---|
| 1 | `GET /health` | 200 · ok + student |
| 2 | `GET /events` | 200 · 6 kayıt |
| 3 | `GET /events/event-2` | 200 · event-2 |
| 4 | `GET /events/yok` | 404 · error |
| 5 | `POST /events` (tam body) | 201 · yeni id |
| 6 | `POST /events` (sadece title) | 400 · error |
