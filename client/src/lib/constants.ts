// Physical constants
export const CONSTANTS = {
  SPEED_OF_LIGHT: 299792458, // m/s
  PLANCK_CONSTANT: 6.62607015e-34, // J·s
  REDUCED_PLANCK_CONSTANT: 1.054571817e-34, // J·s
  ELEMENTARY_CHARGE: 1.602176634e-19, // C
  
  // For table display
  TABLE: [
    {
      name: 'Speed of light in vacuum',
      symbol: 'c',
      value: 2.99792458e8,
      units: 'm/s',
    },
    {
      name: 'Planck\'s constant',
      symbol: 'h',
      value: 6.62607015e-34,
      units: 'J·s',
    },
    {
      name: 'Reduced Planck\'s constant',
      symbol: 'ħ',
      value: 1.054571817e-34,
      units: 'J·s',
    },
    {
      name: 'Elementary charge',
      symbol: 'e',
      value: 1.602176634e-19,
      units: 'C',
    },
    {
      name: 'Electron mass',
      symbol: 'mₑ',
      value: 9.1093837015e-31,
      units: 'kg',
    },
    {
      name: 'Vacuum permittivity',
      symbol: 'ε₀',
      value: 8.8541878128e-12,
      units: 'F/m',
    },
  ]
};

// Optical symbols
export const SYMBOLS = [
  {
    symbol: 'λ',
    name: 'Wavelength',
    description: 'Distance between successive crests of a wave',
  },
  {
    symbol: 'f',
    name: 'Frequency',
    description: 'Number of wave cycles per unit time',
  },
  {
    symbol: 'ν',
    name: 'Frequency (Greek)',
    description: 'Alternative notation for frequency',
  },
  {
    symbol: 'E',
    name: 'Energy',
    description: 'Energy of a photon',
  },
  {
    symbol: 'n',
    name: 'Refractive index',
    description: 'Measure of how light slows in a medium',
  },
  {
    symbol: 'θ',
    name: 'Angle',
    description: 'Angle of incidence, reflection, or refraction',
  },
  {
    symbol: 'f',
    name: 'Focal length',
    description: 'Distance from lens/mirror to focal point',
  },
  {
    symbol: 'α',
    name: 'Absorption coefficient',
    description: 'Measure of how quickly light is absorbed',
  },
];

// Optical formulas
export const FORMULAS = [
  {
    formula: 'c = λf',
    description: 'Wave equation',
    variables: [
      { symbol: 'c', name: 'speed of light' },
      { symbol: 'λ', name: 'wavelength' },
      { symbol: 'f', name: 'frequency' },
    ],
  },
  {
    formula: 'E = hf',
    description: 'Photon energy',
    variables: [
      { symbol: 'E', name: 'energy' },
      { symbol: 'h', name: 'Planck\'s constant' },
      { symbol: 'f', name: 'frequency' },
    ],
  },
  {
    formula: 'n₁sin(θ₁) = n₂sin(θ₂)',
    description: 'Snell\'s Law',
    variables: [
      { symbol: 'n₁, n₂', name: 'refractive indices' },
      { symbol: 'θ₁, θ₂', name: 'angles' },
    ],
  },
  {
    formula: '1/f = 1/o + 1/i',
    description: 'Thin lens equation',
    variables: [
      { symbol: 'f', name: 'focal length' },
      { symbol: 'o', name: 'object distance' },
      { symbol: 'i', name: 'image distance' },
    ],
  },
  {
    formula: 'sin(θc) = n₂/n₁',
    description: 'Critical angle',
    variables: [
      { symbol: 'θc', name: 'critical angle' },
      { symbol: 'n₁, n₂', name: 'refractive indices' },
    ],
  },
];
