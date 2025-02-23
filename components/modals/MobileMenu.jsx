"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import { usePathname } from "next/navigation";
import { useContextElement } from "@/context/Context";
import {api, token, user_id} from "@/api/api";

export default function MobileMenu() {
    const { categories } = useContextElement();
    const [isMenuActive, setIsMenuActive] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [isLogged, setIsLogged] = useState(false)
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        setIsLogged(user_id && token);
    }, [user_id, token]);

    const fetchSubCategories = async (link) => {
        try {
            const response = await api.get(`sub-categories/${link}`, {
                Accept: 'Application/JSON'
            });
            const data = await response.json();
            setSubCategories(data);
        } catch (error) {
            console.error("Failed to fetch subcategories:", error);
        }
    };

    return (
        <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
          className="icon-close icon-close-popup"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
      />
            <div className="mb-canvas-content">
                <div className="mb-body">
                    <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                        {categories?.data?.map((item, i) => (
                            <li key={i} className="nav-mb-item">
                                <Link
                                    onClick={() => {
                                        setIsMenuActive(item?.id);
                                        setActiveSubMenu(activeSubMenu === item?.id ? null : item?.id);
                                    }}
                                    href={`/shop-collection-sub/${item?.name}/${item?.id}`}
                                    className={`collapsed mb-menu-link current ${
                                        isMenuActive === item?.id ? "activeMenu" : ""
                                    }`}
                                    data-bs-toggle="collapse"
                                    aria-expanded={activeSubMenu === item?.id}
                                    aria-controls={item.id}
                                >
                                    <span>{item.name}</span>
                                </Link>
                                {activeSubMenu === item?.id && (
                                    <ul className="sub-menu">
                                        {item?.sub_categories?.data?.map((subItem, j) => (
                                            <li key={j}>
                                                <Link href={`/shop-collection-sub/${subItem.name}/${subItem.id}/sub`}>
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="mb-other-content">
                        <div className="d-flex group-icon">
                            <Link href={`/wishlist`} className="site-nav-icon">
                                <i className="icon icon-heart" />
                                Wishlist
                            </Link>
                            <Link href={`/home-search`} className="site-nav-icon">
                                <i className="icon icon-search" />
                                Search
                            </Link>
                        </div>
                        <div className="mb-notice">
                            <Link href={`/contact-1`} className="text-need">
                                Need help ?
                            </Link>
                        </div>
                        <ul className="mb-info">
                            <li>
                                Address: 1234 Fashion Street, Suite 567, <br />
                                New York, NY 10001
                            </li>
                            <li>
                                Email: <b>support@nomahd.com</b>
                            </li>
                            <li>
                                Phone: <b>+966537094604</b>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mb-bottom">
                    { isLogged?  <Link href={`/my-account`} className="site-nav-icon">
                        <i className="icon icon-account" />
                        My Account
                    </Link>: <Link href={`/login`} className="site-nav-icon">
                        <i className="icon icon-account"/>
                        Login
                    </Link>}
                    <div className="bottom-bar-language">
                        <div className="tf-currencies">
                            <CurrencySelect />
                        </div>
                        <div className="tf-languages">
                            <LanguageSelect
                                parentClassName={
                                    "image-select center style-default type-languages"
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}