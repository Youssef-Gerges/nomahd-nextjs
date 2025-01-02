"use client";
import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";

export default function CartLength() {
  const { cartData } = useContextElement();
  const [cartLength, setCartLength] = useState(0);

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
