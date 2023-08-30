"use client";
import Spline from "@splinetool/react-spline";
import clsx from "clsx";
import { useState } from "react";

export default function HomeSpline() {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      className={clsx(
        "fixed z-0 h-screen w-screen select-none transition-opacity duration-1000",
        loaded ? "opacity-100" : "opacity-0"
      )}
    >
      <Spline
        scene="https://prod.spline.design/GaLf2mkHl-WWm98P/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
