import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoadComplete?: () => void;
}

const Preloader = ({ onLoadComplete }: PreloaderProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleCanPlay = () => {
        setVideoLoaded(true);
        videoElement.play().catch(err => {
          console.error("Video autoplay failed:", err);
          // Continue with loading even if video fails
          setVideoLoaded(true);
        });
      };
      
      videoElement.addEventListener('canplay', handleCanPlay);
      
      // Add error handling
      videoElement.addEventListener('error', () => {
        console.error("Video loading error");
        // Continue with loading even if video fails
        setVideoLoaded(true);
      });
      
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  // Simulate progress and handle completion
  useEffect(() => {
    // Incrementally update progress to simulate loading
    let interval: NodeJS.Timeout;
    
    // Start progress animation
    interval = setInterval(() => {
      setProgress(prevProgress => {
        // Accelerate progress once video is loaded
        const increment = videoLoaded ? 8 : 3;
        const newProgress = Math.min(prevProgress + increment, 100);
        
        // If we've reached 100%, schedule completion
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Give a slight delay after reaching 100%
          setTimeout(() => {
            setLoading(false);
            if (onLoadComplete) {
              onLoadComplete();
            }
          }, 500);
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [videoLoaded, onLoadComplete]);

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
            {/* Video Background */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              autoPlay
              muted
              playsInline
              loop
              src="/videos/lens-distortion.mp4"
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-filter backdrop-blur-sm"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="text-center px-6"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-6">
                    Grey Golus
                  </h1>
                </motion.div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-[280px] h-2 bg-gray-900/40 mb-8 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 animate-gradient-x"></div>
                    
                    {/* Actual progress bar */}
                    <motion.div
                      className="relative h-full rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Shine effect */}
                      <motion.div 
                        className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-r from-transparent to-white/30 skew-x-12"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                      />
                    </motion.div>
                  </div>
                  
                  <div className="h-6">
                    {progress < 100 ? (
                      <motion.p 
                        className="text-white/70 text-sm uppercase tracking-wider"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Loading Experience {Math.round(progress)}%
                      </motion.p>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white/90 text-sm uppercase tracking-wider"
                      >
                        Entering Site...
                      </motion.p>
                    )}
                  </div>
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