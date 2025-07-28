const ArtistSidebar = () => {
  return (
    <div className="w-1/4 mt-64">
      <div className="bg-[#191919] rounded-xl overflow-hidden shadow-lg relative h-[280px]">
        <img
          src="/assets/A-map.png"
          alt="Map"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-start px-2 pt-6 z-10">
          <img
            src="/assets/A-location.png"
            alt="Location Icon"
            className="w-[160px]"
          />
          <p className="text-white text-sm text-center mt-2">
            Complex, Las Vegas, Nevada, USA
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistSidebar;
