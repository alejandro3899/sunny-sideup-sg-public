import { Image, Project } from "@/types/cms";
import { getColl } from "@/utils/api";
import slug from "slug";
import ProjectDescription from "./ProjectDescription";
import ProjectSections from "./ProjectSections";

export async function generateStaticParams() {
  const { docs: works } = await getColl<Project>("/projects");

  return works.map((work) => ({
    slug: slug(work.title),
  }));
}

interface WorkDetailsProps {
  params: { slug: string };
}

export default async function WorkDetails({ params }: WorkDetailsProps) {
  const { docs } = await getColl<Project>("/projects", {
    where: { slug: { equals: params.slug } },
  });
  const project = docs[0];

  return (
    <>
      <div
        className="h-[350px] bg-cover bg-center sm:h-[500px]"
        style={{
          backgroundImage: `url('${(project.heroImage as Image)?.imagekit
            ?.url}')`,
        }}
      />
      <div className="cont grid gap-14 pt-8 pb-20 md:gap-20">
        <ProjectDescription project={project} />
        <ProjectSections project={project} />
      </div>
    </>
  );
}
