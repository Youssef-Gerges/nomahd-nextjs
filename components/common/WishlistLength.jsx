"use client";

import { useGetUserWishlist } from "@/api/wishlist/getUserWishlist";
import { useContextElement } from "@/context/Context";
import { useState ,useEffect} from "react";

export default function WishlistLength() {
  const { wishList } = useContextElement();
  const { data: wishlistData } = useGetUserWishlist();
  const [wishlistLength, setWishlistLength] = useState(0);

  useEffect(() => {
    setWishlistLength(wishlistData?.data.length);
  }, [wishlistData]);

  return <>{wishlistLength}</>;
}
