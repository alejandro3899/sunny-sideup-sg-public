"use client";

import { Homepage, Image as ImageType } from "@/types/cms";
import {
  bottomInY,
  fadeIn,
  rightLeft,
  rightLeftContainer,
} from "@/utils/variants";
import PeelButton from "@/components/PeelButton";
import Timezone from "@/components/Timezone";
import HomeHeroShowcase from "./HomeHeroShowcase";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeHero({ hero }: { hero: Homepage["hero"] }) {
  const {
    mainHeading,
    subHeading,
    backgroundImage,
    showcase,
    timezones = [],
    heroLinks = [],
  } = hero;

  return (
    <LazyMotion features={domAnimation}>
      <section
        data-theme="dark"
        className="w-full bg-black text-white overflow-hidden"
      >
        <div className="relative min-h-[100svh] w-full flex flex-col justify-end pb-8 pt-[92px] overflow-hidden">
          <m.div
            variants={fadeIn()}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="absolute min-h-[100svh] inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          >
            <Image
              src={(backgroundImage as ImageType)?.imagekit?.url!}
              alt={(backgroundImage as ImageType)?.altText ?? "Hero"}
              width={819}
              height={825}
              className="h-auto w-[90%] sm:w-3/4 max-w-[800px] mx-auto z-[1] -translate-y-[15%] sm:translate-y-0"
            />
          </m.div>

          <div className="container flex flex-col z-[2]">
            {/* top */}
            <div className="w-full flex lg:items-end flex-col lg:flex-row gap-4 lg:gap-0 mb-14">
              <div className="flex-1 lg:flex-[0.5] lg:min-w-[524px] flex flex-col">
                <m.h1
                  variants={bottomInY()}
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: true }}
                  className="max-w-[524px] text-4xl sm:text-[54px] leading-none font-bold text-white"
                >
                  {mainHeading}
                </m.h1>
              </div>
              <div className="flex-1 lg:flex-[0.5] lg:pl-8">
                <m.h2
                  variants={bottomInY()}
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: true }}
                  className="max-w-[360px] text-[21px] font-medium text-white"
                >
                  {subHeading}
                </m.h2>
              </div>
            </div>

            {/* bottom */}
            <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between md:justify-start gap-6 sm:gap-0">
              <m.div
                variants={bottomInY(0.4)}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                className="lg:min-w-[524px] grid gap-3 md:flex-[0.5] text-white"
              >
                {timezones.map((item) => (
                  <Timezone key={item.id} data={item} />
                ))}
              </m.div>
              <m.ul
                variants={rightLeftContainer(0.4, 0.3, "50px")}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                className="flex flex-wrap md:flex-[0.5] gap-4 sm:gap-6 items-center sm:pl-8"
              >
                {heroLinks?.map(({ url, label, newTab }, i) => (
                  <m.li
                    key={i}
                    variants={rightLeft(0, "50px")}
                    viewport={{ once: true }}
                  >
                    <Link target={newTab ? "_blank" : "_self"} href={url}>
                      <PeelButton className="text-xs">{label}</PeelButton>
                    </Link>
                  </m.li>
                ))}
                <m.li variants={rightLeft(0, "50px")} viewport={{ once: true }}>
                  <PeelButton
                    className="text-xs"
                    onClick={() => {
                      document
                        .querySelector(".work-showcase")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    VIEW WORK
                  </PeelButton>
                </m.li>
              </m.ul>
            </div>
          </div>
        </div>
        {showcase && <HomeHeroShowcase showcase={showcase} />}
      </section>
    </LazyMotion>
  );
}
