import { Contact, Footer, Homepage, Navigation, Setting } from "@/types/cms";
import { getGlob } from "@/utils/api";
import HomePage from "./HomePage";
import BaseLayout from "@/components/BaseLayout";

export default async function App() {
  const home = await getGlob<Homepage>(
    "/homepage",
    { depth: 3 },
    { next: { tags: ["homepage"] } }
  );
  const { topNavigation, contactLink } = await getGlob<Navigation>(
    "/navigation",
    {},
    { next: { tags: ["navigation"] } }
  );
  const contact = await getGlob<Contact>(
    "/contact",
    {},
    { next: { tags: ["contact"] } }
  );
  const { siteBranding } = await getGlob<Setting>(
    "/settings",
    {},
    { next: { tags: ["settings"] } }
  );
  const footer = await getGlob<Footer>(
    "/footer",
    {},
    { next: { tags: ["footer"] } }
  );

  return (
    <div className="bg-white flex-1 flex flex-col">
      <BaseLayout
        altBrandingColour={true}
        renderFooter={false}
        renderNav={false}
      >
        <HomePage
          home={home}
          siteBranding={siteBranding}
          navItems={topNavigation}
          contact={contact}
          contactLink={contactLink}
          footer={footer}
        />
      </BaseLayout>
    </div>
  );
}
