"use client";

import { useEffect, useState, useRef } from "react";
import { useGetReturnPolicy } from "@/api/general/getReturnPolicy";
import { useGetSupportPolicy } from "@/api/general/getSupportPolicy";
import Reviews from "./Reviews";

const tabs = [
  { title: "Description", active: true },
  { title: "Review", active: false },
  { title: "Shiping", active: false },
  { title: "Return Polocies", active: false },
];

export default function ShopDetailsTab({ product }) {
  const [currentTab, setCurrentTab] = useState(1);
  const {data: returnPolicy} = useGetReturnPolicy();
  const {data: supportPolicy} = useGetSupportPolicy();
  const iframeRef = useRef(null);
  useEffect(() => {
    const adjustIframeHeight = () => {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        const iframeDocument = iframe.contentWindow.document;
        const contentHeight = iframeDocument.body.scrollHeight;
        iframe.style.height = `${contentHeight + 20}px`;
      }
    };

    const iframe = iframeRef.current;

    // Adjust height after iframe loads
    if (iframe) {
      iframe.addEventListener("load", adjustIframeHeight);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", adjustIframeHeight);
      }
    };
  }, []);
  return (
    <section
      className="flat-spacing-17 pt_0"
      style={{ maxWidth: "100vw", overflow: "clip" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="widget-tabs style-has-border">
              <ul className="widget-menu-tab">
                {tabs.map((elm, i) => (
                  <li
                    key={i}
                    onClick={() => setCurrentTab(i + 1)}
                    className={`item-title ${
                      currentTab == i + 1 ? "active" : ""
                    } `}
                  >
                    <span className="inner">{elm.title}</span>
                  </li>
                ))}
              </ul>
              <div className="widget-content-tab">
                <div
                  className={`widget-content-inner ${
                    currentTab == 1 ? "active" : ""
                  } `}
                >
                  <div className="">
                    {/* <div className="tf-product-des-demo">
                      <div className="right">
                        <h3 className="fs-16 fw-5">Features</h3>
                       
                        <ul>
                          <li>Front button placket</li>
                          <li>Adjustable sleeve tabs</li>
                          <li>Babaton embroidered crest at placket and hem</li>
                        </ul>
                        <h3 className="fs-16 fw-5">Materials Care</h3>
                        <ul className="mb-0">
                          <li>Content: 100% LENZING™ ECOVERO™ Viscose</li>
                          <li>Care: Hand wash</li>
                          <li>Imported</li>
                        </ul>
                      </div>
                      <div className="left">
                        <h3 className="fs-16 fw-5">Materials Care</h3>
                        <div className="d-flex gap-10 mb_15 align-items-center">
                          <div className="icon">
                            <i className="icon-machine" />
                          </div>
                          <span>Machine wash max. 30ºC. Short spin.</span>
                        </div>
                        <div className="d-flex gap-10 mb_15 align-items-center">
                          <div className="icon">
                            <i className="icon-iron" />
                          </div>
                          <span>Iron maximum 110ºC.</span>
                        </div>
                        <div className="d-flex gap-10 mb_15 align-items-center">
                          <div className="icon">
                            <i className="icon-bleach" />
                          </div>
                          <span>Do not bleach/bleach.</span>
                        </div>
                        <div className="d-flex gap-10 mb_15 align-items-center">
                          <div className="icon">
                            <i className="icon-dry-clean" />
                          </div>
                          <span>Do not dry clean.</span>
                        </div>
                        <div className="d-flex gap-10 align-items-center">
                          <div className="icon">
                            <i className="icon-tumble-dry" />
                          </div>
                          <span>Tumble dry, medium hear.</span>
                        </div>
                      </div>
                    </div> */}

                    <iframe
                      ref={iframeRef}
                      sandbox="allow-same-origin"
                      className="product-description"
                      srcDoc={product?.description}
                      style={{
                        width: "100%",
                        border: "none",
                        overflow: "hidden",
                        height: "1140px",
                      }}
                    ></iframe>
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab == 2 ? "active" : ""
                  } `}
                >
                  <div className="tf-page-privacy-policy">
                    <Reviews product={product} />
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab == 3 ? "active" : ""
                  } `}
                >
                  <div className="tf-page-privacy-policy">
                    <div  dangerouslySetInnerHTML={{__html: supportPolicy?.data[0]?.content}}></div>
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    currentTab == 4 ? "active" : ""
                  } `}
                >
                  <div className="tf-page-privacy-policy">
                    <div  dangerouslySetInnerHTML={{__html: returnPolicy?.data[0]?.content}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
