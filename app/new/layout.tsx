import BaseLayout from "@/components/BaseLayout";

import "@/styles/locomotive-scroll.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white flex-1 flex flex-col">
      <BaseLayout
        altBrandingColour={true}
        renderFooter={false}
        renderNav={false}
      >
        {children}
      </BaseLayout>
    </div>
  );
}
