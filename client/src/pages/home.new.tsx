import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";

// Conditionally import each scene component
const SceneCosmicWeb = dynamic(() => import("../components/scenes/SceneCosmicWeb"));
const SceneGalaxy = dynamic(() => import("../components/scenes/SceneGalaxy"));
const SceneOortCloud = dynamic(() => import("../components/scenes/SceneOortCloud"));
const SceneSolarSystem = dynamic(() => import("../components/scenes/SceneSolarSystem"));
const SceneEarth = dynamic(() => import("../components/scenes/SceneEarth"));
const SceneTelescope = dynamic(() => import("../components/scenes/SceneTelescope"));
const SceneEye = dynamic(() => import("../components/scenes/SceneEye"));
const SceneDNA = dynamic(() => import("../components/scenes/SceneDNA"));
const SceneAtom = dynamic(() => import("../components/scenes/SceneAtom"));
const SceneNucleus = dynamic(() => import("../components/scenes/SceneNucleus"));
const SceneQuarks = dynamic(() => import("../components/scenes/SceneQuarks"));
const SceneFinal = dynamic(() => import("../components/scenes/SceneFinal"));

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll-driven animation controls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  // For debugging purposes
  const [scrollDebug, setScrollDebug] = useState(0);
  
  // Mouse tracking for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Update scroll progress for debugging
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setScrollDebug(v);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  // Mouse movement handler for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -0.5 to 0.5
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Define motion values for each scene's opacity and transform based on scroll
  const stageRanges = {
    // Scene 1: Cosmic web
    cosmicOpacity: useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 1, 0]),
    cosmicScale: useTransform(scrollYProgress, [0, 0.12], [1, 1.5]),
    
    // Scene 2: Galaxy
    galaxyOpacity: useTransform(scrollYProgress, [0.08, 0.15, 0.23, 0.3], [0, 1, 1, 0]),
    galaxyScale: useTransform(scrollYProgress, [0.15, 0.3], [0.8, 1.2]),
    
    // Scene 3: Oort cloud / Stellar nebula
    oortCloudOpacity: useTransform(
      scrollYProgress,
      [0.23, 0.3, 0.38, 0.45],
      [0, 1, 1, 0]
    ),
    oortCloudScale: useTransform(scrollYProgress, [0.3, 0.45], [0.8, 1.2]),
    
    // Scene 4: Solar system
    solarSystemOpacity: useTransform(
      scrollYProgress,
      [0.38, 0.45, 0.53, 0.6],
      [0, 1, 1, 0]
    ),
    solarSystemScale: useTransform(scrollYProgress, [0.45, 0.6], [0.8, 1.2]),
    
    // Scene 5: Earth
    earthOpacity: useTransform(
      scrollYProgress,
      [0.53, 0.6, 0.68, 0.75],
      [0, 1, 1, 0]
    ),
    earthScale: useTransform(scrollYProgress, [0.6, 0.75], [0.8, 1.2]),
    
    // Scene 6: Telescope transition
    telescopeOpacity: useTransform(
      scrollYProgress,
      [0.68, 0.75, 0.83, 0.9],
      [0, 1, 1, 0]
    ),
    telescopeScale: useTransform(scrollYProgress, [0.75, 0.9], [0.9, 1.1]),
    telescopeTextOpacity: useTransform(
      scrollYProgress,
      [0.75, 0.78, 0.85, 0.88],
      [0, 1, 1, 0]
    ),
    telescopeTextScale: useTransform(scrollYProgress, [0.75, 0.9], [0.9, 1.1]),
    telescopeTextY: useTransform(scrollYProgress, [0.75, 0.9], [50, 0]),
    
    // Scene 7: Eye / lens
    eyeOpacity: useTransform(
      scrollYProgress,
      [0.75, 0.83, 0.9, 0.98],
      [0, 1, 1, 0]
    ),
    eyeScale: useTransform(scrollYProgress, [0.83, 0.98], [0.8, 1.2]),
    eyeTextOpacity: useTransform(
      scrollYProgress,
      [0.85, 0.88, 0.94, 0.97],
      [0, 1, 1, 0]
    ),
    eyeTextScale: useTransform(scrollYProgress, [0.85, 0.97], [0.9, 1.1]),
    eyeTextY: useTransform(scrollYProgress, [0.85, 0.97], [50, 0]),
    eyeZoom: useTransform(scrollYProgress, [0.9, 0.98], [1, 5]),
    
    // Scene 8: DNA / Cells
    dnaOpacity: useTransform(
      scrollYProgress,
      [0.9, 0.95, 0.98, 1.05],
      [0, 1, 1, 0]
    ),
    dnaScale: useTransform(scrollYProgress, [0.95, 1.05], [0.8, 1.2]),
    dnaTextOpacity: useTransform(
      scrollYProgress,
      [0.95, 0.98, 1.02, 1.05],
      [0, 1, 1, 0]
    ),
    dnaTextScale: useTransform(scrollYProgress, [0.98, 1.05], [0.9, 1.1]),
    dnaTextY: useTransform(scrollYProgress, [0.98, 1.05], [50, 0]),
    
    // Scene 9: Atom
    atomOpacity: useTransform(
      scrollYProgress,
      [1.02, 1.05, 1.13, 1.2],
      [0, 1, 1, 0]
    ),
    atomScale: useTransform(scrollYProgress, [1.05, 1.2], [0.8, 1.2]),
    atomTextOpacity: useTransform(
      scrollYProgress,
      [1.05, 1.08, 1.15, 1.18],
      [0, 1, 1, 0]
    ),
    atomTextScale: useTransform(scrollYProgress, [1.05, 1.18], [0.9, 1.1]),
    atomTextY: useTransform(scrollYProgress, [1.05, 1.18], [50, 0]),
    
    // Scene 10: Nucleus
    nucleusOpacity: useTransform(
      scrollYProgress,
      [1.15, 1.2, 1.28, 1.35],
      [0, 1, 1, 0]
    ),
    nucleusScale: useTransform(scrollYProgress, [1.2, 1.35], [0.8, 1.2]),
    nucleusTextOpacity: useTransform(
      scrollYProgress,
      [1.2, 1.23, 1.3, 1.33],
      [0, 1, 1, 0]
    ),
    nucleusTextScale: useTransform(scrollYProgress, [1.2, 1.33], [0.9, 1.1]),
    nucleusTextY: useTransform(scrollYProgress, [1.2, 1.33], [50, 0]),
    
    // Scene 11: Quarks
    quarksOpacity: useTransform(
      scrollYProgress,
      [1.3, 1.35, 1.43, 1.5],
      [0, 1, 1, 0]
    ),
    quarksScale: useTransform(scrollYProgress, [1.35, 1.5], [0.8, 1.2]),
    quarksTextOpacity: useTransform(
      scrollYProgress,
      [1.35, 1.38, 1.45, 1.48],
      [0, 1, 1, 0]
    ),
    quarksTextScale: useTransform(scrollYProgress, [1.35, 1.48], [0.9, 1.1]),
    quarksTextY: useTransform(scrollYProgress, [1.35, 1.48], [50, 0]),
    
    // Scene 12: Final
    finalOpacity: useTransform(scrollYProgress, [1.45, 1.5], [0, 1]),
    finalScale: useTransform(scrollYProgress, [1.45, 1.6], [0.9, 1.1]),
    finalTextOpacity: useTransform(scrollYProgress, [1.5, 1.55], [0, 1]),
  };

  // Height of the scrollable container - adjust as needed to ensure smooth progression
  const containerHeight = "1000vh";

  return (
    <div className="bg-black text-white relative">
      {/* Scroll container - must be tall enough to allow full progression */}
      <div
        ref={containerRef}
        className="relative h-screen overflow-hidden"
        style={{ height: containerHeight }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="relative w-full h-full">
            {/* Scene 1: Cosmic Web (0.0 - 0.15) */}
            {scrollDebug >= 0 && scrollDebug < 0.16 && (
              <SceneCosmicWeb 
                opacity={stageRanges.cosmicOpacity} 
                scale={stageRanges.cosmicScale} 
              />
            )}

            {/* Scene 2: Galaxy (0.08 - 0.3) */}
            {scrollDebug >= 0.07 && scrollDebug < 0.31 && (
              <SceneGalaxy 
                opacity={stageRanges.galaxyOpacity} 
                scale={stageRanges.galaxyScale} 
              />
            )}

            {/* Scene 3: Oort Cloud (0.23 - 0.45) */}
            {scrollDebug >= 0.22 && scrollDebug < 0.46 && (
              <SceneOortCloud 
                opacity={stageRanges.oortCloudOpacity} 
                scale={stageRanges.oortCloudScale} 
              />
            )}

            {/* Scene 4: Solar System (0.38 - 0.6) */}
            {scrollDebug >= 0.37 && scrollDebug < 0.61 && (
              <SceneSolarSystem 
                opacity={stageRanges.solarSystemOpacity} 
                scale={stageRanges.solarSystemScale} 
              />
            )}

            {/* Scene 5: Earth (0.53 - 0.75) */}
            {scrollDebug >= 0.52 && scrollDebug < 0.76 && (
              <SceneEarth 
                opacity={stageRanges.earthOpacity} 
                scale={stageRanges.earthScale} 
              />
            )}

            {/* Scene 6: Telescope (0.68 - 0.9) */}
            {scrollDebug >= 0.67 && scrollDebug < 0.91 && (
              <SceneTelescope 
                opacity={stageRanges.telescopeOpacity} 
                scale={stageRanges.telescopeScale} 
                textOpacity={stageRanges.telescopeTextOpacity}
                textScale={stageRanges.telescopeTextScale}
                textY={stageRanges.telescopeTextY}
              />
            )}

            {/* Scene 7: Eye (0.75 - 0.98) */}
            {scrollDebug >= 0.74 && scrollDebug < 0.99 && (
              <SceneEye 
                opacity={stageRanges.eyeOpacity} 
                scale={stageRanges.eyeScale} 
                textOpacity={stageRanges.eyeTextOpacity}
                textScale={stageRanges.eyeTextScale}
                textY={stageRanges.eyeTextY}
                eyeScale={stageRanges.eyeZoom}
              />
            )}

            {/* Scene 8: DNA (0.9 - 1.05) */}
            {scrollDebug >= 0.89 && scrollDebug < 1.06 && (
              <SceneDNA 
                opacity={stageRanges.dnaOpacity} 
                scale={stageRanges.dnaScale} 
                textOpacity={stageRanges.dnaTextOpacity}
                textScale={stageRanges.dnaTextScale}
                textY={stageRanges.dnaTextY}
              />
            )}

            {/* Scene 9: Atom (1.02 - 1.2) */}
            {scrollDebug >= 1.01 && scrollDebug < 1.21 && (
              <SceneAtom 
                opacity={stageRanges.atomOpacity} 
                scale={stageRanges.atomScale} 
                textOpacity={stageRanges.atomTextOpacity}
                textScale={stageRanges.atomTextScale}
                textY={stageRanges.atomTextY}
              />
            )}

            {/* Scene 10: Nucleus (1.15 - 1.35) */}
            {scrollDebug >= 1.14 && scrollDebug < 1.36 && (
              <SceneNucleus 
                opacity={stageRanges.nucleusOpacity} 
                scale={stageRanges.nucleusScale} 
                textOpacity={stageRanges.nucleusTextOpacity}
                textScale={stageRanges.nucleusTextScale}
                textY={stageRanges.nucleusTextY}
              />
            )}

            {/* Scene 11: Quarks (1.3 - 1.5) */}
            {scrollDebug >= 1.29 && scrollDebug < 1.51 && (
              <SceneQuarks 
                opacity={stageRanges.quarksOpacity} 
                scale={stageRanges.quarksScale} 
                textOpacity={stageRanges.quarksTextOpacity}
                textScale={stageRanges.quarksTextScale}
                textY={stageRanges.quarksTextY}
              />
            )}

            {/* Scene 12: Final (1.45+) */}
            {scrollDebug >= 1.44 && (
              <SceneFinal 
                opacity={stageRanges.finalOpacity} 
                scale={stageRanges.finalScale} 
                textOpacity={stageRanges.finalTextOpacity}
                finalScale={stageRanges.finalScale}
                mousePosition={mousePosition}
              />
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator for first-time visitors */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{
          duration: 4, // Slower animation
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
      >
        <p className="text-white mb-2 text-sm font-medium tracking-wide">
          Scroll to explore
        </p>
        <motion.div
          animate={{
            y: [0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-glow"
          >
            <path
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Progress bar removed */}
    </div>
  );
};

export default Home;