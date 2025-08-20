import sanityClient from "../studio/sanityClient";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";

const Slider = ({ slides }) => {
  return (
    <Swiper
      modules={[Keyboard, Mousewheel, Navigation, Pagination]}
      className="slider-stories section-margin my-16"
      loop={true}
      watchOverflow={true}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: false,
      }}
      mousewheel={{ forceToAxis: true }}
      pagination={{ clickable: true }}
      // navigation
    >
      {slides.map((item) => {
        const imageProps = useNextSanityImage(sanityClient, item.image);

        let textCol;
        switch (item.clientGroupCol) {
          case "red":
            textCol = "text-red";
            break;
          case "lightGreen":
            textCol = "text-lightGreen";
            break;
          case "orange":
            textCol = "text-orange";
        }

        return (
          <SwiperSlide key={item._key} className="hover:opacity-75 transition-all duration-300">
            <Link legacyBehavior href={item.target.slug.current}>
              <a>
                <figure className="relative aspect-h-1 aspect-w-1">
                  <Image
                    className="rounded-full"
                    alt={item.altText || item.title}
                    src={imageProps.src}
                    loader={imageProps.loader}
                    fill={true}
                    sizes="(max-width: 767px) 96vw, 32vw"
                    style={{objectFit: "cover"}}
                    loading="lazy"
                  />
                </figure>
                <h2 className={`${textCol} text-3xl uppercase font-bold text-center mt-16`}>
                  {item.title}
                </h2>
              </a>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
