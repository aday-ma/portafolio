// App.tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SobreMi from "./components/SobreMi";
import Proyectos from "./components/Proyectos";
import Carrera from "./components/Carrera";
import Educacion from "./components/Educacion";
import Contacto from "./components/Contacto";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      {/* Espaciador para no ocultar el contenido bajo la navbar fija */}
      <div aria-hidden className="h-20" />
      <Hero />
      <SobreMi />
      <Proyectos />
      <Carrera />
      <Educacion />
      <Contacto />
    </main>
  );
}
