"use client";

import { useGetAllCurrencies } from "@/api/general/getAllCurrencies";
import { useEffect, useState } from "react";

export default function CurrencySelect({ topStart = false, light = false }) {
  const {data:optionsData} = useGetAllCurrencies();
  
  const [selected, setSelected] = useState();
  const [isDDOpen, setIsDDOpen] = useState(false);

  useEffect(() => {
    if (optionsData?.data?.is_default) {
      setSelected(optionsData?.data);
    } else {
      setSelected(optionsData?.data.find((option) => option.is_default));
    }
    setIsDDOpen(false);
  }, [optionsData])

  return (
    <div
      onClick={() => setIsDDOpen((pre) => !pre)}
      className={`dropdown bootstrap-select image-select center style-default type-currencies ${
        light ? "color-white" : ""
      } dropup`}
    >
      <button
        type="button"
        tabIndex={-1}
        className={`btn dropdown-toggle btn-light  ${isDDOpen ? "show" : ""} `}
        title="USD $ | United States"
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">
              {`${selected?.code} ${selected?.symbol} | ${selected?.name}`}
            </div>
          </div>
        </div>
      </button>
      <div
        className={`dropdown-menu ${isDDOpen ? "show" : ""} `}
        style={{
          maxHeight: "899.688px",
          overflow: "hidden",
          minHeight: 142,
          position: "absolute",
          inset: "auto auto 0px 0px",
          margin: 0,
          transform: `translate(0px, ${topStart ? 22 : -20}px)`,
        }}
        data-popper-placement={`${!topStart ? "top" : "bottom"}-start`}
      >
        <div
          className="inner show"
          style={{ maxHeight: "869.688px", overflowY: "auto", minHeight: 112 }}
        >
          <ul
            className="dropdown-menu inner show"
            role="presentation"
            style={{ marginTop: 0, marginBottom: 0 }}
          >
            {optionsData?.data?.map((elm, i) => (
              <li onClick={() => setSelected(elm)} key={i}>
                <a
                  className={`dropdown-item ${
                    selected == elm ? "active selected" : ""
                  }`}
                >
                  <span className="text">
                    {`${elm?.code} ${elm?.symbol} | ${elm?.name}`}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
