"use client";
import React, { useEffect, useRef } from "react";
import { HERO_CONTENT } from "../constants/index.js";
import { motion } from "framer-motion";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register the plugin
gsap.registerPlugin(TextPlugin);

const profilePic = "/assets/images/Rukmanghan.png";

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeInOut", delay: 0.1 },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 },
  },
};

export default function Hero() {
  const nameRef = useRef(null);

  useEffect(() => {
    // Image preloading logic
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        const img = new Image();
        img.src = profilePic;
      });
    }

    // GSAP Typewriter Animation
    if (nameRef.current) {
      gsap.to(nameRef.current, {
        duration: 1.5,       // Speed of the typing
        text: "Rukmanghan.S",
        delay: 0.5,          // Initial delay when page loads
        ease: "sine.inOut",
        repeat: -1,          // Loop infinitely
        repeatDelay: 1,      // The 1-second gap you requested
        yoyo: true,          // Makes it "erase" itself back to empty
        holdMs: 5000,        // Optional: extra hold time for TextPlugin
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-10 lg:py-0 px-6 sm:px-12 lg:px-20 xl:px-44">
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-full max-w-9xl mx-auto">

        {/* Profile Image Container */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-12 lg:mb-0">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="relative"
          >
            <img
              src={profilePic}
              alt="Rukmanghan"
              loading="lazy"
              decoding="async"
              className="w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] xl:w-[460px] aspect-[3/5] rounded-3xl object-cover shadow-2xl hover:shadow-slate-400/50 transition-all duration-500"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start"
        >
          {/* GSAP Target Element */}
          <motion.h2
            ref={nameRef}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl pb-4 tracking-tighter text-center lg:text-left min-h-[1.2em]"
          >
            {/* The text is empty here so GSAP can type into it */}
          </motion.h2>

          <motion.span
            className="text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-stone-300 to-stone-600 bg-clip-text tracking-tight text-transparent text-center lg:text-left font-medium"
          >
            Software Engineer
          </motion.span>

          <motion.p
            className="text-sm my-2 max-w-lg py-6 md:text-2xl text-justify leading-relaxed tracking-tighter text:stone-400"
          >
            {HERO_CONTENT}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}