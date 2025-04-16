import React from "react";
import { motion } from "framer-motion";

interface SceneOortCloudProps {
  opacity: any;
  scale: any;
}

const SceneOortCloud: React.FC<SceneOortCloudProps> = ({ opacity, scale }) => {
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
    </motion.div>
  );
};

export default SceneOortCloud;