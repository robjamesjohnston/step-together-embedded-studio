//remove in production?
import { v4 as uuidv4 } from "uuid";

import ActiveLink from "./ActiveLink";

const NavbarList = ({ item, closeMenu }) => {
  return (
    <li key={uuidv4()} className="text-white hover:text-lime transition duration-300 py-2 border-t">
      <ActiveLink href={item.link.target.slug.current}>
        <a onClick={closeMenu}>{item.link.title ? item.link.title : item.link.target.title}</a>
      </ActiveLink>
    </li>
  );
};

export default NavbarList;
