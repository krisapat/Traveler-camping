'use client'
import { LandmarkCardProps } from "@/utils/type"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Image from "next/image";
import { Autoplay, Pagination } from 'swiper/modules';
import OtherInfo from "./OtherInfo";

const Hero = ({ landmark }: { landmark: LandmarkCardProps[] }) => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
        >
            {landmark.map((landmark) => {
                return (
                    <SwiperSlide key={landmark.id} className="group">
                        <div className="relative overflow-hidden rounded-md h-95 w-full">
                            <Image
                                src={landmark.image}
                                alt={landmark.name}
                                fill
                                className="object-cover rounded-md brightness-75 
                                        transition-all group-hover:brightness-50 group-hover:scale-105 duration-300
                                        "
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-full z-20">
                                <OtherInfo landmark={landmark} />
                            </div>
                        </div>

                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
export default Hero