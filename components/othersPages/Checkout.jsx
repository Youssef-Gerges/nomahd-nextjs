"use client";
import { useGetCartData } from "@/api/cart/getCart";
import { useGetSummary } from "@/api/cart/getSummary";
import { useGetPaymentTypes } from "@/api/payment/getPaymentTypes";
import { usePlaceOrder } from "@/api/payment/placeOrder";
import { useSelectAddress } from "@/api/cart/selectAddress";
import { useAddUserAddress } from "@/api/address/postUserAddress";
import { useGetCountries } from "@/api/address/getCountries";
import { useGetCities } from "@/api/address/getCities";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetBusinessSettings } from "@/api/general/getBusinessSettings";



export default function Checkout() {
  const { data: cartData } = useGetCartData();
  const { data: cartSummery } = useGetSummary();
  const { data: countries } = useGetCountries();
  const {data: settings} = useGetBusinessSettings();
  const [freeShipping, setFreeShipping] = useState(0)
  const { data: cities } = useGetCities();
  const { data: paymentTypes } = useGetPaymentTypes();
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
  const placeOrder = usePlaceOrder()
  const [cartProductsData, setCartProducts] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentError, setPaymentError] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if(settings?.data){
      let weight = settings?.data?.filter(item => item.type == 'shipping_free_after_amount');
      setFreeShipping(weight[0]?.value);
    }
  }, [settings])

  useEffect(() => {
    setUserId(localStorage.getItem('id'));
  }, []);
  useEffect(() => {
    if (cartData) {
      let items = [];

      cartData.data?.map((shop) => {
        items = [...items, ...shop.cart_items];
      });

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

    createAddress.mutate(
      { ...address, state_id: parseInt(address.city), city_id: parseInt(address.city), country_id: parseInt(address.country_id) },
      {
        onSuccess: (data) => {
          selectAddress.mutate(
            { address_id: data.id, user_id: userId },
            {
              onSuccess: (data) => {
                placeOrder.mutate(
                  {
                    user_id: userId,
                    payment_type: paymentType,
                    whatsapp: address.whatsapp
                  },
                  {
                    onSuccess: (orderData) => {
                      if (paymentType === 'stripe_payment') {
                        window.location.href = 'https://nomahd.com/api/v2/stripe?payment_type?payment_type=cart_payment&combined_order_id=' + orderData.combined_order_id + '&amount=' + cartSummery?.grand_total_value + '&user_id=' + userId;
                      } else {
                        router.push('/my-account-orders');
                      }
                    }
                  }
                );
              }
            }
          );
        },
      }
    );
    
  };

  const handleCoupon = () => {};

  const calculatePrice = (priceText) => {
    return parseFloat(priceText.replace("SAR", ""));
  };
  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="tf-page-cart-wrap layout-2">
          <div className="tf-page-cart-item">
            <h5 className="fw-5 mb_20">Billing details</h5>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="form-checkout"
            >
              <fieldset className="box fieldset">
                <label htmlFor="country_id">Country/Region</label>
                <div className="select-custom">
                  <select
                    required
                    className="tf-select w-100"
                    id="country_id"
                    name="address[country_id]"
                    data-default=""
                    onChange={handleAddress}
                  >
                    <option value="---" data-provinces="[]">
                      ---
                    </option>
                    {countries?.data?.map((country, i) => (
                      <option key={i} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>

              <fieldset className="box fieldset">
                <label htmlFor="city">City</label>
                <div className="select-custom">
                  <select
                    required
                    className="tf-select w-100"
                    id="city"
                    name="address[city]"
                    data-default=""
                    onChange={handleAddress}
                  >
                    <option value="---" data-provinces="[]">
                      ---
                    </option>
                    {cities?.data?.map((country, i) => (
                      <option key={i} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>

              <fieldset className="box fieldset">
                <label htmlFor="address">Address</label>
                <input
                  required
                  type="text"
                  id="address"
                  onChange={handleAddress}
                />
              </fieldset>
              <fieldset className="box fieldset">
                <label htmlFor="postal">Postal Code</label>
                <input
                  required
                  type="text"
                  id="postal_code"
                  onChange={handleAddress}
                />
              </fieldset>

              <fieldset className="box fieldset">
                <label htmlFor="phone">Phone Number</label>
                <input
                  required
                  type="number"
                  id="phone"
                  onChange={handleAddress}
                />
              </fieldset>
              
              <fieldset className="box fieldset">
                <label htmlFor="whatsapp">WhatsApp Number</label>
                <input
                  required
                  type="number"
                  id="whatsapp"
                  onChange={handleAddress}
                />
              </fieldset>
            </form>
          </div>
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <h5 className="fw-5 mb_20">Your order</h5>
              <div className="tf-free-shipping-bar">
                <div className="tf-progress-bar">
                  <span style={{ width: `${Math.min((cartData?.total_weight / freeShipping) * 100, 100)}%` }}>
                    <div className="progress-car">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={21}
                        height={14}
                        viewBox="0 0 21 14"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 0.875C0 0.391751 0.391751 0 0.875 0H13.5625C14.0457 0 14.4375 0.391751 14.4375 0.875V3.0625H17.3125C17.5867 3.0625 17.845 3.19101 18.0104 3.40969L20.8229 7.12844C20.9378 7.2804 21 7.46572 21 7.65625V11.375C21 11.8582 20.6082 12.25 20.125 12.25H17.7881C17.4278 13.2695 16.4554 14 15.3125 14C14.1696 14 13.1972 13.2695 12.8369 12.25H7.72563C7.36527 13.2695 6.39293 14 5.25 14C4.10706 14 3.13473 13.2695 2.77437 12.25H0.875C0.391751 12.25 0 11.8582 0 11.375V0.875ZM2.77437 10.5C3.13473 9.48047 4.10706 8.75 5.25 8.75C6.39293 8.75 7.36527 9.48046 7.72563 10.5H12.6875V1.75H1.75V10.5H2.77437ZM14.4375 8.89937V4.8125H16.8772L19.25 7.94987V10.5H17.7881C17.4278 9.48046 16.4554 8.75 15.3125 8.75C15.0057 8.75 14.7112 8.80264 14.4375 8.89937ZM5.25 10.5C4.76676 10.5 4.375 10.8918 4.375 11.375C4.375 11.8582 4.76676 12.25 5.25 12.25C5.73323 12.25 6.125 11.8582 6.125 11.375C6.125 10.8918 5.73323 10.5 5.25 10.5ZM15.3125 10.5C14.8293 10.5 14.4375 10.8918 14.4375 11.375C14.4375 11.8582 14.8293 12.25 15.3125 12.25C15.7957 12.25 16.1875 11.8582 16.1875 11.375C16.1875 10.8918 15.7957 10.5 15.3125 10.5Z"
                        />
                      </svg>
                    </div>
                  </span>
                </div>
                <div className="tf-progress-msg">
                  Buy <span className="price fw-6">{freeShipping} Gram</span> more to enjoy{" "}
                  <span className="fw-6">Free Shipping</span>
                </div>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="tf-page-cart-checkout widget-wrap-checkout"
              >
                <ul className="wrap-checkout-product">
                  {cartProductsData?.map((elm, i) => (
                    <li key={i} className="checkout-product-item">
                      <figure className="img-product">
                        <Image
                          alt="product"
                          src={elm.product_thumbnail_image}
                          width={720}
                          height={1005}
                        />
                        <span className="quantity">{elm.quantity}</span>
                      </figure>
                      <div className="content">
                        <div className="info">
                          <p className="name">{elm.product_name}</p>
                          <span className="variant">
                            {elm.variation
                              ? elm.variation.replace("-", " / ")
                              : "No variation"}
                          </span>
                        </div>
                        <span className="price">
                          SAR{" "}
                          {(calculatePrice(elm.price) * elm.quantity).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                {!cartProductsData?.length && (
                  <div className="container">
                    <div className="row align-items-center mt-5 mb-5">
                      <div className="col-12 fs-18">
                        Your shop cart is empty
                      </div>
                      <div className="col-12 mt-3">
                        <Link
                          href={`/shop-default`}
                          className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                          style={{ width: "fit-content" }}
                        >
                          Explore Products!
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                <div className="coupon-box">
                  <input
                    required
                    type="text"
                    placeholder="Discount code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <a
                    onClick={handleCoupon}
                    className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                  >
                    Apply
                  </a>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-5">Shipping</p>
                  <p className="total fw-5">{cartSummery?.shipping_cost}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="fw-5">Packageing Fee</p>
                  <p className="total fw-5">{cartSummery?.packaging_cost}</p>
                </div>

                <div className="d-flex justify-content-between line pb_20">
                  <h6 className="fw-5">Total</h6>
                  <h6 className="total fw-5">{cartSummery?.grand_total}</h6>
                </div>
                <div className="wd-check-payment">
                  {paymentTypes?.map((method) => (
                    <div className="fieldset-radio mb_20">
                      <input
                        required
                        type="radio"
                        name="payment"
                        id={method.payment_type}
                        onChange={() => setPaymentType(method.payment_type)}
                        className="tf-check"
                      />
                      <label className="d-flex align-items-center justify-content-between w-100" htmlFor={method.payment_type}>
                        {method.title}
                        <Image width={50} height={50} src={method.image} />
                      </label>
                    </div>
                  ))}
                  {paymentError && (
                    <p className="text-danger mb_20">
                      Please chose payment method first
                    </p>
                  )}
                  <p className="text_black-2 mb_20">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our
                    <Link
                      href={`/privacy-policy`}
                      className="text-decoration-underline ms-1"
                    >
                      privacy policy
                    </Link>
                    .
                  </p>

                </div>
                <button
                  onClick={checkoutHandler}
                  type="button"
                  className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center"
                >
                  Place order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
