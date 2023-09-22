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
import Container from "./Container";

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
  const footer = await getGlob<FooterTypes>(
    "/footer",
    {},
    { next: { tags: ["footer"] } }
  );

  return (
    <>
      <div className="cursor hidden md:block" />
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
      <main className="relative flex-1">
        <Container>{children}</Container>
      </main>
      {renderFooter && <Footer {...footer} />}
    </>
  );
} as unknown as (props: BaseLayoutProps) => ReactElement;

export default BaseLayout;
