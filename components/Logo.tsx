"use client";
import Link from "next/link";
import React from "react";
import { siteConfig } from "@/lib/site-config";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
      <div className="h-5 w-6 bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shadow-lg shadow-[var(--brand)]/50" />
      <span className="font-medium text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem" }}>{siteConfig.name}</span>
    </Link>
  );
};
