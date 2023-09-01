"use client";

import { Contact, Homepage, Navigation, Setting } from "@/types/cms";
import HomeHero from "./HomeHero";
import HomeShowcase from "./HomeWorkShowcase";
import HomeWorkSpotlight from "./HomeWorkSpotlight";
import HomeTestimonials from "./HomeTestimonials";
import HomeWorkProcess from "./HomeWorkProcess";
import { useEffect, useState } from "react";
import MainNav from "@/components/MainNav";

type Props = {
  home: Homepage;
  siteBranding: Setting["siteBranding"];
  navItems: Navigation["topNavigation"];
  contactLink: Navigation["contactLink"];
  contact: Contact;
};

export default function HomePage({
  home,
  siteBranding,
  navItems,
  contactLink,
  contact,
}: Props) {
  const [isWhite, setIsWhite] = useState(true);

  const { hero, testimonials, workProcess, workShowcase, workSpotlight } = home;

  useEffect(() => {
    const sections = [
      ...Array.from(document.querySelectorAll("[data-scroller] > section")),
      document.querySelector("footer")!,
    ];
    let direction = "up";
    let prevYPosition = 0;

    const setScrollDirection = () => {
      if (window.scrollY > prevYPosition) {
        direction = "down";
      } else {
        direction = "up";
      }

      prevYPosition = window.scrollY;
    };

    const getTargetSection = (target: Element) => {
      if (direction === "up") return target;

      const next =
        target.nextElementSibling ?? document.querySelector("footer");
      if (next) {
        return next;
      } else {
        return target;
      }
    };

    const shouldUpdate = (entry: IntersectionObserverEntry) => {
      if (direction === "down" && !entry.isIntersecting) {
        return true;
      }

      if (direction === "up" && entry.isIntersecting) {
        return true;
      }

      return false;
    };

    const updateColors = (target: any) => {
      const theme = (target as any)?.dataset?.theme ?? "light";
      setIsWhite(theme !== "light");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setScrollDirection();

          if (!shouldUpdate(entry)) return;

          const target = getTargetSection(entry.target);
          updateColors(target);
        });
      },
      {
        rootMargin: `-${92 / 2}px`,
        threshold: 0,
      }
    );
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  console.log();

  return (
    <>
      <MainNav
        siteBranding={siteBranding}
        navItems={navItems}
        contactLink={contactLink}
        contact={contact}
        altBrandingColour={isWhite}
        fullWidth={false}
      />

      <HomeHero hero={hero} />
      <HomeShowcase workShowcase={workShowcase} />
      <HomeWorkSpotlight workSpotlight={workSpotlight} />
      <HomeTestimonials testimonials={testimonials} />
      <HomeWorkProcess workProcess={workProcess} />
    </>
  );
}
