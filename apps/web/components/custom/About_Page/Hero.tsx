import { FC } from "react";

const Hero: FC = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: "url('/assets/A-top.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
        }}
        className="text-white"
      >
        <div className="max-w-7xl mx-auto h-full flex flex-col items-center justify-center gap-10">
          <div>
            <img
              src="/assets/A-about.png"
              alt="About Eventique"
              className="w-94"
            />
          </div>

          <div className="text-xl text-center w-4/5 leading-relaxed">
            Welcome to <span className="font-semibold">Eventique</span> – your
            ultimate destination for discovering, booking, and enjoying
            unforgettable live experiences. From electrifying concerts and
            thrilling sports to captivating theater and vibrant festivals, we
            bring the world’s best events right to your fingertips. Behind the
            scenes, our passionate team is here to make every step smooth,
            simple, and exciting. Have a question or need support? We’re always
            just a message away!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
