import Link from "next/link";
import { GrFacebookOption, GrTwitter, GrLinkedinOption, GrYoutube } from "react-icons/gr";
import { RiExternalLinkLine } from "react-icons/ri";

const Footer = ({ footer }) => {
  const { compInfo, socialLinks } = footer;
  const { fbLink, twLink, liLink, ytLink } = socialLinks;
  return (
    <footer className="max-w-screen-xl mx-auto">
      <div className="bg-darkGrey">
        <ul className="p-8 flex justify-center text-3xl text-lime">
          {fbLink && (
            <li className="mx-2">
              <a href={fbLink} target="_blank" rel="noopener">
                <GrFacebookOption />
              </a>
            </li>
          )}
          {twLink && (
            <li className="mx-2">
              <a href={twLink} target="_blank" rel="noopener">
                <GrTwitter />
              </a>
            </li>
          )}
          {liLink && (
            <li className="mx-2">
              <a href={liLink} target="_blank" rel="noopener">
                <GrLinkedinOption />
              </a>
            </li>
          )}
          {ytLink && (
            <li className="mx-2">
              <a href={ytLink} target="_blank" rel="noopener">
                <GrYoutube />
              </a>
            </li>
          )}
        </ul>
        {compInfo && (
          <div className="mx-4 text-center text-white text-xs font-light">{compInfo}</div>
        )}
        <Link legacyBehavior href={"/"} passHref>
          <img src="/icon.svg" className="w-24 p-8 mx-auto cursor-pointer" alt="Step Together" />
        </Link>
      </div>
      <div className="flex justify-center items-center bg-black text-white text-xs font-light">
        <div className="mx-2 p-2 flex">
          &copy; {new Date().getFullYear()} Step Together Volunteering
          <span className="mx-2">|</span>
          Built by&nbsp;
          <a href="https://rhworks.co" className="border-b" target="_blank" rel="noopener">
            R H Works
            <RiExternalLinkLine className="inline ml-1 border-0 mb-1" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
