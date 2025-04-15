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
      <div className={`max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 px-6 text-white text-center">
          <h2 className="text-2xl font-semibold">Time Remaining</h2>
        </div>
        
        <div className="p-8 flex flex-col items-center">
          <div className="flex flex-wrap justify-center space-x-8 text-center">
            <div className="countdown-block">
              <div className="bg-gray-100 rounded-lg p-6 w-36 h-36 flex flex-col items-center justify-center mb-2">
                <div className="text-6xl font-mono font-bold text-blue-500">
                  {formatNumber(timeRemaining.days, 3)}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Days</div>
              </div>
            </div>
            
            <div className="countdown-block">
              <div className="bg-gray-100 rounded-lg p-6 w-36 h-36 flex flex-col items-center justify-center mb-2">
                <div className="text-6xl font-mono font-bold text-blue-500">
                  {formatNumber(timeRemaining.hours, 2)}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Hours</div>
              </div>
            </div>
            
            <div className="countdown-block">
              <div className="bg-gray-100 rounded-lg p-6 w-36 h-36 flex flex-col items-center justify-center mb-2">
                <div className="text-6xl font-mono font-bold text-blue-500">
                  {formatNumber(timeRemaining.minutes, 2)}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Minutes</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-600">
            <p className="mb-2">Target Date: {targetDate.toLocaleString()}</p>
            <p>Current time: {currentTime.toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 rounded-lg shadow-md p-6 md:p-8 ${className}`}>
      <h2 className="text-2xl font-semibold text-center mb-8">Countdown to April 28, 2025</h2>
      
      <div className="flex flex-wrap justify-center space-x-4 text-center">
        <div className="countdown-item mb-4">
          <div className="text-4xl font-mono font-bold text-blue-500 mb-1">
            {formatNumber(timeRemaining.days, 3)}
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-600">Days</div>
        </div>
        
        <div className="countdown-item mb-4">
          <div className="text-4xl font-mono font-bold text-blue-500 mb-1">
            {formatNumber(timeRemaining.hours, 2)}
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-600">Hours</div>
        </div>
        
        <div className="countdown-item mb-4">
          <div className="text-4xl font-mono font-bold text-blue-500 mb-1">
            {formatNumber(timeRemaining.minutes, 2)}
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-600">Minutes</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
