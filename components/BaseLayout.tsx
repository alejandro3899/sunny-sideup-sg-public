import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import { getGlob } from "@/utils/api";
import {
  Contact,
  Footer as FooterTypes,
  Navigation,
  Setting,
} from "@/types/cms";
import { ReactElement } from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
  altBrandingColour?: boolean;
  fullWidth?: boolean;
  renderNav?: boolean;
  renderFooter?: boolean;
}

export default async function BaseLayout({
  children,
  altBrandingColour,
  fullWidth = false,
  renderNav = true,
  renderFooter = false,
}: BaseLayoutProps): Promise<ReactElement> {
  const { topNavigation, contactLink } =
    await getGlob<Navigation>("/navigation");
  const contact = await getGlob<Contact>("/contact");
  const { siteBranding } = await getGlob<Setting>("/settings");
  const footer = await getGlob<FooterTypes>("/footer");

  return (
    <>
      {renderNav && (
        <MainNav
          siteBranding={siteBranding}
          navItems={topNavigation}
          contactLink={contactLink}
          contact={contact}
          altBrandingColour={altBrandingColour}
          fullWidth={fullWidth}
        />
      )}
      <main className="flex-1">{children}</main>
      {renderFooter && <Footer {...footer} />}
    </>
  );
}
