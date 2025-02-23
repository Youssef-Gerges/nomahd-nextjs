"use client";
import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import { ProductCardWishlist } from "../shopCards/ProductCardWishlist";
import Link from "next/link";
import { useGetAllProducts } from "@/api/products/useGetAllProducts";

export default function Wishlist() {
  const { wishlist } = useContextElement();
  const { data: products } = useGetAllProducts();


  useEffect(() => {
    if (wishlist) {
      const matchingProducts = products?.data.filter((product) =>
        wishlist?.data.some(
          (wishlistItem) => wishlistItem.product.id === product.id
        )
      );
    }
  }, [wishlist, products]);
  return (
    <section className="flat-spacing-2">
      <div className="container">
        <div className="grid-layout wrapper-shop" data-grid="grid-4">
          {wishlist?.data?.map((elm, i) => (
            <ProductCardWishlist key={i} product={elm.product} productId={elm.id} />
          ))}
        </div>
        {!wishlist?.data?.length && (
          <>
            <div
              className="row align-items-center w-100"
              style={{ rowGap: "20px" }}
            >
              <div className="col-lg-3 col-md-6 fs-18">
                Your wishlist is empty
              </div>
              <div className="col-lg-3  col-md-6">
                <Link
                  href={`/shop-all`}
                  className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                >
                  Explore Products!
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
