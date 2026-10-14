import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const formCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Ana sayfa: tarihe göre en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Etkinlikler sayfası: arama + kategori, her çizimde hesaplanır
  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category,
  );
  const categories = [...new Set(events.map((e) => e.category))];

  // Detay sayfası: seçili etkinlik
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Sayfaya göre başlık ve alt başlık
  let title = "Ana Sayfa";
  let subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  if (page === "events") {
    title = "Etkinlikler";
    subtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (page === "detail") {
    title = selected ? selected.title : "Etkinlik bulunamadı";
    subtitle = "Etkinlik Detay Sayfası";
  } else if (page === "add") {
    title = "Etkinlik Ekle";
    subtitle = "Yeni bir kampüs etkinliği oluşturun";
  } else if (page === "update") {
    title = "Etkinlik Güncelle";
    subtitle = "Mevcut etkinlik bilgilerini düzenleyin";
  }

  const headerTitle =
    page === "home"
      ? "Kampüs Etkinlikleri"
      : page === "events"
        ? "Tüm Etkinlikler"
        : title;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <div>
          <span className="kategori-etiket">{event.category}</span>
          <h2>{event.title}</h2>
          <p className="bilgi-satir">
            <time dateTime={`${event.date}T${event.time}`}>
              Tarih: {formatDate(event.date)}, {event.time}
            </time>
          </p>
          <p className="bilgi-satir">Yer: {event.location}</p>
          <p className="bilgi-satir">Kontenjan: {event.capacity} kişi</p>
          <p className="aciklama">{event.description}</p>
        </div>
        <a
          href="#"
          className="detay-buton"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <div className="header-icerik">
          <div>
            <h1>{headerTitle}</h1>
            <p>{subtitle}</p>
          </div>
          <nav>
            {menuItems.map((item) => (
              <a
                key={item.page}
                href="#"
                className={page === item.page ? "aktif" : ""}
                aria-current={page === item.page ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.page);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-kartlari iki-sutun etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <div className="tumunu-gor-kutusu">
              <a
                href="#"
                className="link-devam"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör &rarr;
              </a>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <h2>Tüm Etkinlikler</h2>
            <form
              className="filtre-formu"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="filtre-grup">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="filtre-grup">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p className="filtre-sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-kartlari uc-sutun etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <p className="hata-mesaj-metni">
              Aradığınız etkinlik bulunamadı. Listeden bir etkinlik seçin.
            </p>
            <p>
              <a
                href="#"
                className="listeye-don-link"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                &larr; Listeye dön
              </a>
            </p>
          </div>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <section className="detay-grid">
              {selected.image && (
                <figure>
                  <img
                    src={selected.image}
                    alt={`${selected.title} afişi`}
                    width={480}
                  />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}

              <div className="kunye-kart">
                <h2>Etkinlik Künyesi</h2>
                <dl>
                  <dt>Tarih</dt>
                  <dd>
                    <time dateTime={`${selected.date}T${selected.time}`}>
                      {formatDate(selected.date)}, {selected.time}
                    </time>
                  </dd>

                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>

                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>

                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </div>
            </section>

            <h2>Açıklama</h2>
            <p className="aciklama-paragraf">{selected.description}</p>

            <div className="detay-aksiyonlar">
              <a
                href="#"
                className="listeye-don-link"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                &larr; Listeye dön
              </a>
              <a
                href="#"
                className="buton-guncelle-link"
                onClick={(e) => {
                  e.preventDefault();
                  go("update", selected.id);
                }}
              >
                Bu etkinliği güncelle
              </a>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <div className="form-kart">
            <h2>
              {page === "add" ? "Yeni Etkinlik Formu" : "Etkinlik Bilgilerini Düzenle"}
            </h2>
            <p className="form-bilgi">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  type="text"
                  id="title"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  {formCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grup">
                <label htmlFor="date">Tarih</label>
                <input type="date" id="date" />
              </div>

              <div className="form-grup">
                <label htmlFor="time">Saat</label>
                <input type="time" id="time" />
              </div>

              <div className="form-grup">
                <label htmlFor="location">Yer</label>
                <input
                  type="text"
                  id="location"
                  maxLength={80}
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="capacity">Kontenjan</label>
                <input type="number" id="capacity" min={1} max={1000} />
              </div>

              <div className="form-grup">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5} />
              </div>

              <div className="form-butonlar">
                <button
                  type="submit"
                  className={page === "add" ? "buton-kaydet" : "buton-guncelle"}
                >
                  {page === "add" ? "Kaydet" : "Güncelle"}
                </button>
                <button type="reset">Temizle</button>
              </div>
            </form>
          </div>
        )}
      </main>

      <footer>
        <p>Mehmet Kutlu &middot; 2416501002 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
