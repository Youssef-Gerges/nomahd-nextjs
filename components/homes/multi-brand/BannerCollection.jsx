"use client";

import { recentCollections } from "@/data/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useGetAllBanners } from "@/api/general/getAllBanners";
import { useGetHomeCategories } from "@/api/cart/getCart";
import { useGetAllCategories } from "@/api/categories/getAllCategories";
import { useGetFeaturedCategories } from "@/api/categories/getFeaturedCategories";
import { useEffect } from "react";
export default function BannerCollection() {
  const {data} = useGetFeaturedCategories()

  useEffect(()=>{
   console.log("catat" , data?.data)
  },[data])
  return (
    <section className="flat-spacing-10 pb_0">
      <div className="container">
        <Swiper
          dir="ltr"
          slidesPerView={2}
          spaceBetween={15}
          pagination={{ clickable: true, clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            700: { slidesPerView: 2 },
            992: { slidesPerView: 2 },
          }}
          className="tf-sw-recent"
        >
          {data?.data?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="collection-item-v4 hover-img">
                <div className="collection-inner">
                  <Link
                    href={`/shop-collection-sub/${item.slug}/${item.id}`} // Directly added href here
                    className="collection-image img-style radius-10"
                  >
                    <Image
                      className="lazyload"
                      data-src={item.banner}
                      alt={item.imgAlt}
                      src={item.banner}
                      width={800}
                      height={746}
                    />
                  </Link>
                  <div
                    className="collection-content wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    <h5 className="heading text_white">{item.name}</h5>
                    <Link
                      href={`/shop-collection-sub/${item.slug}/${item.id}`} // Directly added href here
                      className="tf-btn style-3 fw-6 btn-light-icon rounded-full animate-hover-btn"
                    >
                      <span>Shop now</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
