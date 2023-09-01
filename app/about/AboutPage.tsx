"use client";

import { About as AboutTypes, Image } from "@/types/cms";
import slateToHtml from "@/utils/slateToHtml";
import { bottomIn, rightLeft, rightLeftContainer } from "@/utils/variants";
import { AnimatedLine } from "@/components/AnimatedLine";
import { domAnimation, LazyMotion, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

interface AboutPageProps {
  aboutData: AboutTypes;
}

export default function AboutPage({ aboutData }: AboutPageProps) {
  const { hero, intro, expertise, team, clients, recognition, work } =
    aboutData;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <style>
        {`
          .main-nav {
            width: 100%;
            max-width: 100vw;
            margin: 0;
          }
        `}
      </style>
      {loaded && (
        <LazyMotion features={domAnimation}>
          <div className="cont grid gap-24 pt-[92px]">
            <section className="relative">
              <m.h1
                variants={bottomIn()}
                initial="hidden"
                animate="visible"
                className="max-w-[630px] text-blue"
              >
                {hero!.heroHeading}
              </m.h1>
              <m.p
                variants={bottomIn(0.3)}
                initial="hidden"
                animate="visible"
                className="mt-32 max-w-[300px] text-[#7A7A7A] md:mt-[220px]"
              >
                {hero!.heroText}
              </m.p>
              {hero!.heroImage && (
                <img
                  src={(hero!.heroImage as Image)?.imagekit?.url}
                  alt={(hero!.heroImage as Image).altText}
                  className="absolute bottom-0 right-20 h-[400px]"
                />
              )}
            </section>

            <m.section
              variants={rightLeftContainer(0.8, 0.3)}
              initial="hidden"
              animate="visible"
              className="grid gap-20"
            >
              {(intro?.sections ?? []).map((section) => (
                <m.div
                  key={section.id}
                  variants={rightLeft()}
                  className="grid gap-9 md:grid-cols-5"
                >
                  <h4 className="col-span-2">{section.heading}</h4>
                  <p
                    className="col-span-3 text-[30px] leading-tight"
                    dangerouslySetInnerHTML={slateToHtml(section.content)}
                  />
                </m.div>
              ))}
            </m.section>
          </div>

          <m.section
            className="relative my-40 block h-[70px] w-screen overflow-x-hidden"
            variants={bottomIn()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Marquee speed={40} className="h-[70px]">
              {intro?.scrollingText?.split(/\r?\n|\r|\n/g).map((item) => (
                <h1 key={item} className="inline px-4 even:font-gaisyr">
                  {item}
                </h1>
              ))}
            </Marquee>
          </m.section>

          <div className="w-full cont grid gap-24 pb-20 overflow-x-hidden">
            <section className="w-full">
              <m.h2
                className="mb-9"
                variants={bottomIn()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {expertise?.heading}
              </m.h2>
              <m.div
                className="ml-auto grid gap-5 sm:flex lg:max-w-[75%]"
                variants={rightLeftContainer()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {(expertise?.sections ?? []).map((section) => (
                  <m.div
                    key={section.id}
                    className="flex gap-4 sm:block"
                    variants={rightLeft()}
                  >
                    <img
                      src={(section.image as Image)?.imagekit?.url ?? ""}
                      alt={(section.image as Image).altText}
                      className="w-[40%] max-w-[200px] sm:w-auto sm:max-w-full"
                    />
                    <div>
                      <h4 className="mb-1 sm:mt-4">{section.title}</h4>
                      <p className="p-small whitespace-pre-line">
                        {section.items}
                      </p>
                    </div>
                  </m.div>
                ))}
              </m.div>
            </section>

            <section>
              <m.h2
                className="mb-12 md:text-7xl"
                variants={bottomIn()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {team!.heading}
              </m.h2>
              <m.div
                className="grid grid-cols-2 gap-5 md:grid-cols-4"
                variants={rightLeftContainer()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {(team?.people ?? []).map((item) => (
                  <m.div key={item.id} variants={rightLeft()}>
                    <img
                      src={(item?.image as Image)?.imagekit?.url}
                      alt={(item.image as Image).altText}
                    />
                    <h4 className="mt-4 leading-[1.2]">{item.name}</h4>
                    <p className="p-small mt-1">{item.title}</p>
                  </m.div>
                ))}
              </m.div>
            </section>

            <section>
              <m.h2
                className="mb-8"
                variants={bottomIn()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {clients!.heading}
              </m.h2>
              <div className="grid gap-14">
                {(clients?.sections ?? []).map((section) => {
                  const clientList = section.clientsList.split(/\r?\n/);
                  return (
                    <m.div
                      key={section.id}
                      className="grid gap-5 md:grid-cols-3"
                      variants={rightLeft()}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <h4 className="md:mt-8">{section.heading}</h4>
                      <div className="col-span-2">
                        <AnimatedLine />
                        <m.div
                          className="flex grid-flow-col grid-cols-2 flex-col gap-y-1 gap-x-3 pt-8 sm:grid"
                          style={{
                            gridTemplateRows: `repeat(${Math.ceil(
                              clientList.length / 2
                            )}, minmax(0, 1fr))`,
                          }}
                          variants={rightLeftContainer(0, 0.05)}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          {clientList.map((client) => (
                            <m.h4
                              key={client}
                              className="flex items-center"
                              variants={rightLeft()}
                            >
                              <span className="mr-3 text-lg">→</span>
                              <span>{client}</span>
                            </m.h4>
                          ))}
                        </m.div>
                      </div>
                    </m.div>
                  );
                })}
              </div>
            </section>

            <section>
              <m.h2
                className="mb-12 md:text-7xl"
                variants={bottomIn()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {recognition!.heading}
              </m.h2>
              <div className="grid gap-10 sm:grid-cols-3">
                <m.img
                  src={(recognition!.image as Image)?.imagekit?.url}
                  alt={(recognition!.image as Image).altText}
                  className="hidden sm:block"
                  variants={rightLeft()}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
                <m.div
                  className="col-span-2"
                  variants={rightLeftContainer()}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {(recognition?.awards ?? []).map((award) => (
                    <m.div key={award.id} variants={rightLeft()}>
                      <AnimatedLine />
                      <div className="grid justify-between gap-3 py-5 sm:flex sm:py-9">
                        <h4>{award.textLeft}</h4>
                        <h4>{award.textRight}</h4>
                      </div>
                    </m.div>
                  ))}
                </m.div>
              </div>
            </section>

            <section>
              <Link href="/">
                <m.div
                  className="grid h-[575px] place-content-center rounded-[40px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${(work?.background as Image)
                      ?.imagekit?.url}")`,
                  }}
                  variants={bottomIn()}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="rounded-full bg-white/20 py-6 px-12 text-[28px] leading-none text-white">
                    {work?.buttonLabel}
                  </div>
                </m.div>
              </Link>
            </section>
          </div>
        </LazyMotion>
      )}
    </>
  );
}
