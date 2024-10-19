import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <Layout>{children}</Layout>;
}