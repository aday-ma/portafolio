import { useEffect, useRef, useState } from "react";

const NAME = "Aday Martín";

type Section = { id: string; label: string };
const SECTIONS: Section[] = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "carrera", label: "Carrera" },
  { id: "educacion", label: "Educación" },
  { id: "contacto", label: "Contacto" },
];

const cn = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

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
      { rootMargin: "-24% 0px -56% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return cur;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);     // menú móvil
  const currentId = useCurrentSection(SECTIONS.map(s => s.id));
  const currentLabel = SECTIONS.find(s => s.id === currentId)?.label ?? SECTIONS[0].label;

  const [language, setLanguage] = useState("ES");
  const [theme, setTheme] = useState("light");

  // ----- Animación fluida de encogido por scroll -----
  const [t, setT] = useState(0);              // 0..1 progreso
  const rafRef = useRef<number | null>(null);
  const targetY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const SHRINK_DISTANCE = 220; // px para completar el encogido
    const DAMP = 0.14;           // suavizado

    const onScroll = () => {
      targetY.current = window.scrollY;
      if (rafRef.current == null) tick();
    };

    const tick = () => {
      currentY.current = lerp(currentY.current, targetY.current, DAMP);
      setT(clamp(currentY.current / SHRINK_DISTANCE, 0, 1));
      if (Math.abs(currentY.current - targetY.current) > 0.5) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Mostrar pill compacto cuando ya pasaste el encogido
  const showPill = t >= 1;
  const showHeader = !showPill;

  // Derivados de t
  const scale = lerp(1, 0.97, t);
  const padY  = lerp(16, 8, t);
  const padX  = lerp(24, 16, t);
  const opacityContent = lerp(1, 0.82, t);
  const nameOpacity    = lerp(1, 0.9, t);
  const nameSize       = lerp(20, 18, t);
  const maxInnerWidth  = t < 0.02 ? "100%" : "72rem";

  // Cerrar dropdowns al click fuera / ESC + focus handling
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // no cierres si clicas dentro del panel móvil
      if (!t.closest?.("#mobile-panel") && !t.closest?.("#mobile-trigger")) {
        // no cierres por defecto; solo si está abierto:
        // setMenuOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // Bloquear scroll de fondo cuando el menú móvil está abierto
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [menuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {showHeader && (
        <header
          className="fixed inset-x-0 top-0 z-50"
          style={{ paddingTop: "max(0px, env(safe-area-inset-top))" }} // soporte notch
        >
          <div className="bg-slate-900/90 backdrop-blur shadow">
            <nav
              className="mx-auto flex items-center justify-between gap-3 transition-[max-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                maxWidth: maxInnerWidth,
                paddingLeft: padX,
                paddingRight: padX,
                paddingTop: padY,
                paddingBottom: padY,
                transform: `scale(${scale})`,
                transformOrigin: "center top",
                willChange: "transform, opacity, padding, max-width",
              }}
            >
              {/* IZQUIERDA (móvil): botón hamburguesa */}
              <div className="flex items-center gap-2">
                <button
                  id="mobile-trigger"
                  aria-label="Abrir menú"
                  onClick={() => setMenuOpen(true)}
                  className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-md ring-1 ring-slate-700/60 hover:bg-slate-800/70 active:scale-95 transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-slate-200">
                    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Nombre (en móvil se mantiene, centrado con el resto via layout) */}
                <div
                  className="font-semibold tracking-tight text-orange-300"
                  style={{
                    opacity: nameOpacity,
                    fontSize: nameSize,
                    transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1), font-size 500ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {NAME}
                </div>
              </div>

              {/* CENTRO: secciones (ocultas en móvil, visibles ≥ md) */}
              <ul
                className="hidden md:flex gap-5 lg:gap-6 overflow-x-auto no-scrollbar"
                style={{
                  opacity: opacityContent,
                  transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => goTo(s.id)}
                      className={cn(
                        "text-sm md:text-[0.95rem] transition-colors",
                        currentId === s.id
                          ? "text-orange-300"
                          : "text-slate-200/90 hover:text-white"
                      )}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* DERECHA: botones (ocultos en móvil; dentro del panel móvil) */}
              <div
                className="hidden sm:flex items-center gap-2"
                style={{
                  opacity: opacityContent,
                  transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <button
                  onClick={() => setLanguage(language === "ES" ? "EN" : "ES")}
                  className="px-3 py-1 rounded-md border border-sky-400 hover:bg-sky-400/90 hover:text-white transition"
                >
                  {language}
                </button>
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="px-3 py-1 rounded-md border border-slate-400 hover:bg-slate-700/90 hover:text-white transition"
                >
                  Modo
                </button>
              </div>
            </nav>
          </div>
        </header>
      )}

      {/* PILL compacto (≥ umbral) — igual que antes */}
      {showPill && (
  <div className="fixed left-1/2 top-3 z-40 -translate-x-1/2 md:top-4">
    <div id="nav-pill" className="relative">
      <button
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-slate-800/95 px-4 py-2 text-sm text-slate-100 shadow-lg ring-1 ring-slate-700 backdrop-blur transition-all duration-300"
      >
        <span className="font-medium">{currentLabel}</span>
        <svg
          className={cn("h-4 w-4 transition-transform", menuOpen && "rotate-180")}
          viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.24l3.71-3.01a.75.75 0 111.04 1.08l-4.24 3.44a.75.75 0 01-.95 0L5.21 8.31a.75.75 0 01.02-1.1z" />
        </svg>
      </button>

      {/* Dropdown completo (solo en desktop) */}
      {menuOpen && (
        <div
          id="nav-dropdown"
          role="menu"
          className="hidden md:block absolute left-1/2 mt-2 w-[min(92vw,740px)]
                     -translate-x-1/2 overflow-hidden rounded-2xl 
                     bg-slate-900/95 p-4 shadow-2xl ring-1 ring-slate-700 backdrop-blur"
        >
          {/* Nombre arriba */}
          <div className="text-center mb-3 font-semibold text-orange-300">
            {NAME}
          </div>

          {/* Secciones */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
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

          {/* Botones idioma y modo */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setLanguage(language === "ES" ? "EN" : "ES")}
              className="px-3 py-1 rounded-md border border-sky-400 hover:bg-sky-400 hover:text-white transition"
            >
              {language}
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-3 py-1 rounded-md border border-slate-400 hover:bg-slate-700 hover:text-white transition"
            >
              Modo
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)}


      {/* ===== PANEL MÓVIL A PANTALLA COMPLETA ===== */}
      {/* Overlay + panel con animación; contiene secciones + botones idioma/modo */}
      <div
        className={cn(
          "sm:hidden fixed inset-0 z-50",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        {/* Fondo oscurecido */}
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        />
        {/* Panel */}
        <div
          id="mobile-panel"
          className={cn(
            "absolute inset-x-0 top-0 bg-slate-950 text-slate-100 pt-[max(16px,env(safe-area-inset-top))] pb-6",
            "transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            menuOpen ? "translate-y-0" : "-translate-y-full"
          )}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-orange-300">{NAME}</span>
            <button
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md ring-1 ring-slate-700/60 hover:bg-slate-800/70 active:scale-95 transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-slate-200">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="px-4 mt-2 space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => goTo(s.id)}
                className={cn(
                  "w-full text-left rounded-lg px-4 py-3 text-base ring-1 ring-slate-800 hover:bg-slate-900 transition",
                  currentId === s.id && "text-orange-300 ring-orange-300/40"
                )}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Acciones (idioma/modo) */}
          <div className="px-4 mt-4 flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "ES" ? "EN" : "ES")}
              className="flex-1 rounded-lg px-4 py-2 ring-1 ring-sky-500 hover:bg-sky-600/20 transition"
            >
              Idioma: {language}
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex-1 rounded-lg px-4 py-2 ring-1 ring-slate-600 hover:bg-slate-700/30 transition"
            >
              Modo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}