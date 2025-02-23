import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import DashboardNav from "@/components/othersPages/dashboard/DashboardNav";
import OrderDetails from "@/components/othersPages/dashboard/OrderDetails";
import React from "react";

export const metadata = {
  title: "My Account Orders || Nomahd - Ultimate Ecommerce",
  description: "Nomahd - Ultimate Ecommerce",
};
export default function page({params}) {
    return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">My Orders</div>
        </div>
      </div>
      <section className="flat-spacing-11">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <DashboardNav />
            </div>
            <div className="col-lg-9">
              <OrderDetails orderId={params.id} />
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
