import { GrFacebookOption, GrTwitter, GrLinkedinOption, GrYoutube } from "react-icons/gr";

const Footer = ({ facebookLink, twitterLink, linkedinLink, youTubeLink }) => (
  <footer>
    <div className="bg-darkGrey h-64 mt-8">
      <img className="w-32 p-8" src="/icon.svg" alt="Step Together" />
      <ul className="flex justify-center text-3xl text-lime">
        {facebookLink && (
          <li className="mx-2">
            <a href={facebookLink} target="_blank" rel="noopener">
              <GrFacebookOption />
            </a>
          </li>
        )}
        {twitterLink && (
          <li className="mx-2">
            <a href={twitterLink} target="_blank" rel="noopener">
              <GrTwitter />
            </a>
          </li>
        )}
        {linkedinLink && (
          <li className="mx-2">
            <a href={linkedinLink} target="_blank" rel="noopener">
              <GrLinkedinOption />
            </a>
          </li>
        )}
        {youTubeLink && (
          <li className="mx-2">
            <a href={youTubeLink} target="_blank" rel="noopener">
              <GrYoutube />
            </a>
          </li>
        )}
      </ul>
    </div>
    <div className="flex justify-between items-center bg-black text-white text-xs h-8">
      <p>&copy; 2022 Step Together Volunteering</p>
      <p>Built by R H Works</p>
    </div>
  </footer>
);

export default Footer;
