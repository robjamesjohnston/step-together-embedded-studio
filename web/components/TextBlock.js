const StandoutCopy = ({ text, textCol }) => {
  let textColor;
  switch (textCol) {
    case "text-green":
      textColor = "text-green";
      break;
    case "text-lime":
      textColor = "text-lime";
      break;
    default:
      textColor = "text-darkGrey";
  }

  return (
    <section className="text-block my-8">
      <p className={`${textColor} text-3xl font-light`}>{text}</p>
    </section>
  );
};

export default StandoutCopy;
