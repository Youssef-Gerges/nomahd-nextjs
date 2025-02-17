"use client";
import React, { useState, useEffect } from "react";
import { useLogin } from "@/api/auth/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    login_by: "email",
  });
  const loginMutation = useLogin();
  const [errorMessage, setErrorMessage] = useState(null); // Error message state

  const handleLogin = (e) => {
    e.preventDefault();

    const emailOrPhone = formData.email;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
    const loginBy = isEmail ? "email" : "phone";
    const updatedFormData = { ...formData, login_by: loginBy };

    // loginMutation.mutate(formData);
    loginMutation.mutate(updatedFormData, {
      onSuccess: () => {
        const modalElement = document.getElementById("login");
        if (modalElement) {
          modalElement.classList.remove("show");
          modalElement.setAttribute("aria-hidden", "true");
          modalElement.style.display = "none";
        }
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }
        // Navigate to the desired route on successful registration
        window.location.href = '/'
      },
      onError: (error) => {
        // Extract and set error message
        setErrorMessage(
          error.response?.data?.message || "An unexpected error occurred"
        );
      },
    });
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   // Check if the input is an email or phone number
  //   const emailOrPhone = formData.email;
  //   const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone); // Basic email regex
  //   const loginBy = isEmail ? "email" : "phone";

  //   // Update the login_by attribute dynamically
  //   const updatedFormData = { ...formData, login_by: loginBy };

  //   // Trigger login mutation
  //   loginMutation.mutate(updatedFormData, {
  //     onSuccess: () => router.push("/"),
  //   });
  // };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   const emailOrPhone = formData.email;
  //   const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
  //   const loginBy = isEmail ? "email" : "phone";
  //   const updatedFormData = { ...formData, login_by: loginBy };

  //   loginMutation.mutate(updatedFormData, {
  //     onSuccess: () => router.push("/"),
  //     onError: (error) => {
  //       // Extract and set error message
  //       setErrorMessage(
  //         error.response?.data?.message || "An unexpected error occurred"
  //       );
  //     },
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="login"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Log in</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="tf-login-form">
            <form
              onSubmit={(e) => e.preventDefault()}
              className=""
              acceptCharset="utf-8"
            >
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                  autoComplete="abc@xyz.com"
                />
                <label className="tf-field-label" htmlFor="">
                  Email or Phone *
                </label>
              </div>
              <div className="tf-field style-1 mb_20">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete="current-password"
                />
                <label className="tf-field-label" htmlFor="">
                  Password *
                </label>
              </div>
              {errorMessage && (
                <p className="text-danger mb_20">{errorMessage}</p>
              )}
              <div>
                <a
                  href="#forgotPassword"
                  data-bs-toggle="modal"
                  className="btn-link link"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                    disabled={loginMutation.isLoading} // Disable button while loading
                  >
                    {loginMutation.isLoading ? "Loading..." : "Log in"}
                  </button>
                </div>
                <div className="w-100">
                  <a
                    href="#register"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    New customer? Create your account
                    <i className="icon icon-arrow1-top-left" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
