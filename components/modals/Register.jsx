// "use client";
// import React from "react";
// export default function Register() {
//   const handleRegister = ()=>{
//     console.log("button clicked")
//   }
//   return (
//     <div
//       className="modal modalCentered fade form-sign-in modal-part-content"
//       id="register"
//     >
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="header">
//             <div className="demo-title">Register</div>
//             <span
//               className="icon-close icon-close-popup"
//               data-bs-dismiss="modal"
//             />
//           </div>
//           <div className="tf-login-form">
//             <form onSubmit={(e) => e.preventDefault()} className="">
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="text"
//                   required
//                   name=""
//                 />
//                 <label className="tf-field-label" htmlFor="">
//                   First name
//                 </label>
//               </div>
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="text"
//                   required
//                   name=""
//                 />
//                 <label className="tf-field-label" htmlFor="">
//                   Last name
//                 </label>
//               </div>
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="email"
//                   autoComplete="abc@xyz.com"
//                   required
//                   name=""
//                 />
//                 <label className="tf-field-label" htmlFor="">
//                   Email *
//                 </label>
//               </div>
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="password"
//                   required
//                   name=""
//                   autoComplete="current-password"
//                 />
//                 <label className="tf-field-label" htmlFor="">
//                   Password *
//                 </label>
//               </div>
//               <div className="bottom">
//                 <div className="w-100">
//                   <button
//                     onClick={handleRegister}
//                     className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
//                   >
//                     <span>Register</span>
//                   </button>
//                 </div>
//                 <div className="w-100">
//                   <a
//                     href="#login"
//                     data-bs-toggle="modal"
//                     className="btn-link fw-6 w-100 link"
//                   >
//                     Already have an account? Log in here
//                     <i className="icon icon-arrow1-top-left" />
//                   </a>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";
// import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { registerUser } from "@/api/auth";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email_or_phone: "",
//     password: "",
//     passowrd_confirmation:"",
//     register_by:""
//   });

//   const { mutate, error, isSuccess, isLoading, isError } = useMutation({
//     mutationFn: registerUser,
//     onSuccess: () => {
//       console.log("Registration successful!");
//     },
//     onError: (err) => {
//       console.error("Registration failed:", err);
//     },
//   });

//   const handleRegister = () => {
//     mutate(formData);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div
//       className="modal modalCentered fade form-sign-in modal-part-content"
//       id="register"
//     >
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="header">
//             <div className="demo-title">Register</div>
//             <span
//               className="icon-close icon-close-popup"
//               data-bs-dismiss="modal"
//             />
//           </div>
//           <div className="tf-login-form">
//             <form onSubmit={(e) => e.preventDefault()} className="">
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="text"
//                   required
//                   name="firstName"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//                 <label className="tf-field-label" htmlFor="firstName">
//                   First name
//                 </label>
//               </div>
//               {/* <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="text"
//                   required
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//                 <label className="tf-field-label" htmlFor="lastName">
//                   Last name
//                 </label>
//               </div> */}
//               <div className="tf-field style-1">
//                 <input
//                   className="tf-field-input tf-input"
//                   placeholder=" "
//                   type="email"
//                   autoComplete="abc@xyz.com"
//                   required
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 <label className="tf-field-label" htmlFor="email">
//                   Email *
//                 </label>
//               </div>
//               <div className="tf-field style-1">
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
//                 <label className="tf-field-label" htmlFor="password">
//                   Password *
//                 </label>
//               </div>
//               <div className="bottom">
//                 <div className="w-100">
//                   <button
//                     onClick={handleRegister}
//                     className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Registering..." : "Register"}
//                   </button>
//                 </div>
//                 {isError && (
//                   <p style={{ color: "red" }}>Error: {error.message}</p>
//                 )}
//                 {isSuccess && (
//                   <p style={{ color: "green" }}>Registration successful!</p>
//                 )}
//                 <div className="w-100">
//                   <a
//                     href="#login"
//                     data-bs-toggle="modal"
//                     className="btn-link fw-6 w-100 link"
//                   >
//                     Already have an account? Log in here
//                     <i className="icon icon-arrow1-top-left" />
//                   </a>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useRegister} from "@/api/auth/auth";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Register() {
  const registerMutation = useRegister();
  const router = useRouter(); 
  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   // setLoading(true);

  //   try {
  //     const response = await fetchData();

  //     // const response = await registerUser(formData);
  //     // toast.success('Registration successful!');
  //     console.log('User registered:', response);
  //     // Perform additional actions like redirecting the user
  //   } catch (error) {
  //     console.log(error.message || 'Failed to register');
  //   } 
  // };



  // const handleRegister = async (event) => {
  //   event.preventDefault();
  //   // setIsLoading(true);

  //   try {
  //     const response = await registerUserr(formData);
  //     console.log('Registration successful:', response);
  //     alert('Registration successful!');
  //   } catch (error) {
  //     console.error(error.message);
  //     alert('Registration failed: ' + error.message);
  //   } 
  // };
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
        const modalElement = document.getElementById("register");
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
        console.log("navigating ")
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
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="register"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Register</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="tf-login-form">
            <form onSubmit={(e) => e.preventDefault()} className="">
              {/* First Name */}
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label className="tf-field-label" htmlFor="firstName">
                  First name
                </label>
              </div>

              {/* Last Name */}
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label className="tf-field-label" htmlFor="lastName">
                  Last name
                </label>
              </div>

              {/* Email */}
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  autoComplete="abc@xyz.com"
                  required
                  name="email_or_phone"
                  value={formData.email_or_phone}
                  onChange={handleChange}
                />
                <label className="tf-field-label" htmlFor="email">
                  Email *
                </label>
              </div>

              {/* Password */}
              <div className="tf-field style-1">
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
                <label className="tf-field-label" htmlFor="password">
                  Password *
                </label>
              </div>

              {/* Confirm Password */}
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

              <div className="bottom">
                <div className="w-100">
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

                <div className="w-100">
                  <a
                    href="#login"
                    data-bs-toggle="modal"
                    className="btn-link fw-6 w-100 link"
                  >
                    Already have an account? Log in here
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
