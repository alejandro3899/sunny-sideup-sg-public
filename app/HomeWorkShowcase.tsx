import { Homepage, Project, Image } from "@/types/cms";
import { bottomInY, rightLeft, rightLeftContainer } from "@/utils/variants";
import ImageKit from "@/components/ImageKit";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeShowcase({
  workShowcase,
}: {
  workShowcase: Homepage["workShowcase"];
}) {
  const router = useRouter();
  const { heading, subHeading, workShowcase: works } = workShowcase;

  useEffect(() => {
    const works = document.querySelectorAll(".home-work-showcase .work");

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
    <LazyMotion features={domAnimation}>
      <section
        data-theme="light"
        className="home-work-showcase w-full bg-white mb-0 sm:mb-20 py-8 sm:py-12 overflow-hidden"
      >
        <div className="container overflow-hidden">
          <div className="max-w-[594px] mr-auto w-full flex flex-col mb-14 sm:mb-20">
            <m.h2
              variants={bottomInY()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-gaisyr text-[13px] text-black tracking-[0.13px] mb-4 sm:mb-6"
            >
              {heading}
            </m.h2>
            <m.h3
              variants={bottomInY()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-sans text-3xl sm:text-5xl text-noir tracking-[-1.44px]"
            >
              {subHeading}
            </m.h3>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-8">
            {(works ?? []).map(({ work, media }, i) => {
              const {
                clientName,
                heroImage,
                slug,
                tags = [],
              } = work as Project;

              const hasMedia = !!media;
              const isVideo = (media as Image)?.mimeType?.includes("video");
              const url = (media as Image)?.imagekit?.url!;

              return (
                <div key={i} className="w-full flex flex-col">
                  <m.div
                    variants={bottomInY(0, false)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="work group w-full h-[420px] sm:h-[500px] rounded-lg overflow-hidden mb-4"
                    onClick={() => {
                      router.push(`/work/${slug}`);
                    }}
                  >
                    {hasMedia ? (
                      <>
                        {isVideo ? (
                          <video
                            muted
                            playsInline
                            controls={false}
                            autoPlay
                            loop
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[250ms] ease-in-out"
                          >
                            <source src={url} />
                            <p className="w-full flex justify-center items-center text-center text-base">
                              Your browser doesn&apos;t support HTML video. Here
                              is a<a href={url}>link to the video</a> instead.
                            </p>
                          </video>
                        ) : (
                          <ImageKit
                            image={media as Image}
                            alt={(media as Image)?.altText ?? clientName}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[250ms] ease-in-out"
                          />
                        )}
                      </>
                    ) : (
                      <ImageKit
                        image={heroImage as Image}
                        alt={(heroImage as Image)?.altText ?? clientName}
                        sizes="100vw"
                        width={0}
                        height={0}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[250ms] ease-in-out"
                      />
                    )}
                  </m.div>
                  <m.div
                    variants={rightLeftContainer(0, 0.3, "50px")}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <m.h3
                      variants={rightLeft(0, "50px")}
                      viewport={{ once: true }}
                      className="text-3xl text-noir font-sans font-medium mr-4"
                    >
                      <Link
                        target="_blank"
                        href={`/work/${slug}`}
                        className="button"
                      >
                        {clientName}
                      </Link>
                    </m.h3>
                    {tags.length >= 1 && (
                      <div className="flex gap-4">
                        {tags.map(({ tag }, i) => (
                          <m.div
                            key={i}
                            variants={rightLeft(0, "50px")}
                            viewport={{ once: true }}
                            className="text-sm uppercase font-sans border border-noir px-3 py-2 rounded-full"
                          >
                            <span>{tag}</span>
                          </m.div>
                        ))}
                      </div>
                    )}
                  </m.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
