const QuoteBox = ({ quoteBoxProps, colors }) => {
  const { quote, author } = quoteBoxProps;
  return (
    <section className={`quote-box full-width section-padding ${colors.bgCol}`}>
      <div className="max-w-screen-md section-margin mx-auto py-16 xs:py-24 md:py-32 text-white">
        <blockquote className="text-3xl font-medium">“{quote}”</blockquote>
        <div className="pt-2 text-xl font-light uppercase tracking-wide">{author}</div>
      </div>
    </section>
  );
};

export default QuoteBox;
