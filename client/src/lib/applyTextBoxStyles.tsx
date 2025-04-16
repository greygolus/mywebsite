// This script applies Apple-inspired styling to all text boxes in the homepage
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Updated style application for more transparent bubble glass effect
export function useAppleGlassStyles() {
  // This hook can be used in the Home component
  const [isApplied, setIsApplied] = useState(false);
  
  function applyStyles() {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      const textBoxes = document.querySelectorAll('.text-box');
      
      textBoxes.forEach(box => {
        // Apply the more translucent bubble glass styling with increased blur
        box.classList.add('bg-black/5', 'backdrop-blur-xl', 'border', 'border-white/10', 'rounded-xl', 'shadow-inner');
        
        // Add text shadows for better readability
        const textElements = box.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
        textElements.forEach(text => {
          if (text.classList.contains('gradient-text')) return; // Skip gradient text
          (text as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.4)';
        });
      });
      
      setIsApplied(true);
    }, 300);
  }
  
  useEffect(() => {
    if (!isApplied) {
      // Apply on initial load
      applyStyles();
      
      // Set up mutation observer to catch dynamically added elements
      const observer = new MutationObserver((mutations) => {
        const newNodes = mutations
          .flatMap(mutation => Array.from(mutation.addedNodes))
          .filter(node => node.nodeType === Node.ELEMENT_NODE);
        
        if (newNodes.length > 0) {
          applyStyles();
        }
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      return () => observer.disconnect();
    }
  }, [isApplied]);
  
  return { applyStyles };
}

// Depth-aware text box component that scales and translates with scroll
export function DepthAwareTextBox({ 
  children, 
  scaleMotionValue, 
  yMotionValue, 
  opacityMotionValue,
  className = "",
  borderColor = "border-white/20",
  hoverEffect = true 
}: { 
  children: React.ReactNode, 
  scaleMotionValue?: any, 
  yMotionValue?: any, 
  opacityMotionValue?: any,
  className?: string,
  borderColor?: string,
  hoverEffect?: boolean
}) {
  const style: any = {};
  
  if (scaleMotionValue) {
    style.scale = scaleMotionValue;
  }
  
  if (yMotionValue) {
    style.y = yMotionValue;
  }
  
  if (opacityMotionValue) {
    style.opacity = opacityMotionValue;
  }
  
  // Add filter for advanced shadow effects
  style.filter = "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.1))";
  
  // Enhanced animation variants
  const variants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
      filter: "blur(2px)" 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)" 
    },
    hover: hoverEffect ? { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] } 
    } : {}
  };
  
  return (
    <motion.div 
      className={`text-box ${borderColor} ${className} backdrop-blur-xl p-6 bg-black/5 shadow-inner transition-all duration-300 ease-in-out border-white/10`}
      style={style}
      initial="initial"
      animate="animate"
      whileHover={hoverEffect ? "hover" : undefined}
      variants={variants}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        opacity: { duration: 0.5, ease: "easeOut" }
      }}
    >
      {children}
    </motion.div>
  );
}