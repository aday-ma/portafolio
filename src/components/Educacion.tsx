export default function Educacion() {
  return (
    <section id="educacion" className="mx-auto max-w-5xl px-6 py-24 space-y-6">
      <h2 className="text-3xl font-semibold">Educación</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-slate-900/60 ring-1 ring-slate-800 p-5">
            <div className="text-orange-300 text-sm font-semibold">202{1 + (i % 3)} — 202{2 + (i % 3)}</div>
            <div className="text-slate-100 font-medium">Programa / Título #{i + 1}</div>
            <div className="text-slate-300 text-sm">
              Universidad o plataforma. Breve descripción lorem ipsum dolor.
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 text-slate-400">
        {Array.from({ length: 3 }).map((_, i) => (
          <p key={i}>Otro párrafo de relleno para probar el scroll. (Educación #{i + 1})</p>
        ))}
      </div>
    </section>
  );
}
