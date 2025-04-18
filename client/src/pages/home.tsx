import { Link } from "wouter";

const Home = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6 text-center">
          Welcome to Grey Golus
        </h1>
        <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          A hub for optical science, visualization tools, and educational resources.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="card-glass p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-[1.02]">
            <h2 className="text-2xl font-bold gradient-text mb-4">Optics Unified</h2>
            <p className="text-gray-300 mb-6">
              Explore the scale of optical phenomena through an interactive visual journey from quantum to cosmic scales.
            </p>
            <Link href="/unified-optics" className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity">
              Explore
            </Link>
          </div>
          
          <div className="card-glass p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:scale-[1.02]">
            <h2 className="text-2xl font-bold gradient-text mb-4">Calculators</h2>
            <p className="text-gray-300 mb-6">
              Tools for wavelength calculations, Snell's law, critical angles, and more optical formulae.
            </p>
            <Link href="/directory#calculators" className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity">
              Calculate
            </Link>
          </div>
          
          <div className="card-glass p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(94,234,212,0.3)] hover:scale-[1.02]">
            <h2 className="text-2xl font-bold gradient-text mb-4">References</h2>
            <p className="text-gray-300 mb-6">
              Comprehensive reference tables for optical constants, formulas, and symbols.
            </p>
            <Link href="/reference" className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg hover:opacity-90 transition-opacity">
              View References
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;