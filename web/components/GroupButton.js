import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

const GroupButton = ({ title, text, bgCol, link }) => (
  <ConditionalWrapper
    condition={link}
    wrapper={(children) => {
      return link.external ? (
        <a href={link.external} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <Link href={link.internal.slug.current} passHref>
          <a>{children}</a>
        </Link>
      );
    }}
  >
    <div
      className={`client-group-button h-full p-4 flex flex-col justify-between text-white ${bgCol} ${
        link && "cursor-pointer hover:bg-opacity-75 transition-all"
      }`}
    >
      <div>
        <h2 className="text-3xl xs:text-5xl md:text-3xl font-bold uppercase tracking-wide pb-4">
          {title}
        </h2>
        <p className="text-xl md:font-light w-full">{text}</p>
      </div>
      {link && <MdArrowForward className="text-9xl hover:animate-pulse" />}
    </div>
  </ConditionalWrapper>
);

export default GroupButton;
