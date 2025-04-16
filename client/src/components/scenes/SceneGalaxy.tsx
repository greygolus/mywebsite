import React from "react";
import { motion } from "framer-motion";

interface SceneGalaxyProps {
  opacity: any;
  scale: any;
}

const SceneGalaxy: React.FC<SceneGalaxyProps> = ({ opacity, scale }) => {
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
    </motion.div>
  );
};

export default SceneGalaxy;