import Features from "@/components/common/Features";
import ShopGram from "@/components/common/ShopGram";
// import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header7 from "@/components/headers/Header7";
import BannerCollection from "@/components/homes/multi-brand/BannerCollection";
import Brands from "@/components/homes/multi-brand/Brands";
import Categories from "@/components/homes/multi-brand/Categories";
import Collection from "@/components/homes/multi-brand/Collection";

import Hero from "@/components/homes/multi-brand/Hero";
import Products from "@/components/homes/multi-brand/Products";
import Testimonials from "@/components/homes/multi-brand/Testimonials";
// import Categories from "@/components/homes/home-1/Categories";
import Categories2 from "@/components/homes/multi-brand/Categories2";
import Announcment from "@/components/homes/multi-brand/Announcment";

// import Hero from "@/components/homes/home-1/Hero";

// import Products from "@/components/homes/home-1/Products";
// import useTranslation from "next-translate/useTranslation";
export const metadata = {
  title: "Home || Nomahd ",
  description: "Nomahd",
};
export default function Home() {
  return (
    <>
      <Announcment />
      <Header7 />
      <Categories isHomeCategories={true}/>
      <Hero />
      <Categories2 />
      <BannerCollection />
      <Products />
      <Collection />
      <Testimonials />
      <div className="mt-5"></div>
      <Features />
      <Brands />
      <Footer1 bgColor="background-gray" />
    </>
  );
}
