import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import VerifyUser from "@/components/othersPages/VerifyUser";

export const metadata = {
  title: "Verify your account || Nomahd - Ultimate Ecommerce",
  description: "Nomahd - Ultimate Ecommerce",
};
export default async function page() {

    const cookieStore = await cookies()

    const response = await fetch('https://nomahd.com/api/v2/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('token').value}`
        }
    });


    if (response.ok) {
        let res = await response.json();
        if (res.email_verified_at && res.email) {
            redirect("/my-account");
        }else{
            const resend = await fetch('https://nomahd.com/api/v2/auth/resend_code', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${cookieStore.get('token').value}`
                }
            });

        }
    }

  return (
    <>
      <Header2 />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Verify your account</div>
        </div>
      </div>
        <VerifyUser />

      <Footer1 />
    </>
  );
}
