"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function MyAccount() {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const name = localStorage.getItem("name");
    setUserName(name);
  }, []);
  return (
    <div className="my-account-content account-dashboard">
      <div className="mb_60">
        <h5 className="fw-5 mb_20">
          Hello{" "}
          {userName
            ? userName
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : ""}
        </h5>
        <p>
          From your account dashboard you can view your{" "}
          <Link className="text_primary" href={`/my-account-orders`}>
            recent orders
          </Link>
          , manage your{" "}
          <Link className="text_primary" href={`/my-account-edit`}>
            shipping and billing addresses
          </Link>
          , and{" "}
          <Link className="text_primary" href={`/my-account-edit`}>
            edit your password and account details
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
