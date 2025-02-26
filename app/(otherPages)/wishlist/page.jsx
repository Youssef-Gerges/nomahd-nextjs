import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Announcment from "@/components/homes/multi-brand/Announcment";

import Wishlist from "@/components/othersPages/Wishlist";
import React from "react";

export const metadata = {
  title: "Wishlist || Nomahd - Ultimate Ecommerce",
  description: "Nomahd - Ultimate Ecommerce",
};
export default function page() {
  return (
    <>
      {/* <Topbar1 /> */}
      <Announcment/>
      <Header2 />
      <div className="tf-page-title ">
        <div className="container-full">
          <div className="heading text-center">Your wishlist</div>
        </div>
      </div>

      <Wishlist />

      <Footer1 />
    </>
  );
}
