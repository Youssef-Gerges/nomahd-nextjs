"use client";
import React, { useState, useEffect } from "react";
import StickyItem from "./StickyItem";
import Quantity from "./Quantity";

import Slider1ZoomOuter from "./sliders/Slider1ZoomOuter";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import { useGetBusinessSettings } from "@/api/general/getBusinessSettings";
import { ThreeDots } from "react-loader-spinner";

export default function DetailsOuterZoom({ product }) {
  const {data:settings} = useGetBusinessSettings();
  const [currentColor, setCurrentColor] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("");

  const handleColor = (color) => {
    const updatedColor = product?.colors.filter(
      (elm) => elm.toLowerCase() == color.toLowerCase()
    )[0];
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  };

  const {
    isAddedToCartProducts,
    handleCheckWishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleAddToCart,
    addToCart,
    addToWishlistSuccess,
    removeFromWishlistSuccess,
  } = useContextElement();


  useEffect(() => {
    handleCheckWishlist(setIsInWishlist, product?.id);
  }, [product, addToWishlistSuccess, removeFromWishlistSuccess]);

  useEffect(() => {
    if (product?.choice_options) {
      const sizeOption = product.choice_options[0]
      if (sizeOption?.options?.length) {
        setCurrentSize(sizeOption.options[0]);
      }
    }

    if (product?.colors) {
      setCurrentColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product?.colors?.length > 0 && product?.choice_options?.length > 0) {
      setVariant(
        `${currentColor.replace(/\s+/g, "")}${
          currentSize ? "-" + currentSize : ""
        }`
      ); // Set first option as default and format
    }
  }, [currentColor, currentSize]);
  return (
    <section
      className="flat-spacing-4 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div
        className="tf-main-product section-image-zoom"
        style={{ maxWidth: "100vw", overflow: "clip" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider">
                  <Slider1ZoomOuter
                    handleColor={handleColor}
                    currentColor={currentColor}
                    firstImage={product?.thumbnail_image}
                    images={product?.photos}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-title">
                    <h5>{product?.name}</h5>
                  </div>
                  {/* <div className="tf-product-info-badges">
                    <div className="badges">Best seller</div>
                    <div className="product-status-content">
                      <i className="icon-lightning" />
                      <p className="fw-6">
                        Selling fast! 56 people have this in their carts.
                      </p>
                    </div>
                  </div> */}
                  <div className="tf-product-info-price">
                    {product?.has_discount ? (
                      <>
                        <div className="price-on-sale">
                          {product?.currency_symbol} {product?.calculable_price}
                        </div>

                        <div className="compare-at-price">
                          {product?.stroked_price}
                        </div>
                        <div className="badges-on-sale">
                          <span>{product?.discount}</span> OFF
                        </div>
                      </>
                    ) : (
                      <div className="price-on-sale text-black">
                        {product?.currency_symbol} {product?.calculable_price}
                      </div>
                    )}
                  </div>
                  {/* <div className="tf-product-info-liveview">
                    <div className="liveview-count">20</div>
                    <p className="fw-6">People are viewing this right now</p>
                  </div> */}
                  {/* <div className="tf-product-info-countdown">
                    <div className="countdown-wrap">
                      <div className="countdown-title">
                        <i className="icon-time tf-ani-tada" />
                        <p>HURRY UP! SALE ENDS IN:</p>
                      </div>
                      <div className="tf-countdown style-1">
                        <div className="js-countdown">
                          <CountdownComponent labels="Days :,Hours :,Mins :,Secs" />
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="variant-picker-label">
                        Brand:
                        <span className="fw-6 variant-picker-label-value">
                          {product?.brand?.name}
                        </span>
                      </div>
                  <div className="tf-product-info-variant-picker">
                    <div
                      className="variant-picker-item"
                      style={{ borderRadius: "50%" }}
                    >
                      {/* <div className="variant-picker-label">
                        Color:
                        <span className="fw-6 variant-picker-label-value">
                          {currentColor || "One color"}
                        </span>
                      </div> */}
                      <div className="flex variant-picker-label items-center gap-2">
                        Color:
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
                        {product?.colors.map((color, index) => (
                          <React.Fragment key={index}>
                            <input
                              id={index}
                              type="radio"
                              name="color1"
                              readOnly
                              checked={currentColor == color}
                            />
                            <label
                              onClick={() => setCurrentColor(color)}
                              className="hover-tooltip radius-60"
                              htmlFor={color.index}
                              data-value={color}
                            >
                              <span
                              // className={`btn-checkbox ${color.className}`}
                              />
                              <span className="tooltip">{color}</span>
                            </label>
                          </React.Fragment>
                        ))}
                      </form> */}

                      {/* <form className="variant-picker-values">
                        {product?.colors.map((color, index) => (
                          <React.Fragment key={index}>
                            <input
                              id={`color-${index}`} // Ensure unique id
                              type="radio"
                              name="color"
                              readOnly
                              checked={currentColor === color} // Ensure strict equality
                            />
                            <label
                              onClick={() => changeColor(color)} // Update currentColor state
                              className="hover-tooltip"
                              style={{ width: "fit-content" }}
                              htmlFor={`color-${index}`} // Match the input id
                              data-value={color}
                            >
                              {color} 
                            </label>
                          </React.Fragment>
                        ))}
                      </form> */}
                      <form className="variant-picker-values">
                        {product?.colors?.map((color, index) => {
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
                                    className={`btn-checkbox bg-${currentColor}`}
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
                            {currentSize || "One size"}
                          </span>
                        </div>
                      </div>
                      <form className="variant-picker-values">
                        {product?.choice_options.length > 0 &&
                          product?.choice_options[0]?.options?.map(
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
                        onClick={() => {
                          addToCart.status != 'pending' && handleAddToCart(product?.id, variant, quantity, product?.weight);
                        }}
                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                      >
                {addToCart.status == 'pending'? <ThreeDots
                                    visible={true}
                                    height={10}
                                    color="#b7ec31"
                                    radius="9"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    />: <>
                        <span>
                          {isAddedToCartProducts(product?.id)
                            ? "Already Added"
                            : "Add to cart"}{" "}
                          -{" "}
                        </span>
                        <span className="tf-qty-price">
                          {product?.currency_symbol}{" "}
                          {((product?.calculable_price * quantity) ?? 0).toFixed(2)}
                        </span>
                        </>}
                      </a>
                      <a
                        // onClick={() => handleAddToWishlist(product?.id)}
                        onClick={() => {
                          isInWishlist
                            ? handleRemoveFromWishlist(product?.id)
                            : handleAddToWishlist(product?.id);
                        }}
                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action"
                      >
                        <span
                          className={`${
                            isInWishlist ? "icon-heart-full" : "icon-heart"
                          }`}
                          // className={`icon icon-heart ${
                          //   isAddedtoWishlist(product?.id) ? "added" : ""
                          // }`}
                        />
                        <span className="tooltip">
                          {" "}
                          {isInWishlist
                            ? "Already Wishlisted"
                            : "Add to Wishlist"}
                        </span>
                        <span className="icon icon-delete" />
                      </a>
                      {/* <a
                        href="#compare"
                        data-bs-toggle="offcanvas"
                        onClick={() => addToCompareItem(product?.id)}
                        aria-controls="offcanvasLeft"
                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white compare btn-icon-action"
                      >
                        <span
                          className={`icon icon-compare ${
                            isAddedtoCompareItem(product?.id) ? "added" : ""
                          }`}
                        />
                        <span className="tooltip">
                          {isAddedtoCompareItem(product?.id)
                            ? "Already Compared"
                            : "Add to Compare"}
                        </span>
                        <span className="icon icon-check" />
                      </a> */}
                    </form>
                  </div>
                  <div className="tf-product-info-extra-link">
                    <a
                      href="#delivery_return"
                      data-bs-toggle="modal"
                      className="tf-product-extra-icon"
                    >
                      <div className="icon">
                        <svg
                          className="d-inline-block"
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={18}
                          viewBox="0 0 22 18"
                          fill="currentColor"
                        >
                          <path d="M21.7872 10.4724C21.7872 9.73685 21.5432 9.00864 21.1002 8.4217L18.7221 5.27043C18.2421 4.63481 17.4804 4.25532 16.684 4.25532H14.9787V2.54885C14.9787 1.14111 13.8334 0 12.4255 0H9.95745V1.69779H12.4255C12.8948 1.69779 13.2766 2.07962 13.2766 2.54885V14.5957H8.15145C7.80021 13.6052 6.85421 12.8936 5.74468 12.8936C4.63515 12.8936 3.68915 13.6052 3.33792 14.5957H2.55319C2.08396 14.5957 1.70213 14.2139 1.70213 13.7447V2.54885C1.70213 2.07962 2.08396 1.69779 2.55319 1.69779H9.95745V0H2.55319C1.14528 0 0 1.14111 0 2.54885V13.7447C0 15.1526 1.14528 16.2979 2.55319 16.2979H3.33792C3.68915 17.2884 4.63515 18 5.74468 18C6.85421 18 7.80021 17.2884 8.15145 16.2979H13.423C13.7742 17.2884 14.7202 18 15.8297 18C16.9393 18 17.8853 17.2884 18.2365 16.2979H21.7872V10.4724ZM16.684 5.95745C16.9494 5.95745 17.2034 6.08396 17.3634 6.29574L19.5166 9.14894H14.9787V5.95745H16.684ZM5.74468 16.2979C5.27545 16.2979 4.89362 15.916 4.89362 15.4468C4.89362 14.9776 5.27545 14.5957 5.74468 14.5957C6.21392 14.5957 6.59575 14.9776 6.59575 15.4468C6.59575 15.916 6.21392 16.2979 5.74468 16.2979ZM15.8298 16.2979C15.3606 16.2979 14.9787 15.916 14.9787 15.4468C14.9787 14.9776 15.3606 14.5957 15.8298 14.5957C16.299 14.5957 16.6809 14.9776 16.6809 15.4468C16.6809 15.916 16.299 16.2979 15.8298 16.2979ZM18.2366 14.5957C17.8853 13.6052 16.9393 12.8936 15.8298 12.8936C15.5398 12.8935 15.252 12.943 14.9787 13.04V10.8511H20.0851V14.5957H18.2366Z" />
                        </svg>
                      </div>
                      <div className="text fw-6">Delivery &amp; Return</div>
                    </a>
                    <a
                      href="#share_social"
                      data-bs-toggle="modal"
                      className="tf-product-extra-icon"
                    >
                      <div className="icon">
                        <i className="icon-share" />
                      </div>
                      <div className="text fw-6">Share</div>
                    </a>
                  </div>
                  <div className="tf-product-info-delivery-return">
                    <div className="row">
                      <div className="col-xl-6 col-12">
                        <div className="tf-product-delivery">
                          <div className="icon">
                            <i className="icon-delivery-time" />
                          </div>
                          <p>
                            Free shipping starting from:
                            <span className="fw-7 ms-1">
                              {settings?.data?.filter(item => item.type == 'shipping_free_after_amount')[0]?.value} Gram
                            </span>
                            {/* (International),
                            <span className="fw-7">3-6 days</span> (United
                            States). */}
                          </p>
                        </div>
                      </div>
                      <div className="col-xl-6 col-12">
                        <div className="tf-product-delivery mb-0">
                          <div className="icon">
                            <i className="icon-return-order" />
                          </div>
                          <p>
                            Product Weight <span className="fw-7">{product?.weight} gram</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-info-trust-seal">
                    <div className="tf-product-trust-mess">
                      <i className="icon-safe" />
                      <p className="fw-6">
                        Guarantee Safe <br />
                        Checkout
                      </p>
                    </div>
                    <div className="tf-payment">
                    <div className="payment-item">
                      <svg
                        viewBox="0 0 38 24"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        width={38}
                        height={24}
                        aria-labelledby="pi-visa"
                      >
                        <title id="pi-visa">Visa</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        />
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        />
                        <path
                          d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                          fill="#142688"
                        />
                      </svg>
                    </div>
                    <div className="payment-item">
                      <svg
                        viewBox="0 0 38 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width={38}
                        height={24}
                        role="img"
                        aria-labelledby="pi-paypal"
                      >
                        <title id="pi-paypal">PayPal</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        />
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        />
                        <path
                          fill="#003087"
                          d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
                        />
                        <path
                          fill="#3086C8"
                          d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
                        />
                        <path
                          fill="#012169"
                          d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
                        />
                      </svg>
                    </div>
                    <div className="payment-item">
                      <svg
                        viewBox="0 0 38 24"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        width={38}
                        height={24}
                        aria-labelledby="pi-master"
                      >
                        <title id="pi-master">Mastercard</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        />
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        />
                        <circle fill="#EB001B" cx={15} cy={12} r={7} />
                        <circle fill="#F79E1B" cx={23} cy={12} r={7} />
                        <path
                          fill="#FF5F00"
                          d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                        />
                      </svg>
                    </div>
                    <div className="payment-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-labelledby="pi-american_express"
                        viewBox="0 0 38 24"
                        width={38}
                        height={24}
                      >
                        <title id="pi-american_express">American Express</title>
                        <path
                          fill="#000"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
                          opacity=".07"
                        />
                        <path
                          fill="#006FCF"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"
                        />
                        <path
                          fill="#FFF"
                          d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"
                        />
                        <path
                          fill="#006FCF"
                          d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"
                        />
                        <path
                          fill="#006FCF"
                          d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"
                        />
                        <path
                          fill="#FFF"
                          d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"
                        />
                        <path
                          fill="#006FCF"
                          d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"
                        />
                        <path
                          fill="#006FCF"
                          d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"
                        />
                      </svg>
                    </div>
                    <div className="payment-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        viewBox="0 0 38 24"
                        width={38}
                        height={24}
                        aria-labelledby="pi-amazon"
                      >
                        <title id="pi-amazon">Amazon</title>
                        <path
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                          fill="#000"
                          fillRule="nonzero"
                          opacity=".07"
                        />
                        <path
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                          fill="#FFF"
                          fillRule="nonzero"
                        />
                        <path
                          d="M25.26 16.23c-1.697 1.48-4.157 2.27-6.275 2.27-2.97 0-5.644-1.3-7.666-3.463-.16-.17-.018-.402.173-.27 2.183 1.504 4.882 2.408 7.67 2.408 1.88 0 3.95-.46 5.85-1.416.288-.145.53.222.248.47v.001zm.706-.957c-.216-.328-1.434-.155-1.98-.078-.167.024-.193-.148-.043-.27.97-.81 2.562-.576 2.748-.305.187.272-.047 2.16-.96 3.063-.14.138-.272.064-.21-.12.205-.604.664-1.96.446-2.29h-.001z"
                          fill="#F90"
                          fillRule="nonzero"
                        />
                        <path
                          d="M21.814 15.291c-.574-.498-.676-.73-.993-1.205-.947 1.012-1.618 1.315-2.85 1.315-1.453 0-2.587-.938-2.587-2.818 0-1.467.762-2.467 1.844-2.955.94-.433 2.25-.51 3.25-.628v-.235c0-.43.033-.94-.208-1.31-.212-.333-.616-.47-.97-.47-.66 0-1.25.353-1.392 1.085-.03.163-.144.323-.3.33l-1.677-.187c-.14-.033-.296-.153-.257-.38.386-2.125 2.223-2.766 3.867-2.766.84 0 1.94.234 2.604.9.842.82.762 1.918.762 3.11v2.818c0 .847.335 1.22.65 1.676.113.164.138.36-.003.482-.353.308-.98.88-1.326 1.2a.367.367 0 0 1-.414.038zm-1.659-2.533c.34-.626.323-1.214.323-1.918v-.392c-1.25 0-2.57.28-2.57 1.82 0 .782.386 1.31 1.05 1.31.487 0 .922-.312 1.197-.82z"
                          fill="#221F1F"
                        />
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <StickyItem
        currentColor={currentColor}
        product={product ? product : null}
      />
    </section>
  );
}
