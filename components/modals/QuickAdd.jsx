"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Quantity from "../shopDetails/Quantity";
import { useContextElement } from "@/context/Context";

import { allProducts } from "@/data/products";
import { colors, sizeOptions } from "@/data/singleProductOptions";
import { useGetAllProducts } from "@/api/products/useGetAllProducts";

import { useGetCartData } from "@/api/cart/getCart";
export default function QuickAdd() {
  const {
    quickAddItem,
    // addToCompareItem,
    // isAddedtoCompareItem,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleAddToCart,
    handleCheckWishlist,
    addToWishlistSuccess,
    removeFromWishlistSuccess,
  } = useContextElement();
  const [id, setId] = useState(null);
  const { data } = useGetAllProducts(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { data: cartData } = useGetCartData(id);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [item, setItem] = useState({});
  const [variant, setVariant] = useState("");

  const handleColor = (color) => {
    const updatedColor = quickAddItem?.colors.filter(
      (elm) => elm.toLowerCase() == color.toLowerCase()
    )[0];
    if (updatedColor) {
      setCurrentColor(updatedColor);
    }
  };

  useEffect(() => {
    if (
      quickAddItem?.colors?.length > 0 &&
      quickAddItem?.choice_options?.length > 0
    ) {
      setVariant(
        `${currentColor.replace(/\s+/g, "")}${currentSize ? "/"+currentSize?.replace(/\s+/g, ""):""}`
      ); // Set first option as default and format
    }
  }, [currentColor, currentSize]);

  useEffect(() => {
    handleCheckWishlist(setIsInWishlist, quickAddItem.id);
  }, [quickAddItem, addToWishlistSuccess, removeFromWishlistSuccess]);

  useEffect(() => {
    if (cartData?.data) {
      cartData?.data?.includes(quickAddItem.id)
        ? setIsInCart(true)
        : setIsInCart(false);
    }
  }, [cartData]);

  useEffect(() => {
    if (quickAddItem?.choice_options) {
      const sizeOption = quickAddItem.choice_options[0]
      if (sizeOption?.options?.length) {
        setCurrentSize(sizeOption.options[0]);
      }
    }

    if (quickAddItem?.colors) {
      setCurrentColor(quickAddItem.colors[0]);
    }

    const filtered = allProducts.filter((el) => el.id == quickAddItem.id);
    if (filtered) {
      setItem(filtered[0]);
    }
    setItem(data?.data?.find((item) => item.id == quickAddItem.id));
    console.log("dataa quick add", data?.data, quickAddItem);
  }, [quickAddItem]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      setId(userId);
    }
    setQuantity(1);
  }, []);

  return (
    <div className="modal fade modalDemo" id="quick_add">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-product-info-item">
              <div className="image">
                <Image
                  alt="image"
                  style={{ objectFit: "contain" }}
                  src={quickAddItem?.thumbnail_image}
                  width={720}
                  height={1005}
                />
              </div>
              <div className="content">
                <Link href={`/product-detail/${quickAddItem?.slug}`}>
                  {quickAddItem?.name}
                </Link>
                <div className="tf-product-info-price">
                  <div className="price">
                    {quickAddItem?.currency_symbol}{" "}
                    {quickAddItem?.calculable_price}
                  </div>
                </div>
              </div>
            </div>
            <div className="tf-product-info-variant-picker mb_15">
              <div className="variant-picker-item">
                {/* <div className="variant-picker-label">
                  Color:
                  <span className="fw-6 variant-picker-label-value">
                    {currentColor ? currentColor : "One color"}
                  </span>
                </div> */}
                <div className="variant-picker-label flex items-center gap-2">
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
                  {quickAddItem?.colors.map((color) => (
                    <React.Fragment key={color.id}>
                      <input
                        type="radio"
                        name="color1"
                        readOnly
                        checked={currentColor == color}
                      />
                      <label
                        onClick={() => setCurrentColor(color)}
                        className="hover-tooltip radius-60"
                        data-value={color.value}
                      >
                        <span className={`btn-checkbox ${color.className}`} />
                        <span className="tooltip">{color.value}</span>
                      </label>
                    </React.Fragment>
                  ))}
                </form> */}
                {/* <form className="variant-picker-values">
                  {quickAddItem?.colors?.map((color, index) => (
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
                  {quickAddItem?.colors?.map((color, index) => {
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
                <div className="variant-picker-label">
                  Size:
                  <span className="fw-6 variant-picker-label-value">
                    {currentSize ? currentSize : "One size"}
                  </span>
                </div>
                {/* <form className="variant-picker-values">
                  {sizeOptions.map((size) => (
                    <React.Fragment key={size.id}>
                      <input
                        type="radio"
                        name="size1"
                        readOnly
                        checked={currentSize == size}
                      />
                      <label
                        onClick={() => setCurrentSize(size)}
                        className="style-text"
                        data-value={size.value}
                      >
                        <p>{size.value}</p>
                      </label>
                    </React.Fragment>
                  ))}
                </form> */}
                <form className="variant-picker-values">
                  {quickAddItem?.choice_options?.length > 0 &&
                    quickAddItem?.choice_options[0]?.options?.map((size, index) => (
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
                      ))}
                </form>
              </div>
            </div>
            <div className="tf-product-info-quantity mb_15">
              <div className="quantity-title fw-6">Quantity</div>
              <Quantity setQuantity={setQuantity} />
            </div>
            <div className="tf-product-info-buy-button">
              <form onSubmit={(e) => e.preventDefault()} className="">
                <a
                  className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                  onClick={() =>
                    handleAddToCart(quickAddItem?.id, variant, quantity)
                  }
                >
                  <span>
                    {isInCart ? "Already Added - " : "Add to cart - "}
                  </span>
                  <span className="tf-qty-price">
                    {quickAddItem?.currency_symbol
                      ? `${
                          (quickAddItem?.currency_symbol,
                          " ",
                          quickAddItem?.calculable_price)
                        } `
                      : quickAddItem?.base_price}
                  </span>
                </a>
                <div className="tf-product-btn-wishlist btn-icon-action">
                  <i
                    className={`${
                      isInWishlist ? "icon-heart-full" : "icon-heart"
                    }`}
                    onClick={() => {
                      isInWishlist
                        ? handleRemoveFromWishlist(quickAddItem.id)
                        : handleAddToWishlist(quickAddItem.id);
                    }}
                  />
                  <i className="icon-delete" />
                </div>
                {/* <a
                  href="#compare"
                  data-bs-toggle="offcanvas"
                  aria-controls="offcanvasLeft"
                  onClick={() => addToCompareItem(quickAddItem?.id)}
                  className="tf-product-btn-wishlist box-icon bg_white compare btn-icon-action"
                >
                  <span className="icon icon-compare" />
                  <span className="icon icon-check" />
                </a> */}
                <div className="w-100">
                  <a href="#" className="btns-full">
                    Buy with
                    <Image
                      alt="image"
                      src="/images/payments/paypal.png"
                      width={64}
                      height={18}
                    />
                  </a>
                  <a href="#" className="payment-more-option">
                    More payment options
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
