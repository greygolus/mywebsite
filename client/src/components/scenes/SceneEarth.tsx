import React from "react";
import { motion } from "framer-motion";

interface SceneEarthProps {
  opacity: any;
  scale: any;
}

const SceneEarth: React.FC<SceneEarthProps> = ({ opacity, scale }) => {
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
    </motion.div>
  );
};

export default SceneEarth;