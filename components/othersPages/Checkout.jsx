"use client";
import { useGetCartData } from "@/api/cart/getCart";
import { useGetSummary } from "@/api/cart/getSummary";
import { useGetPaymentTypes } from "@/api/payment/getPaymentTypes";
import { useWalletPay } from "@/api/payment/walletPay";
import { usePlaceOrder } from "@/api/payment/placeOrder";
import { useSelectAddress } from "@/api/cart/selectAddress";
import { useAddUserAddress } from "@/api/address/postUserAddress";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetBusinessSettings } from "@/api/general/getBusinessSettings";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import CheckoutAddress from "@/components/othersPages/dashboard/CheckoutAddress";
import { useApplyCoupon } from "@/api/coupon/applyCoupon";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { temp_user_id, token, user_id } from "@/api/api";

export default function Checkout() {
    const queryClient = useQueryClient();
    const [selectedAddress, setSelectedAddress] = useState();
    const { data: cartData, isLoading: isCartLoading } = useGetCartData();
    const { data: cartSummery } = useGetSummary();
    const { data: settings } = useGetBusinessSettings();
    const [freeShipping, setFreeShipping] = useState(0);
    const { data: paymentTypes } = useGetPaymentTypes();
    const walletPay = useWalletPay();
    const router = useRouter();
    const [address, setAddress] = useState({
        country_id: "",
        city: "",
        address: "",
        postal: "",
        phone: "",
        whatsapp: "",
        state_id: ""
    });
    const selectAddress = useSelectAddress();
    const createAddress = useAddUserAddress();
    const placeOrder = usePlaceOrder();
    const applyCoupon = useApplyCoupon();
    const [cartProductsData, setCartProducts] = useState([]);
    const [coupon, setCoupon] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [paymentError, setPaymentError] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (settings?.data) {
            const weight = settings?.data?.find(item => item.type === 'shipping_free_after_amount');
            setFreeShipping(weight?.value || 0);
        }
    }, [settings]);

    useEffect(() => {
        setUserId(user_id ?? temp_user_id);
    }, [user_id]);

    useEffect(() => {
        if (cartData) {
            const items = cartData.data?.flatMap(shop => shop.cart_items) || [];
            setCartProducts(items);
        }
    }, [cartData]);

    const handleAddress = (e) => {
        setAddress({
            ...address,
            [e.target.id]: e.target.value,
        });
    };

    const checkoutHandler = () => {
        if (!paymentType) {
            setPaymentError(true);
            return;
        }

        const orderDetails = {
            user_id: userId,
            payment_type: paymentType,
            whatsapp: address.whatsapp,
        };

        if (selectedAddress === 0) {
            createAddress.mutate(
                {
                    ...address,
                    state_id: parseInt(address.city),
                    city_id: parseInt(address.city),
                    country_id: parseInt(address.country_id),
                },
                {
                    onSuccess: (data) => {
                        selectAddress.mutate(
                            { address_id: data.id, user_id: userId },
                            {
                                onSuccess: () => {
                                    handlePayment(orderDetails);
                                }
                            }
                        );
                    },
                }
            );
        } else {
            selectAddress.mutate(
                { address_id: selectedAddress, user_id: userId },
                {
                    onSuccess: () => {
                        handlePayment(orderDetails);
                    }
                }
            );
        }
    };

    const handlePayment = (orderDetails) => {
        if (paymentType === 'wallet_system') {
            walletPay.mutate(orderDetails, {
                onSuccess: () => {
                    Cookies.set('order-confirmation', 'true');
                    window.location.href = '/payment-confirmation';
                }
            });
        } else {
            placeOrder.mutate(orderDetails, {
                onSuccess: (orderData) => {
                    if (paymentType === 'stripe_payment') {
                        window.location.href = `https://nomahd.com/api/v2/stripe?payment_type=cart_payment&combined_order_id=${orderData.combined_order_id}&amount=${cartSummery?.grand_total_value}&user_id=${userId}`;
                    } else {
                        Cookies.set('order-confirmation', 'true');
                        window.location.href = '/payment-confirmation';
                    }
                }
            });
        }
    };

    const handleCoupon = () => {
        applyCoupon.mutate({
            code: coupon,
            temp_user_id
        }, {
            onSuccess: (data) => {
                if (data.data?.response_message?.response === 'success') {
                    toast.success(data.data?.response_message.message);
                    queryClient.invalidateQueries(['summery']);
                } else {
                    toast.error(data.data.message);
                }
            }
        });
    };

    const calculatePrice = (priceText) => {
        return parseFloat(priceText.replace("SAR", ""));
    };

    // Check if loading cart data
    if (isCartLoading) {
        return <div>Loading...</div>; // Or a spinner/loading state
    }

    return (
        <section className="flat-spacing-11">
            <div className="container">
                <div className="tf-page-cart-wrap layout-2">
                    <div className="tf-page-cart-item">
                        <h5 className="fw-5 mb_20">Billing details</h5>
                        <form onSubmit={(e) => e.preventDefault()} className="form-checkout">
                            <CheckoutAddress setAddress={setAddress} handleAddress={handleAddress} setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} />
                            {!token && (
                                <>
                                    <fieldset className="box fieldset">
                                        <label htmlFor="full_name">Your Full Name</label>
                                        <div className="select-custom">
                                            <input required type="text" id="full_name" onChange={handleAddress} />
                                        </div>
                                    </fieldset>

                                    <fieldset className="box fieldset">
                                        <label htmlFor="email">Email</label>
                                        <div className="select-custom">
                                            <input required type="email" id="email" onChange={handleAddress} />
                                        </div>
                                    </fieldset>

                                    <fieldset className="box fieldset">
                                        <label htmlFor="password">Password</label>
                                        <div className="select-custom">
                                            <input required type="password" id="password" onChange={handleAddress} />
                                        </div>
                                    </fieldset>

                                    <fieldset className="box fieldset">
                                        <label htmlFor="password_confirmation">Confirm Password</label>
                                        <div className="select-custom">
                                            <input required type="password" id="password_confirmation" onChange={handleAddress} />
                                        </div>
                                    </fieldset>
                                </>
                            )}

                            <fieldset className="box fieldset text-start">
                                <label htmlFor="whatsapp">WhatsApp Number</label>
                                <input required type="number" id="whatsapp" onChange={handleAddress} />
                            </fieldset>
                        </form>
                    </div>

                    <div className="tf-page-cart-footer">
                        <div className="tf-cart-footer-inner">
                            <h5 className="fw-5 mb_20">Your order</h5>
                            <form onSubmit={(e) => e.preventDefault()} className="tf-page-cart-checkout widget-wrap-checkout">
                                <ul className="wrap-checkout-product">
                                    {cartProductsData?.map((elm, i) => (
                                        <li key={i} className="checkout-product-item">
                                            <figure className="img-product">
                                                <Image alt="product" src={elm.product_thumbnail_image} width={720} height={1005} />
                                                <span className="quantity">{elm.quantity}</span>
                                            </figure>
                                            <div className="content">
                                                <div className="info">
                                                    <p className="name">{elm.product_name}</p>
                                                    <span className="variant">{elm.variation ? elm.variation.replace("-", " / ") : "No variation"}</span>
                                                </div>
                                                <span className="price">SAR {(calculatePrice(elm.price) * elm.quantity).toFixed(2)}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {!cartProductsData?.length && (
                                    <div className="container">
                                        <div className="row align-items-center mt-5 mb-5">
                                            <div className="col-12 fs-18">Your shop cart is empty</div>
                                            <div className="col-12 mt-3">
                                                <Link href={`/shop-default`} className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center" style={{ width: "fit-content" }}>
                                                    Explore Products!
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="coupon-box">
                                    <input required type="text" placeholder="Discount code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                    <a onClick={handleCoupon} className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn">Apply</a>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="fw-5">Shipping</p>
                                    <p className="total fw-5">{cartSummery?.shipping_cost}</p>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <p className="fw-5">Packaging Fee</p>
                                    <p className="total fw-5">{cartSummery?.packaging_cost}</p>
                                </div>

                                {cartSummery?.coupon_applied && (
                                    <div className="d-flex justify-content-between pb_20">
                                        <p className="fw-5">Discount</p>
                                        <p className="total fw-5">{cartSummery?.discount}</p>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between pb_20">
                                    <h6 className="fw-5">Total</h6>
                                    <h6 className="total fw-5">{cartSummery?.grand_total}</h6>
                                </div>
                                <div className="wd-check-payment">
                                    {paymentTypes?.map((method) => (
                                        <div className="fieldset-radio mb_20" key={method.payment_type}>
                                            <input required type="radio" name="payment" id={method.payment_type} onChange={() => setPaymentType(method.payment_type)} className="tf-check" />
                                            <label className="d-flex align-items-center justify-content-between w-100" htmlFor={method.payment_type}>
                                                {method.title}
                                                <Image width={50} height={50} src={method.image} />
                                            </label>
                                        </div>
                                    ))}
                                    {paymentError && <p className="text-danger mb_20">Please choose a payment method first</p>}
                                    <p className="text_black-2 mb_20">
                                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our
                                        <Link href={`/privacy-policy`} className="text-decoration-underline ms-1">privacy policy</Link>.
                                    </p>
                                </div>
                                <button onClick={checkoutHandler} type="button" className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center">
                                    {createAddress.status === 'pending' || placeOrder.status === 'pending' || selectAddress.status === 'pending' ?
                                        <ThreeDots visible={true} height={10} color="#b7ec31" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="" /> :
                                        'Place order'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}