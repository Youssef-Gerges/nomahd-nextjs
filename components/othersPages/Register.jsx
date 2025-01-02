// "use client";
// import Link from "next/link";
// import { useRegister } from "@/api/auth/auth";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const registerMutation = useRegister();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email_or_phone: "",
//     password: "",
//     password_confirmation: "",
//     register_by: "email",
//   });

//   const handleRegister = () => {
//     // Concatenate first and last names into a single 'name' field
//     const fullName = `${formData.firstName} ${formData.lastName}`.trim();

//     // Only send 'name' in the request, without firstName or lastName
//     const { firstName, lastName, ...restFormData } = formData; // Exclude firstName and lastName
//     const formDataToSubmit = {
//       ...restFormData,
//       name: fullName, // Concatenated name
//     };

//     // registerMutation.mutate(formDataToSubmit);

//     registerMutation.mutate(formDataToSubmit, {
//       onSuccess: () => {
//         // Navigate to the desired route on successful registration
//         router.push("/");
//       },
//       onError: (error) => {
//         console.error("Registration failed:", error);
//       },
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   return (
//     <section className="flat-spacing-10">
//       <div className="container">
//         <div className="form-register-wrap">
//           <div className="flat-title align-items-start gap-0 mb_30 px-0">
//             <h5 className="mb_18">Register</h5>
//             <p className="text_black-2">
//               Sign up for early Sale access plus tailored new arrivals, trends
//               and promotions. To opt out, click unsubscribe in our emails
//             </p>
//           </div>
//           <div>
//             <form
//               onSubmit={(e) => e.preventDefault()}
//               className=""
//               id="register-form"
//               action="#"
//               method="post"
//               acceptCharset="utf-8"
//               data-mailchimp="true"
//             >
//               <div className="tf-field style-1 mb_15">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="text"
//                   id="property1"
//                   required
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//                 <label
//                   className="tf-field-label fw-4 text_black-2"
//                   htmlFor="property1"
//                 >
//                   First name
//                 </label>
//               </div>
//               <div className="tf-field style-1 mb_15">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="text"
//                   id="property2"
//                   required
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//                 <label
//                   className="tf-field-label fw-4 text_black-2"
//                   htmlFor="property2"
//                 >
//                   Last name
//                 </label>
//               </div>
//               <div className="tf-field style-1 mb_15">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="email"
//                   autoComplete="abc@xyz.com"
//                   id="property3"
//                   required
//                   name="email_or_phone"
//                   value={formData.email_or_phone}
//                   onChange={handleChange}
//                 />
//                 <label
//                   className="tf-field-label fw-4 text_black-2"
//                   htmlFor="property3"
//                 >
//                   Email *
//                 </label>
//               </div>
//               <div className="tf-field style-1 mb_30">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="password"
//                   required
//                   name="password"
//                   autoComplete="current-password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <label
//                   className="tf-field-label fw-4 text_black-2"
//                   htmlFor="property4"
//                 >
//                   Password *
//                 </label>
//               </div>
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="password"
//                   required
//                   name="password_confirmation"
//                   autoComplete="current-password"
//                   value={formData.password_confirmation}
//                   onChange={handleChange}
//                 />
//                 <label
//                   className="tf-field-label"
//                   htmlFor="password_confirmation"
//                 >
//                   Confirm Password *
//                 </label>
//                 {formData.password !== formData.password_confirmation &&
//                   formData.password_confirmation !== "" && (
//                     <p style={{ color: "red" }}>Passwords do not match</p>
//                   )}
//               </div>
//               <div className="mb_20">
//                 <button
//                   onClick={(e) => handleRegister(e)}
//                   className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
//                   disabled={
//                     formData.password !== formData.password_confirmation
//                   }
//                 >
//                   Register
//                 </button>
//               </div>
//               <div className="text-center">
//                 <Link href={`/login`} className="tf-btn btn-line">
//                   Already have an account? Log in here
//                   <i className="icon icon-arrow1-top-left" />
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import Link from "next/link";
import { useRegister } from "@/api/auth/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const registerMutation = useRegister();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null); // Error message state
  const [formData, setFormData] = useState({
    name: "",
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

    const emailOrPhone = formData.email_or_phone;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
    const registerBy = isEmail ? "email" : "phone";
    const updatedFormData = {
      ...formDataToSubmit,
      register_by: registerBy,
    };
    console.log("formdataaa", updatedFormData);
    registerMutation.mutate(updatedFormData, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        // Extract and set error message
        setErrorMessage(
          error.response?.data?.message || "An unexpected error occurred"
        );
      },
    });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   // Detect if the input is an email or phone
  //   if (name === "email_or_phone") {
  //     const isPhone = /^[0-9]{10,15}$/.test(value); // Adjust regex based on your phone validation logic
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //       register_by: isPhone ? "phone" : "email",
  //     }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Dynamically update `name` when `firstName` or `lastName` changes
    if (name === "firstName" || name === "lastName") {
      const updatedFormData = {
        ...formData,
        [name]: value,
        name:
          name === "firstName"
            ? `${value} ${formData.lastName || ""}`.trim()
            : `${formData.firstName || ""} ${value}`.trim(),
      };
      setFormData(updatedFormData);
      //  Detect if the input is an email or phone
    } else {
      // For other fields, update normally
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "email_or_phone") {
      const isPhone = /^[0-9]{10,15}$/.test(value); // Adjust regex based on your phone validation logic
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        register_by: isPhone ? "phone" : "email",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section className="flat-spacing-10">
      <div className="container">
        <div className="form-register-wrap">
          <div className="flat-title align-items-start gap-0 mb_30 px-0">
            <h5 className="mb_18">Register</h5>
            <p className="text_black-2">
              Sign up for early Sale access plus tailored new arrivals, trends,
              and promotions. To opt out, click unsubscribe in our emails.
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => e.preventDefault()}
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
                  placeholder="Enter email or phone number"
                  type="text"
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
                  Email or Phone *
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

                {errorMessage && (
                  <p className="text-danger mb_20">{errorMessage}</p>
                )}
              </div>
              <div className="mb_20">
                <button
                  onClick={handleRegister}
                  className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                  disabled={
                    formData.password !== formData.password_confirmation ||
                    registerMutation.isLoading
                  }
                >
                  {registerMutation.isLoading ? "Registering..." : "Register"}
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
