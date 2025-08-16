export default function Hero() {
  return (
    <section className="min-h-[60vh] grid place-items-center px-6">
      <div className="max-w-2xl text-center">
        <p className="text-sm uppercase tracking-widest text-slate-400">
          Portfolio
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          Hola, soy <span className="text-indigo-500">Aday</span>
        </h1>
        <p className="mt-4 text-slate-300">
          Desarrollador/a orientado/a a IA & Big Data. Me gusta construir
          interfaces limpias y proyectos con propósito.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#sobre_mi"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500"
          >
            Sobre mi
          </a>
          <a
            href="#proyectos"
            className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Proyectos
          </a>

            <a
            href="#carrera"
            className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Carrera
          </a>
          <a
            href="#educacion"
            className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Educacion
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}