import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

// Bu sprintte sadece sayfa: bilgiler hiçbir yere gönderilmez.
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <div className="form-kart">
      <h2>Giriş Yap</h2>
      {sent && (
        <p className="form-mesaj-kutusu basari">
          Bilgiler geçerli. Gerçek giriş Sprint 10'da.
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
            aria-invalid={errors.email ? true : undefined}
          />
          <span className="hata-mesaji">{errors.email}</span>
        </div>

        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined}
          />
          <span className="hata-mesaji">{errors.password}</span>
        </div>

        <div className="form-butonlar">
          <button type="submit">Giriş yap</button>
        </div>
      </form>
      <p>
        <Link to="/forgot-password" className="listeye-don-link">
          Şifremi unuttum
        </Link>
      </p>
      <p>
        <Link to="/register" className="listeye-don-link">
          Hesabın yok mu? Kayıt ol
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
