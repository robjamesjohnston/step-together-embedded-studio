import Link from "next/link";

const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

const SingleButton = ({ buttonProps, colors }) => {
  const { singleButtonText, link } = buttonProps;
  return (
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
      <button
        className={`referral-button tranition-all duration-300 w-full p-4 my-8 text-xl tracking-widest font-medium uppercase text-center ${colors.textCol} hover:text-white ${colors.bgHovCol} border-2 ${colors.borderCol}`}
      >
        {singleButtonText}
      </button>
    </ConditionalWrapper>
  );
};

export default SingleButton;
