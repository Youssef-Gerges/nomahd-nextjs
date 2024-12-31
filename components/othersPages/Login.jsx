"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLogin } from "@/api/auth/auth";
import { useSendToMail } from "@/api/auth/resetPassword";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    login_by: "email",
  });
  const [resetPassword, setResetPassword] = useState({
    email_or_phone: "",
    send_code_by: "email",
  });
  const loginMutation = useLogin();
  const sentToMail = useSendToMail();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   loginMutation.mutate(formData, { onSuccess: () => router.push("/") });
  // };

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Check if the input is an email or phone number
    const emailOrPhone = formData.email;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone); // Basic email regex
    const loginBy = isEmail ? "email" : "phone";
  
    // Update the login_by attribute dynamically
    const updatedFormData = { ...formData, login_by: loginBy };
  
    // Trigger login mutation
    loginMutation.mutate(updatedFormData, {
      onSuccess: () => router.push("/"),
    });
  };

  const handleSendToMail = (e) => {
    e.preventDefault();
    sentToMail.mutate(resetPassword);
  };
  const handleMailChange = (e) => {
    const { name, value } = e.target;
    setResetPassword((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="tf-grid-layout lg-col-2 tf-login-wrap">
          <div className="tf-login-form">
            <div id="recover">
              <h5 className="mb_24">Reset your password</h5>
              <p className="mb_30">
                We will send you an email to reset your password
              </p>
              <div>
                <form onSubmit={(e) => e.preventDefault()} className="">
                  <div className="tf-field style-1 mb_15">
                    <input
                      className="tf-field-input tf-input"
                      placeholder=""
                      required
                      type="email"
                      name="email_or_phone"
                      value={resetPassword.email_or_phone}
                      onChange={handleMailChange}
                      autoComplete="abc@xyz.com"
                      id="property3"
                    />
                    {/* <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                      Email *
                    </label> */}
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                      Email or Phone *
                    </label>
                  </div>
                  <div className="mb_20">
                    <a href="#login" className="tf-btn btn-line">
                      Cancel
                    </a>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      onClick={handleSendToMail}
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                      Reset password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div id="login">
              <h5 className="mb_36">Log in</h5>
              <div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="tf-field style-1 mb_15">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=""
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      autoComplete="abc@xyz.com"
                      id="property3"
                    />
                    {/* <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                      Email *
                    </label> */}
                     <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property3"
                    >
                    Email or Phone *
                    </label>
                  </div>
                  <div className="tf-field style-1 mb_30">
                    <input
                      required
                      className="tf-field-input tf-input"
                      placeholder=""
                      type="password"
                      id="property4"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      autoComplete="current-password"
                    />
                    <label
                      className="tf-field-label fw-4 text_black-2"
                      htmlFor="property4"
                    >
                      Password *
                    </label>
                  </div>
                  <div className="mb_20">
                    <a href="#recover" className="tf-btn btn-line">
                      Forgot your password?
                    </a>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      onClick={handleLogin}
                      className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                    >
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="tf-login-content">
            <h5 className="mb_36">I'm new here</h5>
            <p className="mb_20">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails.
            </p>
            <Link href={`/register`} className="tf-btn btn-line">
              Register
              <i className="icon icon-arrow1-top-left" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
