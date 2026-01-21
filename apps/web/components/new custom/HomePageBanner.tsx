import Image from "next/image";

export default function CapitalBanner() {
  //bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900
  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-800 to-indigo-900">
        <div className="relative z-10 flex items-center justify-between px-6 py-5">
          <div>
            <div className="w-xs h-10 flex justify-start items-center gap-2">
                <Image
                    src="/assets/forget-password/Capital-White.svg"
                    alt="Capital"
                    width={25}
                    height={25}
                />
                <p className="text-lg uppercase tracking-widest text-zinc-100">
                Capital
                </p>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Premium Movies & Exclusive Premieres
            </h3>
            <p className="text-sm text-zinc-300 mt-1">
              Watch the best handpicked titles
            </p>
          </div>
          <button className="shrink-0 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}