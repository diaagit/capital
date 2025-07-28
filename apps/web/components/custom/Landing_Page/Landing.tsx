const Landing = () => {
  return (
    <div className="max-w-7xl mx-auto bg-[#0D0D0D] text-white px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Rectangles */}
        <div className="flex flex-col gap-6 w-full lg:w-[704px]">
          {/* Refundable Tickets */}
          <div
            className="bg-[#171717] flex items-center justify-center h-[236px] w-full rounded-3xl px-6 relative overflow-hidden"
            style={{
              backgroundImage: "url('/assets/L-rectbg1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src="/assets/L-dollar.png"
              alt="Refundable"
              className="absolute left-0 w-[280px] max-w-[50%] object-contain scale-125"
            />
            <div className="ml-auto pr-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Refundable Tickets</h2>
              <p className="text-lg text-[#999999] leading-snug max-w-[280px]">
                Get your money back if you cancel your ticket within 24 hours
                of purchase.
              </p>
            </div>
          </div>

          {/* Smart Deals */}
          <div
            className="bg-[#171717] flex items-center justify-center h-[236px] w-full rounded-3xl px-6 relative overflow-hidden"
            style={{
              backgroundImage: "url('/assets/L-rectbg2.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src="/assets/L-deal.png"
              alt="Smart Deals"
              className="absolute left-0 w-[280px] max-w-[50%] object-contain scale-125"
            />
            <div className="ml-auto pr-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Smart Deals</h2>
              <p className="text-lg text-[#999999] leading-snug max-w-[280px]">
                Find the best offers for your next booking, hand-picked just
                for you.
              </p>
            </div>
          </div>
        </div>

        {/* Right Square (Book Anytime) */}
        <div
          className="bg-[#171717] h-[496px] w-full lg:w-[496px] rounded-3xl px-6 py-6 flex flex-col justify-between items-center text-center relative overflow-hidden"
          style={{
            backgroundImage: "url('/assets/L-squarebg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="z-10">
            <h2 className="text-2xl font-bold mb-2">Book Anytime!</h2>
            <p className="text-lg text-[#999999] leading-snug max-w-[280px] mx-auto">
              You can pay a ticket in 2 portions throughout a fixed period of
              time. Start invoicing for free.
            </p>
          </div>
          <img
            src="/assets/L-clock.png"
            alt="Book Anytime"
            className="absolute bottom-[-60px] scale-110 w-[400px] object-contain opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
