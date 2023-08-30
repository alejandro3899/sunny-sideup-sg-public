"use client";

import "swiper/css/bundle";
import "swiper/css/autoplay";

import ImageKit from "@/components/ImageKit";
import { Homepage, Image } from "@/types/cms";
import SwiperType from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useState } from "react";

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
    <section className="w-full px-5 sm:px-10 py-12 font-sans">
      <div className="w-full max-w-[1400px] mx-auto">
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 6000,
          }}
          slidesPerGroup={1}
          slidesPerView={1}
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
            return (
              <SwiperSlide key={i} className="w-full">
                <div className="w-full flex flex-col xl:flex-row xl:justify-between items-stretch bg-grey-def rounded-md px-6 sm:px-12">
                  {/* left */}
                  <div className="w-full xl:w-1/3 max-w-3xl flex flex-col justify-between py-12 gap-16">
                    <div>
                      <p className="mb-6 text-3xl sm:text-5xl md:min-w-[600px]">
                        “{t.clientTestimonial}”
                      </p>
                      <p className="text-base font-medium">{`${t.clientName}, ${t.clientRole}`}</p>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      {(testimonials?.testimonials ?? []).map((t, i) => {
                        return (
                          <div
                            key={i}
                            className="w-12 h-12 rounded-full cursor-pointer bg-cover bg-center border border-black/50 hover:border-black transition-all"
                            style={{
                              backgroundImage: `url("${(t.clientImage as Image)
                                ?.imagekit?.url}")`,
                            }}
                            onClick={() => handleSlide(i)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* right */}
                  <div className="w-full sm:w-3/4 xl:w-2/3 hidden xl:flex items-end">
                    <ImageKit
                      image={t.clientImage as Image}
                      alt={
                        (t.clientImage as Image)?.altText ??
                        t?.clientName ??
                        "Client"
                      }
                      height={500}
                      width={500}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
