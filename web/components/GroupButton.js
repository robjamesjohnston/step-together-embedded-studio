import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

const GroupButton = ({ title, text, bgCol, target }) => (
  <Link href={target.slug.current}>
    <a
      className={`client-group-button p-4 flex flex-col justify-between text-white ${bgCol} hover:bg-opacity-75 transition-all`}
    >
      <div>
        <h2 className="text-3xl xs:text-5xl md:text-3xl font-bold uppercase tracking-wide pb-4">
          {title}
        </h2>
        <p className="text-xl font-light w-full">{text}</p>
      </div>
      <MdArrowForward className="text-9xl hover:animate-animated hover:animate-pulse" />
    </a>
  </Link>
);

export default GroupButton;
