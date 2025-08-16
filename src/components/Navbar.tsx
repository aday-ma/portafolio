import { useEffect, useRef, useState } from "react";

type Section = { id: string; label: string };
const SECTIONS: Section[] = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "carrera", label: "Carrera" },
  { id: "educacion", label: "Educación" },
  { id: "contacto", label: "Contacto" },
];

// ===== Hooks utilitarios =====
function useScrollDirection(threshold = 6) {
  const lastY = useRef(0);
  const [dir, setDir] = useState<"up" | "down">("up");
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY.current;
      if (Math.abs(delta) < threshold) return;
      setDir(delta > 0 ? "down" : "up");
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return dir;
}

function useCurrentSection(ids: string[]) {
  const [cur, setCur] = useState(ids[0] ?? "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best?.target?.id) setCur(best.target.id);
      },
      {
        rootMargin: "-24% 0px -56% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return cur;
}

const cn = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");

// ===== Componente =====
export default function Navbar() {
  const dir = useScrollDirection();
  const currentId = useCurrentSection(SECTIONS.map((s) => s.id));

  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Activa modo compacto al pasar cierto scroll
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Regla de visibilidad:
  // - Header visible si no hay compacto o si subimos.
  // - Pill visible si hay compacto y NO se ve el header (para que nunca "desaparezca" todo).
  const showHeader = !compact || dir === "up";
  const showPill = compact && !showHeader;

  // Cerrar menú al hacer click fuera o con ESC
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest?.("#nav-pill") && !t.closest?.("#nav-dropdown")) {
        setMenuOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const currentLabel = SECTIONS.find((s) => s.id === currentId)?.label ?? SECTIONS[0].label;

  const goTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* HEADER COMPLETO */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
          showHeader ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="mx-auto max-w-6xl rounded-b-2xl bg-slate-900/70 backdrop-blur shadow ring-1 ring-slate-800">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-semibold tracking-tight text-orange-300"
            >
              Aday.dev
            </button>

            <ul className="hidden gap-6 md:flex">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => goTo(s.id)}
                    className={cn(
                      "text-sm transition-colors",
                      currentId === s.id ? "text-orange-300" : "text-slate-200/90 hover:text-white"
                    )}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* PILL COMPACTO (SIEMPRE visible cuando bajamos) */}
      {showPill && (
        <div className="fixed left-1/2 top-3 z-40 -translate-x-1/2 md:top-4">
          <div id="nav-pill" className="relative">
            <button
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full bg-slate-800/95 px-4 py-2 text-sm text-slate-100 shadow-lg ring-1 ring-slate-700 backdrop-blur"
            >
              <span className="font-medium">{currentLabel}</span>
              <svg
                className={cn("h-4 w-4 transition-transform", menuOpen && "rotate-180")}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.24l3.71-3.01a.75.75 0 111.04 1.08l-4.24 3.44a.75.75 0 01-.95 0L5.21 8.31a.75.75 0 01.02-1.1z" />
              </svg>
            </button>

            {/* MENÚ COMPLETO DESPLEGABLE (apariencia de “barra entera”) */}
            {menuOpen && (
              <div
                id="nav-dropdown"
                role="menu"
                className="absolute left-1/2 mt-2 w-[min(92vw,740px)] -translate-x-1/2 overflow-hidden rounded-2xl bg-slate-900/95 p-2 shadow-2xl ring-1 ring-slate-700 backdrop-blur"
              >
                <div className="flex flex-wrap items-center justify-center gap-1">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      role="menuitem"
                      onClick={() => goTo(s.id)}
                      className={cn(
                        "rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-slate-800",
                        currentId === s.id && "text-orange-300"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
