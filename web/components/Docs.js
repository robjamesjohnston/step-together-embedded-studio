import Link from "next/link";

const Docs = ({ docProps, colors }) => (
  <section className="group-docs">
    <ul className={`list-none pl-0 border-t ${colors.borderCol}`}>
      {docProps.map((item) => (
        <Link href={`${item.fileURL}?dl=`} key={item.file._id} passHref>
          <li
            className={`${colors.borderCol} flex flex-col md:flex-row border-b text-3xl py-2 cursor-pointer`}
          >
            <div className="md:w-1/2 font-medium">{item.file.name}</div>
            <div className="md:w-1/2">{item.file.description}</div>
          </li>
        </Link>
      ))}
    </ul>
  </section>
);

export default Docs;
