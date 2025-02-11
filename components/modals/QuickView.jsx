"use client";
import { useContextElement } from "@/context/Context";

import Image from "next/image";
import Link from "next/link";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Quantity from "../shopDetails/Quantity";
import { colors, sizeOptions } from "@/data/singleProductOptions";
import React, { useState, useEffect } from "react";

export default function QuickView() {
  const {
    quickViewItem,
    addProductToCart,
    handleAddToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    // addToCompareItem,
    // isAddedtoCompareItem,
    quickAddItem,
    // addToCompareItem,
    // isAddedtoCompareItem,
    handleRemoveFromWishlist,
    handleAddToWishlist,
    handleCheckWishlist,
    addToWishlistSuccess,
    removeFromWishlistSuccess,
  } = useContextElement();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [item, setItem] = useState({});
  const [variant, setVariant] = useState("");

  const openModalSizeChoice = () => {
    const bootstrap = require("bootstrap"); // dynamically import bootstrap
    var myModal = new bootstrap.Modal(document.getElementById("find_size"), {
      keyboard: false,
    });

    myModal.show();
    document
      .getElementById("find_size")
      .addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    const backdrops = document.querySelectorAll(".modal-backdrop");
    if (backdrops.length > 1) {
      // Apply z-index to the last backdrop
      const lastBackdrop = backdrops[backdrops.length - 1];
      lastBackdrop.style.zIndex = "1057";
    }
  };
  const handleColor = (color) => {
    const updatedColor = quickViewItem?.colors.filter(
      (elm) => elm.toLowerCase() == color.toLowerCase()
    )[0];
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  };
  useEffect(() => {
    if (
      quickViewItem?.colors?.length > 0 &&
      quickViewItem?.choice_options?.length > 0
    ) {
      setVariant(
        `${currentColor.replace(/\s+/g, "")}${
          currentSize ? "-" + currentSize?.replace(/\s+/g, "") : ""
        }`
      ); // Set first option as default and format
    }
  }, [currentColor, currentSize]);

  useEffect(() => {
    handleCheckWishlist(setIsInWishlist, quickViewItem?.id);
  }, [quickViewItem, addToWishlistSuccess, removeFromWishlistSuccess]);
  useEffect(() => {
    if (quickViewItem?.choice_options) {
      const sizeOption = quickViewItem.choice_options[0];
      if (sizeOption?.options?.length) {
        setCurrentSize(sizeOption.options[0]);
      }
    }

    if (quickViewItem?.colors) {
      setCurrentColor(quickViewItem.colors[0]);
    }
  }, [quickViewItem]);
  return (
    <div className="modal fade modalDemo" id="quick_view">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-product-media-wrap">
              {quickViewItem && (
                <Swiper
                  dir="ltr"
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".snbqvp",
                    nextEl: ".snbqvn",
                  }}
                  className="swiper tf-single-slide"
                >
                  {
                    // [
                    //   quickViewItem.isLookBookProduct
                    //     ? "/images/products/orange-1.jpg"
                    //     : quickViewItem.thumbnail_image,
                    //   quickViewItem.isLookBookProduct
                    //     ? "/images/products/pink-1.jpg"
                    //     : quickViewItem.thumbnail_image
                    //     ? quickViewItem.thumbnail_image
                    //     : quickViewItem.thumbnail_image,
                    // ].map((product, index)
                    quickViewItem?.photos ? (
                      quickViewItem?.photos?.map((product, index) => (
                        <SwiperSlide className="swiper-slide" key={index}>
                          <div className="item">
                            <Image
                              alt={""}
                              src={product.path}
                              width={720}
                              height={1045}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide className="swiper-slide">
                        <div className="item">
                          <Image
                            alt={""}
                            src={quickViewItem?.thumbnail_image}
                            width={720}
                            height={1045}
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      </SwiperSlide>
                    )
                  }

                  <div className="swiper-button-next button-style-arrow single-slide-prev snbqvp" />
                  <div className="swiper-button-prev button-style-arrow single-slide-next snbqvn" />
                </Swiper>
              )}
            </div>
            <div className="tf-product-info-wrap position-relative">
              <div className="tf-product-info-list">
                <div className="tf-product-info-title">
                  <h5>
                    <Link
                      className="link"
                      href={`/product-detail/${quickViewItem?.slug}`}
                    >
                      {quickViewItem?.name}
                    </Link>
                  </h5>
                </div>
                {/* <div className="tf-product-info-badges">
                  <div className="badges text-uppercase">Best seller</div>
                  <div className="product-status-content">
                    <i className="icon-lightning" />
                    <p className="fw-6">
                      Selling fast! 48 people have this in their carts.
                    </p>
                  </div>
                </div> */}
                <div className="tf-product-info-price">
                  <div className="price">{quickViewItem?.base_price}</div>
                </div>
                {/* <div className="tf-product-description">
                  <p>
                    Nunc arcu faucibus a et lorem eu a mauris adipiscing conubia
                    ac aptent ligula facilisis a auctor habitant parturient a
                    a.Interdum fermentum.
                  </p>
                </div> */}
                <div className="tf-product-info-variant-picker">
                  <div className="variant-picker-item">
                    <div className="variant-picker-label">
                      Color:
                      {/* <span className="fw-6 variant-picker-label-value">
                        {currentColor.value}
                      </span> */}
                      <span
                        className="fw-6 variant-picker-label-value"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {currentColor ? (
                          // Check if currentColor is a hex code
                          /^#([0-9A-F]{3}){1,2}$/i.test(currentColor) ? (
                            <span
                              style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                backgroundColor: currentColor,
                                border: "1px solid #ccc",
                                display: "inline-block",
                              }}
                            />
                          ) : (
                            // Display the color name for strings
                            <span>{currentColor}</span>
                          )
                        ) : (
                          // Default text when no color is selected
                          "One color"
                        )}
                      </span>
                    </div>
                    {/* <form className="variant-picker-values">
                      {colors.map((color) => (
                        <React.Fragment key={color.id}>
                          <input
                            id={color.id}
                            type="radio"
                            name="color1"
                            readOnly
                            checked={currentColor == color}
                          />
                          <label
                            onClick={() => setCurrentColor(color)}
                            className="hover-tooltip radius-60"
                            htmlFor={color.id}
                            data-value={color.value}
                          >
                            <span
                              className={`btn-checkbox ${color.className}`}
                            />
                            <span className="tooltip">{color.value}</span>
                          </label>
                        </React.Fragment>
                      ))}
                    </form> */}
                    <form className="variant-picker-values">
                      {quickViewItem?.colors?.map((color, index) => {
                        // Check if the color is a hex code
                        const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(color);

                        return (
                          <React.Fragment key={index}>
                            <input
                              id={`color-${index}`} // Ensure unique id
                              type="radio"
                              name="color"
                              readOnly
                              checked={currentColor === color} // Ensure strict equality
                            />
                            <label
                              onClick={() => handleColor(color)} // Update currentColor state
                              className="hover-tooltip"
                              style={{
                                width: "fit-content",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              htmlFor={`color-${index}`} // Match the input id
                            >
                              {isHex ? (
                                // Render a colored circle for hex codes
                                <span
                                  className="btn-checkbox "
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    backgroundColor: color,
                                    // border: "1px solid #FFFF",
                                    // marginRight: "8px",
                                  }}
                                />
                              ) : (
                                // Render the color name for strings
                                <span>{color}</span>
                              )}
                              <span className="tooltip">{color}</span>
                            </label>
                          </React.Fragment>
                        );
                      })}
                    </form>
                  </div>
                  <div className="variant-picker-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="variant-picker-label">
                        Size:
                        <span className="fw-6 variant-picker-label-value">
                          {currentSize ? currentSize : "One size"}
                        </span>
                      </div>
                      <div
                        className="find-size btn-choose-size fw-6"
                        onClick={() => openModalSizeChoice()}
                      >
                        Find your size
                      </div>
                    </div>
                    {/* <form className="variant-picker-values">
                      {sizeOptions.map((size) => (
                        <React.Fragment key={size.id}>
                          <input
                            type="radio"
                            name="size1"
                            id={size.id}
                            readOnly
                            checked={currentSize == size}
                          />
                          <label
                            onClick={() => setCurrentSize(size)}
                            className="style-text"
                            htmlFor={size.id}
                            data-value={size.value}
                          >
                            <p>{size.value}</p>
                          </label>
                        </React.Fragment>
                      ))}
                    </form> */}
                    <form className="variant-picker-values">
                      {quickViewItem?.choice_options?.length > 0 &&
                        quickViewItem?.choice_options[0]?.options?.map(
                          (size, index) => (
                            <React.Fragment key={index}>
                              <input
                                type="radio"
                                name="size1"
                                id={index}
                                readOnly
                                checked={currentSize == size}
                              />
                              <label
                                onClick={() => setCurrentSize(size)}
                                className="style-text"
                                htmlFor={index}
                                data-value={size}
                              >
                                <p>{size}</p>
                              </label>
                            </React.Fragment>
                          )
                        )}
                    </form>
                  </div>
                </div>
                <div className="tf-product-info-quantity">
                  <div className="quantity-title fw-6">Quantity</div>
                  <Quantity setQuantity={setQuantity} />
                </div>
                <div className="tf-product-info-buy-button">
                  <form onSubmit={(e) => e.preventDefault()} className="">
                    <a
                      href="#"
                      className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                      onClick={() =>
                        handleAddToCart(quickViewItem?.id, variant, quantity, quickAddItem?.weight)
                      }
                    >
                      <span>
                        {isInCart ? "Already Added - " : "Add to cart - "}
                      </span>
                      <span className="tf-qty-price">
                        {quickViewItem?.currency_symbol
                          ? `${
                              (quickViewItem?.currency_symbol,
                              " ",
                              quickViewItem?.calculable_price)
                            } `
                          : quickViewItem?.base_price}
                      </span>
                    </a>
                    <a className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action">
                      <i
                        className={`${
                          isInWishlist ? "icon-heart-full" : "icon-heart"
                        }`}
                        onClick={() => {
                          isInWishlist
                            ? handleRemoveFromWishlist(quickViewItem.id)
                            : handleAddToWishlist(quickViewItem.id);
                        }}
                      />
                      <span className="tooltip">
                        {isInWishlist
                          ? "Already Wishlisted"
                          : "Add to Wishlist"}
                      </span>
                      <span className="icon icon-delete" />
                    </a>
                    {/* <a
                      href="#compare"
                      data-bs-toggle="offcanvas"
                      aria-controls="offcanvasLeft"
                      onClick={() => addToCompareItem(quickViewItem?.id)}
                      className="tf-product-btn-wishlist hover-tooltip box-icon bg_white compare btn-icon-action"
                    >
                      <span
                        className={`icon icon-compare ${
                          isAddedtoCompareItem(quickViewItem?.id) ? "added" : ""
                        }`}
                      />
                      <span className="tooltip">
                        {" "}
                        {isAddedtoCompareItem(quickViewItem?.id)
                          ? "Already Compared"
                          : "Add to Compare"}
                      </span>
                      <span className="icon icon-check" />
                    </a> */}
                  </form>
                </div>
                <div>
                  <Link
                    href={`/product-detail/${quickViewItem?.id}`}
                    className="tf-btn fw-6 btn-line"
                  >
                    View full details
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
