const Card = ({ title }: { title: string }) => (
  <div className="rounded-2xl bg-slate-900/60 ring-1 ring-slate-800 p-4 shadow">
    <div className="aspect-video w-full rounded-xl bg-slate-800/60 ring-1 ring-slate-700 mb-4" />
    <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
    <p className="text-sm text-slate-300 mb-4">
      Breve descripción lorem ipsum dolor sit amet consectetur.
    </p>
    <div className="flex gap-2">
      <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">React</span>
      <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">Tailwind</span>
      <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">AI</span>
    </div>
  </div>
);

export default function Proyectos() {
  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-6 py-24 space-y-6">
      <h2 className="text-3xl font-semibold">Proyectos</h2>
      <p className="text-slate-300">Tarjetas falsas para probar el layout y el grid.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} title={`Proyecto ${i + 1}`} />
        ))}
      </div>

      <div className="space-y-4 text-slate-400">
        {Array.from({ length: 2 }).map((_, i) => (
          <p key={i}>Contenido extra para alargar la sección. (Proyectos #{i + 1})</p>
        ))}
      </div>
    </section>
  );
}
