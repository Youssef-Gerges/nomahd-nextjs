"use client";

// import { useEffect, useState } from "react";

// import "../public/scss/main.scss";
// import "photoswipe/dist/photoswipe.css";
// import "rc-slider/assets/index.css";
// import HomesModal from "@/components/modals/HomesModal";
// import Context from "@/context/Context";
// import QuickView from "@/components/modals/QuickView";
// import ProductSidebar from "@/components/modals/ProductSidebar";
// import QuickAdd from "@/components/modals/QuickAdd";
// import Compare from "@/components/modals/Compare";
// import ShopCart from "@/components/modals/ShopCart";
// import AskQuestion from "@/components/modals/AskQuestion";
// import BlogSidebar from "@/components/modals/BlogSidebar";
// import ColorCompare from "@/components/modals/ColorCompare";
// import DeliveryReturn from "@/components/modals/DeliveryReturn";
// import FindSize from "@/components/modals/FindSize";
// import Login from "@/components/modals/Login";
// import MobileMenu from "@/components/modals/MobileMenu";
// import Register from "@/components/modals/Register";
// import ResetPass from "@/components/modals/ResetPass";
// import SearchModal from "@/components/modals/SearchModal";
// import ToolbarBottom from "@/components/modals/ToolbarBottom";
// import ToolbarShop from "@/components/modals/ToolbarShop";

// import { usePathname } from "next/navigation";
// import NewsletterModal from "@/components/modals/NewsletterModal";
// import ShareModal from "@/components/modals/ShareModal";
// import ScrollTop from "@/components/common/ScrollTop";
// import RtlToggle from "@/components/common/RtlToggle";

// export default function RootLayout({ children }) {
//   const pathname = usePathname();
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Import the script only on the client side
//       import("bootstrap/dist/js/bootstrap.esm").then(() => {
//         // Module is imported, you can access any exported functionality if
//       });
//     }
//   }, []);
//   useEffect(() => {
//     const handleScroll = () => {
//       const header = document.querySelector("header");
//       if (window.scrollY > 100) {
//         header.classList.add("header-bg");
//       } else {
//         header.classList.remove("header-bg");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Cleanup function to remove event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

//   const [scrollDirection, setScrollDirection] = useState("down");

//   useEffect(() => {
//     setScrollDirection("up");
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > 250) {
//         if (currentScrollY > lastScrollY.current) {
//           // Scrolling down
//           setScrollDirection("down");
//         } else {
//           // Scrolling up
//           setScrollDirection("up");
//         }
//       } else {
//         // Below 250px
//         setScrollDirection("down");
//       }

//       lastScrollY.current = currentScrollY;
//     };

//     const lastScrollY = { current: window.scrollY };

//     // Add scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup: remove event listener when component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [pathname]);
//   useEffect(() => {
//     // Close any open modal
//     const bootstrap = require("bootstrap"); // dynamically import bootstrap
//     const modalElements = document.querySelectorAll(".modal.show");
//     modalElements.forEach((modal) => {
//       const modalInstance = bootstrap.Modal.getInstance(modal);
//       if (modalInstance) {
//         modalInstance.hide();
//       }
//     });

//     // Close any open offcanvas
//     const offcanvasElements = document.querySelectorAll(".offcanvas.show");
//     offcanvasElements.forEach((offcanvas) => {
//       const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
//       if (offcanvasInstance) {
//         offcanvasInstance.hide();
//       }
//     });
//   }, [pathname]); // Runs every time the route changes

//   useEffect(() => {
//     const header = document.querySelector("header");
//     if (header) {
//       if (scrollDirection == "up") {
//         header.style.top = "0px";
//       } else {
//         header.style.top = "-185px";
//       }
//     }
//   }, [scrollDirection]);
//   useEffect(() => {
//     const { WOW } = require("wowjs");
//     const wow = new WOW({
//       mobile: false,
//       live: false,
//     });
//     wow.init();
//   }, [pathname]);

//   useEffect(() => {
//     const initializeDirection = () => {
//       const direction = localStorage.getItem("direction");

//       if (direction) {
//         const parsedDirection = JSON.parse(direction);
//         document.documentElement.dir = parsedDirection.dir;
//         document.body.classList.add(parsedDirection.dir);
//       } else {
//         document.documentElement.dir = "ltr";
//       }

//       const preloader = document.getElementById("preloader");
//       if (preloader) {
//         preloader.classList.add("disabled");
//       }
//     };

//     initializeDirection();
//   }, []); // Only runs once on component mount

//   return (
//     <html lang="en">
//       <body className="preload-wrapper">

//         <div className="preload preload-container" id="preloader">
//           <div className="preload-logo">
//             <div className="spinner"></div>
//           </div>
//         </div>{" "}
//         <Context>
//           <div id="wrapper">{children}</div>
//           <RtlToggle />
//           <HomesModal /> <QuickView />
//           <QuickAdd />
//           <ProductSidebar />
//           <Compare />
//           <ShopCart />
//           <AskQuestion />
//           <BlogSidebar />
//           <ColorCompare />
//           <DeliveryReturn />
//           <FindSize />
//           <Login />
//           <MobileMenu />
//           <Register />
//           <ResetPass />
//           <SearchModal />
//           <ToolbarBottom />
//           <ToolbarShop />
//           <NewsletterModal />
//           <ShareModal />{" "}
//         </Context>
//         <ScrollTop />
//       </body>
//     </html>
//   );
// }
//  "use client";

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
// import nextI18nextConfig from "../next-i18next.config"; 
import { appWithTranslation } from "next-i18next";
import useTranslation from "next-translate/useTranslation";
import { usePathname } from "next/navigation";
import NewsletterModal from "@/components/modals/NewsletterModal";
import ShareModal from "@/components/modals/ShareModal";
import ScrollTop from "@/components/common/ScrollTop";
import RtlToggle from "@/components/common/RtlToggle";
import { Toaster } from "react-hot-toast";
// import i18n from "i18next";
import i18n from "@/i18n";
// import { useTranslation } from "react-i18next";
function RootLayout({ children }) {
  const pathname = usePathname();
  // const { t } = useTranslation();
  const {t, lang } = useTranslation('common');
  // const [lang, setLang] = useState("ar"); 

  // i18n.init({
  //   lng: i18n.language,
  //   debug: true,
    
  // }, function(err, t) {
  //   // initialized and ready to go!
  //   console.log("Ready to go!");
  // });
  const queryClient =  new QueryClient();

  // const changeLanguage = (newLang) => {
  //   const direction = newLang === 'ar' ? 'rtl' : 'ltr';
  //   document.documentElement.dir = direction;
  
  //   // router.push(router.pathname, router.asPath, { locale: newLang });
  // };

  const changeLanguage = async (newLang) => {
    const dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.body.className = dir;
    localStorage.setItem("language", newLang);
  
    try {
      await i18n.changeLanguage(newLang);
      setLang(newLang);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then(() => {});
    }
  }, []);
  // useEffect(() => {
  //   const savedLang = localStorage.getItem("language") || "ar";
  //   setLang(savedLang);

  //   const dir = savedLang === "ar" ? "rtl" : "ltr";
  //   document.documentElement.dir = dir;
  //   document.body.className = dir;

  //   if (i18n.isInitialized) {
  //     i18n.changeLanguage(savedLang).catch((err) => console.error("Error changing language:", err));
  //   } else {
  //     i18n.on("initialized", () => {
  //       i18n.changeLanguage(savedLang).catch((err) => console.error("Error changing language:", err));
  //     });
  //   }
  // }, []);

  // const handleLanguageChange = (newLang) => {
  //   setLang(newLang);
  //   localStorage.setItem("language", newLang);

  //   const dir = newLang === "ar" ? "rtl" : "ltr";
  //   document.documentElement.dir = dir;
  //   document.body.className = dir;

  //   i18n.changeLanguage(newLang).catch((err) => console.error("Error changing language:", err));
  // };

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
    // const direction = lang === "ar" ? "rtl" : "ltr";
    // document.documentElement.dir = direction;
    // document.body.className = direction;
    console.log("lang is " , lang)
  }, [lang]);

//   useEffect(() => {
// //     console.log("lolo i18n instance:", i18n);
// // console.log("lolo Current language:", i18n.language);

//     const initializeDirection = () => {
//       const direction = localStorage.getItem("direction");
//       if (direction) {
//         const parsedDirection = JSON.parse(direction);
//         document.documentElement.dir = parsedDirection.dir;
//         document.body.classList.add(parsedDirection.dir);
//         if (parsedDirection.dir === "ltr" ) {
//           // i18n.changeLanguage("en"); // Switch to English
//           handleLanguageChange("en")
//           console.log("langoo ",i18n.language, parsedDirection.dir)
//         } else if (parsedDirection.dir === "rtl" ) {
//           // i18n.changeLanguage("ar"); // Switch to Arabic
//           handleLanguageChange("ar")
//           console.log("langoo ",i18n.language, parsedDirection.dir)

//         }
//       } else {
//         document.documentElement.dir = "ltr";
//       }
//         // Set the language based on direction
//       const preloader = document.getElementById("preloader");
//       if (preloader) {
//         preloader.classList.add("disabled");
//       }
//     };

//     initializeDirection();
//   }, []);



  // useEffect(() => {
  //   const initializeLanguageAndDirection = async () => {
  //     const savedLang = localStorage.getItem("language") || "ar";
  //     const dir = savedLang === "ar" ? "rtl" : "ltr";
  
  //     document.documentElement.dir = dir;
  //     document.body.className = dir;
  
  //     try {
  //       await i18n.changeLanguage(savedLang);
  //       setLang(savedLang);
  //     } catch (error) {
  //       console.error("Error changing language:", error);
  //     }
  //   };
  
  //   initializeLanguageAndDirection();
  // }, []);
  

  // useEffect(() => {
  //   const initializeDirection = async () => {
  //     const direction = localStorage.getItem("direction");
  //     if (direction) {
  //       const parsedDirection = JSON.parse(direction);
  //       document.documentElement.dir = parsedDirection.dir;
  //       document.body.classList.add(parsedDirection.dir);
  
  //       if (parsedDirection.dir === "ltr") {
  //         await i18n.changeLanguage("en");
  //       } else if (parsedDirection.dir === "rtl") {
  //         await i18n.changeLanguage("ar");
  //       }
  //     } else {
  //       document.documentElement.dir = "ltr";
  //       await i18n.changeLanguage("en");
  //     }
  //   };
  
  //   initializeDirection();
  // }, []);
  
  useEffect(() => {
    console.log("i18n instance:", i18n);
    console.log("Current language:", i18n.language);
  
    const initializeDirection = () => {
      const direction = localStorage.getItem("direction");
      console.log("Retrieved direction:", direction);
  
      if (direction) {
        try {
          const parsedDirection = JSON.parse(direction);
          console.log("Parsed direction:", parsedDirection);
  
          document.documentElement.dir = parsedDirection.dir;
          document.body.classList.add(parsedDirection.dir);
  
          if (i18n.isInitialized) {
            if (parsedDirection.dir === "ltr") {
              i18n.changeLanguage("en"); // Switch to English
            } else if (parsedDirection.dir === "rtl") {
              i18n.changeLanguage("ar"); // Switch to Arabic
            }
          }
        } catch (error) {
          console.error("Error parsing direction from localStorage:", error);
        }
      } else {
        // Default direction
        document.documentElement.dir = "ltr";
      }
  
      // Handle preloader (if exists)
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.classList.add("disabled");
      }
    };
  
    initializeDirection();
  }, []);
  
  return (
    <html lang="en">
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
            <RtlToggle />
            <HomesModal /> <QuickView />
            <QuickAdd />
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
            <NewsletterModal />
            <ShareModal />
          </Context>
          <ScrollTop />
        </QueryClientProvider>
      </body>
    </html>
  );
}
export default appWithTranslation(RootLayout);
