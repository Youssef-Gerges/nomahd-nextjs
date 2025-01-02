"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { collectionCircles } from "@/data/categories";
import { useGetAllCategories } from "@/api/categories/getAllCategories";
import { useGetHomeCategories } from "@/api/categories/getHomeCategories";
import { useGetTopCategories } from "@/api/categories/getTopCategories";
import { useGetFeaturedCategories } from "@/api/categories/getFeaturedCategories";
import { useContextElement } from "@/context/Context";
export default function Categories({
  category,
  subCategories,
  isHomeCategories,
}) {
  const { categories, flashSale } = useContextElement();
  useEffect(() => {
    console.log("flashSale?.data?.banner", flashSale?.data);
  }, [flashSale]);
  return (
    <section className="flat-spacing-20">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tf-categories-wrap">
              <div className="tf-categories-container">
                {/* {!isHomeCategories && */}
                  {categories?.data?.map((item) => (
                    <div
                      key={item.id}
                      className="collection-item-circle hover-img position-relative"
                    >
                      <Link
                        href={
                          // isHomeCategories
                            // ? 
                            `/shop-collection-sub/${item?.name}/${item?.id}`
                            // : `/home-category/${category?.name}/${category?.id}/${item.id}/${item.slug}`
                        }
                        className="collection-image img-style"
                      >
                        <Image
                          className="lazyload"
                          data-src={item.icon}
                          alt={item.name}
                          src={item.icon}
                          width={100}
                          height={100}
                        />
                      </Link>
                      {item.hasSale && (
                        <div
                          className="has-saleoff-wrap "
                          style={{ position: "absolute", top: 0 }}
                        >
                          <div className="sale-off fw-5">{item.saleText}</div>
                        </div>
                      )}
                      <div className="collection-content text-center">
                        <Link
                          href={`/home-category/${category?.name}/${category?.id}/${item.id}/${item.slug}`}
                          className="link title fw-6"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </div>
                  ))}
                {/* {isHomeCategories && (
                  <>
                    <div className="collection-item-circle hover-img position-relative">
                      <Link
                        href={`/flash-sale`}
                        className="collection-image img-style"
                      >
                        <Image
                          className="lazyload"
                          data-src={flashSale?.data?.banner}
                          alt={"flash-sale"}
                          src={flashSale?.data?.banner}
                          width={100}
                          height={100}
                        />
                      </Link>

                      <div className="collection-content text-center">
                        <Link href={`/flash-sale`} className="link title fw-6">
                          Top Rated
                        </Link>
                      </div>
                    </div>
                    <div className="collection-item-circle hover-img position-relative">
                      <Link
                        href={`/new-arrivals`}
                        className="collection-image img-style"
                      >
                        <Image
                          className="lazyload"
                          data-src={flashSale?.data?.banner}
                          alt={"new-arrivals"}
                          src={flashSale?.data?.banner}
                          width={100}
                          height={100}
                        />
                      </Link>

                      <div className="collection-content text-center">
                        <Link href={`/new-arrivals`} className="link title fw-6">
                          New Arrivals
                        </Link>
                      </div>
                    </div>
                    <div className="collection-item-circle hover-img position-relative">
                      <Link
                        href={`/best-seller`}
                        className="collection-image img-style"
                      >
                        <Image
                          className="lazyload"
                          data-src={flashSale?.data?.banner}
                          alt={"best-seller"}
                          src={flashSale?.data?.banner}
                          width={100}
                          height={100}
                        />
                      </Link>

                      <div className="collection-content text-center">
                        <Link href={`/flash-sale`} className="link title fw-6">
                          Best Seller
                        </Link>
                      </div>
                    </div>
                    <div className="collection-item-circle hover-img position-relative">
                      <Link
                        href={`/flash-sale`}
                        className="collection-image img-style"
                      >
                        <Image
                          className="lazyload"
                          data-src={flashSale?.data?.banner}
                          alt={"flash-sale"}
                          src={flashSale?.data?.banner}
                          width={100}
                          height={100}
                        />
                      </Link>

                      <div className="collection-content text-center">
                        <Link href={`/flash-sale`} className="link title fw-6">
                          Flash sale
                        </Link>
                      </div>
                    </div>
                  </>
                )} */}
              </div>
              {isHomeCategories && (
                <div className="tf-shopall-wrap">
                  <div className="collection-item-circle tf-shopall">
                    <Link
                      href={`/shop-all`}
                      className="collection-image img-style tf-shopall-icon"
                    >
                      <i className="icon icon-arrow1-top-left" />
                    </Link>
                    <div className="collection-content text-center">
                      <Link href={`/shop-all`} className="link title fw-6">
                        Shop all
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
