"use client";

import { Project, ProjectsHero, Image } from "@/types/cms";
import slug from "slug";
import Link from "next/link";
import Smooth from "@/components/Smooth";
import { LazyMotion, domAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import ImageKit from "@/components/ImageKit";

interface WorkPageProps {
  workData: ProjectsHero;
  works: Project[];
}

export default function WorkPage({ workData, works = [] }: WorkPageProps) {
  const { heading, subHeading, backgroundGradient } = workData;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <style>
        {`
          body {
            background-color: white;
          }
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: rgb(235, 235, 235);
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgb(205, 205, 205);
            border-radius: 6px;
          }
          ::-webkit-scrollbar-thumb:hover {
            cursor: pointer;
            background-color: rgb(190, 190, 190);
          }
        `}
      </style>

      <Smooth data-scroller>
        {loaded && (
          <LazyMotion features={domAnimation}>
            <div
              className="bg-white bg-cover bg-center h-[377px] grid place-content-center text-center"
              style={{
                backgroundImage: `linear-gradient(180deg, ${backgroundGradient} 0%, rgba(0, 0, 0, 0) 37.5%)`,
              }}
            >
              <h1>{heading}</h1>
              <p className="p-small mt-3">{subHeading}</p>
            </div>
            <div className="cont">
              <div className="grid sm:grid-cols-2 gap-x-3 gap-y-9">
                {works.map((work) => {
                  const imgSrc = (work.thumbnail as Image)?.imagekit?.url;
                  const isGif = imgSrc?.includes(".gif");

                  return (
                    <div key={work.id}>
                      <Link
                        href={`/work/${slug(work.title)}`}
                        className="button grid gap-4"
                      >
                        {isGif ? (
                          <img
                            src={imgSrc}
                            alt={(work.thumbnail as Image).altText}
                            className="w-full aspect-[23/16] object-cover rounded-lg"
                          />
                        ) : (
                          <ImageKit
                            image={work.thumbnail as Image}
                            alt={(work.thumbnail as Image).altText}
                            className="w-full aspect-[23/16] object-cover rounded-lg"
                            width={770}
                            height={535}
                            sizes="100vw"
                          />
                        )}
                        <div>
                          <div className="text-darkGrey mb-1 text-[12px]">
                            {work.clientName}
                          </div>
                          <h5>{work.title}</h5>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </LazyMotion>
        )}
      </Smooth>
    </>
  );
}
