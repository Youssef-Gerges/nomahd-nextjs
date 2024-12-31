import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import Announcment from "@/components/homes/multi-brand/Announcment";
import Link from "next/link";
import Products from "@/components/homes/home-men/Products";
export const metadata = {
  title: "FLASH SALE || Nomahd - Ultimate Nextjs Ecommerce Template",
  description: "Nomahd - Ultimate Nextjs Ecommerce Template",
};
export default function page({ params }) {
  const { id } = params;
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
              <Link href={`/flash-sale`} className="text">
                Flash Sale
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Products data={"flash-sale-id"} id={id} />

      <Footer1 bgColor="background-gray" />
    </>
  );
}
