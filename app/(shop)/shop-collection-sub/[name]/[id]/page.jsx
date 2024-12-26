"use client";
import { useGetFeaturedCategories } from "@/api/categories/getFeaturedCategories";
import { useGetLinkCategories } from "@/api/categories/getLinkCategories";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";
import ShopDefault from "@/components/shop/ShopDefault";
import Subcollections from "@/components/shop/Subcollections";
import React, { useState , useEffect } from "react";

// export const metadata = {
//   title:
//     "Product Collection Sub || Ecomus - Ultimate Nextjs Ecommerce Template",
//   description: "Ecomus - Ultimate Nextjs Ecommerce Template",
// };
export default function page({params}) {
  const { data: categories } = useGetFeaturedCategories();
  const [link, setLink] = useState(null);
  const [banner, setBanner] = useState("");
  const { data } = useGetLinkCategories(link);
  const [products , setProducts] = useState([]);
  const { name, id } = params;
  useEffect(() => {
    const foundLink = categories?.data.find((item) => item.id == id)?.links
      .products;
    setLink(foundLink);
    const foundBanner = categories?.data.find((item) => item.id == id)?.banner;
    setBanner(foundBanner);
  }, [categories]);
  
  useEffect(()=>{
    console.log("catt data",  data?.data);
    setProducts(data?.data)
  },[data])

  return (
    <>
      <Topbar1 />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">New Arrival</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <Subcollections />
      <ShopDefault products={products} setProducts={setProducts}/>
      <Footer1 />
    </>
  );
}
