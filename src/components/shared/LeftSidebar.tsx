import { NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../constants";
import { INavLink } from "../../types";

const LeftSidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="leftsidebar">
      <ul className="flex flex-col gap-6">
        {sidebarLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;

          return (
            <li
              key={link.label}
              className={`leftsidebar-link group ${
                isActive && "bg-primary-500"
              }`}
            >
              <NavLink to={link.route} className="flex gap-4 items-center p-4">
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  className={`group-hover:invert-white invert ${
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
  );
};

export default LeftSidebar;
