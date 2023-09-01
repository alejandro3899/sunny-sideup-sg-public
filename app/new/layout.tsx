import BaseLayout from "@/components/BaseLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white flex-1 flex flex-col">
      <BaseLayout
        altBrandingColour={true}
        renderFooter={true}
        renderNav={false}
      >
        {children}
      </BaseLayout>
    </div>
  );
}
