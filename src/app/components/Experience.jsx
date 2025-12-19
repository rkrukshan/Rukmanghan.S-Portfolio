"use client";
import React, { useEffect } from "react";
import { EXPERIENCES } from "../constants/index.js";
import { motion } from "framer-motion";

const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 },
    },
};

export default function Experience() {

    useEffect(() => {
        if ("requestIdleCallback" in window) {
            requestIdleCallback(() => {
                EXPERIENCES.forEach(() => { });
            });
        }
    }, []);

    return (
        <div className="pb-24 px-4 sm:px-6 lg:px-8">

            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.2 }}
                className="text-3xl sm:text-4xl text-white text-center my-12 sm:my-30"
            >
                Experiences
            </motion.h2>

            <div className="w-full max-w-4xl mx-auto">
                {EXPERIENCES.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="mb-12 flex flex-col lg:flex-row flex-wrap justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-20%" }}
                            variants={textVariants}
                            className="w-full max-w-xl mx-auto px-4 sm:px-0 md:flex-col items-center justify-center lg:px-0 lg:w-aut"
                        >
                            <motion.div
                                className="mb-3 text-center sm:text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                                    {exp.role}
                                </h3>
                                <p className="text-md text-stone-400">{exp.company}</p>
                                <p className="text-sm text-stone-500">{exp.year}</p>
                            </motion.div>

                            <motion.p
                                className="text-sm my-2 w-auto py-6 md:text-2xl text-justify leading-relaxed tracking-tighter"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {exp.description}
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap justify-center items-center lg:justify-center gap-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {exp.technologies.map((tech, i) => (
                                    <motion.span
                                        key={i}
                                        className="flex items-center gap-2 rounded-sm bg-stone-900/80 px-3 py-1.5 text-sm font-medium text-stone-200 shadow-sm hover:bg-stone-800 transition cursor-default"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                    >
                                        {/* ✅ Ensures icons are rendered correctly using React.createElement */}
                                        {exp.techlogo[i] && React.createElement(exp.techlogo[i])}
                                        {tech}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}