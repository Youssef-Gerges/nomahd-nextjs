"use client";

import {slides4} from "@/data/heroslides";
import {Autoplay, Pagination} from "swiper/modules";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import {useGetAllBanners} from "@/api/general/getAllBanners";
import {useEffect} from "react";
import {useGetAllSliders} from "@/api/general/getAllSliders";

export default function Hero({banner}) {
    const {data} = useGetAllBanners();
    const {data: sliders} = useGetAllSliders();
    useEffect(() => {
        console.log("banners", data?.data);
        console.log("banners sliders", sliders?.data);
    }, [data]);
    return (
        <div className="tf-slideshow slider-women slider-effect-fade position-relative">
            <Swiper
                dir="ltr"
                slidesPerView={1}
                spaceBetween={0}
                centeredSlides={false}
                loop={true}
                autoplay={{delay: 2000, disableOnInteraction: false}}
                speed={1000}
                className="tf-sw-slideshow"
                modules={[Pagination, Autoplay]}
                pagination={{clickable: true, el: ".spd300"}}
            >
                {sliders?.data?.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="wrap-slider">
                            <Link href={slide.url ?? ''}>
                                <Image
                                    className="lazyload"
                                    data-src={slide.photo}
                                    alt={slide.imgAlt}
                                    src={slide.photo}
                                    width={2000}
                                    height={732}
                                    priority
                                />
                            </Link>
                            <div className="box-content">
                                <div className="container">
                                    <h1 className="fade-item fade-item-1">{slide.heading}</h1>
                                    <p className="fade-item fade-item-2">{slide.description}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="wrap-pagination">
                <div className="container">
                    <div className="sw-dots sw-pagination-slider justify-content-center spd300"/>
                </div>
            </div>
        </div>
    );
}
