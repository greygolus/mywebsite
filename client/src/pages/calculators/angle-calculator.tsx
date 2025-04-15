import AngleCalculator from '@/components/calculators/angle-calculator';

const AngleCalculatorPage = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-5xl font-bold mb-8 gradient-text animate-fade-in">Snell's Law & Critical Angle Calculator</h1>
        
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '100ms'}}>
          <p className="text-gray-300 text-lg">
            This unified calculator helps you understand how light behaves at the interface between two materials.
            Calculate refraction angles using Snell's Law and determine when total internal reflection occurs.
          </p>
        </div>
        
        <div className="bg-dark-card rounded-xl shadow-xl border border-dark-border p-6 md:p-8 animate-fade-in-up" style={{animationDelay: '200ms'}}>
          <AngleCalculator />
        </div>
        
        <div className="mt-12 space-y-8 animate-fade-in-up" style={{animationDelay: '300ms'}}>
          <h2 className="text-3xl font-bold gradient-text">Understanding Optical Interfaces</h2>
          
          <div className="bg-dark-card rounded-xl shadow-xl border border-dark-border p-6 md:p-8 space-y-4">
            <h3 className="text-2xl font-medium gradient-text">Snell's Law</h3>
            <p className="text-gray-300">
              Snell's Law describes how light refracts (bends) when it passes from one medium to another.
              The formula <span className="font-mono">(n₁sin(θ₁) = n₂sin(θ₂))</span> relates the angles of incidence and refraction to the
              refractive indices of the two media.
            </p>
          </div>
          
          <div className="bg-dark-card rounded-xl shadow-xl border border-dark-border p-6 md:p-8 space-y-4">
            <h3 className="text-2xl font-medium gradient-text">Critical Angle & Total Internal Reflection</h3>
            <p className="text-gray-300">
              When light travels from a higher refractive index medium to a lower one, total internal
              reflection occurs if the incident angle exceeds the critical angle. The critical angle
              can be calculated using <span className="font-mono">θc = arcsin(n₂/n₁)</span>.
            </p>
          </div>
          
          <div className="bg-dark-card rounded-xl shadow-xl border border-dark-border p-6 md:p-8 space-y-4">
            <h3 className="text-2xl font-medium gradient-text">Common Applications</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Fiber optic communications</li>
              <li>Optical prisms and lenses</li>
              <li>Gemstone brilliance and light dispersion</li>
              <li>Underwater photography</li>
              <li>Binoculars and telescopes</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AngleCalculatorPage;