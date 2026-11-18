# Kampüs Etkinlikleri API

Kampüs etkinliklerini JSON olarak veren Node.js + Express REST API'si. Veriler MongoDB'de (Mongoose ile) tutulur. Frontend (`../frontend`) ile aynı repoda ayrı bir uygulamadır.

- **Öğrenci:** Mehmet Kutlu — 2416501002
- **Sprint:** 8 (MongoDB ve Mongoose ile kalıcı veri)
- **Adres:** http://localhost:3000

Sprint 7'de etkinlikler bellekteki bir dizideydi ve sunucu kapanınca `POST` ile eklenenler kayboluyordu. Sprint 8'de adresler aynı kaldı, verinin yeri değişti: controller'lar `Event` modeli üzerinden MongoDB'ye yazıp okuyor, sunucu kapanıp açılınca kayıtlar duruyor.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env     # sonra MONGODB_URI'yi kendi adresinle değiştir
npm run seed             # veritabanına 6 örnek etkinlik yazar
npm run dev
```

| Komut | Açıklama |
|---|---|
| `npm run dev` | Önce MongoDB'ye bağlanır, sonra sunucuyu `node --watch` ile başlatır |
| `npm start` | Aynısı, izleme olmadan |
| `npm run seed` | `events` collection'ını siler ve 6 örnek etkinlik ekler (kaç kez çalışırsa çalışsın 6 kayıt kalır) |

Bağlantı başarılıysa terminalde yalnızca host ve veritabanı adı yazılır, şifre yazılmaz:

```text
MongoDB bağlandı (Atlas): ac-...mongodb.net/kampus
API: http://localhost:3000
```

## Ortam Değişkenleri

| Değişken | Örnek (`.env.example`) | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinleyeceği port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | MongoDB bağlantı adresi; sonunda veritabanı adı `/kampus` olmalı |

`.env` GitHub'a gönderilmez. `.env.example` içindeki adres gerçek değil, yer tutucudur. Atlas kullanırken adres `mongodb+srv://kullanici:<sifre>@cluster0.xxxxx.mongodb.net/kampus` biçimindedir ve **yalnızca** `.env` dosyasına yazılır; kodda, README'de veya Postman collection'ında yer almaz. `MONGODB_URI` tanımlı değilse sunucu `Bağlanılamadı: MONGODB_URI tanımlı değil` yazıp kapanır.

## Veri Modeli

`src/models/event-model.js` — model adı `Event`, MongoDB'deki collection adı `events`.

| Alan | Tür | Kurallar |
|---|---|---|
| `title` | String | zorunlu, `trim`, 3–100 karakter |
| `category` | String | zorunlu, yalnızca `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` |
| `capacity` | Number | en az 0, varsayılan 0 |
| `date` | String | zorunlu (`YYYY-MM-DD`) |
| `time` | String | varsayılan `""` |
| `location` | String | `trim`, varsayılan `""` |
| `description` | String | `trim`, en çok 500 karakter, varsayılan `""` |

`timestamps: true` sayesinde her kayda `createdAt` ve `updatedAt` kendiliğinden eklenir. Kimlik artık `"event-2"` değil, MongoDB'nin verdiği `_id`'dir (ör. `6af57a006f13ad018f7b7a55`).

| Kavram | Bu projede |
|---|---|
| Database | `kampus` |
| Collection | `events` |
| Document | Bir etkinlik |
| Schema | Alanlar ve kurallar (yukarıdaki tablo) |
| Model | `Event` (`find`, `findById`, `create` buradan gelir) |
| Seed | `npm run seed` |

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi tarihe göre sıralı getir (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 8 (MongoDB) |
| GET | `/events/:id` | Tek etkinlik (`_id` ile) | 200 | 404 | Sprint 8 (MongoDB) |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Sprint 8 (MongoDB) |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### `GET /events/:id`

| İstek | Sonuç |
|---|---|
| `/events/<listedeki bir _id>` | 200 · etkinlik |
| `/events/507f1f77bcf86cd799439011` (biçim doğru, kayıt yok) | 404 · `findById` null döner |
| `/events/yok` (biçim yanlış) | 404 · `isValidObjectId` kontrolü (500 değil) |

### `POST /events`

Doğrulamayı schema yapar; controller Mongoose'un `ValidationError`'ını `400`'e çevirir. Body'den yalnızca modeldeki alanlar alınır.

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30
}
```

| Gönderilen body | Sonuç |
|---|---|
| `title`, `category`, `date` tam | 201 · `_id` + `createdAt` |
| Sadece `title` | 400 · required |
| `category: "Parti"` | 400 · enum |
| `title: "X"` | 400 · minlength |
| Bozuk JSON | 400 · `Invalid JSON body` |

### Hata middleware'i

`src/app.js` sonunda iki middleware vardır: eşleşmeyen adresler için `404 Route not found` ve 4 parametreli hata yakalayıcı. Controller'lardaki `next(err)` hata yakalayıcıya gider; kullanıcıya yalnızca `{ "error": { "message": "Server error" } }` (500) döner, ayrıntı terminalde kalır. Hatalı bir istekten sonra da `GET /health` 200 dönmeye devam eder.

## Klasör Yapısı

```text
backend/
├── src/
│   ├── app.js                          Express uygulaması, middleware, route bağlama, hata yakalayıcı
│   ├── server.js                       .env'i okur, önce veritabanına bağlanır, sonra portu dinler
│   ├── seed.js                         npm run seed: sil, sonra 6 etkinlik ekle
│   ├── config/database.js              connectDatabase(): MONGODB_URI ile bağlanır
│   ├── models/event-model.js           Event schema'sı ve modeli
│   ├── data/seed-events.js             Seed için 6 örnek etkinlik (id alanı yok)
│   ├── routes/event-routes.js          Hangi adres hangi fonksiyona gider
│   └── controllers/event-controller.js async/await ile Event modelini kullanır
├── requests/kampus-api.json            Postman collection (7 istek)
├── .env.example
├── .gitignore
└── package.json
```

## Test

`requests/kampus-api.json` dosyası Postman'e içe aktarılır. "2 Etkinlik listesi" isteği listedeki ilk `_id`'yi `eventId` collection değişkenine yazar; "3 Tek etkinlik" bu değişkeni kullanır, bu yüzden 3'ten önce 2 çalıştırılmalıdır.

| # | İstek | Beklenen |
|---|---|---|
| 1 | `GET /health` | 200 · ok + student |
| 2 | `GET /events` | 200 · 6 kayıt (seed sonrası) |
| 3 | `GET /events/{{eventId}}` | 200 · listedeki ilk etkinlik |
| 4 | `GET /events/yok` | 404 · error |
| 5 | `POST /events` (tam body) | 201 · `_id` |
| 6 | `POST /events` (sadece title) | 400 · error |
| 7 | `GET /events/507f1f77bcf86cd799439011` | 404 · error |

**Kalıcılık testi:**

1. `npm run seed`, sonra `npm run dev`
2. `POST /events` → 201, `_id`'yi not al
3. Terminalde `Ctrl+C` ile sunucuyu durdur, tekrar `npm run dev`
4. `GET /events` → 7 kayıt, yeni etkinlik listede
5. Atlas › Browse Collections › `kampus.events` içinde de görünür
