import CountdownTimer from '@/components/ui/countdown-timer';

const Countdown = () => {
  const targetDate = new Date('April 28, 2025 11:50:00');
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-12 text-center">Countdown to April 28, 2025</h1>
        
        <CountdownTimer targetDate={targetDate} largeDisplay />
      </div>
    </section>
  );
};

export default Countdown;
