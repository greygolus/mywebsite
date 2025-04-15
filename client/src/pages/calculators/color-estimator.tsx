const ColorEstimator = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Combined Color Estimator</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              This calculator is currently under development. It will allow you to estimate 
              resulting colors from combined wavelengths of light.
            </p>
            <div className="mt-6">
              <div className="flex justify-center space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorEstimator;
