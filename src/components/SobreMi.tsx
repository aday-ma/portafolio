import foto from "../assets/mi_foto.jpg";



// IMPORTA tu foto si la tienes en src/assets
// import foto from "../assets/mi-foto.jpg";

export default function SobreMi() {
  return (
    <section
      id="sobre-mi"
      className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-6 py-16 flex items-center"
    >
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Texto */}
        <div className="order-2 md:order-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Desarrollador Fullstack
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-prose text-left">
            ¡Hola! Soy Aday Martín, desarrollador fullstack con una especialización en
            Inteligencia Artificial y Big Data. Me encanta la tecnología y todo lo que tenga que ver con crear,
            resolver problemas y experimentar con nuevas ideas. Siempre estoy buscando aprender algo nuevo, porque
            creo que la curiosidad es la mejor herramienta para crecer tanto en lo profesional como en lo personal.
          </p>
        </div>

        {/* Foto */}
        <div className="order-1 md:order-2 flex justify-center">
          <img
            // src={foto} // si importas desde assets
            src={foto} // si la pones en /public
            alt="Foto de Aday Martín"
            className="w-40 sm:w-56 md:w-72 lg:w-80 aspect-square object-cover rounded-full shadow-lg ring-1 ring-white/10"
          />
        </div>
      </div>
    </section>
  );
}
