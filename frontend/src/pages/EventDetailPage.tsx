import { useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";

// Page bulur, component çizer.
function EventDetailPage() {
  const { id } = useParams(); // 1. adres
  const { events } = useEvents(); // 2. veri
  const event = findEventById(events, id ?? "");
  if (!event) return <NotFoundPage />; // 3. yoksa

  return (
    <>
      <h2>{event.title}</h2>
      <EventDetail event={event} />
    </>
  );
}

export default EventDetailPage;
