import type { PropsWithChildren } from "react";
import { NavLink as RouterNavLink } from "react-router";

type NavLinkProps = {
  to: string;
  style?: string;
};
const NavLink = ({
  to,
  children,
  style = "",
}: PropsWithChildren<NavLinkProps>) => {
  return (
    <li>
      <RouterNavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "text-primary " + style : style
        }
      >
        {children}
      </RouterNavLink>
    </li>
  );
};

export default NavLink;
