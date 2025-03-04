"use client";
import { useGetCartData } from "@/api/cart/getCart";
import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";

export default function CartLength() {
  const {data: cartData} = useGetCartData();
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    if (cartData) {
      let items = [];
      
      cartData.data?.map(shop => {
        items = [...items, ...shop.cart_items]
      })
      
      setCartLength(items.length)
    }
  }, [cartData]);
  return <>{cartLength || 0}</>;
}
