import { Outlet } from "react-router-dom";
import {Topbar, LeftSidebar} from "../components/shared"

const Layout = () => {

    return (
        <div className="w-full flex flex-wrap colun">
            <Topbar />
            <LeftSidebar />

            <section className="flex flex-1">
                <Outlet />
            </section>
        </div>
    )
}

export default Layout;