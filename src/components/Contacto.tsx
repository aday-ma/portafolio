export default function Contacto() {
  return (
    <section id="contacto" className="mx-auto max-w-5xl px-6 py-24 space-y-6">
      <h2 className="text-3xl font-semibold">Contacto</h2>
      <p className="text-slate-300">
        Este formulario es ficticio, sirve para probar foco, layout y altura.
      </p>

      <form
        className="grid gap-4 rounded-2xl bg-slate-900/60 ring-1 ring-slate-800 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Enviado (demo)");
        }}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="rounded-xl bg-slate-950/70 px-3 py-2 ring-1 ring-slate-800 text-slate-100 placeholder-slate-500"
            placeholder="Nombre"
          />
          <input
            className="rounded-xl bg-slate-950/70 px-3 py-2 ring-1 ring-slate-800 text-slate-100 placeholder-slate-500"
            placeholder="Email"
            type="email"
          />
        </div>
        <textarea
          className="min-h-[120px] rounded-xl bg-slate-950/70 px-3 py-2 ring-1 ring-slate-800 text-slate-100 placeholder-slate-500"
          placeholder="Tu mensaje"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">* Demo, no envía datos reales.</span>
          <button
            className="rounded-xl bg-orange-400/90 px-4 py-2 text-slate-900 font-semibold hover:bg-orange-400"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>

      <div className="space-y-4 text-slate-400">
        {Array.from({ length: 2 }).map((_, i) => (
          <p key={i}>Texto de relleno adicional. (Contacto #{i + 1})</p>
        ))}
      </div>
    </section>
  );
}
