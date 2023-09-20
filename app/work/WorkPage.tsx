"use client";

import { Project, ProjectsHero, Image } from "@/types/cms";
import Smooth from "@/components/Smooth";
import ImageKit from "@/components/ImageKit";
import slug from "slug";
import { LazyMotion, domAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface WorkPageProps {
  workData: ProjectsHero;
  works: Project[];
}

export default function WorkPage({ workData, works = [] }: WorkPageProps) {
  const { heading, subHeading, backgroundGradient } = workData;
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLoaded(true);

    const works = document.querySelectorAll(".works .work");

    function handleMouseOver() {
      document.querySelector(".cursor")?.classList.add("view");
    }
    function handleMouseLeave() {
      document.querySelector(".cursor")?.classList.remove("view");
    }

    works.forEach((work) => {
      work.addEventListener("mouseover", () => {
        handleMouseOver();
      });
      work.addEventListener("mouseleave", () => {
        handleMouseLeave();
      });
    });

    return () => {
      works.forEach((work) => {
        work.removeEventListener("mouseover", () => {
          handleMouseOver();
        });
        work.removeEventListener("mouseleave", () => {
          handleMouseLeave();
        });
      });
    };
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
            <div className="bg-white bg-cover bg-center h-[377px] grid place-content-center text-center">
              <h1>{heading}</h1>
              {subHeading && <p className="p-small mt-3">{subHeading}</p>}
            </div>
            <div className="cont">
              <div className="works grid sm:grid-cols-2 gap-x-3 gap-y-9">
                {works.map((work) => {
                  const imgSrc = (work.thumbnail as Image)?.imagekit?.url;
                  const isGif = imgSrc?.includes(".gif");

                  return (
                    <div key={work.id}>
                      <Link
                        href={`/work/${slug(work.title)}`}
                        className="button grid gap-4"
                      >
                        <div
                          className="work group rounded-lg overflow-hidden"
                          onClick={() =>
                            router.push(`/work/${slug(work.title)}`)
                          }
                        >
                          {isGif ? (
                            <img
                              src={imgSrc}
                              alt={(work.thumbnail as Image).altText}
                              className="w-full aspect-[23/16] object-cover group-hover:scale-105 transition-all duration-[250ms] ease-in-out"
                            />
                          ) : (
                            <ImageKit
                              image={work.thumbnail as Image}
                              alt={(work.thumbnail as Image).altText}
                              className="w-full aspect-[23/16] object-cover group-hover:scale-105 transition-all duration-[250ms] ease-in-out"
                              width={770}
                              height={535}
                              sizes="100vw"
                            />
                          )}
                        </div>
                        <div className="flex items-end gap-4">
                          <div>
                            <div className="text-darkGrey mb-1 text-[12px]">
                              {work.clientName}
                            </div>
                            <h5>{work.title}</h5>
                          </div>
                          <div>
                            {(work.tags ?? []).map(({ tag }, i) => (
                              <div
                                key={i}
                                className="text-sm uppercase font-sans border border-noir px-3 py-2 rounded-full"
                              >
                                <span>{tag}</span>
                              </div>
                            ))}
                          </div>
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
