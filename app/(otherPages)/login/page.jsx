import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Login || Nomahd - Ultimate Ecommerce",
  description: "Nomahd - Ultimate Ecommerce",
};
const Login = dynamic(() => import('@/components/othersPages/Login'), { ssr: false });

export default function page() {
  return (
    <>
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Log in</div>
        </div>
      </div>

      <Login type={'customer'} />
      <Footer1 />
    </>
  );
}
