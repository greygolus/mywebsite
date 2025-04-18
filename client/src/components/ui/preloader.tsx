import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoadComplete?: () => void;
}

const Preloader = ({ onLoadComplete }: PreloaderProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for assets to load
    const timer = setTimeout(() => {
      setLoading(false);
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Video Background - Replace the src with the actual path to your video */}
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              autoPlay
              muted
              playsInline
              src="/assets/lens-distortion.mp4" 
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Overlay and content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-6">
                  Grey Golus
                </h1>
                <div className="flex flex-col items-center">
                  <div className="relative w-64 h-2 bg-gray-900/40 mb-8 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 animate-gradient-x"></div>
                    
                    {/* Actual progress bar */}
                    <motion.div
                      className="relative h-full rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    >
                      {/* Shine effect */}
                      <motion.div 
                        className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-r from-transparent to-white/30 skew-x-12"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                      />
                    </motion.div>
                  </div>
                  <motion.p 
                    className="text-white/70 text-sm uppercase tracking-wider"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Loading Experience
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;