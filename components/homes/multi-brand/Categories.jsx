"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { collectionCircles } from "@/data/categories";
import { useGetAllCategories } from "@/api/categories/getAllCategories";
import { useGetHomeCategories } from "@/api/categories/getHomeCategories";
import { useGetTopCategories } from "@/api/categories/getTopCategories";
import { useGetFeaturedCategories } from "@/api/categories/getFeaturedCategories";
export default function Categories({ category, subCategories }) {
  useEffect(() => {
    console.log("su-categories", subCategories);
  }, [subCategories]);
  return (
    <section className="flat-spacing-20">
      <div className="container">
       
        <div className="row">
          <div className="col-12">
            <div className="tf-categories-wrap">
              <div className="tf-categories-container">
                {subCategories?.map((item) => (
                  <div
                    key={item.id}
                    className="collection-item-circle hover-img position-relative"
                  >
                    <Link
                      href={`/home-category/${category?.name}/${category?.id}/${item.id}/${item.slug}`}
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
              </div>
              {/* <div className="tf-shopall-wrap">
                <div className="collection-item-circle tf-shopall">
                  <Link
                    href={`/shop-collection-sub`}
                    className="collection-image img-style tf-shopall-icon"
                  >
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                  <div className="collection-content text-center">
                    <Link
                      href={`/shop-collection-sub`}
                      className="link title fw-6"
                    >
                      Shop all
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
