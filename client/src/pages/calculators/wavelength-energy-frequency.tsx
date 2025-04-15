import WavelengthEnergyFrequencyCalculator from '@/components/calculators/wavelength-energy-frequency';

const WavelengthEnergyFrequency = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-5xl font-bold mb-12 gradient-text animate-fade-in">Wavelength ↔ Energy ↔ Frequency Converter</h1>
        
        <div className="animate-fade-in-up">
          <WavelengthEnergyFrequencyCalculator />
        </div>
      </div>
    </section>
  );
};

export default WavelengthEnergyFrequency;
