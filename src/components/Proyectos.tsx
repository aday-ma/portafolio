import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import portfolioImg from "../assets/portfolio.png";
import privadoImg from "../assets/privado.png";

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
    imageSrc: portfolioImg,
    tech: ["React", "Tailwind", "TypeScript", "HTML", "CSS", "Git"],
    year: new Date().getFullYear(),
    role: "Desarrolladora Frontend",
    repo: "https://github.com/aday-ma/portafolio",
    featured: true,
  },
  {
    id: "freelance-1",
    title: "💼 Proyecto Freelance",
    imageSrc: privadoImg,
    description:
      "Sitio web a medida para cliente: pagina de venta con sistema de logeo, compra totalmente funcional, correos y administracion tanto de productos como de pedidos.",
    tech: ["HTML", "CSS", "Javascript", "PHP"],
    year: new Date().getFullYear(),
    role: "Freelance",
    isPrivate: true,
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
      className="
        rounded-2xl overflow-hidden shadow
        bg-[rgb(var(--card))] ring-1 ring-[rgb(var(--card-ring))]
        transition-shadow hover:shadow-lg
      "
    >
      {/* Imagen / mockup */}
      <div className="relative w-full h-48 bg-[rgb(var(--card))]">
        {p.imageSrc ? (
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
          <span
            className="
              absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold
              bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))]
              ring-1 ring-transparent
            "
          >
            Destacado
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-tight text-[rgb(var(--fg))]">
          {p.title}
        </h3>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">{p.description}</p>

        {/* Metadata */}
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="
                px-3 py-1 text-xs rounded-full
                bg-[rgb(var(--card))] ring-1 ring-[rgb(var(--card-ring))]
              "
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 text-sm">
          {p.year && <span className="text-[rgb(var(--muted))]">{p.year}</span>}
          {p.role && <span className="text-[rgb(var(--muted))]">• {p.role}</span>}
        </div>

        {/* Acciones */}
        <div className="mt-5 flex flex-wrap gap-3">
          {p.link && !p.isPrivate && (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2 rounded-xl px-4 py-2
                bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))]
                hover:opacity-90 transition
              "
            >
              <span>Ver demo</span>
            </a>
          )}
          {p.repo && !p.isPrivate && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2 rounded-xl px-4 py-2
                ring-1 ring-[rgb(var(--card-ring))]
                hover:bg-[rgb(var(--card))]/60 transition
              "
            >
              <span>Ver código</span>
            </a>
          )}
          {p.isPrivate && (
            <span
              className="
                inline-flex items-center rounded-xl px-3 py-1 text-xs
                bg-[rgb(var(--card))] ring-1 ring-[rgb(var(--card-ring))]
                text-[rgb(var(--muted))]
              "
            >
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
    <div className="w-full h-full grid place-items-center bg-[rgb(var(--card))]">
      <div className="text-center">
        <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-[rgb(var(--card-ring))]" />
        <p className="text-[rgb(var(--muted))] text-xs">{title}</p>
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
          "px-3 py-1 text-xs rounded-full",
          active === null
            ? "bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))]"
            : "ring-1 ring-[rgb(var(--card-ring))] hover:bg-[rgb(var(--card))]/60"
        )}
      >
        Todo
      </button>
      {allTech.map((t) => (
        <button
          key={t}
          onClick={() => onChange(active === t ? null : t)}
          className={cx(
            "px-3 py-1 text-xs rounded-full",
            active === t
              ? "bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))]"
              : "ring-1 ring-[rgb(var(--card-ring))] hover:bg-[rgb(var(--card))]/60"
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
    <section id="proyectos" className="px-6 py-16 bg-[rgb(var(--bg))] text-[rgb(var(--fg))] transition-colors">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-sm mt-1 text-[rgb(var(--muted))]">
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
