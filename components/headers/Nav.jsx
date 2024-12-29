"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { products1 } from "@/data/products";
import { ProductCard } from "../shopCards/ProductCard";
import { Navigation } from "swiper/modules";
import {
  allHomepages,
  blogLinks,
  demoItems,
  pages,
  productDetailPages,
  productsPages,
} from "@/data/menu";
import { usePathname } from "next/navigation";
import { useContextElement } from "@/context/Context";

export default function Nav({ isArrow = true, textColor = "", Linkfs = "" }) {
  const { categories, subCategories, setCategoryId } = useContextElement();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    // if (menuItem.length) {
    //   active = menuItem.some(
    //     (elm) => elm.href?.split("/")[1] == pathname.split("/")[1]
    //   );
    // }
    // if (menuItem.length) {
    //   menuItem.forEach((item) => {
    //     item.links?.forEach((elm2) => {
    //       if (elm2.href?.includes("/")) {
    //         if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
    //           active = true;
    //         }
    //       }
    //       if (elm2.length) {
    //         elm2.forEach((item2) => {
    //           item2?.links?.forEach((elm3) => {
    //             if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
    //               active = true;
    //             }
    //           });
    //         });
    //       }
    //     });
    //     if (item.href?.includes("/")) {
    //       if (item.href?.split("/")[1] == pathname.split("/")[1]) {
    //         active = true;
    //       }
    //     }
    //   });
    // }

    return active;
  };
  useEffect(() => {
    // if (setCategoryId) {
    //   setCategoryId(setCategoryId); // Set the product ID in context
    // }
    if (hoveredItem) {
      setCategoryId(hoveredItem);
    }
  }, [setCategoryId, hoveredItem]);
  useEffect(() => {
    console.log("categories data ", categories);
  }, [categories]);
  return (
    <>
      <li className="menu-item">
        <a
          href="/"
          onClick={() => setIsActive("categories")}
          className={`item-link ${Linkfs} ${textColor} ${
            isActive === "categories" ? "activeMenu" : ""
          } `}
        >
          Categories
          {/* {isArrow ? <i className="icon icon-arrow-down" /> : ""} */}
        </a>
        {/* <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row-demo">
              {demoItems.map((item, index) => (
                <div
                  className={`demo-item ${
                    isMenuActive(item) ? "activeMenu" : ""
                  } `}
                  key={index}
                >
                  <Link href={item.href}>
                    <div className="demo-image position-relative">
                      <Image
                        className="lazyload"
                        data-src={item.src}
                        alt={item.alt}
                        src={item.src}
                        width="300"
                        height="329"
                      />
                      {item.labels && (
                        <div className="demo-label">
                          {item.labels.map((label, labelIndex) => (
                            <span
                              key={labelIndex}
                              className={label.className || undefined}
                            >
                              {label.text}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="demo-name">{item.name}</span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center view-all-demo">
              <a
                href="#modalDemo"
                data-bs-toggle="modal"
                className="tf-btn btn-xl btn-fill radius-3 animate-hover-btn fw-6"
              >
                <span>View all demos (34+)</span>
                <i className="icon icon-arrow-right" />
              </a>
            </div>
          </div>
        </div> */}
      </li>

      {categories?.data?.map((category) => {
        return (
          <li
            key={category.id}
            onMouseEnter={() => setHoveredItem(category.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className="menu-item"
          >
            <a
              onClick={() => setIsActive(category.name)}
              href={`/home-category/${category?.name}/${category?.id}`}
              className={`item-link ${Linkfs} ${textColor} 
            ${isActive === category.name ? "activeMenu" : ""} 
            `}
            >
              {category.name}
            </a>
            <div className="sub-menu mega-menu">
              <div className="container">
                <div className="row">
                  {subCategories?.data?.map((menu, index) => (
                    <div className="col-lg-2" key={index}>
                      <div className="mega-menu-item">
                        <div className="menu-heading">{menu.name}</div>
                        <ul className="menu-list">
                          {/* {menu.links.map((link, linkIndex) => (
                            <li key={linkIndex}>
                              <Link
                                href={link.href}
                                className={`menu-link-text link ${
                                  isMenuActive(link) ? "activeMenu" : ""
                                }`}
                              >
                                {link.text}
                              </Link>
                            </li>
                          ))} */}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
        );
      })}
      <li className="menu-item">
        <a
          href="/flash-sale"
          onClick={() => setIsActive("flashSale")}
          className={`item-link ${Linkfs} ${textColor}  ${
            isActive === "flashSale" ? "activeMenu" : ""
          }`}
        >
          Flash Sale
        </a>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(pages) ? "activeMenu" : ""
          }`}
        >
          All Brands
        </a>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(blogLinks) ? "activeMenu" : ""
          }`}
        >
          All Categories
        </a>
      </li>
    </>
  );
}
