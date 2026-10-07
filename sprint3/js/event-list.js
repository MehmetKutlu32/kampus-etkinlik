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

function createCard(event) {
  const [gun, ay, yil] = event.date.split("-");
  const isoDatetime = `${yil}-${ay}-${gun}T${event.time}`;
  const okunakliTarih = formatTarih(event.date);

  return `
    <article class="kart">
      <div>
        <span class="kategori-etiket">${event.category}</span>
        <h2>${event.title}</h2>
        <p class="bilgi-satir"><time datetime="${isoDatetime}">Tarih: ${okunakliTarih}, ${event.time}</time></p>
        <p class="bilgi-satir">Yer: ${event.location}</p>
        <p class="bilgi-satir">Kontenjan: ${event.capacity} kişi</p>
        <p class="aciklama">${event.description}</p>
      </div>
      <a href="etkinlik-detay.html?id=${event.id}" class="detay-buton">Detayları gör</a>
    </article>
  `;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
  if (!list) return;
  list.innerHTML = dizi.map(createCard).join("");
}

if (list) {
  if (list.dataset.limit) {
    // Ana sayfa: data-limit="2" ile tarihi en yakın 2 etkinlik
    const toIsoDate = (dStr) => {
      const [g, a, y] = dStr.split("-");
      return `${y}-${a}-${g}`;
    };
    const yaklasan = [...events]
      .sort((a, b) => toIsoDate(a.date).localeCompare(toIsoDate(b.date)))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    // Etkinlikler sayfası: Arama ve kategori filtreleri
    const aramaInput = document.querySelector("#arama");
    const kategoriSelect = document.querySelector("#kategori-filtre");
    const filtreFormu = document.querySelector("#filtre-formu");
    const sonucSatiri = document.querySelector("#sonuc");

    // Kategorileri tekil olarak veriden üret
    if (kategoriSelect) {
      const kategoriler = [...new Set(events.map((e) => e.category))];
      kategoriler.forEach((kat) => {
        const option = document.createElement("option");
        option.value = kat;
        option.textContent = kat;
        kategoriSelect.appendChild(option);
      });
    }

    function filtrele() {
      const aranan = aramaInput ? aramaInput.value.toLocaleLowerCase("tr-TR").trim() : "";
      const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

      const sonuc = events.filter((e) => {
        const metinUyuyor =
          !aranan ||
          e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
          e.description.toLocaleLowerCase("tr-TR").includes(aranan);
        const kategoriUyuyor = !secilenKategori || e.category === secilenKategori;
        return metinUyuyor && kategoriUyuyor;
      });

      render(sonuc);

      if (sonucSatiri) {
        if (sonuc.length === 0) {
          sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
        } else {
          sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
        }
      }
    }

    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
    if (filtreFormu) {
      filtreFormu.addEventListener("submit", (e) => e.preventDefault());
    }

    // İlk açılış: 6 etkinlik listeleniyor
    render(events);
    if (sonucSatiri) {
      sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
    }
  }
}
