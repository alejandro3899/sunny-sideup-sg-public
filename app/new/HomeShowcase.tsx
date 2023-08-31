import ImageKit from "@/components/ImageKit";
import { Homepage, Project, Image } from "@/types/cms";

export default function HomeShowcase({
  works,
}: {
  works: Homepage["workShowcase"]["workShowcase"];
}) {
  return (
    <section className="w-full bg-white mb-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(works ?? []).map(({ work, tag }, i) => {
          const { clientName, heroImage } = work as Project;

          return (
            <div key={i} className="w-full flex flex-col">
              <div
                key={i}
                className="w-full h-[500px] rounded-md overflow-hidden mb-4"
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
                <h3 className="text-3xl font-sans font-medium mr-4">
                  {clientName}
                </h3>
                {tag?.length && (
                  <div className="text-sm uppercase font-sans border border-black px-3 py-2 rounded-full">
                    <span>{tag}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
