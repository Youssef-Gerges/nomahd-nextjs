"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Quantity from "../shopDetails/Quantity";
import { useContextElement } from "@/context/Context";

import { allProducts } from "@/data/products";
import { colors, sizeOptions } from "@/data/singleProductOptions";
import { useGetAllProducts } from "@/api/products/useGetAllProducts";
import { useAddToCart } from "@/api/cart/addToCart";
import { useAddToWishlist } from "@/api/wishlist/addToWishlist";
import { useAddToWishlistNew } from "@/api/wishlist/newAddToWishlist";
import { useCheckProductInWishlist } from "@/api/wishlist/checkProduct";
import { useGetCartData } from "@/api/cart/getCart";
import { useNewRemoveFromWishlist } from "@/api/wishlist/newRemoveFromWishlist";
export default function QuickAdd() {
  const {
    quickAddItem,
    // addProductToCart,
    // isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();
  const id = localStorage.getItem("id");
  const { data } = useGetAllProducts(1);
  const addToCart = useAddToCart();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity , setQuantity] = useState(1);
  const { data: cartData } = useGetCartData(id);
  const addToWishlist = useAddToWishlist();
  // const [productId, setProductId] = useState(""); // Example: manage input for product ID
  // const [userId, setUserId] = useState(""); // Example: manage input for user ID
  const checkWishlist = useCheckProductInWishlist();
  const addToWishlistMutation = useAddToWishlistNew();
  const removeFromWishlist = useNewRemoveFromWishlist();
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizeOptions[0]);
  const [item, setItem] = useState({});

  useEffect(() => {
    checkWishlist.mutate(
      { productId: quickAddItem, userId: id },
      {
        onSuccess: (data) => {
          setIsInWishlist(data?.is_in_wishlist);
          console.log("Wishlist data:", data?.is_in_wishlist);
        },
        onError: (error) => {
          console.error("Error:", error.message);
        },
      }
    );
  }, [quickAddItem, addToWishlistMutation.isSuccess , removeFromWishlist.isSuccess]);

  useEffect(() => {
    if (cartData?.data) {
      cartData?.data?.includes(quickAddItem)
        ? setIsInCart(true)
        : setIsInCart(false);
    }
  }, [cartData]);

  const handleAddToWishlist = () => {
    // Validate inputs before calling the mutation
   

    addToWishlistMutation.mutate(
      { productId: quickAddItem, userId: id },
      {
        onSuccess: (data) => {
          console.log("Wishlist data:", data);
         
        },
        onError: (error) => {
          console.error("Error:", error.message);
          
        },
      }
    );
  };

  const handleRemoveFromWishlist = () => {
   

    removeFromWishlist.mutate(
      { productId: quickAddItem, userId: id },
      {
        onSuccess: (data) => {
          console.log("Wishlist data:", data);
         
        },
        onError: (error) => {
          console.error("Error:", error.message);
         
        },
      }
    );
  };

  const handleAddToCart = () => {
    addToCart.mutate({
      id: quickAddItem,
      variant: "",
      user_id: JSON.parse(localStorage.getItem("id")),
      quantity: quantity,
    });
    console.log("item is :", quickAddItem);
  };

  const handleAddToWishList = () => {
    addToWishlist.mutate({
      user_id: JSON.parse(localStorage.getItem("id")),
      product_id: quickAddItem,
    });
  };
  useEffect(() => {
    const filtered = allProducts.filter((el) => el.id == quickAddItem);
    if (filtered) {
      setItem(filtered[0]);
    }
    setItem(data?.data?.find((item) => item.id == quickAddItem))
    console.log('dataa' , data?.data , quickAddItem , item)
  }, [quickAddItem]);

  useEffect(()=>{
    console.log("dataa item " , item)
  },[item])
  useEffect(()=>{
    setQuantity(1)
  },[])
  

  return (
    <div className="modal fade modalDemo" id="quick_add">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-product-info-item">
              <div className="image">
                <Image
                  alt="image"
                  style={{ objectFit: "contain" }}
                  src={item?.thumbnail_image}
                  width={720}
                  height={1005}
                />
                <span>{item?.name}</span>
              </div>
              <div className="content">
                <Link href={`/product-detail/${item?.id}`}>{item?.name}</Link>
                <div className="tf-product-info-price">
                  <div className="price">{item?.currency_symbol} {item?.calculable_price}</div>
                </div>
              </div>
            </div>
            <div className="tf-product-info-variant-picker mb_15">
              <div className="variant-picker-item">
                <div className="variant-picker-label">
                  Color:
                  <span className="fw-6 variant-picker-label-value">
                    {currentColor.value}
                  </span>
                </div>
                <form className="variant-picker-values">
                  {colors.map((color) => (
                    <React.Fragment key={color.id}>
                      <input
                        type="radio"
                        name="color1"
                        readOnly
                        checked={currentColor == color}
                      />
                      <label
                        onClick={() => setCurrentColor(color)}
                        className="hover-tooltip radius-60"
                        data-value={color.value}
                      >
                        <span className={`btn-checkbox ${color.className}`} />
                        <span className="tooltip">{color.value}</span>
                      </label>
                    </React.Fragment>
                  ))}
                </form>
              </div>
              <div className="variant-picker-item">
                <div className="variant-picker-label">
                  Size:{" "}
                  <span className="fw-6 variant-picker-label-value">
                    {" "}
                    {currentSize.value}
                  </span>
                </div>
                <form className="variant-picker-values">
                  {sizeOptions.map((size) => (
                    <React.Fragment key={size.id}>
                      <input
                        type="radio"
                        name="size1"
                        readOnly
                        checked={currentSize == size}
                      />
                      <label
                        onClick={() => setCurrentSize(size)}
                        className="style-text"
                        data-value={size.value}
                      >
                        <p>{size.value}</p>
                      </label>
                    </React.Fragment>
                  ))}
                </form>
              </div>
            </div>
            <div className="tf-product-info-quantity mb_15">
              <div className="quantity-title fw-6">Quantity</div>
              <Quantity setQuantity={setQuantity}/>
            </div>
            <div className="tf-product-info-buy-button">
              <form onSubmit={(e) => e.preventDefault()} className="">
                <a
                  className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                  onClick={() => handleAddToCart(item?.id)}
                >
                  <span>
                    {isInCart
                      ? "Already Added - "
                      : "Add to cart - "}
                  </span>
                  <span className="tf-qty-price">{item?.main_price}</span>
                </a>
                <div className="tf-product-btn-wishlist btn-icon-action">
                  <i
                    className={`${
                      isInWishlist ? "icon-heart-full" : "icon-heart"
                    }`}
                    onClick={() => {
                      isInWishlist
                        ? handleRemoveFromWishlist()
                        : handleAddToWishlist();
                    }}
                  />
                  <i className="icon-delete" />
                </div>
                <a
                  href="#compare"
                  data-bs-toggle="offcanvas"
                  aria-controls="offcanvasLeft"
                  onClick={() => addToCompareItem(item?.id)}
                  className="tf-product-btn-wishlist box-icon bg_white compare btn-icon-action"
                >
                  <span className="icon icon-compare" />
                  <span className="icon icon-check" />
                </a>
                <div className="w-100">
                  <a href="#" className="btns-full">
                    Buy with
                    <Image
                      alt="image"
                      src="/images/payments/paypal.png"
                      width={64}
                      height={18}
                    />
                  </a>
                  <a href="#" className="payment-more-option">
                    More payment options
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
