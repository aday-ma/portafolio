import { useMemo, useRef, useState } from "react";
import foto from "../assets/mi_foto.jpg";

// ========================
// Contact Section (React + Tailwind)
// Patrón i18n igual que "SobreMi": data-es / data-en en el propio elemento
// ========================


export default function Contact() {



  // ==== Ajusta aquí tus datos ====
  const FULL_NAME = "Aday Martin Aguilar";
  const TITLE = "Desarrollador Full-Stack";
  const EMAIL = "adaymartin.ma@gmail.com"; // se usa para mailto, Gmail compose y vCard
  const PHONE = "+34 658 48 71 07";    // opcional vCard ("" si no quieres)
  const LOCATION = "Sevilla, España"; // opcional vCard

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvgbazkz";

  const SOCIALS = [
    { labelES: "GitHub", labelEN: "GitHub", href: "https://github.com/aday-ma", icon: GitHubIcon },
    { labelES: "LinkedIn", labelEN: "LinkedIn", href: "https://www.linkedin.com/in/aday-mart%C3%ADn-aguilar/", icon: LinkedInIcon },
  ];

  // ===== vCard =====
  const vcardHref = useMemo(() => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${FULL_NAME}`,
      `N:${FULL_NAME};;;;`,
      TITLE ? `TITLE:${TITLE}` : "",
      EMAIL ? `EMAIL;TYPE=INTERNET:${EMAIL}` : "",
      PHONE ? `TEL;TYPE=CELL:${PHONE}` : "",
      LOCATION ? `ADR;TYPE=WORK:;;${LOCATION};;;;` : "",
      "END:VCARD",
    ].filter(Boolean);
    const blob = new Blob([lines.join("\n")], { type: "text/vcard" });
    return URL.createObjectURL(blob);
  }, [FULL_NAME, TITLE, EMAIL, PHONE, LOCATION]);

  // ===== Form state =====
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);

    // Honey-pot anti-bots
    if ((fd.get("_gotcha") as string)?.length) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
        setErrorMsg(data?.error || "No se pudo enviar el formulario.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Error de red. Inténtalo de nuevo.");
    }
  }

  function gmailComposeUrl(to: string) {
    const base = "https://mail.google.com/mail/?view=cm&fs=1";
    const params = new URLSearchParams({ to });
    return `${base}&${params.toString()}`;
  }

  const [copied, setCopied] = useState(false);
  // ===== Copiar email con feedback =====
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // vuelve al estado normal
    } catch { }
  }


  return (
    <section id="contacto" className="px-6 py-20 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            data-es="Contacto"
            data-en="Contact"
          />
          <p
            className="mt-2 text-slate-300"
            data-es="Hablemos sobre tu proyecto o colaboración."
            data-en="Let’s talk about your project or a collaboration."
          />
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ===== Formulario ===== */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl">
            <h3
              className="text-xl font-semibold mb-4"
              data-es="Envíame un mensaje"
              data-en="Send me a message"
            />

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              action={FORMSPREE_ENDPOINT}
              method="POST"
              className="space-y-4"
            >
              {/* Honey-pot invisible */}
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              <div>
                <label
                  className="block text-sm mb-1"
                  htmlFor="name"
                  data-es="Nombre"
                  data-en="Name"
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  data-es-placeholder="Tu nombre"
                  data-en-placeholder="Your name"
                  className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-1"
                  htmlFor="email"
                  data-es="Email"
                  data-en="Email"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tunombre@email.com"
                  data-es-placeholder="tunombre@email.com"
                  data-en-placeholder="youremail@example.com"
                  className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block text-sm mb-1"
                  htmlFor="message"
                  data-es="Mensaje"
                  data-en="Message"
                />
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Cuéntame en qué te puedo ayudar"
                  data-es-placeholder="Cuéntame en qué te puedo ayudar"
                  data-en-placeholder="Tell me how I can help"
                  className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500 transition disabled:opacity-60"
                data-es={status === "loading" ? "Enviando…" : "Enviar"}
                data-en={status === "loading" ? "Sending…" : "Send"}
              />
              {status === "success" && (
                <p
                  className="text-sm text-emerald-400"
                  data-es="¡Gracias! He recibido tu mensaje."
                  data-en="Thanks! I’ve received your message."
                />
              )}
              {status === "error" && (
                <p
                  className="text-sm text-rose-400"
                  data-es={errorMsg || "No se pudo enviar el formulario."}
                  data-en={"Couldn’t send the form."}
                />
              )}
            </form>

            <p
              className="mt-3 text-xs text-slate-400"
              data-es="Este formulario usa Formspree, no necesitas servidor propio."
              data-en="This form uses Formspree—no backend needed."
            />
          </div>

          {/* ===== Alternativas rápidas ===== */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl flex flex-col gap-6">
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                data-es="Contacto directo"
                data-en="Direct contact"
              />
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="btn-soft"
                  data-es="📧 Email"
                  data-en="📧 Email"
                />
                <a
                  href={gmailComposeUrl(EMAIL)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-soft"
                  data-es="✉️ Gmail"
                  data-en="✉️ Gmail"
                />
                <button
                  onClick={copyEmail}
                  className={`btn-soft ${copied ? "ring-emerald-400/60 text-emerald-300" : ""}`}
                  // si quieres, deja el title fijo o lo quitamos para no duplicar idiomas
                  title="Copiar email"
                >
                  <span aria-hidden>📋</span>
                  {copied ? (
                    // un solo nodo con data-es / data-en (tu Navbar ya lo rellena)
                    <span data-es="¡Copiado!" data-en="Copied!"></span>
                  ) : (
                    <span data-es="Copiar email" data-en="Copy email"></span>
                  )}
                </button>


                <a
                  href={vcardHref}
                  download={`${FULL_NAME.replace(/\s+/g, "_")}.vcf`}
                  className="btn-soft"
                  data-es="💾 Guardar contacto"
                  data-en="💾 Save contact"
                />
              </div>
            </div>

            <div>
              <h3
                className="text-xl font-semibold mb-3"
                data-es="Redes"
                data-en="Social"
              />
              <ul className="flex flex-wrap gap-3">
                {SOCIALS.map(({ labelES, labelEN, href, icon: Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 hover:border-slate-500 hover:bg-slate-800 transition"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm" data-es={labelES} data-en={labelEN} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <img
              src={foto}
              alt="Foto de Aday Martín"
              className="w-40 sm:w-56 md:w-72 lg:w-100 aspect-square object-cover shadow-lg ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>

      {/* ===== Styles locales (Tailwind helpers) ===== */}
      <style>{`
        .btn-soft { @apply inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 hover:border-slate-500 hover:bg-slate-800 transition; }
      `}</style>
    </section>
  );
}

// ================= Icons (inline, sin dependencias externas) =================
function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.77-1.6-2.67-.3-5.48-1.34-5.48-5.97 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.45 11.45 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.78.84 1.24 1.92 1.24 3.24 0 4.64-2.81 5.66-5.49 5.96.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5z" />
    </svg>
  );
}
function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37v-11.4h3.4v1.56h.05c.47-.89 1.62-1.85 3.33-1.85 3.56 0 4.21 2.34 4.21 5.39v6.3zM5.34 7.49a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56v-11.4h3.56v11.4z" />
    </svg>
  );
}
