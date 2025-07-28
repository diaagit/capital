import { FC } from "react";

const About: FC = () => {
  return (
    <div className="max-w-7xl mx-auto bg-[#0D0D0D] text-white">

      <div className="h-[100vh]">
        <div className="text-center">
          <div className="text-3xl">Why Choose Eventique?</div>
          <div className="text-lg text-[#8e8e8e] mt-4">
            Experience excellence with a team that truly cares
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-10">
          <div className="flex w-full justify-between items gap-5">

            <div
              className="bg-[#171717] flex overflow-hidden h-[323px] w-[900px] relative rounded-3xl"
              style={{
                backgroundImage: "url('/assets/A-rectbg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-1/2 px-10 flex flex-col justify-center gap-5">
                <div className="font-semibold text-2xl">
                  Your Ticket is on the Way!
                </div>
                <div className="text-[#8e8e8e]">
                  We’re sending your ticket straight to your email. Just confirm
                  your name and email below, and you’re all set for an
                  unforgettable experience! 🚀
                </div>
              </div>
              <div>
                <img
                  src="/assets/A-phone.png"
                  alt="phone"
                  className="absolute top-[-450px] right-[-400px]"
                />
              </div>
            </div>

            <div
              className="bg-[#171717] overflow-hidden h-[323px] w-[392px] relative rounded-3xl"
              style={{
                backgroundImage: "url('/assets/A-squarebg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                src="/assets/A-ticket.png"
                alt="ticket"
                className="absolute left-[190px] top-[130px] transform scale-200"
              />

              <div className="px-10 flex flex-col justify-center gap-5 h-full mt-14">
                <div className="font-semibold text-2xl text-white">
                  Online Ticket Purchasing
                </div>
                <div className="text-[#8e8e8e]">
                  Allows users to browse events, select seats, and buy tickets
                  instantly via secure payment methods 🎭
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5">

            <div
              className="bg-[#171717] overflow-hidden h-[323px] w-[392px] relative rounded-3xl"
              style={{
                backgroundImage: "url('/assets/A-squarebg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="px-10 flex flex-col gap-5 h-full mt-10">
                <div className="font-semibold text-2xl text-white">
                  Customer Support
                </div>
                <div className="text-[#8e8e8e]">
                  24/7 live chat, email, or phone support for booking issues.🌟
                </div>
              </div>
              <img
                src="/assets/A-customercare.png"
                alt="customer care"
                className="absolute left-[-200px] top-[100px] scale-200"
              />
            </div>

            <div
              className="bg-[#171717] flex overflow-hidden h-[323px] w-[900px] relative rounded-3xl"
              style={{
                backgroundImage: "url('/assets/A-rectbg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-3/4 px-10 flex flex-col justify-center gap-5">
                <div className="font-semibold text-2xl">Event Discovery</div>
                <div className="text-[#8e8e8e]">
                  Personalized suggestions based on user preferences, location,
                  and past bookings. Filters for categories, venues, and price
                  ranges. The goal is to detect meaningful occurrences (events)
                  in analysis or automated responses.💰
                </div>
              </div>
              <div>
                <img
                  src="/assets/A-event.png"
                  alt="event"
                  className="absolute top-[-300px] left-[-200px] scale-120"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[100vh]">
        <div className="flex justify-between items-center">
          <div className="rounded-3xl">
            <img
              src="/assets/A-image1.png"
              alt="experience"
              className="w-[434px] rounded-3xl"
            />
          </div>
          <div className="max-w-xl">
            <div className="text-2xl font-semibold mb-4">
              More Than a Ticket — It's Your Front Row to the Moment
            </div>
            <ol className="list-disc pl-4 space-y-2">
              <li>Every ticket is a gateway to unforgettable memories.</li>
              <li>
                From the first click to the final encore — we’re with you at
                every step.
              </li>
              <li>
                More than just entry — it’s about connection, energy, and shared
                moments.
              </li>
              <li>
                Be it music, sports, or drama — Eventique ensures your experience
                starts before the show begins.
              </li>
            </ol>
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <div className="max-w-xl">
            <div className="text-2xl font-semibold mb-4">
              More Than a Ticket — It's Your Front Row to the Moment
            </div>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Eventique ensures a smooth and exciting journey from discovery to
                showtime.
              </li>
              <li>
                We bring world-class concerts, sports, and live events right to
                your fingertips.
              </li>
              <li>
                Our platform is built for speed, simplicity, and unforgettable
                moments.
              </li>
              <li>With Eventique, every step is part of the experience.</li>
            </ol>
          </div>

          <div className="rounded-3xl">
            <img
              src="/assets/A-image2.png"
              alt="experience 2"
              className="w-[434px] rounded-3xl"
            />
          </div>
        </div>
      </div>

      <div className="h-[100vh]">
        <div className="text-center">
          <div className="text-3xl">What is the story of Eventique?</div>
          <div className="text-lg text-[#8e8e8e] mt-4">
            Every great journey begins with a single step — this is ours
          </div>
        </div>

        <div className="text-center mt-10">TIMELINE WILL GO HERE</div>

        <div className="text-center mt-10">
          <div className="text-3xl">Join to enjoy your moments!</div>
          <div className="text-lg text-[#8e8e8e] mt-4">
            Where every second becomes a memory
          </div>
          <div className="flex gap-5 mt-10">
  
            {[
              {
                img: "/assets/A-call.png",
                title: "+91 1234567890",
                desc: "Got questions? We’re just a call away!",
              },
              {
                img: "/assets/A-email.png",
                title: "support@eventique.com",
                desc: "Got ideas or issues? Email us and we’ll get right back to you.",
              },
              {
                img: "/assets/A-location.png",
                title: "Pune, India",
                desc: "Creating moments from the soulful city of Pune.",
              },
            ].map((contact, idx) => (
              <div
                key={idx}
                className="bg-[#171717] overflow-hidden w-1/3 rounded-3xl pb-10"
                style={{
                  backgroundImage: "url('/assets/A-squarebg.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex justify-center">
                  <img src={contact.img} alt={contact.title} className="w-[200px]" />
                </div>
                <div className="px-10 flex flex-col justify-center gap-5">
                  <div className="font-semibold text-2xl text-white">{contact.title}</div>
                  <div className="text-[#8e8e8e]">{contact.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="h-[320px] rounded-3xl flex justify-center items-center mt-5"
          style={{
            backgroundImage: "url('/assets/A-map.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img src="/assets/A-location.png" alt="map" className="w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default About;
