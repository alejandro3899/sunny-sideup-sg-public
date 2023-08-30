import BaseLayout from "@/components/BaseLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout>{children}</BaseLayout>;
}
