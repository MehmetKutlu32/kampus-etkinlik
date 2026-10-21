import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

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
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  // Etkinlikler sayfası: arama + kategori, her çizimde hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);
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

  const headerTitle = page === "home" ? "Kampüs Etkinlikleri" : page === "events" ? "Tüm Etkinlikler" : title;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <div className="site-ust">
        <Header title={headerTitle} text={subtitle} />
        <Navigation current={page} onNavigate={go} />
      </div>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <div className="tumunu-gor-kutusu">
              <a href="#" className="link-devam" onClick={(e) => { e.preventDefault(); go("events"); }}>
                Tüm etkinlikleri gör &rarr;
              </a>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <h2>Tüm Etkinlikler</h2>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p className="filtre-sonuc" aria-live="polite">{filtered.length} etkinlik listeleniyor.</p>
            )}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <p className="hata-mesaj-metni">Aradığınız etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            <p>
              <a href="#" className="listeye-don-link" onClick={(e) => { e.preventDefault(); go("events"); }}>
                &larr; Listeye dön
              </a>
            </p>
          </div>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && (
          <div className="form-kart">
            <h2>{page === "add" ? "Yeni Etkinlik Formu" : "Etkinlik Bilgilerini Düzenle"}</h2>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
