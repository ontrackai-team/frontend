import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white px-4">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.4),transparent_60%)]" />

      <div className="relative w-full max-w-2xl text-center">
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-10">
          
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300">
            AI-Powered Study Assistant
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              OnTrackAI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-gray-300 text-lg">
            Organize your learning, track progress, and boost productivity with AI-driven insights designed for students.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              Get Started
            </Link>
          </div>

          {/* Footer hint */}
          <p className="mt-6 text-xs text-gray-500">
            No credit card required • Built for students
          </p>
        </div>

        {/* Floating glow accents */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />
      </div>
    </div>
  );
}