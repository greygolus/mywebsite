import React from "react";
import { motion } from "framer-motion";
import { DepthAwareTextBox } from "../../lib/applyTextBoxStyles";

interface SceneTelescopeProps {
  opacity: any;
  scale: any;
  textOpacity: any;
  textScale: any;
  textY: any;
}

const SceneTelescope: React.FC<SceneTelescopeProps> = ({
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
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
            <motion.path
              d="M15 70 L30 70"
              stroke="white"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            />
          </svg>
        </div>
        
        {/* Stars background */}
        <div className="absolute inset-0 -z-10">
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 1.5 + 0.5;
            const opacity = Math.random() * 0.7 + 0.3;
            return (
              <motion.div
                key={`telescope-star-${i}`}
                className="absolute rounded-full bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity }}
                transition={{ duration: 2, delay: Math.random() * 3 }}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow:
                    Math.random() > 0.9
                      ? `0 0 ${Math.random() * 3 + 1}px rgba(255, 255, 255, 0.8)`
                      : "none",
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
            From the vast cosmos...
          </h2>
          <p className="text-gray-300">
            Our journey spans from massive galactic structures to the quantum
            realm.
          </p>
        </DepthAwareTextBox>
      </motion.div>
    </>
  );
};

export default SceneTelescope;