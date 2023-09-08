import { Project } from "@/types/cms";
import { getColl } from "@/utils/api";
import WorkPage from "./WorkPage";
import slug from "slug";

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

  return <WorkPage project={project} />;
}
