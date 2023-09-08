"use client";

import { useEffect } from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const buttons = [
      ...Array.from(document.querySelectorAll("button")),
      ...Array.from(document.querySelectorAll(".button")),
    ];

    function handleButtonHover() {
      document.querySelector(".cursor")?.classList.add("hovered");
    }
    function handleButtonLeave() {
      document.querySelector(".cursor")?.classList.remove("hovered");
    }

    buttons.forEach((button) => {
      button.addEventListener("mouseover", handleButtonHover);
      button.addEventListener("mouseleave", handleButtonLeave);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseover", handleButtonHover);
        button.removeEventListener("mouseleave", handleButtonLeave);
      });
    };
  }, []);

  return <>{children}</>;
}
