import { Setting } from "@/types/cms";
import { getGlob } from "@/utils/api";

export default async function Head() {
  const { siteTitle, siteDescription } = await getGlob<Setting>("/settings");

  return (
    <>
      <title>{siteTitle}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={siteDescription} />
      <meta name="p:domain_verify" content="1fb6d39880f2cc44b65a2e13f408d452" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
