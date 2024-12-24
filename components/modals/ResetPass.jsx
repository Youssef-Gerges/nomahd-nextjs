"use client";
import React, { useState } from "react";
import { useSendToMail } from "@/api/auth/resetPassword";

export default function ResetPass() {
  const [resetPassword, setResetPassword] = useState({
    email_or_phone: "",
    send_code_by: "",
  });
  const sentToMail = useSendToMail();
  const handleSendToMail = (e) => {
    e.preventDefault();
    sentToMail.mutate(resetPassword);
  };
  const handleMailChange = (e) => {
    const { name, value } = e.target;
    setResetPassword((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="forgotPassword"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Reset your password</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="tf-login-form">
            <form onSubmit={(e) => e.preventDefault()} className="">
              <div>
                <p>
                  Sign up for early Sale access plus tailored new arrivals,
                  trends and promotions. To opt out, click unsubscribe in our
                  emails
                </p>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  autoComplete="abc@xyz.com"
                  onChange={handleMailChange}
                  value={resetPassword.email_or_phone}
                  required
                  name="email_or_phone"
                />
                <label className="tf-field-label" htmlFor="">
                  Email *
                </label>
              </div>
              <div>
                <a
                  href="#login"
                  data-bs-toggle="modal"
                  className="btn-link link"
                >
                  Cancel
                </a>
              </div>
              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    onClick={handleSendToMail}
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                  >
                    <span>Reset password</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
