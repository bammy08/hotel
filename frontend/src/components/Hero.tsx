const Hero = () => {
  return (
    <div
      className="bg-hero-pattern bg-cover bg-center bg-no-repeat relative"
      style={{ height: '400px' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#003366]/70"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="text-left text-white container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find your next <br />
            stay
          </h1>
          <p className="text-lg md:text-2xl">
            Search low prices on hotels for your dream vacation...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
