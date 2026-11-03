import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h2>Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link to="/" className="buton-link">
        Ana sayfaya dön
      </Link>
    </>
  );
}

export default NotFoundPage;
