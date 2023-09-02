import slug from "slug";
import { Project, ProjectsHero, Image } from "@/types/cms";
import { getColl, getGlob } from "@/utils/api";
import Link from "next/link";

export default async function Work() {
  const { docs: works } = await getColl<Project>("/projects");
  const { heading, subHeading, backgroundGradient } =
    await getGlob<ProjectsHero>("/projectsHero");

  return (
    <>
      <div
        className="bg-white bg-cover bg-center h-[377px] grid place-content-center text-center"
        style={{
          backgroundImage: `linear-gradient(180deg, ${backgroundGradient} 0%, rgba(0, 0, 0, 0) 37.5%)`,
        }}
      >
        <h1>{heading}</h1>
        <p className="p-small mt-3">{subHeading}</p>
      </div>
      <div className="cont">
        <div className="grid sm:grid-cols-2 gap-x-3 gap-y-9">
          {works.map((work) => (
            <div key={work.id}>
              <Link href={`/work/${slug(work.title)}`} className="grid gap-4">
                <img
                  className="w-full aspect-[23/16] object-cover rounded-lg"
                  src={(work.thumbnail as Image)?.imagekit?.url}
                  alt={(work.thumbnail as Image).altText}
                />
                <div>
                  <div className="text-darkGrey mb-1 text-[12px]">
                    {work.clientName}
                  </div>
                  <h5>{work.title}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
