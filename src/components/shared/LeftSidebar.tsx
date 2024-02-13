import { Link, NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../constants";
import { INavLink } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { isAuthenticated } = useAuth0();
  const { pathname } = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const links = isAuthenticated
    ? sidebarLinks
    : sidebarLinks.filter((link) => link.needsAuthentication != true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h-full flex flex-col min-w-[72px]`}>
      <div className="flex gap-3 m-3 items-center">
        <Link to="/">
          <img
            className="w-8 md:w-14 dark:invert ml-2 md:ml-5"
            src="/assets/logo.svg"
            alt="logo"
          />
        </Link>
        {!isCollapsed && (
          <Link to="/" className="hidden lg:flex">
            <span className="font-bold text-2xl">My wallet</span>
          </Link>
        )}
      </div>
      <div
        className={
          !isCollapsed ? "fixed lg:static bg-background z-50 h-full" : ""
        }
      >
        <nav
          className={`leftsidebar  ${!isCollapsed ? "lg:min-w-[260px]" : ""}`}
        >
          <div className="flex justify-center mb-3">
            <Button variant={"ghost"} onClick={toggleSidebar}>
              {isCollapsed ? "☰" : "✕"}
            </Button>
          </div>

          <ul className="flex flex-col gap-6">
            {links.map((link: INavLink) => {
              const isActive = pathname === link.route;
              return (
                <li
                  key={link.label}
                  className={`leftsidebar-link group ${
                    isActive && "dark:bg-slate-800/50 bg-slate-100/50"
                  }`}
                >
                  <NavLink
                    to={link.route}
                    className="flex gap-2 md:gap-4 items-center p-4"
                  >
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      className={`w-4 md:w-6 group-hover:invert-white dark:invert ${
                        isActive && "invert-white"
                      }`}
                    />
                    {isCollapsed ? null : link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LeftSidebar;
