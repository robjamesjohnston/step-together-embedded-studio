import Link from "next/link";
import sanityClient from "../studio/sanityClient";
import { useNextSanityImage } from "next-sanity-image";

const logoImageBuilder = (imageUrlBuilder, options) => {
  return imageUrlBuilder
    .width(options.width || Math.min(options.originalImageDimensions.width, 600))
    .quality(options.quality || 75);
};

const NavBarLogo = ({ offset, isBreakpoint, headerLogo }) => {
  const logoImageProps = useNextSanityImage(sanityClient, headerLogo, {
    imageBuilder: logoImageBuilder,
  });

  return (
    <Link legacyBehavior href="/">
      <a>
        {offset ? (
          isBreakpoint ? (
            /* Small logo at largest size */
            <img
              className="transition-all duration-75 hover:opacity-75 h-8 mx-auto my-4 xs:h-12 xs:my-6 lg:h-16 lg:my-8"
              src={logoImageProps.src}
              alt="Step Together"
            />
          ) : (
            /* Icon */
            <img
              className="transition-all duration-75 hover:opacity-75 h-8 mx-auto my-4 xs:h-12 xs:my-6 lg:h-16 lg:my-8"
              src="/icon.svg"
              alt="Step Together"
            />
          )
        ) : (
          /* Logo */
          <img
            className="transition-all duration-75 hover:opacity-75 h-12 mx-auto my-6 xs:h-18 xs:my-9 lg:h-24 lg:my-12"
            src={logoImageProps.src}
            alt="Step Together"
          />
        )}
      </a>
    </Link>
  );
};

export default NavBarLogo;
