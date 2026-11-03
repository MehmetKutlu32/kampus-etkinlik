import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
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
      <Link to={`/events/${event.id}`} className="detay-buton">
        Detayları gör
      </Link>
    </article>
  );
}

export default EventCard;
