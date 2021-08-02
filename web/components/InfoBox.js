import Link from "next/link";

const InfoBox = ({ infoBoxProps, backupCol }) => {
  const { title, text, buttonText, target, bgCol } = infoBoxProps;
  let backgroundCol;
  switch (bgCol) {
    case "lime":
      backgroundCol = "bg-lime";
      break;
    case "darkGrey":
      backgroundCol = "bg-darkGrey";
      break;
    default:
      backgroundCol = "bg-green";
  }

  let textHovCol;
  switch (bgCol) {
    case "lime":
      textHovCol = "hover:text-lime";
      break;
    case "darkGrey":
      textHovCol = "hover:text-darkGrey";
      break;
    default:
      textHovCol = "hover:text-green";
  }

  return (
    <section className={`info-box my-8 ${backgroundCol ? backgroundCol : backupCol.bgCol}`}>
      <div className="max-w-6xl m-auto p-4 xs:p-6 md:p-8 md:flex md:space-x-8">
        <h2 className="text-white text-3xl pb-2 font-bold tracking-wide uppercase md:w-1/2">
          {title}
        </h2>
        <div className="md:w-1/2 text-white text-xl font-light">
          {text}
          <Link href={target.slug.current} passHref>
            <button
              className={`transition-all duration-300 border-2 border-white hover:bg-white uppercase text-xl font-medium tracking-widest text-white ${
                textHovCol ? textHovCol : backupCol.textHovCol
              } w-full p-4 mt-8 mb-2`}
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InfoBox;
