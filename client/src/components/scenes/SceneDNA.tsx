import React from "react";
import { motion } from "framer-motion";
import OptimizedParticleField from "../../components/ui/enhanced-particle-field";
import { DepthAwareTextBox } from "../../lib/applyTextBoxStyles";

interface SceneDNAProps {
  opacity: any;
  scale: any;
  textOpacity: any;
  textScale: any;
  textY: any;
}

const SceneDNA: React.FC<SceneDNAProps> = ({
  opacity,
  scale,
  textOpacity,
  textScale,
  textY,
}) => {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          opacity,
          scale,
          willChange: "transform, opacity",
        }}
        layout={false}
      >
        {/* Cyan bioluminescent background */}
        <div className="absolute inset-0 bg-gradient-radial from-cyan-600/30 via-cyan-900/20 to-black"></div>

        {/* DNA double helix */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-16 h-96 md:h-[500px]"
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Generate DNA strands */}
            {Array.from({ length: 20 }).map((_, i) => {
              const offset = (i * 360) / 20;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={`dna-${i}`}
                  className="absolute w-full"
                  style={{
                    height: "20px",
                    top: `${(i * 100) / 20}%`,
                    transform: `rotate(${offset}deg)`,
                  }}
                >
                  <motion.div
                    className={`absolute h-2 rounded-full top-1/2 -translate-y-1/2 ${
                      isLeft ? "left-0" : "right-0"
                    }`}
                    style={{
                      width: "40%",
                      background: isLeft
                        ? "linear-gradient(90deg, rgba(6,182,212,0.8) 0%, rgba(6,182,212,0.1) 100%)"
                        : "linear-gradient(90deg, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0.8) 100%)",
                      boxShadow: "0 0 10px rgba(6,182,212,0.5)",
                    }}
                  />
                  <motion.div
                    className="absolute w-2 h-2 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-300"
                    style={{
                      boxShadow: "0 0 8px rgba(6,182,212,0.8)",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Cell-like circles floating around */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => {
            const size = 20 + Math.random() * 60;
            const duration = 20 + Math.random() * 50;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const targetX = Math.random() * 100;
            const targetY = Math.random() * 100;

            return (
              <motion.div
                key={`cell-${i}`}
                className="absolute rounded-full opacity-20"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  border: "1px solid rgba(6,182,212,0.3)",
                  left: `${initialX}%`,
                  top: `${initialY}%`,
                }}
                animate={{
                  x: [0, (targetX - initialX) * 0.3, 0],
                  y: [0, (targetY - initialY) * 0.3, 0],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="absolute w-1/2 h-1/2 rounded-full bg-cyan-500/10 top-1/4 left-1/4"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bio-luminescent particles */}
        <OptimizedParticleField
          color="#67E8F9"
          density={60}
          speed={15}
          opacity={0.5}
          glowIntensity={2.5}
          direction="random"
          minSize={0.5}
          maxSize={2}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <DepthAwareTextBox
          scaleMotionValue={textScale}
          yMotionValue={textY}
          borderColor="border-cyan-500/20"
        >
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Into the networks of life...
          </h2>
          <p className="text-gray-300">
            Where DNA and cells form the blueprint for all living organisms.
          </p>
        </DepthAwareTextBox>
      </motion.div>
    </>
  );
};

export default SceneDNA;