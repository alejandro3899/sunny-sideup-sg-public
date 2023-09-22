import { getGlob } from "@/utils/api";
import { About as AboutTypes } from "@/types/cms";
import AboutPage from "./AboutPage";

export default async function About() {
  const aboutData = await getGlob<AboutTypes>(
    "/about",
    {},
    { next: { tags: ["aboutpage"] } }
  );

  return <AboutPage aboutData={aboutData} />;
}
