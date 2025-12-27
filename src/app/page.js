"use client";

import React, {
  Suspense,
  useEffect,
  useState,
  lazy,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Hero from "./components/Hero";

const Technologies = lazy(() => import("./components/Technologies"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Form = lazy(() => import("./components/Form"));
const Contact = lazy(() => import("./components/Contact"));

// Navigation component
const NavigationDots = ({ sections, activeSection, scrollToSection }) => {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-6">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center justify-center"
          aria-label={`Scroll to ${section.label}`}
        >
          {/* Outer ring - visible for all dots */}
          <div className="absolute inset-0 rounded-full border border-gray-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Dot indicator */}
          <div
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "scale-125 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                : "bg-gray-500 group-hover:bg-gray-400"
            }`}
          >
            {/* Active pulse effect */}
            {activeSection === section.id && (
              <>
                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30"></div>
                <div className="absolute -inset-1 rounded-full bg-white/10 animate-pulse"></div>
              </>
            )}
          </div>

          {/* Section label - appears on hover */}
          <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="relative bg-gray-900/90 backdrop-blur-sm text-white text-xs font-medium py-1.5 px-3 rounded-md whitespace-nowrap shadow-lg">
              {section.label}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900/90 rotate-45"></div>
            </div>
          </div>

          {/* Connecting line between dots (except last one) */}
          {section.id !== sections[sections.length - 1].id && (
            <div
              className={`absolute top-full w-0.5 h-6 mt-1 transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-linear-to-b from-white to-transparent"
                  : "bg-linear-to-b from-gray-500/50 to-transparent"
              }`}
            ></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolling, setIsScrolling] = useState(false);

  // Refs for each section
  const heroRef = useRef(null);
  const technologiesRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);

  // Memoize sections array to prevent unnecessary re-renders
  const sections = useMemo(
    () => [
      { id: "hero", label: "Hero", ref: heroRef },
      { id: "technologies", label: "Technologies", ref: technologiesRef },
      { id: "projects", label: "Projects", ref: projectsRef },
      { id: "experience", label: "Experience", ref: experienceRef },
      { id: "form", label: "Contact Me", ref: formRef },
      { id: "contact", label: "Get in Touch", ref: contactRef },
    ],
    []
  ); // Empty dependency array since refs are stable

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("hero");
  };

  const scrollToSection = useCallback(
    (sectionId) => {
      setIsScrolling(true);
      const section = sections.find((s) => s.id === sectionId);
      if (section?.ref?.current) {
        section.ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setActiveSection(sectionId);

        // Reset scrolling flag after animation completes
        setTimeout(() => setIsScrolling(false), 1000);
      }
    },
    [sections]
  );

  // Improved function to find which section is currently in view
  const findActiveSection = useCallback(() => {
    if (isScrolling) return; // Don't update while programmatically scrolling

    const scrollPosition = window.scrollY + window.innerHeight / 3; // Offset for better UX

    // Get positions of all sections
    const sectionPositions = sections.map((section) => {
      if (!section.ref.current)
        return { id: section.id, top: Infinity, bottom: -Infinity };

      const rect = section.ref.current.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = rect.height;

      return {
        id: section.id,
        top,
        bottom: top + height,
        height,
      };
    });

    // Special case for the last section - if we're near the bottom of the page
    const lastSection = sectionPositions[sectionPositions.length - 1];
    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100;

    if (isAtBottom && lastSection) {
      if (activeSection !== lastSection.id) {
        setActiveSection(lastSection.id);
      }
      return;
    }

    // Find the section that's currently in view
    let newActiveSection = "hero";

    for (let i = 0; i < sectionPositions.length; i++) {
      const section = sectionPositions[i];

      // Check if scroll position is within this section
      if (
        scrollPosition >= section.top - 100 &&
        scrollPosition < section.bottom - 100
      ) {
        newActiveSection = section.id;
        break;
      }

      // If we're between sections, pick the closest one
      if (i < sectionPositions.length - 1) {
        const nextSection = sectionPositions[i + 1];
        const midpoint = (section.bottom + nextSection.top) / 2;

        if (
          scrollPosition >= section.bottom - 100 &&
          scrollPosition < midpoint
        ) {
          newActiveSection = section.id;
          break;
        } else if (
          scrollPosition >= midpoint &&
          scrollPosition < nextSection.top + 100
        ) {
          newActiveSection = nextSection.id;
          break;
        }
      }
    }

    // Update only if changed
    if (activeSection !== newActiveSection) {
      setActiveSection(newActiveSection);
    }
  }, [sections, isScrolling, activeSection]);

  // Throttle scroll handler for performance
  useEffect(() => {
    let scrollTimeout;
    let ticking = false;

    const handleScroll = () => {
      toggleVisibility();

      // Use requestAnimationFrame for smoother performance
      if (!ticking) {
        requestAnimationFrame(() => {
          findActiveSection();
          ticking = false;
        });
        ticking = true;
      }

      // Also use timeout as backup
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          findActiveSection();
          scrollTimeout = null;
        }, 150);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    setTimeout(findActiveSection, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [findActiveSection]);

  // Setup Intersection Observer as a backup
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.1,
    };

    const observers = [];

    sections.forEach((section) => {
      if (section.ref.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isScrolling) {
              setActiveSection(section.id);
            }
          });
        }, options);

        observer.observe(section.ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections, isScrolling]);

  useEffect(() => {
    // Safe preload for lazy components
    Promise.all([
      import("./components/Technologies"),
      import("./components/Projects"),
      import("./components/Experience"),
      import("./components/Form"),
      import("./components/Contact"),
    ]);
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

      {/* Right Navigation Dots - Now shows on md screens and up */}
      <NavigationDots
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Scroll to Top Button - Responsive */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="group fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 h-14 w-14 sm:h-16 sm:w-16 transition-all duration-500 hover:scale-110 active:scale-95 cursor-pointer mobile-safe-button"
          aria-label="Scroll to top"
        >
          {/* Outer rotating ring - Responsive blur */}
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-gray-500 via-gray-950 to-slate-500 p-0.5 opacity-80 blur-[2px] sm:blur-sm animate-slow-spin">
            <div className="h-full w-full rounded-full bg-linear-to-br from-gray-950 via-gray-700 to-black"></div>
          </div>

          {/* Middle pulsing ring - Responsive blur */}
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-gray-900/30 via-gray-900/0 to-gray-900/0 blur-[1px] sm:blur-[2px] animate-slow-pulse"></div>

          {/* Core button - Responsive sizing */}
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-gray-800 via-gray-900 to-black shadow-2xl transition-all duration-700 group-hover:rotate-180 active:rotate-180 animate-subtle-glow">
            {/* Inner accent glow - Responsive blur */}
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-gray-700/90 via-gray-600/60 to-gray-700/50 blur-md sm:blur-[15px] transition-all duration-300 group-hover:opacity-40 group-hover:blur-sm sm:group-hover:blur-[10px] active:opacity-40"></div>

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
            <div className="absolute top-0 left-1/2 h-2 w-5 sm:w-6 -translate-x-1/2 rounded-full bg-linear-to-r from-white/30 via-white/40 to-slate-950/50 blur-[1px] sm:blur-sm transition-all duration-300 group-hover:opacity-30 active:opacity-30"></div>
          </div>

          {/* Outer hover glow - Responsive inset */}
          <div className="absolute -inset-2 sm:-inset-3 overflow-hidden rounded-full">
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-gray-300/30 via-gray-900/40 to-gray-300/30 opacity-0 blur-lg sm:blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:blur-xl sm:group-hover:blur-2xl active:opacity-100"></div>
          </div>

          {/* Additional static outer glow - Responsive blur */}
          <div className="absolute -inset-1 rounded-full bg-linear-to-r from-gray-400/10 via-gray-300/15 to-gray-400/10 opacity-60 blur-md sm:blur-lg"></div>
        </button>
      )}

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="relative h-full w-full bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
          <div className="absolute left-0 right-0 top-[-10%] h-250 w-250 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
        </div>
      </div>

      {/* Content - Responsive container */}
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        {/* Hero Section */}
        <div ref={heroRef} id="hero">
          <Hero />
        </div>

        <Suspense
          fallback={
            <div className="mt-20 flex justify-center items-center min-h-screen">
              <div className="flex space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          }
        >
          {/* Technologies Section */}
          <div ref={technologiesRef} id="technologies">
            <Technologies />
          </div>

          {/* Projects Section */}
          <div ref={projectsRef} id="projects">
            <Projects />
          </div>

          {/* Experience Section */}
          <div ref={experienceRef} id="experience">
            <Experience />
          </div>

          {/* Form Section */}
          <div ref={formRef} id="form">
            <Form />
          </div>

          {/* Contact Section */}
          <div ref={contactRef} id="contact">
            <Contact />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
