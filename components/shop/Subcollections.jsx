"use client";

// import { collectionSlides2 } from "@/data/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { useContextElement } from "@/context/Context";
import React, { useState, useEffect } from "react";
export default function Subcollections({ data, id }) {
  const {
    link,
    linkProducts,
    setLink,
    categories,
    allProducts,
    subCategories,
    setCategoryId,
  } = useContextElement();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // const foundLink = categories?.data.find((item) => item.id == id)?.links
    //   .sub_categories;
    // // const foundCategory = categories?.data.find((item) => item.id == id)?.name;
    // // setCategoryName(foundCategory);
    // setLink(foundLink);
    setCategoryId(id);
    console.log("jjjj", subCategories);
  }, [id, subCategories]);

  useEffect(() => {
    switch (data) {
      case "home-category":
        if (subCategories?.data) {
          setProducts(subCategories?.data);
          // setFiltered(linkProducts?.data);
        }
        break;

      case "all-products":
        if (allProducts?.data) {
          setProducts(allProducts?.data);
        }
        break;

      // case "best-selling":
      //   if (bestSelling?.data) {
      //     setProducts(bestSelling?.data);
      //   }
      //   break;

      // case "flash-sale-id":
      //   if (flashSale?.data) {
      //     const SaleProducts = flashSale?.data?.find((sale) => sale?.id == id)
      //       ?.products?.data;
      //     setProducts(SaleProducts);
      //   }
      //   break;

      default:
        // Handle cases where `data` does not match any of the above
        setProducts(allProducts?.data);
        break;
    }
  }, [data, subCategories, allProducts]);

  useEffect(() => {
    console.log("jjjj", products);
  }, [products]);
  return (
    <section className="flat-spacing-3 pb_0">
      <div className="container">
        <div className="hover-sw-nav">
          <Swiper
            dir="ltr"
            slidesPerView={5}
            spaceBetween={30}
            breakpoints={{
              1024: { slidesPerView: 5, spaceBetween: 30 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              576: { slidesPerView: 3, spaceBetween: 30 },
              0: { slidesPerView: 2, spaceBetween: 30 },
            }}
            loop={false}
            autoplay={false}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".snbp306",
              nextEl: ".snbn306",
            }}
            pagination={{ clickable: true, el: ".spd306" }}
          >
            {products?.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="collection-item style-2 hover-img">
                  <div className="collection-inner">
                    <Link
                      href={`/shop-collection-sub/${slide.name}/${slide.id}`}
                      className="collection-image img-style"
                    >
                      <Image
                        className="lazyload"
                        data-src={slide.icon}
                        alt={slide.alt}
                        src={slide.icon}
                        width={600}
                        height={721}
                      />
                    </Link>
                    <div className="collection-content">
                      <Link
                        href={`/shop-collection-sub/${slide.name}/${slide.id}`}
                        className="tf-btn collection-title hover-icon fs-15"
                      >
                        <span>{slide.name}</span>
                        <i className="icon icon-arrow1-top-left" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-sw nav-next-slider nav-next-collection box-icon w_46 round snbp306">
            <span className="icon icon-arrow-left" />
          </div>
          <div className="nav-sw nav-prev-slider nav-prev-collection box-icon w_46 round snbn306">
            <span className="icon icon-arrow-right" />
          </div>
          <div className="sw-dots style-2 sw-pagination-collection justify-content-center spd306" />
        </div>
      </div>
    </section>
  );
}
