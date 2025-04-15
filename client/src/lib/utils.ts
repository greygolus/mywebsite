import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Converts a value from one unit to another
export function convertValue(value: number, fromUnit: string, toUnit: string): number {
  // First convert to base SI units
  let baseValue: number;
  
  // Length conversions (to meters)
  if (['nm', 'μm', 'mm', 'cm', 'm', 'km'].includes(fromUnit)) {
    switch (fromUnit) {
      case 'nm': baseValue = value * 1e-9; break;
      case 'μm': baseValue = value * 1e-6; break;
      case 'mm': baseValue = value * 1e-3; break;
      case 'cm': baseValue = value * 1e-2; break;
      case 'm': baseValue = value; break;
      case 'km': baseValue = value * 1e3; break;
      default: baseValue = value;
    }
  }
  // Frequency conversions (to Hz)
  else if (['Hz', 'kHz', 'MHz', 'GHz', 'THz'].includes(fromUnit)) {
    switch (fromUnit) {
      case 'Hz': baseValue = value; break;
      case 'kHz': baseValue = value * 1e3; break;
      case 'MHz': baseValue = value * 1e6; break;
      case 'GHz': baseValue = value * 1e9; break;
      case 'THz': baseValue = value * 1e12; break;
      default: baseValue = value;
    }
  }
  // Energy conversions (to Joules)
  else if (['eV', 'J', 'kJ'].includes(fromUnit)) {
    switch (fromUnit) {
      case 'eV': baseValue = value * 1.602176634e-19; break;
      case 'J': baseValue = value; break;
      case 'kJ': baseValue = value * 1e3; break;
      default: baseValue = value;
    }
  }
  else {
    baseValue = value;
  }
  
  // Then convert from base SI units to target unit
  // Length conversions (from meters)
  if (['nm', 'μm', 'mm', 'cm', 'm', 'km'].includes(toUnit)) {
    switch (toUnit) {
      case 'nm': return baseValue * 1e9;
      case 'μm': return baseValue * 1e6;
      case 'mm': return baseValue * 1e3;
      case 'cm': return baseValue * 1e2;
      case 'm': return baseValue;
      case 'km': return baseValue * 1e-3;
      default: return baseValue;
    }
  }
  // Frequency conversions (from Hz)
  else if (['Hz', 'kHz', 'MHz', 'GHz', 'THz'].includes(toUnit)) {
    switch (toUnit) {
      case 'Hz': return baseValue;
      case 'kHz': return baseValue * 1e-3;
      case 'MHz': return baseValue * 1e-6;
      case 'GHz': return baseValue * 1e-9;
      case 'THz': return baseValue * 1e-12;
      default: return baseValue;
    }
  }
  // Energy conversions (from Joules)
  else if (['eV', 'J', 'kJ'].includes(toUnit)) {
    switch (toUnit) {
      case 'eV': return baseValue / 1.602176634e-19;
      case 'J': return baseValue;
      case 'kJ': return baseValue * 1e-3;
      default: return baseValue;
    }
  }
  
  return baseValue;
}

// Formats a number with scientific notation if needed
export function formatScientific(value: number, precision: number = 6): string {
  if (value === 0) return '0';
  
  const absValue = Math.abs(value);
  if (absValue < 0.001 || absValue >= 10000) {
    return value.toExponential(precision);
  }
  
  return value.toFixed(precision).replace(/\.?0+$/, '');
}
