import React, { useState } from "react";
import { BACKEND } from "../api";

type Props = { eventTypes: string[] };

const BookingForm: React.FC<Props> = ({ eventTypes }) => {
  const [form, setForm] = useState({
    name: "",
    eventType: eventTypes[0],
    eventDate: "",
    email: "",
    phone: "",
  });

  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update(k: string, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(`${BACKEND}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.error) setMsg("Error: " + data.error);
      else setMsg("✅ Booking submitted! You will receive confirmation soon.");
    } catch (err) {
      setMsg("❌ Network error");
    }
    setLoading(false);
  }

  return (
    <>
      <form
        onSubmit={submit}
        className="space-y-4 bg-[#FFF8E7] p-6 rounded-xl shadow-md border border-[#FFD93D]"
      >
        <h3 className="text-2xl font-bold text-[#FF6B6B] mb-4">
          🎉 Book Your Event
        </h3>

        {/* FULL NAME */}
        <div>
          <label className="font-semibold text-gray-700">Full Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Enter your full name"
            className="w-full mt-1 p-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD93D] outline-none"
          />
        </div>

        {/* EVENT TYPE */}
        <div>
          <label className="font-semibold text-gray-700">Event Type</label>
          <select
            value={form.eventType}
            onChange={(e) => update("eventType", e.target.value)}
            className="w-full mt-1 p-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD93D] outline-none"
          >
            {eventTypes.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {/* EVENT DATE */}
        <div>
          <label className="font-semibold text-gray-700">Event Date</label>
          <input
            required
            type="date"
            value={form.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            className="w-full mt-1 p-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD93D] outline-none"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="font-semibold text-gray-700">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="example@gmail.com"
            className="w-full mt-1 p-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD93D] outline-none"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="font-semibold text-gray-700">Phone</label>
          <input
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="Phone number"
            className="w-full mt-1 p-3 border-2 rounded-lg focus:ring-2 focus:ring-[#FFD93D] outline-none"
          />
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="
            w-full bg-[#FF6B6B] hover:bg-[#FFD93D] 
            text-white hover:text-[#1A1A1A]
            font-bold text-lg py-3 rounded-lg 
            transition-all duration-200
            shadow-md hover:shadow-xl
          "
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>

        {msg && (
          <div
            className={`mt-3 p-3 rounded-lg text-sm font-semibold ${
              msg.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {msg}
          </div>
        )}
      </form>
    </>
  );
};

export default BookingForm;
