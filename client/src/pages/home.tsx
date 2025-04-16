import { Link } from "wouter";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  useAppleGlassStyles,
  DepthAwareTextBox,
} from "../lib/applyTextBoxStyles";

// Enhanced particle effect component for layering over scenes
const EnhancedParticleField = ({
  color = "#ffffff",
  density = 40,
  speed = 50,
  opacity = 0.3,
  glowIntensity = 1,
  minSize = 0.3,
  maxSize = 1.5,
  direction = "random",
}) => {
  const getRandomDirection = () => {
    if (direction === "up") return Math.random() * 180 + 90;
    if (direction === "down") return Math.random() * 180 - 90;
    if (direction === "random") return Math.random() * 360;
    return 0;
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {Array.from({ length: density }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${minSize + Math.random() * (maxSize - minSize)}px`,
            height: `${minSize + Math.random() * (maxSize - minSize)}px`,
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow:
              glowIntensity > 0
                ? `0 0 ${glowIntensity * 5}px ${color}`
                : "none",
            opacity: Math.random() * opacity + 0.1,
          }}
          animate={{
            x: [0, Math.sin((getRandomDirection() * Math.PI) / 180) * speed, 0],
            y: [0, Math.cos((getRandomDirection() * Math.PI) / 180) * speed, 0],
            opacity: [
              Math.random() * opacity + 0.1,
              Math.random() * (opacity / 2) + 0.1,
              Math.random() * opacity + 0.1,
            ],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// SVG Components for animation scenes
const CosmicWebSVG = () => {
  // Precompute all random values for paths (cosmic web structure)
  interface PathData {
    path: string;
    duration: number;
  }
  
  interface NodeData {
    cx: number;
    cy: number;
    r: number;
    duration: number;
    driftX: number;
    driftY: number;
    driftDuration: number;
  }

  const webPaths = useMemo<PathData[]>(() => {
    return Array.from({ length: 20 }).map(() => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const cp1X = Math.random() * 100;
      const cp1Y = Math.random() * 100;
      const cp2X = Math.random() * 100;
      const cp2Y = Math.random() * 100;
      const endX = Math.random() * 100;
      const endY = Math.random() * 100;
      const duration = 3.5 + Math.random() * 2; // Random duration between 3.5-5.5s
      
      return {
        path: `M${startX},${startY} C${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`,
        duration
      };
    });
  }, []);



  // Precompute all random values for nodes (circles)
  const nodes = useMemo<NodeData[]>(() => {
    return Array.from({ length: 50 }).map(() => {
      const cx = Math.random() * 100;
      const cy = Math.random() * 100;
      const r = Math.random() * 0.7 + 0.3; // Random radius between 0.3-1.0
      const duration = 2 + Math.random() * 3; // Random duration between 2-5s
      // Add slight drift for cosmic motion effect
      const driftX = (Math.random() * 2 - 1) * 3; // Random value between -3 and 3
      const driftY = (Math.random() * 2 - 1) * 3;
      const driftDuration = 15 + Math.random() * 10; // Slow drift between 15-25s

      return { cx, cy, r, duration, driftX, driftY, driftDuration };
    });
  }, []);

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{ transform: 'translateZ(0)' }} // Force GPU acceleration
    >
      <defs>
        <radialGradient
          id="cosmicGradient"
          cx="50%"
          cy="50%"
          r="100%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#6D28D9" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#cosmicGradient)" />
      
      {/* Cosmic web-like structure with precomputed paths */}
      {webPaths.map((pathData, i) => (
        <motion.path
          key={`cosmic-web-${i}`}
          d={pathData.path}
          stroke="#A78BFA"
          strokeWidth="0.2"
          strokeOpacity="0.6"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: pathData.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ willChange: "opacity, pathLength" }}
        />
      ))}
      
      {/* Cosmic nodes (connection points) with precomputed values */}
      {nodes.map((node, i) => (
        <motion.circle
          key={`cosmic-node-${i}`}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill="#C4B5FD"
          initial={{ opacity: 0.2 }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            cx: [node.cx, node.cx + node.driftX, node.cx],
            cy: [node.cy, node.cy + node.driftY, node.cy]
          }}
          transition={{ 
            opacity: {
              duration: node.duration,
              repeat: Infinity,
              ease: "easeInOut"
            },
            cx: {
              duration: node.driftDuration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            cy: {
              duration: node.driftDuration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          style={{ willChange: "opacity, transform" }}
        />
      ))}
    </svg>
  );
};

const GalaxySVG = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient
        id="galaxyGradient"
        cx="50%"
        cy="50%"
        r="100%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
        <stop offset="30%" stopColor="#60A5FA" stopOpacity="0.6" />
        <stop offset="70%" stopColor="#2563EB" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
      </radialGradient>
      <filter id="galaxyGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle
      cx="50"
      cy="50"
      r="25"
      fill="url(#galaxyGradient)"
      filter="url(#galaxyGlow)"
    />

    {/* Spiral arms */}
    <motion.path
      d="M50,50 Q60,30 80,20 T50,10 T20,20 T40,30 T50,50"
      fill="none"
      stroke="#93C5FD"
      strokeWidth="0.5"
      strokeOpacity="0.6"
      initial={{ pathLength: 0, rotate: 0 }}
      animate={{ pathLength: 1, rotate: 360 }}
      transition={{
        pathLength: { duration: 3 },
        rotate: { duration: 60, repeat: Infinity, ease: "linear" },
      }}
    />
    <motion.path
      d="M50,50 Q60,70 80,80 T50,90 T20,80 T40,70 T50,50"
      fill="none"
      stroke="#93C5FD"
      strokeWidth="0.5"
      strokeOpacity="0.6"
      initial={{ pathLength: 0, rotate: 0 }}
      animate={{ pathLength: 1, rotate: 360 }}
      transition={{
        pathLength: { duration: 3 },
        rotate: { duration: 60, repeat: Infinity, ease: "linear" },
      }}
    />

    {/* Stars */}
    {Array.from({ length: 80 }).map((_, i) => {
      const distance = 20 + Math.random() * 30;
      const angle = Math.random() * Math.PI * 2;
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      return (
        <motion.circle
          key={`galaxy-star-${i}`}
          cx={x}
          cy={y}
          r={Math.random() * 0.4 + 0.1}
          fill="white"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1 + Math.random() * 3, repeat: Infinity }}
        />
      );
    })}
  </svg>
);

const OortCloudSVG = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient
        id="oortGradient"
        cx="50%"
        cy="50%"
        r="100%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="70%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#334155" />
      </radialGradient>
    </defs>
    <rect width="100" height="100" fill="url(#oortGradient)" />

    {/* Central star */}
    <motion.circle
      cx="50"
      cy="50"
      r="2"
      fill="#FBBF24"
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [0.95, 1.05, 0.95],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Dust and comet particles */}
    {Array.from({ length: 200 }).map((_, i) => {
      const distance = 10 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      return (
        <motion.circle
          key={`oort-particle-${i}`}
          cx={x}
          cy={y}
          r={Math.random() * 0.3 + 0.1}
          fill={Math.random() > 0.8 ? "#94A3B8" : "#CBD5E1"}
          initial={{ opacity: Math.random() * 0.5 + 0.1 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            cx: [x, x + Math.random() * 2 - 1, x],
            cy: [y, y + Math.random() * 2 - 1, y],
          }}
          transition={{
            duration: 2 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      );
    })}

    {/* Occasional comets */}
    {Array.from({ length: 3 }).map((_, i) => {
      const startAngle = Math.random() * Math.PI * 2;
      const endAngle = startAngle + Math.PI * (1 + Math.random());
      const distance = 25 + Math.random() * 20;
      const startX = 50 + Math.cos(startAngle) * distance;
      const startY = 50 + Math.sin(startAngle) * distance;
      const endX = 50 + Math.cos(endAngle) * distance;
      const endY = 50 + Math.sin(endAngle) * distance;

      return (
        <motion.g key={`comet-${i}`}>
          <motion.path
            d={`M${startX},${startY} Q${50},${50} ${endX},${endY}`}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="1 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 8 + i * 4,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
          <motion.circle
            cx={startX}
            cy={startY}
            r="0.7"
            fill="#F1F5F9"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, endX - startX, endX - startX],
              y: [0, endY - startY, endY - startY],
            }}
            transition={{
              duration: 8 + i * 4,
              repeat: Infinity,
              repeatDelay: 2,
              times: [0, 0.8, 1],
            }}
          />
        </motion.g>
      );
    })}
  </svg>
);

const SolarSystemSVG = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </radialGradient>
      <filter id="sunFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Sun */}
    <motion.circle
      cx="50"
      cy="50"
      r="5"
      fill="url(#sunGlow)"
      filter="url(#sunFilter)"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Planets and orbits */}
    {[
      { radius: 10, speed: 8, color: "#A1A1AA", size: 1 }, // Mercury
      { radius: 15, speed: 12, color: "#FB923C", size: 1.3 }, // Venus
      { radius: 20, speed: 15, color: "#60A5FA", size: 1.5 }, // Earth
      { radius: 25, speed: 20, color: "#EF4444", size: 1.2 }, // Mars
      { radius: 32, speed: 25, color: "#F59E0B", size: 3 }, // Jupiter
      { radius: 38, speed: 30, color: "#FBBF24", size: 2.5 }, // Saturn
    ].map((planet, i) => (
      <g key={`planet-${i}`}>
        <circle
          cx="50"
          cy="50"
          r={planet.radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="0.2"
          strokeDasharray={i % 2 === 0 ? "0.5 0.5" : ""}
        />
        <motion.circle
          cx={50 + planet.radius}
          cy="50"
          r={planet.size * 0.5}
          fill={planet.color}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: planet.speed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            originX: "50px",
            originY: "50px",
          }}
        />
      </g>
    ))}

    {/* Asteroid belt */}
    {Array.from({ length: 100 }).map((_, i) => {
      const distance = 27 + Math.random() * 3;
      const angle = Math.random() * Math.PI * 2;
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      return (
        <motion.circle
          key={`asteroid-${i}`}
          cx={x}
          cy={y}
          r={Math.random() * 0.2 + 0.1}
          fill="#94A3B8"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            originX: "50px",
            originY: "50px",
          }}
        />
      );
    })}
  </svg>
);

const EarthSVG = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient
        id="earthGradient"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="50%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#1E40AF" />
      </radialGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="0.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Earth */}
    <motion.circle
      cx="50"
      cy="50"
      r="25"
      fill="url(#earthGradient)"
      filter="url(#glow)"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      }}
    />

    {/* Continents */}
    <motion.path
      d="M40,35 Q55,30 60,40 T70,50 T65,60 T50,65 T40,55 T35,45 Z"
      fill="#10B981"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: "center",
      }}
    />
    <motion.path
      d="M30,50 Q35,45 45,43 T50,40 T45,35 T35,40 T30,45 Z"
      fill="#10B981"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: "center",
      }}
    />
    <motion.path
      d="M55,70 Q65,65 67,60 T65,55 T60,58 T55,65 Z"
      fill="#10B981"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: "center",
      }}
    />

    {/* Clouds */}
    <motion.path
      d="M25,35 Q40,25 55,35 T70,45 T65,55 T50,50 T35,55 T25,45 Z"
      fill="rgba(255,255,255,0.3)"
      animate={{
        rotate: 360,
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        rotate: {
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        },
        opacity: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        transformOrigin: "center",
      }}
    />
    <motion.path
      d="M40,60 Q50,55 60,60 T75,70 T70,80 T55,75 T45,80 T35,70 Z"
      fill="rgba(255,255,255,0.3)"
      animate={{
        rotate: 360,
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        rotate: {
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        },
        opacity: {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        transformOrigin: "center",
      }}
    />

    {/* Atmosphere glow */}
    <circle
      cx="50"
      cy="50"
      r="28"
      fill="none"
      stroke="rgba(96, 165, 250, 0.2)"
      strokeWidth="4"
    />
  </svg>
);

const TelescopeSVG = () => (
  <svg
    className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M30 70 L70 30 L80 20 L85 15"
      stroke="white"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    />
    <motion.circle
      cx="85"
      cy="15"
      r="8"
      fill="rgba(255, 255, 255, 0.1)"
      stroke="white"
      strokeWidth="1.5"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
    />
    <motion.circle
      cx="30"
      cy="70"
      r="15"
      fill="rgba(255, 255, 255, 0.1)"
      stroke="white"
      strokeWidth="1.5"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, delay: 1 }}
    />
    <motion.path
      d="M25 85 L35 85 L35 95 L25 95 Z"
      fill="rgba(255, 255, 255, 0.2)"
      stroke="white"
      strokeWidth="1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
    />
  </svg>
);

const EyeSVG = () => (
  <svg
    className="absolute w-full h-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient id="eyeIris" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="70%" stopColor="#1E40AF" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="white" />
    <circle cx="50" cy="50" r="25" fill="url(#eyeIris)" />
    <circle cx="50" cy="50" r="12" fill="black" />
    <circle cx="40" cy="40" r="5" fill="white" opacity="0.7" />
  </svg>
);

const DNASVG = () => (
  <svg
    className="absolute w-full h-full opacity-70"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <motion.path
      d="M30,10 C45,25 55,25 70,10 C55,25 55,45 70,60 C55,45 45,45 30,60 C45,45 45,25 30,10 Z"
      stroke="#0EA5E9"
      strokeWidth="0.7"
      fill="none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
    <motion.path
      d="M30,40 C45,55 55,55 70,40 C55,55 55,75 70,90 C55,75 45,75 30,90 C45,75 45,55 30,40 Z"
      stroke="#0EA5E9"
      strokeWidth="0.7"
      fill="none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    <motion.line
      x1="40"
      y1="15"
      x2="60"
      y2="15"
      stroke="#3B82F6"
      strokeWidth="2"
    />
    <motion.line
      x1="40"
      y1="35"
      x2="60"
      y2="35"
      stroke="#3B82F6"
      strokeWidth="2"
    />
    <motion.line
      x1="40"
      y1="55"
      x2="60"
      y2="55"
      stroke="#3B82F6"
      strokeWidth="2"
    />
    <motion.line
      x1="40"
      y1="75"
      x2="60"
      y2="75"
      stroke="#3B82F6"
      strokeWidth="2"
    />
  </svg>
);

const AtomSVG = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient id="atomCore" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#F9A8D4" />
        <stop offset="100%" stopColor="#DB2777" />
      </radialGradient>
    </defs>

    {/* Electron orbits */}
    <motion.ellipse
      cx="50"
      cy="50"
      rx="35"
      ry="15"
      fill="none"
      stroke="rgba(249, 168, 212, 0.3)"
      strokeWidth="0.5"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: "center",
      }}
    />

    <motion.ellipse
      cx="50"
      cy="50"
      rx="30"
      ry="30"
      fill="none"
      stroke="rgba(249, 168, 212, 0.3)"
      strokeWidth="0.5"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: "center",
        rotateX: "60deg",
      }}
    />

    <motion.ellipse
      cx="50"
      cy="50"
      rx="15"
      ry="35"
      fill="none"
      stroke="rgba(249, 168, 212, 0.3)"
      strokeWidth="0.5"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: "center",
      }}
    />

    {/* Electrons */}
    <motion.circle
      cx="85"
      cy="50"
      r="1.5"
      fill="#F9A8D4"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: "center",
      }}
    />

    <motion.circle
      cx="50"
      cy="80"
      r="1.5"
      fill="#F9A8D4"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: "center",
        rotateX: "60deg",
      }}
    />

    <motion.circle
      cx="35"
      cy="15"
      r="1.5"
      fill="#F9A8D4"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        transformOrigin: "center",
      }}
    />

    {/* Nucleus */}
    <motion.circle
      cx="50"
      cy="50"
      r="5"
      fill="url(#atomCore)"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </svg>
);

const NucleusSVG = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient
        id="protonGradient"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="100%" stopColor="#EF4444" />
      </radialGradient>
      <radialGradient
        id="neutronGradient"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#E5E7EB" />
        <stop offset="100%" stopColor="#9CA3AF" />
      </radialGradient>
    </defs>

    {/* Force field glow */}
    <motion.circle
      cx="50"
      cy="50"
      r="30"
      fill="none"
      stroke="rgba(239, 68, 68, 0.1)"
      strokeWidth="15"
      animate={{
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Protons and neutrons */}
    {[
      { x: 46, y: 46, type: "proton" },
      { x: 54, y: 46, type: "neutron" },
      { x: 50, y: 42, type: "proton" },
      { x: 46, y: 54, type: "neutron" },
      { x: 54, y: 54, type: "proton" },
      { x: 50, y: 58, type: "neutron" },
      { x: 42, y: 50, type: "proton" },
      { x: 58, y: 50, type: "neutron" },
    ].map((particle, i) => (
      <motion.circle
        key={`particle-${i}`}
        cx={particle.x}
        cy={particle.y}
        r="5"
        fill={
          particle.type === "proton"
            ? "url(#protonGradient)"
            : "url(#neutronGradient)"
        }
        animate={{
          x: [0, Math.random() * 2 - 1, 0],
          y: [0, Math.random() * 2 - 1, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2 + Math.random(),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}

    {/* Connection lines between particles */}
    <motion.line
      x1="46"
      y1="46"
      x2="54"
      y2="46"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
    <motion.line
      x1="46"
      y1="46"
      x2="50"
      y2="42"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
    <motion.line
      x1="54"
      y1="46"
      x2="50"
      y2="42"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
    <motion.line
      x1="46"
      y1="54"
      x2="54"
      y2="54"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
    <motion.line
      x1="46"
      y1="54"
      x2="50"
      y2="58"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
    <motion.line
      x1="54"
      y1="54"
      x2="50"
      y2="58"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
    <motion.line
      x1="42"
      y1="50"
      x2="46"
      y2="46"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
    <motion.line
      x1="42"
      y1="50"
      x2="46"
      y2="54"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
    <motion.line
      x1="58"
      y1="50"
      x2="54"
      y2="46"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
    <motion.line
      x1="58"
      y1="50"
      x2="54"
      y2="54"
      stroke="rgba(255, 255, 255, 0.2)"
      strokeWidth="0.5"
    />
  </svg>
);

// Define types for our components
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  speed: number;
  direction: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

const QuarksSVG = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        speed: Math.random() * 2 + 0.5,
        direction: Math.random() * Math.PI * 2,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <svg
      className="absolute w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {particles.map((particle, index) => (
        <motion.circle
          key={index}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill={particle.color}
          animate={{
            cx: [
              particle.x,
              particle.x + Math.cos(particle.direction) * 10,
              particle.x,
            ],
            cy: [
              particle.y,
              particle.y + Math.sin(particle.direction) * 10,
              particle.y,
            ],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: particle.speed * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
};

// Star field background component
const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars
    const newStars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 3 + 1,
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {stars.map((star, index) => (
          <motion.circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="white"
            animate={{
              opacity: [star.opacity, star.opacity * 0.5, star.opacity],
            }}
            transition={{
              duration: star.twinkleSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const Home = () => {
  const containerRef = useRef(null);

  // Add homepage-specific class to body
  useEffect(() => {
    // Add class to body for homepage-specific styling
    document.body.classList.add("home-page");

    // Apply class-based styling to all text boxes (no JS manipulation needed)
    setTimeout(() => {
      const textBoxes = document.querySelectorAll(
        ".bg-black.bg-opacity-20.backdrop-blur-md",
      );

      textBoxes.forEach((box) => {
        if (box instanceof HTMLElement) {
          // Use classList to avoid TypeScript errors
          box.classList.add("text-box");
          // Remove old classes
          box.classList.remove("bg-black", "bg-opacity-20", "backdrop-blur-md");
        }
      });
    }, 100);

    return () => {
      // Clean up on unmount
      document.body.classList.remove("home-page");
    };
  }, []);

  // Track scroll progress with optimized performance
  // Use regular useEffect instead of layoutEffect to avoid Hook order warnings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    // Using layoutEffect: false to avoid Hook order warnings and improve performance
    layoutEffect: false,
  });

  // Define progress ranges for each of the 12 stages
  // Create a hook to apply the glass styles to text containers
  const { applyStyles } = useAppleGlassStyles();

  // Apply styles on component mount
  useEffect(() => {
    applyStyles();
  }, []);

  const stageRanges = {
    // Scene 1: Cosmic Web - EXTENDED TEXT DISPLAY
    cosmicWebOpacity: useTransform(
      scrollYProgress,
      [0, 0.07, 0.09],
      [1, 0.5, 0],
    ),
    cosmicWebTextOpacity: useTransform(
      scrollYProgress,
      [0.01, 0.03, 0.065, 0.08],
      [0, 1, 1, 0],
    ),
    cosmicWebScale: useTransform(scrollYProgress, [0, 0.09], [1, 4]),
    // Text depth effect with extended full-size duration
    cosmicWebTextScale: useTransform(
      scrollYProgress,
      [0.01, 0.03, 0.065, 0.08],
      [0.8, 1.1, 1.1, 0.8],
    ),
    cosmicWebTextY: useTransform(
      scrollYProgress,
      [0.01, 0.03, 0.065, 0.08],
      [30, 0, 0, -20],
    ),

    // Scene 2: Galaxy - EXTENDED TEXT DISPLAY
    galaxyOpacity: useTransform(
      scrollYProgress,
      [0.08, 0.09, 0.16, 0.18],
      [0, 1, 1, 0],
    ),
    galaxyTextOpacity: useTransform(
      scrollYProgress,
      [0.1, 0.12, 0.155, 0.17],
      [0, 1, 1, 0],
    ),
    galaxyScale: useTransform(scrollYProgress, [0.09, 0.18], [1, 2.5]),
    galaxyTextScale: useTransform(
      scrollYProgress,
      [0.1, 0.12, 0.155, 0.17],
      [0.8, 1.1, 1.1, 0.8],
    ),
    galaxyTextY: useTransform(
      scrollYProgress,
      [0.1, 0.12, 0.155, 0.17],
      [30, 0, 0, -20],
    ),

    // Scene 3: Oort Cloud - EXTENDED TEXT DISPLAY
    oortCloudOpacity: useTransform(
      scrollYProgress,
      [0.17, 0.18, 0.25, 0.27],
      [0, 1, 1, 0],
    ),
    oortCloudTextOpacity: useTransform(
      scrollYProgress,
      [0.19, 0.21, 0.245, 0.26],
      [0, 1, 1, 0],
    ),
    oortCloudScale: useTransform(scrollYProgress, [0.18, 0.27], [1, 2.5]),
    oortCloudTextScale: useTransform(
      scrollYProgress,
      [0.19, 0.21, 0.245, 0.26],
      [0.8, 1.1, 1.1, 0.8],
    ),
    oortCloudTextY: useTransform(
      scrollYProgress,
      [0.19, 0.21, 0.245, 0.26],
      [30, 0, 0, -20],
    ),

    // Scene 4: Solar System - EXTENDED TEXT DISPLAY
    solarSystemOpacity: useTransform(
      scrollYProgress,
      [0.26, 0.27, 0.34, 0.36],
      [0, 1, 1, 0],
    ),
    solarSystemTextOpacity: useTransform(
      scrollYProgress,
      [0.28, 0.3, 0.335, 0.35],
      [0, 1, 1, 0],
    ),
    solarSystemScale: useTransform(scrollYProgress, [0.27, 0.36], [1, 2.5]),
    solarSystemTextScale: useTransform(
      scrollYProgress,
      [0.28, 0.3, 0.335, 0.35],
      [0.8, 1.1, 1.1, 0.8],
    ),
    solarSystemTextY: useTransform(
      scrollYProgress,
      [0.28, 0.3, 0.335, 0.35],
      [30, 0, 0, -20],
    ),

    // Scene 5: Earth - EXTENDED TEXT DISPLAY
    earthOpacity: useTransform(
      scrollYProgress,
      [0.35, 0.36, 0.43, 0.45],
      [0, 1, 1, 0],
    ),
    earthTextOpacity: useTransform(
      scrollYProgress,
      [0.37, 0.39, 0.425, 0.44],
      [0, 1, 1, 0],
    ),
    earthScale: useTransform(scrollYProgress, [0.36, 0.45], [1, 2.5]),
    earthTextScale: useTransform(
      scrollYProgress,
      [0.37, 0.39, 0.425, 0.44],
      [0.8, 1.1, 1.1, 0.8],
    ),
    earthTextY: useTransform(
      scrollYProgress,
      [0.37, 0.39, 0.425, 0.44],
      [30, 0, 0, -20],
    ),

    // Scene 6: Telescope - EXTENDED TEXT DISPLAY
    telescopeOpacity: useTransform(
      scrollYProgress,
      [0.44, 0.45, 0.52, 0.54],
      [0, 1, 1, 0],
    ),
    telescopeTextOpacity: useTransform(
      scrollYProgress,
      [0.46, 0.48, 0.515, 0.53],
      [0, 1, 1, 0],
    ),
    telescopeScale: useTransform(scrollYProgress, [0.45, 0.54], [1, 2.5]),
    telescopeTextScale: useTransform(
      scrollYProgress,
      [0.46, 0.48, 0.515, 0.53],
      [0.8, 1.1, 1.1, 0.8],
    ),
    telescopeTextY: useTransform(
      scrollYProgress,
      [0.46, 0.48, 0.515, 0.53],
      [30, 0, 0, -20],
    ),

    // Scene 7: Eye - EXTENDED TEXT DISPLAY
    eyeOpacity: useTransform(
      scrollYProgress,
      [0.53, 0.54, 0.61, 0.63],
      [0, 1, 1, 0],
    ),
    eyeTextOpacity: useTransform(
      scrollYProgress,
      [0.55, 0.57, 0.605, 0.62],
      [0, 1, 1, 0],
    ),
    eyeScale: useTransform(scrollYProgress, [0.54, 0.63], [1, 2.5]),
    eyeTextScale: useTransform(
      scrollYProgress,
      [0.55, 0.57, 0.605, 0.62],
      [0.8, 1.1, 1.1, 0.8],
    ),
    eyeTextY: useTransform(
      scrollYProgress,
      [0.55, 0.57, 0.605, 0.62],
      [30, 0, 0, -20],
    ),

    // Scene 8: DNA / Cell - EXTENDED TEXT DISPLAY
    dnaOpacity: useTransform(
      scrollYProgress,
      [0.62, 0.63, 0.7, 0.72],
      [0, 1, 1, 0],
    ),
    dnaTextOpacity: useTransform(
      scrollYProgress,
      [0.64, 0.66, 0.695, 0.71],
      [0, 1, 1, 0],
    ),
    dnaScale: useTransform(scrollYProgress, [0.63, 0.72], [1, 2.5]),
    dnaTextScale: useTransform(
      scrollYProgress,
      [0.64, 0.66, 0.695, 0.71],
      [0.8, 1.1, 1.1, 0.8],
    ),
    dnaTextY: useTransform(
      scrollYProgress,
      [0.64, 0.66, 0.695, 0.71],
      [30, 0, 0, -20],
    ),

    // Scene 9: Atom - EXTENDED TEXT DISPLAY
    atomOpacity: useTransform(
      scrollYProgress,
      [0.71, 0.72, 0.79, 0.81],
      [0, 1, 1, 0],
    ),
    atomTextOpacity: useTransform(
      scrollYProgress,
      [0.73, 0.75, 0.785, 0.8],
      [0, 1, 1, 0],
    ),
    atomScale: useTransform(scrollYProgress, [0.72, 0.81], [1, 2.5]),
    atomTextScale: useTransform(
      scrollYProgress,
      [0.73, 0.75, 0.785, 0.8],
      [0.8, 1.1, 1.1, 0.8],
    ),
    atomTextY: useTransform(
      scrollYProgress,
      [0.73, 0.75, 0.785, 0.8],
      [30, 0, 0, -20],
    ),

    // Scene 10: Nucleus - EXTENDED TEXT DISPLAY
    nucleusOpacity: useTransform(
      scrollYProgress,
      [0.8, 0.81, 0.88, 0.9],
      [0, 1, 1, 0],
    ),
    nucleusTextOpacity: useTransform(
      scrollYProgress,
      [0.82, 0.84, 0.875, 0.89],
      [0, 1, 1, 0],
    ),
    nucleusScale: useTransform(scrollYProgress, [0.81, 0.9], [1, 2.5]),
    nucleusTextScale: useTransform(
      scrollYProgress,
      [0.82, 0.84, 0.875, 0.89],
      [0.8, 1.1, 1.1, 0.8],
    ),
    nucleusTextY: useTransform(
      scrollYProgress,
      [0.82, 0.84, 0.875, 0.89],
      [30, 0, 0, -20],
    ),

    // Scene 11: Quarks / Gluons - EXTENDED TEXT DISPLAY
    quarksOpacity: useTransform(
      scrollYProgress,
      [0.89, 0.9, 0.97, 0.99],
      [0, 1, 1, 0.8],
    ),
    quarksTextOpacity: useTransform(
      scrollYProgress,
      [0.91, 0.93, 0.965, 0.98],
      [0, 1, 1, 0],
    ),
    quarksScale: useTransform(scrollYProgress, [0.9, 0.99], [1, 2.5]),
    quarksTextScale: useTransform(
      scrollYProgress,
      [0.91, 0.93, 0.965, 0.98],
      [0.8, 1.1, 1.1, 0.8],
    ),
    quarksTextY: useTransform(
      scrollYProgress,
      [0.91, 0.93, 0.965, 0.98],
      [30, 0, 0, -20],
    ),

    // Scene 12: Final Scene - ORIGINAL TIMING
    finalOpacity: useTransform(scrollYProgress, [0.98, 0.99], [0, 1]),
    finalTextOpacity: useTransform(scrollYProgress, [0.99, 1], [0, 1]),
    finalScale: useTransform(scrollYProgress, [0.99, 1], [1, 1]), // No scale change in final scene
  };

  // Mouse interaction for final scene with reduced sensitivity and smooth interpolation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  // Smoother mouse tracking with interpolation
  useEffect(() => {
    let animationFrame: number;

    const smoothMouseInterpolation = () => {
      // Interpolate current position towards target with easing
      setMousePosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.08, // Smooth easing factor
        y: prev.y + (targetPosition.y - prev.y) * 0.08,
      }));

      animationFrame = requestAnimationFrame(smoothMouseInterpolation);
    };

    animationFrame = requestAnimationFrame(smoothMouseInterpolation);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetPosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Reduce mouse movement sensitivity by 75% (multiplying by 0.25)
    setTargetPosition({
      x: (e.clientX / window.innerWidth - 0.5) * 0.25,
      y: (e.clientY / window.innerHeight - 0.5) * 0.25,
    });
  };

  // For debugging - remove in production
  const [scrollDebug, setScrollDebug] = useState<number>(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollDebug(parseFloat(latest.toFixed(2)));
  });

  // Progress bar removed

  // Decorative particle animation effect - reduced for better performance
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create particles with much slower movement - reduced count to improve performance
    const newParticles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      // Reduced from 30 to 15 particles
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.5 + 1, // Slightly smaller particles
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        speed: Math.random() * 0.02 + 0.01, // Even slower movement for better performance
        direction: Math.random() * 360,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div
      id="homepage"
      ref={containerRef}
      className="relative bg-black text-white overflow-x-hidden"
      style={{ position: "relative" }}
      onMouseMove={handleMouseMove}
    >
      {/* Decorative floating particles - Optimized for GPU rendering */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              transform: `translate3d(${particle.initialX}px, ${particle.initialY}px, 0)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              willChange: "transform, opacity",
              opacity: particle.size > 2 ? 0.8 : 0.4,
            }}
            layout={false}
            animate={{
              transform: [
                `translate3d(${particle.initialX}px, ${particle.initialY}px, 0)`,
                `translate3d(${particle.initialX + Math.sin(particle.direction) * 100 * particle.speed}px, 
                              ${particle.initialY + Math.cos(particle.direction) * 100 * particle.speed}px, 0)`,
                `translate3d(${particle.initialX}px, ${particle.initialY}px, 0)`,
              ],
              opacity: [
                particle.size > 2 ? 0.8 : 0.4,
                particle.size > 2 ? 0.4 : 0.2,
                particle.size > 2 ? 0.8 : 0.4,
              ],
            }}
            transition={{
              duration: 30 + particle.size * 10, // Much slower animation
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
              type: "tween", // More efficient animation type
            }}
          />
        ))}
      </div>
      {/* Multiple viewport-height sections for scrolling - 12 sections */}
      <div className="h-[1200vh]">
        {/* Fixed position container for all scenes */}
        <div className="fixed inset-0 w-full h-full overflow-hidden">
          {/* Scene 1: Cosmic Web - Enhanced with particles and depth */}
          <motion.div
            style={{
              opacity: stageRanges.cosmicWebOpacity,
              scale: stageRanges.cosmicWebScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-violet-950 to-black opacity-95"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.15),transparent_70%)]"></div>
            <CosmicWebSVG />
            <EnhancedParticleField
              color="#C4B5FD"
              density={15}
              speed={20}
              opacity={0.4}
              glowIntensity={1.5}
              direction="random"
              minSize={0.3}
              maxSize={1.2}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.cosmicWebTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.cosmicWebTextScale}
              yMotionValue={stageRanges.cosmicWebTextY}
              borderColor="border-purple-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                It begins beyond what we can see...
              </h2>
              <p className="text-gray-300">
                The cosmic tapestry of light, spanning across time and space.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 2: Galaxy - Enhanced with nebula effect and starfield */}
          <motion.div
            style={{
              opacity: stageRanges.galaxyOpacity,
              scale: stageRanges.galaxyScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-900 to-black opacity-95"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
            <div className="absolute inset-0 overflow-hidden">
              {/* Nebula clouds */}
              <motion.div
                className="absolute w-full h-full opacity-20"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 120,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><filter id="filter"><feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" /><feColorMatrix values="0 0 0 0 0.3 0 0 0 0 0.5 0 0 0 0 0.8 0 0 0 0.5 0" /></filter><rect width="100%" height="100%" filter="url(%23filter)" /></svg>\')',
                  backgroundSize: "cover",
                }}
              />
            </div>
            <GalaxySVG />
            <EnhancedParticleField
              color="#93C5FD"
              density={30}
              speed={8}
              opacity={0.5}
              glowIntensity={1.2}
              direction="random"
              minSize={0.2}
              maxSize={1}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.galaxyTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.galaxyTextScale}
              yMotionValue={stageRanges.galaxyTextY}
              borderColor="border-blue-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                The story of light stretches across galaxies.
              </h2>
              <p className="text-gray-300">
                From countless stars, shining across unimaginable distances.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 3: Oort Cloud - Enhanced with dust and depth effects */}
          <motion.div
            style={{
              opacity: stageRanges.oortCloudOpacity,
              scale: stageRanges.oortCloudScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 opacity-90"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.05),transparent_70%)]"></div>
            <OortCloudSVG />
            {/* Distant stars effect - reduced for better performance */}
            <div className="absolute inset-0">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={`distant-star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 1 + 0.5 + "px",
                    height: Math.random() * 1 + 0.5 + "px",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 ${Math.random() * 2}px rgba(255,255,255,0.8)`,
                    opacity: Math.random() * 0.5 + 0.1,
                  }}
                  animate={{
                    opacity: [
                      Math.random() * 0.5 + 0.1,
                      Math.random() * 0.3 + 0.05,
                      Math.random() * 0.5 + 0.1,
                    ],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <EnhancedParticleField
              color="#E2E8F0"
              density={25}
              speed={5}
              opacity={0.2}
              glowIntensity={0.5}
              minSize={0.2}
              maxSize={0.8}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.oortCloudTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.oortCloudTextScale}
              yMotionValue={stageRanges.oortCloudTextY}
              borderColor="border-slate-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Zoom in, past frozen dust and ancient comets.
              </h2>
              <p className="text-gray-300">
                The outer edges of our solar system, where remnants of creation
                drift.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 4: Solar System - Enhanced with space depth and solar flares */}
          <motion.div
            style={{
              opacity: stageRanges.solarSystemOpacity,
              scale: stageRanges.solarSystemScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-blue-950 to-black opacity-90"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.08),transparent_70%)]"></div>

            {/* Solar prominences and flares */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative"
                style={{ width: "10rem", height: "10rem" }}
              >
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-yellow-300 opacity-20 rounded-full"
                  style={{ width: "12rem", height: "12rem" }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Solar flares */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <motion.div
                    key={`flare-${i}`}
                    className="absolute bg-gradient-to-r from-orange-500 to-yellow-300 opacity-40"
                    style={{
                      width: `${Math.random() * 3 + 4}rem`,
                      height: "0.3rem",
                      top: "50%",
                      left: "50%",
                      originX: 0,
                      originY: 0.5,
                      rotate: angle,
                      borderRadius: "0.5rem",
                      filter: "blur(2px)",
                    }}
                    animate={{
                      scaleX: [0.8, 1.2, 0.8],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>

            <SolarSystemSVG />

            {/* Background stars - reduced for better performance */}
            <div className="absolute inset-0">
              {Array.from({ length: 60 }).map((_, i) => (
                <motion.div
                  key={`bg-star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 1.5 + 0.5 + "px",
                    height: Math.random() * 1.5 + 0.5 + "px",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 ${Math.random() * 2}px rgba(255,255,255,0.8)`,
                    opacity: Math.random() * 0.7 + 0.2,
                  }}
                  animate={{
                    opacity: [
                      Math.random() * 0.7 + 0.2,
                      Math.random() * 0.4 + 0.1,
                      Math.random() * 0.7 + 0.2,
                    ],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.solarSystemTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.solarSystemTextScale}
              yMotionValue={stageRanges.solarSystemTextY}
              borderColor="border-indigo-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Into the solar system, a dance of motion and fire.
              </h2>
              <p className="text-gray-300">
                Where planets follow eternal orbits around our central star.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 5: Earth - Enhanced with atmospheric glow and aurora effects */}
          <motion.div
            style={{
              opacity: stageRanges.earthOpacity,
              scale: stageRanges.earthScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-radial from-blue-900 via-blue-950 to-indigo-950 opacity-90"></div>

            {/* Atmospheric glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute rounded-full bg-blue-400/5"
                style={{ width: "55rem", height: "55rem" }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.05, 0.08, 0.05],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute rounded-full bg-blue-300/10"
                style={{ width: "52rem", height: "52rem" }}
                animate={{
                  scale: [1, 1.03, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </div>

            {/* Northern lights / Aurora effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                overflow: "hidden",
                opacity: 0.15,
                mixBlendMode: "screen",
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="aurora1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="50%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient
                    id="aurora2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                  <filter
                    id="auroraBlur"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                  </filter>
                </defs>

                <motion.path
                  d="M20,40 Q30,35 40,38 T60,40 T80,38"
                  stroke="url(#aurora1)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#auroraBlur)"
                  animate={{
                    d: [
                      "M20,40 Q30,35 40,38 T60,40 T80,38",
                      "M20,38 Q30,42 40,39 T60,43 T80,40",
                      "M20,40 Q30,35 40,38 T60,40 T80,38",
                    ],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.path
                  d="M10,44 Q25,46 35,43 T60,45 T90,42"
                  stroke="url(#aurora2)"
                  strokeWidth="1.5"
                  fill="none"
                  filter="url(#auroraBlur)"
                  animate={{
                    d: [
                      "M10,44 Q25,46 35,43 T60,45 T90,42",
                      "M10,42 Q25,40 35,45 T60,42 T90,44",
                      "M10,44 Q25,46 35,43 T60,45 T90,42",
                    ],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>

            <EarthSVG />

            {/* Distant stars - reduced for better performance */}
            <div className="absolute inset-0 -z-10">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={`distant-earth-star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 1 + 0.5 + "px",
                    height: Math.random() * 1 + 0.5 + "px",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 ${Math.random() * 2}px rgba(255,255,255,0.7)`,
                    opacity: Math.random() * 0.4 + 0.1,
                  }}
                  animate={{
                    opacity: [
                      Math.random() * 0.4 + 0.1,
                      Math.random() * 0.2 + 0.05,
                      Math.random() * 0.4 + 0.1,
                    ],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.earthTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.earthTextScale}
              yMotionValue={stageRanges.earthTextY}
              borderColor="border-blue-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Toward a pale blue dot...
              </h2>
              <p className="text-gray-300">
                Our home among the stars, where all of human history has
                unfolded.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 6: Telescope - Enhanced with better starfield and light trails */}
          <motion.div
            style={{
              opacity: stageRanges.telescopeOpacity,
              scale: stageRanges.telescopeScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <StarField />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-indigo-950 opacity-90"></div>

            {/* Light pollution gradient in the "horizon" */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-amber-900/10 to-transparent"></div>

            {/* Telescope light cone effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-1/3 h-3/4 bg-gradient-to-t from-transparent to-slate-200/5"
                style={{
                  transformOrigin: "bottom center",
                  rotate: "25deg",
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: [0.05, 0.07, 0.05],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Collection of light streaks (meteors/satellites) */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => {
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const angle = Math.random() * 60 - 30; // -30 to +30 degrees
                const length = 20 + Math.random() * 30;
                const endX =
                  startX + Math.cos((angle * Math.PI) / 180) * length;
                const endY =
                  startY + Math.sin((angle * Math.PI) / 180) * length;

                return (
                  <motion.div
                    key={`meteor-${i}`}
                    className="absolute bg-gradient-to-r from-white to-transparent"
                    style={{
                      height: "1px",
                      width: `${length}px`,
                      left: `${startX}%`,
                      top: `${startY}%`,
                      rotate: `${angle}deg`,
                      opacity: 0,
                    }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      width: [`2px`, `${length}px`, `2px`],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      repeatDelay: 7 + Math.random() * 15,
                      ease: "easeInOut",
                      delay: i * 2,
                    }}
                  />
                );
              })}
            </div>

            {/* Enhanced star field - brighter stars with twinkling */}
            <div className="absolute inset-0">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={`bright-star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 2 + 1 + "px",
                    height: Math.random() * 2 + 1 + "px",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(255,255,255,0.8)`,
                    opacity: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    opacity: [
                      Math.random() * 0.5 + 0.5,
                      Math.random() * 0.3 + 0.3,
                      Math.random() * 0.5 + 0.5,
                    ],
                    scale: [1, Math.random() * 0.2 + 0.9, 1],
                  }}
                  transition={{
                    duration: 1 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
              {/* Lens flare effect */}
              <motion.div
                className="absolute rounded-full bg-blue-100 mix-blend-screen"
                style={{
                  width: "4rem",
                  height: "4rem",
                  filter: "blur(10px)",
                  transform: "translate(30%, -40%)",
                }}
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <TelescopeSVG />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.telescopeTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.telescopeTextScale}
              yMotionValue={stageRanges.telescopeTextY}
              borderColor="border-gray-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Where we watch the skies from the ground.
              </h2>
              <p className="text-gray-300">
                Our tools of observation extend our vision into the cosmos.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 7: Eye - Enhanced with light refraction and neural signals */}
          <motion.div
            style={{
              opacity: stageRanges.eyeOpacity,
              scale: stageRanges.eyeScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-radial from-blue-800 via-blue-900 to-indigo-950 opacity-90"></div>

            {/* Light beams/rays converging at eye */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = i * 30; // 12 rays evenly distributed
                const distance = 100; // start far away

                return (
                  <motion.div
                    key={`light-ray-${i}`}
                    className="absolute bg-gradient-to-t from-transparent via-blue-300/10 to-transparent"
                    style={{
                      width: "1px",
                      height: "100vh",
                      left: "50%",
                      top: "50%",
                      transformOrigin: "center",
                      rotate: `${angle}deg`,
                      opacity: 0.2,
                    }}
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                );
              })}
            </div>

            {/* Neural signal pulses */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative"
                style={{ width: "30rem", height: "30rem" }}
              >
                <motion.div
                  className="absolute right-0 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent"
                  style={{
                    top: "50%",
                    transformOrigin: "right center",
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute right-0 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"
                  style={{
                    top: "48%",
                    transformOrigin: "right center",
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />

                <motion.div
                  className="absolute right-0 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-200/40 to-transparent"
                  style={{
                    top: "52%",
                    transformOrigin: "right center",
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 1.7,
                    repeat: Infinity,
                    repeatDelay: 2.2,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />
              </div>
            </div>

            {/* Colored light reflections */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-transparent"
                style={{
                  width: "30rem",
                  height: "30rem",
                  transform: "translateX(-40%)",
                  filter: "blur(30px)",
                }}
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
              <EyeSVG />
            </div>

            {/* Focal point glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute bg-white rounded-full"
                style={{
                  width: "2rem",
                  height: "2rem",
                  filter: "blur(10px)",
                  opacity: 0.2,
                  transform: "translateX(5rem)",
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.eyeTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.eyeTextScale}
              yMotionValue={stageRanges.eyeTextY}
              borderColor="border-blue-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                And see, not just through instruments...
              </h2>
              <p className="text-gray-300">
                But through the remarkable optical system we were born with.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 8: DNA / Cell - Enhanced with liquid environment and bio-chemical effects */}
          <motion.div
            style={{
              opacity: stageRanges.dnaOpacity,
              scale: stageRanges.dnaScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-radial from-cyan-800 via-blue-900 to-blue-950 opacity-95"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)]"></div>

            {/* Watery/fluid environment effect */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                filter:
                  'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feTurbulence baseFrequency="0.01 0.005" numOctaves="2" seed="1" type="fractalNoise" /><feDisplacementMap in="SourceGraphic" scale="10" /></filter></svg>#filter\')',
                backgroundImage:
                  "linear-gradient(to bottom, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
              }}
              animate={{
                filter: [
                  'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feTurbulence baseFrequency="0.01 0.005" numOctaves="2" seed="1" type="fractalNoise" /><feDisplacementMap in="SourceGraphic" scale="10" /></filter></svg>#filter\')',
                  'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feTurbulence baseFrequency="0.01 0.005" numOctaves="2" seed="5" type="fractalNoise" /><feDisplacementMap in="SourceGraphic" scale="10" /></filter></svg>#filter\')',
                  'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feTurbulence baseFrequency="0.01 0.005" numOctaves="2" seed="9" type="fractalNoise" /><feDisplacementMap in="SourceGraphic" scale="10" /></filter></svg>#filter\')',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Cell membrane shapes randomly placed floating */}
            <div className="absolute inset-0">
              {Array.from({ length: 15 }).map((_, i) => {
                const size = Math.random() * 100 + 30;
                return (
                  <motion.div
                    key={`cell-${i}`}
                    className="absolute rounded-full border border-cyan-300/10"
                    style={{
                      width: size,
                      height: size,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.2 + 0.05,
                      boxShadow: "inset 0 0 20px rgba(56, 189, 248, 0.05)",
                    }}
                    animate={{
                      x: [0, Math.random() * 30 - 15, 0],
                      y: [0, Math.random() * 30 - 15, 0],
                      scale: [1, Math.random() * 0.2 + 0.9, 1],
                      opacity: [
                        Math.random() * 0.2 + 0.05,
                        Math.random() * 0.1 + 0.1,
                        Math.random() * 0.2 + 0.05,
                      ],
                    }}
                    transition={{
                      duration: 10 + Math.random() * 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            {/* Bio-luminescent particles */}
            <EnhancedParticleField
              color="#22D3EE"
              density={30}
              speed={15}
              opacity={0.4}
              glowIntensity={2}
              direction="random"
              minSize={0.5}
              maxSize={2}
            />

            {/* Central DNA with stronger glow effect */}
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                className="absolute"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(14, 165, 233, 0.5))",
                }}
                animate={{
                  filter: [
                    "drop-shadow(0 0 25px rgba(14, 165, 233, 0.4))",
                    "drop-shadow(0 0 40px rgba(14, 165, 233, 0.6))",
                    "drop-shadow(0 0 25px rgba(14, 165, 233, 0.4))",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <DNASVG />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.dnaTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.dnaTextScale}
              yMotionValue={stageRanges.dnaTextY}
              borderColor="border-cyan-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                ...but through biology.
              </h2>
              <p className="text-gray-300">
                The molecular structures that encode our ability to perceive
                light.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 9: Atom - Enhanced with quantum effects and electron clouds */}
          <motion.div
            style={{
              opacity: stageRanges.atomOpacity,
              scale: stageRanges.atomScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-radial from-pink-800 via-pink-900 to-purple-950 opacity-90"></div>

            {/* Quantum energy waves */}
            <div className="absolute inset-0">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    id="electronGradient"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="50%"
                    fy="50%"
                  >
                    <stop offset="0%" stopColor="rgba(244, 114, 182, 0.2)" />
                    <stop offset="100%" stopColor="rgba(244, 114, 182, 0)" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite
                      in="SourceGraphic"
                      in2="blur"
                      operator="over"
                    />
                  </filter>
                </defs>

                {/* Probability clouds - different electron orbitals */}
                <motion.ellipse
                  cx="50%"
                  cy="50%"
                  rx="20%"
                  ry="10%"
                  fill="url(#electronGradient)"
                  opacity="0.3"
                  animate={{
                    rx: ["20%", "22%", "20%"],
                    ry: ["10%", "12%", "10%"],
                    opacity: [0.3, 0.4, 0.3],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.ellipse
                  cx="50%"
                  cy="50%"
                  rx="10%"
                  ry="20%"
                  fill="url(#electronGradient)"
                  opacity="0.3"
                  animate={{
                    rx: ["10%", "12%", "10%"],
                    ry: ["20%", "18%", "20%"],
                    opacity: [0.3, 0.2, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.ellipse
                  cx="50%"
                  cy="50%"
                  rx="15%"
                  ry="15%"
                  fill="url(#electronGradient)"
                  opacity="0.2"
                  animate={{
                    rx: ["15%", "17%", "15%"],
                    ry: ["15%", "16%", "15%"],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </div>

            {/* Energy waves and quantum field fluctuations */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => {
                const radius = 20 + i * 10; // Increasing radiuses
                return (
                  <motion.div
                    key={`wave-ring-${i}`}
                    className="absolute rounded-full border border-pink-400/10"
                    style={{
                      width: `${radius}%`,
                      height: `${radius}%`,
                      left: "50%",
                      top: "50%",
                      x: "-50%",
                      y: "-50%",
                      boxShadow: "0 0 15px rgba(236, 72, 153, 0.1)",
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                );
              })}
            </div>

            {/* Electron particles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = i * 30; // 12 electrons evenly spaced
                const radius = 20; // Distance from center
                return (
                  <motion.div
                    key={`electron-${i}`}
                    className="absolute rounded-full bg-pink-300 shadow-glow"
                    style={{
                      width: "5px",
                      height: "5px",
                      boxShadow: "0 0 8px rgba(236, 72, 153, 0.8)",
                      left: "50%",
                      top: "50%",
                      x: "-50%",
                      y: "-50%",
                    }}
                    animate={{
                      x: [
                        `calc(${radius}vh * cos(${angle}deg) - 50%)`,
                        `calc(${radius}vh * cos(${angle + 360}deg) - 50%)`,
                      ],
                      y: [
                        `calc(${radius}vh * sin(${angle}deg) - 50%)`,
                        `calc(${radius}vh * sin(${angle + 360}deg) - 50%)`,
                      ],
                      opacity: [0.8, 0.5, 0.8],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      x: {
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      y: {
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      opacity: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />
                );
              })}
            </div>

            <AtomSVG />

            {/* Central nucleus glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute rounded-full bg-pink-500/30"
                style={{
                  width: "3rem",
                  height: "3rem",
                  filter: "blur(10px)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.atomTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.atomTextScale}
              yMotionValue={stageRanges.atomTextY}
              borderColor="border-pink-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Through the tiniest building blocks.
              </h2>
              <p className="text-gray-300">
                Where electrons orbit nuclei, and light is both particle and
                wave.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 10: Nucleus - Enhanced with strong nuclear force visualization */}
          <motion.div
            style={{
              opacity: stageRanges.nucleusOpacity,
              scale: stageRanges.nucleusScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-radial from-red-900 via-red-950 to-gray-950 opacity-95"></div>

            {/* Energy field surrounding the nucleus */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-1/3 h-1/3 rounded-full bg-gradient-radial from-red-500/10 to-transparent"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Strong force interactions */}
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 15 }).map((_, i) => {
                const angle = Math.random() * 360;
                const distance = Math.random() * 25 + 5;
                const x = Math.cos((angle * Math.PI) / 180) * distance;
                const y = Math.sin((angle * Math.PI) / 180) * distance;

                return (
                  <motion.div
                    key={`force-line-${i}`}
                    className="absolute bg-red-400/20"
                    style={{
                      width: "1px",
                      height: `${Math.random() * 10 + 5}vh`,
                      left: "50%",
                      top: "50%",
                      x: `calc(${x}vh - 0.5px)`,
                      y: `calc(${y}vh - 50%)`,
                      transformOrigin: "bottom center",
                      rotate: `${angle}deg`,
                    }}
                    animate={{
                      height: [
                        `${Math.random() * 10 + 5}vh`,
                        `${Math.random() * 15 + 10}vh`,
                        `${Math.random() * 10 + 5}vh`,
                      ],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            {/* Proton and neutron particles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 15 }).map((_, i) => {
                const isProton = i % 2 === 0;
                const particleClass = isProton ? "bg-red-400" : "bg-gray-300";
                const shadowColor = isProton
                  ? "rgba(248, 113, 113, 0.6)"
                  : "rgba(209, 213, 219, 0.6)";
                const angle = Math.random() * 360;
                const distance = Math.random() * 10 + 2; // Keep closer to center
                const x = Math.cos((angle * Math.PI) / 180) * distance;
                const y = Math.sin((angle * Math.PI) / 180) * distance;

                return (
                  <motion.div
                    key={`nucleon-${i}`}
                    className={`absolute rounded-full ${particleClass}`}
                    style={{
                      width: "8px",
                      height: "8px",
                      left: "50%",
                      top: "50%",
                      x: `calc(${x}vh - 4px)`,
                      y: `calc(${y}vh - 4px)`,
                      boxShadow: `0 0 8px ${shadowColor}`,
                    }}
                    animate={{
                      x: [
                        `calc(${x}vh - 4px)`,
                        `calc(${x + (Math.random() * 2 - 1)}vh - 4px)`,
                        `calc(${x}vh - 4px)`,
                      ],
                      y: [
                        `calc(${y}vh - 4px)`,
                        `calc(${y + (Math.random() * 2 - 1)}vh - 4px)`,
                        `calc(${y}vh - 4px)`,
                      ],
                      scale: [1, Math.random() * 0.2 + 0.9, 1],
                    }}
                    transition={{
                      duration: 1 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            {/* Gluon exchange particles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`gluon-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: "2px",
                    height: "2px",
                    left: "50%",
                    top: "50%",
                    opacity: 0,
                    boxShadow: "0 0 3px rgba(255, 255, 255, 0.8)",
                  }}
                  animate={{
                    x: [
                      `calc(${Math.random() * 8 - 4}vh)`,
                      `calc(${Math.random() * 16 - 8}vh)`,
                    ],
                    y: [
                      `calc(${Math.random() * 8 - 4}vh)`,
                      `calc(${Math.random() * 16 - 8}vh)`,
                    ],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.8,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Central hot spot */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="absolute rounded-full bg-gradient-radial from-red-500/30 to-red-600/0"
                style={{
                  width: "10vh",
                  height: "10vh",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <NucleusSVG />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.nucleusTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.nucleusTextScale}
              yMotionValue={stageRanges.nucleusTextY}
              borderColor="border-red-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Deeper still, past protons and neutrons...
              </h2>
              <p className="text-gray-300">
                Into the strong nuclear forces that bind matter together.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 11: Quarks - Enhanced with quantum foam and field fluctuations */}
          <motion.div
            style={{
              opacity: stageRanges.quarksOpacity,
              scale: stageRanges.quarksScale,
              willChange: "transform, opacity",
            }}
            layout={false}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black"></div>
            <div className="absolute inset-0 bg-purple-900/10"></div>

            {/* Quantum foam particles - extremely small quantum fluctuations */}
            <div className="absolute inset-0">
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                  key={`quantum-fluc-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 1 + 0.2 + "px",
                    height: Math.random() * 1 + 0.2 + "px",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, Math.random() * 0.7 + 0.2, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.3 + Math.random() * 0.5,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Field lines representing quantum fields */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => {
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const endX = startX + (Math.random() * 20 - 10);
                const endY = startY + (Math.random() * 20 - 10);

                return (
                  <motion.div
                    key={`field-line-${i}`}
                    className="absolute bg-gradient-to-r from-slate-300/0 via-slate-300/10 to-slate-300/0"
                    style={{
                      height: "1px",
                      width: "0px",
                      left: `${startX}%`,
                      top: `${startY}%`,
                      opacity: 0,
                    }}
                    animate={{
                      width: ["0px", "50px", "0px"],
                      x: [0, endX - startX, 0],
                      y: [0, endY - startY, 0],
                      opacity: [0, 0.3, 0],
                      rotate: [0, Math.random() * 360, 0],
                    }}
                    transition={{
                      duration: 1 + Math.random(),
                      repeat: Infinity,
                      repeatDelay: Math.random() * 3,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            {/* Primary quark particles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {["red", "green", "blue"].map((color, i) => {
                const angle = i * 120; // Evenly space the three quarks
                const distance = 8; // Distance from center
                const x = Math.cos((angle * Math.PI) / 180) * distance;
                const y = Math.sin((angle * Math.PI) / 180) * distance;

                // Color mapping
                let particleColor;
                let glowColor;
                if (color === "red") {
                  particleColor = "bg-red-400";
                  glowColor = "rgba(248, 113, 113, 0.7)";
                } else if (color === "green") {
                  particleColor = "bg-emerald-400";
                  glowColor = "rgba(52, 211, 153, 0.7)";
                } else {
                  particleColor = "bg-blue-400";
                  glowColor = "rgba(96, 165, 250, 0.7)";
                }

                return (
                  <motion.div
                    key={`quark-${i}`}
                    className={`absolute rounded-full ${particleColor}`}
                    style={{
                      width: "6px",
                      height: "6px",
                      left: "50%",
                      top: "50%",
                      x: `calc(${x}vh - 3px)`,
                      y: `calc(${y}vh - 3px)`,
                      boxShadow: `0 0 10px ${glowColor}`,
                      zIndex: 10,
                    }}
                    animate={{
                      x: [
                        `calc(${x}vh - 3px)`,
                        `calc(${x + (Math.random() * 4 - 2)}vh - 3px)`,
                        `calc(${x}vh - 3px)`,
                      ],
                      y: [
                        `calc(${y}vh - 3px)`,
                        `calc(${y + (Math.random() * 4 - 2)}vh - 3px)`,
                        `calc(${y}vh - 3px)`,
                      ],
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            <QuarksSVG />

            {/* Energy bursts */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-16 h-16 rounded-full bg-gradient-radial from-white/10 to-transparent"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.quarksTextOpacity }}
          >
            <DepthAwareTextBox
              scaleMotionValue={stageRanges.quarksTextScale}
              yMotionValue={stageRanges.quarksTextY}
              borderColor="border-gray-500/20"
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">
                ...to the fabric of everything.
              </h2>
              <p className="text-gray-300">
                Where quantum fields fluctuate and the fundamental forces arise.
              </p>
            </DepthAwareTextBox>
          </motion.div>

          {/* Scene 12: Final Scene - Enhanced with cosmic connection effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: stageRanges.finalOpacity,
              scale: stageRanges.finalScale,
              x: mousePosition.x * 20,
              y: mousePosition.y * 20,
              willChange: "transform, opacity",
            }}
            layout={false}
          >
            <div className="absolute inset-0 bg-black"></div>
            <div className="absolute inset-0 bg-purple-900/10"></div>

            {/* Starfield background */}
            <div className="absolute inset-0">
              {Array.from({ length: 200 }).map((_, i) => {
                const size = Math.random() * 1.5 + 0.5;
                const brightness = Math.random();
                return (
                  <motion.div
                    key={`final-star-${i}`}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      boxShadow:
                        brightness > 0.8
                          ? `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, 0.8)`
                          : "none",
                      opacity: brightness * 0.7 + 0.3,
                    }}
                    animate={{
                      opacity: [
                        brightness * 0.7 + 0.3,
                        brightness * 0.5 + 0.2,
                        brightness * 0.7 + 0.3,
                      ],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            {/* Cosmic web to quantum web connection particles */}
            <div className="absolute inset-0 overflow-hidden">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="cosmicEndStroke"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Connecting lines from macro to micro */}
                {Array.from({ length: 20 }).map((_, i) => {
                  const startX = Math.random() * 30 + 10;
                  const startY = Math.random() * 30 + 10;
                  const endX = Math.random() * 30 + 60;
                  const endY = Math.random() * 30 + 60;

                  return (
                    <motion.path
                      key={`connector-${i}`}
                      d={`M ${startX},${startY} C ${(startX + endX) / 2 - 20},${(startY + endY) / 2 + 20} ${(startX + endX) / 2 + 20},${(startY + endY) / 2 - 20} ${endX},${endY}`}
                      fill="none"
                      stroke="url(#cosmicEndStroke)"
                      strokeWidth="0.3"
                      opacity={0}
                      strokeDasharray="0.8 0.4"
                      animate={{
                        opacity: [0, Math.random() * 0.3 + 0.2, 0],
                        strokeDashoffset: [0, -100],
                      }}
                      transition={{
                        duration: 10 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                      }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Ethereal light rays */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = i * 45;
                return (
                  <motion.div
                    key={`light-ray-final-${i}`}
                    className="absolute bg-gradient-to-t from-transparent via-indigo-300/5 to-transparent"
                    style={{
                      width: "1px",
                      height: "100%",
                      left: "50%",
                      top: "0",
                      transformOrigin: "bottom center",
                      rotate: `${angle}deg`,
                    }}
                    animate={{
                      height: ["0%", "100%", "0%"],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 1,
                    }}
                  />
                );
              })}
            </div>

            {/* Central cosmos-quantum connection glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="absolute w-32 h-32 rounded-full bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            </div>

            <QuarksSVG />

            {/* Particle system showing scale continuum */}
            <EnhancedParticleField
              color="#E9D5FF"
              density={25}
              speed={8}
              opacity={0.3}
              glowIntensity={1.2}
              direction="inward"
              minSize={0.3}
              maxSize={1.5}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: stageRanges.finalTextOpacity }}
          >
            <motion.div
              className="card-glass border-purple-500/10 p-8 max-w-lg text-center backdrop-blur-xl shadow-lg bg-black/5"
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.19, 1, 0.22, 1], // cubic-bezier for smooth deceleration
                opacity: { duration: 1.0 },
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                This is the scale of optics.
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Welcome to greygolus.com
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <Link
                  href="/directory#calculators"
                  className="card-glass card-glass-hover transition-all duration-300 rounded-xl border border-white/10 p-4 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-105 ease-in-out bg-black/5 backdrop-blur-xl"
                >
                  <span className="gradient-text font-bold">Calculators</span>
                </Link>
                <Link
                  href="/reference"
                  className="card-glass card-glass-hover transition-all duration-300 rounded-xl border border-white/10 p-4 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:scale-105 ease-in-out bg-black/5 backdrop-blur-xl"
                >
                  <span className="gradient-text font-bold">References</span>
                </Link>
                <Link
                  href="/directory"
                  className="card-glass card-glass-hover transition-all duration-300 rounded-xl border border-white/10 p-4 hover:shadow-[0_0_15px_rgba(94,234,212,0.3)] hover:scale-105 ease-in-out bg-black/5 backdrop-blur-xl"
                >
                  <span className="gradient-text font-bold">All Tools</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator for first-time visitors */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{
          duration: 4, // Slower animation
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
      >
        <p className="text-white mb-2 text-sm font-medium tracking-wide">
          Scroll to explore
        </p>
        <motion.div
          animate={{
            y: [0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-glow"
          >
            <path
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Progress bar removed */}
    </div>
  );
};

export default Home;
