import React from "react";
import { motion } from "framer-motion";
import { DepthAwareTextBox } from "../../lib/applyTextBoxStyles";

interface SceneNucleusProps {
  opacity: any;
  scale: any;
  textOpacity: any;
  textScale: any;
  textY: any;
}

const SceneNucleus: React.FC<SceneNucleusProps> = ({
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
        <div className="absolute inset-0 bg-gradient-radial from-yellow-700/30 via-amber-900/20 to-black"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          {/* Nucleus with protons and neutrons */}
          <div className="relative w-64 h-64">
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-radial from-amber-500/30 to-transparent"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Strong force field lines */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) % 360;
              const length = 40 + Math.random() * 20;
              return (
                <motion.div
                  key={`force-${i}`}
                  className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-amber-400/80 to-amber-400/0"
                  style={{
                    width: `${length}px`,
                    transformOrigin: "left center",
                    rotate: `${angle}deg`,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  animate={{
                    scaleX: [1, 0.7, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              );
            })}

            {/* Protons and neutrons (nucleons) */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const radius = Math.random() * 15 + 5;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isProton = i % 2 === 0;

              return (
                <motion.div
                  key={`nucleon-${i}`}
                  className={`absolute w-7 h-7 rounded-full ${
                    isProton ? "bg-amber-400" : "bg-amber-700"
                  }`}
                  style={{
                    top: "50%",
                    left: "50%",
                    x: x,
                    y: y,
                    translateX: "-50%",
                    translateY: "-50%",
                    boxShadow: isProton
                      ? "0 0 8px 2px rgba(245, 158, 11, 0.5)"
                      : "",
                  }}
                  animate={{
                    x: [x, x + (Math.random() * 6 - 3), x],
                    y: [y, y + (Math.random() * 6 - 3), y],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Quark representation inside nucleons */}
                  {Array.from({ length: 3 }).map((_, j) => {
                    const quarkAngle = (j * 120) % 360;
                    const quarkRadius = 7;
                    const quarkX = Math.cos((quarkAngle * Math.PI) / 180) * quarkRadius;
                    const quarkY = Math.sin((quarkAngle * Math.PI) / 180) * quarkRadius;
                    return (
                      <motion.div
                        key={`quark-${i}-${j}`}
                        className={`absolute w-2 h-2 rounded-full ${
                          isProton
                            ? j < 2
                              ? "bg-red-400"
                              : "bg-blue-400"
                            : j < 2
                            ? "bg-blue-400"
                            : "bg-red-400"
                        }`}
                        style={{
                          top: "50%",
                          left: "50%",
                          x: quarkX,
                          y: quarkY,
                          translateX: "-50%",
                          translateY: "-50%",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 1 + Math.random(),
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: j * 0.2,
                        }}
                      />
                    );
                  })}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Energy bursts from strong force */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => {
            const size = 2 + Math.random() * 5;
            const delay = Math.random() * 3;
            const duration = 1 + Math.random() * 1.5;
            const startX = 45 + Math.random() * 10;
            const startY = 45 + Math.random() * 10;

            return (
              <motion.div
                key={`energy-burst-${i}`}
                className="absolute rounded-full bg-yellow-300"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${startX}%`,
                  top: `${startY}%`,
                  boxShadow: "0 0 8px 2px rgba(253, 224, 71, 0.6)",
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.2, 1.5, 0.2],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatDelay: 3 + Math.random() * 5,
                  delay: delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>

        {/* Background radiation particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => {
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const size = Math.random() * 2 + 0.5;

            return (
              <motion.div
                key={`radiation-${i}`}
                className="absolute bg-amber-200 rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${posX}%`,
                  top: `${posY}%`,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [0, -Math.random() * 100 - 50],
                  x: [(Math.random() - 0.5) * 50],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 5,
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
          borderColor="border-amber-500/20"
        >
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Into the atomic nucleus...
          </h2>
          <p className="text-gray-300">
            Where the strong nuclear force binds protons and neutrons together.
          </p>
        </DepthAwareTextBox>
      </motion.div>
    </>
  );
};

export default SceneNucleus;