"use client";

import { useEffect } from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // hover
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

    // cursor
    let curs: HTMLDivElement = document.querySelector(".cursor")!;
    let initCursor = false;

    function handleMove(e: MouseEvent) {
      var mouseX = e.clientX;
      var mouseY = e.clientY;

      if (!initCursor) {
        (window as any)?.TweenLite?.to(curs, 0.3, {
          opacity: 1,
        });
        initCursor = true;
      }

      (window as any)?.TweenLite?.to(curs, 0.3, {
        top: mouseY + "px",
        left: mouseX + "px",
      });
    }

    function handleMouseOut() {
      (window as any)?.TweenLite?.to(curs, 0.3, {
        opacity: 0,
      });
      initCursor = false;
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleMouseOut);
      buttons.forEach((button) => {
        button.removeEventListener("mouseover", handleButtonHover);
        button.removeEventListener("mouseleave", handleButtonLeave);
      });
    };
  }, []);

  return <>{children}</>;
}
