"use client";
import { useGetLinkCategories } from "@/api/categories/getLinkCategories";
import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";

import Announcment from "@/components/homes/multi-brand/Announcment";
import Categories from "@/components/homes/multi-brand/Categories";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// export const metadata = {
//   title: "Home Men || Ecomus - Ultimate Nextjs Ecommerce Template",
//   description: "Ecomus - Ultimate Nextjs Ecommerce Template",
// };
export default function page() {
  const { flashSale } = useContextElement();
  const [link, setLink] = useState(null);
  const [banner, setBanner] = useState("");
  const [categoryName, setCategoryName] = useState(null);
  const [foundCategory, setFoundCategory] = useState(null);
  const { data } = useGetLinkCategories(link);

  useEffect(() => {
    console.log("flashSale", flashSale);
  }, [flashSale]);
  return (
    <>
      <Announcment />
      <Header7 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />
              <span className="text">Flash Deals</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container ">
        <div className="flex-wrap w-full items-center justify-between">
          {flashSale?.data?.map((item) => {
            return (
              <div>
                {item.title}
                <Image src={item.image} alt={"deal"} height={100} width={100} />
                <img src={item.image} alt="" />
                <div className="card-product fl-item">
                  <div className="card-product-wrapper">
                    <Link
                      href={`/product-detail/${item.slug}`}
                      className="product-img"
                    >
                      <Image
                        className="lazyload img-product"
                        data-src={item.image}
                        alt="image-product"
                        src={item.image}
                        width={720}
                        height={1005}
                      />
                      <Image
                        className="lazyload img-hover"
                        data-src={item.image}
                        alt="image-product"
                        src={item.image}
                        width={720}
                        height={1005}
                      />
                    </Link>
                    {!item.preOrder && !item.soldOut && (
                      <div className="list-product-btn">
                        <a
                          href="#quick_add"
                          data-bs-toggle="modal"
                          className="box-icon bg_white quick-add tf-btn-loading"
                        >
                          <span className="icon icon-bag" />
                          <span className="tooltip">Quick Add</span>
                        </a>
                        <a className="box-icon bg_white wishlist btn-icon-action">
                          <span className={"icon-heart"} />
                        </a>
                      </div>
                    )}
                  </div>
                  {/* <div className="card-product-info">
                    <Link
                      href={`/product-detail/${product.slug}`}
                      className="title link"
                    >
                      {product?.name?.length <= 30
                        ? product.name
                        : `${product?.name?.slice(0, 30)}...`}
                    </Link>
                    <span className="price">
                      {product.has_discount && (
                        <span className="old-price">
                          {product.stroked_price}
                        </span>
                      )}
                      <span className="new-price">{product.main_price}</span>
                    </span>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer1 bgColor="background-gray" />
    </>
  );
}
