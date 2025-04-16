import { Link } from 'wouter';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// SVG Components for animation scenes
const CosmicWebSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="cosmicGradient" cx="50%" cy="50%" r="100%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#6D28D9" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="100" height="100" fill="url(#cosmicGradient)" />
    {/* Cosmic web-like structure */}
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.path
        key={`cosmic-web-${i}`}
        d={`M${Math.random() * 100},${Math.random() * 100} C${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
        stroke="#A78BFA"
        strokeWidth="0.2"
        strokeOpacity="0.6"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, repeatType: "reverse" }}
      />
    ))}
    {Array.from({ length: 50 }).map((_, i) => (
      <motion.circle
        key={`cosmic-node-${i}`}
        cx={Math.random() * 100}
        cy={Math.random() * 100}
        r={Math.random() * 0.7 + 0.3}
        fill="#C4B5FD"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
      />
    ))}
  </svg>
);

const GalaxySVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="galaxyGradient" cx="50%" cy="50%" r="100%" fx="50%" fy="50%">
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
    <circle cx="50" cy="50" r="25" fill="url(#galaxyGradient)" filter="url(#galaxyGlow)" />
    
    {/* Spiral arms */}
    <motion.path
      d="M50,50 Q60,30 80,20 T50,10 T20,20 T40,30 T50,50"
      fill="none"
      stroke="#93C5FD"
      strokeWidth="0.5"
      strokeOpacity="0.6"
      initial={{ pathLength: 0, rotate: 0 }}
      animate={{ pathLength: 1, rotate: 360 }}
      transition={{ pathLength: { duration: 3 }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
    />
    <motion.path
      d="M50,50 Q60,70 80,80 T50,90 T20,80 T40,70 T50,50"
      fill="none"
      stroke="#93C5FD"
      strokeWidth="0.5"
      strokeOpacity="0.6"
      initial={{ pathLength: 0, rotate: 0 }}
      animate={{ pathLength: 1, rotate: 360 }}
      transition={{ pathLength: { duration: 3 }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
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
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="oortGradient" cx="50%" cy="50%" r="100%" fx="50%" fy="50%">
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
        scale: [0.95, 1.05, 0.95]
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
            cy: [y, y + Math.random() * 2 - 1, y]
          }}
          transition={{ 
            duration: 2 + Math.random() * 5, 
            repeat: Infinity,
            ease: "easeInOut"
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
            transition={{ duration: 8 + i * 4, repeat: Infinity, repeatDelay: 2 }}
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
              y: [0, endY - startY, endY - startY]
            }}
            transition={{ 
              duration: 8 + i * 4, 
              repeat: Infinity, 
              repeatDelay: 2,
              times: [0, 0.8, 1]
            }}
          />
        </motion.g>
      );
    })}
  </svg>
);

const SolarSystemSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
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
        scale: [1, 1.05, 1] 
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    />
    
    {/* Planets and orbits */}
    {[
      { radius: 10, speed: 8, color: "#A1A1AA", size: 1 },  // Mercury
      { radius: 15, speed: 12, color: "#FB923C", size: 1.3 },  // Venus
      { radius: 20, speed: 15, color: "#60A5FA", size: 1.5 },  // Earth
      { radius: 25, speed: 20, color: "#EF4444", size: 1.2 },  // Mars
      { radius: 32, speed: 25, color: "#F59E0B", size: 3 },    // Jupiter
      { radius: 38, speed: 30, color: "#FBBF24", size: 2.5 },  // Saturn
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
            rotate: 360
          }}
          transition={{ 
            duration: planet.speed,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            originX: "50px", 
            originY: "50px" 
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
            rotate: 360
          }}
          transition={{ 
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            originX: "50px", 
            originY: "50px" 
          }}
        />
      );
    })}
  </svg>
);

const EarthSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="earthGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
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
        rotate: 360
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    
    {/* Continents */}
    <motion.path
      d="M40,35 Q55,30 60,40 T70,50 T65,60 T50,65 T40,55 T35,45 Z"
      fill="#10B981"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center"
      }}
    />
    <motion.path
      d="M30,50 Q35,45 45,43 T50,40 T45,35 T35,40 T30,45 Z"
      fill="#10B981"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center"
      }}
    />
    <motion.path
      d="M55,70 Q65,65 67,60 T65,55 T60,58 T55,65 Z"
      fill="#10B981"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center"
      }}
    />
    
    {/* Clouds */}
    <motion.path
      d="M25,35 Q40,25 55,35 T70,45 T65,55 T50,50 T35,55 T25,45 Z"
      fill="rgba(255,255,255,0.3)"
      animate={{
        rotate: 360,
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        rotate: {
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        },
        opacity: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      style={{
        transformOrigin: "center"
      }}
    />
    <motion.path
      d="M40,60 Q50,55 60,60 T75,70 T70,80 T55,75 T45,80 T35,70 Z"
      fill="rgba(255,255,255,0.3)"
      animate={{
        rotate: 360,
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        rotate: {
          duration: 50,
          repeat: Infinity,
          ease: "linear"
        },
        opacity: {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      style={{
        transformOrigin: "center"
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
  <svg className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
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
  <svg className="absolute w-full h-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
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
    <motion.line x1="40" y1="15" x2="60" y2="15" stroke="#3B82F6" strokeWidth="2" />
    <motion.line x1="40" y1="35" x2="60" y2="35" stroke="#3B82F6" strokeWidth="2" />
    <motion.line x1="40" y1="55" x2="60" y2="55" stroke="#3B82F6" strokeWidth="2" />
    <motion.line x1="40" y1="75" x2="60" y2="75" stroke="#3B82F6" strokeWidth="2" />
  </svg>
);

const AtomSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
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
        rotate: 360
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center"
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
        rotate: 360
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center",
        rotateX: "60deg"
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
        rotate: 360
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center"
      }}
    />
    
    {/* Electrons */}
    <motion.circle
      cx="85"
      cy="50"
      r="1.5"
      fill="#F9A8D4"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center"
      }}
    />
    
    <motion.circle
      cx="50"
      cy="80"
      r="1.5"
      fill="#F9A8D4"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center",
        rotateX: "60deg"
      }}
    />
    
    <motion.circle
      cx="35"
      cy="15"
      r="1.5"
      fill="#F9A8D4"
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        transformOrigin: "center"
      }}
    />
    
    {/* Nucleus */}
    <motion.circle
      cx="50"
      cy="50"
      r="5"
      fill="url(#atomCore)"
      animate={{
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </svg>
);

const NucleusSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="protonGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="100%" stopColor="#EF4444" />
      </radialGradient>
      <radialGradient id="neutronGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
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
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
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
        fill={particle.type === "proton" ? "url(#protonGradient)" : "url(#neutronGradient)"}
        animate={{
          x: [0, Math.random() * 2 - 1, 0],
          y: [0, Math.random() * 2 - 1, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2 + Math.random(),
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}
    
    {/* Connection lines between particles */}
    <motion.line x1="46" y1="46" x2="54" y2="46" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
    <motion.line x1="46" y1="46" x2="50" y2="42" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
    <motion.line x1="54" y1="46" x2="50" y2="42" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
    <motion.line x1="46" y1="54" x2="54" y2="54" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
    <motion.line x1="46" y1="54" x2="50" y2="58" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
    <motion.line x1="54" y1="54" x2="50" y2="58" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
    <motion.line x1="42" y1="50" x2="46" y2="46" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
    <motion.line x1="42" y1="50" x2="46" y2="54" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
    <motion.line x1="58" y1="50" x2="54" y2="46" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
    <motion.line x1="58" y1="50" x2="54" y2="54" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
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
        direction: Math.random() * Math.PI * 2
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      {particles.map((particle, index) => (
        <motion.circle
          key={index}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill={particle.color}
          animate={{
            cx: [particle.x, particle.x + Math.cos(particle.direction) * 10, particle.x],
            cy: [particle.y, particle.y + Math.sin(particle.direction) * 10, particle.y],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: particle.speed * 5,
            repeat: Infinity,
            ease: "easeInOut"
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
        twinkleSpeed: Math.random() * 3 + 1
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {stars.map((star, index) => (
          <motion.circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="white"
            animate={{ opacity: [star.opacity, star.opacity * 0.5, star.opacity] }}
            transition={{
              duration: star.twinkleSpeed,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const Home = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Define progress ranges for each of the 12 stages
  const stageRanges = {
    // Scene 1: Cosmic Web
    cosmicWebOpacity: useTransform(scrollYProgress, [0, 0.07, 0.09], [1, 0.5, 0]),
    cosmicWebTextOpacity: useTransform(scrollYProgress, [0.01, 0.03, 0.06, 0.08], [0, 1, 1, 0]),
    cosmicWebScale: useTransform(scrollYProgress, [0, 0.09], [1, 5]), // Zoom effect
    
    // Scene 2: Galaxy
    galaxyOpacity: useTransform(scrollYProgress, [0.08, 0.09, 0.16, 0.18], [0, 1, 1, 0]),
    galaxyTextOpacity: useTransform(scrollYProgress, [0.1, 0.12, 0.15, 0.17], [0, 1, 1, 0]),
    galaxyScale: useTransform(scrollYProgress, [0.09, 0.18], [1.5, 3]), // Increased starting size
    
    // Scene 3: Oort Cloud
    oortCloudOpacity: useTransform(scrollYProgress, [0.17, 0.18, 0.25, 0.27], [0, 1, 1, 0]),
    oortCloudTextOpacity: useTransform(scrollYProgress, [0.19, 0.21, 0.24, 0.26], [0, 1, 1, 0]),
    oortCloudScale: useTransform(scrollYProgress, [0.18, 0.27], [1.5, 3]), // Increased starting size
    
    // Scene 4: Solar System
    solarSystemOpacity: useTransform(scrollYProgress, [0.26, 0.27, 0.34, 0.36], [0, 1, 1, 0]),
    solarSystemTextOpacity: useTransform(scrollYProgress, [0.28, 0.3, 0.33, 0.35], [0, 1, 1, 0]),
    solarSystemScale: useTransform(scrollYProgress, [0.27, 0.36], [1.5, 3]), // Increased starting size
    
    // Scene 5: Earth
    earthOpacity: useTransform(scrollYProgress, [0.35, 0.36, 0.43, 0.45], [0, 1, 1, 0]),
    earthTextOpacity: useTransform(scrollYProgress, [0.37, 0.39, 0.42, 0.44], [0, 1, 1, 0]),
    earthScale: useTransform(scrollYProgress, [0.36, 0.45], [1.5, 3]), // Increased starting size
    
    // Scene 6: Telescope
    telescopeOpacity: useTransform(scrollYProgress, [0.44, 0.45, 0.52, 0.54], [0, 1, 1, 0]),
    telescopeTextOpacity: useTransform(scrollYProgress, [0.46, 0.48, 0.51, 0.53], [0, 1, 1, 0]),
    telescopeScale: useTransform(scrollYProgress, [0.45, 0.54], [1.5, 3]), // Increased starting size
    
    // Scene 7: Eye
    eyeOpacity: useTransform(scrollYProgress, [0.53, 0.54, 0.61, 0.63], [0, 1, 1, 0]),
    eyeTextOpacity: useTransform(scrollYProgress, [0.55, 0.57, 0.6, 0.62], [0, 1, 1, 0]),
    eyeScale: useTransform(scrollYProgress, [0.54, 0.63], [1.5, 3]), // Increased starting size
    
    // Scene 8: DNA / Cell
    dnaOpacity: useTransform(scrollYProgress, [0.62, 0.63, 0.7, 0.72], [0, 1, 1, 0]),
    dnaTextOpacity: useTransform(scrollYProgress, [0.64, 0.66, 0.69, 0.71], [0, 1, 1, 0]),
    dnaScale: useTransform(scrollYProgress, [0.63, 0.72], [1.5, 3]), // Increased starting size
    
    // Scene 9: Atom
    atomOpacity: useTransform(scrollYProgress, [0.71, 0.72, 0.79, 0.81], [0, 1, 1, 0]),
    atomTextOpacity: useTransform(scrollYProgress, [0.73, 0.75, 0.78, 0.8], [0, 1, 1, 0]),
    atomScale: useTransform(scrollYProgress, [0.72, 0.81], [1.5, 3]), // Increased starting size
    
    // Scene 10: Nucleus
    nucleusOpacity: useTransform(scrollYProgress, [0.8, 0.81, 0.88, 0.9], [0, 1, 1, 0]),
    nucleusTextOpacity: useTransform(scrollYProgress, [0.82, 0.84, 0.87, 0.89], [0, 1, 1, 0]),
    nucleusScale: useTransform(scrollYProgress, [0.81, 0.9], [1.5, 3]), // Increased starting size
    
    // Scene 11: Quarks / Gluons
    quarksOpacity: useTransform(scrollYProgress, [0.89, 0.9, 0.97, 0.99], [0, 1, 1, 0.8]),
    quarksTextOpacity: useTransform(scrollYProgress, [0.91, 0.93, 0.96, 0.98], [0, 1, 1, 0]),
    quarksScale: useTransform(scrollYProgress, [0.9, 0.99], [1.5, 3]), // Increased starting size
    
    // Scene 12: Final Scene
    finalOpacity: useTransform(scrollYProgress, [0.98, 0.99], [0, 1]),
    finalTextOpacity: useTransform(scrollYProgress, [0.99, 1], [0, 1]),
    finalScale: useTransform(scrollYProgress, [0.99, 1], [1.2, 1]), // Increased starting size for final scene
  };
  
  // Mouse interaction for final scene with reduced sensitivity
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Reduce mouse movement sensitivity by 75% (multiplying by 0.25)
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 0.25,
      y: (e.clientY / window.innerHeight - 0.5) * 0.25
    });
  };
  
  // For debugging - remove in production
  const [scrollDebug, setScrollDebug] = useState<number>(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollDebug(parseFloat(latest.toFixed(2)));
  });

  // Vertical scroll progress indicator
  const progressBar = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div 
      ref={containerRef} 
      className="relative bg-black text-white overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Multiple viewport-height sections for scrolling - 12 sections */}
      <div className="h-[1200vh]">
        {/* Fixed position container for all scenes */}
        <div className="fixed inset-0 w-full h-full overflow-hidden">
          {/* Scene 1: Cosmic Web */}
          <motion.div 
            style={{ 
              opacity: stageRanges.cosmicWebOpacity,
              scale: stageRanges.cosmicWebScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-black opacity-95"></div>
            <CosmicWebSVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.cosmicWebTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-purple-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">It begins beyond what we can see...</h2>
              <p className="text-gray-300">The cosmic tapestry of light, spanning across time and space.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 2: Galaxy */}
          <motion.div 
            style={{ 
              opacity: stageRanges.galaxyOpacity,
              scale: stageRanges.galaxyScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-black opacity-95"></div>
            <GalaxySVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.galaxyTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-blue-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">The story of light stretches across galaxies.</h2>
              <p className="text-gray-300">From countless stars, shining across unimaginable distances.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 3: Oort Cloud */}
          <motion.div 
            style={{ 
              opacity: stageRanges.oortCloudOpacity,
              scale: stageRanges.oortCloudScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 opacity-90"></div>
            <OortCloudSVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.oortCloudTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-slate-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">Zoom in, past frozen dust and ancient comets.</h2>
              <p className="text-gray-300">The outer edges of our solar system, where remnants of creation drift.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 4: Solar System */}
          <motion.div 
            style={{ 
              opacity: stageRanges.solarSystemOpacity,
              scale: stageRanges.solarSystemScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 to-black opacity-90"></div>
            <SolarSystemSVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.solarSystemTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-indigo-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">Into the solar system, a dance of motion and fire.</h2>
              <p className="text-gray-300">Where planets follow eternal orbits around our central star.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 5: Earth */}
          <motion.div 
            style={{ 
              opacity: stageRanges.earthOpacity,
              scale: stageRanges.earthScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-indigo-950 opacity-90"></div>
            <EarthSVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.earthTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-blue-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">Toward a pale blue dot...</h2>
              <p className="text-gray-300">Our home among the stars, where all of human history has unfolded.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 6: Telescope */}
          <motion.div 
            style={{ 
              opacity: stageRanges.telescopeOpacity,
              scale: stageRanges.telescopeScale
            }} 
            className="absolute inset-0"
          >
            <StarField />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-indigo-950 opacity-90"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <TelescopeSVG />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.telescopeTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-gray-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">Where we watch the skies from the ground.</h2>
              <p className="text-gray-300">Our tools of observation extend our vision into the cosmos.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 7: Eye */}
          <motion.div 
            style={{ 
              opacity: stageRanges.eyeOpacity,
              scale: stageRanges.eyeScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-indigo-900 opacity-90"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <EyeSVG />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.eyeTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-blue-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">And see, not just through instruments...</h2>
              <p className="text-gray-300">But through the remarkable optical system we were born with.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 8: DNA / Cell */}
          <motion.div 
            style={{ 
              opacity: stageRanges.dnaOpacity,
              scale: stageRanges.dnaScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-cyan-900 opacity-90"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <DNASVG />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.dnaTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-cyan-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">...but through biology.</h2>
              <p className="text-gray-300">The molecular structures that encode our ability to perceive light.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 9: Atom */}
          <motion.div 
            style={{ 
              opacity: stageRanges.atomOpacity,
              scale: stageRanges.atomScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-900 to-purple-950 opacity-90"></div>
            <AtomSVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.atomTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-pink-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">Through the tiniest building blocks.</h2>
              <p className="text-gray-300">Where electrons orbit nuclei, and light is both particle and wave.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 10: Nucleus */}
          <motion.div 
            style={{ 
              opacity: stageRanges.nucleusOpacity,
              scale: stageRanges.nucleusScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-red-950 to-gray-950 opacity-95"></div>
            <NucleusSVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.nucleusTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-red-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">Deeper still, past protons and neutrons...</h2>
              <p className="text-gray-300">Into the strong nuclear forces that bind matter together.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 11: Quarks */}
          <motion.div 
            style={{ 
              opacity: stageRanges.quarksOpacity,
              scale: stageRanges.quarksScale
            }} 
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-95"></div>
            <QuarksSVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: stageRanges.quarksTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-gray-500/10 rounded-xl p-6 max-w-md text-center shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold gradient-text mb-2">...to the fabric of everything.</h2>
              <p className="text-gray-300">Where quantum fields fluctuate and the fundamental forces arise.</p>
            </motion.div>
          </motion.div>
          
          {/* Scene 12: Final Scene */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              opacity: stageRanges.finalOpacity,
              scale: stageRanges.finalScale,
              x: mousePosition.x * 20,
              y: mousePosition.y * 20
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-95"></div>
            <QuarksSVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: stageRanges.finalTextOpacity }}
          >
            <motion.div 
              className="bg-black bg-opacity-20 backdrop-blur-md border border-purple-500/10 rounded-xl p-8 max-w-lg text-center shadow-lg"
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">This is the scale of optics.</h1>
              <p className="text-xl text-gray-300 mb-8">Welcome to greygolus.com</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <Link href="/directory#calculators" className="bg-dark-card hover:bg-dark-hover transition-colors duration-300 rounded-xl border border-dark-border p-4">
                  <span className="gradient-text font-bold">Calculators</span>
                </Link>
                <Link href="/reference" className="bg-dark-card hover:bg-dark-hover transition-colors duration-300 rounded-xl border border-dark-border p-4">
                  <span className="gradient-text font-bold">References</span>
                </Link>
                <Link href="/directory" className="bg-dark-card hover:bg-dark-hover transition-colors duration-300 rounded-xl border border-dark-border p-4">
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
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
      >
        <p className="text-white mb-2">Scroll to explore</p>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      {/* Vertical scroll progress indicator */}
      <motion.div 
        className="fixed right-4 top-1/2 transform -translate-y-1/2 h-1/3 w-1 bg-gray-800 rounded-full"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
      >
        <motion.div 
          className="w-full bg-gradient-to-b from-glow-purple via-glow-blue to-glow-cyan rounded-full"
          style={{ height: progressBar, originY: 0 }}
        />
      </motion.div>
    </div>
  );
};

export default Home;
