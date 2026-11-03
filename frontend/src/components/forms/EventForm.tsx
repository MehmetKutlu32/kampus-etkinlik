import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const formCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

// Form kaydetmeyi bilmez: doğrular, hata yoksa veriyi sayfaya verir.
function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  // Tek handleChange bütün alanlara yeter: name'e bakar.
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  // Temizle: formu başlangıç değerine döndürür.
  function handleReset() {
    setData(initialData);
    setErrors({});
  }

  return (
    <form noValidate onSubmit={handleSubmit} onReset={handleReset}>
      <div className="form-grup">
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={80}
          placeholder="Örn. Kariyer Günleri 2026"
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        <span className="hata-mesaji">{errors.title}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          {formCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="hata-mesaji">{errors.category}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="date">Tarih</label>
        <input
          type="date"
          id="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        <span className="hata-mesaji">{errors.date}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="time">Saat</label>
        <input
          type="time"
          id="time"
          name="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        <span className="hata-mesaji">{errors.time}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="location">Yer</label>
        <input
          type="text"
          id="location"
          name="location"
          maxLength={80}
          placeholder="Örn. A Blok Konferans Salonu"
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        <span className="hata-mesaji">{errors.location}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="capacity">Kontenjan</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          min={1}
          max={1000}
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        <span className="hata-mesaji">{errors.capacity}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        <span className="hata-mesaji">{errors.description}</span>
      </div>

      <div className="form-butonlar">
        <button type="submit" className="buton-kaydet">
          {submitText}
        </button>
        <button type="reset">Temizle</button>
      </div>
    </form>
  );
}

export default EventForm;
