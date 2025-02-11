import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Cart from "@/components/othersPages/Cart";
import React from "react";

export const metadata = {
  title: "View Cart || Nomahd - Ultimate Ecommerce",
  description: "Nomahd - Ultimate Ecommerce",
};
export default function page() {
  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Shopping Cart</div>
        </div>
      </div>

      <Cart />
      <Footer1 />
    </>
  );
}
