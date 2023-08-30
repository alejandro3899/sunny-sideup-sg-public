import { getGlob } from "@/utils/api";
import { Homepage } from "@/types/cms";
import HomeShowcase from "../new/HomeShowcase";
import HomeWorkSpotlight from "../new/HomeWorkSpotlight";
import HomeWorkProcess from "../new/HomeWorkProcess";
import HomeTestimonials from "../new/HomeTestimonials";

export default async function App() {
  const home = await getGlob<Homepage>("/homepage", { depth: 3 });

  return (
    <>
      <HomeShowcase works={home["workShowcase"]["workShowcase"]} />
      <HomeWorkSpotlight work={home["workSpotlight"]["workSpotlight"]} />
      <HomeTestimonials testimonials={home["testimonials"]} />
      <HomeWorkProcess process={home["workProcess"]} />
    </>
  );
}
