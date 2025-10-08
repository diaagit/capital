const Hero = () => {
  return (
    <div className="relative h-[40vh]">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/assets/E-singer1.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black to-white/20" />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end justify-end px-6 lg:px-8 gap-10">
        {/* Left content */}
        <div className="text-white pb-10">
          <div className="text-7xl font-bold">Adele</div>
          <div className="text-lg text-zinc-300 mt-2">
            "A Night to Remember: Adele Live with Her Greatest Hits" 🎶✨
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;
