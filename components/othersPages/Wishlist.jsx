"use client";
import { allProducts } from "@/data/products";
import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import { ProductCardWishlist } from "../shopCards/ProductCardWishlist";
import Link from "next/link";
import { useGetAllProducts } from "@/api/products/useGetAllProducts";

export default function Wishlist() {
  const { wishlist } = useContextElement();
  const { data: products } = useGetAllProducts();
  const [wishListItems, setWishListItems] = useState([]);
  // useEffect(() => {
  //   if (wishlist) {
  //     console.log(wishlist);
  //     setWishListItems(
  //       [...products].filter((el) => wishlist.includes(el.id))
  //     );
  //   }
  // }, [wishlist]);

  useEffect(() => {
    console.log("data products", products?.data);
    if (wishlist) {
      console.log("data wish products", wishlist?.data);
      const matchingProducts = products?.data.filter((product) =>
        wishlist?.data.some(
          (wishlistItem) => wishlistItem.product.id === product.id
        )
      );
      console.log("data products filtered", matchingProducts);
    }
  }, [wishlist, products]);
  return (
    <section className="flat-spacing-2">
      <div className="container">
        <div className="grid-layout wrapper-shop" data-grid="grid-4">
          {wishlist?.data.map((elm, i) => (
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
