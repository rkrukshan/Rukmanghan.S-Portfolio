"use client";
import React, { Suspense, useEffect } from "react";
import {  PROJECTS } from "../constants/index.js";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";      
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image.js";

// Text animation variants
const textVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 },
  },
};

export default function Projects() {
  // Preload all project images - works in ALL browsers including Safari
  useEffect(() => {
    // Simple setTimeout approach that works everywhere
    setTimeout(() => {
      // Fixed: Use window.Image for native HTML Image constructor
      if (typeof window !== 'undefined') {
        PROJECTS.forEach((project) => {
          const img = new window.Image();
          img.src = project.image;
        });
      }
    }, 0);
  }, []);

  return (
    <div className="pb-24 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.2 }}
        className="text-3xl sm:text-4xl text-white text-center my-12 sm:my-30"
      >
        Projects
      </motion.h2>

      <div className="w-full max-w-4xl mx-auto">
        <Suspense fallback={null}>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="mb-12 flex flex-col lg:flex-row flex-wrap justify-center lg:justify-start"
            >
              {/* Image block */}
              <motion.div
                className="flex flex-col flex-wrap justify-center items-center w-full lg:w-1/3 lg:mr-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={550} // Use largest width from your responsive classes
                  height={450} // Use largest height from your responsive classes
                  className="sm:w-112.5 sm:h-87.5 md:h-112.5 md:w-137.5 lg:h-37.5 object-cover mb-6 rounded"
                  quality={85}
                  loading="lazy"
                />
              </motion.div>

              {/* Text + Buttons Block */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                variants={textVariants}
                className="w-full max-w-xl mx-auto px-4 sm:px-0 md:flex-col items-center justify-center lg:px-0 lg:w-auto lg:ml-3"
              >
                <div className="space-y-1">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-2 font-semibold text-xl sm:text-2xl text-center sm:text-center lg:text-start"
                  >
                    {project.title}
                  </motion.h3>

                  {/* Buttons with Icon + Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-x-3 mb-2 flex justify-center lg:justify-start"
                  >
                    {/* GitHub */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.90 }}
                        className="flex items-center gap-2 rounded bg-slate-700 px-3 py-1 text-sm font-medium text-stone-300 cursor-pointer hover:bg-stone-500/45 hover:text-white hover:border-b-2 border-primary transition-all"
                      >
                        <FaGithub className="w-4 h-4" />
                        GitHub
                      </motion.button>
                    </a>

                    {/* Live Demo */}
                    {project.livedemolink ? (
                      <a
                        href={project.livedemolink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.90 }}
                          className="flex items-center gap-2 rounded bg-blue-950 px-3 py-1 text-sm font-medium text-stone-300 cursor-pointer hover:bg-blue-500/45 hover:text-white hover:border-b-2 border-secondary transition-all"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          Live Demo
                        </motion.button>
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 rounded bg-slate-800 px-3 py-1 text-sm font-medium text-stone-300 cursor-not-allowed opacity-50">
                        <FiExternalLink className="w-4 h-4" />
                        Live Demo
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-4 text-stone-400 text-justify lg:text-start xs:tracking-tighter"
                >
                  {project.description}
                </motion.p>

                {/* Tech Badges */}
                <motion.div
                  className="flex flex-wrap justify-center lg:justify-start gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {project.technologies.map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-center gap-2 rounded-sm bg-stone-900/80 px-3 py-1.5 text-sm font-medium text-stone-200 shadow-sm hover:bg-stone-800 transition cursor-default"
                    >
                      {project.techlogo[i] && (
                        <div className="flex items-center justify-center w-5 h-5">
                          {React.createElement(project.techlogo[i], {
                            className: "w-5 h-5",
                          })}
                        </div>
                      )}
                      <span className="whitespace-nowrap">{tech}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </Suspense>
      </div>
    </div>
  );
}