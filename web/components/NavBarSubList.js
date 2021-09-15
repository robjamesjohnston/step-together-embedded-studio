import { useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import ActiveLink from "./ActiveLink";

const NavBarSubList = ({ item, closeMenu }) => {
  const [open2, setOpen2] = useState(false);

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  return (
    <li
      onClick={handleClick2}
      className="text-white hover:text-lime transition duration-300 cursor-pointer pt-2 border-t"
    >
      <div className="pb-2">
        {item.link.title ? item.link.title : item.link.target.title}
        {open2 ? (
          <MdNavigateBefore className="inline text-3xl float-right" />
        ) : (
          <MdNavigateNext className="inline text-3xl float-right" />
        )}
      </div>

      <ul className={open2 ? "block" : "hidden"}>
        {item.links.map((item2) => (
          <li
            key={uuidv4()}
            className="text-white hover:text-lime transition duration-300 font-light py-2 pl-4 border-t"
          >
            <ActiveLink href={item2.target.slug.current}>
              <a onClick={closeMenu}>{item2.title ? item2.title : item2.target.title}</a>
            </ActiveLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavBarSubList;
