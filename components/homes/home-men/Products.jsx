// "use client";
// import ProductCard21 from "@/components/shopCards/ProductCard21";
// import { useContextElement } from "@/context/Context";
// import React, { useEffect, useState } from "react";

// export default function Products({ data, link }) {
//   const [loading, setLoading] = useState(false);
//   const [displayedProducts, setDisplayedProducts] = useState([]); // Products to display
//   const { bestSelling, allProducts, linkProducts, setLink, setPage } =
//     useContextElement();
//   const [products, setProducts] = useState(allProducts?.data || []);
//   const [activeTab, setActiveTab] = useState("Best seller");
//   const [filtered, setFiltered] = useState([]);

//   const productsPerPage = 8; // Number of products to display per load
//   const [currentPage, setCurrentPage] = useState(1);

//   // Function to load more products
//   const handleLoad = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setCurrentPage((prevPage) => prevPage + 1);
//       setPage((prevPage) => prevPage + 1);
//       setLoading(false);
//     }, 1000);
//   };

//   useEffect(() => {
//     // Determine the initial product set based on the `data` prop
//     if (data === "home-category" && linkProducts?.data) {
//       setProducts(linkProducts?.data);
//     } else if (data === "all-products" && allProducts?.data) {
//       setProducts(allProducts?.data);
//     } else if (data === "best-selling" && bestSelling?.data) {
//       setProducts(bestSelling?.data);
//     }
//   }, [data, linkProducts, allProducts, bestSelling]);

//   useEffect(() => {
//     setLink(link);
//   }, [link]);

//   useEffect(() => {
//     // Filter products based on the active tab
//     if (products?.length > 0) {
//       let filteredProducts = products;
//       if (activeTab === "Sale") {
//         filteredProducts = products.filter(
//           (item) => item.has_discount === true
//         );
//       }
//       setFiltered(filteredProducts);
//     }
//   }, [activeTab, products]);

//   useEffect(() => {
//     // Update displayed products based on pagination
//     const startIndex = 0;
//     const endIndex = currentPage * productsPerPage;
//     setDisplayedProducts(filtered.slice(startIndex, endIndex));
//   }, [filtered, currentPage]);

//   return (
//     <section className="flat-spacing-17">
//       <div className="container">
//         <div className="flat-animate-tab">
//           <ul
//             className="widget-tab-3 style-2 d-flex justify-content-center wow fadeInUp"
//             data-wow-delay="0s"
//             role="tablist"
//           >
//             {["Best seller", "Sale"].map((tab, index) => (
//               <li
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setCurrentPage(1); // Reset pagination when changing tabs
//                 }}
//                 className="nav-tab-item"
//                 role="presentation"
//                 key={index}
//               >
//                 <a className={activeTab === tab ? "active" : ""}>{tab}</a>
//               </li>
//             ))}
//           </ul>
//           <div className="tab-content">
//             <div className="tab-pane active show">
//               <div className="grid-layout" data-grid="grid-4">
//                 {displayedProducts.length > 0 &&
//                   displayedProducts.map((product, index) => (
//                     <ProductCard21 key={index} product={product} />
//                   ))}
//               </div>
//               {displayedProducts.length < filtered.length && (
//                 <div className="tf-pagination-wrap view-more-button text-center">
//                   <button
//                     className={`tf-btn-loading tf-loading-default style-2 btn-loadmore ${
//                       loading ? "loading" : ""
//                     }`}
//                     onClick={handleLoad}
//                     disabled={loading}
//                   >
//                     <span className="text">Load more</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import ProductCard21 from "@/components/shopCards/ProductCard21";
import { useContextElement } from "@/context/Context";
import React, { useEffect, useState } from "react";
import FlashSale from "../multi-brand/FlashSale";
import ProductCard10 from "@/components/shopCards/ProductCard10";
import Link from "next/link";
import Subcollections from "@/components/shop/Subcollections";
export default function Products({ data, id }) {
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products to display
  const {
    categories,
    bestSelling,
    allProducts,
    linkProducts,
    setLink,
    setPage,
    flashSale,
    featured,
    link,
  } = useContextElement();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Best seller");
  const [filtered, setFiltered] = useState([]);

  const productsPerPage = 8; // Number of products to display per load
  const [currentPage, setCurrentPage] = useState(1);

  // Function to load more products
  const handleLoad = () => {
    if (filtered.length > displayedProducts.length) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage + 1);
        setPage((prevPage) => prevPage + 1); // Ensure this updates the context if needed
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const foundLink = categories?.data.find((item) => item.id == id)?.links
      .products;
    const foundCategory = categories?.data.find((item) => item.id == id)?.name;
    setCategoryName(foundCategory);
    console.log("foundlink", foundLink);
    setLink(foundLink);
  }, [categories, data]);

  // useEffect(() => {
  //   const foundLink = featured?.data.find((item) => item.id == id)?.links
  //     .products;
  //   setLink(foundLink);
  // }, [id, featured]);
  useEffect(() => {
    switch (data) {
      case "home-category":
        if (linkProducts?.data) {
          setProducts(linkProducts?.data);
          setFiltered(linkProducts?.data);
        }
        break;

      case "all-products":
        if (allProducts?.data) {
          setProducts(allProducts?.data);
          setFiltered(allProducts?.data);
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
        setProducts(allProducts?.data);
        break;
    }
  }, [data, linkProducts, allProducts, bestSelling, flashSale, link]);

  useEffect(() => {
    // Filter products based on the active tab
    if (products?.length > 0) {
      // let filteredProducts = products;
      // if (activeTab === "Sale") {
      //   filteredProducts = products.filter(
      //     (item) => item.has_discount === true
      //   );
      // }
      setFiltered(products);
      setCurrentPage(1); // Reset pagination when active tab changes
      // setDisplayedProducts([]); // Reset displayed products on tab change
    }
  }, [products]);

  useEffect(() => {
    // Append new products based on the current page
    const startIndex = displayedProducts.length;
    const endIndex = currentPage * productsPerPage;
    const newProducts = filtered.slice(startIndex, endIndex);

    setDisplayedProducts((prevProducts) => [...prevProducts, ...newProducts]);
  }, [filtered, currentPage]);

  return (
    <>
      <div className="tf-page-title ">
        <div className="container-full">
          <div className="heading text-center">{categoryName}</div>
        </div>
      </div>
      <Subcollections />
      <section className="flat-spacing-17">
        <div className="container">
          <div className="flat-animate-tab">
            {/* <ul
            className="widget-tab-3 style-2 d-flex justify-content-center wow fadeInUp"
            data-wow-delay="0s"
            role="tablist"
          >
            {["Best seller", "Sale"].map((tab, index) => (
              <li
                onClick={() => {
                  setActiveTab(tab);
                }}
                className="nav-tab-item"
                role="presentation"
                key={index}
              >
                <a className={activeTab === tab ? "active" : ""}>{tab}</a>
              </li>
            ))}
          </ul> */}
            <div className="tab-content">
              <div className="tab-pane active show">
                <div className="grid-layout" data-grid="grid-4">
                  {products.length > 0 &&
                    products.map((product, index) => (
                      <>
                        {data === "flash-sale-id" ? (
                          <ProductCard10 key={product.id} product={product} />
                        ) : (
                          <ProductCard21 key={index} product={product} />
                        )}
                      </>
                    ))}
                </div>
                {products.length < filtered.length && (
                  <div className="tf-pagination-wrap view-more-button text-center">
                    <button
                      className={`tf-btn-loading tf-loading-default style-2 btn-loadmore ${
                        loading ? "loading" : ""
                      }`}
                      onClick={handleLoad}
                      disabled={loading}
                    >
                      <span className="text">
                        {loading ? "Loading..." : "Load more"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>


      
    </>
  );
}
