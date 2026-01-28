import FooterMenu from "@/components/footerMenu";
import Header from "@/components/header";
import { useAdminLayout } from "@/hooks/providers/useAdminLayout";
import { HomeIcon, Settings2Icon } from "lucide-react";
import { Outlet } from "react-router-dom";
export default function AdminTemplate() {
  const { title, leftButton, rightButton } = useAdminLayout();
  const menus = [
    {
      icon: HomeIcon,
      label: "Queues",
      href: "/queues",
    },
    {
      icon: Settings2Icon,
      label: "Config",
      href: "/config",
    },
  ];
  return (
    <div className="flex flex-col h-screen">
      <Header title={title} leftButton={leftButton} rightButton={rightButton} />
      <div className="flex-1">
        <Outlet />
      </div>
      <FooterMenu menus={menus} />
    </div>
  );
}
