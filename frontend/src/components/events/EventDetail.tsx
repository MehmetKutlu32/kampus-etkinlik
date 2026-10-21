import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <section className="detay-grid">
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} width={480} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}

        <div className="kunye-kart">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt>
            <dd>
              <time dateTime={`${event.date}T${event.time}`}>
                {formatDate(event.date)}, {event.time}
              </time>
            </dd>

            <dt>Yer</dt>
            <dd>{event.location}</dd>

            <dt>Kategori</dt>
            <dd>{event.category}</dd>

            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </div>
      </section>

      <h2>Açıklama</h2>
      <p className="aciklama-paragraf">{event.description}</p>

      <div className="detay-aksiyonlar">
        <a
          href="#"
          className="listeye-don-link"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          &larr; Listeye dön
        </a>
        <a
          href="#"
          className="buton-guncelle-link"
          onClick={(e) => {
            e.preventDefault();
            onEdit(event.id);
          }}
        >
          Bu etkinliği güncelle
        </a>
      </div>
    </article>
  );
}

export default EventDetail;
