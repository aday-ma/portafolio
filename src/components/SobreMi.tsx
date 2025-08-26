import foto from "../assets/mi_foto.jpg";
import cv from "../assets/cv.pdf";


export default function SobreMi() {

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
          </h1>

          <p
            className="mt-4 text-base sm:text-lg leading-relaxed max-w-prose text-left"
            data-es="¡Hola! Soy Aday Martín, desarrollador fullstack con una especialización en Inteligencia Artificial y Big Data. Me encanta la tecnología y todo lo que tenga que ver con crear, resolver problemas y experimentar con nuevas ideas. Siempre estoy buscando aprender algo nuevo, porque creo que la curiosidad es la mejor herramienta para crecer tanto en lo profesional como en lo personal."
            data-en="Hi! I'm Aday Martín, a fullstack developer with a specialization in Artificial Intelligence and Big Data. I love technology and everything related to creating, solving problems, and experimenting with new ideas. I'm always eager to learn something new, because I believe curiosity is the best tool to grow both professionally and personally."
          >
          </p>

          {/* Botón CV */}
          <div className="mt-8">
            <a
              href={cv}
              download
              data-es="📄 Descargar CV"
              data-en="📄 Download CV"
              className="inline-block px-6 py-3 text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow transition-colors duration-200"
            >
            </a>
          </div>

          <br></br> 
          {/* Soft skills */}
          <div className="mt-8">
            <h3
              className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              data-es="Soft skills"
              data-en="Soft skills"
            >
              Soft skills
            </h3>

            <ul className="mt-3 flex flex-wrap gap-2">
              <li>
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300/50 dark:border-slate-700 px-3 py-1 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                  data-es="🗣️ Comunicación"
                  data-en="🗣️ Communication"
                >
                  <span aria-hidden>🗣️</span> <span>Comunicación</span>
                </span>
              </li>
              <li>
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300/50 dark:border-slate-700 px-3 py-1 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                  data-es="🤝 Trabajo en equipo"
                  data-en="🤝 Teamwork"
                >
                  <span aria-hidden>🤝</span> <span>Trabajo en equipo</span>
                </span>
              </li>
              <li>
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300/50 dark:border-slate-700 px-3 py-1 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                  data-es="🧩 Resolución de problemas"
                  data-en="🧩 Problem solving"
                >
                  <span aria-hidden>🧩</span> <span>Resolución de problemas</span>
                </span>
              </li>
              <li>
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300/50 dark:border-slate-700 px-3 py-1 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                  data-es="🧠 Pensamiento crítico"
                  data-en="🧠 Critical thinking"
                >
                  <span aria-hidden>🧠</span> <span>Pensamiento crítico</span>
                </span>
              </li>
              <li>
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300/50 dark:border-slate-700 px-3 py-1 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                  data-es="📚 Aprendizaje continuo"
                  data-en="📚 Continuous learning"
                >
                  <span aria-hidden>📚</span> <span>Aprendizaje continuo</span>
                </span>
              </li>
              <li>
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300/50 dark:border-slate-700 px-3 py-1 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                  data-es="⏱️ Gestión del tiempo"
                  data-en="⏱️ Time management"
                >
                  <span aria-hidden>⏱️</span> <span>Gestión del tiempo</span>
                </span>
              </li>
              <li>
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300/50 dark:border-slate-700 px-3 py-1 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                  data-es="🎯 Empatía con el usuario"
                  data-en="🎯 User empathy"
                >
                  <span aria-hidden>🎯</span> <span>Empatía con el usuario</span>
                </span>
              </li>
              <li>
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300/50 dark:border-slate-700 px-3 py-1 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                  data-es="⚡ Proactividad"
                  data-en="⚡ Proactivity"
                >
                  <span aria-hidden>⚡</span> <span>Proactividad</span>
                </span>
              </li>
            </ul>
          </div>


        </div>

<div className="order-1 md:order-2 flex justify-center md:self-start md:-mt-4">
  <img
    src={foto}
    alt="Foto de Aday Martín"
    className="w-40 sm:w-56 md:w-72 lg:w-100 aspect-square object-cover rounded-full shadow-lg ring-1 ring-white/10"
  />
</div>




      </div>
    </section>
  );
}
