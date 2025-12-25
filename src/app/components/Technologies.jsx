"use client";
import React, { Suspense, useEffect, useState, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import lazyWithPreload from "react-lazy-with-preload";
import { SiSentry, SiStrapi } from "react-icons/si";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// ✅ Preload-enabled lazy icons
const RiReactjsLine = lazyWithPreload(() => import("react-icons/ri").then(m => ({ default: m.RiReactjsLine })));
const RiTailwindCssFill = lazyWithPreload(() => import("react-icons/ri").then(m => ({ default: m.RiTailwindCssFill })));
const SiReactrouter = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiReactrouter })));
const RiNextjsLine = lazyWithPreload(() => import("react-icons/ri").then(m => ({ default: m.RiNextjsLine })));
const SiRedux = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiRedux })));
const SiAxios = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiAxios })));
const SiMui = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiMui })));
const SiFramer = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiFramer })));
const BsBootstrap = lazyWithPreload(() => import("react-icons/bs").then(m => ({ default: m.BsBootstrap })));
const DiJava = lazyWithPreload(() => import("react-icons/di").then(m => ({ default: m.DiJava })));
const SiSpringboot = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiSpringboot })));
const DiMysql = lazyWithPreload(() => import("react-icons/di").then(m => ({ default: m.DiMysql })));
const DiPhp = lazyWithPreload(() => import("react-icons/di").then(m => ({ default: m.DiPhp })));
const GrGithub = lazyWithPreload(() => import("react-icons/gr").then(m => ({ default: m.GrGithub })));
const DiBitbucket = lazyWithPreload(() => import("react-icons/di").then(m => ({ default: m.DiBitbucket })));
const SiPostman = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiPostman })));
const DiDocker = lazyWithPreload(() => import("react-icons/di").then(m => ({ default: m.DiDocker })));
const SiInsomnia = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiInsomnia })));
const SiNgrok = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiNgrok })));
const DiJenkins = lazyWithPreload(() => import("react-icons/di").then(m => ({ default: m.DiJenkins })));
const SiCheckmk = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiCheckmk })));
const SiMatomo = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiMatomo })));
const SiJira = lazyWithPreload(() => import("react-icons/si").then(m => ({ default: m.SiJira })));
const RiWebhookFill = lazyWithPreload(() => import("react-icons/ri").then(m => ({ default: m.RiWebhookFill })));
const FcLinux = lazyWithPreload(() => import("react-icons/fc").then(m => ({ default: m.FcLinux })));

// ✅ Floating animation variants - UPDATED: No opacity change
const floatingVariants = (duration) => ({
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
});

export default function Technologies() {
  // Initialize show3D with proper SSR handling
  const [show3D, setShow3D] = useState(false);

  // Use useLayoutEffect for synchronous measurement if needed
  useLayoutEffect(() => {
    // Check if screen is large enough for 3D
    const checkScreenSize = () => {
      setShow3D(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  //Preload all icons with better error handling
  useEffect(() => {
    const preloadIcons = () => {
      const iconList = [
        RiReactjsLine, RiTailwindCssFill, SiReactrouter, RiNextjsLine, SiRedux,
        SiAxios, SiMui, SiFramer, BsBootstrap, DiJava, SiSpringboot, DiMysql,
        DiPhp, GrGithub, DiBitbucket, SiPostman, DiDocker, SiInsomnia, SiNgrok,
        DiJenkins, SiCheckmk, SiMatomo, SiJira, RiWebhookFill, FcLinux
      ];

      iconList.forEach(icon => {
        try {
          // Use requestIdleCallback for better performance
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              icon?.preload?.();
            });
          } else {
            // Fallback to setTimeout
            setTimeout(() => {
              icon?.preload?.();
            }, 0);
          }
        } catch (error) {
          console.warn('Failed to preload icon:', error);
        }
      });
    };

    // Delay preloading slightly to prioritize critical content
    setTimeout(preloadIcons, 100);
  }, []);

  const icons = [
    [RiReactjsLine, 2.8, "text-[#00a7e5]", "React", "#00a7e5"],
    [RiTailwindCssFill, 3.2, "text-[#06B6D4]", "Tailwind CSS", "#06B6D4"],
    [SiReactrouter, 2.5, "text-[#D0021B]", "React Router", "#D0021B"],
    [RiNextjsLine, 3.0, "text-[#C0C0C0]", "Next.js", "#C0C0C0"],
    [SiRedux, 2.7, "text-[#764abc]", "Redux", "#764abc"],
    [SiAxios, 3.1, "text-blue-900", "Axios", "#2563eb"],
    [SiMui, 2.9, "text-[#2196f3]", "Material UI", "#2196f3"],
    [SiFramer, 3.3, "text-blue-400", "Framer Motion", "#60a5fa"],
    [BsBootstrap, 2.6, "text-[#602C50]", "Bootstrap", "#602C50"],
    [DiJava, 3.0, "text-[#5382a1]", "Java", "#5382a1"],
    [SiSpringboot, 2.8, "text-[#6DB33F]", "Spring Boot", "#6DB33F"],
    [DiMysql, 3.2, "text-blue-300", "MySQL", "#93c5fd"],
    [DiPhp, 2.7, "text-white", "PHP", "#ffffff"],
    [GrGithub, 3.1, "text-white", "GitHub", "#ffffff"],
    [DiBitbucket, 2.9, "text-[#2684FF]", "Bitbucket", "#2684FF"],
    [SiStrapi, 2.5, "text-[#4945FF] bg-white rounded-[27%]", "Strapi", "#4945FF"],
    [SiSentry, 2.8, "text-[#003DA5] bg-white rounded-[27%]", "Sentry", "#003DA5"],
    [SiPostman, 3.0, "text-[#EF5B25] bg-white rounded-[50%]", "Postman", "#EF5B25"],
    [DiDocker, 2.7, "text-white font-bold bg-[#0db7ed] rounded-full", "Docker", "#0db7ed"],
    [SiInsomnia, 3.1, "text-[#4000BF] bg-white rounded-[50%]", "Insomnia", "#4000BF"],
    [SiNgrok, 3.2, "text-[#ffffff]", "Ngrok", "#ffffff"],
    [DiJenkins, 2.6, "", "Jenkins", "#d33833"],
    [SiCheckmk, 3.0, "text-[#15D1A0]", "Checkmk", "#15D1A0"],
    [SiMatomo, 2.8, "text-[#0ea600]", "Matomo", "#0ea600"],
    [SiJira, 3.1, "text-[#0146b3]", "Jira", "#0146b3"],
    [RiWebhookFill, 2.7, "", "Webhooks", "#3b82f6"],
    [FcLinux, 2.9, "", "WSL", "#f97316"]
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Content Overlay */}
      <div className="relative z-10">
        <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.2 }}
                className="text-3xl sm:text-4xl text-white text-center my-12 sm:my-30"
              >
                Technologies
              </motion.h2>

        <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-3 sm:px-4">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-100 w-full py-12 sm:py-20">
              <div className="flex space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          }>
            {icons.map(([Icon, duration, color, tooltip], i) => (
              <motion.div
                key={i}
                className="group p-3 sm:p-4 md:p-5 lg:p-6 cursor-pointer relative"
                initial={{ opacity: 1, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                animate="animate"
                variants={floatingVariants(duration)}
                whileHover={{
                  rotate: 360,
                  transition: { duration: 0.4 }
                }}
                // Enable tooltip for both mobile and desktop
                data-tooltip-id="tech-tooltip"
                data-tooltip-content={tooltip}
                // Add touch event for mobile
                onClick={(e) => {
                  // Prevent default for mobile
                  e.preventDefault();
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon container */}
                <div className="relative p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl transition-all duration-300">
                  <Icon
                    className={`${color} h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-32 lg:w-32 transition-all duration-300 transform group-hover:scale-110`}
                  />
                </div>

                {/* Animated tooltip label - only show on larger screens */}
                <div className="hidden sm:block absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <motion.span
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gray-900/90 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg whitespace-nowrap border border-white/10"
                  >
                    {tooltip}
                  </motion.span>
                </div>

                {/* Mobile touch indicator */}
                <div className="sm:hidden absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-blue-400/50 rounded-full animate-pulse" />
                </div>
              </motion.div>
            ))}
          </Suspense>
        </div>

        {/* Floating animation indicator */}
        <div className="text-center mt-8 sm:mt-12 text-gray-400 text-xs sm:text-sm px-4">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2">

          </motion.div>
        </div>
      </div>

      {/* Tooltip for ALL devices - Uncommented and configured */}
      <Tooltip
        id="tech-tooltip"
        className="z-50 max-w-xs text-xs! sm:text-sm!"
        place="top"
        delayShow={200}
        delayHide={200}
        // Mobile-specific settings
        clickable={true}
        events={['hover', 'click']}
        // Prevent hiding on scroll for mobile
        closeOnScroll={false}
        // Better mobile positioning
        positionStrategy="fixed"
        // Style improvements for mobile
        style={{
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '0.75rem',
          padding: '0.5rem 0.75rem',
          fontSize: '0.75rem',
          maxWidth: '200px',
          zIndex: 9999,
        }}
      />
    </div>
  );
}