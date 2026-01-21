const Banner = () => {
  return (
      <div className="relative w-full my-20">
        <img
          src="/assets/show-banner.png"
          alt="Banner"
          className="w-full h-auto object-cover"
        />
        <div className=" max-w-7xl mx-auto">
            <div className="absolute top-1/4">
          <h1 className="text-4xl font-bold text-white">Start exploring events today!</h1>
          <p className="text-xl text-[#999999] mt-4">
            Find concerts, shows, and more near you.
          </p>
          <a href="/events">
            <button className="bg-[#C251E6] text-white py-3 px-14 mt-4 rounded-lg hover:bg-[#C251E6] hover:cursor-pointer transition duration-300">
              Start
            </button>
          </a>
        </div>
        </div>
      </div>
  )
}

export default Banner

