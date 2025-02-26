import React from "react";
import Features from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import CollectionBanner from "@/components/homes/home-men/CollectionBanner";
import Products from "@/components/homes/home-men/Products";
import Announcment from "@/components/homes/multi-brand/Announcment";
import Brands from "@/components/homes/multi-brand/Brands";
import Link from "next/link";
export const metadata = {
  title: "BEST SELLING || Nomahd - Ultimate Nextjs Ecommerce Template",
  description: "Nomahd - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Announcment />
      <Header7 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Best Selling</div>
        </div>
      </div>
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />
              <span className="text">Best Selling</span>
            </div>
            {/* <ProductSinglePrevNext currentId={product?.slug} /> */}
          </div>
        </div>
      </div>
      {/* <Countdown /> */}
      {/* <Collections /> */}
      {/* <Banner /> */}
      <Products data={"best-selling"} />
      <CollectionBanner />
      <Features bgColor="" />
      {/* <Blogs /> */}
      {/* <Marquee /> */}
      <Brands />
      <Footer1 bgColor="background-gray" />
    </>
  );
}
