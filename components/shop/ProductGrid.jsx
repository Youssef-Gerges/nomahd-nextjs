// import { products1 } from "@/data/products";
import React from "react";
import { ProductCard } from "../shopCards/ProductCard";

export default function ProductGrid({ gridItems = 4, allproducts = 0 }) {
  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0  auto",
          fontSize: "17px",
          marginBottom: "24px",
        }}
      >
        {allproducts.length || "No "} product(s) found
      </div>
      <div className="grid-layout wrapper-shop" data-grid={`grid-${gridItems}`}>
        {/* card product 1 */}
        {allproducts?.map((elm, i) => (
          <ProductCard product={elm} key={i} />
        ))}
      </div>{" "}
    </>
  );
}
