import { Outlet } from "react-router-dom";
import {Topbar, LeftSidebar} from "../components/shared"

const Layout = () => {

    return (
        <div className="w-full flex flex-1 flex-wrap">
            <Topbar />
            <LeftSidebar />

            <section className="flex flex-1 h-full">
                <Outlet />
            </section>
        </div>
    )
}

export default Layout;