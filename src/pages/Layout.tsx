import { Outlet } from "react-router-dom";
import { LeftSidebar } from "../components/shared";
import { Topbar } from "@/components/shared/topbar";

const Layout = () => {
  return (
    <div className="w-full flex">
      <LeftSidebar />

      <section className="flex-1">
        <Topbar />
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
