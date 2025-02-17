"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { useAddPackageToCart } from "@/api/cart/addPackageToCart";
import { useQueryClient } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";

export default function AddPackage() {
  const queryClient = useQueryClient();
  const { quickAddPackage } = useContextElement();
  const addPackageToCart = useAddPackageToCart()
  const [selectedVariations, setSelectedVariations] = useState({});

  useEffect(() => {
    if (quickAddPackage?.products) {
      const defaultVariations = {};
      quickAddPackage.products.forEach((product) => {
        defaultVariations[product.id] = {
          color: product?.colors?.[0] || null, // Select first color if available
          size: product?.choice_options?.[0]?.options?.[0] || null, // Select first size if available
        };
      });
      setSelectedVariations(defaultVariations);
    }
  }, [quickAddPackage]);

  const handleColorSelect = (productId, color) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], color },
    }));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], size },
    }));
  };

  const handleAddAllToCart = () => {
    let body = {};
    quickAddPackage?.products?.forEach((product) => {
      const { color, size } = selectedVariations[product.id] || {};
      body = {...body, [`product_${product.id}_color`]: color, [`product_${product.id}_attribute_id_${product?.choice_options[0]?.name}`]: size }
    });
    addPackageToCart.mutate({package_id: quickAddPackage.id, ...body}, {
      onSuccess: () => {
        window.location.href = '/view-cart'
          queryClient.invalidateQueries(['cart', 'summery'])
          queryClient.refetchQueries(['cart', 'summery'])
      }
    });
    
  };

  return (
    <div className="modal fade modalDemo" id="add_package">
      <div className="modal-dialog modal-dialog-centered">
        <div className="header">
          <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
        </div>
        <div className="modal-content" style={{ overflow: "auto" }}>
          <div className="wrap pt-5 grid-layout" data-grid="grid-3">
            {quickAddPackage?.products?.map((product) => (
              <div key={product.id}>
                <div className="tf-product-info-item d-flex flex-row" style={{ gap: "3rem" }}>
                  <div className="image">
                    <Image
                      alt="image"
                      style={{ objectFit: "contain" }}
                      src={product?.thumbnail_image}
                      width={150}
                      height={300}
                    />
                  </div>
                  <div className="content">
                    <Link href={`/product-detail/${product?.slug}`}>{product?.name}</Link>

                    {/* Color Picker */}
                    {product?.colors?.length > 0 && (
                      <div className="variant-picker-item">
                        <div className="variant-picker-label flex items-center mb-0 gap">
                          Color:
                          <span className="fw-6 variant-picker-label-value">
                            {selectedVariations[product.id]?.color || "One color"}
                          </span>
                        </div>
                        <form className="variant-picker-values mb-2">
                          {product?.colors?.map((color, index) => {
                            const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(color);
                            return (
                              <React.Fragment key={index}>
                                <input
                                  id={`color-${product.id}-${index}`}
                                  type="radio"
                                  name={`color-${product.id}`}
                                  readOnly
                                  checked={selectedVariations[product.id]?.color === color}
                                />
                                <label
                                  onClick={() => handleColorSelect(product.id, color)}
                                  htmlFor={`color-${product.id}-${index}`}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width:"fit-content",
                                    cursor: "pointer",
                                  }}
                                >
                                  {isHex ? (
                                    <span
                                      className="btn-checkbox"
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: color,
                                      }}
                                    />
                                  ) : (
                                    <span>{color}</span>
                                  )}
                                </label>
                              </React.Fragment>
                            );
                          })}
                        </form>
                      </div>
                    )}

                    {/* Size Picker */}
                    {product?.choice_options?.length > 0 && (
                      <div className="variant-picker-item">
                        <div className="variant-picker-label mb-0">
                          Size:
                          <span className="fw-6 variant-picker-label-value">
                            {selectedVariations[product.id]?.size || "One size"}
                          </span>
                        </div>
                        <form className="variant-picker-values">
                          {product?.choice_options[0]?.options?.map((size, index) => (
                            <React.Fragment key={index}>
                              <input
                                type="radio"
                                name={`size-${product.id}`}
                                id={`size-${product.id}-${index}`}
                                readOnly
                                checked={selectedVariations[product.id]?.size === size}
                              />
                              <label
                                onClick={() => handleSizeSelect(product.id, size )}
                                style={{
                                  width: "fit-content",
                                }}
                                htmlFor={`size-${product.id}-${index}`}
                              >
                                <p>{size}</p>
                              </label>
                            </React.Fragment>
                          ))}
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add All to Cart Button */}
          <div className="tf-product-info-buy-button text-center mt-4">
            <button
              className="tf-btn btn-fill fw-6 fs-16 animate-hover-btn"
              onClick={addPackageToCart.status != 'pending' && handleAddAllToCart}
            >
              {addPackageToCart.status == 'pending'? 
              <ThreeDots
              visible={true}
              height={10}
              color="#b7ec31"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
              : 'Add All to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
