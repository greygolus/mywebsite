// This script applies Apple-inspired styling to all text boxes in the homepage
// @ts-nocheck

// We need to use useEffect for React components rather than DOM event listeners
export function useAppleGlassStyles() {
  // This hook can be used in the Home component
  function applyStyles() {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      const textBoxes = document.querySelectorAll('.bg-black.bg-opacity-20.backdrop-blur-md');
      
      textBoxes.forEach(box => {
        // Apply the apple-glass styling from our CSS
        box.style.backgroundColor = 'rgba(42, 42, 45, 0.9)';
        box.style.backdropFilter = 'blur(12px)';
        box.style.borderRadius = '0.75rem';
        box.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
        
        // Improve border visibility
        box.style.borderWidth = '1px';
        box.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      });
    }, 500);
  }
  
  return { applyStyles };
}

// Legacy DOM version for direct script inclusion
document.addEventListener('DOMContentLoaded', () => {
  const textBoxes = document.querySelectorAll('.bg-black.bg-opacity-20.backdrop-blur-md');
  
  textBoxes.forEach(box => {
    // Apply the apple-glass styling directly
    box.style.backgroundColor = 'rgba(42, 42, 45, 0.9)';
    box.style.backdropFilter = 'blur(12px)';
    box.style.borderRadius = '0.75rem';
    box.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
    
    // Improve border visibility
    box.style.borderWidth = '1px';
    box.style.borderColor = 'rgba(255, 255, 255, 0.15)';
  });
});