import { Contact, Homepage, Navigation, Setting } from "@/types/cms";
import { getGlob } from "@/utils/api";
import HomePage from "./HomePage";

export default async function App() {
  const home = await getGlob<Homepage>("/homepage", { depth: 3 });
  const { topNavigation, contactLink } =
    await getGlob<Navigation>("/navigation");
  const contact = await getGlob<Contact>("/contact");
  const { siteBranding } = await getGlob<Setting>("/settings");

  return (
    <>
      <style>
        {`
        body {overscroll-behavior: none;cursor: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMCIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==),auto;}
        `}
      </style>

      <HomePage
        home={home}
        siteBranding={siteBranding}
        navItems={topNavigation}
        contact={contact}
        contactLink={contactLink}
      />
    </>
  );
}
