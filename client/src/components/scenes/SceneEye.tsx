import React from "react";
import { motion } from "framer-motion";
import { DepthAwareTextBox } from "../../lib/applyTextBoxStyles";

interface SceneEyeProps {
  opacity: any;
  scale: any;
  textOpacity: any;
  textScale: any;
  textY: any;
  eyeScale: any;
}

const SceneEye: React.FC<SceneEyeProps> = ({
  opacity,
  scale,
  textOpacity,
  textScale,
  textY,
  eyeScale,
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
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            style={{
              scale: eyeScale, 
              willChange: "transform"
            }}
          >
            {/* Eye shape */}
            <div className="relative w-64 h-32 bg-white rounded-full overflow-hidden flex items-center justify-center">
              {/* Iris */}
              <motion.div
                className="absolute w-32 h-32 rounded-full bg-gradient-radial from-blue-400 via-blue-500 to-blue-600"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Pupil */}
                <motion.div
                  className="absolute w-16 h-16 rounded-full bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 0.85, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Reflection */}
                  <div className="absolute w-4 h-4 rounded-full bg-white opacity-80 top-1/4 left-1/4" />
                </motion.div>
              </motion.div>
            </div>

            {/* Eyelid animation */}
            <motion.div
              className="absolute inset-0 w-64 h-32 bg-gray-200 rounded-full"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{
                scaleY: [0, 0.02, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Optical refraction effect */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => {
            const posX = 35 + Math.sin(i / 2) * 15;
            return (
              <motion.div
                key={`eye-ray-${i}`}
                className="absolute h-full bg-gradient-to-b from-transparent via-blue-300/5 to-transparent"
                style={{
                  width: "2px",
                  left: `${posX}%`,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.4, 0],
                  rotate: [
                    -20 + Math.random() * 5,
                    -15 + Math.random() * 5,
                    -20 + Math.random() * 5,
                  ],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        {/* Light particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 3 + 1;
            const posX = 20 + Math.random() * 60;
            const posY = 20 + Math.random() * 60;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={`eye-particle-${i}`}
                className="absolute rounded-full bg-blue-100"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${posX}%`,
                  top: `${posY}%`,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  y: [0, -10 - Math.random() * 50],
                  x: [0, (Math.random() - 0.5) * 20],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <DepthAwareTextBox
          scaleMotionValue={textScale}
          yMotionValue={textY}
          borderColor="border-blue-500/20"
        >
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Through the lens of optics...
          </h2>
          <p className="text-gray-300">
            We perceive the world through light, refracted and processed by our visual system.
          </p>
        </DepthAwareTextBox>
      </motion.div>
    </>
  );
};

export default SceneEye;