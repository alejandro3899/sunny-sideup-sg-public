import ImageKit from "@/components/ImageKit";
import { Homepage, Project, Image } from "@/types/cms";
import Link from "next/link";

export default function HomeShowcase({
  workShowcase,
}: {
  workShowcase: Homepage["workShowcase"];
}) {
  const { heading, subHeading, workShowcase: works } = workShowcase;

  return (
    <section className="w-full bg-white mb-0 sm:mb-20 px-4 sm:px-10 py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-[594px] mr-auto w-full flex flex-col mb-14 sm:mb-20">
          <h2 className="font-gaisyr text-[13px] text-black tracking-[0.13px] mb-4 sm:mb-6">
            {heading}
          </h2>
          <h3 className="font-sans text-3xl sm:text-5xl text-noir tracking-[-1.44px]">
            {subHeading}
          </h3>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(works ?? []).map(({ work, tag }, i) => {
            const { clientName, heroImage, slug } = work as Project;

            return (
              <div key={i} className="w-full flex flex-col">
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
                <div className="flex items-center">
                  <h3 className="text-3xl text-noir font-sans font-medium mr-4">
                    <Link href={`/work/${slug}`}>{clientName}</Link>
                  </h3>
                  {tag?.length && (
                    <div className="text-sm uppercase font-sans border border-noir px-3 py-2 rounded-full">
                      <span>{tag}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
