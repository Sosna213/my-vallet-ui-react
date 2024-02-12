import { Link, NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../constants";
import { INavLink } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";

const LeftSidebar = () => {
  const { isAuthenticated } = useAuth0();
  const { pathname } = useLocation();
  const links = isAuthenticated
    ? sidebarLinks
    : sidebarLinks.filter((link) => link.needsAuthentication != true);

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-3 m-3">
        <Link to="/" className="items-center">
          <img
            className="w-14 dark:invert ml-5"
            src={"/assets/logo.svg"}
            alt="logo"
          />
        </Link>
        <Link to="/" className="flex items-center">
          <span className=" font-bold text-2xl hidden sm:flex">My wallet</span>
        </Link>
      </div>
      <nav className="leftsidebar sm:hidden lg:inline">
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
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    width={24}
                    className={`group-hover:invert-white dark:invert ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;
