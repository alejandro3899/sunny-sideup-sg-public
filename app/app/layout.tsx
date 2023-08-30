import BaseLayout from "@/components/BaseLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white flex-1 flex flex-col">
      <BaseLayout
        renderNav={false}
        renderFooter={true}
        altBrandingColour={true}
      >
        {children}
      </BaseLayout>
    </div>
  );
}
