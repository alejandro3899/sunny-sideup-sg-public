import { Homepage, Image as ImageType } from "@/types/cms";
import PeelButton from "@/components/PeelButton";
import Timezone from "@/components/Timezone";
import Image from "next/image";
import Link from "next/link";

export default function HomeHero({ hero }: { hero: Homepage["hero"] }) {
  const {
    mainHeading,
    subHeading,
    backgroundImage,
    timezones = [],
    heroLinks = [],
  } = hero;

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end bg-black text-white pt-[92px] pb-8">
      <div className="absolute min-h-screen inset-0 w-full h-full flex items-center justify-center">
        <Image
          src={(backgroundImage as ImageType)?.imagekit?.url!}
          alt={(backgroundImage as ImageType)?.altText ?? "Hero"}
          width={819}
          height={825}
          className="h-auto w-[90%] sm:w-3/4 max-w-[800px] mx-auto z-[1]"
        />
      </div>

      <div className="container flex flex-col z-[2]">
        {/* top */}
        <div className="w-full flex lg:items-end flex-col lg:flex-row gap-4 lg:gap-0 mb-14">
          <div className="flex-1 lg:flex-[0.5] lg:min-w-[524px] flex flex-col">
            <h1 className="max-w-[524px] text-4xl sm:text-[54px] leading-none font-bold text-white">
              {mainHeading}
            </h1>
          </div>
          <div className="flex-1 lg:flex-[0.5] lg:pl-8">
            <h2 className="max-w-[360px] text-[21px] font-medium text-white">
              {subHeading}
            </h2>
          </div>
        </div>

        {/* bottom */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between md:justify-start gap-6 sm:gap-0">
          <div className="lg:min-w-[524px] grid gap-3 md:flex-[0.5] text-white">
            {timezones.map((item) => (
              <Timezone key={item.id} data={item} />
            ))}
          </div>
          <div className="flex flex-wrap md:flex-[0.5] gap-4 sm:gap-6 items-center sm:pl-8">
            {heroLinks?.map(({ url, label, newTab }, i) => (
              <Link key={i} target={newTab ? "_blank" : "_self"} href={url}>
                <PeelButton className="text-xs">{label}</PeelButton>
              </Link>
            ))}
            <PeelButton className="text-xs">VIEW WORK</PeelButton>
          </div>
        </div>
      </div>
    </section>
  );
}
