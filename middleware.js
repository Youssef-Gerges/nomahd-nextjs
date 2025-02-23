import {NextResponse} from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;

    const protectedRoutes = ["/wishlist", "/my-account", "/my-account-orders", "/my-account-address", "/my-account-edit", "/my-account-wishlist"]; // Add your private pages

    if (!token && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const authPages = ["/login", "/register"];
    if (token && authPages.some((route) => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/my-account", req.url));
    }

    return NextResponse.next();
}

