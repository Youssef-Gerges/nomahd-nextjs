"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import HomesModal from "@/components/modals/HomesModal";
import Context from "@/context/Context";
import QuickView from "@/components/modals/QuickView";
import ProductSidebar from "@/components/modals/ProductSidebar";
import QuickAdd from "@/components/modals/QuickAdd";
import Compare from "@/components/modals/Compare";
import ShopCart from "@/components/modals/ShopCart";
import AskQuestion from "@/components/modals/AskQuestion";
import BlogSidebar from "@/components/modals/BlogSidebar";
import ColorCompare from "@/components/modals/ColorCompare";
import DeliveryReturn from "@/components/modals/DeliveryReturn";
import FindSize from "@/components/modals/FindSize";
import Login from "@/components/modals/Login";
import MobileMenu from "@/components/modals/MobileMenu";
import Register from "@/components/modals/Register";
import ResetPass from "@/components/modals/ResetPass";
import SearchModal from "@/components/modals/SearchModal";
import ToolbarBottom from "@/components/modals/ToolbarBottom";
import ToolbarShop from "@/components/modals/ToolbarShop";
import { usePathname } from "next/navigation";
import ShareModal from "@/components/modals/ShareModal";
import ScrollTop from "@/components/common/ScrollTop";
import Head from "next/head";
import AddPackage from "../components/modals/AddPackage";
import { Toaster } from "react-hot-toast";

function RootLayout({ children }) {
  const pathname = usePathname();
  const [queryClient] = useState(()=>  new QueryClient());

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then(() => {});
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 100) {
        header.classList.add("header-bg");
      } else {
        header.classList.remove("header-bg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    setScrollDirection("up");
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
      } else {
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const bootstrap = require("bootstrap");
    const modalElements = document.querySelectorAll(".modal.show");
    modalElements.forEach((modal) => {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    });

    const offcanvasElements = document.querySelectorAll(".offcanvas.show");
    offcanvasElements.forEach((offcanvas) => {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    });
  }, [pathname]);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (scrollDirection == "up") {
        header.style.top = "0px";
      } else {
        header.style.top = "-185px";
      }
    }
  }, [scrollDirection]);

  useEffect(() => {
    const { WOW } = require("wowjs");
    const wow = new WOW({ mobile: false, live: false });
    wow.init();
  }, [pathname]);

  useEffect(() => {
    const initializeDirection = () => {
      const direction = localStorage.getItem("direction");

      if (direction) {
        const parsedDirection = JSON.parse(direction);
        document.documentElement.dir = parsedDirection.dir;
        document.body.classList.add(parsedDirection.dir);
      } else {
        document.documentElement.dir = "ltr";
      }

      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.classList.add("disabled");
      }
    };

    initializeDirection();
  }, []);

  return (
    <html lang={'en'}>
    <Head>
        <meta
            http-equiv="Content-Security-Policy"
            content="script-src 'self' https://accounts.google.com https://www.gstatic.com; object-src 'none';"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
              integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
              crossorigin="anonymous" referrerpolicy="no-referrer"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js"
                integrity="sha512-b+nQTCdtTBIRIbraqNEwsjB6UvL3UEMkXnhzd8awtCYh0Kcsjl9uEgwVFVbhoj3uu1DO1ZMacNvLoyJJiNfcvg=="
                crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </Head>
    <body className="preload-wrapper">
    <QueryClientProvider client={queryClient}>
        <div className="preload preload-container" id="preloader">
            <div className="preload-logo">
              <div className="spinner"></div>
            </div>
          </div>

          <Context>
            <Toaster position="bottom-left" />
            <div id="wrapper">{children}</div>
            {/* <RtlToggle /> */}
            <HomesModal /> <QuickView />
            <QuickAdd />
            <AddPackage />
            <ProductSidebar />
            <Compare />
            <ShopCart />
            <AskQuestion />
            <BlogSidebar />
            <ColorCompare />
            <DeliveryReturn />
            <FindSize />
            <Login />
            <MobileMenu />
            <Register />
            <ResetPass />
            <SearchModal />
            <ToolbarBottom />
            <ToolbarShop />
            {/* <NewsletterModal /> */}
            <ShareModal />
          </Context>
          <ScrollTop />
        </QueryClientProvider>
      </body>
    </html>
  );
}
export default RootLayout;
