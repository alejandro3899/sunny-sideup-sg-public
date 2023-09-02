import { Homepage, Project, Image } from "@/types/cms";
import { bottomInY, rightLeft, rightLeftContainer } from "@/utils/variants";
import ImageKit from "@/components/ImageKit";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";

export default function HomeShowcase({
  workShowcase,
}: {
  workShowcase: Homepage["workShowcase"];
}) {
  const { heading, subHeading, workShowcase: works } = workShowcase;

  return (
    <LazyMotion features={domAnimation}>
      <section
        data-theme="light"
        className="work-showcase w-full bg-white mb-0 sm:mb-20 py-8 sm:py-12 overflow-hidden"
      >
        <div className="container">
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
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(works ?? []).map(({ work, tag }, i) => {
              const { clientName, heroImage, slug } = work as Project;

              return (
                <m.div
                  key={i}
                  variants={bottomInY()}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-full flex flex-col"
                >
                  <div
                    key={i}
                    className="w-full h-[420px] sm:h-[500px] rounded-md overflow-hidden mb-4"
                  >
                    <ImageKit
                      image={heroImage as Image}
                      width={800}
                      height={800}
                      alt={(heroImage as Image)?.altText ?? clientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
                      <Link target="_blank" href={`/work/${slug}`}>
                        {clientName}
                      </Link>
                    </m.h3>
                    {tag && (
                      <m.div
                        variants={rightLeft(0, "50px")}
                        viewport={{ once: true }}
                        className="text-sm uppercase font-sans border border-noir px-3 py-2 rounded-full"
                      >
                        <span>{tag}</span>
                      </m.div>
                    )}
                  </m.div>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
