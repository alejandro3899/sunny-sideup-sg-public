import { Project } from "@/types/cms";
import { getColl } from "@/utils/api";
import WorkPage from "./WorkPage";
import slug from "slug";
import { notFound } from "next/navigation";

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
  const slug = params.slug;
  const { docs } = await getColl<Project>(
    "/projects",
    {
      where: { slug: { equals: slug } },
    },
    {
      next: { tags: [`project-${slug}`, "projects"] },
    }
  );
  const project = docs?.[0];

  if (!project) {
    return notFound();
  }

  return <WorkPage project={project} />;
}
