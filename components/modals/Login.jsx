"use client";
import React, { useState, useEffect } from "react";
import { useLogin } from "@/api/auth/auth";
import {GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google";
import TwitterButton from "react-twitter-button";
import {useGerActiveSocialProviders} from "@/api/auth/getActiveSocialProviders";
import {useSignInWithSocial} from "@/api/auth/signInWithSocial";
import GoogleButton from "react-google-button";

const LoginButton = () => {
    const signInWithSocial = useSignInWithSocial()

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            signInWithSocial.mutate({
                social_provider: 'google',
                access_token: tokenResponse.access_token
            })
        },
        onError: () => console.log("Login Failed"),
    });

    return <GoogleButton onClick={() => login()}/>;
};


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    login_by: "email",
  });
    const {data: socialProviders} = useGerActiveSocialProviders();
    const [activeProviders, setActiveProviders] = useState({
        google: false,
        twitter: false,
        facebook: false,
    });


    useEffect(() => {
        if (socialProviders) {
            console.log(socialProviders);
            setActiveProviders({
                google: socialProviders.some(item => item.type === "google_login" && item.value === "1"),
                twitter: socialProviders.some(item => item.type === "twitter_login" && item.value === "1"),
                facebook: socialProviders.some(item => item.type === "facebook_login" && item.value === "1"),
            });
        }
    }, [socialProviders]);
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
        window.localStorage.removeItem('temp_user_id')
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
                              <i className="icon icon-arrow1-top-left"/>
                          </a>
                      </div>
                  </div>

                  <div className="line-container">
                      <div className="line"></div>
                      <span className="line-text">Or</span>
                      <div className="line"></div>
                  </div>

                  <div className={"mt-3 d-flex flex-column align-items-center ms-3"}
                       style={{gap: '1rem'}}>


                      {activeProviders.google && (
                          <GoogleOAuthProvider
                              clientId="834482764295-lu5dkqr4dukasqfqhppnte1pghr0eu9g.apps.googleusercontent.com">
                              <LoginButton/>
                          </GoogleOAuthProvider>
                      )}
                      {
                          activeProviders.facebook && (
                              <div>
                                  <button className="btn-fb" onClick={() => {
                                      signInWithSocial.mutate({
                                          social_provider: 'facebook'
                                      })
                                  }}>
                                      <div className="fb-content">
                                          <div className="logo">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="32"
                                                   height="32" viewBox="0 0 32 32" version="1">
                                                  <path fill="#FFFFFF"
                                                        d="M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z"/>
                                                  <path fill="#4267b2"
                                                        d="M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z"/>
                                              </svg>
                                          </div>
                                          <p>Sign in with Facebook</p>
                                      </div>
                                  </button>
                              </div>
                          )
                      }

                      {
                          activeProviders.twitter && (
                              <TwitterButton config={config} onClick={() => {
                                  signInWithSocial.mutate({
                                      social_provider: 'facebook'
                                  })
                              }}/>
                          )
                      }
                  </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}
