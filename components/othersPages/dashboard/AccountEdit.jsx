// "use client";
// import React from "react";
// import { useUpdateProfile } from "@/api/profile/updateProfile";
// export default function AccountEdit() {
//   const updateProfile = useUpdateProfile();

//   const handleUpdate = (e) => {
//     e.preventDefault()
//     updateProfile.mutate({
//       id : localStorage.getItem("id"),
//       name : ,
//       password :
//     })
//   };
//   return (
//     <div className="my-account-content account-edit">
//       <div className="">
//         <form
//           onSubmit={(e) => handleUpdate(e)}
//           className=""
//           id="form-password-change"
//           action="#"
//         >
//           <div className="tf-field style-1 mb_15">
//             <input
//               className="tf-field-input tf-input"
//               placeholder=" "
//               type="text"
//               id="property1"
//               required
//               name="first name"
//             />
//             <label
//               className="tf-field-label fw-4 text_black-2"
//               htmlFor="property1"
//             >
//               First name
//             </label>
//           </div>
//           <div className="tf-field style-1 mb_15">
//             <input
//               className="tf-field-input tf-input"
//               placeholder=" "
//               type="text"
//               required
//               id="property2"
//               name="last name"
//             />
//             <label
//               className="tf-field-label fw-4 text_black-2"
//               htmlFor="property2"
//             >
//               Last name
//             </label>
//           </div>
//           <div className="tf-field style-1 mb_15">
//             <input
//               className="tf-field-input tf-input"
//               placeholder=" "
//               type="email"
//               autoComplete="abc@xyz.com"
//               required
//               id="property3"
//               name="email"
//             />
//             <label
//               className="tf-field-label fw-4 text_black-2"
//               htmlFor="property3"
//             >
//               Email
//             </label>
//           </div>
//           <h6 className="mb_20">Password Change</h6>
//           <div className="tf-field style-1 mb_30">
//             <input
//               className="tf-field-input tf-input"
//               placeholder=" "
//               type="password"
//               required
//               autoComplete="current-password"
//               id="property4"
//               name="password"
//             />
//             <label
//               className="tf-field-label fw-4 text_black-2"
//               htmlFor="property4"
//             >
//               Current password
//             </label>
//           </div>
//           <div className="tf-field style-1 mb_30">
//             <input
//               className="tf-field-input tf-input"
//               placeholder=" "
//               type="password"
//               id="property5"
//               required
//               autoComplete="current-password"
//               name="password"
//             />
//             <label
//               className="tf-field-label fw-4 text_black-2"
//               htmlFor="property5"
//             >
//               New password
//             </label>
//           </div>
//           <div className="tf-field style-1 mb_30">
//             <input
//               className="tf-field-input tf-input"
//               placeholder=" "
//               type="password"
//               id="property6"
//               required
//               autoComplete="current-password"
//               name="password"
//             />
//             <label
//               className="tf-field-label fw-4 text_black-2"
//               htmlFor="property6"
//             >
//               Confirm password
//             </label>
//           </div>
//           <div className="mb_20">
//             <button
//               type="submit"
//               className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useRef } from "react";
import { useUpdateProfile } from "@/api/profile/updateProfile";

export default function AccountEdit() {
  const updateProfile = useUpdateProfile();

  // Refs for form inputs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Send mutation with input values
    // updateProfile.mutate({
    //   id: localStorage.getItem("id"),
    //   name: firstNameRef.current.value + lastNameRef.current.value,
    //   // lastName: lastNameRef.current.value,
    //   // email: emailRef.current.value,
    //   // currentPassword: currentPasswordRef.current.value,
    //   password: newPasswordRef.current.value,
    //   old_password: currentPasswordRef.current.value,
    // });
    if (
      newPasswordRef.current.value &&
      newPasswordRef.current.value !== confirmPasswordRef.current.value
    ) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Prepare the data to send
    const updateData = {
      id: localStorage.getItem("id"),
      name: firstNameRef.current.value + lastNameRef.current.value,
    };

    // If new password is provided, include both new and current passwords
    if (newPasswordRef.current.value) {
      updateData.password = newPasswordRef.current.value;
      updateData.old_password = currentPasswordRef.current.value;
    }

    // Send mutation with input values
    updateProfile.mutate(updateData);
  };

  return (
    <div className="my-account-content account-edit">
      <div className="">
        <form
          onSubmit={(e) => handleUpdate(e)}
          className=""
          id="form-password-change"
          action="#"
        >
          <div className="tf-field style-1 mb_15">
            <input
              ref={firstNameRef}
              className="tf-field-input tf-input"
              placeholder=" "
              type="text"
              id="property1"
              required
              name="firstName"
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
              ref={lastNameRef}
              className="tf-field-input tf-input"
              placeholder=" "
              type="text"
              required
              id="property2"
              name="lastName"
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
              ref={emailRef}
              className="tf-field-input tf-input"
              placeholder=" "
              type="email"
              autoComplete="abc@xyz.com"
              required
              id="property3"
              name="email"
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property3"
            >
              Email
            </label>
          </div>
          <h6 className="mb_20">Passwordss Change</h6>
          <div className="tf-field style-1 mb_30">
            <input
              ref={currentPasswordRef}
              className="tf-field-input tf-input"
              placeholder=" "
              type="password"
              required
              autoComplete="current-password"
              id="property4"
              name="currentPassword"
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property4"
            >
              Current password
            </label>
          </div>
          <div className="tf-field style-1 mb_30">
            <input
              ref={newPasswordRef}
              className="tf-field-input tf-input"
              placeholder=" "
              type="password"
              id="property5"
              // required
              autoComplete="current-password"
              name="newPassword"
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property5"
            >
              New password
            </label>
          </div>
          <div className="tf-field style-1 mb_30">
            <input
              ref={confirmPasswordRef}
              className="tf-field-input tf-input"
              placeholder=" "
              type="password"
              id="property6"
              required={newPasswordRef?.current?.value}
              autoComplete="current-password"
              name="confirmPassword"
            />
            <label
              className="tf-field-label fw-4 text_black-2"
              htmlFor="property6"
            >
              Confirm password
            </label>
          </div>
          <div className="mb_20">
            <button
              type="submit"
              className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
