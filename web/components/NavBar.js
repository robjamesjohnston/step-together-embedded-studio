import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import { MdMenu, MdClose, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
//remove in production?
import { v4 as uuidv4 } from "uuid";

const Navbar = ({ mainNav }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [offset, setOffset] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const closeMenu = () => {
    setOpen(false);
    setOpen2(false);
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
      {/* Logo */}
      <Link href="/">
        <a>
          {offset ? (
            isBreakpoint ? (
              /* Small logo at largest size */
              <img
                className="transition-all duration-75 hover:opacity-75 h-8 m-4 xs:h-12 xs:m-6 lg:h-16 lg:m-8"
                src="/logo.svg"
                alt="Step Together"
              />
            ) : (
              /* Icon */
              <img
                className="transition-all duration-75 hover:opacity-75 h-8 m-4 xs:h-12 xs:m-6 lg:h-16 lg:m-8"
                src="/icon.svg"
                alt="Step Together"
              />
            )
          ) : (
            /* Logo */
            <img
              className="transition-all duration-75 hover:opacity-75 h-16 m-8 xs:h-24 xs:m-12 lg:h-32 lg:m-16"
              src="/logo.svg"
              alt="Step Together"
            />
          )}
        </a>
      </Link>

      {/* Burger menu */}
      <div
        onClick={handleClick}
        className={`text-3xl xs:text-5xl lg:text-6xl m-4 xs:m-6 lg:m-8 cursor-pointer z-20 transition-all duration-300 ${
          open ? "text-white hover:text-lime" : "text-darkGrey hover:text-green"
        }`}
      >
        {open ? <MdClose onClick={closeMenu} /> : <MdMenu onClick={closeMenu} />}
      </div>

      {/* Overlay */}
      {isBreakpoint && open ? (
        <div onClick={closeMenu} className="fixed inset-0 bg-black opacity-50 cursor-pointer"></div>
      ) : null}

      {/* Green box */}
      <aside
        className={`h-full bg-green transition-all duration-300 fixed top-0 ${
          open ? "right-0" : "-right-full"
        } ${isBreakpoint ? "w-1/2" : "w-full"}`}
      >
        {/* List */}
        <ul className="m-4 mt-16 xs:m-6 xs:mt-24 md:m-8 md:mt-32 text-3xl font-medium border-b border-white">
          {mainNav.sections.map((item) =>
            item.link.target ? (
              <li
                key={uuidv4()}
                className="text-white hover:text-lime  transition duration-300 py-2 border-t"
              >
                <ActiveLink href={item.link.target.slug.current}>
                  <a onClick={closeMenu}>
                    {item.link.title ? item.link.title : item.link.target.title}
                  </a>
                </ActiveLink>
              </li>
            ) : (
              <li
                key={uuidv4()}
                onClick={handleClick2}
                className="text-white hover:text-lime  transition duration-300 cursor-pointer pt-2 border-t"
              >
                <div className="pb-2">
                  {item.link.title ? item.link.title : item.link.target.title}
                  {open2 ? (
                    <MdNavigateBefore className="inline text-3xl float-right" />
                  ) : (
                    <MdNavigateNext className="inline text-3xl float-right" />
                  )}
                </div>

                {/* Sub list */}
                <ul className={open2 ? "block" : "hidden"}>
                  {item.links.map((item2) => (
                    <li
                      key={uuidv4()}
                      className="text-white hover:text-lime  transition duration-300 font-light py-2 pl-4 border-t"
                    >
                      <ActiveLink href={item2.target.slug.current}>
                        <a onClick={closeMenu}>{item2.title ? item2.title : item2.target.title}</a>
                      </ActiveLink>
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
