"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the SocialLinks component
// ssr: false ensures it only runs on the client
const SocialLinks = dynamic(() => import("./SocialLinks"), {
  ssr: false,
  loading: () => (
    <div className="flex gap-4 sm:gap-5">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
      ))}
    </div>
  ),
});

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
      {/* Logo Section */}
      <div className="flex shrink-0 items-center">
        <Link 
          href="/" 
          className="mx-2 hover:opacity-90 transition-opacity duration-200" 
          aria-label="Home"
        >
          <Image
            src="/assets/images/RK.png"
            alt="rukmanghan.vercel.app"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 100px"
            className="h-auto w-auto"
            priority
          />
        </Link>
      </div>

      {/* Social Icons Section */}
      <div className="m-8 flex md:flex-row items-center justify-center gap-4 sm:gap-5 text-xl sm:text-2xl">
        <SocialLinks />
      </div>
    </nav>
  );
}