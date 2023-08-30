import { Homepage } from "@/types/cms";

export default function HomeWorkProcess({
  process,
}: {
  process: Homepage["workProcess"];
}) {
  const { heading, subHeading, workProcess } = process;

  return (
    <section className="w-full min-h-screen px-5 sm:px-10 py-12">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="cont w-full justify-between flex flex-col lg:flex-row gap-16">
          {/* left */}
          <div className="w-full flex flex-col text-black">
            <p className="font-gaisyr text-[13px] mb-6">{heading}</p>
            <h2 className="font-sans font-semibold max-w-xs">{subHeading}</h2>
          </div>

          {/* right */}
          <div>
            <ul className="flex flex-col gap-10">
              {(workProcess ?? []).map((process, i) => {
                return (
                  <div key={i} className="flex flex-col">
                    <p className="mb-6 text-5xl sm:text-7xl font-semibold text-grey-light">
                      {(i + 1).toString().padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="mb-4">{process.title}</h3>
                      <p className="leading-[1.6]">{process.description}</p>
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
