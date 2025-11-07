import React from "react";

const Home: React.FC = () => {
  return (
    <div className="space-y-16 pb-10">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#4ECDC4] shadow-lg py-16 px-6 text-white">
        
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-bounce"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-md">
            Celebrate Every Moment 🎉
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-black font-semibold">
            We create stunning decoration themes for weddings, birthdays,
            receptions & house-warming ceremonies — making your day unforgettable.
          </p>

          <a
            href="#events"
            className="inline-block px-8 py-3 text-lg font-semibold bg-white text-[#FF6B6B] rounded-full shadow-md hover:bg-[#FFD93D] hover:text-black transition-all"
          >
            Explore Events ✨
          </a>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          {
            title: "Premium Themes",
            desc: "Unique decorations for every mood.",
          },
          {
            title: "Budget Friendly",
            desc: "Options for every pocket.",
          },
          {
            title: "On-Time Delivery",
            desc: "We value your time & trust.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-md border border-[#FFD93D] hover:shadow-xl hover:scale-105 transition-all text-center"
          >
            <h3 className="text-[#FF6B6B] font-bold text-xl mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ABOUT SHORT */}
      <section className="max-w-4xl mx-auto text-center space-y-4 bg-white border border-[#FFD93D] rounded-xl p-8 shadow-md">
        <h3 className="text-3xl font-extrabold text-[#FF6B6B]">Make Every Moment Special</h3>
        <p className="text-gray-700 text-lg">
          EVENTZHUB is your one-stop solution for complete event decoration.
          From stunning floral themes to vibrant birthday parties, we take care
          of everything with ✨creativity, elegance & care✨.
        </p>
      </section>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/6361772158"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg"
      >
        💬
      </a>
    </div>
  );
};

export default Home;
