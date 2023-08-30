import BaseLayout from "@/components/BaseLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black flex-1 flex flex-col">
      <BaseLayout
        renderNav={false}
        altBrandingColour={true}
        renderFooter={false}
      >
        {children}
      </BaseLayout>
    </div>
  );
}
