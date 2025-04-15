import { Link } from 'wouter';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// SVG Components for animation scenes
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

const NeuronsSVG = () => (
  <svg className="absolute w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <motion.path 
      d="M10,50 Q30,20 50,50 T90,50" 
      stroke="#9333EA" 
      strokeWidth="0.5" 
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2 }}
    />
    <motion.path 
      d="M20,70 Q40,90 60,70 T95,60" 
      stroke="#A855F7" 
      strokeWidth="0.5" 
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.3 }}
    />
    <motion.path 
      d="M30,30 Q50,10 70,30 T90,20" 
      stroke="#6366F1" 
      strokeWidth="0.5" 
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.6 }}
    />
    <motion.circle cx="20" cy="50" r="3" fill="#9333EA" />
    <motion.circle cx="50" cy="30" r="3" fill="#6366F1" />
    <motion.circle cx="80" cy="60" r="3" fill="#A855F7" />
    <motion.circle cx="65" cy="45" r="3" fill="#6366F1" />
    <motion.circle cx="35" cy="70" r="3" fill="#9333EA" />
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

const ParticlesSVG = () => {
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
  
  // Scene 1: Telescope and stars (scale transforms)
  const telescopeScale = useTransform(scrollYProgress, [0, 0.15], [1, 30]);
  const telescopeOpacity = useTransform(scrollYProgress, [0, 0.13, 0.15], [1, 0.5, 0]);
  const starfieldOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 0.5, 0]);
  
  // Scene 2: Eye (opacity transforms)
  const eyeOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const eyeTextOpacity = useTransform(scrollYProgress, [0.22, 0.25, 0.32, 0.35], [0, 1, 1, 0]);
  
  // Scene 3: Neurons (opacity transforms)
  const neuronsOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const neuronsTextOpacity = useTransform(scrollYProgress, [0.42, 0.45, 0.52, 0.55], [0, 1, 1, 0]);
  
  // Scene 4: DNA (opacity transforms)
  const dnaOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const dnaTextOpacity = useTransform(scrollYProgress, [0.62, 0.65, 0.72, 0.75], [0, 1, 1, 0]);
  
  // Scene 5: Final particles (opacity transforms)
  const particlesOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
  const finalTextOpacity = useTransform(scrollYProgress, [0.82, 0.85], [0, 1]);
  
  // Mouse interaction for final scene
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX / window.innerWidth - 0.5,
      y: e.clientY / window.innerHeight - 0.5
    });
  };
  
  // For debugging - remove in production
  const [scrollDebug, setScrollDebug] = useState<number>(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollDebug(parseFloat(latest.toFixed(2)));
  });

  return (
    <div 
      ref={containerRef} 
      className="relative bg-black text-white overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Multiple viewport-height sections for scrolling */}
      <div className="h-[500vh]">
        {/* Fixed position container for all scenes */}
        <div className="fixed inset-0 w-full h-full overflow-hidden">
          {/* Scene 1: Stars and Telescope */}
          <motion.div style={{ opacity: starfieldOpacity }} className="absolute inset-0">
            <StarField />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              scale: telescopeScale,
              opacity: telescopeOpacity
            }}
          >
            <TelescopeSVG />
          </motion.div>
          
          {/* Scene 2: Eye */}
          <motion.div 
            className="absolute inset-0"
            style={{ opacity: eyeOpacity }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-indigo-900 opacity-80"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <EyeSVG />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: eyeTextOpacity }}
          >
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 max-w-md text-center">
              <h2 className="text-3xl font-bold gradient-text mb-2">Optics begins with the eye.</h2>
              <p className="text-gray-300">The gateway to understanding how we perceive the world around us.</p>
            </div>
          </motion.div>
          
          {/* Scene 3: Neurons */}
          <motion.div 
            className="absolute inset-0"
            style={{ opacity: neuronsOpacity }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-indigo-900 opacity-80"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <NeuronsSVG />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: neuronsTextOpacity }}
          >
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 max-w-md text-center">
              <h2 className="text-3xl font-bold gradient-text mb-2">But light travels far deeper...</h2>
              <p className="text-gray-300">Into the neural networks that process visual information.</p>
            </div>
          </motion.div>
          
          {/* Scene 4: DNA */}
          <motion.div 
            className="absolute inset-0"
            style={{ opacity: dnaOpacity }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-cyan-900 opacity-80"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <DNASVG />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: dnaTextOpacity }}
          >
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 max-w-md text-center">
              <h2 className="text-3xl font-bold gradient-text mb-2">Understanding the smallest things helps us build the biggest.</h2>
              <p className="text-gray-300">From molecular interactions to the engineering of optical systems.</p>
            </div>
          </motion.div>
          
          {/* Scene 5: Particles */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              opacity: particlesOpacity,
              x: mousePosition.x * 20,
              y: mousePosition.y * 20
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-90"></div>
            <ParticlesSVG />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: finalTextOpacity }}
          >
            <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-xl p-8 max-w-lg text-center">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">greygolus.com</h1>
              <p className="text-xl text-gray-300 mb-8">A journey through light, knowledge, and engineering.</p>
              
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
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator for first-time visitors */}
      <motion.div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
      >
        <p className="text-white mb-2">Scroll to explore</p>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  );
};

export default Home;
