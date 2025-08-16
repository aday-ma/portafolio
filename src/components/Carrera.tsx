const TimelineItem = ({
  year,
  title,
  desc,
}: {
  year: string;
  title: string;
  desc: string;
}) => (
  <li className="relative pl-6">
    <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-orange-400" />
    <div className="text-sm text-orange-300 font-semibold">{year}</div>
    <div className="text-slate-100 font-medium">{title}</div>
    <div className="text-slate-300 text-sm">{desc}</div>
  </li>
);

export default function Carrera() {
  return (
    <section id="carrera" className="mx-auto max-w-5xl px-6 py-24 space-y-8">
      <h2 className="text-3xl font-semibold">Carrera</h2>

      <ul className="border-l border-slate-800 space-y-6 pl-4">
        <TimelineItem
          year="2025"
          title="Frontend Dev — Empresa X"
          desc="React, Tailwind, diseño de componentes y accesibilidad."
        />
        <TimelineItem
          year="2024"
          title="Data/AI Intern — Empresa Y"
          desc="Dashboards, pipelines y pequeños modelos de ML."
        />
        <TimelineItem
          year="2023"
          title="Freelance"
          desc="Landing pages, portfolios y automatizaciones con IA."
        />
      </ul>

      <div className="space-y-4 text-slate-400">
        {Array.from({ length: 4 }).map((_, i) => (
          <p key={i}>Texto de prueba para aumentar la altura. (Carrera #{i + 1})</p>
        ))}
      </div>
    </section>
  );
}
