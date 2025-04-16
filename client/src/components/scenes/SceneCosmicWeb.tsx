import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Define our interface for the props
interface SceneCosmicWebProps {
  opacity: any;
  scale: any;
}

// Define types for our path and node data
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

const SceneCosmicWeb: React.FC<SceneCosmicWebProps> = ({ opacity, scale }) => {
  // Precompute all random values for paths (cosmic web structure)
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
    </motion.div>
  );
};

export default SceneCosmicWeb;