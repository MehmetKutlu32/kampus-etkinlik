# Canlı Adres: https://web-tech-project-orpin.vercel.app

# Kampüs Etkinlikleri — Sprint 3

Kampüs içindeki seminer, atölye ve söyleşilerin listelendiği, detaylarının görüntülendiği ve yeni etkinlik eklenip güncellenebildiği web uygulamasının **JavaScript ve DOM** geliştirmeleri.

- **Canlı Adres:** [https://web-tech-project-orpin.vercel.app](https://web-tech-project-orpin.vercel.app)
- **Örnek Detay:** [https://web-tech-project-orpin.vercel.app/etkinlik-detay.html?id=event-3](https://web-tech-project-orpin.vercel.app/etkinlik-detay.html?id=event-3)
- **Öğrenci:** Mehmet Kutlu — 2416501002
- **Ders:** Web Teknolojileri ve Programlama, Sprint 3 (JavaScript ve DOM)

---

## 🚀 Sprint 3 Kapsamında Tamamlanan Özellikler

1. **Veri Modeli (`js/data.js`):**
   - 6 adet etkinlik içeren merkezi `events` dizisi oluşturuldu.
   - Her etkinlikte 7 zorunlu alan (`id`, `title`, `category`, `date`, `time`, `location`, `description`, `capacity`) eksiksiz tanımlandı.
   - Kategoriler tutarlı biçimde oluşturuldu ve birden fazla etkinliğe sahip kategoriler sağlandı.

2. **Dinamik Kart Üretimi ve Ana Sayfa (`js/event-list.js`):**
   - HTML içerisindeki statik kartlar temizlendi ve kartlar `events` verisinden dinamik olarak oluşturuldu.
   - Tarihler `12 Ekim 2026` formatında kullanıcı dostu biçimde formatlandı.
   - Ana sayfada (`index.html`), `data-limit="2"` özelliği kullanılarak tarihe göre sıralanmış en yakın 2 etkinlik listelendi.

3. **Arama ve Kategori Filtresi (`etkinlikler.html` & `js/event-list.js`):**
   - Arama kutusu (`input type="search"`) ve kategori seçimi (`select`) eklendi.
   - Kategori seçenekleri veriden dinamik ve tekil (`Set`) olarak üretildi.
   - Türkçe karakter duyarlı (`toLocaleLowerCase("tr-TR")`) arama ve kategori filtresi birlikte çalışır hale getirildi.
   - Eşleşen sonuç sayısı (`"6 etkinlik listeleniyor."`) ve bulunamayan aramalar için `"Aramanıza uygun etkinlik bulunamadı."` mesajı eklendi.

4. **Dinamik Detay Sayfası (`etkinlik-detay.html` & `js/event-detail.js`):**
   - URL parametresi (`?id=...`) okunarak ilgili etkinlik bilgileri (başlık, sekme adı, künye, açıklama) dinamik dolduruldu.
   - Geçersiz veya eksik `id` verildiğinde sayfa çökmeden kullanıcıya kırmızı hata kutusu ve "Listeye dön" butonu gösterildi.
   - Detay sayfasına "Bu etkinliği güncelle" butonu eklenerek ilgili id ile güncelleme sayfasına bağlantı sağlandı.

5. **Form Doğrulama ve Dinamik Güncelleme (`etkinlik-ekle.html`, `etkinlik-guncelle.html` & `js/event-form.js`):**
   - Tarayıcının varsayılan balonları kapatıldı (`novalidate`) ve JavaScript tabanlı doğrulama kuralları uygulandı.
   - Hatalı alanlar kırmızı çerçeve ve altlarındaki hata mesajlarıyla belirginleştirildi.
   - Form başarıyla doldurulduğunda sayfa yenilenmeden yeşil mesaj kutusu içinde JSON çıktısı gösterildi.
   - Güncelleme sayfasında id ile gelindiğinde alanlar mevcut etkinliğin bilgileriyle otomatik dolduruldu; id'siz doğrudan erişimde ise form gizlenerek uyarı kutusu gösterildi.

---

## 📁 Dosya Yapısı

| Dosya | Açıklama |
| --- | --- |
| `sprint3/js/data.js` | 6 adet etkinlik içeren veri dizisi (export const events). |
| `sprint3/js/event-list.js` | Kartların dinamik üretimi, tarih sıralaması, arama ve kategori filtrelemesi. |
| `sprint3/js/event-detail.js` | `URLSearchParams` ile id okuma, detay künyesi oluşturma, hata yönetimi. |
| `sprint3/js/event-form.js` | Form doğrulama (en az 3 harf, kategori, tarih/saat, yer, kontenjan), ekleme/güncelleme mantığı ve JSON çıktısı. |
| `sprint3/index.html` | Dinamik yaklaşan 2 etkinlik alanı (`data-limit="2"`). |
| `sprint3/etkinlikler.html` | Filtreleme formu ve dinamik tüm etkinlikler ızgarası. |
| `sprint3/etkinlik-detay.html` | Dinamik detay kapsayıcısı (`#detay`). |
| `sprint3/etkinlik-ekle.html` | Doğrulama alanları ve mesaj kutusu içeren ekleme formu. |
| `sprint3/etkinlik-guncelle.html` | Önceden doldurulan veya uyarı veren güncelleme formu. |
| `sprint3/css/2416501002.css` | Sprint 2 responsive yapısı + Sprint 3 filtre, form doğrulama, mesaj kutuları ve hata durumları stilleri. |
| `sprint3/afis.jpg` | Etkinlik afiş görseli. |
