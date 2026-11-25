# Kampüs Etkinlikleri API

Kampüs etkinliklerini JSON olarak veren Node.js + Express REST API'si. Veriler MongoDB'de (Mongoose ile) tutulur. Frontend (`../frontend`) ile aynı repoda ayrı bir uygulamadır.

- **Öğrenci:** Mehmet Kutlu — 2416501002
- **Sprint:** 9 (Tam CRUD: PATCH, DELETE ve sorgular)
- **Adres:** http://localhost:3000

Sprint 7'de etkinlikler bellekteki bir dizideydi; Sprint 8'de MongoDB'ye taşındı. Sprint 9'da CRUD tamamlandı: etkinlik `PATCH` ile güncellenir, `DELETE` ile silinir, `?search` ve `?category` ile aranır, yaklaşan etkinlikler `/events/upcoming` ile ayrı listelenir. Tarih artık her yerde `"GG-AA-YYYY"` (`"15-10-2026"`) biçimindedir.

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
| `date` | Date | zorunlu; API'de `"GG-AA-YYYY"` (`set: parseDate`, `get: formatDate`) |
| `time` | String | varsayılan `""` |
| `location` | String | `trim`, varsayılan `""` |
| `description` | String | `trim`, en çok 500 karakter, varsayılan `""` |

Schema seçenekleri: `timestamps: true` (her kayda `createdAt` ve `updatedAt`), `toJSON: { getters: true }` (yanıtta tarih `"2026-12-01T00:00:00.000Z"` değil `"01-12-2026"` görünür) ve `id: false` (getter açılınca eklenen sanal `id` alanı yok, `_id` yeter). Kimlik MongoDB'nin verdiği `_id`'dir (ör. `6af57a006f13ad018f7b7a55`).

### Tarih: API'de `"GG-AA-YYYY"`, veritabanında gerçek `Date`

`src/utils/date.js` içinde üç yardımcı vardır:

| Fonksiyon | Ne yapar |
|---|---|
| `parseDate("15-10-2026")` | UTC gece yarısı `Date` döner. Biçim yanlışsa (`"2026-10-15"`) ya da gün yoksa (`"31-02-2026"`) `Invalid Date` döner; Mongoose bunu `Cast to date failed` hatasıyla **400**'e çevirir |
| `formatDate(date)` | `Date` → `"15-10-2026"` |
| `todayStart()` | Bugünün başı (UTC 00:00), `/events/upcoming` için |

**Neden metin değil?** `"05-11-2026"` metin olarak `"15-10-2026"`dan küçüktür; Kasım Ekim'den önce sıralanırdı. Tarih `Date` olunca `sort({ date: 1 })` ve `$gte` tarihi tarih olarak karşılaştırır.

| Kavram | Bu projede |
|---|---|
| Database | `kampus` |
| Collection | `events` |
| Document | Bir etkinlik |
| Schema | Alanlar ve kurallar (yukarıdaki tablo) |
| Model | `Event` (`find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`) |
| Seed | `npm run seed` (6 etkinlik, 2'si geçmiş tarihli) |

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Çalışıyor |
| GET | `/events` | Listeyi tarihe göre sıralı getir; `?search=` ve `?category=` isteğe bağlı | 200 | — | Çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrası, en yakın önce | 200 · tarihe göre sıralı | — | Çalışıyor |
| GET | `/events/:id` | Tek etkinlik (`_id` ile) | 200 | 404 | Çalışıyor |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Çalışıyor |
| PATCH | `/events/:id` | Sadece gönderilen alanları güncelle | 200 · güncel kayıt | 400, 404 | Çalışıyor |
| DELETE | `/events/:id` | Sil | 204 · gövde yok | 404 | Çalışıyor |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

Bütün hatalar Sprint 8'deki gibi aynı biçimde döner. Geçersiz ya da olmayan id her yerde (GET, PATCH, DELETE) 404'tür; controller'daki tek `notFound(res)` fonksiyonu bunu yazar:

```json
{ "error": { "message": "Event not found" } }
```

### Route sırası

Express route'ları yukarıdan aşağı dener. `/upcoming` sabit adresi `/:id`'den **önce** yazılır; yoksa `"upcoming"` bir id sanılır ve `404 Event not found` döner.

```js
router.get("/", getEvents);
router.get("/upcoming", getUpcomingEvents); // önce
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);
```

| İstek | Eşleşen |
|---|---|
| `GET /events/upcoming` | `getUpcomingEvents` |
| `GET /events/6af5...` | `getEventById` |
| `PATCH /events/6af5...` | `updateEvent` |
| `DELETE /events/6af5...` | `deleteEvent` |

### `GET /events` — arama ve filtre

Query string'den (`?` sonrası) bir filtre nesnesi kurulur; sonuç tarihe göre sıralıdır.

| Adres | `filter` |
|---|---|
| `/events` | `{}` |
| `/events?category=Atölye` | `{ category: "Atölye" }` |
| `/events?search=atölye` | `{ title: { $regex: "atölye", $options: "i" } }` |
| `/events?search=atölye&category=Atölye` | ikisi birden |

`$options: "i"` sayesinde büyük/küçük harf fark etmez: `atölye` de `ATÖLYE` de `ESP32 ile IoT Prototipleme Atölyesi`'ni bulur. `( * ? [ \` gibi işaretler regex'e konmadan önce kaçırılır; `?search=(` 500 yerine boş liste döner.

### `GET /events/upcoming`

```js
Event.find({ date: { $gte: todayStart() } }).sort({ date: 1, time: 1 });
```

Bugün ve sonrası gelir, en yakın önce. Seed'deki 2 geçmiş tarihli etkinlik (`14-11-2026`, `18-11-2026`) bu listede yoktur; `/events` 6, `/events/upcoming` 4 kayıt döner.

| İşleç | Anlamı |
|---|---|
| `$gte` | büyük ya da eşit (≥) |
| `$gt` / `$lt` | büyük / küçük |
| `sort 1` / `-1` | artan / azalan |

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
  "date": "20-12-2026",
  "capacity": 30
}
```

| Gönderilen body | Sonuç |
|---|---|
| `title`, `category`, `date` tam | 201 · `_id` + `createdAt`, `date: "20-12-2026"` |
| Sadece `title` | 400 · required |
| `date: "2026-12-20"` | 400 · `Cast to date failed` (biçim `GG-AA-YYYY` olmalı) |
| `date: "31-02-2026"` | 400 · olmayan gün |
| `category: "Parti"` | 400 · enum |
| `title: "X"` | 400 · minlength |
| Bozuk JSON | 400 · `Invalid JSON body` |
| JSON olmayan body (Text, form-data) | 400 · `Body must be JSON (Content-Type: application/json)` |

> **Postman'de POST kaydetmiyorsa:** Body sekmesinde **raw** seçili olmalı ve sağdaki tür **Text değil JSON** olmalı. Ayrıca `npm run seed` her çalıştığında `events` collection'ını sıfırlar; POST ile eklenenler de silinir.

### `PATCH /events/:id`

Kaydın **sadece gönderilen alanları** değişir; diğerleri olduğu gibi kalır. Yanıt güncellenmiş kayıttır.

```js
Event.findByIdAndUpdate(req.params.id, body, {
  returnDocument: "after", // yoksa yanıtta eski hali döner
  runValidators: true,     // yoksa schema kuralları güncellemede çalışmaz
});
```

| PATCH body | Sonuç | Neden |
|---|---|---|
| `{ "capacity": 55 }` | 200 | Sadece `capacity` değişti |
| `{ "title": " Yeni Başlık " }` | 200 | `trim`: `"Yeni Başlık"` |
| `{ "date": "25-12-2026" }` | 200 | Tarih yine `GG-AA-YYYY` |
| `{}` | 400 | `Body is empty` |
| `{ "category": "Parti" }` | 400 | enum, `runValidators` |
| `{ "date": "2026-12-25" }` | 400 | `CastError` da 400'e çevrilir (500 değil) |
| `{ "_id": "abc" }` | 400 | `_id cannot be changed` (`_id`, `createdAt`, `updatedAt`, `__v` korunur) |
| `{ "$unset": { ... } }` | 400 | MongoDB operatörü body ile gönderilemez |
| `/events/yok` ya da silinmiş id | 404 | `Event not found` |

### `DELETE /events/:id`

| İstek | Sonuç |
|---|---|
| `DELETE /events/<_id>` | 204 · gövde yok |
| Aynı istek bir daha | 404 · `Event not found` |
| `DELETE /events/yok` | 404 |
| Sonra `GET /events` | 1 kayıt eksik |

204'ün gövdesi olmaz; bu yüzden `res.json(...)` değil `res.status(204).end()` kullanılır.

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
│   ├── utils/date.js                   parseDate, formatDate, todayStart (GG-AA-YYYY)
│   ├── models/event-model.js           Event schema'sı ve modeli (date: Date, get/set)
│   ├── data/seed-events.js             Seed için 6 örnek etkinlik (2'si geçmiş tarihli)
│   ├── routes/event-routes.js          Hangi adres hangi fonksiyona gider (/upcoming, /:id'den önce)
│   └── controllers/event-controller.js getEvents, getUpcomingEvents, getEventById, createEvent, updateEvent, deleteEvent
├── requests/
│   ├── kampus-api.json                 Postman collection (18 istek, 45 test)
│   └── run-results.json                Collection Runner sonucu (18 istek, 45 test, 0 hata)
├── .env.example
├── .gitignore
└── package.json
```

## Test

### Collection Runner

Hazır collection (`requests/kampus-api.json`, ders sitesindeki `https://webdersi.vercel.app/test.json` ile aynı 18 istek) Postman'e içe aktarılır ve tek tıkla çalıştırılır:

1. Terminal: `npm run seed`, sonra `npm run dev`
2. Postman › Import › `requests/kampus-api.json` (ya da `webdersi.vercel.app/test.json` adresi)
3. Collection'a sağ tık › **Run collection** › **Run**
4. Hedef: **18 istek, 45 test, hepsi yeşil**

id'leri elle girmek gerekmez: **02** listedeki ilk `_id`'yi `eventId`'ye, **05** yeni oluşan kaydın `_id`'sini `newId`'ye kaydeder. PATCH ve DELETE o yeni kayıtla çalışır, seed verisi bozulmaz; istenildiği kadar tekrar Run edilebilir.

Terminalden aynı test (backend açıkken):

```bash
npm i -g newman
newman run https://webdersi.vercel.app/test.json
```

| İstekler | Ne test ediliyor |
|---|---|
| 01–04 | Sprint 8'den: health, liste, tek, 404 |
| 05–07 | Adım 1: tarih `GG-AA-YYYY` (yanlış biçim 400) |
| 08–13 | Adım 3–4: PATCH (200, tarih, boş body, enum, `_id`, olmayan id) |
| 14–15 | Adım 6: arama ve filtre |
| 16 | Adım 0 ve 7: geçmiş tarih, `/upcoming` |
| 17–18 | Adım 5: DELETE (204, tekrar silince 404) |

Son çalıştırmanın sonucu `requests/run-results.json` içindedir: **18 istek, 45 test, 45 geçti, 0 hata.**

```text
│              requests │                 18 │                  0 │
│            test-scripts │                 18 │                  0 │
│              assertions │                 45 │                  0 │
```

## Sık Karşılaşılan Hatalar

| Ne oluyor | Çözüm |
|---|---|
| `/events/upcoming` → 404 Event not found | `/upcoming` route'unu `/:id`'den önce yaz |
| PATCH sonrası yanıtta eski değer | `returnDocument: "after"` ekle |
| PATCH `category: "Parti"` kabul edildi | `runValidators: true` ekle |
| PATCH / DELETE → 404 Route not found | `router.patch` / `router.delete` satırı eksik |
| DELETE → 200 ve gövde | `res.status(204).end()`; 204'ün gövdesi olmaz |
| `?search=(` → 500 | Aramayı regex'e koymadan önce özel işaretleri kaçır |
| upcoming tüm kayıtları veriyor | Seed'de geçmiş tarihli etkinlik yok ya da `$gte` yerine `$lte` |
| POST tarih → 400 Cast to date failed | `"20-12-2026"` gönder; `"2026-12-20"` kabul edilmez |
| PATCH yanlış tarih → 500 | `catch`'te `CastError`'u da 400'e çevir |
| Yanıtta date `"2026-12-01T00:00:00.000Z"` | Schema'ya `toJSON: { getters: true }` |

## Teslim Kontrol Listesi

- [x] `npm install` + `npm run dev` çalışıyor (temiz klonda, `.env` yalnızca yerelde)
- [x] Bağlantı ayrı modülde (`src/config/database.js`), URI `.env`'den okunuyor, `.env.example`'da `MONGODB_URI` var
- [x] `npm run seed` 6 kayıt ekliyor, 2'si geçmiş tarihli; iki kez çalışınca da 6 kayıt
- [x] Tarih her yerde `"GG-AA-YYYY"`, veritabanında `Date`; yanlış biçim 400
- [x] `PATCH /events/:id` sadece gönderilen alanları değiştiriyor, güncel kaydı dönüyor; boş body, geçersiz alan ve `_id` 400, olmayan id 404
- [x] `DELETE /events/:id` 204 ve gövdesiz; ikinci silme 404
- [x] `?search` (büyük/küçük harf duyarsız) ve `?category` tek başına ve birlikte çalışıyor
- [x] `/events/upcoming` geçmiş tarihlileri eliyor, en yakın önce; route `/:id`'den önce
- [x] Collection Runner: 18 istek, 45 test, 0 hata (`requests/run-results.json`)
- [x] Git geçmişinde gerçek Atlas adresi/şifresi, `.env` ve `node_modules` yok
