import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

const NavBarDonate = () => (
  <Link href="/donate2">
    <a>
      <div className="sm:flex text-xl xs:text-2xl lg:text-3xl text-darkGrey hover:text-green ml-4 my-4 xs:ml-6 xs:my-8 lg:ml-8 lg:my-11">
        <div>DONATE</div>
        <MdArrowForward className="text-2xl xs:text-3xl lg:text-4xl sm:ml-2" />
      </div>
    </a>
  </Link>
);

export default NavBarDonate;
