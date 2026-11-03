import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

// Bu sprintte sadece sayfa: e-posta hiçbir yere gönderilmez.
function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <div className="form-kart">
      <h2>Şifremi Unuttum</h2>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      {sent && (
        <p className="form-mesaj-kutusu basari">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}
      <form noValidate onSubmit={handleSubmit}>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          <span className="hata-mesaji">{error}</span>
        </div>

        <div className="form-butonlar">
          <button type="submit">Bağlantı gönder</button>
        </div>
      </form>
      <p>
        <Link to="/login" className="listeye-don-link">
          &larr; Girişe dön
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
