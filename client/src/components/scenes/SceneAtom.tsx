import React from "react";
import { motion } from "framer-motion";
import { DepthAwareTextBox } from "../../lib/applyTextBoxStyles";

interface SceneAtomProps {
  opacity: any;
  scale: any;
  textOpacity: any;
  textScale: any;
  textY: any;
}

const SceneAtom: React.FC<SceneAtomProps> = ({
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
        <div className="absolute inset-0 bg-gradient-radial from-purple-800/20 via-purple-900/10 to-black"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          {/* Electron cloud */}
          <div className="relative w-72 h-72">
            {/* Electron orbitals - multiple orbital shells */}
            {[1, 2, 3].map((shellIndex) => (
              <React.Fragment key={`orbital-shell-${shellIndex}`}>
                {/* Each shell has multiple orbitals in different planes */}
                {[0, 45, 90].map((rotation, i) => (
                  <motion.div
                    key={`orbital-${shellIndex}-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/30"
                    style={{
                      width: `${shellIndex * 60}%`,
                      height: `${shellIndex * 60}%`,
                      rotateX: `${rotation}deg`,
                      rotateY: `${(i * 60) % 180}deg`,
                    }}
                    animate={{
                      rotateZ: 360,
                    }}
                    transition={{
                      duration: 10 + shellIndex * 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {/* Electrons on each orbital */}
                    {Array.from({ length: 2 }).map((_, electronIndex) => {
                      const angle = (electronIndex * 180) % 360;
                      return (
                        <motion.div
                          key={`electron-${shellIndex}-${i}-${electronIndex}`}
                          className="absolute w-2 h-2 rounded-full bg-purple-400"
                          style={{
                            top: "50%",
                            left: `${Math.cos((angle * Math.PI) / 180) * 50 + 50}%`,
                            marginTop: "-4px",
                            marginLeft: "-4px",
                            boxShadow: "0 0 8px 2px rgba(168, 85, 247, 0.5)",
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: electronIndex * 0.5,
                          }}
                        />
                      );
                    })}
                  </motion.div>
                ))}
              </React.Fragment>
            ))}

            {/* Nucleus */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-radial from-purple-600 to-purple-900"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px 5px rgba(168, 85, 247, 0.3)",
                  "0 0 30px 8px rgba(168, 85, 247, 0.5)",
                  "0 0 20px 5px rgba(168, 85, 247, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Quantum probability waves */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => {
            const size = 150 + i * 30;
            return (
              <motion.div
                key={`quantum-wave-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/10"
                style={{
                  width: size,
                  height: size,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            );
          })}
        </div>

        {/* Energy level transitions - photon emissions */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => {
            const startRadius = 30 + Math.random() * 40;
            const endRadius = 80 + Math.random() * 60;
            const angle = Math.random() * Math.PI * 2;
            const startX = Math.cos(angle) * startRadius + 50;
            const startY = Math.sin(angle) * startRadius + 50;
            const endX = Math.cos(angle) * endRadius + 50;
            const endY = Math.sin(angle) * endRadius + 50;

            return (
              <motion.div
                key={`photon-${i}`}
                className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-purple-300"
                style={{
                  x: `calc(${startX}% - 50%)`,
                  y: `calc(${startY}% - 50%)`,
                  opacity: 0,
                }}
                animate={{
                  x: [`calc(${startX}% - 50%)`, `calc(${endX}% - 50%)`],
                  y: [`calc(${startY}% - 50%)`, `calc(${endY}% - 50%)`],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                  repeatDelay: 3 + Math.random() * 5,
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
          borderColor="border-purple-500/20"
        >
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Down to the atomic level...
          </h2>
          <p className="text-gray-300">
            Where electrons dance in quantum probability clouds around nuclei.
          </p>
        </DepthAwareTextBox>
      </motion.div>
    </>
  );
};

export default SceneAtom;