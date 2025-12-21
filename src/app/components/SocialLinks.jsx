import React from "react";
import { FaLinkedin, FaMediumM, FaGithub } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";

const links = [
  { id: "linkedin", url: "https://www.linkedin.com/in/rukmanghan-selvakumar/", icon: FaLinkedin, label: "LinkedIn" },
  { id: "github", url: "https://github.com/rkrukshan", icon: FaGithub, label: "GitHub" },
  { id: "medium", url: "https://medium.com/@rukshan1122", icon: FaMediumM, label: "Medium" },
  { id: "whatsapp", url: "https://wa.me/+94769861092?text=Hello,%20I%20need%20assistance", icon: SiWhatsapp, label: "WhatsApp" }
];

export default function SocialLinks() {
  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg p-1"
          >
            <Icon />
          </a>
        );
      })}
    </>
  );
}