import sanityClient from "../client";
import SwiperCore, { Keyboard, Mousewheel, Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";

SwiperCore.use([Keyboard, Mousewheel, Navigation, Pagination, Autoplay]);

const MainSlider = ({ mainSlider }) => {
  return (
    <Swiper
      className="main-slider mb-8"
      loop={true}
      autoplay={{
        delay: 5000,
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: false,
      }}
      mousewheel={{ forceToAxis: true }}
      pagination={{ clickable: true }}
      // navigation
    >
      {mainSlider.map((item) => {
        const imageProps = useNextSanityImage(sanityClient, item.image);

        let bgCol;
        switch (item.clientGroupCol) {
          case "red":
            bgCol = "bg-red";
            break;
          case "lightGreen":
            bgCol = "bg-lightGreen";
            break;
          case "orange":
            bgCol = "bg-orange";
        }

        return (
          <SwiperSlide key={item._key} className="hover:opacity-75 transition-all duration-300">
            <Link legacyBehavior href={item.target.slug.current}>
              <a className="lg:flex">
                {/* 4, 2, 1 – 16:9
                    3, 2, 1 – 6:4 */}
                <figure className="aspect-w-6 aspect-h-3 lg:aspect-h-2 lg:w-1/2">
                  <Image
                    alt={item.altText}
                    src={imageProps.src}
                    loader={imageProps.loader}
                    layout="fill"
                    objectFit="cover"
                  />
                </figure>
                <div className={`${bgCol} aspect-w-6 aspect-h-3 lg:aspect-h-2 lg:w-1/2`}>
                  <h2 className="p-4 text-5xl xs:text-7xl xl:text-8xl font-bold tracking-wide uppercase text-white">
                    {item.title}
                  </h2>
                </div>
              </a>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MainSlider;
