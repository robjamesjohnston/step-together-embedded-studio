import Link from "next/link";

const QuoteBox = ({ quoteBoxProps, colors }) => {
  const { quote, author } = quoteBoxProps;
  return (
    <section className={`quote-box ${colors.bgCol} my-8`}>
      <div className="md:mx-auto max-w-6xl px-4 xs:px-6 md:px-8 py-16 text-white">
        <blockquote className="md:mx-auto md:w-2/3 text-3xl font-medium">“{quote}”</blockquote>
        <div className="md:mx-auto md:w-2/3 pt-2 text-xl font-light uppercase tracking-wide">
          {author}
        </div>
      </div>
    </section>
  );
};

export default QuoteBox;
