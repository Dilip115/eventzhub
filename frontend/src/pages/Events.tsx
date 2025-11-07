import React from "react";
import BookingForm from "./BookingForm";

const events = [
  {
    title: "Marriage",
    img: "https://images.unsplash.com/photo-1529635482261-f48e1e80bd56?auto=format&fit=crop&w=800&q=80",
    desc: "Grand marriage decorations with flowers, lights & theme-based designs.",
  },
  {
    title: "Birthday",
    img: "https://images.unsplash.com/photo-1578926287942-334d847fb8b4?auto=format&fit=crop&w=800&q=80",
    desc: "Colorful birthday themes for all ages with balloons & custom staging.",
  },
  {
    title: "House Warming",
    img: "https://images.unsplash.com/photo-1605973037801-cb0b79b01609?auto=format&fit=crop&w=800&q=80",
    desc: "Traditional decoration for house warming ceremonies & pooja setup.",
  },
  {
    title: "Reception",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    desc: "Elegant stage decor, lighting & flower arrangements for receptions.",
  },
  {
    title: "Corporate Events",
    img: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=800&q=80",
    desc: "Corporate program setup with banners, stage, lighting & audio systems.",
  },
  {
    title: "Other Events",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    desc: "All types of custom events covered – Talk to us for tailor-made themes.",
  },
];

const Events: React.FC = () => {
  return (
    <div className="space-y-10">

      <h2 className="text-4xl font-extrabold text-center text-[#FF6B6B]">
        🎊 Events We Organize 🎊
      </h2>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div
            key={ev.title}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <img src={ev.img} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h3 className="text-xl font-bold text-[#FF6B6B]">{ev.title}</h3>
              <p className="text-gray-600 text-sm py-2">{ev.desc}</p>

              <a
                href="#book"
                className="inline-block bg-[#FFD93D] hover:bg-[#FF6B6B] hover:text-white text-[#1A1A1A] font-semibold px-4 py-2 rounded-lg mt-3 transition-all"
              >
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING FORM SECTION */}
      <div id="book" className="mt-10">
        <BookingForm eventTypes={events.map((e) => e.title)} />
      </div>
    </div>
  );
};

export default Events;
