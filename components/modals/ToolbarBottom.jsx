import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CartLength from "../common/CartLength";
import WishlistLength from "../common/WishlistLength";
// import { useTranslation } from "react-i18next";
import useTranslation from "next-translate/useTranslation";

export default function ToolbarBottom() {
  const [hasToken, setHasToken] = useState(false);
  // const { t } = useTranslation("common");
  const { t } = useTranslation("common"); // "common" is the namespace

  const direction = localStorage.getItem('direction')

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token); // Set true if token exists, false otherwise
  }, []);

  const handleClick = (e) => {
    if (!hasToken) {
      // Prevent default navigation and trigger modal for login
      e.preventDefault();
      const loginModal = document.getElementById("login");
      if (loginModal) {
        const bootstrap = require("bootstrap");
        const modal = new bootstrap.Modal(loginModal);
        modal.show();
      }
    } else {
      router.push("/my-account"); // Navigate to /my-account
    }
  };

  return (
    <div className="tf-toolbar-bottom type-1150">
      <div className="toolbar-item active">
        <a
          href="#toolbarShopmb"
          data-bs-toggle="offcanvas"
          aria-controls="offcanvasLeft"
        >
          <div className="toolbar-icon">
            <i className="icon-shop" />
          </div>
          <div className="toolbar-label">Shop</div>
        </a>
      </div>
      <div className="toolbar-item">
        <a
          href="#canvasSearch"
          data-bs-toggle="offcanvas"
          aria-controls="offcanvasLeft"
        >
          <div className="toolbar-icon">
            <i className="icon-search" />
          </div>
          <div className="toolbar-label">Search</div>
          {/* <h1>{t("welcome")}</h1> */}

        </a>
      </div>
      {/* <div className="toolbar-item">
        <a href={`${localStorage.getItem('token') ? '/my-account' : '#login'}`} data-bs-toggle="modal">
          <div className="toolbar-icon">
            <i className="icon-account" />
          </div>
          <div className="toolbar-label">Account</div>
        </a>
      </div> */}
      <div className="toolbar-item">
        <a href={hasToken ? "/my-account" : "#"} onClick={handleClick}>
          <div className="toolbar-icon">
            <i className="icon-account" />
          </div>
          <div className="toolbar-label">Account</div>
        </a>
      </div>
      <div className="toolbar-item">
        <Link href={`/wishlist`}>
          <div className="toolbar-icon">
            <i className="icon-heart" />
            <div className="toolbar-count">
              <WishlistLength />
            </div>
          </div>
          <div className="toolbar-label">Wishlist</div>
        </Link>
      </div>
      <div className="toolbar-item">
        <a href="#shoppingCart" data-bs-toggle="modal">
          <div className="toolbar-icon">
            <i className="icon-bag" />
            <div className="toolbar-count">
              <CartLength />
            </div>
          </div>
          <div className="toolbar-label">Cart</div>
        </a>
      </div>
    </div>
  );
}
