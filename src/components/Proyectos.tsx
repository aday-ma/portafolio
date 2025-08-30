import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// =====================
// Tipos y datos ejemplo
// =====================
export type Project = {
  id: string;
  title: string;
  description: string;
  imageSrc?: string; // ruta a mockup o screenshot
  tech: string[]; // etiquetas de tecnologías
  year?: number;
  role?: string;
  link?: string; // opcional: demo pública
  repo?: string; // opcional: repo público
  isPrivate?: boolean; // si es para cliente y no hay enlace
  featured?: boolean; // opcional: destacar en el grid
};

const PROJECTS: Project[] = [
  {
    id: "portfolio",
    title: "🌐 Portfolio Personal",
    description:
      "Portfolio en React + Tailwind con animaciones, navegación fluida y secciones de carrera, educación y contacto.",
    imageSrc: "public/mockups/portfolio.png",
    tech: ["React", "Tailwind", "TypeScript", "HTML", "CSS", "Git"],
    year: new Date().getFullYear(),
    role: "Desarrolladora Frontend",
    repo: "https://github.com/aday-ma/portafolio",
    featured: true,
  },
  {
    id: "freelance-1",
    title: "💼 Proyecto Freelance",
    imageSrc: "public/mockups/privado.png",
    description:
      "Sitio web a medida para cliente: pagina de venta con sistema de logeo, compra totalmente funcional, correos y administracion tanto de productos como de pedidos.",
    tech: ["HTML", "CSS", "Javascript", "PHP"],
    year: new Date().getFullYear(),
    role: "Freelance",
    isPrivate: true, // no mostramos enlace por privacidad
  },
];

// =====================
// Utilidades
// =====================
const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// =====================
// Card de Proyecto
// =====================
function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Imagen / mockup */}
      <div className="relative w-full h-48 bg-slate-900">
        {p.imageSrc ? (
          // Si usas Next.js, cambia por <Image fill ... />
          <img
            src={p.imageSrc}
            alt={`${p.title} mockup`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <PlaceholderVisual title={p.title} />
        )}
        {p.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1">
            Destacado
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-tight">{p.title}</h3>
        <p className="mt-2 text-slate-300 text-sm">{p.description}</p>

        {/* Metadata */}
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs bg-slate-700 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 text-sm">
          {p.year && (
            <span className="text-slate-400">{p.year}</span>
          )}
          {p.role && (
            <span className="text-slate-400">• {p.role}</span>
          )}
        </div>

        {/* Acciones */}
        <div className="mt-5 flex flex-wrap gap-3">
          {p.link && !p.isPrivate && (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-slate-100 text-slate-900 hover:bg-white"
            >
              <span>Ver demo</span>
            </a>
          )}
          {p.repo && !p.isPrivate && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-slate-600 hover:border-slate-500"
            >
              <span>Ver código</span>
            </a>
          )}
          {p.isPrivate && (
            <span className="inline-flex items-center rounded-xl px-3 py-1 text-xs bg-slate-700 text-slate-200">
              Enlace privado
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Placeholder por si no hay imagen
function PlaceholderVisual({ title }: { title: string }) {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-slate-700" />
        <p className="text-slate-500 text-xs">{title}</p>
      </div>
    </div>
  );
}

// =====================
// Controles (filtros simples)
// =====================
function ProjectsControls({
  allTech,
  active,
  onChange,
}: {
  allTech: string[];
  active: string | null;
  onChange: (t: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onChange(null)}
        className={cx(
          "px-3 py-1 text-xs rounded-full border",
          active === null
            ? "bg-slate-100 text-slate-900 border-slate-200"
            : "border-slate-600 hover:border-slate-500"
        )}
      >
        Todo
      </button>
      {allTech.map((t) => (
        <button
          key={t}
          onClick={() => onChange(active === t ? null : t)}
          className={cx(
            "px-3 py-1 text-xs rounded-full border",
            active === t
              ? "bg-slate-100 text-slate-900 border-slate-200"
              : "border-slate-600 hover:border-slate-500"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// =====================
// Sección principal
// =====================
export default function ProjectsSection({
  items = PROJECTS,
  title = "Proyectos",
}: {
  items?: Project[];
  title?: string;
}) {
  const [filter, setFilter] = useState<string | null>(null);

  const allTech = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    if (!filter) return items;
    return items.filter((p) => p.tech.includes(filter));
  }, [items, filter]);

  const ordered = useMemo(() => {
    // Destacados primero, luego por año desc
    return [...filtered].sort((a, b) => {
      const feat = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (feat !== 0) return feat;
      return (b.year ?? 0) - (a.year ?? 0);
    });
  }, [filtered]);

  return (
    <section id="proyectos" className="px-6 py-16 bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-slate-400 text-sm mt-1">
              Añade nuevos proyectos simplemente incorporándolos al array.
            </p>
          </div>
          <ProjectsControls allTech={allTech} active={filter} onChange={setFilter} />
        </header>

        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:1fr]"
        >
          {ordered.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
