"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownComponent from "../common/Countdown";
export const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product?.thumbnail_image);
  const [isAddedtoWishlist, setIsAddedtoWishlist] = useState(false);
  const { setQuickViewItem } = useContextElement();

  const {
    setQuickAddItem,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleCheckWishlist,
    addToWishlistSuccess,
    removeFromWishlistSuccess,
  } = useContextElement();

  useEffect(() => {
    if(product){
      handleCheckWishlist(setIsAddedtoWishlist, product.id);
      setCurrentImage(product.thumbnail_image);
    }
  }, [product, addToWishlistSuccess, removeFromWishlistSuccess]);

  return (
    <div className="card-product fl-item" key={product.id}>
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.slug}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={product.thumbnail_image}
            src={currentImage}
            alt="image-product"
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            data-src={
              product.imgHoverSrc
                ? product.imgHoverSrc
                : product.thumbnail_image
            }
            src={
              product.imgHoverSrc
                ? product.imgHoverSrc
                : product.thumbnail_image
            }
            alt="image-product"
            width={720}
            height={1005}
          />
        </Link>
        <div className="list-product-btn">
          <a
            href="#quick_add"
            onClick={() => {
              setQuickAddItem(product);
            }}
            data-bs-toggle="modal"
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
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasLeft"
            onClick={() => addToCompareItem(product.id)}
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
            <span className="icon icon-check" />
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
        {product.countdown && (
          <div className="countdown-box">
            <div className="js-countdown">
              <CountdownComponent />
            </div>
          </div>
        )}
        {product.choice_options && (
          <div className="size-list">
            {product?.choice_options[0]?.options?.map((size) => (
              <span key={size}>{size}</span>
            ))}
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.slug}`} className="title link">
          {product?.name?.length <= 30
            ? product.name
            : `${product?.name?.slice(0, 30)}...`}
        </Link>
        {/* <span className="price">
          {product.currency_symbol} {product.calculable_price}
        </span> */}
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
    {product.colors.map((colorObj, index) => {
      const color = colorObj.name || colorObj; // Adjust based on your data structure

      const isHexColor = /^#([0-9A-F]{3}){1,2}$/i.test(color);

      return (
        <li style={{ cursor: "pointer" }} key={index}>
          <span className="tooltip">{color}</span>
          <span
            className="swatch-value"
            style={{
              display: "inline-block",
              borderRadius: isHexColor ? "50%" : "2px",
              backgroundColor: isHexColor ? color : "transparent",
              border: "1px solid #ccc",
              padding: "5px",
              color: isHexColor ? "inherit" : "#000",
              width: "fit-content",
            }}
          >
            {!isHexColor && color}
          </span>
        </li>
      );
    })}
  </ul>
)}

      </div>
    </div>
  );
};
