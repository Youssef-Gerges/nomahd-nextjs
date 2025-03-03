"use client"

import {useContext} from "react";
import {useGetShopDetails} from "@/api/shop/getShopInfo";

export default function SellerHeader({slug}) {
    const {data} = useGetShopDetails(slug);
    return (
        <div className="tf-page-title">
            <div className="container-full">
                <div className="heading text-center">{data?.name}</div>
                <p className="text-center text-2 text_black-2 mt_5">
                    Shop through {data?.name} latest selection of Fashion
                </p>
            </div>
        </div>
    )

}