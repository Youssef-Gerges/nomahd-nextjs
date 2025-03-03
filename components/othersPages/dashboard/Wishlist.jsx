"use client";

import { ProductCardWishlist } from "@/components/shopCards/ProductCardWishlist";
import { useContextElement } from "@/context/Context";
import { allProducts } from "@/data/products";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const { wishList } = useContextElement();
  return (
    <div className="my-account-content account-wishlist">
      <div className="grid-layout wrapper-shop" data-grid="grid-3">
        {/* card product 1 */}
        {wishList?.data?.slice(0, 3).map((elm, i) => (
          <ProductCardWishlist product={elm} key={i} />
        ))}
      </div>
      {!wishList?.data?.length && (
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
                href={`/shop-default`}
                className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
              >
                Explore Products!
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
