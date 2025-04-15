// Physical constants
export const CONSTANTS = {
  SPEED_OF_LIGHT: 299792458, // m/s
  PLANCK_CONSTANT: 6.62607015e-34, // J·s
  REDUCED_PLANCK_CONSTANT: 1.054571817e-34, // J·s
  ELEMENTARY_CHARGE: 1.602176634e-19, // C
  
  // For table display
  TABLE: [
    {
      name: 'Speed of Light',
      symbol: 'c',
      exactValue: '299,792,458',
      approxValue: '~3.00 × 10⁸',
      units: 'm/s',
      siBaseUnits: 'm·s⁻¹',
    },
    {
      name: 'Planck\'s Constant',
      symbol: 'h',
      exactValue: '6.62607015 × 10⁻³⁴',
      approxValue: '~6.63 × 10⁻³⁴',
      units: 'J·s',
      siBaseUnits: 'kg·m²/s',
    },
    {
      name: 'Elementary Charge',
      symbol: 'e',
      exactValue: '1.602176634 × 10⁻¹⁹',
      approxValue: '~1.60 × 10⁻¹⁹',
      units: 'C',
      siBaseUnits: 'A·s',
    },
    {
      name: 'Vacuum Permittivity',
      symbol: 'ε₀',
      exactValue: '8.8541878128 × 10⁻¹²',
      approxValue: '~8.85 × 10⁻¹²',
      units: 'F/m',
      siBaseUnits: 'A²·s⁴·kg⁻¹·m⁻³',
    },
    {
      name: 'Vacuum Permeability',
      symbol: 'μ₀',
      exactValue: '4π × 10⁻⁷',
      approxValue: '~1.26 × 10⁻⁶',
      units: 'N/A²',
      siBaseUnits: 'kg·m·s⁻²·A⁻²',
    },
    {
      name: 'Refractive Index of Air',
      symbol: 'n_air',
      exactValue: '1.000293',
      approxValue: '~1.0003',
      units: 'unitless',
      siBaseUnits: '—',
    },
  ]
};

// Optical symbols
export const SYMBOLS = [
  {
    symbol: 'λ',
    name: 'Wavelength',
    description: 'Distance between wave peaks',
    units: 'm',
    siBaseUnits: 'm',
  },
  {
    symbol: 'ν / f',
    name: 'Frequency',
    description: 'Number of wave cycles per second',
    units: 'Hz',
    siBaseUnits: 's⁻¹',
  },
  {
    symbol: 'E',
    name: 'Energy',
    description: 'Energy of a photon',
    units: 'J',
    siBaseUnits: 'kg·m²/s²',
  },
  {
    symbol: 'h',
    name: 'Planck\'s Constant',
    description: 'Relates frequency to energy',
    units: 'J·s',
    siBaseUnits: 'kg·m²/s',
  },
  {
    symbol: 'c',
    name: 'Speed of Light',
    description: 'Speed of light in vacuum',
    units: 'm/s',
    siBaseUnits: 'm·s⁻¹',
  },
  {
    symbol: 'n',
    name: 'Refractive Index',
    description: 'Ratio of light speed in vacuum to medium',
    units: 'unitless',
    siBaseUnits: '—',
  },
  {
    symbol: 'θ',
    name: 'Angle',
    description: 'General optical angle',
    units: 'radians / degrees',
    siBaseUnits: 'rad',
  },
  {
    symbol: 'θ₁',
    name: 'Incident Angle',
    description: 'Angle of incoming light',
    units: 'radians / degrees',
    siBaseUnits: 'rad',
  },
  {
    symbol: 'θ₂',
    name: 'Refracted Angle',
    description: 'Angle of transmitted light',
    units: 'radians / degrees',
    siBaseUnits: 'rad',
  },
  {
    symbol: 'θ_c',
    name: 'Critical Angle',
    description: 'Angle for total internal reflection',
    units: 'radians / degrees',
    siBaseUnits: 'rad',
  },
  {
    symbol: 'f',
    name: 'Focal Length',
    description: 'Distance to focus point',
    units: 'm',
    siBaseUnits: 'm',
  },
  {
    symbol: 'd_o',
    name: 'Object Distance',
    description: 'Distance from object to lens/mirror',
    units: 'm',
    siBaseUnits: 'm',
  },
  {
    symbol: 'd_i',
    name: 'Image Distance',
    description: 'Distance from image to lens/mirror',
    units: 'm',
    siBaseUnits: 'm',
  },
  {
    symbol: 'M',
    name: 'Magnification',
    description: 'Image size divided by object size',
    units: 'unitless',
    siBaseUnits: '—',
  },
  {
    symbol: 'P',
    name: 'Optical Power',
    description: 'Converging strength of a lens',
    units: 'diopters (1/m)',
    siBaseUnits: 'm⁻¹',
  },
  {
    symbol: 'd',
    name: 'Slit/Grating Spacing',
    description: 'Spacing between slits',
    units: 'm',
    siBaseUnits: 'm',
  },
  {
    symbol: 'm',
    name: 'Diffraction Order',
    description: 'Order of interference',
    units: 'unitless',
    siBaseUnits: '—',
  },
  {
    symbol: 's',
    name: 'Object Distance (alt)',
    description: 'Alternate symbol for object distance',
    units: 'm',
    siBaseUnits: 'm',
  },
  {
    symbol: 's\'',
    name: 'Image Distance (alt)',
    description: 'Alternate symbol for image distance',
    units: 'm',
    siBaseUnits: 'm',
  },
  {
    symbol: 'S',
    name: 'Spectral Irradiance',
    description: 'Power per area per wavelength',
    units: 'W/(m²·nm)',
    siBaseUnits: 'kg·s⁻³',
  },
  {
    symbol: 'I',
    name: 'Irradiance',
    description: 'Power per area',
    units: 'W/m²',
    siBaseUnits: 'kg·s⁻³',
  },
  {
    symbol: 'Ω',
    name: 'Solid Angle',
    description: '2D angle in 3D space',
    units: 'steradian',
    siBaseUnits: '—',
  },
  {
    symbol: 'η',
    name: 'Efficiency',
    description: 'Output/input ratio',
    units: 'unitless / %',
    siBaseUnits: '—',
  },
  {
    symbol: 'Φ',
    name: 'General Optical Power',
    description: 'Power of lenses/mirrors in diopters',
    units: '1/m',
    siBaseUnits: 'm⁻¹',
  },
  {
    symbol: 't',
    name: 'Thickness',
    description: 'Thickness or separation of lens components',
    units: 'm',
    siBaseUnits: 'm',
  },
  {
    symbol: 'R',
    name: 'Radius of Curvature / Reflectance',
    description: 'Mirror curvature or reflection ratio',
    units: 'm / unitless',
    siBaseUnits: 'm / —',
  },
  {
    symbol: 'α',
    name: 'Absorption Coefficient',
    description: 'Rate of absorption in a medium',
    units: '1/m',
    siBaseUnits: 'm⁻¹',
  },
  {
    symbol: 'k',
    name: 'Wave Number',
    description: 'Spatial frequency of a wave',
    units: '1/m',
    siBaseUnits: 'm⁻¹',
  },
];

// Optical formulas
export const FORMULAS = [
  // Wave / Energy / Frequency
  {
    formula: 'E = hν = hc/λ',
    description: 'Energy of a photon',
    variables: 'E, h, ν, c, λ',
    category: 'Wave / Energy / Frequency',
  },
  {
    formula: 'c = λν',
    description: 'Wave speed-frequency-wavelength relationship',
    variables: 'c, λ, ν',
    category: 'Wave / Energy / Frequency',
  },
  {
    formula: 'v = c/n',
    description: 'Speed of light in a medium',
    variables: 'v, c, n',
    category: 'Wave / Energy / Frequency',
  },
  {
    formula: 'p = h/λ',
    description: 'Photon momentum',
    variables: 'p, h, λ',
    category: 'Wave / Energy / Frequency',
  },
  {
    formula: 'ω = 2πν',
    description: 'Angular frequency',
    variables: 'ω, ν',
    category: 'Wave / Energy / Frequency',
  },
  {
    formula: 'k = 2π/λ',
    description: 'Wave number',
    variables: 'k, λ',
    category: 'Wave / Energy / Frequency',
  },
  
  // Angles (Snell's Law, Critical Angle, Brewster)
  {
    formula: 'n₁ sin(θ₁) = n₂ sin(θ₂)',
    description: 'Snell\'s Law',
    variables: 'n₁, n₂, θ₁, θ₂',
    category: 'Angles',
  },
  {
    formula: 'θ_c = arcsin(n₂ / n₁)',
    description: 'Critical angle',
    variables: 'n₁, n₂, θ_c',
    category: 'Angles',
  },
  {
    formula: 'θ_B = arctan(n₂ / n₁)',
    description: 'Brewster\'s angle (polarization)',
    variables: 'θ_B, n₁, n₂',
    category: 'Angles',
  },
  {
    formula: 'R = ((n₁ - n₂)/(n₁ + n₂))²',
    description: 'Reflectance at interface',
    variables: 'R, n₁, n₂',
    category: 'Angles',
  },
  
  // Lenses & Mirrors
  {
    formula: '1/f = 1/d_o + 1/d_i',
    description: 'Lens/mirror equation',
    variables: 'f, d_o, d_i',
    category: 'Lenses & Mirrors',
  },
  {
    formula: 'M = -d_i/d_o',
    description: 'Magnification',
    variables: 'M, d_i, d_o',
    category: 'Lenses & Mirrors',
  },
  {
    formula: 'P = 1/f',
    description: 'Optical power in diopters',
    variables: 'P, f',
    category: 'Lenses & Mirrors',
  },
  {
    formula: '1/f = (n - 1)(1/R₁ - 1/R₂)',
    description: 'Lensmaker\'s equation',
    variables: 'f, n, R₁, R₂',
    category: 'Lenses & Mirrors',
  },
  {
    formula: 'Φ = Φ₁ + Φ₂ - (t/n)Φ₁Φ₂',
    description: 'Thick lens optical power',
    variables: 'Φ, Φ₁, Φ₂, t, n',
    category: 'Lenses & Mirrors',
  },
  {
    formula: 'Φ_total = Φ₁ + Φ₂ - (t/n)Φ₁Φ₂',
    description: 'Two thin lenses in system',
    variables: 'Φ_total, Φ₁, Φ₂, t, n',
    category: 'Lenses & Mirrors',
  },
  {
    formula: '1/s + 1/s\' = 2/R',
    description: 'Spherical mirror equation',
    variables: 's, s\', R',
    category: 'Lenses & Mirrors',
  },
  {
    formula: 'f = R/2',
    description: 'Focal length of spherical mirror',
    variables: 'f, R',
    category: 'Lenses & Mirrors',
  },
  
  // Diffraction / Interference
  {
    formula: 'd sin(θ) = mλ',
    description: 'Diffraction grating',
    variables: 'd, θ, m, λ',
    category: 'Diffraction / Interference',
  },
  {
    formula: 'a sin(θ) = mλ',
    description: 'Single slit diffraction minima',
    variables: 'a, θ, m, λ',
    category: 'Diffraction / Interference',
  },
  {
    formula: 'd sin(θ) = (m + ½)λ',
    description: 'Double slit destructive interference',
    variables: 'd, θ, m, λ',
    category: 'Diffraction / Interference',
  },
  {
    formula: 'Δx = λ / (2NA)',
    description: 'Fringe period / axial resolution',
    variables: 'Δx, λ, NA',
    category: 'Diffraction / Interference',
  },
  {
    formula: 'I = I₁ + I₂ + 2√(I₁I₂)cos(k·OPD)',
    description: 'Interference pattern intensity',
    variables: 'I, I₁, I₂, k, OPD',
    category: 'Diffraction / Interference',
  },
  {
    formula: 'k = 2π/λ',
    description: 'Wave number (used in interference)',
    variables: 'k, λ',
    category: 'Diffraction / Interference',
  },
  
  // Efficiency / Power / Visibility
  {
    formula: 'V = (I_max - I_min)/(I_max + I_min)',
    description: 'Visibility (fringe contrast)',
    variables: 'V, I_max, I_min',
    category: 'Efficiency / Power / Visibility',
  },
  {
    formula: 'P = IA',
    description: 'Optical power from irradiance',
    variables: 'P, I, A',
    category: 'Efficiency / Power / Visibility',
  },
  {
    formula: 'I = SΩ',
    description: 'Irradiance from spectral intensity',
    variables: 'I, S, Ω',
    category: 'Efficiency / Power / Visibility',
  },
  {
    formula: 'T = e^(-αx)',
    description: 'Transmission decay',
    variables: 'T, α, x',
    category: 'Efficiency / Power / Visibility',
  },
  {
    formula: 'A = 1 - e^(-αx)',
    description: 'Absorption of light',
    variables: 'A, α, x',
    category: 'Efficiency / Power / Visibility',
  },
];
