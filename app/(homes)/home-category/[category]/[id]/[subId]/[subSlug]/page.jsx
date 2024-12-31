"use client";
import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";

import Products from "@/components/homes/home-men/Products";
import Announcment from "@/components/homes/multi-brand/Announcment";
import Categories from "@/components/homes/multi-brand/Categories";
import { useGetLinkCategories } from "@/api/categories/getLinkCategories";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const { categories, subCategories, setCategoryId, linkProducts, setLink } =
    useContextElement();
  // const [link, setLink] = useState(null);
  const [banner, setBanner] = useState("");
  const [categoryName, setCategoryName] = useState(null);
  const [foundCategory, setFoundCategory] = useState(null);
  // const { data } = useGetLinkCategories(link);
  const { category, id, subId, subSlg } = params;
  useEffect(() => {
    const name = categories?.data.find((item) => item.id == id)?.name;
    setCategoryName(name);
    const catId = categories?.data.find((item) => item.id == id)?.id;
    setCategoryId(catId);
    console.log("catt", categoryName, id);
  }, [categories]);

  useEffect(() => {
    const foundLink = subCategories?.data.find((item) => item.id == subId)
      ?.links.sub_categories;
    setLink(foundLink);
    const cat = subCategories?.data.find((item) => item.id == subId);
    setFoundCategory(cat);
    console.log("catt sub id", cat, subCategories?.data, subId);
  }, [subCategories]);
  return (
    <>
      <Announcment />
      <Header7 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />
              <Link
                href={`/home-category/${foundCategory?.name}/${foundCategory?.id}`}
                className="text"
              >
                {categoryName}
              </Link>
              <i className="icon icon-arrow-right" />
              <span>{foundCategory?.name}</span>
            </div>
            {/* <ProductSinglePrevNext currentId={product?.slug} /> */}
          </div>
        </div>
      </div>
      <Categories
        category={foundCategory}
        subCategories={subCategories?.data}
      />
      {/* <Hero banner={banner} /> */}
      {/* <Countdown /> */}
      {/* <Collections /> */}
      {/* <Banner /> */}
      <Products data={"home-category"} link={setLink} />
      {/* <CollectionBanner /> */}
      {/* <Features bgColor="" /> */}
      {/* <Blogs /> */}
      {/* <Marquee /> */}
      <Footer1 bgColor="background-gray" />
    </>
  );
}
