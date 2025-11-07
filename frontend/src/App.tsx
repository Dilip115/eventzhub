import React from "react";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Admin from "./pages/Admin";

const App: React.FC = () => {
  const [page, setPage] = React.useState<"home" | "events" | "admin">("home");

  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      {/* NAVBAR */}
      <header className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">EVENTZHUB</h1>

          <nav className="flex gap-4">
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("events")}>Events</button>
            <button onClick={() => setPage("admin")}>Admin</button>
          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="container mx-auto p-6">
        {page === "home" && <Home />}
        {page === "events" && <Events />}
        {page === "admin" && <Admin />}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 p-4 text-center text-sm">
        © EVENTZHUB — Parvati Nagar, Bellary
      </footer>
    </div>
  );
};

export default App;
