"use client";

import "swiper/css/bundle";
import "swiper/css/autoplay";

import { Homepage, Image } from "@/types/cms";
import { bottomInY } from "@/utils/variants";
import ImageKit from "@/components/ImageKit";
import SwiperType from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useRef, useState } from "react";
import clsx from "clsx";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function HomeTestimonials({
  testimonials,
}: {
  testimonials: Homepage["testimonials"];
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const slideRef = useRef<SwiperType | null>(null);

  function handleSlide(index: number) {
    const prev =
      tabIndex === 0
        ? (testimonials?.testimonials ?? []).length - 1
        : tabIndex - 1;
    const next =
      tabIndex === (testimonials?.testimonials ?? []).length - 1
        ? 0
        : tabIndex + 1;

    index === next
      ? slideRef.current?.slideNext()
      : index === prev
      ? slideRef.current?.slidePrev()
      : slideRef.current?.slideToLoop(index);
  }

  return (
    <LazyMotion features={domAnimation}>
      <section
        data-theme="light"
        className="w-full bg-white py-8 sm:py-12 font-sans overflow-hidden"
      >
        <m.div
          variants={bottomInY()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container"
        >
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{
              delay: 6000,
            }}
            effect="fade"
            grabCursor={true}
            loop={true}
            speed={1000}
            spaceBetween={12}
            preventInteractionOnTransition={true}
            loopPreventsSliding={true}
            onInit={(swiper) => {
              slideRef.current = swiper;
            }}
            onRealIndexChange={(swiper) => {
              setTabIndex(swiper.realIndex);
            }}
            className="w-full"
          >
            {(testimonials?.testimonials ?? []).map((t, i) => {
              const { image, imagePosition } = t.clientImage;

              return (
                <SwiperSlide key={i} className="w-full !h-auto">
                  <div className="w-full h-full flex flex-col xl:flex-row xl:justify-between items-stretch bg-grey-def rounded-md px-6 sm:px-12">
                    {/* left */}
                    <div className="w-full h-full xl:w-1/3 max-w-3xl flex flex-col justify-between py-12">
                      <div className="h-full flex">
                        <span className="text-3xl sm:text-5xl text-noir font-medium">
                          “
                        </span>
                        <div className="h-full flex flex-col justify-between gap-16">
                          <div>
                            <p className="mb-6 text-3xl sm:text-5xl text-noir font-medium md:min-w-[600px]">
                              {t.clientTestimonial}
                              <span>”</span>
                            </p>
                            <p className="text-base text-noir font-medium">{`${t.clientName}, ${t.clientRole}`}</p>
                          </div>

                          <div className="flex items-center gap-4 flex-wrap">
                            {(testimonials?.testimonials ?? []).map((_, i) => {
                              return (
                                <button
                                  key={i}
                                  className={clsx(
                                    "w-12 h-12 rounded-full cursor-pointer bg-cover bg-center outline-none border border-noir/50 overflow-hidden",
                                    "hover:opacity-100 focus:outline-none focus-visible:outline transition-all",
                                    i === tabIndex
                                      ? "opacity-100"
                                      : "opacity-50"
                                  )}
                                  style={{
                                    backgroundImage: `url("${(image as Image)
                                      ?.imagekit?.url}")`,
                                  }}
                                  onClick={() => handleSlide(i)}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* right */}
                    <div
                      className={clsx(
                        "w-full sm:w-3/4 xl:w-2/3 hidden xl:flex",
                        imagePosition === "bottom"
                          ? "items-end"
                          : "items-center"
                      )}
                    >
                      <ImageKit
                        image={image as Image}
                        alt={
                          (image as Image)?.altText ?? t?.clientName ?? "Client"
                        }
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full object-fit"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </m.div>
      </section>
    </LazyMotion>
  );
}
