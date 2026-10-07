import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");

if (form) {
  const isGuncelle = form.dataset.mode === "guncelle";
  let aktifEtkinlik = null;

  if (isGuncelle) {
    const id = new URLSearchParams(location.search).get("id");
    aktifEtkinlik = events.find((e) => e.id === id);
  }

  if (isGuncelle && !aktifEtkinlik) {
    // id yoksa veya bulunamazsa formu gösterme; uyarı kutusu + "Etkinliklere git" göster
    const formKarti = form.closest(".form-kart") || form;
    formKarti.outerHTML = `
      <div class="hata-kutusu form-uyari-kutusu">
        <p class="hata-mesaj-metni">Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
        <p><a href="etkinlikler.html" class="buton-link">Etkinliklere git</a></p>
      </div>
    `;
  } else {
    // Güncelleme modunda ve etkinlik bulunduysa form alanlarını doldur
    if (isGuncelle && aktifEtkinlik) {
      if (form.elements.ad) form.elements.ad.value = aktifEtkinlik.title;
      if (form.elements.kategori) form.elements.kategori.value = aktifEtkinlik.category;

      if (form.elements.tarih) {
        // GG-AA-YYYY formatını input[type=date] için YYYY-MM-DD'ye çevir
        const parcalar = aktifEtkinlik.date.split("-");
        if (parcalar.length === 3) {
          form.elements.tarih.value = `${parcalar[2]}-${parcalar[1]}-${parcalar[0]}`;
        } else {
          form.elements.tarih.value = aktifEtkinlik.date;
        }
      }

      if (form.elements.saat) form.elements.saat.value = aktifEtkinlik.time;
      if (form.elements.yer) form.elements.yer.value = aktifEtkinlik.location;
      if (form.elements.kontenjan) form.elements.kontenjan.value = aktifEtkinlik.capacity || "";
      if (form.elements.aciklama) form.elements.aciklama.value = aktifEtkinlik.description || "";
    }

    // Alan hata temizleme yardımcı fonksiyonu
    function alanHataAyarla(alanAdi, hataMetni) {
      const inputEleman = form.elements[alanAdi];
      const hataSpan = document.querySelector(`#${alanAdi}-hata`);

      if (hataMetni) {
        if (inputEleman) {
          inputEleman.setAttribute("aria-invalid", "true");
          inputEleman.classList.add("hatali");
        }
        if (hataSpan) {
          hataSpan.textContent = hataMetni;
        }
      } else {
        if (inputEleman) {
          inputEleman.removeAttribute("aria-invalid");
          inputEleman.classList.remove("hatali");
        }
        if (hataSpan) {
          hataSpan.textContent = "";
        }
      }
    }

    // Kullanıcı alana yazarken veya seçerken mevcut hatayı temizle
    form.addEventListener("input", (e) => {
      if (e.target && e.target.name) {
        alanHataAyarla(e.target.name, "");
      }
    });

    form.addEventListener("change", (e) => {
      if (e.target && e.target.name) {
        alanHataAyarla(e.target.name, "");
      }
    });

    // Form submit olduğunda yakala
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const adVal = (fd.get("ad") || "").trim();
      const kategoriVal = fd.get("kategori") || "";
      const tarihVal = fd.get("tarih") || "";
      const saatVal = fd.get("saat") || "";
      const yerVal = (fd.get("yer") || "").trim();
      const kontenjanRaw = fd.get("kontenjan");
      const kontenjanVal = kontenjanRaw !== "" && kontenjanRaw !== null ? Number(kontenjanRaw) : null;
      const aciklamaVal = (fd.get("aciklama") || "").trim();

      const errors = {};

      // 1. Ad: en az 3 karakter
      if (!adVal || adVal.length < 3) {
        errors.ad = "En az 3 karakter olmalı.";
      }

      // 2. Kategori: seçilmemiş
      if (!kategoriVal) {
        errors.kategori = "Bir kategori seçin.";
      }

      // 3. Tarih: boş
      if (!tarihVal) {
        errors.tarih = "Tarih seçin.";
      }

      // 4. Saat: boş
      if (!saatVal) {
        errors.saat = "Saat seçin.";
      }

      // 5. Yer: boş
      if (!yerVal) {
        errors.yer = "Yer girin.";
      }

      // 6. Kontenjan: girildiyse 1-1000 dışı
      if (kontenjanVal !== null && (kontenjanVal < 1 || kontenjanVal > 1000)) {
        errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";
      }

      // Hata span'larını ve input durumlarını güncelle
      const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan", "aciklama"];
      alanlar.forEach((alan) => {
        alanHataAyarla(alan, errors[alan] || "");
      });

      if (Object.keys(errors).length > 0) {
        if (formMesaj) {
          formMesaj.className = "form-mesaj-kutusu hata";
          formMesaj.textContent = "Formda hatalı alanlar var. Lütfen işaretli alanları kontrol edin.";
        }
        return;
      }

      // Hata yoksa: oluşan nesneyi hazırla
      const data = {
        id: isGuncelle ? (aktifEtkinlik ? aktifEtkinlik.id : "event-guncel") : `event-${events.length + 1}`,
        title: adVal,
        category: kategoriVal,
        date: tarihVal,
        time: saatVal,
        location: yerVal,
        capacity: kontenjanVal,
        description: aciklamaVal
      };

      console.log("Form verisi:", data);

      if (formMesaj) {
        formMesaj.className = "form-mesaj-kutusu basari";
        const baslikMetni = isGuncelle
          ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
          : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

        formMesaj.innerHTML = `
          <p class="basari-metni">${baslikMetni}</p>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
      }
    });
  }
}
