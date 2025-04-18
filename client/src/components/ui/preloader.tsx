import { useState, useEffect, useRef } from "react";

interface PreloaderProps {
  onLoadComplete?: () => void;
}

const Preloader = ({ onLoadComplete }: PreloaderProps) => {
  const [showing, setShowing] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simple video handling
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Handle video ended event
      const handleVideoEnd = () => {
        setShowing(false);
        if (onLoadComplete) onLoadComplete();
      };
      
      // Handle error fallback
      const handleError = () => {
        console.error("Video loading error - skipping intro");
        handleVideoEnd();
      };
      
      // Auto-play when possible
      const handleCanPlay = () => {
        videoElement.play().catch(err => {
          console.error("Video autoplay failed:", err);
          handleVideoEnd();
        });
      };
      
      // Fallback timeout - maximum length even if video doesn't end
      const fallbackTimer = setTimeout(() => {
        handleVideoEnd();
      }, 15000); // 15 seconds max
      
      // Set up event listeners
      videoElement.addEventListener('ended', handleVideoEnd);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('canplay', handleCanPlay);
      
      return () => {
        clearTimeout(fallbackTimer);
        videoElement.removeEventListener('ended', handleVideoEnd);
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('canplay', handleCanPlay);
      };
    } else {
      // If video element isn't available, still complete after timeout
      const timer = setTimeout(() => {
        setShowing(false);
        if (onLoadComplete) onLoadComplete();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [onLoadComplete]);

  if (!showing) return null;
  
  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <div className="w-full h-full flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          className="max-w-full max-h-full object-contain"
          autoPlay
          muted
          playsInline
        >
          {/* Try multiple sources in case one path works better in production */}
          <source src="/Lens%20Distortion%20(Remix)%20(2).mp4" type="video/mp4" />
          <source src="/videos/Lens%20Distortion%20(Remix)%20(2).mp4" type="video/mp4" />
          <source src="Lens%20Distortion%20(Remix)%20(2).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Preloader;