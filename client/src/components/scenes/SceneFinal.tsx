import React from "react";
import { motion } from "framer-motion";
import OptimizedParticleField from "../../components/ui/enhanced-particle-field";
import { Link } from "wouter";

interface SceneFinalProps {
  opacity: any;
  scale: any;
  textOpacity: any;
  finalScale: any;
  mousePosition: {
    x: number;
    y: number;
  };
}

// QuarksSVG component - copied from SceneQuarks to avoid circular dependencies
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

const SceneFinal: React.FC<SceneFinalProps> = ({
  opacity,
  scale,
  textOpacity,
  finalScale,
  mousePosition,
}) => {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          opacity,
          scale,
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
        <OptimizedParticleField
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
        style={{ opacity: textOpacity }}
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
    </>
  );
};

export default SceneFinal;