const QuoteBox = ({ quoteBoxProps, colors }) => {
  const { quote, author } = quoteBoxProps;
  return (
    <section className={`quote-box ${colors.bgCol}`}>
      <div className="max-w-screen-lg md:mx-auto px-4 py-16 xs:px-6 xs:py-24 md:px-8 md:py-32 text-white">
        <blockquote className="text-3xl font-medium">“{quote}”</blockquote>
        <div className="pt-2 text-xl font-light uppercase tracking-wide">{author}</div>
      </div>
    </section>
  );
};

export default QuoteBox;
