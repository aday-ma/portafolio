// App.tsx
import Navbar from "./components/Navbar";
import SobreMi from "./components/SobreMi";
import Proyectos from "./components/Proyectos";
import Carrera from "./components/Carrera";
import Educacion from "./components/Educacion";
import Contacto from "./components/Contacto";

// App.tsx
export default function App() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 pt-24">
      <Navbar />
      <SobreMi />
      <Proyectos />
      <Carrera />
      <Educacion />
      <Contacto />
    </main>
  );
}
