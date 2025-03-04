import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import Announcment from "@/components/homes/multi-brand/Announcment";
import Categories from "@/components/homes/multi-brand/Categories";
import Link from "next/link";
import Image from "next/image";
import FlashSale from "@/components/homes/multi-brand/FlashSale";
export const metadata = {
  title: "FLASH SALE || Nomahd - Ultimate Nextjs Ecommerce Template",
  description: "Nomahd - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
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
              <span className="text">Flash Deals</span>
            </div>
          </div>
        </div>
      </div>

      <FlashSale />

      <Footer1 bgColor="background-gray" />
    </>
  );
}
