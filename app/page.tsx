import { Homepage as HomepageTypes, Project } from "@/types/cms";
import { getColl, getGlob } from "@/utils/api";
import BaseLayout from "@/components/BaseLayout";
import dynamic from "next/dynamic";

const Homepage: any = dynamic(() => import("./Homepage"), {
  ssr: false,
});
const HomeSpline: any = dynamic(() => import("../components/HomeSpline"), {
  ssr: false,
});

export default async function Home() {
  const homepage = await getGlob<HomepageTypes>("/homepage");
  const { docs: projects } = await getColl<Project>("/projects", {
    sort: "-projectYear",
  });

  return (
    <BaseLayout fullWidth={true} renderFooter={false}>
      <HomeSpline />
      <Homepage homepageData={homepage} projectsData={projects} />
    </BaseLayout>
  );
}
