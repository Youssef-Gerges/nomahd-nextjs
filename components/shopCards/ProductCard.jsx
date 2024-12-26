"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownComponent from "../common/Countdown";
import { useAddToCart } from "@/api/cart/addToCart";
import { useCartProccess } from "@/api/cart/proccess";
import { useCheckProductInWishlist } from "@/api/wishlist/checkProduct";
import { useAddToWishlistNew } from "@/api/wishlist/newAddToWishlist";
import { useNewRemoveFromWishlist } from "@/api/wishlist/newRemoveFromWishlist";
export const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.thumbnail_image);
  const [isAddedtoWishlist, setIsAddedtoWishlist] = useState(false);
  const { setQuickViewItem } = useContextElement();

  const {
    setQuickAddItem,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    handleCheckWishlist,
    addToWishlistSuccess,
    removeFromWishlistSuccess,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.thumbnail_image);
    handleCheckWishlist(setIsAddedtoWishlist, product?.id);
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
          <a
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
        {product.countdown && (
          <div className="countdown-box">
            <div className="js-countdown">
              <CountdownComponent />
            </div>
          </div>
        )}
        {product.sizes && (
          <div className="size-list">
            {product.sizes.map((size) => (
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
        <span className="price">
          {product.currency_symbol} {product.calculable_price}
        </span>
        {/* {product.colors && (
          <ul className="list-color-product">
            {product.colors.map((color) => (
              <li
                className={`list-color-item color-swatch ${
                  currentImage == color.imgSrc ? "active" : ""
                } `}
                key={color.name}
                onMouseOver={() => setCurrentImage(color.thumbnail_image)}
              >
                <span className="tooltip">{color.name}</span>
                <span className={`swatch-value ${color.colorClass}`} />
                <Image
                  className="lazyload"
                  data-src={color.imgSrc}
                  src={color.imgSrc}
                  alt="image-product"
                  width={720}
                  height={1005}
                />
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};
