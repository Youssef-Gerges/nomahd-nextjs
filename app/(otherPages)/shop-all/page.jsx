import React from "react";
import Features from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import CollectionBanner from "@/components/homes/home-men/CollectionBanner";
import Announcment from "@/components/homes/multi-brand/Announcment";
import Brands from "@/components/homes/multi-brand/Brands";
import ShopDefault from "@/components/shop/ShopDefault";
export const metadata = {
  title: "SHOP ALL || Nomahd - Ultimate Nextjs Ecommerce Template",
  description: "Nomahd - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Announcment />
      <Header7 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">All Products</div>
        </div>
      </div>
      <ShopDefault data={"all-products"} />
      <CollectionBanner />
      <Features bgColor="" />
      <Brands />
      <Footer1 bgColor="background-gray" />
    </>
  );
}
