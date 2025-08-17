import foto from "../assets/mi_foto.jpg";



export default function SobreMi() {
  return (
    <section
      id="sobre-mi"
      className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-6 py-16 flex items-center justify-center"
    >
      <div className="max-w-5xl flex flex-col md:flex-row items-center gap-10">
        
        {/* Texto */}
        <div className="flex-2 text-center md:text-left">
          <h1 className="text-6xl font-bold mb-6">Desarrollador Fullstack</h1>
          <p className="text-lg leading-relaxed">
¡Hola! Soy Aday Martín, desarrollador fullstack con una especialización en Inteligencia Artificial y Big Data. <br></br> Me encanta la tecnología y todo lo que tenga que ver con crear, resolver problemas y experimentar con nuevas ideas. Siempre estoy buscando aprender algo nuevo, porque creo que la curiosidad es la mejor herramienta para crecer tanto en lo profesional como en lo personal.          </p>
        </div>

        {/* Foto */}
        <div className="flex-1 flex justify-center">
          <img
              src={foto}
            className="w-80 h-80 object-cover rounded-full shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}