import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedParticleFieldProps {
  color?: string;
  density?: number;
  speed?: number;
  opacity?: number;
  glowIntensity?: number;
  direction?: 'random' | 'outward' | 'inward' | 'upward' | 'downward';
  minSize?: number;
  maxSize?: number;
}

/**
 * A customizable particle field component that creates an atmospheric effect
 * 
 * @param color - CSS color for the particles (default: "#FFFFFF")
 * @param density - Number of particles (default: 50)
 * @param speed - Speed of particle movement (default: 20)
 * @param opacity - Base opacity of particles (default: 0.5)
 * @param glowIntensity - Intensity of glow effect (0-10) (default: 1)
 * @param direction - Direction of particle movement (default: "random")
 * @param minSize - Minimum particle size in pixels (default: 1)
 * @param maxSize - Maximum particle size in pixels (default: 3)
 */
const EnhancedParticleField: React.FC<EnhancedParticleFieldProps> = ({
  color = "#FFFFFF",
  density = 50,
  speed = 20,
  opacity = 0.5,
  glowIntensity = 1,
  direction = 'random',
  minSize = 1,
  maxSize = 3
}) => {
  // Create particles with position, size, and other properties
  const particles = React.useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const size = Math.random() * (maxSize - minSize) + minSize;
      
      return {
        id: i,
        x: Math.random() * 100, // x position as percentage
        y: Math.random() * 100, // y position as percentage
        size,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        depth: Math.random(), // Used for parallax effect
        opacity: Math.random() * opacity + (opacity * 0.5), // Random opacity within range
        speed: (Math.random() * 0.5 + 0.5) * speed // Random speed variation
      };
    });
  }, [density, opacity, speed, minSize, maxSize]);

  // Calculate movement based on direction
  const calculateMovement = (particle: any) => {
    const baseSpeed = particle.speed / 100; // Scale speed down
    
    switch (direction) {
      case 'outward': {
        // Move from center outward
        const centerX = 50;
        const centerY = 50;
        const angle = Math.atan2(particle.initialY - centerY, particle.initialX - centerX);
        return {
          x: [
            particle.initialX,
            particle.initialX + Math.cos(angle) * baseSpeed * 50,
            particle.initialX
          ],
          y: [
            particle.initialY,
            particle.initialY + Math.sin(angle) * baseSpeed * 50,
            particle.initialY
          ]
        };
      }
      case 'inward': {
        // Move from outside inward
        const centerX = 50;
        const centerY = 50;
        const angle = Math.atan2(particle.initialY - centerY, particle.initialX - centerX);
        return {
          x: [
            particle.initialX,
            particle.initialX - Math.cos(angle) * baseSpeed * 50,
            particle.initialX
          ],
          y: [
            particle.initialY,
            particle.initialY - Math.sin(angle) * baseSpeed * 50,
            particle.initialY
          ]
        };
      }
      case 'upward':
        return {
          x: [particle.initialX, particle.initialX + (Math.random() * 2 - 1) * baseSpeed * 20, particle.initialX],
          y: [particle.initialY, particle.initialY - baseSpeed * 50, particle.initialY]
        };
      case 'downward':
        return {
          x: [particle.initialX, particle.initialX + (Math.random() * 2 - 1) * baseSpeed * 20, particle.initialX],
          y: [particle.initialY, particle.initialY + baseSpeed * 50, particle.initialY]
        };
      case 'random':
      default:
        return {
          x: [
            particle.initialX,
            particle.initialX + (Math.random() * 2 - 1) * baseSpeed * 100,
            particle.initialX
          ],
          y: [
            particle.initialY,
            particle.initialY + (Math.random() * 2 - 1) * baseSpeed * 100,
            particle.initialY
          ]
        };
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => {
        const movement = calculateMovement(particle);
        
        return (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${glowIntensity * (particle.size + 2)}px ${color}`,
              opacity: particle.opacity
            }}
            animate={{
              x: movement.x,
              y: movement.y,
              opacity: [
                particle.opacity,
                particle.opacity * 0.6,
                particle.opacity
              ]
            }}
            transition={{
              duration: 30 / (particle.speed / 20), // Slower movement
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5 // Random start time
            }}
          />
        );
      })}
    </div>
  );
};

export default EnhancedParticleField;