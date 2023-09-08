import { Project, ProjectsHero } from "@/types/cms";
import { getColl, getGlob } from "@/utils/api";
import WorkPage from "./WorkPage";

export default async function Work() {
  const { docs: works } = await getColl<Project>("/projects");
  const projectsHero = await getGlob<ProjectsHero>("/projectsHero");

  return <WorkPage workData={projectsHero} works={works} />;
}
