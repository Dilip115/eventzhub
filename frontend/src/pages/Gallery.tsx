import React from "react";

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1511283409588-2b3f1e2f7f54",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1521312703539-5e97b803a6f0",
  "https://images.unsplash.com/photo-1523528283115-9bf9f4c04f4e",
  "https://images.unsplash.com/photo-1546776310-eef248d1e4a3",
  "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
  "https://images.unsplash.com/photo-1551537482-f2075a1d51ec",
];

const Gallery: React.FC = () => {
  return (
    <div className="space-y-10">

      <h2 className="text-4xl font-extrabold text-center text-[#FF6B6B]">
        📸 Event Gallery
      </h2>

      <p className="text-center max-w-2xl mx-auto text-gray-600">
        A glimpse into our amazing decoration work — From weddings and birthdays
        to receptions and house-warming ceremonies, we turn your special moments
        into unforgettable memories 🎉
      </p>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg group shadow-md hover:shadow-xl cursor-pointer"
          >
            <img
              src={img}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-300"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
              <span className="text-white font-semibold text-sm">View</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Gallery;
