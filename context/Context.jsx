"use client";
import { useAddToCart } from "@/api/cart/addToCart";
import { useGetAllCategories } from "@/api/categories/getAllCategories";
import { useGetSubCategory } from "@/api/categories/getSubCategories";
import { useGetAllBrands } from "@/api/brand/getAllBrands";
import { useGetAllBanners } from "@/api/general/getAllBanners";
import { useGetAllFlashDeals } from "@/api/products/flashDeal/getAllFlashDeals";
import { useGetFlashDealProducts } from "@/api/products/flashDeal/getAllFlashDealsProducts";
import { useGetSubCategoryProducts } from "@/api/products/getAllSubCategoryProducts";
import { useGetBestSellingProducts } from "@/api/products/getBestSellingProducts";
import { useGetRelatedProducts } from "@/api/products/getRelatedProducts";
import { useCheckProductInWishlist } from "@/api/wishlist/checkProduct";
import { useGetUserWishlist } from "@/api/wishlist/getUserWishlist";
import { useAddToWishlistNew } from "@/api/wishlist/newAddToWishlist";
import { useNewRemoveFromWishlist } from "@/api/wishlist/newRemoveFromWishlist";
// import { allProducts } from "@/data/products";
import { openCartModal } from "@/utlis/openCartModal";
import { useGetTopBrands } from "@/api/brand/getTopBrands";
// import { openCart } from "@/utlis/toggleCart";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useGetAllProducts } from "@/api/products/useGetAllProducts";
import { useGetLinkCategories } from "@/api/categories/getLinkCategories";
import { useGetFeaturedCategories } from "@/api/categories/getFeaturedCategories";
import { useGetCartData } from "@/api/cart/getCart";
import {useQueryClient} from "@tanstack/react-query";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const queryClient = useQueryClient();
  const {data: userWishlist} = useGetUserWishlist();
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [link, setLink] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const addToCart = useAddToCart();
  const [productId, setProductId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const addToWishlist = useAddToWishlistNew({
      onSuccess: () => {
          queryClient.invalidateQueries()
          queryClient.refetchQueries()
      }
  });
  const [compareItem, setCompareItem] = useState([1, 2, 3]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [quickAddPackage, setQuickAddPackage] = useState({id: 0, products: []});
  const [totalPrice, setTotalPrice] = useState(0);
  const { data: wishlist } = useGetUserWishlist();
  const checkWishlist = useCheckProductInWishlist();
  const [addToWishlistSuccess, setAddToWishlistSucess] = useState(false);
  const { data: linkProducts } = useGetLinkCategories(link);
  const { data: allProducts } = useGetAllProducts(page);
  const { data: bestSelling } = useGetBestSellingProducts();
  const { data: relatedProducts } = useGetRelatedProducts(productId);
  const { data: subCategories } = useGetSubCategory(categoryId);
  const { data: categories } = useGetAllCategories();
  const { data: flashSale } = useGetAllFlashDeals();
  const [quickViewItem, setQuickViewItem] = useState(null);
  const { data: banners } = useGetAllBanners();
  const { data: brands } = useGetAllBrands();
  const { data: topBrands } = useGetTopBrands();
  const { data: featured } = useGetFeaturedCategories();
  // const { data: cartData } = useGetCartData(userId);
  const [removeFromWishlistSuccess, setRemoveFromWishlistSuccess] =
    useState(false);
  const removeFromWishlist = useNewRemoveFromWishlist();
  useEffect(() => {
    const subtotal = cartProducts?.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const handleCheckWishlist = (setIsInWishlist, product_id) => {
    if (product_id && userWishlist) {
      let items = [...userWishlist?.data];
      let selected_item = items.find(item => item.product.id === product_id)
     if(selected_item) {
      setIsInWishlist(true)
    } else{
       setIsInWishlist(false)
     }
    }
  };

  useEffect(() => {
    console.log("link is ", link);
  }, [link]);
  useEffect(() => {
    console.log("wishlist pro", wishlist?.data);
  }, [wishlist]);
  const addProductToCart = (id, qty) => {
    if (!cartProducts.filter((elm) => elm.id == id)[0]) {
      const item = {
        ...allProducts.filter((elm) => elm.id == id)[0],
        quantity: qty ? qty : 1,
      };
      setCartProducts((pre) => [...pre, item]);
      openCartModal();

      // openCart();
    }
  };

  const handleRemoveFromWishlist = async (product_id) => {
    removeFromWishlist.mutate(
      { productId: product_id, userId: userId }
    );
    await queryClient.invalidateQueries()
  };

  const handleAddToWishlist = (product_id) => {
    if (!userId) {
      const loginModal = document.getElementById("login");
      if (loginModal) {
        const bootstrap = require("bootstrap");
        const modal = new bootstrap.Modal(loginModal);
        modal.show();
      }
    } else {
      addToWishlist.mutate(
        { productId: product_id, userId: userId },
        {
          onSuccess: (data) => {
            setAddToWishlistSucess(true);
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
          },
          onError: (error) => {
            console.error("Error:", error.message);
          },
        }
      );
    }
  };

  const handleAddToCart = (item_id, variant, quantity, weight=0) => {
    if (!userId) {
      const loginModal = document.getElementById("login");
      if (loginModal) {
        const bootstrap = require("bootstrap");
        const modal = new bootstrap.Modal(loginModal);
        modal.show();
      }
    } else {
      addToCart.mutate({
        id: item_id,
        variant: variant?.replace(' ', '')?.replace('/', '-'),
        user_id: JSON.parse(userId),
        quantity: quantity,
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['cart', 'summery'])
          queryClient.refetchQueries(['cart', 'summery'])
      }
      });
      
    }
  };
  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };

  // const addToWishlist = (id) => {
  //   // if (!wishList.includes(id)) {
  //   //   setWishList((pre) => [...pre, id]);
  //   // } else {
  //   //   setWishList((pre) => [...pre].filter((elm) => elm != id));
  //   // }
  // };
  // const removeFromWishlist = (id) => {
  //   // if (wishList.includes(id)) {
  //   //   setWishList((pre) => [...pre.filter((elm) => elm != id)]);
  //   // }
  // };
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const isAddedtoWishlist = (id) => {
    // if (wishList.includes(id)) {
    //   return true;
    // }
    // return false;
  };
  const isAddedtoCompareItem = (id) => {
    if (compareItem.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
    const id = localStorage.getItem("id");
    if (id) {
      setUserId(id);
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("cartList", JSON.stringify(cartData));
  // }, [cartData]);
  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem("wishlist"));
  //   if (items?.length) {
  //     setWishList(items);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(wishList));
  // }, [wishList]);

  const contextElement = {
    cartProducts,
    // cartData,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    // removeFromWishlist,
    // addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishlist,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    setQuickAddPackage,
    quickAddPackage,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    handleAddToCart,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleCheckWishlist,
    addToWishlistSuccess,
    removeFromWishlistSuccess,
    bestSelling,
    setProductId,
    relatedProducts,
    categories,
    subCategories,
    setCategoryId,
    flashSale,
    banners,
    brands,
    topBrands,
    allProducts,
    setPage,
    linkProducts,
    setLink,
    featured,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
