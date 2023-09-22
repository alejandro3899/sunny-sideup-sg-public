import ImageKit from "@/components/ImageKit";
import { Homepage, Image } from "@/types/cms";
import { bottomInY, rightLeft, rightLeftContainer } from "@/utils/variants";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function HomeWorkSpotlight({
  workSpotlight,
}: {
  workSpotlight: Homepage["workSpotlight"];
}) {
  const { title, image, completionTime, process } = workSpotlight.workSpotlight;

  return (
    <LazyMotion features={domAnimation}>
      <section
        data-theme="light"
        className="w-full bg-white mb-0 sm:mb-20 py-8 sm:py-12 overflow-hidden"
      >
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
          {/* left */}
          <div className="flex flex-col h-full justify-between lg:min-h-[480px] gap-8 lg:gap-12">
            <m.h2
              variants={bottomInY()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl sm:text-7xl text-overflow whitespace-break-spaces sm:whitespace-normal"
              style={{ overflowWrap: "anywhere" }}
            >
              {title}
            </m.h2>

            <div className="grid grid-cols-1 w-fit">
              <m.div
                variants={rightLeftContainer(0, 0.3, "50px")}
                initial="hidden"
                whileInView="visible"
                className="max-w-2xl flex gap-2 flex-wrap mb-6"
                viewport={{ once: true }}
              >
                {(process ?? []).map((item, i) => {
                  return (
                    <m.div
                      variants={rightLeft(0, "50px")}
                      className="flex items-center border border-black rounded-full justify-center px-3 py-2"
                      key={i}
                    >
                      <span className="text-[13px] font-sans">
                        {item.title}
                      </span>
                    </m.div>
                  );
                })}
              </m.div>
              <div className="w-full flex flex-col font-sans">
                <m.p
                  variants={bottomInY()}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-[13px] font-sans"
                >
                  AVG COMPLETION TIME
                </m.p>
                <m.div
                  variants={bottomInY()}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-full"
                >
                  <m.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, type: "spring", bounce: 0 }}
                    viewport={{ once: true }}
                    className="max-w-[340px] w-full my-4 border border-black border-opacity-50"
                  />
                </m.div>
                <m.p
                  variants={bottomInY()}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-3xl font-sans"
                >
                  {completionTime}
                </m.p>
              </div>
            </div>
          </div>

          {/* right */}
          <m.div
            variants={bottomInY(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full h-full max-w-lg sm:max-w-none flex items-center justify-center"
          >
            <ImageKit
              image={image as Image}
              alt={(image as Image).altText ?? title}
              width={600}
              height={600}
              className="w-full h-auto max-w-[480px] mx-auto rounded-md"
            />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
