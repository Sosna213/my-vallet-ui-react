import { INavLink } from "@/types";

export const sidebarLinks: INavLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
    needsAuthentication: false,
  },
  {
    imgURL: "/assets/icons/accounts.svg",
    route: "/accounts",
    label: "Accounts",
    needsAuthentication: true,
  },  {
    imgURL: "/assets/icons/transactions.svg",
    route: "/transactions",
    label: "Transactions",
    needsAuthentication: true,
  },
];
