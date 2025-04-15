import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
  largeDisplay?: boolean;
}

const CountdownTimer = ({ targetDate, className = '', largeDisplay = false }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
        });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeRemaining({ days, hours, minutes });
      setCurrentTime(now);
    };
    
    // Initial calculation
    calculateTimeRemaining();
    
    // Update every minute
    const intervalId = setInterval(calculateTimeRemaining, 60000);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [targetDate]);

  // Format numbers with leading zeros
  const formatNumber = (num: number, digits: number) => {
    return num.toString().padStart(digits, '0');
  };

  if (largeDisplay) {
    return (
      <div className={`max-w-4xl mx-auto overflow-hidden ${className}`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold gradient-text mb-8">Time Remaining</h2>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="countdown-block">
              <div className="border border-dark-border bg-black bg-opacity-40 rounded-xl p-6 w-40 h-40 flex flex-col items-center justify-center mb-4 shadow-lg backdrop-blur-sm">
                <div className="text-6xl font-mono font-bold gradient-text">
                  {formatNumber(timeRemaining.days, 3)}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-300 mt-2">DAYS</div>
              </div>
            </div>
            
            <div className="countdown-block">
              <div className="border border-dark-border bg-black bg-opacity-40 rounded-xl p-6 w-40 h-40 flex flex-col items-center justify-center mb-4 shadow-lg backdrop-blur-sm">
                <div className="text-6xl font-mono font-bold gradient-text">
                  {formatNumber(timeRemaining.hours, 2)}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-300 mt-2">HOURS</div>
              </div>
            </div>
            
            <div className="countdown-block">
              <div className="border border-dark-border bg-black bg-opacity-40 rounded-xl p-6 w-40 h-40 flex flex-col items-center justify-center mb-4 shadow-lg backdrop-blur-sm">
                <div className="text-6xl font-mono font-bold gradient-text">
                  {formatNumber(timeRemaining.minutes, 2)}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-300 mt-2">MINUTES</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-300">
            <p className="mb-2">Target Date: {targetDate.toLocaleString()}</p>
            <p>Current time: {currentTime.toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>      
      <div className="flex flex-wrap justify-center gap-6 text-center">
        <div className="countdown-item mb-4">
          <div className="text-5xl font-mono font-bold gradient-text mb-2">
            {formatNumber(timeRemaining.days, 3)}
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-300">DAYS</div>
        </div>
        
        <div className="countdown-item mb-4">
          <div className="text-5xl font-mono font-bold gradient-text mb-2">
            {formatNumber(timeRemaining.hours, 2)}
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-300">HOURS</div>
        </div>
        
        <div className="countdown-item mb-4">
          <div className="text-5xl font-mono font-bold gradient-text mb-2">
            {formatNumber(timeRemaining.minutes, 2)}
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-300">MINUTES</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
