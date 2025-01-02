"use client";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
export default function ProductCard21({ product }) {
  const [currentImage, setCurrentImage] = useState(product.thumbnail_image);
  const [isAddedtoWishlist, setIsAddedtoWishlist] = useState(false);

  const {
    setQuickViewItem,
    quickAddItem,
    addToWishlist,
    // isAddedtoCompareItem,
    setQuickAddItem,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    // addToCompareItem,
    handleCheckWishlist,
    addToWishlistSuccess,
    removeFromWishlistSuccess,
  } = useContextElement();
  useEffect(() => {
    setCurrentImage(product.thumbnail_image);
    handleCheckWishlist(setIsAddedtoWishlist, product.id);
  }, [product, addToWishlistSuccess, removeFromWishlistSuccess]);

  return (
    <div className="card-product fl-item">
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.slug}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={product.thumbnail_image}
            alt="image-product"
            src={currentImage}
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            data-src={product.thumbnail_image}
            alt="image-product"
            src={product.thumbnail_image}
            width={720}
            height={1005}
          />
        </Link>
        {!product.preOrder && !product.soldOut && (
          <div className="list-product-btn">
            <a
              href="#quick_add"
              data-bs-toggle="modal"
              onClick={() => setQuickAddItem(product)}
              className="box-icon bg_white quick-add tf-btn-loading"
            >
              <span className="icon icon-bag" />
              <span className="tooltip">Quick Add</span>
            </a>
            <a
              onClick={() => {
                isAddedtoWishlist
                  ? handleRemoveFromWishlist(product.id)
                  : handleAddToWishlist(product.id);
              }}
              className="box-icon bg_white wishlist btn-icon-action"
            >
              <span
                className={`${
                  isAddedtoWishlist ? "icon-heart-full" : "icon-heart"
                }`}
              />
              <span className="tooltip">
                {isAddedtoWishlist ? "Already Wishlisted" : "Add to Wishlist"}
              </span>
              <span className="icon icon-delete" />
            </a>
            {/* <a
              href={product.compareLink}
              data-bs-toggle="offcanvas"
              aria-controls="offcanvasLeft"
              className="box-icon bg_white compare btn-icon-action"
            >
              <span
                className={`icon icon-compare ${
                  isAddedtoCompareItem(product.id) ? "added" : ""
                }`}
              />
              <span className="tooltip">
                {" "}
                {isAddedtoCompareItem(product.id)
                  ? "Already Compared"
                  : "Add to Compare"}
              </span>
            </a> */}
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
        )}
        {product.sizes?.length > 0 ? (
          <div className="size-list">
            <span>{product.sizes.join(", ")}</span>
          </div>
        ) : (
          ""
        )}
        {product.preOrder && (
          <div className="on-sale-wrap text-end">
            <div className="on-sale-item pre-order">{"Pre-Order"}</div>
          </div>
        )}
        {product.soldOut && (
          <div className="sold-out">
            <span>Sold out</span>
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.slug}`} className="title link">
          {product?.name?.length <= 30
            ? product.name
            : `${product?.name?.slice(0, 30)}...`}
        </Link>

        <span className="price">
          {product.has_discount ? (
            <>
              <span className="old-price">{product.stroked_price}</span>
              <span className="new-price">{product.main_price}</span>
            </>
          ) : (
            <span>{product.main_price}</span>
          )}
        </span>
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

        {/* <ul className="list-color-product">
          {product.colors?.map((color, index) => (
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
                width={720}
                height={1005}
              />
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
