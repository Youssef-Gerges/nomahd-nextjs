"use client";
import React, {useState} from "react";
import {useSendToMail} from "@/api/auth/resetPassword";
import {useConfirmCode} from "@/api/auth/confirmCode";

export default function VerifyUser() {
    const [resetPassword, setResetPassword] = useState({
        verification_code: "",
    });
    const [errorMessage, setErrorMessage] = useState(null); // Error message state
    const [success, setSuccess] = useState(null);
    const sentToMail = useConfirmCode();


    const handleSendToMail = (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccess(null);
        sentToMail.mutate(resetPassword, {
            onSuccess: (data) => {
                setSuccess('Account Verified Successfully');
                window.location.href = '/my-account';
            },
            onError: () => {
                setErrorMessage('something went wrong!');
            }
        })
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setResetPassword((prev) => ({...prev, [name]: value}));
    };

    return (
        <section className="flat-spacing-10">
            <div className="container">
                <div className="tf-grid-layout lg-col-1 tf-login-wrap">
                    <div className="tf-login-form">
                        <div>
                            <h5 className="mb_24">Verify your account</h5>
                            <p className="mb_30">
                                We will send you an email to verify your account
                            </p>
                            <div>
                                <form onSubmit={(e) => e.preventDefault()} className="">
                                    <div className="tf-field style-1 mb_15">
                                        <input
                                            className="tf-field-input tf-input"
                                            placeholder=""
                                            required
                                            type="text"
                                            name="verification_code"
                                            value={resetPassword.verification_code}
                                            onChange={handleChange}
                                            id="property3"
                                        />
                                        <label
                                            className="tf-field-label fw-4 text_black-2"
                                            htmlFor="property3"
                                        >
                                            code *
                                        </label>
                                    </div>
                                    {errorMessage && (
                                        <p className="text-danger mb_20">{errorMessage}</p>
                                    )}
                                    {success && <p className="text-success mb_20">{success}</p>}
                                    <div className="">
                                        <button
                                            type="submit"
                                            onClick={handleSendToMail}
                                            className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                                        >
                                            Verify
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
