import React from "react";
import { motion } from "framer-motion";
import { DepthAwareTextBox } from "../../lib/applyTextBoxStyles";

interface SceneQuarksProps {
  opacity: any;
  scale: any;
  textOpacity: any;
  textScale: any;
  textY: any;
}

// QuarksSVG component extracted from the original home.tsx
const QuarksSVG = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient
        id="quarksGradient"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#7E22CE" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="100" height="100" fill="url(#quarksGradient)" />

    {/* Force field lines between quarks */}
    <motion.path
      d="M30,30 Q50,10 70,30"
      stroke="rgba(192, 132, 252, 0.4)"
      strokeWidth="0.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    />
    <motion.path
      d="M30,30 Q50,70 70,30"
      stroke="rgba(192, 132, 252, 0.4)"
      strokeWidth="0.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    />
    <motion.path
      d="M30,70 Q50,50 70,70"
      stroke="rgba(192, 132, 252, 0.4)"
      strokeWidth="0.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    />
    <motion.path
      d="M30,70 Q50,90 70,70"
      stroke="rgba(192, 132, 252, 0.4)"
      strokeWidth="0.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    />
    <motion.path
      d="M30,70 Q30,50 30,30"
      stroke="rgba(192, 132, 252, 0.4)"
      strokeWidth="0.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    />
    <motion.path
      d="M70,70 Q70,50 70,30"
      stroke="rgba(192, 132, 252, 0.4)"
      strokeWidth="0.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
    />
  </svg>
);

const SceneQuarks: React.FC<SceneQuarksProps> = ({
  opacity,
  scale,
  textOpacity,
  textScale,
  textY,
}) => {
  return (
    <>
      <motion.div
        style={{
          opacity,
          scale,
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
        style={{ opacity: textOpacity }}
      >
        <DepthAwareTextBox
          scaleMotionValue={textScale}
          yMotionValue={textY}
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
    </>
  );
};

export default SceneQuarks;