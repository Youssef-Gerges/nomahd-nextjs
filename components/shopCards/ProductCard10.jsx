"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import Link from "next/link";

export default function ProductCard10({ product }) {
  const [currentImage, setCurrentImage] = useState(product.image);
  const { setQuickViewItem } = useContextElement();
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    // addToCompareItem,
    // isAddedtoCompareItem,
  } = useContextElement();
  return (
    <div className="card-product">
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.slug}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={product.image}
            alt="image-product"
            src={currentImage}
            width={360}
            height={360}
          />
          <Image
            className="lazyload img-hover"
            data-src={product.image}
            alt="image-product"
            src={product.image}
            width={360}
            height={360}
          />
        </Link>
        <div className="list-product-btn absolute-2">
          <a
            href="#quick_add"
            onClick={() => setQuickAddItem(product.slug)}
            data-bs-toggle="modal"
            className="box-icon bg_white quick-add tf-btn-loading"
          >
            <span className="icon icon-bag" />
            <span className="tooltip">Quick Add</span>
          </a>
          <a
            onClick={() => addToWishlist(product.slug)}
            className="box-icon bg_white wishlist btn-icon-action"
          >
            <span
              className={`icon icon-heart ${
                isAddedtoWishlist(product.slug) ? "added" : ""
              }`}
            />
            <span className="tooltip">
              {isAddedtoWishlist(product.slug)
                ? "Already Wishlisted"
                : "Add to Wishlist"}
            </span>
            <span className="icon icon-delete" />
          </a>

          <a
            href="#quick_view"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon bg_white quickview tf-btn-loading"
          >
            <span className="icon icon-view" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.slug}`} className="title link">
          {product.name}
        </Link>
        <span className="price">${product.price}</span>
        {/* {product.colors && product.colors.length > 0 && (
          <ul className="list-color-product">
            {product.colors.map((color, index) => (
              <li
                key={index}
                className={`list-color-item color-swatch ${
                  currentImage == color.imgSrc ? "active" : ""
                }  `}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
              >
                <span className="tooltip">{color.name}</span>
                <span className={`swatch-value ${color.colorClass}`} />
                <Image
                  className="lazyload"
                  data-src={color.imgSrc}
                  alt="image-product"
                  src={color.imgSrc}
                  width={360}
                  height={360}
                />
              </li>
            ))}
          </ul>
        )} */}

        {product.colors && (
          <ul className="list-color-product">
            {product.colors
              .filter((color) => /^#([0-9A-F]{3}){1,2}$/i.test(color)) // Filter valid hex colors
              .map((color) => (
                <li className={`list-color-item color-swatch`} key={color}>
                  <span className="tooltip">{color}</span>
                  <span
                    className="swatch-value"
                    style={{
                      display: "inline-block",
                      borderRadius: "50%",
                      backgroundColor: color, // Apply hex color
                      border: "1px solid #ccc",
                    }}
                  />
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
