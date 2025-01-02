"use client";
import { layouts } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import Pagination from "../common/Pagination";
import ShopFilter from "./ShopFilter";
import Sorting from "./Sorting";
import { useContextElement } from "@/context/Context";
import React, { useEffect, useState } from "react";
export default function ShopDefault({ data, id }) {
  const [gridItems, setGridItems] = useState(4);
  const [finalSorted, setFinalSorted] = useState([]);
  const [products, setProducts] = useState([]);
  const {
    categories,
    bestSelling,
    allProducts,
    linkProducts,
    subCategories,
    setLink,
    setPage,
    flashSale,
    featured,
    link,
    page,
  } = useContextElement();

  useEffect(() => {
    // if (data === "sub-category") {
    //   const foundLink = subCategories?.data.find((item) => item.id == id)?.links
    //     .products;
    //   // setCategoryName(foundCategory);
    //   console.log("bahha soltan link", foundLink);
    //   setLink(foundLink);
    // } else {
      const foundCategoryLink = subCategories?.data.find(
        (item) => item.id == id
      )?.links.products;
      const foundLink = categories?.data.find((item) => item.id == id)?.links
        .products;

      console.log("foundlink", foundLink, foundCategoryLink);
      console.log("bahha soltan foundlink", foundLink, foundCategoryLink);

      setLink(foundLink);
    // }
  }, [categories, data, id]);

  useEffect(() => {
    if (data === "sub-category") {
      const foundLink = subCategories?.data.find((item) => item.id == id)?.links
        .products;
      // setCategoryName(foundCategory);
      console.log("bahha soltan link", foundLink);
      setLink(foundLink);
    }
  }, [subCategories, data]);
  useEffect(() => {
    console.log("bahha soltan link", link);
  }, [link]);
  useEffect(() => {
    switch (data) {
      case "home-category":
        if (linkProducts?.data) {
          setProducts(linkProducts?.data);
        }
        break;

      case "all-products":
        if (allProducts?.data) {
          setProducts(allProducts?.data);
        }
        break;
      case "sub-category":
        if (linkProducts?.data) {
          setProducts(linkProducts?.data);
          console.log("bahha soltan link", linkProducts?.data);
        }
        break;
      case "best-selling":
        if (bestSelling?.data) {
          setProducts(bestSelling?.data);
        }
        break;

      case "flash-sale-id":
        if (flashSale?.data) {
          const SaleProducts = flashSale?.data?.find((sale) => sale?.id == id)
            ?.products?.data;
          setProducts(SaleProducts);
        }
        break;

      default:
        // Handle cases where `data` does not match any of the above
        setProducts([]);
        break;
    }
  }, [
    data,
    linkProducts,
    subCategories,
    allProducts,
    bestSelling,
    flashSale,
    link,
  ]);

  return (
    <>
      <section className="flat-spacing-2">
        <div className="container">
          <div className="tf-shop-control grid-3 align-items-center">
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </a>
            </div>
            <ul className="tf-control-layout d-flex justify-content-center">
              {layouts.map((layout, index) => (
                <li
                  key={index}
                  className={`tf-view-layout-switch ${layout.className} ${
                    gridItems == layout.dataValueGrid ? "active" : ""
                  }`}
                  onClick={() => setGridItems(layout.dataValueGrid)}
                >
                  <div className="item">
                    <span className={`icon ${layout.iconClass}`} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="tf-control-sorting d-flex justify-content-end">
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                <Sorting setFinalSorted={setFinalSorted} products={products} />
              </div>
            </div>
          </div>
          <div className="wrapper-control-shop">
            <div className="meta-filter-shop" />
            <ProductGrid allproducts={finalSorted} gridItems={gridItems} />
            {/* pagination */}
            {finalSorted.length ? (
              <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                <Pagination setPage={setPage} />
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <ShopFilter setProducts={setProducts} />
    </>
  );
}
