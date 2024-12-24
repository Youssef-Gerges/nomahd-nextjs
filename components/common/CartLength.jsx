"use client";

import { useGetCartData } from "@/api/cart/getCart";
import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";

export default function CartLength() {
  const { cartProducts } = useContextElement();
  const [cartLength , setCartLength] = useState(0);
  const id = localStorage.getItem("id");
  const cartData = useGetCartData();

  useEffect(() => {
    cartData.mutate({ user_id: id });
  }, []);

  useEffect(()=>{
    setCartLength(
      cartData?.data?.data.data.reduce(
        (total, entry) => total + (entry.cart_items?.length || 0),
        0
      )
    );
  },[cartData])
  return <>{cartLength}</>;
}
