"use client";
import {sortingOptions} from "@/data/shop";
import React, {useEffect, useState} from "react";

export default function Sorting({products, setFinalSorted}) {
    const [selectedOptions, setSelectedOptions] = useState(null);

    useEffect(() => {
        setSelectedOptions(sortingOptions[0]);
    }, []);

    useEffect(() => {
        if (!selectedOptions) return;

        if (selectedOptions.text === "Default") {
            setFinalSorted([...products]);
        } else if (selectedOptions.text === "Alphabetically, A-Z") {
            setFinalSorted([...products].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (selectedOptions.text === "Alphabetically, Z-A") {
            setFinalSorted([...products].sort((a, b) => b.name.localeCompare(a.name)));
        } else if (selectedOptions.text === "Price, low to high") {
            setFinalSorted([...products].sort((a, b) => a.calculable_price - b.calculable_price));
        } else if (selectedOptions.text === "Price, high to low") {
            setFinalSorted([...products].sort((a, b) => b.calculable_price - a.calculable_price));
        }
    }, [products, selectedOptions, setFinalSorted]);

    return (
        <>
            <div className="btn-select">
                <span className="text-sort-value">{selectedOptions?.text}</span>
                <span className="icon icon-arrow-down"/>
            </div>
            <div className="dropdown-menu">
                {sortingOptions.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedOptions(item)}
                        className={`select-item ${item === selectedOptions ? "active" : ""}`}
                    >
                        <span className="text-value-item">{item.text}</span>
                    </div>
                ))}
            </div>
        </>
    );
}