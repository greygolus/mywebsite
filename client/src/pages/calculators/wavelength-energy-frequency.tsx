import WavelengthEnergyFrequencyCalculator from '@/components/calculators/wavelength-energy-frequency';

const WavelengthEnergyFrequency = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Wavelength ↔ Energy ↔ Frequency Converter</h1>
        
        <WavelengthEnergyFrequencyCalculator />
      </div>
    </section>
  );
};

export default WavelengthEnergyFrequency;
