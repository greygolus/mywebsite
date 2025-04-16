import React from "react";
import { motion } from "framer-motion";

interface SceneSolarSystemProps {
  opacity: any;
  scale: any;
}

const SceneSolarSystem: React.FC<SceneSolarSystemProps> = ({ opacity, scale }) => {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        scale,
        willChange: "transform, opacity",
      }}
      layout={false}
    >
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
    </motion.div>
  );
};

export default SceneSolarSystem;