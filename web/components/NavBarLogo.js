import Link from "next/link";

const NavBarLogo = ({ offset, isBreakpoint }) => {
  return (
    <Link href="/">
      <a>
        {offset ? (
          isBreakpoint ? (
            /* Small logo at largest size */
            <img
              className="transition-all duration-75 hover:opacity-75 h-8 mx-auto my-4 xs:h-12 xs:my-6 lg:h-16 lg:my-8"
              src="/logo.svg"
              alt="Step Together"
            />
          ) : (
            /* Icon */
            <img
              className="transition-all duration-75 hover:opacity-75 h-8 mx-auto my-4 xs:h-12 xs:my-6 lg:h-16 lg:my-8"
              src="/icon.svg"
              alt="Step Together"
            />
          )
        ) : (
          /* Logo */
          <img
            className="transition-all duration-75 hover:opacity-75 h-12 mx-auto my-6 xs:h-18 xs:my-9 lg:h-24 lg:my-12"
            src="/logo.svg"
            alt="Step Together"
          />
        )}
      </a>
    </Link>
  );
};

export default NavBarLogo;
