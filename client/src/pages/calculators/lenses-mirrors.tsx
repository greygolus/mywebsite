const LensesMirrors = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Lens & Mirror Equation Calculator</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              This calculator is currently under development. It will allow you to calculate focal length, 
              object and image distances for lenses and mirrors.
            </p>
            <div className="mt-6 p-4 bg-blue-50 inline-block rounded-lg">
              <p className="font-mono text-lg">1/f = 1/o + 1/i</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LensesMirrors;
