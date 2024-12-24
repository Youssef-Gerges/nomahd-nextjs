"use client";
import Link from "next/link";
import { useRegister} from "@/api/auth/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Register() {
  const registerMutation = useRegister();
  const router = useRouter(); 

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email_or_phone: "",
      password: "",
      password_confirmation: "",
      register_by: "email",
    });

  const handleRegister = () => {
    // Concatenate first and last names into a single 'name' field
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    // Only send 'name' in the request, without firstName or lastName
    const { firstName, lastName, ...restFormData } = formData; // Exclude firstName and lastName
    const formDataToSubmit = {
      ...restFormData,
      name: fullName, // Concatenated name
    };

    // registerMutation.mutate(formDataToSubmit);

    registerMutation.mutate(formDataToSubmit, {
      onSuccess: () => {
        // Navigate to the desired route on successful registration
        router.push("/");
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="form-register-wrap">
          <div className="flat-title align-items-start gap-0 mb_30 px-0">
            <h5 className="mb_18">Register</h5>
            <p className="text_black-2">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className=""
              id="register-form"
              action="#"
              method="post"
              acceptCharset="utf-8"
              data-mailchimp="true"
            >
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="property1"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="property1"
                >
                  First name
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  id="property2"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="property2"
                >
                  Last name
                </label>
              </div>
              <div className="tf-field style-1 mb_15">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  autoComplete="abc@xyz.com"
                  id="property3"
                  required
                  name="email_or_phone"
                  value={formData.email_or_phone}
                  onChange={handleChange}
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="property3"
                >
                  Email *
                </label>
              </div>
              <div className="tf-field style-1 mb_30">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label
                  className="tf-field-label fw-4 text_black-2"
                  htmlFor="property4"
                >
                  Password *
                </label>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  required
                  name="password_confirmation"
                  autoComplete="current-password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
                <label
                  className="tf-field-label"
                  htmlFor="password_confirmation"
                >
                  Confirm Password *
                </label>
                {formData.password !== formData.password_confirmation &&
                  formData.password_confirmation !== "" && (
                    <p style={{ color: "red" }}>Passwords do not match</p>
                  )}
              </div>
              <div className="mb_20">
              <button
                    onClick={(e)=>handleRegister(e)}
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                    disabled={
                      formData.password !== formData.password_confirmation
                    }
                  >
                    Register
                  </button>
              </div>
              <div className="text-center">
                <Link href={`/login`} className="tf-btn btn-line">
                  Already have an account? Log in here
                  <i className="icon icon-arrow1-top-left" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
