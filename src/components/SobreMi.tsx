export default function SobreMi() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-5xl px-6 py-24 space-y-6">
      <h2 className="text-3xl font-semibold">Sobre mí</h2>
      <p className="text-slate-300">
        Texto de prueba. Me apasiona el desarrollo web, la IA y los datos. Este bloque es
        solo para forzar altura y ver el comportamiento del menú.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-slate-900/60 ring-1 ring-slate-800 p-4">
            <div className="h-10 w-10 rounded-lg bg-slate-800 ring-1 ring-slate-700 mb-3" />
            <div className="text-sm text-slate-200 font-medium">Skill #{i + 1}</div>
            <div className="text-xs text-slate-400">Nivel intermedio</div>
          </div>
        ))}
      </div>

      <div className="space-y-4 text-slate-400">
        {Array.from({ length: 6 }).map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at justo ut sapien dictum
            aliquam. Praesent feugiat dui id augue feugiat tempus. (Sobre mí #{i + 1})
          </p>
        ))}
      </div>
    </section>
  );
}
