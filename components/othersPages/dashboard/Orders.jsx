"use client"
import React from "react";
import Link from "next/link";
import {useGetPurchaseHistory} from "@/api/purchase-history/getUserPurchaseHistory";
export default function Orders() {
    const {data, isLoading} = useGetPurchaseHistory()
  return (
    <div className="my-account-content account-order">
      <div className="wrap-account-order">
        <table>
          <thead>
            <tr>
              <th className="fw-6">Order</th>
              <th className="fw-6">Date</th>
              <th className="fw-6">Payment Status</th>
              <th className="fw-6">Delivery Status</th>
              <th className="fw-6">Total</th>
              <th className="fw-6">Actions</th>
            </tr>
          </thead>
          <tbody>
          {!isLoading && data?.data?.map(order => <tr className="tf-order-item">
              <td>#{order.code}</td>
              <td>{order.date}</td>
              <td>{order.payment_status_string}</td>
              <td>{order.delivery_status_string}</td>
              <td>{order.grand_total}</td>
              <td>
                  <Link
                      href={`my-account-orders-details/${order.id}`}
                      className="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"
                  >
                      <span>View</span>
                  </Link>
              </td>
          </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
