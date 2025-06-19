'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { CarouselImage } from '../interfaces/hero';

interface Props{
    imgs: CarouselImage[],
    navigation:boolean,
    pagination: boolean,
    autoplay?: boolean,
    delay?: number,
}

export const  Carousel = ({
  imgs,
  navigation,
  pagination,
  autoplay = true,
  delay = 5000,
}: Props) =>  {
  if (!imgs || imgs.length === 0) {
    return null;
  }

  return (
    // IMPORTANTE: El contenedor del Swiper tiene z-index-20 para estar sobre la capa oscura (z-10 de Hero)
    <div className="w-full h-full absolute inset-0 z-20">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        autoplay={
          autoplay
            ? {
                delay: delay,
                disableOnInteraction: false,
              }
            : false
        }
        className="w-full h-full"
      >
        {imgs.map((imgData) => {

          const placeholderUrl = `https://placehold.co/1920x1080/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=Imagen+${imgData.id}`;
          const imageUrl = imgData.url || placeholderUrl;
          const altText = imgData?.alternativeText || imgData?.name || `Carousel Image ${imgData.id}`;

          return (
            <SwiperSlide key={imgData.id} className="w-full h-full relative">
              <Image
                src={imageUrl}
                alt={altText}
                fill
                style={{ objectFit: 'cover' }}
                priority={imgData.id === 1} // Carga prioritaria para la primera imagen
                className="w-full h-full image-custom"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        /* Flechas de navegación */
        .swiper-button-prev,
        .swiper-button-next {
          color: white !important;
          transition: transform 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
          z-index: 1000; /* Aseguramos que las flechas estén por encima del Swiper Container (z-20) */
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          transform: scale(1.1);
        }

        /* Puntos de paginación */
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
          z-index: 1000; /* Aseguramos que los puntos estén por encima del Swiper Container (z-20) */
        }

        .swiper-pagination-bullet-active {
          background-color: white !important;
        }

        .image-custom{
            filter: opacity(0.4)
        }

      `}</style>
    </div>
  );
}
