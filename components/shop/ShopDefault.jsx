"use client";
import {layouts} from "@/data/shop";
import ProductGrid from "./ProductGrid";
import Pagination from "../common/Pagination";
import ShopFilter from "./ShopFilter";
import Sorting from "./Sorting";
import {useContextElement} from "@/context/Context";
import React, {useEffect, useState} from "react";

export default function ShopDefault({data, id}) {
    const [gridItems, setGridItems] = useState(4);
    const [finalSorted, setFinalSorted] = useState([]);
    const [products, setProducts] = useState([]);
    const {
        bestSelling,
        bestSellingStatus,
        linkProductsStatus,
        allProducts,
        linkProducts,
        subCategories,
        setLink,
        setPage,
        flashSale,
        page,
        link,
        fetchProductsStatus
    } = useContextElement();

    useEffect(() => {

        setLink(`/products/category/${id}`);
    }, [id]);

    useEffect(() => {

    }, [subCategories, data]);
    useEffect(() => {
        switch (data) {
            case "home-category":
                if (linkProducts?.data) {
                    if(page > 1){
                        setProducts(prev => [...prev, ...linkProducts?.data]);
                    }else{
                        setProducts(linkProducts?.data);
                    }
                }
                break;

            case "all-products":
                if (allProducts?.data) {
                    if(page > 1){
                        setProducts(prev => [...prev, ...allProducts?.data]);
                    }else{
                        setProducts(allProducts?.data);
                    }
                }
                break;
            case "sub-category":
                if (linkProducts?.data) {
                    if(page > 1){
                        setProducts(prev => [...prev, ...linkProducts?.data]);
                    }else{
                        setProducts(linkProducts?.data);
                    }
                }
                break;
            case "best-selling":
                if (bestSelling?.data) {
                    if(page > 1){
                        setProducts(prev => [...prev, ...bestSelling?.data]);
                    }else{
                        setProducts(bestSelling?.data);
                    }
                }
                break;

            case "flash-sale-id":
                if (flashSale?.data) {
                    const SaleProducts = flashSale?.data?.find((sale) => sale?.id == id)
                        ?.products?.data;
                    setProducts(prev => [...SaleProducts]);
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


    const handleLoad = () => {
        setPage(old => old + 1);
    }


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
                                <span className="icon icon-filter"/>
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
                                        <span className={`icon ${layout.iconClass}`}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="tf-control-sorting d-flex justify-content-end">
                            <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                                <Sorting setFinalSorted={setFinalSorted} products={products}/>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-control-shop">
                        <div className="meta-filter-shop"/>
                        {Array.isArray(finalSorted) && finalSorted?.length > 0 &&
                            <ProductGrid allproducts={finalSorted} gridItems={gridItems}/>}
                        {/* pagination */}
                        {finalSorted.length ? (
                            <div className="tf-pagination-wrap view-more-button text-center tf-pagination-btn">
                                <button
                                    className={`tf-btn-loading tf-loading-default animate-hover-btn btn-loadmore ${
                                        (data === 'all-products' && fetchProductsStatus === 'pending') || (data === 'best-selling' && bestSellingStatus === 'pending') || (data === 'home-category' && linkProductsStatus === 'pending') ? "loading" : ""
                                    } `}
                                    onClick={() => handleLoad()}
                                >
                                    <span className="text">Load more</span>
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </section>
            <ShopFilter setProducts={setProducts}/>
        </>
    );
}
