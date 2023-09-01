"use client";

import { Contact, Homepage, Navigation, Setting } from "@/types/cms";
import HomeHero from "./HomeHero";
import HomeHeroShowcase from "./HomeHeroShowcase";
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
    const target = document.querySelector("#intersect");
    const options = {
      //   root: document.querySelector(".scroll-area"),
      threshold: 1.0,
      rootMargin: "0px 0px 0px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      console.log("entries: ", entries);
    }, options);

    observer.observe(target!);

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

      <div className="w-full flex flex-col items-center">
        <HomeHero hero={hero} />
        {hero.showcase && <HomeHeroShowcase showcase={hero.showcase} />}
        <div id="intersect" className="w-full">
          <HomeShowcase workShowcase={workShowcase} />
        </div>
        <HomeWorkSpotlight workSpotlight={workSpotlight} />
        <HomeTestimonials testimonials={testimonials} />
        <HomeWorkProcess workProcess={workProcess} />
      </div>
    </>
  );
}
