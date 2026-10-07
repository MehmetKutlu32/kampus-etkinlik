import { events } from "./data.js";

function formatTarih(dateStr) {
  if (!dateStr) return "";
  const [gun, ay, yil] = dateStr.split("-");
  const dateObj = new Date(Number(yil), Number(ay) - 1, Number(gun));
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

const detayContainer = document.querySelector("#detay");
const headerTitle = document.querySelector("#sayfa-baslik");

const urlParams = new URLSearchParams(location.search);
const id = urlParams.get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı — Kampüs Etkinlikleri";
  if (headerTitle) {
    headerTitle.textContent = "Etkinlik bulunamadı";
  }
  if (detayContainer) {
    const mesaj = id
      ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
      : "Geçerli bir etkinlik seçilmedi. Listeden bir etkinlik seçin.";

    detayContainer.innerHTML = `
      <div class="hata-kutusu">
        <p class="hata-mesaj-metni">${mesaj}</p>
        <p><a href="etkinlikler.html" class="listeye-don-link">&larr; Listeye dön</a></p>
      </div>
    `;
  }
} else {
  document.title = `${event.title} — Kampüs Etkinlikleri`;
  if (headerTitle) {
    headerTitle.textContent = event.title;
  }

  if (detayContainer) {
    const [gun, ay, yil] = event.date.split("-");
    const isoDatetime = `${yil}-${ay}-${gun}T${event.time}`;
    const okunakliTarih = formatTarih(event.date);

    detayContainer.innerHTML = `
      <article>
        <section class="detay-grid">
          <figure>
            <img src="afis.jpg" alt="${event.title} afişi" width="480">
            <figcaption>Şekil 1: ${event.title} afişi</figcaption>
          </figure>

          <div class="kunye-kart">
            <h2>Etkinlik Künyesi</h2>
            <dl>
              <dt>Tarih</dt>
              <dd><time datetime="${isoDatetime}">${okunakliTarih}, ${event.time}</time></dd>

              <dt>Yer</dt>
              <dd>${event.location}</dd>

              <dt>Kategori</dt>
              <dd>${event.category}</dd>

              <dt>Kontenjan</dt>
              <dd>${event.capacity} kişi</dd>
            </dl>
          </div>
        </section>

        <h2>Açıklama</h2>
        <p class="aciklama-paragraf">${event.description}</p>

        <div class="detay-aksiyonlar">
          <a href="etkinlikler.html" class="listeye-don-link">&larr; Listeye dön</a>
          <a href="etkinlik-guncelle.html?id=${event.id}" class="buton-guncelle-link">Bu etkinliği güncelle</a>
        </div>
      </article>
    `;
  }
}
