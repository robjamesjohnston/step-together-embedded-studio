const QuoteBox = ({ quoteBoxProps, colors }) => {
  const { quote, author } = quoteBoxProps;
  return (
    <section className={`quote-box ${colors.bgCol} my-8`}>
      <div className="max-w-screen-lg md:mx-auto px-4 xs:px-6 md:px-8 py-16 text-white">
        <blockquote className="text-3xl font-medium">“{quote}”</blockquote>
        <div className="pt-2 text-xl font-light uppercase tracking-wide">
          {author}
        </div>
      </div>
    </section>
  );
};

export default QuoteBox;
