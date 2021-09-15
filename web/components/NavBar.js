import { useState, useCallback, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import NavBarLogo from "./NavBarLogo";
import NavBarList from "./NavBarList";
import NavBarSubList from "./NavBarSubList";

const NavBar = ({ mainNav }) => {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
    // setOpen2(false);
  };

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(min-width: ${width}px)`);
      media.addEventListener("change", (e) => updateTarget(e));

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener("change", (e) => updateTarget(e));
    }, []);

    return targetReached;
  };

  const isBreakpoint = useMediaQuery(768); //Media query width

  const usePageOffset = (pageOffset) => {
    useEffect(() => {
      const handleOffset = () => {
        if (window.pageYOffset > pageOffset) {
          setOffset(true);
        } else setOffset(false);
      };

      window.addEventListener("scroll", handleOffset);

      return () => window.removeEventListener("scroll", handleOffset);
    }, [offset]);
  };

  usePageOffset(0); //Page offset

  return (
    <nav
      className={`sticky top-0 transition-all bg-white z-10 flex justify-between ${
        offset ? "h-16 xs:h-24 lg:h-32" : "h-32 xs:h-48 lg:h-64"
      }`}
    >
      <NavBarLogo offset={offset} isBreakpoint={isBreakpoint} />

      {/* Burger menu */}
      <div
        onClick={handleClick}
        className={`h-8 xs:h-12 lg:h-16 text-3xl xs:text-5xl lg:text-6xl m-4 xs:m-6 lg:m-8 cursor-pointer z-20 transition-all duration-300 ${
          open ? "text-white hover:text-lime" : "text-darkGrey hover:text-green"
        }`}
      >
        {open ? <MdClose onClick={closeMenu} /> : <MdMenu />}
      </div>

      {/* Overlay */}
      {isBreakpoint && open ? (
        <div onClick={closeMenu} className="fixed inset-0 bg-black opacity-50 cursor-pointer"></div>
      ) : null}

      {/* Green box */}
      <aside
        className={`h-full bg-green transition-all duration-300 fixed top-0 overflow-y-auto ${
          open ? "right-0" : "-right-full"
        } ${isBreakpoint ? "w-1/2" : "w-full"}`}
      >
        {/* List */}
        <ul className="m-4 mt-16 xs:m-6 xs:mt-24 md:m-8 md:mt-32 text-3xl font-medium border-b border-white">
          {mainNav.sections.map((item) =>
            item.link.target ? (
              <NavBarList key={uuidv4()} item={item} closeMenu={closeMenu} />
            ) : (
              <NavBarSubList key={uuidv4()} item={item} closeMenu={closeMenu} />
            )
          )}
        </ul>
      </aside>
    </nav>
  );
};

export default NavBar;
