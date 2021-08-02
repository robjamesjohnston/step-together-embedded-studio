import Link from "next/link";

const SingleButton = ({ buttonProps, colors }) => {
  const { singleButtonText, target } = buttonProps;
  return (
    <Link href={target.slug.current} passHref>
      <button
        className={`referral-button tranition-all duration-300 w-full md:w-2/3 mx-auto p-4 my-8 text-xl tracking-widest font-medium uppercase text-center ${colors.textCol} hover:text-white ${colors.bgHovCol} border-2 ${colors.borderCol}`}
      >
        {singleButtonText}
      </button>
    </Link>
  );
};

export default SingleButton;
