"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { Pagination, Navigation, Autoplay, A11y } from 'swiper/modules';
import React from "react";
import { Imagen } from "../eventos/interfaces/single-event-http";

interface CarouselProps {
    imgs: Imagen[];
    hasMultipleImages: boolean;
    navigation?: boolean 
}

const Carousel: React.FunctionComponent<CarouselProps> = ({ imgs, hasMultipleImages, navigation } ) => {
  return (
    <Swiper
        modules={[Pagination, Navigation, Autoplay, A11y]} 
        spaceBetween={0}
        slidesPerView={1}
        loop={hasMultipleImages} 
        pagination={{ clickable: true }} 
        navigation={ hasMultipleImages && navigation } 
        autoplay={
        hasMultipleImages
            ? {
                delay: 3000, 
                disableOnInteraction: false, 
            }
            : false 
        }
        
        className="w-full h-full d-flex justify-center"
    >
          {imgs.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img.url}
                alt={`${img.name} - Imagen ${index + 1}`}
                width={500}
                height={500}
                priority={index === 0}
                className="h-full w-full object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
  )
}

export default Carousel