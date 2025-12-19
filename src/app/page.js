"use client";
import React, { Suspense, useEffect, useState, lazy } from "react";
import Hero from "./components/Hero";

const Technologies = lazy(() => import("./components/Technologies"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Form = lazy(() => import("./components/Form"));
const Contact = lazy(() => import("./components/Contact"));

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Safe preload for lazy components
    import("./components/Technologies");
    import("./components/Projects");
    import("./components/Experience");
    import("./components/Form");
    import("./components/Contact");

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="overflow-x-hidden text-stone-300 antialiased">
      {/* Custom CSS animations */}
      <style>
        {`
          @keyframes slow-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes float-glow {
            0%, 100% { opacity: 0.8; transform: translateY(0) scale(1); }
            50% { opacity: 1; transform: translateY(-4px) scale(1.08); }
          }
          @keyframes subtle-glow {
            0%, 100% { opacity: 0.6; box-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
            50% { opacity: 0.9; box-shadow: 0 0 30px rgba(255, 255, 255, 0.7); }
          }
          @keyframes slow-pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }
          .animate-slow-spin {
            animation: slow-spin 8s linear infinite;
          }
          .animate-float-glow {
            animation: float-glow 3s ease-in-out infinite;
          }
          .animate-subtle-glow {
            animation: subtle-glow 3s ease-in-out infinite;
          }
          .animate-slow-pulse {
            animation: slow-pulse 3s ease-in-out infinite;
          }
          
          /* Mobile optimizations */
          @media (max-width: 640px) {
            .mobile-safe-button {
              animation-play-state: running !important;
              transform: translate3d(0, 0, 0);
              backface-visibility: hidden;
              perspective: 1000px;
            }
          }
        `}
      </style>

      {/* Scroll to Top Button - Responsive */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="group fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 h-14 w-14 sm:h-16 sm:w-16 transition-all duration-500 hover:scale-110 active:scale-95 cursor-pointer mobile-safe-button"
          aria-label="Scroll to top"
        >
          {/* Outer rotating ring - Responsive blur */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-500 via-gray-950 to-slate-500 p-[2px] opacity-80 blur-[2px] sm:blur-sm animate-slow-spin">
            <div className="h-full w-full rounded-full bg-gradient-to-br from-gray-950 via-gray-700 to-black"></div>
          </div>

          {/* Middle pulsing ring - Responsive blur */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/30 via-gray-900/0 to-gray-900/0 blur-[1px] sm:blur-[2px] animate-slow-pulse"></div>

          {/* Core button - Responsive sizing */}
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl transition-all duration-700 group-hover:rotate-180 active:rotate-180 animate-subtle-glow">
            {/* Inner accent glow - Responsive blur */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700/90 via-gray-600/60 to-gray-700/50 blur-[12px] sm:blur-[15px] transition-all duration-300 group-hover:opacity-40 group-hover:blur-[8px] sm:group-hover:blur-[10px] active:opacity-40"></div>

            {/* Arrow icon with float animation - Responsive size */}
            <div className="relative z-10 animate-float-glow">
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 transition-all duration-500 group-hover:scale-125 group-hover:rotate-180 active:scale-125 active:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <defs>
                  <linearGradient
                    id="arrow-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="50%" stopColor="#d1d5db" />
                    <stop offset="100%" stopColor="#9ca3af" />
                  </linearGradient>
                </defs>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.8}
                  d="M5 15l7-7 7 7"
                  stroke="url(#arrow-gradient)"
                />
              </svg>
            </div>

            {/* Subtle inner ring */}
            <div className="absolute inset-0 rounded-full border border-gray-900/40 transition-all duration-300 group-hover:border-slate-950/50 active:border-slate-950/50"></div>

            {/* Top highlight - Responsive size */}
            <div className="absolute top-0 left-1/2 h-2 w-5 sm:w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-white/30 via-white/40 to-slate-950/50 blur-[1px] sm:blur-sm transition-all duration-300 group-hover:opacity-30 active:opacity-30"></div>
          </div>

          {/* Outer hover glow - Responsive inset */}
          <div className="absolute -inset-2 sm:-inset-3 overflow-hidden rounded-full">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-300/30 via-gray-900/40 to-gray-300/30 opacity-0 blur-lg sm:blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:blur-xl sm:group-hover:blur-2xl active:opacity-100"></div>
          </div>

          {/* Additional static outer glow - Responsive blur */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gray-400/10 via-gray-300/15 to-gray-400/10 opacity-60 blur-md sm:blur-lg"></div>
        </button>
      )}

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="relative h-full w-full bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        </div>
      </div>

      {/* Content - Responsive container */}
      <div className=" mx-auto px-4 sm:px-6 md:px-8">
        <Hero />

        <Suspense
          fallback={
            <div className="mt-20 text-center text-white">Loading...</div>
          }
        >
          <Technologies />
          <Projects />
          <Experience />
          <Form />
          <Contact />
        </Suspense>
      </div>
    </div>
  );
}
