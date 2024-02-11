"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const heroImages = [
  { imgUrl: '/assets/images/headp.webp',alt: 'Headphones'},
  { imgUrl: '/assets/images/monitor1.jpg',alt: 'monitor'},
  { imgUrl: '/assets/images/hero-3.svg',alt: 'lamp'},
  { imgUrl: '/assets/images/hero-2.svg',alt: 'bag'},
  { imgUrl: '/assets/images/hero-5.svg',alt: 'chair'},
]
const HeroCarousel = () => {
  return (
    <div className="relative sm:px-10 py-5 sm:pt-20 pb-5 max-w-[560px] h-[700px] w-full bg-[#FFFFFF] rounded-[30px] sm:mx-auto">
       <Carousel
       showThumbs={false}
       autoplay
       infiniteLoop
       interval={2000}
       showArrows={false}
       showStatus={false}
       >
        {heroImages.map((image) => (
          <Image 
          src={image.imgUrl}
          alt={image.alt}
          width={484}
          height={484}
          className="object-contain"
          key={image.alt} />
        ))}
              </Carousel>

              <Image
              src="assets/icons/hand-drawn-arrow.svg"
              alt="arrow"
              width={150}
              height={175}
              className="max-xl:hidden absolute -left-[20%] bottom-0 z-0"
              />
              </div>
  )
}

export default HeroCarousel
