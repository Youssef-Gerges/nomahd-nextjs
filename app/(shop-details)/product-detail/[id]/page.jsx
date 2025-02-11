"use client";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Products from "@/components/shopDetails/Products";

import RecentProducts from "@/components/shopDetails/RecentProducts";
import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import { useGetProductDetails } from "@/api/products/getProductDetails";
export default function page({ params }) {
  const [product, setProduct] = useState(
    null
  );
  const { data } = useGetProductDetails(params.id);
  useEffect(() => {
    // if (data) {
      setProduct(data?.data[0]);
    // }
  }, [data]);

  useEffect(()=>{
    console.log("product is :" , product)
  },[product])
  return (
    <>
      <Header2 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />
              <span className="text">
                {product?.name}
              </span>
            </div>
            {/* <ProductSinglePrevNext currentId={product?.slug} /> */}
          </div>
        </div>
      </div>
      <DetailsOuterZoom product={product} />
      <ShopDetailsTab product={product}/>
      <Products />
      <RecentProducts id={product} />
      <Footer1 />
    </>
  );
}

// import Footer1 from "@/components/footers/Footer1";
// import Header2 from "@/components/headers/Header2";
// import Products from "@/components/shopDetails/Products";
// import RecentProducts from "@/components/shopDetails/RecentProducts";
// import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";
// import React from "react";
// import Link from "next/link";
// import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
// import ProductSinglePrevNext from "@/components/common/ProductSinglePrevNext";
// import { api } from "@/api/api";

// export const metadata = {
//   title: "Shop Details || Nomahd - Ultimate Ecommerce",
//   description: "Nomahd - Ultimate Ecommerce",
// };

// export default async function Page({ params }) {
//   console.log("Page component started...");
//   console.log("Params:", params);

//   let product;

//   try {
//     console.log("Start fetching product details...");
//     const response = await api.get(`/products/${params.id}`);
//     console.log("API Response:", response);

//     if (response.status === 200) {
//       product = response.data;
//       console.log("Product details fetched successfully:", product);
//     } else {
//       console.warn("Product not found, status:", response.status);
//       product = null;
//     }
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     product = null;
//   }

//   if (!product) {
//     console.warn("Fallback product being used...");
//     product = {
//       id: 0,
//       title: "Fallback Product",
//       description: "No product found",
//     };
//   }

//   console.log("Rendering product:", product);

//   return (
//     <>
//       <Header2 />
//       <div className="tf-breadcrumb">
//         <div className="container">
//           <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
//             <div className="tf-breadcrumb-list">
//               <Link href={`/`} className="text">
//                 Home
//               </Link>
//               <i className="icon icon-arrow-right" />
//               <span className="text">
//                 {product.title ? product.title : "Cotton jersey top"}
//               </span>
//             </div>
//             <ProductSinglePrevNext currentId={product.id} />
//           </div>
//         </div>
//       </div>
//       <DetailsOuterZoom product={product} />
//       <ShopDetailsTab />
//       <Products />
//       <RecentProducts />
//       <Footer1 />
//     </>
//   );
// }
