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

const BaseLayout = async function ({
  children,
  altBrandingColour,
  fullWidth = false,
  renderNav = true,
  renderFooter = false,
}: BaseLayoutProps) {
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
      <main className="relative flex-1" data-scroller>
        {children}
      </main>
      {renderFooter && <Footer {...footer} />}
    </>
  );
} as unknown as (props: BaseLayoutProps) => ReactElement;

export default BaseLayout;
