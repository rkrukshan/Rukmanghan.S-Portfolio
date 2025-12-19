"use client";
import React from "react";
// ✅ Changed from react-router-dom to next/link
import Link from "next/link";
// ✅ Logo path updated to point to public/assets
const logo = "/assets/images/RK.png";

import {
  FaGit,
  FaLinkedin,
  FaMediumM,
  FaWhatsapp,
} from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { motion } from "framer-motion";
import { GiMailbox } from "react-icons/gi";
import { BiMailSend } from "react-icons/bi";
import { SiGmail, SiWhatsapp } from "react-icons/si";

const spinVariant = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
    },
  },
};

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex flex-shrink-0 items-center">
        {/* ✅ Next.js Link uses 'href' instead of 'to' */}
        <Link href="/">
          <img src={logo} alt="" className="h-25 w-25 mx-2" />
        </Link>
      </div>
      <div className="m-8 flex md:flex-row  items-center justify-center gap-5 text-2xl">
        <motion.a
          variants={spinVariant}
          animate="animate"
          href="http://www.linkedin.com/in/rukmanghan-selvakumar"
          target="blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="rounded-lg" />
        </motion.a>
        <motion.a
          variants={spinVariant}
          animate="animate"
          href="https://github.com/rkrukshan"
          target="blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </motion.a>

        <motion.a
          variants={spinVariant}
          animate="animate"
          href="https://medium.com/@rukshan1122"
          target="blank"
          rel="noopener noreferrer"
          aria-label="medium"
        >
          <FaMediumM />
        </motion.a>

        <motion.a
          variants={spinVariant}
          animate="animate"
          href="https://wa.me/+94769861092?text=Hello,%20I%20need%20assistance"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <SiWhatsapp />
        </motion.a>
      </div>
    </nav>
  );
}