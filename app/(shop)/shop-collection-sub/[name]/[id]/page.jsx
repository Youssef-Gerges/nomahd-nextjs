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
    )} || Nomahd - Ultimate Ecommerce`,
    description: `Explore our collection of ${decodeURIComponent(
      name
    )} at Nomahd - Ultimate Ecommerce`,
  };
}
// export const metadata = {
//   title:
//     "Product Collection Sub || Nomahd - Ultimate Ecommerce",
//   description: "Nomahd - Ultimate Ecommerce",
// };
export default function page({ params }) {
  const { name, id } = params;

  return (
    <>
      {/* <Topbar1 /> */}
      <Announcment/>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">{decodeURIComponent(name)}</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <Subcollections data={"home-category"} id={id}/>
      <ShopDefault data={"home-category"} id={id} />
      <Footer1 />
    </>
  );
}
