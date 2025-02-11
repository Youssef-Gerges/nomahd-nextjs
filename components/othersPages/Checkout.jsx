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



export default function Checkout() {
  const { data: cartData } = useGetCartData();
  const { data: cartSummery } = useGetSummary();
  const { data: countries } = useGetCountries();
  const { data: cities } = useGetCities();
  const { data: paymentTypes } = useGetPaymentTypes();
  const router = useRouter();
  const [address, setAddress] = useState({
    country_id: "",
    city: "",
    address: "",
    postal: "",
    phone: "",
    state_id: ""
  });
  const selectAddress = useSelectAddress();
  const createAddress = useAddUserAddress();
  const placeOrder = usePlaceOrder()
  const [cartProductsData, setCartProducts] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [userId, setUserId] = useState("");

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

  useEffect(() => {
    if (terms) {
      setTermsError(false);
    }
  }, [terms]);

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
    if (!terms) {
      setTermsError(true);
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
            </form>
          </div>
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <h5 className="fw-5 mb_20">Your order</h5>
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
                      <label htmlFor={method.payment_type}>
                        {method.title}
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
                  <div className="box-checkbox fieldset-radio mb_20">
                    <input
                      required
                      type="checkbox"
                      id="check-agree"
                      onClick={() => setTerms((old) => !old)}
                      className="tf-check"
                    />
                    <label htmlFor="check-agree" className="fw-4">
                      I agree with the
                      <Link className="ms-1" href={`/terms-conditions`}>
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  {termsError && (
                    <p className="text-danger mb_20">
                      Please agree terms and conditions first
                    </p>
                  )}
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
