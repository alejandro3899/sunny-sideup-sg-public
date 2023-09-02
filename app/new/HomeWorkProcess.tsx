import { Homepage } from "@/types/cms";
import { bottomInY, rightLeft, rightLeftContainer } from "@/utils/variants";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function HomeWorkProcess({
  workProcess,
}: {
  workProcess: Homepage["workProcess"];
}) {
  const { heading, subHeading, workProcess: process = [] } = workProcess;

  return (
    <LazyMotion features={domAnimation}>
      <section
        data-theme="light"
        className="w-full min-h-[100svh] bg-white py-8 sm:py-12 pb-28 sm:pb-32 overflow-hidden"
      >
        <div className="container">
          <div className="w-full justify-between flex flex-col lg:flex-row gap-16">
            {/* left */}
            <div className="w-full flex flex-col text-black">
              <m.h2
                variants={bottomInY()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-gaisyr text-[13px] text-noir mb-6"
              >
                {heading}
              </m.h2>
              <m.h3
                variants={bottomInY()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl sm:text-[54px] font-sans font-semibold text-black leading-none tracking-[-1.62px] max-w-xs"
              >
                {subHeading}
              </m.h3>
            </div>

            {/* right */}
            <div>
              <ul className="flex flex-col gap-10">
                {process.map((process, i) => {
                  return (
                    <m.div
                      variants={rightLeftContainer(
                        i === 0 ? 0.4 : 0.4 + 0.4 * ((i + 1) / 3),
                        0.3,
                        "30px"
                      )}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      key={i}
                      className="flex flex-col"
                    >
                      <m.p
                        variants={rightLeft(0, "30px")}
                        viewport={{ once: true }}
                        className="mb-6 text-5xl sm:text-7xl font-semibold text-grey-light"
                      >
                        {(i + 1).toString().padStart(2, "0")}
                      </m.p>
                      <m.div
                        variants={rightLeft(0, "-50px")}
                        viewport={{ once: true }}
                      >
                        <h3 className="mb-4 text-noir">{process.title}</h3>
                        <p className="text-black leading-[1.6]">
                          {process.description}
                        </p>
                      </m.div>
                    </m.div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
