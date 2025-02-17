"use client";
import { useContextElement } from "@/context/Context";
import { useState, useEffect } from "react";

export default function WishlistLength() {
  const { wishlist } = useContextElement();
  const [wishlistLength, setWishlistLength] = useState(0);

  useEffect(() => {
    setWishlistLength(wishlist?.data?.length);
  }, [wishlist]);

  return <>{wishlistLength || 0}</>;
}
