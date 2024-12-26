"use client";

import { useGetCartData } from "@/api/cart/getCart";
import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";

export default function CartLength() {
  const [id, setId] = useState(null);
  const { cartProducts } = useContextElement();
  const [cartLength, setCartLength] = useState(0);
  const { data: cartData } = useGetCartData(id);
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      setId(userId);
    }
  }, []);

  useEffect(() => {
    setCartLength(
      cartData?.data?.data?.data.reduce(
        (total, entry) => total + (entry.cart_items?.length || 0),
        0
      )
    );
  }, [cartData]);
  return <>{cartLength || 0}</>;
}
