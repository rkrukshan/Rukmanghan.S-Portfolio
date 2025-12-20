"use client";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
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

const floatingVariants = (duration) => ({
  initial: { y: -10, opacity: 0 },
  animate: {
    y: [10, -10],
    opacity: 1,
    transition: {
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
});

export default function Technologies() {
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Preload all icons in background after first paint
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
          // Optional chaining in case preload method doesn't exist
          icon?.preload?.();
        } catch (error) {
          console.warn('Failed to preload icon:', error);
        }
      });
    };

    // Simple cross-browser approach
    setTimeout(preloadIcons, 0);
  }, []);

  const icons = [
    [RiReactjsLine, 2, "text-[#00a7e5]", "React"],
    [RiTailwindCssFill, 2.5, "text-[#06B6D4]", "Tailwind CSS"],
    [SiReactrouter, 2, "text-[#D0021B]", "React Router"],
    [RiNextjsLine, 2.5, "text-[#C0C0C0]", "Next.js"],
    [SiRedux, 2, "text-[#764abc]", "Redux"],
    [SiAxios, 2.5, "text-blue-900", "Axios"],
    [SiMui, 2, "text-[#2196f3]", "Material UI"],
    [SiFramer, 2.5, "text-blue-400", "Framer Motion"],
    [BsBootstrap, 2, "text-[#602C50]", "Bootstrap"],
    [DiJava, 2.5, "text-[#5382a1]", "Java"],
    [SiSpringboot, 2, "text-[#6DB33F]", "Spring Boot"],
    [DiMysql, 2.5, "text-blue-300", "MySQL"],
    [DiPhp, 2, "text-white", "PHP"],
    [GrGithub, 2.5, "text-white", "GitHub"],
    [DiBitbucket, 2, "text-[#2684FF]", "Bitbucket"],
    [SiStrapi, 2, "text-[#4945FF] bg-white rounded-[27%]", "Strapi"],
    [SiSentry, 2, "text-[#003DA5] bg-white rounded-[27%]", "Sentry"],
    [SiPostman, 2.5, "text-[#EF5B25] bg-white rounded-[50%]", "Postman"],
    [DiDocker, 2, "text-white font-bold bg-[#0db7ed] rounded-full", "Docker"],
    [SiInsomnia, 2.5, "text-[#4000BF] bg-white rounded-[50%]", "Insomnia"],
    [SiNgrok, 2.5, "text-[#ffffff]", "Ngrok"],
    [DiJenkins, 2, "", "Jenkins"],
    [SiCheckmk, 2.5, "text-[#15D1A0]", "Checkmk"],
    [SiMatomo, 2, "text-[#0ea600]", "Matomo"],
    [SiJira, 2.5, "text-[#0146b3]", "Jira"],
    [RiWebhookFill, 2, "", "Webhooks"],
    [FcLinux, 2.5, "", "WSL"]
  ];

  return (
    <div>
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.2 }}
        className="text-3xl sm:text-4xl text-white text-center my-12 sm:my-30"
      >
        Technologies
      </motion.h2>

      <div className="flex flex-wrap lg:flex-row items-center justify-center gap-4">
        <Suspense fallback={null}>
          {icons.map(([Icon, duration, color, tooltip], i) => (
            <motion.div
              key={i}
              className="p-4 cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              animate="animate"
              variants={floatingVariants(duration)}
              data-tooltip-id="tech-tooltip"
              data-tooltip-content={tooltip}
            >
              <Icon className={`text-7xl h-29 w-29 ${color}`} />
            </motion.div>
          ))}
        </Suspense>
      </div>

      {isMounted && (
        <Tooltip
          id="tech-tooltip"
          place="top"
          effect="solid"
          className="z-50"
          style={{
            backgroundColor: 'slate-900',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '500',
            padding: '8px 12px',
            borderRadius: '6px',
            zIndex: 9999,
          }}
          delayShow={300}
          delayHide={200}
        />
      )}
    </div>
  );
}