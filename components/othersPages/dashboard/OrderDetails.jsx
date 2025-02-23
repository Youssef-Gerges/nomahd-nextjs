"use client";
import React, {useEffect} from "react";
import Image from "next/image";
import {useGetPurchaseHistoryItems} from "@/api/purchase-history/getPurchaseHistoryItems";
import {useGetPurchaseHistoryDetails} from "@/api/purchase-history/getPurchaseHistoryDetails";
import Link from "next/link";
import {token} from "@/api/api";

export default function OrderDetails({orderId}) {
    const {data: order} = useGetPurchaseHistoryDetails(orderId);
    const {data: orderItems} = useGetPurchaseHistoryItems(orderId);
    useEffect(() => {
        const tabs = () => {
            document.querySelectorAll(".widget-tabs").forEach((widgetTab) => {
                const titles = widgetTab.querySelectorAll(
                    ".widget-menu-tab .item-title"
                );

                titles.forEach((title, index) => {
                    title.addEventListener("click", () => {
                        // Remove active class from all menu items
                        titles.forEach((item) => item.classList.remove("active"));
                        // Add active class to the clicked item
                        title.classList.add("active");

                        // Remove active class from all content items
                        const contentItems = widgetTab.querySelectorAll(
                            ".widget-content-tab > *"
                        );
                        contentItems.forEach((content) =>
                            content.classList.remove("active")
                        );

                        // Add active class and fade-in effect to the matching content item
                        const contentActive = contentItems[index];
                        contentActive.classList.add("active");
                        contentActive.style.display = "block";
                        contentActive.style.opacity = 0;
                        setTimeout(() => (contentActive.style.opacity = 1), 0);

                        // Hide all siblings' content
                        contentItems.forEach((content, idx) => {
                            if (idx !== index) {
                                content.style.display = "none";
                            }
                        });
                    });
                });
            });
        };

        // Call the function to initialize the tabs
        tabs();

        // Clean up event listeners when the component unmounts
        return () => {
            document
                .querySelectorAll(".widget-menu-tab .item-title")
                .forEach((title) => {
                    title.removeEventListener("click", () => {
                    });
                });
        };
    }, []);


    const getInvoice = async () => {
        try {
            const response = await fetch(`https://nomahd.com/api/v2/invoice/download/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to download file: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${orderId}.pdf`; // Adjust file name & extension if needed
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading invoice:", error);
        }
    };


    return (
        <div className="wd-form-order">
            <div className="order-head">
                <div className="content d-flex align-items-center justify-content-between w-100">
                    <div>
                        <div className="badge">{order?.delivery_status_string}</div>
                        <h6 className="mt-8 fw-5">Order #{order?.code}</h6>
                    </div>

                    <button
                        onClick={getInvoice}
                        className="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"
                    >
                        <span>Download Invoice</span>
                    </button>
                </div>
            </div>
            <div className="tf-grid-layout md-col-2 gap-15">
                <div className="item">
                    <div className="text-2 text_black-2">Total</div>
                    <div className="text-2 mt_4 fw-6">{order?.grand_total}</div>
                </div>
                <div className="item">
                    <div className="text-2 text_black-2">Payment Status</div>
                    <div className="text-2 mt_4 fw-6">{order?.payment_status_string}</div>
                </div>
                <div className="item">
                    <div className="text-2 text_black-2">Order Time</div>
                    <div className="text-2 mt_4 fw-6">{order?.date} {order?.time}</div>
                </div>
                <div className="item">
                    <div className="text-2 text_black-2">Address</div>
                    <div className="text-2 mt_4 fw-6">
                        {order?.shipping_address ? (
                            <div>
                                <p><strong>Name:</strong> {order.shipping_address.name}</p>
                                <p><strong>Email:</strong> {order.shipping_address.email}</p>
                                <p><strong>Address:</strong> {order.shipping_address.address}</p>
                                <p><strong>City:</strong> {order.shipping_address.city}</p>
                                <p><strong>State:</strong> {order.shipping_address.state || 'N/A'}</p>
                                <p><strong>Postal Code:</strong> {order.shipping_address.postal_code}</p>
                                <p><strong>Country:</strong> {order.shipping_address.country}</p>
                                <p><strong>Phone:</strong> {order.shipping_address.phone}</p>
                            </div>
                        ) : (
                            <p>No shipping address available.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="widget-tabs style-has-border widget-order-tab">
                <ul className="widget-menu-tab">
                    <li className="item-title active">
                        <span className="inner">Item Details</span>
                    </li>
                </ul>
                <div className="widget-content-tab">
                    <div className="widget-content-inner active">
                        {orderItems?.data?.map(item => <div className="order-head">
                                <div className="content">
                                    <div className="text-2 fw-6">{item?.product_name} X {item?.quantity}</div>
                                    <div className="mt_4">
                                        <span className="fw-6">Price :</span> {item?.price}
                                    </div>
                                    <div className="mt_4">
                                        {item?.variation}
                                    </div>
                                </div>
                            </div>
                        )}
                        <ul>
                            <li className="d-flex justify-content-between text-2">
                                <span>Total Price</span>
                                <span className="fw-6">{order?.subtotal}</span>
                            </li>
                            <li className="d-flex justify-content-between text-2 mt_4 pb_8 line">
                                <span>Total Discounts</span>
                                <span className="fw-6">{order?.coupon_discount}</span>
                            </li>
                            <li className="d-flex justify-content-between text-2 mt_8">
                                <span>Order Total</span>
                                <span className="fw-6">{order?.grand_total}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
