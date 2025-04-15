import CountdownTimer from '@/components/ui/countdown-timer';

const Countdown = () => {
  const targetDate = new Date('April 28, 2025 11:50:00');
  
  return (
    <section className="py-24 min-h-[70vh] flex items-center">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-8 gradient-text">Countdown to April 28, 2025</h1>
          
          <div className="bg-dark-card rounded-xl shadow-xl border border-dark-border p-8 mb-8 animate-fade-in-up">
            <CountdownTimer targetDate={targetDate} largeDisplay />
          </div>
          
          <p className="text-gray-300 text-lg mt-8 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '300ms'}}>
            The countdown shows the remaining time until the official event. 
            Stay tuned for updates as we get closer to the date.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
