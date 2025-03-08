"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useLogin} from "@/api/auth/auth";
import {useSendToMail} from "@/api/auth/resetPassword";
import {useGerActiveSocialProviders} from "@/api/auth/getActiveSocialProviders";
import GoogleButton from 'react-google-button'
import TwitterButton from "react-twitter-button";
import {useSignInWithSocial} from "@/api/auth/signInWithSocial";
import {GoogleOAuthProvider, GoogleLogin, useGoogleLogin} from "@react-oauth/google";

const config = {
    text: 'Sign in with twitter',
    style: {
        boxShadow: 'none',
        borderRadius: '0',
        marginTop: 0
    },
    hoverStyle: {
        right: '0',
        bottom: '0'
    }
};

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

    return <GoogleButton onClick={() => login()} />;
};

export default function Login({type}) {
    const signInWithSocial = useSignInWithSocial()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        login_by: "email",
    });


    const [resetPassword, setResetPassword] = useState({
        email_or_phone: "",
        send_code_by: "email",
    });
    const [errorMessage, setErrorMessage] = useState(null); // Error message state
    const [success, setSuccess] = useState(null);
    const loginMutation = useLogin();
    const sentToMail = useSendToMail();
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

    const handleLogin = (e) => {
        e.preventDefault();

        const emailOrPhone = formData.email;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
        const loginBy = isEmail ? "email" : "phone";
        const updatedFormData = {...formData, login_by: loginBy, user_type: type};

        loginMutation.mutate(updatedFormData, {
            onSuccess: (data) => {
                const {access_token, user} = data.data;
                if (user.type === 'seller') {
                    window.location.href = 'https://nomahd.com/seller/dashboard';
                    return;
                }
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', access_token);
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('name', user.name);
                }
                console.log('Login successful');

                window.localStorage.removeItem('temp_user_id');
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

    const handleSendToMail = (e) => {
        e.preventDefault();
        const emailOrPhone = resetPassword.email_or_phone;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
        const loginBy = isEmail ? "email" : "phone";
        const updatedFormData = {...resetPassword, send_code_by: loginBy};
        sentToMail.mutate(updatedFormData, {
            onSuccess: (response) => {
                setSuccess(
                    response.response?.data?.message || "Code sent successfully"
                );
            },
            onError: (error) => {
                setErrorMessage(
                    error.response?.data?.message || "An unexpected error occurred"
                );
            },
        });
    };
    const handleMailChange = (e) => {
        const {name, value} = e.target;
        setResetPassword((prev) => ({...prev, [name]: value}));
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };
    return (
        <section className="flat-spacing-10">
            <div className="container">
                <div className="tf-grid-layout lg-col-2 tf-login-wrap">
                    <div className="tf-login-form">
                        <div id="recover">
                            <h5 className="mb_24">Reset your password</h5>
                            <p className="mb_30">
                                We will send you an email or SMS to reset your password
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
                                    {errorMessage && (
                                        <p className="text-danger mb_20">{errorMessage}</p>
                                    )}
                                    {success && <p className="text-success mb_20">{success}</p>}
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
                                    {errorMessage && (
                                        <p className="text-danger mb_20">{errorMessage}</p>
                                    )}
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
                                            disabled={loginMutation.isLoading} // Disable button while loading
                                        >
                                            {loginMutation.isLoading ? "Loading..." : "Log in"}
                                        </button>
                                    </div>


                                    <div className="line-container">
                                        <div className="line"></div>
                                        <span className="line-text">Or</span>
                                        <div className="line"></div>
                                    </div>

                                    <div className={"mt-3 d-flex flex-column align-items-center ms-3"}
                                         style={{gap: '1rem'}}>


                                        {activeProviders.google && (
                                            <GoogleOAuthProvider clientId="834482764295-lu5dkqr4dukasqfqhppnte1pghr0eu9g.apps.googleusercontent.com">
                                                <LoginButton />
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
                    <div className="tf-login-content">
                        <h5 className="mb_36">I'm new here</h5>
                        <p className="mb_20">
                            Sign up for early Sale access plus tailored new arrivals, trends
                            and promotions. To opt out, click unsubscribe in our emails.
                        </p>
                        <Link href={type === 'seller' ? `/seller-register` : `/register`} className="tf-btn btn-line">
                            Register
                            <i className="icon icon-arrow1-top-left"/>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
