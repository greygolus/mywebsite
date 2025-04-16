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
  delay: number;
  color: string;
}

interface NodeData {
  cx: number;
  cy: number;
  r: number;
  duration: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
  color: string;
  glow: boolean;
}

interface StarData {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  twinkleSpeed: number;
}

const SceneCosmicWeb: React.FC<SceneCosmicWebProps> = ({ opacity, scale }) => {
  // Create a dynamic cosmic nebula effect with more clouds
  const nebulaClouds = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const size = 30 + Math.random() * 70; // More variation in size
      const posX = Math.random() * 120 - 10; // Allow some to be slightly off-screen
      const posY = Math.random() * 120 - 10; // for a more natural effect
      const rotation = Math.random() * 360;
      const duration = 70 + Math.random() * 60; // More varied rotation speeds
      
      return { size, posX, posY, rotation, duration }
    });
  }, []);
  
  // Create distant stars in the background
  const stars = useMemo<StarData[]>(() => {
    return Array.from({ length: 100 }).map(() => {
      return {
        cx: Math.random() * 100,
        cy: Math.random() * 100,
        r: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
        twinkleSpeed: 1 + Math.random() * 2
      };
    });
  }, []);

  // Create dynamic cosmic web paths with enhanced variation
  const webPaths = useMemo<PathData[]>(() => {
    return Array.from({ length: 25 }).map(() => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const cp1X = Math.random() * 100;
      const cp1Y = Math.random() * 100;
      const cp2X = Math.random() * 100;
      const cp2Y = Math.random() * 100;
      const endX = Math.random() * 100;
      const endY = Math.random() * 100;
      const duration = 5 + Math.random() * 10; // Longer durations for more fluid motion
      const delay = Math.random() * 5; // Random delay for more natural appearance
      
      // Variation in colors for visual interest
      const colors = ["#A78BFA", "#8B5CF6", "#C4B5FD", "#7C3AED"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        path: `M${startX},${startY} C${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`,
        duration,
        delay,
        color
      };
    });
  }, []);

  // Create enhanced nodes with better glow and animation
  const nodes = useMemo<NodeData[]>(() => {
    return Array.from({ length: 60 }).map(() => {
      const cx = Math.random() * 100;
      const cy = Math.random() * 100;
      const r = Math.random() * 0.8 + 0.3; // Increased size range
      const duration = 2 + Math.random() * 4; // Varied animation duration
      
      // More dramatic motion for some nodes
      const driftX = (Math.random() * 2 - 1) * (Math.random() < 0.3 ? 6 : 3); 
      const driftY = (Math.random() * 2 - 1) * (Math.random() < 0.3 ? 6 : 3);
      const driftDuration = 15 + Math.random() * 25; // More varied drift speeds
      
      // Color variations
      const colors = ["#C4B5FD", "#A78BFA", "#DDD6FE", "#8B5CF6", "#EDE9FE"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Only larger nodes have glow effect for performance
      const glow = r > 0.6 && Math.random() < 0.5;

      return { cx, cy, r, duration, driftX, driftY, driftDuration, color, glow };
    });
  }, []);

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        scale,
        willChange: "transform, opacity",
        background: "linear-gradient(to bottom, rgba(15, 23, 42, 1), rgba(88, 28, 135, 0.8), rgba(15, 23, 42, 1))"
      }}
      layout={false}
    >
      {/* Dynamic background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_80%)]"></div>
      
      {/* Enhanced nebula effect with better blending */}
      <div className="absolute inset-0 overflow-hidden">
        {nebulaClouds.map((cloud, i) => (
          <motion.div
            key={`nebula-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${cloud.size}%`,
              height: `${cloud.size}%`,
              left: `${cloud.posX}%`,
              top: `${cloud.posY}%`,
              background: i % 3 === 0 
                ? "radial-gradient(circle, rgba(139,92,246,0.2), rgba(124,58,237,0.05), transparent 70%)" 
                : i % 3 === 1
                  ? "radial-gradient(circle, rgba(167,139,250,0.15), rgba(196,181,253,0.08), transparent 70%)"
                  : "radial-gradient(circle, rgba(109,40,217,0.18), rgba(79,70,229,0.06), transparent 70%)",
              transform: `rotate(${cloud.rotation}deg)`,
              filter: "blur(50px)",
              mixBlendMode: "screen",
              opacity: 0.5
            }}
            animate={{
              rotate: cloud.rotation + 360,
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.6, 0.5]
            }}
            transition={{
              rotate: {
                duration: cloud.duration,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: cloud.duration / 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              },
              opacity: {
                duration: cloud.duration / 5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror"
              }
            }}
          />
        ))}
      </div>
      
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
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#6D28D9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
          </radialGradient>
          
          {/* Enhanced radial glow filter for nodes */}
          <filter id="glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glowAlpha" />
            <feComposite in="glowAlpha" in2="SourceGraphic" operator="atop" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Circular radial gradient glow filter */}
          <radialGradient id="circleGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="40%" stopColor="white" stopOpacity="0.6" />
            <stop offset="70%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Background stars */}
        {stars.map((star, i) => (
          <motion.circle
            key={`star-${i}`}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#FFFFFF"
            initial={{ opacity: star.opacity }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.5, star.opacity]
            }}
            transition={{
              duration: star.twinkleSpeed,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Cosmic web-like structure with enhanced paths */}
        {webPaths.map((pathData, i) => (
          <motion.path
            key={`cosmic-web-${i}`}
            d={pathData.path}
            stroke={pathData.color}
            strokeWidth={0.15 + Math.random() * 0.15}
            strokeOpacity="0.6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: pathData.duration,
              delay: pathData.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: "opacity, pathLength" }}
          />
        ))}
        
        {/* Enhanced cosmic nodes with radial glow effects */}
        {nodes.map((node, i) => (
          <g key={`cosmic-node-${i}`}>
            {/* Outer glow for larger nodes */}
            {node.glow && (
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 6} 
                fill={`url(#node-glow-${i})`}
                initial={{ opacity: 0.1 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  cx: [node.cx, node.cx + node.driftX, node.cx],
                  cy: [node.cy, node.cy + node.driftY, node.cy],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  opacity: {
                    duration: node.duration * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: node.duration * 2,
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
            )}
            
            {/* Main node */}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.color}
              filter={node.glow ? "url(#glow)" : undefined}
              initial={{ opacity: 0.2 }}
              animate={{ 
                opacity: [0.2, 0.8, 0.2],
                cx: [node.cx, node.cx + node.driftX, node.cx],
                cy: [node.cy, node.cy + node.driftY, node.cy],
                scale: node.glow ? [1, 1.2, 1] : [1, 1.05, 1]
              }}
              transition={{ 
                opacity: {
                  duration: node.duration,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: {
                  duration: node.duration * 1.5,
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
            
            {/* Dynamic gradient definitions specific to each node */}
            <defs>
              <radialGradient id={`node-glow-${i}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor={node.color} stopOpacity="0.4" />
                <stop offset="20%" stopColor={node.color} stopOpacity="0.3" />
                <stop offset="40%" stopColor={node.color} stopOpacity="0.2" />
                <stop offset="60%" stopColor={node.color} stopOpacity="0.1" />
                <stop offset="100%" stopColor={node.color} stopOpacity="0" />
              </radialGradient>
            </defs>
          </g>
        ))}
      </svg>
      
      {/* Subtle energy field overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise' x='0%25' y='0%25' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.1 0' result='coloredNoise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay"
        }}
      />
    </motion.div>
  );
};

export default SceneCosmicWeb;