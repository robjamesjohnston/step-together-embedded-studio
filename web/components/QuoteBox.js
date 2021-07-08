import Link from "next/link";

const QuoteBox = ({ quoteBoxProps, colors }) => {
  const { quote, author } = quoteBoxProps;
  return (
    <section className={`quote-box ${colors.bgCol} my-8`}>
      <div className="max-w-6xl m-auto px-16 xs:px-24 md:px-32 py-16 text-white">
        <blockquote className=" text-3xl font-medium">“{quote}”</blockquote>
        <div className="pt-2 text-xl font-light uppercase tracking-wide">{author}</div>
      </div>
    </section>
  );
};

export default QuoteBox;
