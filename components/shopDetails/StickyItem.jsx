"use client";
// import { options } from "@/data/singleProductOptions";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Quantity from "./Quantity";
import { products4 } from "@/data/products";
import { useContextElement } from "@/context/Context";

export default function StickyItem({ product, soldOut = false }) {
  const { isAddedToCartProducts, handleAddToCart } = useContextElement();
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState("");
  const options = [];

  if (product?.colors && product?.choice_options) {
    product?.colors.forEach((color) => {
      // Iterate through each size in choice_options
      product?.choice_options[0]?.options?.forEach((size) => {
        // Create a combined object for each color and size
        options.push({
          value: `${color} / ${size}`,
          label: `${color} / ${size}`,
        });
      });
    });
  }

  const handleVariantChange = (e) => {
    const selectedValue = e.target.value;
    console.log("valuee", e.target.value);
    const formattedValue = selectedValue.replace(/\s+/g, ""); // Remove spaces and format
    const formattedValuewithoutSlash = formattedValue.replace(/\//g, "-");
    console.log("valuee", formattedValuewithoutSlash);
    setVariant(formattedValuewithoutSlash); // Update the variant state
  };

  useEffect(() => {
    if (options.length > 0) {
      setVariant(options[0].value.replace(/\s+/g, "")); // Set first option as default and format
    }
  }, [options]);
  return (
    <div className="tf-sticky-btn-atc">
      <div className="container">
        <div className="tf-height-observer w-100 d-flex align-items-center">
          <div className="tf-sticky-atc-product d-flex align-items-center">
            <div className="tf-sticky-atc-img">
              <Image
                className="lazyloaded"
                data-src={product?.thumbnail_image}
                alt="image"
                src={product?.thumbnail_image}
                width={770}
                height={1075}
              />
            </div>
            <div className="tf-sticky-atc-title fw-5 d-xl-block d-none">
              {product?.name}
            </div>
          </div>
          <div className="tf-sticky-atc-infos">
            <form onSubmit={(e) => e.preventDefault()} className="">
              <div className="tf-sticky-atc-variant-price text-center">
                <select className="tf-select" onChange={handleVariantChange}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="tf-sticky-atc-btns">
                <div className="tf-product-info-quantity">
                  <Quantity setQuantity={setQuantity} />
                </div>
                {product?.current_stock < 1 ? (
                  <a className="tf-btn btns-sold-out cursor-not-allowed btn-fill radius-3 justify-content-center fw-6 fs-14 flex-grow-1 animate-hover-btn ">
                    <span>Sold out</span>
                  </a>
                ) : (
                  <a
                    onClick={() =>
                      handleAddToCart(product?.id, variant, quantity, product?.weight)
                    }
                    className="tf-btn btn-fill radius-3 justify-content-center fw-6 fs-14 flex-grow-1 animate-hover-btn"
                  >
                    <span>
                      {isAddedToCartProducts(products4[2].id)
                        ? "Already Added"
                        : "Add to cart"}
                    </span>
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
