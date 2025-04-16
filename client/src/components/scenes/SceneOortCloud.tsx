import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface SceneOortCloudProps {
  opacity: any;
  scale: any;
}

interface IcyBodyData {
  x: number;
  y: number;
  size: number;
  color: string;
  brightness: number;
  drift: {
    x: number;
    y: number;
    duration: number;
  };
}

interface CometData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlX: number;
  controlY: number;
  size: number;
  trailLength: number;
  duration: number;
  delay: number;
}

const SceneOortCloud: React.FC<SceneOortCloudProps> = ({ opacity, scale }) => {
  // Create icy bodies data - comets, asteroids, etc.
  const icyBodies: IcyBodyData[] = useMemo(() => {
    return Array.from({ length: 280 }).map(() => {
      const distance = 10 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      
      // Create varied colors for a more interesting scene
      const colors = [
        "#E2E8F0", // Light slate
        "#CBD5E1", // Slate
        "#94A3B8", // Gray slate
        "#BAE6FD", // Light blue
        "#F1F5F9", // Bright slate
        "#F8FAFC", // White
      ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 0.35 + 0.1;
      const brightness = Math.random() * 0.5 + 0.3;
      
      // Add subtle drift to particles
      const driftX = (Math.random() * 2 - 1) * (Math.random() < 0.2 ? 3 : 1);
      const driftY = (Math.random() * 2 - 1) * (Math.random() < 0.2 ? 3 : 1);
      const driftDuration = 15 + Math.random() * 25;
      
      return {
        x,
        y,
        size,
        color,
        brightness,
        drift: {
          x: driftX,
          y: driftY,
          duration: driftDuration
        }
      };
    });
  }, []);

  // Create active comets with more dramatic paths
  const comets: CometData[] = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      // Create more varied and interesting comet paths
      const startAngle = Math.random() * Math.PI * 2;
      const endAngle = (startAngle + Math.PI + (Math.random() * Math.PI / 2)) % (Math.PI * 2);
      
      // Vary the distances for more natural orbits
      const startDistance = 20 + Math.random() * 25;
      const endDistance = 20 + Math.random() * 25;
      
      const startX = 50 + Math.cos(startAngle) * startDistance;
      const startY = 50 + Math.sin(startAngle) * startDistance;
      const endX = 50 + Math.cos(endAngle) * endDistance;
      const endY = 50 + Math.sin(endAngle) * endDistance;
      
      // Create curved paths by offsetting the control point from center
      const controlOffset = 5 + Math.random() * 20;
      const controlAngle = (startAngle + endAngle) / 2;
      const controlX = 50 + Math.cos(controlAngle) * controlOffset;
      const controlY = 50 + Math.sin(controlAngle) * controlOffset;
      
      return {
        startX,
        startY,
        endX,
        endY,
        controlX,
        controlY,
        size: 0.6 + Math.random() * 0.8,
        trailLength: 5 + Math.random() * 15,
        duration: 10 + Math.random() * 15,
        delay: i * 3
      };
    });
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        scale,
        willChange: "transform, opacity",
        background: "linear-gradient(to bottom, #0F172A, #1E293B, #0F172A)"
      }}
      layout={false}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ transform: 'translateZ(0)' }} // Force GPU acceleration
      >
        <defs>
          {/* Enhanced gradient for the sky background */}
          <radialGradient
            id="oortGradient"
            cx="50%"
            cy="50%"
            r="100%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="60%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#1E293B" />
          </radialGradient>
          
          {/* Glow filter for central star */}
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
          
          {/* Trail effect for comets */}
          <linearGradient id="cometTrail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Background gradient */}
        <rect width="100" height="100" fill="url(#oortGradient)" />

        {/* Distant stars - small background points */}
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.circle
            key={`distant-star-${i}`}
            cx={Math.random() * 100}
            cy={Math.random() * 100}
            r={Math.random() * 0.15 + 0.05}
            fill="#F8FAFC"
            initial={{ opacity: Math.random() * 0.3 + 0.2 }}
            animate={{
              opacity: [
                Math.random() * 0.3 + 0.2,
                Math.random() * 0.6 + 0.3,
                Math.random() * 0.3 + 0.2
              ]
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Central star with enhanced glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="1.8"
          fill="#FEF3C7"
          filter="url(#starGlow)"
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.07, 1],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Sun glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="3"
          fill="url(#sunGlow)"
          opacity="0.2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Enhanced dust and ice particles with more detail and better animation */}
        {icyBodies.map((body, i) => (
          <motion.circle
            key={`oort-particle-${i}`}
            cx={body.x}
            cy={body.y}
            r={body.size}
            fill={body.color}
            initial={{ opacity: body.brightness }}
            animate={{
              opacity: [body.brightness, body.brightness * 0.6, body.brightness],
              cx: [body.x, body.x + body.drift.x, body.x],
              cy: [body.y, body.y + body.drift.y, body.y],
            }}
            transition={{
              opacity: {
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              cx: {
                duration: body.drift.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              cy: {
                duration: body.drift.duration,
                repeat: Infinity,
                repeatType: "reverse", 
                ease: "easeInOut",
              }
            }}
          />
        ))}

        {/* Enhanced comets with improved trails and animations */}
        {comets.map((comet, i) => (
          <motion.g key={`comet-${i}`}>
            {/* Comet trail using curved paths */}
            <motion.path
              d={`M${comet.startX},${comet.startY} Q${comet.controlX},${comet.controlY} ${comet.endX},${comet.endY}`}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth={0.2 + (comet.size * 0.3)}
              fill="none"
              strokeDasharray={`${comet.trailLength} ${30 - comet.trailLength}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1], 
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: comet.duration,
                delay: comet.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 2,
                times: [0, 0.8, 1]
              }}
            />
            
            {/* Comet body */}
            <motion.circle
              cx={comet.startX}
              cy={comet.startY}
              r={comet.size}
              fill="#F8FAFC"
              filter="url(#starGlow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, comet.endX - comet.startX],
                y: [0, comet.endY - comet.startY]
              }}
              transition={{
                duration: comet.duration,
                delay: comet.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 2,
                times: [0, 0.8, 1],
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
};

export default SceneOortCloud;