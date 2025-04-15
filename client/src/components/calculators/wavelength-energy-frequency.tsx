import { useState, ChangeEvent, FormEvent } from 'react';
import { CONSTANTS } from '@/lib/constants';

interface CalculatorFormState {
  wavelength: string;
  wavelengthUnit: string;
  frequency: string;
  frequencyUnit: string;
  energy: string;
  energyUnit: string;
}

interface CalculatorResults {
  wavelength_m: number | null;
  frequency_Hz: number | null;
  energy_J: number | null;
  classification: string;
}

const WavelengthEnergyFrequencyCalculator = () => {
  const [formState, setFormState] = useState<CalculatorFormState>({
    wavelength: '',
    wavelengthUnit: 'nm',
    frequency: '',
    frequencyUnit: 'Hz',
    energy: '',
    energyUnit: 'eV',
  });

  const [results, setResults] = useState<CalculatorResults>({
    wavelength_m: null,
    frequency_Hz: null,
    energy_J: null,
    classification: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();

    // Constants
    const c = CONSTANTS.SPEED_OF_LIGHT; // Speed of light in m/s
    const h = CONSTANTS.PLANCK_CONSTANT; // Planck's constant in J·s
    const eV_to_J = 1.602176634e-19; // Conversion from eV to J
    
    // Parse input values
    const wavelengthInput = parseFloat(formState.wavelength);
    const frequencyInput = parseFloat(formState.frequency);
    const energyInput = parseFloat(formState.energy);
    
    // Convert input to SI units
    let wavelength_m: number | null = null;
    if (!isNaN(wavelengthInput)) {
      switch (formState.wavelengthUnit) {
        case 'nm': wavelength_m = wavelengthInput * 1e-9; break;
        case 'μm': wavelength_m = wavelengthInput * 1e-6; break;
        case 'mm': wavelength_m = wavelengthInput * 1e-3; break;
        case 'm': wavelength_m = wavelengthInput; break;
      }
    }
    
    let frequency_Hz: number | null = null;
    if (!isNaN(frequencyInput)) {
      switch (formState.frequencyUnit) {
        case 'Hz': frequency_Hz = frequencyInput; break;
        case 'kHz': frequency_Hz = frequencyInput * 1e3; break;
        case 'MHz': frequency_Hz = frequencyInput * 1e6; break;
        case 'GHz': frequency_Hz = frequencyInput * 1e9; break;
        case 'THz': frequency_Hz = frequencyInput * 1e12; break;
      }
    }
    
    let energy_J: number | null = null;
    if (!isNaN(energyInput)) {
      switch (formState.energyUnit) {
        case 'eV': energy_J = energyInput * eV_to_J; break;
        case 'J': energy_J = energyInput; break;
      }
    }
    
    // Perform calculations
    if (wavelength_m !== null) {
      frequency_Hz = c / wavelength_m;
      energy_J = h * frequency_Hz;
    } else if (frequency_Hz !== null) {
      wavelength_m = c / frequency_Hz;
      energy_J = h * frequency_Hz;
    } else if (energy_J !== null) {
      frequency_Hz = energy_J / h;
      wavelength_m = c / frequency_Hz;
    }
    
    // Determine spectrum classification based on wavelength
    let classification = '';
    if (wavelength_m !== null) {
      const wavelength_nm = wavelength_m * 1e9;
      
      if (wavelength_nm < 10) {
        classification = 'Gamma rays';
      } else if (wavelength_nm < 10) {
        classification = 'X-rays';
      } else if (wavelength_nm < 400) {
        classification = 'Ultraviolet (UV)';
      } else if (wavelength_nm < 700) {
        classification = 'Visible light';
        
        // Determine color
        let color = '';
        if (wavelength_nm < 450) color = 'Violet';
        else if (wavelength_nm < 495) color = 'Blue';
        else if (wavelength_nm < 570) color = 'Green';
        else if (wavelength_nm < 590) color = 'Yellow';
        else if (wavelength_nm < 620) color = 'Orange';
        else color = 'Red';
        
        classification += ` (${color})`;
      } else if (wavelength_nm < 1000) {
        classification = 'Near Infrared (NIR)';
      } else if (wavelength_nm < 1e6) {
        classification = 'Infrared (IR)';
      } else {
        classification = 'Microwave / Radio waves';
      }
    }

    setResults({
      wavelength_m,
      frequency_Hz,
      energy_J,
      classification
    });
  };

  const handleReset = () => {
    setFormState({
      wavelength: '',
      wavelengthUnit: 'nm',
      frequency: '',
      frequencyUnit: 'Hz',
      energy: '',
      energyUnit: 'eV',
    });
    setResults({
      wavelength_m: null,
      frequency_Hz: null,
      energy_J: null,
      classification: '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Inputs */}
        <div>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Formulas</h3>
            <div className="space-y-2">
              <p className="font-mono text-sm">c = λf</p>
              <p className="font-mono text-sm">E = hf</p>
              <p className="font-mono text-sm">E = hc/λ</p>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              <p>Where:</p>
              <ul className="list-disc pl-4 mt-1 space-y-1">
                <li><span className="font-mono">c</span> = Speed of light ({CONSTANTS.SPEED_OF_LIGHT.toExponential(8)} m/s)</li>
                <li><span className="font-mono">h</span> = Planck's constant ({CONSTANTS.PLANCK_CONSTANT.toExponential(8)} J·s)</li>
                <li><span className="font-mono">λ</span> = Wavelength</li>
                <li><span className="font-mono">f</span> = Frequency</li>
                <li><span className="font-mono">E</span> = Energy</li>
              </ul>
            </div>
          </div>
          
          <form onSubmit={handleCalculate}>
            {/* Wavelength Input */}
            <div className="mb-6">
              <label htmlFor="wavelength" className="block text-sm font-medium text-gray-700 mb-1">Wavelength</label>
              <div className="flex">
                <input 
                  type="text" 
                  id="wavelength" 
                  name="wavelength" 
                  value={formState.wavelength}
                  onChange={handleInputChange}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter value" 
                />
                <select 
                  id="wavelengthUnit" 
                  name="wavelengthUnit"
                  value={formState.wavelengthUnit}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="nm">nm</option>
                  <option value="μm">μm</option>
                  <option value="mm">mm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>
            
            {/* Frequency Input */}
            <div className="mb-6">
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
              <div className="flex">
                <input 
                  type="text" 
                  id="frequency" 
                  name="frequency"
                  value={formState.frequency}
                  onChange={handleInputChange}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter value" 
                />
                <select 
                  id="frequencyUnit" 
                  name="frequencyUnit"
                  value={formState.frequencyUnit}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Hz">Hz</option>
                  <option value="kHz">kHz</option>
                  <option value="MHz">MHz</option>
                  <option value="GHz">GHz</option>
                  <option value="THz">THz</option>
                </select>
              </div>
            </div>
            
            {/* Energy Input */}
            <div className="mb-6">
              <label htmlFor="energy" className="block text-sm font-medium text-gray-700 mb-1">Energy</label>
              <div className="flex">
                <input 
                  type="text" 
                  id="energy" 
                  name="energy"
                  value={formState.energy}
                  onChange={handleInputChange}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter value" 
                />
                <select 
                  id="energyUnit" 
                  name="energyUnit"
                  value={formState.energyUnit}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="eV">eV</option>
                  <option value="J">J</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Calculate
              </button>
              <button 
                type="button" 
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        
        {/* Right column - Results */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Wavelength</h4>
                <p className="text-lg font-mono">
                  {results.wavelength_m !== null 
                    ? `${results.wavelength_m.toExponential(6)} m` 
                    : '--'}
                </p>
                <p className="text-sm text-gray-600">
                  {results.wavelength_m !== null 
                    ? `${(results.wavelength_m * 1e9).toFixed(2)} nm` 
                    : '--'}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700">Frequency</h4>
                <p className="text-lg font-mono">
                  {results.frequency_Hz !== null 
                    ? `${results.frequency_Hz.toExponential(6)} Hz` 
                    : '--'}
                </p>
                <p className="text-sm text-gray-600">
                  {results.frequency_Hz !== null 
                    ? results.frequency_Hz >= 1e12 
                      ? `${(results.frequency_Hz / 1e12).toFixed(2)} THz`
                      : results.frequency_Hz >= 1e9 
                        ? `${(results.frequency_Hz / 1e9).toFixed(2)} GHz`
                        : `${(results.frequency_Hz / 1e6).toFixed(2)} MHz`
                    : '--'}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700">Energy</h4>
                <p className="text-lg font-mono">
                  {results.energy_J !== null 
                    ? `${results.energy_J.toExponential(6)} J` 
                    : '--'}
                </p>
                <p className="text-sm text-gray-600">
                  {results.energy_J !== null 
                    ? `${(results.energy_J / 1.602176634e-19).toFixed(4)} eV` 
                    : '--'}
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Spectrum Classification</h4>
              <p className="text-sm">{results.classification || '--'}</p>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">How to use</h3>
            <ol className="list-decimal pl-4 text-sm text-gray-600 space-y-1">
              <li>Enter a value in any one field</li>
              <li>Select the appropriate unit</li>
              <li>Click "Calculate" to compute the other values</li>
              <li>Results will display in multiple units</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WavelengthEnergyFrequencyCalculator;
