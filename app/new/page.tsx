import { Contact, Footer, Homepage, Navigation, Setting } from "@/types/cms";
import { getGlob } from "@/utils/api";
import HomePage from "./HomePage";

export default async function App() {
  const home = await getGlob<Homepage>("/homepage", { depth: 3 });
  const { topNavigation, contactLink } =
    await getGlob<Navigation>("/navigation");
  const contact = await getGlob<Contact>("/contact");
  const { siteBranding } = await getGlob<Setting>("/settings");
  const footer = await getGlob<Footer>("/footer");

  return (
    <>
      <HomePage
        home={home}
        siteBranding={siteBranding}
        navItems={topNavigation}
        contact={contact}
        contactLink={contactLink}
        footer={footer}
      />
    </>
  );
}
