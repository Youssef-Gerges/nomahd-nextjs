"use client";
import { useGetAllCategories } from "@/api/categories/getAllCategories";
import { useGetLinkCategories } from "@/api/categories/getLinkCategories";
import Features from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Header16 from "@/components/headers/Header16";
import Header7 from "@/components/headers/Header7";
import Banner from "@/components/homes/home-men/Banner";
import Blogs from "@/components/homes/home-men/Blogs";
import CollectionBanner from "@/components/homes/home-men/CollectionBanner";
import Collections from "@/components/homes/home-men/Collections";
import Countdown from "@/components/homes/home-men/Countdown";
import Hero from "@/components/homes/home-men/Hero";
import Marquee from "@/components/homes/home-men/Marquee";
import Products from "@/components/homes/home-men/Products";
import Announcment from "@/components/homes/multi-brand/Announcment";

import React, { useEffect, useState } from "react";

// export const metadata = {
//   title: "Home Men || Ecomus - Ultimate Nextjs Ecommerce Template",
//   description: "Ecomus - Ultimate Nextjs Ecommerce Template",
// };
export default function page({ params }) {
  const { data: categories } = useGetAllCategories();
  const [link, setLink] = useState(null);
  const [banner, setBanner] = useState("");
  const { data } = useGetLinkCategories(link);
  const { category, id } = params;
  useEffect(() => {
    const foundLink = categories?.data.find((item) => item.id == id)?.links
      .products;
    setLink(foundLink);
    const foundBanner = categories?.data.find((item) => item.id == id)?.banner;
    setBanner(foundBanner);
    console.log("catt", categories?.data, id, foundLink);
  }, [categories]);
  return (
    <>
      <Announcment />
      <Header7 />
      <Hero banner={banner} />
      <Countdown />
      <Collections />
      <Banner />
      <Products />
      <CollectionBanner />
      <Features bgColor="" />
      <Blogs />
      <Marquee />
      <Footer1 bgColor="background-gray" />
    </>
  );
}
