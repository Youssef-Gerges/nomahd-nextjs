"use client";

import { collections2 } from "@/data/categories";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useGetTopCategories } from "@/api/categories/getTopCategories";
import { useEffect } from "react";
import { useGetHomeCategories } from "@/api/categories/getHomeCategories";
import { useGetAllBanners } from "@/api/general/getAllBanners";
import { useGetFeaturedCategories } from "@/api/categories/getFeaturedCategories";
export default function Categories2() {
  const { data } = useGetAllBanners();
  const { data: featured } = useGetFeaturedCategories();

  useEffect(() => {
    console.log("lolo", data?.data);
  }, [data]);
  return (
    <section className="flat-spacing-5 pb_0">
      <div className="container">
        <div className="flat-title">
          <span className="title wow fadeInUp" data-wow-delay="0s">
            Categories you might like
          </span>
        </div>
        <div className="hover-sw-nav">
          <Swiper
            dir="ltr"
            slidesPerView={4}
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              // 1200: { slidesPerView: 4 },
            }}
            loop={false}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            className="tf-sw-collection"
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".snbp299",
              nextEl: ".snbn299",
            }}
            pagination={{ clickable: true, el: ".spd299" }}
          >
            {data?.data?.map((collection, index) => (
              <SwiperSlide key={index}>
                <div className="collection-item style-2 hover-img">
                  <div className="collection-inner">
                    <Link
                      href={`/shop-collection-sub/${collection?.slug}/${collection?.id}`} // Directly added href here
                      className="collection-image img-style"
                    >
                      <Image
                        className="lazyload"
                        data-src={collection.photo}
                        alt={collection.imgAlt}
                        src={collection.photo}
                        width={360}
                        height={432}
                      />
                    </Link>
                    {/* <div className="collection-content">
                      <Link
                        href={`/shop-collection-sub`} // Directly added href here
                        className="tf-btn collection-title hover-icon fs-15 rounded-full"
                      >
                        <span>{collection.name}</span>
                        <i className="icon icon-arrow1-top-left" />
                      </Link>
                    </div> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-sw nav-next-slider nav-next-collection box-icon w_46 round snbp299">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw nav-prev-slider nav-prev-collection box-icon w_46 round snbn299">
            <span className="icon icon-arrow-right" />
          </div>
          <div className="sw-dots style-2 sw-pagination-collection justify-content-center spd299" />
        </div>
      </div>
    </section>
  );
}
