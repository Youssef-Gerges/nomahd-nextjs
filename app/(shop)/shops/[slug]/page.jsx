import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Announcment from "@/components/homes/multi-brand/Announcment";
import ShopDefault from "@/components/shop/ShopDefault";
import Subcollections from "@/components/shop/Subcollections";
import SellerHeader from "@/components/shop/SellerHeader";
import SellerProducts from "@/components/shop/SellerProducts";
export async function generateMetadata({ params }) {
  const { slug } = params;
  return {
    title: `${decodeURIComponent(
      slug
    )} || Nomahd - Ultimate Ecommerce`,
    description: `Explore our collection of ${decodeURIComponent(
      slug
    )} at Nomahd - Ultimate Ecommerce`,
  };
}

export default function page({ params }) {
  const { slug } = params;

  return (
    <>
      {/* <Topbar1 /> */}
      <Announcment/>
      <Header2 />
      <SellerHeader slug={slug} />
      <SellerProducts id={slug} />
      <Footer1 />
    </>
  );
}
