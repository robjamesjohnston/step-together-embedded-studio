import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

const NavBarDonate = () => (
  <Link legacyBehavior href="/donate">
    <a>
      <div className="flex items-center text-md xs:text-xl lg:text-4xl text-darkGrey hover:text-green ml-4 my-5 xs:ml-6 xs:my-9 lg:ml-8 lg:my-10">
        <div>DONATE</div>
        <MdArrowForward className="ml-2 text-lg xs:text-2xl lg:text-5xl" />
      </div>
    </a>
  </Link>
);

export default NavBarDonate;
