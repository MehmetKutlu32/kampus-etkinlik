import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
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
          onShowDetail(event.id);
        }}
      >
        Detayları gör
      </a>
    </article>
  );
}

export default EventCard;
