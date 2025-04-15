import AngleCalculator from '@/components/calculators/angle-calculator';

const AngleCalculatorPage = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Snell's Law & Critical Angle Calculator</h1>
        
        <div className="mb-6">
          <p className="text-gray-700">
            This unified calculator helps you understand how light behaves at the interface between two materials.
            Calculate refraction angles using Snell's Law and determine when total internal reflection occurs.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <AngleCalculator />
        </div>
        
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Understanding Optical Interfaces</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Snell's Law</h3>
            <p className="text-gray-700">
              Snell's Law describes how light refracts (bends) when it passes from one medium to another.
              The formula (n₁sin(θ₁) = n₂sin(θ₂)) relates the angles of incidence and refraction to the
              refractive indices of the two media.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Critical Angle & Total Internal Reflection</h3>
            <p className="text-gray-700">
              When light travels from a higher refractive index medium to a lower one, total internal
              reflection occurs if the incident angle exceeds the critical angle. The critical angle
              can be calculated using θc = arcsin(n₂/n₁).
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Common Applications</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
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