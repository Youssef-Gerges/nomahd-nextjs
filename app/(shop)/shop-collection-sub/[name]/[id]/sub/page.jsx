import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";
import Announcment from "@/components/homes/multi-brand/Announcment";
import ShopDefault from "@/components/shop/ShopDefault";
import Subcollections from "@/components/shop/Subcollections";
export async function generateMetadata({ params }) {
  const { name } = params;
  return {
    title: `${decodeURIComponent(
      name
    )} || Ecomus - Ultimate Nextjs Ecommerce Template`,
    description: `Explore our collection of ${decodeURIComponent(
      name
    )} at Ecomus - Ultimate Nextjs Ecommerce Template`,
  };
}
// export const metadata = {
//   title:
//     "Product Collection Sub || Ecomus - Ultimate Nextjs Ecommerce Template",
//   description: "Ecomus - Ultimate Nextjs Ecommerce Template",
// };
export default function page({ params }) {
  const { name, id, subId } = params;

  return (
    <>
      {/* <Topbar1 /> */}
      <Announcment />
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">{decodeURIComponent(name)}</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <Subcollections data={"home-category"} id={id} />
      <ShopDefault data={"sub-category"} id={id} />
      <Footer1 />
    </>
  );
}
