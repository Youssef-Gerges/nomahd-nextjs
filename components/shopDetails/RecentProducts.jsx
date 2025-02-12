"use client";

import { ProductCard } from "../shopCards/ProductCard";
import { useContextElement } from "@/context/Context";
import {useAddPackageToCart} from "@/api/cart/addPackageToCart"
import { useEffect } from "react";
export default function RecentProducts({ id }) {
  const { relatedProducts, setProductId } = useContextElement();
  const {setQuickAddPackage} = useContextElement()

  useEffect(() => {
    if (id) {
      setProductId(id?.slug); // Set the product ID in context
    }
  }, [id, setProductId]);
  useEffect(() => {
    console.log("related products", relatedProducts);
  }, [relatedProducts]);

  if (relatedProducts?.products?.data?.length > 0) {
    return (
      <section className="flat-spacing-4 pt_0">
        <div className="container">
          <div className="flat-title">
            <span className="title">Related products</span>
          </div>
          <div className="hover-sw-nav hover-sw-2">
            <div
              className="grid-layout wow fadeInUp"
              data-wow-delay="0s"
              data-grid="grid-4"
            >
              <div
                className="d-flex align-items-center"
                style={{ gap: "2rem" }}
              >
                <span style={{ fontSize: "1.5rem", visibility: "hidden" }}>
                  +
                </span>
                <div className="h-100">
                  <ProductCard product={id} />
                </div>
              </div>
              {relatedProducts?.products?.data?.map((product, i) => (
                <>
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "2rem" }}
                    key={i}
                  >
                    <span style={{ fontSize: "1.5rem" }}>+</span>
                    <div className="h-100">
                      <ProductCard product={product} />
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div
              className="d-flex h-100 w-100 align-items-center justify-content-center"
              style={{ fontSize: "1.5rem", gap: "2rem" }}
            >
              <a
                href="#add_package"
                onClick={() => setQuickAddPackage({id: relatedProducts?.package?.package_id, products: [...relatedProducts?.products?.data, id] ?? []})}
                data-bs-toggle="modal"
                className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
              >
                Add to cart For SAR {relatedProducts?.package?.package_price}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
