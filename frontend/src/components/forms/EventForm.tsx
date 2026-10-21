import type { Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
}

const formCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="form-bilgi">
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
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
          <button type="submit" className="buton-kaydet">
            Kaydet
          </button>
          <button type="reset">Temizle</button>
        </div>
      </form>
    </>
  );
}

export default EventForm;
