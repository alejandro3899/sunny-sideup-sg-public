"use client";

import "@/styles/locomotive-scroll.css";

import { useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import {
  Homepage as HomepageTypes,
  Project as ProjectTypes,
  Image,
  Project,
} from "@/types/cms";
import Timezone from "@/components/Timezone";
import Link from "next/link";
import slug from "slug";

interface HomepageProps {
  homepageData: HomepageTypes;
  projectsData: ProjectTypes[];
}

export default function Homepage({
  homepageData,
  projectsData,
}: HomepageProps) {
  const { mainHeading, timezones = [] } = homepageData["hero"];
  const { socialMediaLinks = [] } = homepageData["socialMediaLinks"];
  const containerRef = useRef(null);

  const HomeSection = () => (
    <section className="cont-fluid w-[calc(100vw_-_40px)]" data-scroll-section>
      <div className="relative z-10 flex h-screen flex-col justify-between">
        <div className="h-10" />
        <div className="flex flex-col-reverse gap-12 md:grid md:grid-cols-12">
          <div className="col-span-4">
            <div className="mt-2 grid gap-2">
              {timezones.map((item) => (
                <Timezone key={item.id} data={item} />
              ))}
            </div>
          </div>
          <div className="col-span-8">
            <h1
              className="max-w-[770px] whitespace-normal font-medium text-blue"
              data-scroll
              data-scroll-speed={2}
            >
              {mainHeading}
            </h1>
          </div>
        </div>
        <div className="pointer-events-auto mb-10 grid place-content-start gap-2 text-[10px] font-medium leading-none">
          {socialMediaLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="self-start hover:underline"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );

  const WorkSection = () => (
    <section
      className="relative !grid place-content-center px-20 sm:pl-[360px]"
      data-scroll-section
    >
      <div
        className="absolute bottom-0 font-monument text-[120px] font-bold text-transparent [-webkit-text-stroke:1px_black] md:text-[150px]"
        data-scroll
        data-scroll-speed={1.5}
      >
        Projects
      </div>
      <div className="flex gap-20">
        {projectsData.map((proj: Project) => (
          <Link
            key={proj.id}
            className="w-[320px] text-sm leading-tightest md:w-[400px] lg:w-[480px]"
            href={`/work/${slug(proj.title)}`}
          >
            <img
              className="mb-5 aspect-[23/15] w-full object-cover"
              src={(proj.thumbnail as Image)?.imagekit?.url}
              alt={(proj.thumbnail as Image).altText}
            />
            <div className="font-semibold">{proj.title}</div>
            <div>{proj.clientName}</div>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        direction: "horizontal",
        touchMultiplier: 3,
        smartphone: {
          smooth: true,
          direction: "horizontal",
        },
        tablet: {
          smooth: true,
          direction: "horizontal",
        },
      }}
      containerRef={containerRef}
      watch={[]}
    >
      <div data-scroll-container ref={containerRef}>
        <div className="relative flex h-screen items-center gap-8 transition-opacity [&>section]:h-screen [&>section]:shrink-0">
          <HomeSection />
          <WorkSection />
        </div>
      </div>
    </LocomotiveScrollProvider>
  );
}
