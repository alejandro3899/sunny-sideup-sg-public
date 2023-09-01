import { Homepage } from "@/types/cms";

export default function HomeWorkProcess({
  workProcess,
}: {
  workProcess: Homepage["workProcess"];
}) {
  const { heading, subHeading, workProcess: process = [] } = workProcess;

  return (
    <section
      data-theme="light"
      className="w-full min-h-screen bg-white py-8 sm:py-12 pb-28 sm:pb-32 overflow-hidden"
    >
      <div className="container">
        <div className="w-full justify-between flex flex-col lg:flex-row gap-16">
          {/* left */}
          <div className="w-full flex flex-col text-black">
            <p className="font-gaisyr text-[13px] text-noir mb-6">{heading}</p>
            <h2 className="font-sans font-semibold text-black max-w-xs">
              {subHeading}
            </h2>
          </div>

          {/* right */}
          <div>
            <ul className="flex flex-col gap-10">
              {process.map((process, i) => {
                return (
                  <div key={i} className="flex flex-col">
                    <p className="mb-6 text-5xl sm:text-7xl font-semibold text-grey-light">
                      {(i + 1).toString().padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="mb-4 text-noir">{process.title}</h3>
                      <p className="text-black leading-[1.6]">
                        {process.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
