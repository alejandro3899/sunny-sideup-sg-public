import ImageKit from "@/components/ImageKit";
import { Homepage, Image } from "@/types/cms";

export default function HomeWorkSpotlight({
  workSpotlight,
}: {
  workSpotlight: Homepage["workSpotlight"];
}) {
  const { title, image, completionTime, process } = workSpotlight.workSpotlight;

  return (
    <section className="w-full bg-white mb-0 sm:mb-20 px-4 sm:px-10 py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
        {/* left */}
        <div className="flex flex-col h-full justify-between lg:min-h-[480px] gap-8 lg:gap-12">
          <h2
            className="text-4xl sm:text-7xl text-overflow whitespace-break-spaces"
            style={{ overflowWrap: "anywhere" }}
          >
            {title}
          </h2>

          <div className="grid grid-cols-1 w-fit">
            <div className="flex gap-4 flex-wrap mb-6">
              {(process ?? []).map((item, i) => {
                return (
                  <div
                    className="flex items-center border border-black rounded-full justify-center px-3 py-2"
                    key={i}
                  >
                    <span className="text-[13px] font-sans">{item.title}</span>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex flex-col font-sans">
              <p className="text-[13px] font-sans">AVG COMPLETION TIME</p>
              <div className="w-full min-w-[150px] my-4 border border-black border-opacity-50" />
              <p className="text-3xl font-sans">{completionTime}</p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-full h-full max-w-lg sm:max-w-none flex items-center justify-center">
          <ImageKit
            image={image as Image}
            alt={(image as Image).altText ?? title}
            width={600}
            height={600}
            className="w-full h-auto max-w-[480px] mx-auto rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
