"use client";

import { useEffect, useState, type ReactNode } from "react";

export function HeroReveal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span
      className={`inline-block ${
        mounted ? "animate-fade-up" : "opacity-0"
      }`}
    >
      {children}
    </span>
  );
}
