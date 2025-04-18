import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoadComplete?: () => void;
}

const Preloader = ({ onLoadComplete }: PreloaderProps) => {
  const [showing, setShowing] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video events
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Show title after a delay
      setTimeout(() => {
        setTitleVisible(true);
      }, 1000);
      
      const handleCanPlay = () => {
        videoElement.play().catch(err => {
          console.error("Video autoplay failed:", err);
          // Skip to end if video fails to play
          handleVideoEnd();
        });
      };
      
      const handleVideoEnd = () => {
        setVideoEnded(true);
        
        // Fade out after video completes
        setTimeout(() => {
          setShowing(false);
          
          // Notify parent when animation is complete
          setTimeout(() => {
            if (onLoadComplete) {
              onLoadComplete();
            }
          }, 800); // Match the exit animation duration
        }, 500); // Short delay after video ends before fading out
      };
      
      const handleError = () => {
        console.error("Video loading error");
        // Skip to end if video fails to load
        handleVideoEnd();
      };
      
      // Listen for video events
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('ended', handleVideoEnd);
      videoElement.addEventListener('error', handleError);
      
      return () => {
        if (videoElement) {
          videoElement.removeEventListener('canplay', handleCanPlay);
          videoElement.removeEventListener('ended', handleVideoEnd);
          videoElement.removeEventListener('error', handleError);
        }
      };
    }
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {showing && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full overflow-hidden bg-[#080808]">
            {/* Full-screen Video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                ref={videoRef}
                className="max-w-full max-h-full object-contain"
                autoPlay
                muted
                playsInline
                src="/videos/Lens%20Distortion%20(Remix)%20(2).mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
            
            {/* Title overlay */}
            <AnimatePresence>
              {titleVisible && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="text-center px-6"
                  >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold gradient-text">
                      Grey Golus
                    </h1>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Skip button */}
            <motion.button
              className="absolute bottom-8 right-8 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white/80 text-sm hover:bg-white/20 transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              onClick={() => {
                setVideoEnded(true);
                setShowing(false);
                if (onLoadComplete) {
                  onLoadComplete();
                }
              }}
            >
              Skip Intro
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;