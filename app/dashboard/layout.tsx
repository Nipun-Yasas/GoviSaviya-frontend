import { Metadata } from "next";
import { DashboardLayoutClient } from "../components/layout/DashboardLayoutClient";

export const metadata: Metadata = {
  title: "Dashboard | SmartAgri",
  description: "Manage your farm, predict yields, and monitor weather.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
