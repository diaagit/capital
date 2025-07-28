const Hero = () => {
  return (
    <div className="relative h-[60vh]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/assets/E-singer1.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />
      <div className="absolute inset-0 bg-black opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end justify-between">
        <div className="text-white pb-10">
          <div className="text-7xl font-bold">Adele</div>
          <div className="text-lg text-zinc-300 mt-2">
            "A Night to Remember: Adele Live with Her Greatest Hits" 🎶✨
          </div>
        </div>

        <div className="relative -mb-60">
          <img
            src="/assets/E-singer2.png"
            alt="Adele"
            className="h-[370px] w-[310px] rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
