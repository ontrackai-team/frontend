 export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left side - Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-blue-700 font-bold flex items-center justify-center rounded-full shadow-sm">
            AI
          </div>

          <h1 className="font-semibold text-lg md:text-xl tracking-wide">
            Assessment Tracker
          </h1>
        </div>

        {/* Right side - Menu */}
        <div className="flex items-center gap-6 text-sm md:text-base">
          <span className="cursor-pointer hover:text-blue-100 transition">
            Student Dashboard
          </span>

          <button className="bg-white text-blue-600 px-3 py-1 rounded-md font-medium hover:bg-blue-100 transition">
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
}