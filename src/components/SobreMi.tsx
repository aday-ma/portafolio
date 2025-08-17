import foto from "../assets/mi_foto.jpg";
import { useState } from "react";

export default function SobreMi() {
  const [lang, setLang] = useState<"es" | "en">("es");

  return (
    <section
      id="sobre-mi"
      className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-6 py-16 flex items-center"
    >
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* Texto */}
        <div className="order-2 md:order-1">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
            data-es="Desarrollador Fullstack"
            data-en="Fullstack Developer"
          >
            {lang === "es" ? "Desarrollador Fullstack" : "Fullstack Developer"}
          </h1>

          <p
            className="mt-4 text-base sm:text-lg leading-relaxed max-w-prose text-left"
            data-es="¡Hola! Soy Aday Martín, desarrollador fullstack con una especialización en Inteligencia Artificial y Big Data. Me encanta la tecnología y todo lo que tenga que ver con crear, resolver problemas y experimentar con nuevas ideas. Siempre estoy buscando aprender algo nuevo, porque creo que la curiosidad es la mejor herramienta para crecer tanto en lo profesional como en lo personal."
            data-en="Hi! I'm Aday Martín, a fullstack developer with a specialization in Artificial Intelligence and Big Data. I love technology and everything related to creating, solving problems, and experimenting with new ideas. I'm always eager to learn something new, because I believe curiosity is the best tool to grow both professionally and personally."
          >
            {lang === "es"
              ? "¡Hola! Soy Aday Martín, desarrollador fullstack con una especialización en Inteligencia Artificial y Big Data. Me encanta la tecnología y todo lo que tenga que ver con crear, resolver problemas y experimentar con nuevas ideas. Siempre estoy buscando aprender algo nuevo, porque creo que la curiosidad es la mejor herramienta para crecer tanto en lo profesional como en lo personal."
              : "Hi! I'm Aday Martín, a fullstack developer with a specialization in Artificial Intelligence and Big Data. I love technology and everything related to creating, solving problems, and experimenting with new ideas. I'm always eager to learn something new, because I believe curiosity is the best tool to grow both professionally and personally."}
          </p>

          {/* Botón CV */}
          <div className="mt-8">
            <a
              href="public/cv.pdf"
              download
              data-es="📄 Descargar CV"
              data-en="📄 Download CV"
              className="inline-block px-6 py-3 text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow transition-colors duration-200"
            >
              {lang === "es" ? "📄 Descargar CV" : "📄 Download CV"}
            </a>
          </div>
        </div>

        {/* Foto */}
        <div className="order-1 md:order-2 flex justify-center">
          <img
            src={foto}
            alt="Foto de Aday Martín"
            className="w-40 sm:w-56 md:w-72 lg:w-80 aspect-square object-cover rounded-full shadow-lg ring-1 ring-white/10"
          />
        </div>
      </div>
    </section>
  );
}
