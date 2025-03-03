import { api, token } from "@/api/api";
import { redirect } from 'next/navigation';
import {cookies} from "next/headers";

export default async function Layout({ children }) {
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
        if (!res.email_verified_at && res.email) {
            redirect("/verify-user");
        }
    }

    return (
        <>
            {children}
        </>
    );
}