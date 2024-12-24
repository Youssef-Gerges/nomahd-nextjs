"use client";
import { allProducts } from "@/data/products";
import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import { ProductCardWishlist } from "../shopCards/ProductCardWishlist";
import Link from "next/link";
import { useGetUserWishlist } from "@/api/wishlist/getUserWishlist";
import { useGetAllProducts } from "@/api/products/useGetAllProducts";

export default function Wishlist() {
  const { data } = useGetUserWishlist();
  const { wishList } = useContextElement();
  const { data: products } = useGetAllProducts();
  const [wishListItems, setWishListItems] = useState([]);
  useEffect(() => {
    if (wishList) {
      console.log(wishList);
      setWishListItems(
        [...allProducts].filter((el) => wishList.includes(el.id))
      );
    }
  }, [wishList]);

  useEffect(() => {
    console.log("data wish products", data?.data);
    console.log("data products", products?.data);
    if (data) {
      const matchingProducts = products?.data.filter((product) =>
        data?.data.some(
          (wishlistItem) => wishlistItem.product.id === product.id
        )
      );
      console.log("data products filtered", matchingProducts);
    }
  }, [data, products]);
  return (
    <section className="flat-spacing-2">
      <div className="container">
        <div className="grid-layout wrapper-shop" data-grid="grid-4">
          {data?.data.map((elm, i) => (
            <ProductCardWishlist key={i} product={elm.product} productId={elm.id} />
          ))}
        </div>
        {!wishListItems.length && (
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
    </section>
  );
}
