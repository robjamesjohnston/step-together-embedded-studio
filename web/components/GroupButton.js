import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

const GroupButton = ({ title, text, bgCol, backupCol, target }) => (
  <ConditionalWrapper
    condition={target}
    wrapper={(children) => (
      <Link href={target.slug.current} passHref>
        {children}
      </Link>
    )}
  >
    <div
      className={`client-group-button p-4 flex flex-col justify-between text-white ${
        bgCol ? bgCol : backupCol
      } ${target && "cursor-pointer hover:bg-opacity-75 transition-all"}`}
    >
      <div>
        <h2 className="text-3xl xs:text-5xl md:text-3xl font-bold uppercase tracking-wide pb-4">
          {title}
        </h2>
        <p className="text-xl font-light w-full">{text}</p>
      </div>
      {target && <MdArrowForward className="text-9xl hover:animate-animated hover:animate-pulse" />}
    </div>
  </ConditionalWrapper>
);

export default GroupButton;
